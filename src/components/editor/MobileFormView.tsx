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
  FileText,
  Building,
  User,
  ShoppingBag,
  Receipt,
  CreditCard,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  PenTool,
} from 'lucide-react';

export const MobileFormView: React.FC<TemplateProps> = ({
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
  const [activeSection, setActiveSection] = useState<string>('items');

  const toggle = (sec: string) => {
    setActiveSection(activeSection === sec ? '' : sec);
  };

  const showBank = hasBankDetails(invoice.paymentDetails);
  const showNotes = hasNotes(invoice.notes);
  const showTerms = hasTerms(invoice.terms);
  const showSignature = Boolean(invoice.hasSignature);
  const showPo = hasPoNumber(invoice.poNumber);

  return (
    <div className="w-full space-y-3 pb-24 text-slate-800">
      {/* 1. Invoice Meta Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggle('meta')}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Invoice Details</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-normal text-slate-500">
              {invoice.invoiceNumber}
            </span>
            {activeSection === 'meta' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {activeSection === 'meta' && (
          <div className="p-3 sm:p-4 space-y-3 border-t border-slate-100 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Invoice Number</label>
              <input
                type="text"
                value={invoice.invoiceNumber}
                onChange={(e) => onUpdateInvoice({ invoiceNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Issue Date</label>
                <input
                  type="date"
                  value={invoice.issueDate}
                  onChange={(e) => onUpdateInvoice({ issueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => onUpdateInvoice({ dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            {/* PO Number */}
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onUpdateInvoice({ poNumber: 'PO-2026-001' })}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 py-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add PO Number
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Sender / Business Details */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggle('sender')}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
        >
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>Your Business (From)</span>
          </div>
          {activeSection === 'sender' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeSection === 'sender' && (
          <div className="p-3 sm:p-4 space-y-3 border-t border-slate-100 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Business Logo</label>
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
                placeholder="Your Business Name"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={invoice.sender.email || ''}
                  onChange={(e) => onUpdateSender({ email: e.target.value })}
                  placeholder="billing@company.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={invoice.sender.phone || ''}
                  onChange={(e) => onUpdateSender({ phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Street Address</label>
              <input
                type="text"
                value={invoice.sender.addressLine1 || ''}
                onChange={(e) => onUpdateSender({ addressLine1: e.target.value })}
                placeholder="123 Innovation Way"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 font-medium mb-1">City, State, Zip</label>
                <input
                  type="text"
                  value={invoice.sender.cityStateZip || ''}
                  onChange={(e) => onUpdateSender({ cityStateZip: e.target.value })}
                  placeholder="Austin, TX 78701"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Tax ID / VAT</label>
                <input
                  type="text"
                  value={invoice.sender.taxIdNumber || ''}
                  onChange={(e) => onUpdateSender({ taxIdNumber: e.target.value })}
                  placeholder="EIN / VAT ID"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Client Details */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggle('client')}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-violet-600" />
            <span>Client (Bill To)</span>
          </div>
          {activeSection === 'client' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeSection === 'client' && (
          <div className="p-3 sm:p-4 space-y-3 border-t border-slate-100 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Client / Company Name</label>
              <input
                type="text"
                value={invoice.client.name}
                onChange={(e) => onUpdateClient({ name: e.target.value })}
                placeholder="Acme Corp"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Client Email</label>
              <input
                type="email"
                value={invoice.client.email || ''}
                onChange={(e) => onUpdateClient({ email: e.target.value })}
                placeholder="client@acmecorp.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1">Client Address</label>
              <input
                type="text"
                value={invoice.client.addressLine1 || ''}
                onChange={(e) => onUpdateClient({ addressLine1: e.target.value })}
                placeholder="456 Market St"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 font-medium mb-1">City, State, Zip</label>
                <input
                  type="text"
                  value={invoice.client.cityStateZip || ''}
                  onChange={(e) => onUpdateClient({ cityStateZip: e.target.value })}
                  placeholder="New York, NY 10001"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-medium mb-1">Tax ID</label>
                <input
                  type="text"
                  value={invoice.client.taxIdNumber || ''}
                  onChange={(e) => onUpdateClient({ taxIdNumber: e.target.value })}
                  placeholder="Client Tax ID"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Line Items Section (Active by default) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggle('items')}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-600" />
            <span>Line Items ({invoice.items.length})</span>
          </div>
          {activeSection === 'items' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeSection === 'items' && (
          <div className="p-3.5 sm:p-4 space-y-3.5 sm:space-y-4 border-t border-slate-100 text-xs">
            {invoice.items.map((item, index) => {
              const lineTotal = calculateLineTotal(item.quantity, item.unitPrice);
              return (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2 relative"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-600">Item #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      disabled={invoice.items.length <= 1}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                      placeholder="Service or product description..."
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-3">
                      <label className="block text-slate-500 text-[10px] mb-1">Qty</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="any"
                        value={item.quantity === 0 ? '' : item.quantity}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          onUpdateItem(item.id, { quantity: isNaN(val) ? 0 : val });
                        }}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-center text-xs focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="col-span-4">
                      <label className="block text-slate-500 text-[10px] mb-1">Rate</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="any"
                        value={item.unitPrice === 0 ? '' : item.unitPrice}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          onUpdateItem(item.id, { unitPrice: isNaN(val) ? 0 : val });
                        }}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-right text-xs focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="col-span-5 text-right">
                      <span className="block text-slate-500 text-[10px] mb-1">Amount</span>
                      <span className="font-bold text-slate-900 block py-1 text-xs sm:text-sm truncate">
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
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-semibold text-blue-600 flex items-center justify-center gap-1 bg-blue-50/20"
            >
              <Plus className="w-4 h-4" /> Add Another Item
            </button>
          </div>
        )}
      </div>

      {/* 5. Discounts, Taxes & Financials */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggle('totals')}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
        >
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-rose-600" />
            <span>Taxes, Discounts & Total</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">
              {formatMoney(
                hasAmountPaid(invoice.amountPaid) ? calculations.balanceDue : calculations.total,
                invoice.currency
              )}
            </span>
            {activeSection === 'totals' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {activeSection === 'totals' && (
          <div className="p-3 sm:p-4 space-y-3 border-t border-slate-100 text-xs">
            <div className="flex justify-between items-center py-1 text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold">
                {formatMoney(calculations.subtotal, invoice.currency)}
              </span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={invoice.discount.enabled}
                  onChange={(e) => onUpdateDiscount({ enabled: e.target.checked })}
                  className="rounded text-blue-600"
                />
                <span>Discount</span>
              </label>
              {invoice.discount.enabled ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={invoice.discount.value || ''}
                    onChange={(e) =>
                      onUpdateDiscount({ value: parseFloat(e.target.value) || 0 })
                    }
                    className="w-16 px-2 py-1 border rounded text-right"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateDiscount({
                        type: invoice.discount.type === 'percentage' ? 'fixed' : 'percentage',
                      })
                    }
                    className="px-2 py-1 bg-slate-100 rounded font-semibold text-[11px]"
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
                  className="rounded text-blue-600"
                />
                <span>Tax / VAT</span>
              </label>
              {invoice.tax.enabled ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={invoice.tax.name}
                    onChange={(e) => onUpdateTax({ name: e.target.value })}
                    className="w-16 px-2 py-1 border rounded text-xs"
                    placeholder="VAT"
                  />
                  <input
                    type="number"
                    inputMode="decimal"
                    value={invoice.tax.rate || ''}
                    onChange={(e) =>
                      onUpdateTax({ rate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-14 px-2 py-1 border rounded text-right"
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
              <span className="text-slate-600">Shipping / Extra</span>
              {hasShipping(invoice.shipping) ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={invoice.shipping === 0 ? '' : invoice.shipping}
                    onChange={(e) => onUpdateShipping(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-20 px-2 py-1 border rounded text-right"
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

            {/* Total Display */}
            <div className="pt-2 border-t flex justify-between font-bold text-sm text-slate-900">
              <span>Total Amount</span>
              <span>{formatMoney(calculations.total, invoice.currency)}</span>
            </div>

            {/* Amount Paid */}
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600">Amount Paid (Deposit)</span>
              {hasAmountPaid(invoice.amountPaid) ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={invoice.amountPaid === 0 ? '' : invoice.amountPaid}
                    onChange={(e) => onUpdateAmountPaid(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-20 px-2 py-1 border rounded text-right"
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

            {/* Balance Due (Only if amountPaid > 0) */}
            {hasAmountPaid(invoice.amountPaid) && (
              <div className="p-3 bg-blue-50 rounded-xl flex justify-between items-center text-blue-900 font-extrabold text-base">
                <span>Balance Due</span>
                <span>{formatMoney(calculations.balanceDue, invoice.currency)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 6. Bank Details, Notes, Terms & Signature */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggle('payment')}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 bg-slate-50/50 hover:bg-slate-50"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-600" />
            <span>Bank, Notes & Signature</span>
          </div>
          {activeSection === 'payment' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeSection === 'payment' && (
          <div className="p-3.5 sm:p-4 space-y-3.5 sm:space-y-4 border-t border-slate-100 text-xs">
            {/* Bank Details */}
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
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={invoice.paymentDetails.bankName || ''}
                      onChange={(e) => onUpdatePaymentDetails({ bankName: e.target.value })}
                      placeholder="Chase Bank"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Account Number</label>
                    <input
                      type="text"
                      value={invoice.paymentDetails.accountNumber || ''}
                      onChange={(e) => onUpdatePaymentDetails({ accountNumber: e.target.value })}
                      placeholder="**** 1234"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Payment Link</label>
                    <input
                      type="text"
                      value={invoice.paymentDetails.paymentLink || ''}
                      onChange={(e) => onUpdatePaymentDetails({ paymentLink: e.target.value })}
                      placeholder="https://pay.stripe.com/..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden text-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Notes to Client */}
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
                  placeholder="Thank you for your business..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              )}
            </div>

            {/* Terms & Conditions */}
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              )}
            </div>

            {/* Signature Block */}
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
