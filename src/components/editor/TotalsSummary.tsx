'use client';

import React from 'react';
import {
  CurrencyConfig,
  DiscountConfig,
  TaxConfig,
  InvoiceCalculations,
} from '@/types/invoice';
import { formatMoney } from '@/lib/currencies';
import { hasShipping, hasAmountPaid } from '@/lib/invoice-helpers';
import { EditableField } from './EditableField';
import { Plus, X } from 'lucide-react';

interface TotalsSummaryProps {
  calculations: InvoiceCalculations;
  currency: CurrencyConfig;
  discount: DiscountConfig;
  tax: TaxConfig;
  shipping: number;
  amountPaid: number;
  onUpdateDiscount: (patch: Partial<DiscountConfig>) => void;
  onUpdateTax: (patch: Partial<TaxConfig>) => void;
  onUpdateShipping: (amount: number) => void;
  onUpdateAmountPaid: (amount: number) => void;
  accentColor: string;
  labels: {
    subtotal: string;
    discount: string;
    tax: string;
    shipping: string;
    total: string;
    amountPaid: string;
    balanceDue: string;
  };
}

export const TotalsSummary: React.FC<TotalsSummaryProps> = ({
  calculations,
  currency,
  discount,
  tax,
  shipping,
  amountPaid,
  onUpdateDiscount,
  onUpdateTax,
  onUpdateShipping,
  onUpdateAmountPaid,
  accentColor,
  labels,
}) => {
  const isShippingActive = hasShipping(shipping);
  const isAmountPaidActive = hasAmountPaid(amountPaid);

  return (
    <div className="w-full sm:w-80 ml-auto space-y-2 text-sm print-break-inside-avoid">
      {/* Subtotal */}
      <div className="flex justify-between items-center py-1 text-slate-600">
        <span className="font-medium">{labels.subtotal}</span>
        <span className="font-semibold text-slate-800">
          {formatMoney(calculations.subtotal, currency)}
        </span>
      </div>

      {/* Discount Section (Strictly Conditional) */}
      {discount.enabled ? (
        <div className="flex items-center justify-between py-1 group">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateDiscount({ enabled: false, value: 0 })}
              className="text-slate-300 hover:text-red-500 transition-colors no-print"
              title="Remove discount"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-600 font-medium">{labels.discount}</span>
            <div className="flex items-center gap-1 no-print">
              <input
                type="number"
                min="0"
                step="any"
                value={discount.value === 0 ? '' : discount.value}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onUpdateDiscount({ value: isNaN(val) ? 0 : val });
                }}
                placeholder="0"
                className="w-14 text-xs px-1 py-0.5 border border-slate-200 rounded text-center focus:outline-hidden focus:border-blue-500 bg-white"
              />
              <button
                type="button"
                onClick={() =>
                  onUpdateDiscount({
                    type: discount.type === 'percentage' ? 'fixed' : 'percentage',
                  })
                }
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 px-1 py-0.5 bg-slate-100 rounded"
                title="Toggle percentage or fixed amount"
              >
                {discount.type === 'percentage' ? '%' : currency.symbol}
              </button>
            </div>
            <span className="text-xs text-slate-500 print-only">
              ({discount.type === 'percentage' ? `${discount.value}%` : currency.symbol})
            </span>
          </div>
          <span className="font-medium text-emerald-600">
            -{formatMoney(calculations.discountAmount, currency)}
          </span>
        </div>
      ) : (
        <div className="no-print">
          <button
            type="button"
            onClick={() => onUpdateDiscount({ enabled: true, type: 'percentage', value: 10 })}
            className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors py-0.5"
          >
            <Plus className="w-3 h-3" /> Add Discount
          </button>
        </div>
      )}

      {/* Tax Section (Strictly Conditional) */}
      {tax.enabled ? (
        <div className="flex items-center justify-between py-1 group">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateTax({ enabled: false, rate: 0 })}
              className="text-slate-300 hover:text-red-500 transition-colors no-print"
              title="Remove tax"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <EditableField
              value={tax.name}
              onChange={(val) => onUpdateTax({ name: val })}
              placeholder="Tax"
              className="w-20"
              inputClassName="font-medium text-slate-600 text-xs sm:text-sm"
            />
            <div className="flex items-center gap-1 no-print">
              <input
                type="number"
                min="0"
                step="any"
                value={tax.rate === 0 ? '' : tax.rate}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onUpdateTax({ rate: isNaN(val) ? 0 : val });
                }}
                placeholder="0"
                className="w-12 text-xs px-1 py-0.5 border border-slate-200 rounded text-center focus:outline-hidden focus:border-blue-500 bg-white"
              />
              <span className="text-xs text-slate-400">%</span>
            </div>
            <span className="text-xs text-slate-500 print-only">({tax.rate}%)</span>
          </div>
          <span className="font-medium text-slate-800">
            {formatMoney(calculations.taxAmount, currency)}
          </span>
        </div>
      ) : (
        <div className="no-print">
          <button
            type="button"
            onClick={() => onUpdateTax({ enabled: true, name: 'VAT', rate: 10 })}
            className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors py-0.5"
          >
            <Plus className="w-3 h-3" /> Add Tax / VAT
          </button>
        </div>
      )}

      {/* Shipping / Extra Charges (Strictly Conditional) */}
      {isShippingActive ? (
        <div className="flex items-center justify-between py-1 group">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateShipping(0)}
              className="text-slate-300 hover:text-red-500 transition-colors no-print"
              title="Remove shipping"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-600 font-medium">{labels.shipping}</span>
          </div>
          <div className="w-24 no-print">
            <EditableField
              value={shipping === 0 ? '' : String(shipping)}
              onChange={(val) => {
                const parsed = parseFloat(val);
                onUpdateShipping(isNaN(parsed) ? 0 : parsed);
              }}
              type="number"
              min={0}
              step="any"
              placeholder="0.00"
              align="right"
              inputClassName="font-medium text-slate-800"
            />
          </div>
          <span className="font-medium text-slate-800 print-only">
            {formatMoney(calculations.shippingAmount, currency)}
          </span>
        </div>
      ) : (
        <div className="no-print">
          <button
            type="button"
            onClick={() => onUpdateShipping(15)}
            className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors py-0.5"
          >
            <Plus className="w-3 h-3" /> Add Shipping / Fee
          </button>
        </div>
      )}

      {/* Total Row */}
      <div
        className={`border-t border-slate-200 pt-2 pb-1 flex justify-between items-center ${
          !isAmountPaidActive ? 'rounded-lg p-2.5 mt-2' : ''
        }`}
        style={
          !isAmountPaidActive
            ? {
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                borderWidth: 1,
              }
            : undefined
        }
      >
        <span
          className={`font-bold ${!isAmountPaidActive ? 'text-slate-900 text-sm' : 'text-slate-900 text-base'}`}
        >
          {labels.total}
        </span>
        <span
          className={`font-extrabold ${!isAmountPaidActive ? 'text-lg' : 'text-base text-slate-900'}`}
          style={!isAmountPaidActive ? { color: accentColor } : undefined}
        >
          {formatMoney(calculations.total, currency)}
        </span>
      </div>

      {/* Amount Paid & Balance Due (Strictly Conditional: only if amountPaid > 0) */}
      {isAmountPaidActive ? (
        <>
          <div className="flex items-center justify-between py-1 text-slate-600 group">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onUpdateAmountPaid(0)}
                className="text-slate-300 hover:text-red-500 transition-colors no-print"
                title="Remove amount paid"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-medium">{labels.amountPaid}</span>
            </div>
            <div className="w-28 no-print">
              <EditableField
                value={amountPaid === 0 ? '' : String(amountPaid)}
                onChange={(val) => {
                  const parsed = parseFloat(val);
                  onUpdateAmountPaid(isNaN(parsed) ? 0 : parsed);
                }}
                type="number"
                min={0}
                step="any"
                placeholder="0.00"
                align="right"
                inputClassName="text-sm font-medium text-slate-700"
              />
            </div>
            <span className="text-sm font-medium text-slate-700 print-only">
              {formatMoney(calculations.amountPaid, currency)}
            </span>
          </div>

          {/* Balance Due Callout */}
          <div
            className="rounded-lg p-2.5 flex justify-between items-center transition-colors shadow-xs"
            style={{
              backgroundColor: `${accentColor}12`,
              borderColor: `${accentColor}40`,
              borderWidth: 1,
            }}
          >
            <span className="font-bold text-sm tracking-tight text-slate-900">
              {labels.balanceDue}
            </span>
            <span className="font-extrabold text-lg" style={{ color: accentColor }}>
              {formatMoney(calculations.balanceDue, currency)}
            </span>
          </div>
        </>
      ) : (
        <div className="no-print">
          <button
            type="button"
            onClick={() =>
              onUpdateAmountPaid(Math.round(calculations.total * 0.5) || 50)
            }
            className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors py-0.5"
          >
            <Plus className="w-3 h-3" /> Add Deposit / Amount Paid
          </button>
        </div>
      )}
    </div>
  );
};
