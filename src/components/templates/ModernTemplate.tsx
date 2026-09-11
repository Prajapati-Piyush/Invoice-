'use client';

import React from 'react';
import { TemplateProps } from './MinimalTemplate';
import { EditableField } from '../editor/EditableField';
import { LogoUploader } from '../editor/LogoUploader';
import { LineItemsTable } from '../editor/LineItemsTable';
import { TotalsSummary } from '../editor/TotalsSummary';
import { PaymentNotes } from '../editor/PaymentNotes';
import { SignatureBlock } from '../editor/SignatureBlock';
import { QuickAddSectionsBar } from '../editor/QuickAddSectionsBar';
import { formatMoney } from '@/lib/currencies';
import { hasPoNumber, hasAmountPaid } from '@/lib/invoice-helpers';
import { Calendar, Hash, Clock, ShieldCheck, X } from 'lucide-react';

export const ModernTemplate: React.FC<TemplateProps> = ({
  invoice,
  calculations,
  onUpdateSender,
  onUpdateClient,
  onUpdateInvoice,
  onUpdateCustomLabels,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  onUpdateDiscount,
  onUpdateTax,
  onUpdateShipping,
  onUpdateAmountPaid,
  onUpdatePaymentDetails,
}) => {
  const { sender, client, customLabels, accentColor } = invoice;

  const hasSenderExtra = Boolean(
    sender.email?.trim() ||
    sender.addressLine1?.trim() ||
    sender.cityStateZip?.trim() ||
    sender.phone?.trim() ||
    sender.taxIdNumber?.trim()
  );

  const hasClientExtra = Boolean(
    client.email?.trim() ||
    client.addressLine1?.trim() ||
    client.cityStateZip?.trim() ||
    client.phone?.trim() ||
    client.taxIdNumber?.trim()
  );

  return (
    <div className="w-full bg-white text-slate-800 font-sans select-text p-4 sm:p-8 md:p-12 print:p-12 relative overflow-hidden">
      {/* Decorative modern background geometric gradient accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none blur-3xl -mr-20 -mt-20"
        style={{ backgroundColor: accentColor }}
      />

      {/* Header with modern split layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pb-8 border-b border-slate-200/80">
        <div>
          <LogoUploader
            logoUrl={sender.logoUrl}
            onChange={(url) => onUpdateSender({ logoUrl: url })}
          />
          <div className="mt-4 space-y-1">
            <EditableField
              value={sender.name}
              onChange={(val) => onUpdateSender({ name: val })}
              placeholder="Your Brand or Studio"
              inputClassName="font-black text-xl tracking-tight text-slate-900"
            />
            <div className="text-xs text-slate-500 space-y-0.5 pt-0.5">
              {sender.email?.trim() && (
                <EditableField
                  value={sender.email}
                  onChange={(val) => onUpdateSender({ email: val })}
                  placeholder="contact@brand.com"
                  inputClassName="text-xs text-slate-500"
                />
              )}
              {sender.phone?.trim() && (
                <EditableField
                  value={sender.phone}
                  onChange={(val) => onUpdateSender({ phone: val })}
                  placeholder="+1 (555) 000-0000"
                  inputClassName="text-xs text-slate-500"
                />
              )}
              {sender.addressLine1?.trim() && (
                <EditableField
                  value={sender.addressLine1}
                  onChange={(val) => onUpdateSender({ addressLine1: val })}
                  placeholder="Studio Street Address"
                  inputClassName="text-xs text-slate-500"
                />
              )}
              {sender.cityStateZip?.trim() && (
                <EditableField
                  value={sender.cityStateZip}
                  onChange={(val) => onUpdateSender({ cityStateZip: val })}
                  placeholder="City, State, Zip"
                  inputClassName="text-xs text-slate-500"
                />
              )}
              {sender.taxIdNumber?.trim() && (
                <EditableField
                  value={sender.taxIdNumber}
                  onChange={(val) => onUpdateSender({ taxIdNumber: val })}
                  placeholder="Tax ID"
                  inputClassName="text-[11px] font-mono text-slate-400"
                />
              )}
              {!hasSenderExtra && (
                <button
                  type="button"
                  onClick={() => onUpdateSender({ email: 'contact@brand.com' })}
                  className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-0.5"
                >
                  + Add Studio Contact
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modern Document Header Badge & Metadata */}
        <div className="sm:text-right space-y-3">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-xs"
            style={{ backgroundColor: accentColor }}
          >
            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
            <EditableField
              value={customLabels.documentTitle}
              onChange={(val) => onUpdateCustomLabels({ documentTitle: val })}
              inputClassName="text-white font-bold text-xs uppercase tracking-widest bg-transparent"
            />
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 pt-1">
            <div className="flex sm:justify-end items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1">
                <Hash className="w-3 h-3" />
                {customLabels.invoiceNumber}:
              </span>
              <div className="w-28">
                <EditableField
                  value={invoice.invoiceNumber}
                  onChange={(val) => onUpdateInvoice({ invoiceNumber: val })}
                  align="right"
                  inputClassName="font-mono font-bold text-slate-900 text-xs"
                />
              </div>
            </div>

            <div className="flex sm:justify-end items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {customLabels.issueDate}:
              </span>
              <div className="w-28">
                <EditableField
                  value={invoice.issueDate}
                  onChange={(val) => onUpdateInvoice({ issueDate: val })}
                  type="date"
                  align="right"
                  inputClassName="text-slate-700 text-xs"
                />
              </div>
            </div>

            <div className="flex sm:justify-end items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {customLabels.dueDate}:
              </span>
              <div className="w-28">
                <EditableField
                  value={invoice.dueDate}
                  onChange={(val) => onUpdateInvoice({ dueDate: val })}
                  type="date"
                  align="right"
                  inputClassName="text-slate-700 font-semibold text-xs text-red-600"
                />
              </div>
            </div>

            {hasPoNumber(invoice.poNumber) && (
              <div className="flex sm:justify-end items-center gap-2 group">
                <button
                  type="button"
                  onClick={() => onUpdateInvoice({ poNumber: undefined })}
                  className="text-slate-300 hover:text-red-500 transition-colors no-print"
                  title="Remove PO number"
                >
                  <X className="w-3 h-3" />
                </button>
                <span className="text-slate-400">PO #:</span>
                <div className="w-28">
                  <EditableField
                    value={invoice.poNumber || ''}
                    onChange={(val) => onUpdateInvoice({ poNumber: val })}
                    align="right"
                    inputClassName="font-mono font-bold text-slate-900 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bill To Info */}
      <div className="py-6 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-1.5">
            {customLabels.toSection}
          </span>
          <EditableField
            value={client.name}
            onChange={(val) => onUpdateClient({ name: val })}
            placeholder="Client or Company Name"
            inputClassName="font-extrabold text-base text-slate-900"
          />
          {client.email?.trim() && (
            <EditableField
              value={client.email}
              onChange={(val) => onUpdateClient({ email: val })}
              placeholder="billing@client.com"
              inputClassName="text-xs text-slate-600"
            />
          )}
          {client.phone?.trim() && (
            <EditableField
              value={client.phone}
              onChange={(val) => onUpdateClient({ phone: val })}
              placeholder="Client Phone"
              inputClassName="text-xs text-slate-500"
            />
          )}
          {client.addressLine1?.trim() && (
            <EditableField
              value={client.addressLine1}
              onChange={(val) => onUpdateClient({ addressLine1: val })}
              placeholder="Street Address"
              inputClassName="text-xs text-slate-500"
            />
          )}
          {client.cityStateZip?.trim() && (
            <EditableField
              value={client.cityStateZip}
              onChange={(val) => onUpdateClient({ cityStateZip: val })}
              placeholder="City, State, Zip"
              inputClassName="text-xs text-slate-500"
            />
          )}
          {client.taxIdNumber?.trim() && (
            <EditableField
              value={client.taxIdNumber}
              onChange={(val) => onUpdateClient({ taxIdNumber: val })}
              placeholder="Tax / VAT ID"
              inputClassName="text-[11px] font-mono text-slate-400"
            />
          )}
          {!hasClientExtra && (
            <button
              type="button"
              onClick={() => onUpdateClient({ addressLine1: 'Client Street Address' })}
              className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-1"
            >
              + Add Client Contact Info
            </button>
          )}
        </div>

        {/* Status / Amount Display Card */}
        <div className="bg-slate-50/80 rounded-2xl p-4 flex flex-col justify-between border border-slate-100">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Payment Status:</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              {calculations.balanceDue > 0 ? 'Pending Payment' : 'Paid in Full'}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-between items-baseline">
            <span className="text-xs text-slate-500 font-bold uppercase">
              {hasAmountPaid(invoice.amountPaid) ? 'Balance Due' : 'Total Due'}
            </span>
            <span className="text-2xl font-black text-slate-900" style={{ color: accentColor }}>
              {formatMoney(
                hasAmountPaid(invoice.amountPaid) ? calculations.balanceDue : calculations.total,
                invoice.currency
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Line Items Table */}
      <LineItemsTable
        items={invoice.items}
        currency={invoice.currency}
        onUpdateItem={onUpdateItem}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
        accentColor={accentColor}
        labels={customLabels}
      />

      {/* Totals Section */}
      <div className="pb-8">
        <TotalsSummary
          calculations={calculations}
          currency={invoice.currency}
          discount={invoice.discount}
          tax={invoice.tax}
          shipping={invoice.shipping}
          amountPaid={invoice.amountPaid}
          onUpdateDiscount={onUpdateDiscount}
          onUpdateTax={onUpdateTax}
          onUpdateShipping={onUpdateShipping}
          onUpdateAmountPaid={onUpdateAmountPaid}
          accentColor={accentColor}
          labels={customLabels}
        />
      </div>

      {/* Payment Notes */}
      <PaymentNotes
        paymentDetails={invoice.paymentDetails}
        notes={invoice.notes}
        terms={invoice.terms}
        onUpdatePaymentDetails={onUpdatePaymentDetails}
        onUpdateNotes={(notes) => onUpdateInvoice({ notes })}
        onUpdateTerms={(terms) => onUpdateInvoice({ terms })}
      />

      {/* Signature Block */}
      {invoice.hasSignature && (
        <SignatureBlock onRemove={() => onUpdateInvoice({ hasSignature: false })} />
      )}

      {/* Quick Add Optional Sections Bar */}
      <QuickAddSectionsBar
        invoice={invoice}
        onUpdateInvoice={onUpdateInvoice}
        onUpdateDiscount={onUpdateDiscount}
        onUpdateTax={onUpdateTax}
        onUpdateShipping={onUpdateShipping}
        onUpdateAmountPaid={onUpdateAmountPaid}
        onUpdatePaymentDetails={onUpdatePaymentDetails}
        totalAmount={calculations.total}
      />
    </div>
  );
};
