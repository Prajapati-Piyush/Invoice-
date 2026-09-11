'use client';

import React from 'react';
import { InvoiceData, InvoiceCalculations } from '@/types/invoice';
import { formatMoney } from '@/lib/currencies';
import { calculateLineTotal } from '@/lib/calculations';
import {
  hasBankDetails,
  hasNotes,
  hasTerms,
  hasTax,
  hasDiscount,
  hasShipping,
  hasAmountPaid,
  hasPoNumber,
} from '@/lib/invoice-helpers';

interface PrintableInvoiceProps {
  invoice: InvoiceData;
  calculations: InvoiceCalculations;
}

export const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({
  invoice,
  calculations,
}) => {
  const { sender, client, customLabels, accentColor, templateId } = invoice;

  const isClassic = templateId === 'classic';
  const isCorporate = templateId === 'professional' || templateId === 'corporate';

  const fontClass = isClassic ? 'font-serif' : 'font-sans';

  const showBank = hasBankDetails(invoice.paymentDetails);
  const showNotes = hasNotes(invoice.notes);
  const showTerms = hasTerms(invoice.terms);
  const showBottomGrid = showBank && (showNotes || showTerms);

  return (
    <div
      className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-12 leading-normal select-text`}
      style={{ minHeight: '100%' }}
    >
      {/* 1. TOP ACCENT STRIP (Corporate) */}
      {isCorporate && (
        <div
          className="h-2.5 w-full -mx-8 sm:-mx-12 -mt-8 sm:-mt-12 mb-8"
          style={{ backgroundColor: accentColor }}
        />
      )}

      {/* 2. HEADER BLOCK */}
      <div
        className={`pb-6 mb-6 ${
          isClassic
            ? 'border-t-4 border-slate-900 pt-4 border-b border-slate-300'
            : 'border-b border-slate-200'
        }`}
      >
        <div className="flex justify-between items-start gap-6">
          {/* Sender Entity */}
          <div>
            {sender.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sender.logoUrl}
                alt="Logo"
                className="max-h-16 max-w-[180px] object-contain mb-3"
              />
            )}
            {sender.name && (
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {sender.name}
              </h1>
            )}
            <div className="text-xs text-slate-600 space-y-0.5 mt-1">
              {sender.addressLine1 && <p>{sender.addressLine1}</p>}
              {sender.addressLine2 && <p>{sender.addressLine2}</p>}
              {sender.cityStateZip && <p>{sender.cityStateZip}</p>}
              {sender.country && <p>{sender.country}</p>}
              {sender.email && <p>{sender.email}</p>}
              {sender.phone && <p>{sender.phone}</p>}
              {sender.taxIdNumber && (
                <p className="text-[11px] font-mono text-slate-500">Tax ID: {sender.taxIdNumber}</p>
              )}
            </div>
          </div>

          {/* Invoice Title & Meta */}
          <div className="text-right space-y-2 min-w-[200px]">
            <h2
              className={`text-3xl font-black uppercase tracking-tight ${isClassic ? 'font-serif' : ''}`}
              style={{ color: accentColor }}
            >
              {customLabels.documentTitle}
            </h2>

            <div className="space-y-1 text-xs text-slate-700">
              <p className="flex justify-end gap-2">
                <span className="text-slate-500 font-medium">{customLabels.invoiceNumber}:</span>
                <span className="font-mono font-bold text-slate-900">{invoice.invoiceNumber}</span>
              </p>
              <p className="flex justify-end gap-2">
                <span className="text-slate-500 font-medium">{customLabels.issueDate}:</span>
                <span className="font-medium text-slate-900">{invoice.issueDate}</span>
              </p>
              <p className="flex justify-end gap-2">
                <span className="text-slate-500 font-medium">{customLabels.dueDate}:</span>
                <span className="font-semibold text-slate-900">{invoice.dueDate}</span>
              </p>
              {hasPoNumber(invoice.poNumber) && (
                <p className="flex justify-end gap-2">
                  <span className="text-slate-500 font-medium">PO #:</span>
                  <span className="font-mono font-semibold text-slate-900">{invoice.poNumber}</span>
                </p>
              )}
              {invoice.paymentTerms?.trim() && (
                <p className="flex justify-end gap-2 text-slate-600">
                  <span className="text-slate-500">Terms:</span>
                  <span>{invoice.paymentTerms}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. CLIENT / BILL TO SECTION */}
      {Boolean(
        client.name?.trim() ||
        client.addressLine1?.trim() ||
        client.email?.trim() ||
        client.phone?.trim()
      ) && (
        <div
          className={`pb-6 mb-6 ${
            isCorporate
              ? 'bg-slate-50/80 p-4 rounded-xl border border-slate-200/80'
              : 'border-b border-slate-100'
          }`}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-wider block mb-1"
            style={{ color: isCorporate ? accentColor : '#64748b' }}
          >
            {customLabels.toSection}
          </span>
          {client.name && (
            <h3 className="font-bold text-sm sm:text-base text-slate-900">{client.name}</h3>
          )}
          <div className="text-xs text-slate-600 space-y-0.5 mt-0.5">
            {client.addressLine1 && <p>{client.addressLine1}</p>}
            {client.addressLine2 && <p>{client.addressLine2}</p>}
            {client.cityStateZip && <p>{client.cityStateZip}</p>}
            {client.country && <p>{client.country}</p>}
            {client.email && <p>{client.email}</p>}
            {client.phone && <p>{client.phone}</p>}
            {client.taxIdNumber && (
              <p className="text-[11px] font-mono text-slate-500">Tax ID: {client.taxIdNumber}</p>
            )}
          </div>
        </div>
      )}

      {/* 4. LINE ITEMS TABLE */}
      <div className="my-6">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr
              className={`border-b-2 border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px] ${
                isCorporate ? 'bg-slate-100/70' : ''
              }`}
            >
              <th className="py-2.5 px-2">{customLabels.itemHeading}</th>
              <th className="py-2.5 px-2 text-center w-16">{customLabels.qtyHeading}</th>
              <th className="py-2.5 px-2 text-right w-24">{customLabels.rateHeading}</th>
              <th className="py-2.5 px-2 text-right w-28">{customLabels.amountHeading}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.items.map((item, idx) => {
              const lineTotal = calculateLineTotal(item.quantity, item.unitPrice);
              return (
                <tr key={item.id || idx} className="print-break-inside-avoid">
                  <td className="py-3 px-2 align-top">
                    <p className="font-semibold text-slate-900">{item.description || 'Item'}</p>
                  </td>
                  <td className="py-3 px-2 text-center align-top font-medium text-slate-700">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-2 text-right align-top text-slate-700">
                    {formatMoney(item.unitPrice, invoice.currency)}
                  </td>
                  <td className="py-3 px-2 text-right align-top font-bold text-slate-900">
                    {formatMoney(lineTotal, invoice.currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 5. TOTALS SECTION (Strictly Conditional Rows) */}
      <div className="flex justify-end my-6 print-break-inside-avoid">
        <div className="w-72 space-y-1.5 text-xs">
          {/* Subtotal */}
          <div className="flex justify-between py-1 text-slate-600">
            <span>{customLabels.subtotal}</span>
            <span className="font-semibold text-slate-800">
              {formatMoney(calculations.subtotal, invoice.currency)}
            </span>
          </div>

          {/* Discount (Only if active and value > 0) */}
          {hasDiscount(invoice.discount) && (
            <div className="flex justify-between py-1 text-emerald-700">
              <span>
                {customLabels.discount} (
                {invoice.discount.type === 'percentage'
                  ? `${invoice.discount.value}%`
                  : invoice.currency.symbol}
                )
              </span>
              <span className="font-semibold">
                -{formatMoney(calculations.discountAmount, invoice.currency)}
              </span>
            </div>
          )}

          {/* Tax (Only if active and rate > 0) */}
          {hasTax(invoice.tax) && (
            <div className="flex justify-between py-1 text-slate-700">
              <span>
                {invoice.tax.name} ({invoice.tax.rate}%)
              </span>
              <span className="font-semibold">
                {formatMoney(calculations.taxAmount, invoice.currency)}
              </span>
            </div>
          )}

          {/* Shipping (Only if > 0) */}
          {hasShipping(invoice.shipping) && (
            <div className="flex justify-between py-1 text-slate-700">
              <span>{customLabels.shipping}</span>
              <span className="font-semibold">
                {formatMoney(calculations.shippingAmount, invoice.currency)}
              </span>
            </div>
          )}

          {/* Total Amount */}
          <div
            className={`flex justify-between py-2 border-t-2 border-slate-200 font-bold text-sm text-slate-900 ${
              !hasAmountPaid(invoice.amountPaid) ? 'text-base' : ''
            }`}
            style={
              !hasAmountPaid(invoice.amountPaid)
                ? { color: accentColor }
                : undefined
            }
          >
            <span>{customLabels.total}</span>
            <span>{formatMoney(calculations.total, invoice.currency)}</span>
          </div>

          {/* Amount Paid (Deposit) - Only if > 0 */}
          {hasAmountPaid(invoice.amountPaid) && (
            <>
              <div className="flex justify-between py-1 text-slate-600">
                <span>{customLabels.amountPaid}</span>
                <span className="font-medium">
                  {formatMoney(calculations.amountPaid, invoice.currency)}
                </span>
              </div>

              {/* Balance Due (Callout) */}
              <div
                className="p-2.5 rounded-lg flex justify-between items-center text-sm font-black"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                <span>{customLabels.balanceDue}</span>
                <span>{formatMoney(calculations.balanceDue, invoice.currency)}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 6. OPTIONAL BOTTOM SECTIONS (Only render if at least one exists!) */}
      {(showBank || showNotes || showTerms) && (
        <div
          className={`pt-6 border-t border-slate-200 text-xs text-slate-700 print-break-inside-avoid ${
            showBottomGrid ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'space-y-4 max-w-xl'
          }`}
        >
          {/* Bank Instructions (Strictly Conditional) */}
          {showBank && (
            <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <p className="font-bold uppercase tracking-wider text-slate-600 text-[10px]">
                Payment Instructions
              </p>
              {invoice.paymentDetails.bankName && (
                <p>
                  <span className="text-slate-400">Bank:</span>{' '}
                  <span className="font-semibold text-slate-800">
                    {invoice.paymentDetails.bankName}
                  </span>
                </p>
              )}
              {invoice.paymentDetails.accountName && (
                <p>
                  <span className="text-slate-400">Account Name:</span>{' '}
                  <span>{invoice.paymentDetails.accountName}</span>
                </p>
              )}
              {invoice.paymentDetails.accountNumber && (
                <p>
                  <span className="text-slate-400">Account No:</span>{' '}
                  <span className="font-mono font-semibold text-slate-900">
                    {invoice.paymentDetails.accountNumber}
                  </span>
                </p>
              )}
              {invoice.paymentDetails.routingOrSwift && (
                <p>
                  <span className="text-slate-400">Routing / SWIFT:</span>{' '}
                  <span className="font-mono">{invoice.paymentDetails.routingOrSwift}</span>
                </p>
              )}
              {invoice.paymentDetails.iban && (
                <p>
                  <span className="text-slate-400">IBAN:</span>{' '}
                  <span className="font-mono">{invoice.paymentDetails.iban}</span>
                </p>
              )}
              {invoice.paymentDetails.paymentLink && (
                <p>
                  <span className="text-slate-400">Pay Online:</span>{' '}
                  <span className="text-blue-600 underline">
                    {invoice.paymentDetails.paymentLink}
                  </span>
                </p>
              )}
              {invoice.paymentDetails.customInstructions && (
                <p className="pt-1 text-slate-600">
                  {invoice.paymentDetails.customInstructions}
                </p>
              )}
            </div>
          )}

          {/* Notes & Terms (Strictly Conditional) */}
          {(showNotes || showTerms) && (
            <div className="space-y-4">
              {showNotes && (
                <div>
                  <p className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-1">
                    Notes
                  </p>
                  <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                    {invoice.notes}
                  </p>
                </div>
              )}

              {showTerms && (
                <div>
                  <p className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-1">
                    Terms & Conditions
                  </p>
                  <p className="text-slate-500 text-[11px] whitespace-pre-line leading-relaxed">
                    {invoice.terms}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 7. SIGNATURE BLOCK (Only if enabled) */}
      {invoice.hasSignature && (
        <div className="pt-8 mt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs print-break-inside-avoid">
          <div>
            <div className="border-b border-slate-400 h-10 mb-1"></div>
            <span className="text-[10px] uppercase font-semibold text-slate-500">
              Authorized Signature
            </span>
          </div>
          <div>
            <div className="border-b border-slate-400 h-10 mb-1"></div>
            <span className="text-[10px] uppercase font-semibold text-slate-500">
              Date & Acknowledgment
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

