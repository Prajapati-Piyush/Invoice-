'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../templates/MinimalTemplate';
import { LogoUploader } from './LogoUploader';
import { formatMoney } from '@/lib/currencies';
import { calculateLineTotal } from '@/lib/calculations';
import {
  hasBankDetails,
  hasNotes,
  hasTerms,
  hasShipping,
  hasAmountPaid,
  hasPoNumber,
} from '@/lib/invoice-helpers';
import {
  Building2,
  Users2,
  FileSpreadsheet,
  Layers,
  Percent,
  CreditCard,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  PenTool,
} from 'lucide-react';

export const StudioControls: React.FC<TemplateProps> = ({
  invoice,
  calculations,
  onUpdateSender,
  onUpdateClient,
  onUpdateInvoice,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onUpdateDiscount,
  onUpdateTax,
  onUpdateShipping,
  onUpdateAmountPaid,
  onUpdatePaymentDetails,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    items: true,
    details: true,
    sender: false,
    client: false,
    financials: true,
    payment: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const showBank = hasBankDetails(invoice.paymentDetails);
  const showNotes = hasNotes(invoice.notes);
  const showTerms = hasTerms(invoice.terms);
  const showSignature = Boolean(invoice.hasSignature);
  const showPo = hasPoNumber(invoice.poNumber);

  return (
    <div className="w-full space-y-3 text-slate-800 text-xs pb-16 select-none">
      {/* 1. Line Items Section (Primary Focus) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('items')}
          className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Line Items</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-800 text-[11px] font-semibold">
              {invoice.items.length}
            </span>
          </div>
          {openSections.items ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.items && (
          <div className="p-4 space-y-3 border-t border-slate-100">
            {invoice.items.map((item, index) => {
              const lineTotal = calculateLineTotal(item.quantity, item.unitPrice);
              return (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-2 relative group hover:border-slate-300 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-500 text-[11px]">#{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      disabled={invoice.items.length <= 1}
                      className={`p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ${
                        invoice.items.length <= 1 ? 'opacity-30 cursor-not-allowed' : ''
                      }`}
                      title="Delete line item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                      placeholder="Service or product description..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div>
                      <span className="block text-[10px] text-slate-400 mb-0.5">Qty</span>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.quantity === 0 ? '' : item.quantity}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          onUpdateItem(item.id, { quantity: isNaN(val) ? 0 : val });
                        }}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-center text-xs focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <span className="block text-[10px] text-slate-400 mb-0.5">Rate</span>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.unitPrice === 0 ? '' : item.unitPrice}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          onUpdateItem(item.id, { unitPrice: isNaN(val) ? 0 : val });
                        }}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-right text-xs focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] text-slate-400 mb-0.5">Total</span>
                      <span className="font-bold text-slate-900 text-xs py-1 block truncate">
                        {formatMoney(lineTotal, invoice.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={onAddItem}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-xl font-bold text-blue-600 flex items-center justify-center gap-1.5 bg-blue-50/20 hover:bg-blue-50/50 transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Line Item</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Invoice Details (Number, Dates, PO Number) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('details')}
          className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-violet-600" />
            <span className="text-sm">Invoice Info</span>
            <span className="font-mono text-slate-400 text-xs font-normal">
              {invoice.invoiceNumber}
            </span>
          </div>
          {openSections.details ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.details && (
          <div className="p-4 space-y-3 border-t border-slate-100">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Invoice #</label>
              <input
                type="text"
                value={invoice.invoiceNumber}
                onChange={(e) => onUpdateInvoice({ invoiceNumber: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Issue Date</label>
                <input
                  type="date"
                  value={invoice.issueDate}
                  onChange={(e) => onUpdateInvoice({ issueDate: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => onUpdateInvoice({ dueDate: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Payment Terms</label>
              <input
                type="text"
                value={invoice.paymentTerms}
                onChange={(e) => onUpdateInvoice({ paymentTerms: e.target.value })}
                placeholder="e.g. Net 14 Days"
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            {/* PO Number (Conditional with Add/Remove) */}
            <div className="border-t border-slate-100 pt-2">
              {showPo ? (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-500 font-medium">Purchase Order (PO #)</label>
                    <button
                      type="button"
                      onClick={() => onUpdateInvoice({ poNumber: undefined })}
                      className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-[11px]"
                    >
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={invoice.poNumber || ''}
                    onChange={(e) => onUpdateInvoice({ poNumber: e.target.value })}
                    placeholder="PO-2026-001"
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onUpdateInvoice({ poNumber: 'PO-2026-001' })}
                  className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors py-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add PO Number</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Business (From) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('sender')}
          className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span className="text-sm">Your Business (From)</span>
          </div>
          {openSections.sender ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.sender && (
          <div className="p-4 space-y-3 border-t border-slate-100">
            <div>
              <label className="block text-slate-500 font-medium mb-1.5">Business Logo</label>
              <LogoUploader
                logoUrl={invoice.sender.logoUrl}
                onChange={(url) => onUpdateSender({ logoUrl: url })}
              />
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Business Name</label>
              <input
                type="text"
                value={invoice.sender.name}
                onChange={(e) => onUpdateSender({ name: e.target.value })}
                placeholder="Your Business Name Ltd."
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-semibold focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={invoice.sender.email || ''}
                  onChange={(e) => onUpdateSender({ email: e.target.value })}
                  placeholder="billing@company.com"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={invoice.sender.phone || ''}
                  onChange={(e) => onUpdateSender({ phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Street Address</label>
              <input
                type="text"
                value={invoice.sender.addressLine1 || ''}
                onChange={(e) => onUpdateSender({ addressLine1: e.target.value })}
                placeholder="100 Innovation Way, Suite 400"
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500 font-medium mb-1">City, State, Zip</label>
                <input
                  type="text"
                  value={invoice.sender.cityStateZip || ''}
                  onChange={(e) => onUpdateSender({ cityStateZip: e.target.value })}
                  placeholder="San Francisco, CA 94104"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Tax ID / VAT</label>
                <input
                  type="text"
                  value={invoice.sender.taxIdNumber || ''}
                  onChange={(e) => onUpdateSender({ taxIdNumber: e.target.value })}
                  placeholder="EIN / VAT ID"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Client (To) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('client')}
          className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-amber-600" />
            <span className="text-sm">Client (Bill To)</span>
          </div>
          {openSections.client ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.client && (
          <div className="p-4 space-y-3 border-t border-slate-100">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Client Name</label>
              <input
                type="text"
                value={invoice.client.name}
                onChange={(e) => onUpdateClient({ name: e.target.value })}
                placeholder="Client or Company Name"
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-semibold focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Client Email</label>
                <input
                  type="email"
                  value={invoice.client.email || ''}
                  onChange={(e) => onUpdateClient({ email: e.target.value })}
                  placeholder="accounts@client.com"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Client Phone</label>
                <input
                  type="tel"
                  value={invoice.client.phone || ''}
                  onChange={(e) => onUpdateClient({ phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Client Address</label>
              <input
                type="text"
                value={invoice.client.addressLine1 || ''}
                onChange={(e) => onUpdateClient({ addressLine1: e.target.value })}
                placeholder="Client Street Address"
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500 font-medium mb-1">City, State, Zip</label>
                <input
                  type="text"
                  value={invoice.client.cityStateZip || ''}
                  onChange={(e) => onUpdateClient({ cityStateZip: e.target.value })}
                  placeholder="Austin, TX 78701"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Client Tax ID</label>
                <input
                  type="text"
                  value={invoice.client.taxIdNumber || ''}
                  onChange={(e) => onUpdateClient({ taxIdNumber: e.target.value })}
                  placeholder="Client Tax ID"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Taxes, Discounts, Shipping & Deposit */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('financials')}
          className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-rose-600" />
            <span className="text-sm">Taxes, Discounts & Totals</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-xs">
              {formatMoney(
                hasAmountPaid(invoice.amountPaid) ? calculations.balanceDue : calculations.total,
                invoice.currency
              )}
            </span>
            {openSections.financials ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {openSections.financials && (
          <div className="p-4 space-y-3 border-t border-slate-100">
            {/* Discount */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={invoice.discount.enabled}
                  onChange={(e) => onUpdateDiscount({ enabled: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Discount</span>
              </label>

              {invoice.discount.enabled ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={invoice.discount.value || ''}
                    onChange={(e) =>
                      onUpdateDiscount({ value: parseFloat(e.target.value) || 0 })
                    }
                    className="w-16 px-2 py-1 border border-slate-200 rounded text-right font-medium"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateDiscount({
                        type: invoice.discount.type === 'percentage' ? 'fixed' : 'percentage',
                      })
                    }
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-[11px]"
                  >
                    {invoice.discount.type === 'percentage' ? '%' : invoice.currency.symbol}
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateDiscount({ enabled: false, value: 0 })}
                    className="p-1 text-slate-400 hover:text-red-500"
                    title="Remove discount"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onUpdateDiscount({ enabled: true, type: 'percentage', value: 10 })}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Tax */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={invoice.tax.enabled}
                  onChange={(e) => onUpdateTax({ enabled: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Tax / VAT</span>
              </label>

              {invoice.tax.enabled ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={invoice.tax.name}
                    onChange={(e) => onUpdateTax({ name: e.target.value })}
                    placeholder="VAT"
                    className="w-16 px-2 py-1 border border-slate-200 rounded text-xs"
                  />
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={invoice.tax.rate || ''}
                    onChange={(e) =>
                      onUpdateTax({ rate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-14 px-2 py-1 border border-slate-200 rounded text-right font-medium"
                  />
                  <span className="text-slate-400">%</span>
                  <button
                    type="button"
                    onClick={() => onUpdateTax({ enabled: false, rate: 0 })}
                    className="p-1 text-slate-400 hover:text-red-500"
                    title="Remove tax"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onUpdateTax({ enabled: true, name: 'VAT', rate: 10 })}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-700">Shipping / Extra</span>
              {hasShipping(invoice.shipping) ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={invoice.shipping === 0 ? '' : invoice.shipping}
                    onChange={(e) => onUpdateShipping(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-20 px-2 py-1 border border-slate-200 rounded text-right font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => onUpdateShipping(0)}
                    className="p-1 text-slate-400 hover:text-red-500"
                    title="Remove shipping"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onUpdateShipping(15)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Amount Paid (Deposit) */}
            <div className="flex items-center justify-between py-1 border-t border-slate-100 pt-2">
              <span className="font-medium text-slate-700">Amount Paid (Deposit)</span>
              {hasAmountPaid(invoice.amountPaid) ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={invoice.amountPaid === 0 ? '' : invoice.amountPaid}
                    onChange={(e) => onUpdateAmountPaid(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-20 px-2 py-1 border border-slate-200 rounded text-right font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => onUpdateAmountPaid(0)}
                    className="p-1 text-slate-400 hover:text-red-500"
                    title="Remove amount paid"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onUpdateAmountPaid(Math.round(calculations.total * 0.5) || 50)
                  }
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Total / Balance Display */}
            <div className="p-3 bg-slate-900 rounded-xl flex justify-between items-center text-white">
              <span className="font-bold text-xs">
                {hasAmountPaid(invoice.amountPaid) ? 'Balance Due' : 'Total Amount'}
              </span>
              <span className="font-black text-sm">
                {formatMoney(
                  hasAmountPaid(invoice.amountPaid) ? calculations.balanceDue : calculations.total,
                  invoice.currency
                )}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 6. Bank Details, Notes, Terms & Signature */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('payment')}
          className="w-full px-4 py-3.5 flex items-center justify-between font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-600" />
            <span className="text-sm">Bank Details, Notes & Signing</span>
          </div>
          {openSections.payment ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.payment && (
          <div className="p-4 space-y-4 border-t border-slate-100">
            {/* Bank Details Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">Bank Details</span>
                {showBank ? (
                  <button
                    type="button"
                    onClick={() =>
                      onUpdatePaymentDetails({
                        bankName: '',
                        accountName: '',
                        accountNumber: '',
                        routingOrSwift: '',
                        iban: '',
                        paymentLink: '',
                        customInstructions: '',
                      })
                    }
                    className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-[11px]"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onUpdatePaymentDetails({
                        bankName: 'Chase Bank',
                        accountNumber: '**** 1234',
                      })
                    }
                    className="text-xs text-blue-600 hover:underline"
                  >
                    + Add Bank Details
                  </button>
                )}
              </div>

              {showBank && (
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-0.5">Bank Name</label>
                    <input
                      type="text"
                      value={invoice.paymentDetails.bankName || ''}
                      onChange={(e) => onUpdatePaymentDetails({ bankName: e.target.value })}
                      placeholder="Chase Bank"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-0.5">Account / IBAN</label>
                    <input
                      type="text"
                      value={invoice.paymentDetails.accountNumber || ''}
                      onChange={(e) => onUpdatePaymentDetails({ accountNumber: e.target.value })}
                      placeholder="**** 1234 or US89..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-0.5">Payment Link</label>
                    <input
                      type="text"
                      value={invoice.paymentDetails.paymentLink || ''}
                      onChange={(e) => onUpdatePaymentDetails({ paymentLink: e.target.value })}
                      placeholder="https://pay.stripe.com/..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden text-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Notes Section */}
            <div className="space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">Notes to Client</span>
                {showNotes ? (
                  <button
                    type="button"
                    onClick={() => onUpdateInvoice({ notes: '' })}
                    className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-[11px]"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateInvoice({
                        notes: 'Thank you for your business. We look forward to working together!',
                      })
                    }
                    className="text-xs text-blue-600 hover:underline"
                  >
                    + Add Notes
                  </button>
                )}
              </div>

              {showNotes && (
                <textarea
                  rows={2}
                  value={invoice.notes || ''}
                  onChange={(e) => onUpdateInvoice({ notes: e.target.value })}
                  placeholder="Thank you for your partnership!"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              )}
            </div>

            {/* Terms Section */}
            <div className="space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">Terms & Conditions</span>
                {showTerms ? (
                  <button
                    type="button"
                    onClick={() => onUpdateInvoice({ terms: '' })}
                    className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-[11px]"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateInvoice({
                        terms: 'Payment is due within 14 days of invoice date.',
                      })
                    }
                    className="text-xs text-blue-600 hover:underline"
                  >
                    + Add Terms
                  </button>
                )}
              </div>

              {showTerms && (
                <textarea
                  rows={2}
                  value={invoice.terms || ''}
                  onChange={(e) => onUpdateInvoice({ terms: e.target.value })}
                  placeholder="Late fees, payment window..."
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              )}
            </div>

            {/* Signature Section */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-slate-500" />
                <span>Authorized Signature Line</span>
              </span>
              {showSignature ? (
                <button
                  type="button"
                  onClick={() => onUpdateInvoice({ hasSignature: false })}
                  className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-[11px]"
                >
                  <X className="w-3 h-3" /> Remove
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onUpdateInvoice({ hasSignature: true })}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add Signature
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
