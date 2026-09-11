'use client';

import React from 'react';
import { LineItem, CurrencyConfig } from '@/types/invoice';
import { EditableField } from './EditableField';
import { calculateLineTotal } from '@/lib/calculations';
import { formatMoney } from '@/lib/currencies';
import { Trash2, Plus } from 'lucide-react';

interface LineItemsTableProps {
  items: LineItem[];
  currency: CurrencyConfig;
  onUpdateItem: (id: string, patch: Partial<LineItem>) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  accentColor: string;
  labels: {
    itemHeading: string;
    qtyHeading: string;
    rateHeading: string;
    amountHeading: string;
  };
}

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  items,
  currency,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  accentColor,
  labels,
}) => {
  return (
    <div className="w-full my-4 sm:my-6 overflow-x-auto no-scrollbar">
      <div className="min-w-[360px] sm:min-w-[500px]">
        <div className="w-full border-b border-slate-200 pb-2 mb-2 flex text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
          <div className="flex-1 min-w-[130px] sm:min-w-[180px]">{labels.itemHeading}</div>
          <div className="w-14 sm:w-20 text-center">{labels.qtyHeading}</div>
          <div className="w-20 sm:w-28 text-right">{labels.rateHeading}</div>
          <div className="w-20 sm:w-28 text-right">{labels.amountHeading}</div>
          <div className="w-7 sm:w-10 no-print"></div>
        </div>

      <div className="space-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const lineTotal = calculateLineTotal(item.quantity, item.unitPrice);

          return (
            <div
              key={item.id}
              className="flex items-start group py-1.5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 rounded-sm transition-colors"
            >
              {/* Description */}
              <div className="flex-1 min-w-[130px] sm:min-w-[180px] pr-1.5 sm:pr-2">
                <EditableField
                  value={item.description}
                  onChange={(val) => onUpdateItem(item.id, { description: val })}
                  placeholder="Service or product description..."
                  multiline
                  inputClassName="text-xs sm:text-sm font-medium text-slate-800"
                />
              </div>

              {/* Quantity */}
              <div className="w-14 sm:w-20 px-0.5 sm:px-1">
                <EditableField
                  value={item.quantity === 0 ? '' : String(item.quantity)}
                  onChange={(val) => {
                    const parsed = parseFloat(val);
                    onUpdateItem(item.id, { quantity: isNaN(parsed) ? 0 : parsed });
                  }}
                  type="number"
                  min={0}
                  step="any"
                  placeholder="1"
                  align="center"
                  inputClassName="text-xs sm:text-sm text-slate-700"
                />
              </div>

              {/* Unit Price */}
              <div className="w-20 sm:w-28 px-0.5 sm:px-1">
                <EditableField
                  value={item.unitPrice === 0 ? '' : String(item.unitPrice)}
                  onChange={(val) => {
                    const parsed = parseFloat(val);
                    onUpdateItem(item.id, { unitPrice: isNaN(parsed) ? 0 : parsed });
                  }}
                  type="number"
                  min={0}
                  step="any"
                  placeholder="0.00"
                  align="right"
                  inputClassName="text-xs sm:text-sm text-slate-700"
                  onKeyDown={(e) => {
                    if (e.key === 'Tab' && !e.shiftKey && isLast) {
                      e.preventDefault();
                      onAddItem();
                    }
                  }}
                />
              </div>

              {/* Line Total Amount (Calculated) */}
              <div className="w-20 sm:w-28 text-right text-xs sm:text-sm font-semibold text-slate-800 py-1 px-1 self-start truncate">
                {formatMoney(lineTotal, currency)}
              </div>

              {/* Delete row button (hidden on print) */}
              <div className="w-7 sm:w-10 flex justify-end items-center self-start pt-1 no-print">
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  disabled={items.length <= 1}
                  className={`p-1 rounded text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors ${
                    items.length <= 1 ? 'opacity-0 cursor-default' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  title="Remove row"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Add Item Button */}
      <div className="mt-3 no-print">
        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-100 text-slate-700 transition-colors"
          style={{ color: accentColor }}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Line Item</span>
          <span className="text-[10px] text-slate-400 font-normal ml-1 hidden sm:inline">
            (or press Tab on last price)
          </span>
        </button>
      </div>
    </div>
  );
};

