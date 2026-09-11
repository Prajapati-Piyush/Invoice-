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
import { X } from 'lucide-react';

export const CreativeTemplate: React.FC<TemplateProps> = ({
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
    <div className="w-full bg-white text-slate-800 font-sans select-text p-4 sm:p-8 md:p-12 print:p-12">
      {/* Top Banner: Huge Display Title + Big Balance Due Box */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 pb-8 border-b-2 border-slate-900">
        <div>
          <div className="mb-4">
            <LogoUploader
              logoUrl={sender.logoUrl}
              onChange={(url) => onUpdateSender({ logoUrl: url })}
            />
          </div>
          <EditableField
            value={customLabels.documentTitle}
            onChange={(val) => onUpdateCustomLabels({ documentTitle: val })}
            inputClassName="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-slate-900"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: accentColor }}
            >
              Invoice
            </span>
            <div className="w-32">
              <EditableField
                value={invoice.invoiceNumber}
                onChange={(val) => onUpdateInvoice({ invoiceNumber: val })}
                inputClassName="font-mono font-bold text-sm text-slate-900"
              />
            </div>
            {hasPoNumber(invoice.poNumber) && (
              <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md group">
                <button
                  type="button"
                  onClick={() => onUpdateInvoice({ poNumber: undefined })}
                  className="text-slate-300 hover:text-red-500 transition-colors no-print"
                  title="Remove PO number"
                >
                  <X className="w-3 h-3" />
                </button>
                <span className="font-semibold">PO:</span>
                <div className="w-20">
                  <EditableField
                    value={invoice.poNumber || ''}
                    onChange={(val) => onUpdateInvoice({ poNumber: val })}
                    inputClassName="font-mono font-bold text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Big Balance Due Card */}
        <div
          className="rounded-2xl p-5 sm:p-6 text-white w-full sm:w-auto sm:min-w-[240px] shadow-lg"
          style={{ backgroundColor: accentColor }}
        >
          <span className="text-xs uppercase font-bold tracking-widest text-white/80 block">
            {hasAmountPaid(invoice.amountPaid) ? customLabels.balanceDue : 'Total Amount'}
          </span>
          <p className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
            {formatMoney(
              hasAmountPaid(invoice.amountPaid) ? calculations.balanceDue : calculations.total,
              invoice.currency
            )}
          </p>
          <div className="mt-3 pt-3 border-t border-white/20 text-xs flex justify-between text-white/90">
            <span>Due Date:</span>
            <div className="w-24">
              <EditableField
                value={invoice.dueDate}
                onChange={(val) => onUpdateInvoice({ dueDate: val })}
                type="date"
                align="right"
                inputClassName="text-white font-semibold text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Studio info & Client Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
            Issued By
          </span>
          <EditableField
            value={sender.name}
            onChange={(val) => onUpdateSender({ name: val })}
            placeholder="Studio / Freelancer Name"
            inputClassName="font-extrabold text-lg text-slate-900"
          />
          {sender.email?.trim() && (
            <EditableField
              value={sender.email}
              onChange={(val) => onUpdateSender({ email: val })}
              placeholder="hello@studio.com"
              inputClassName="text-xs text-slate-600"
            />
          )}
          {sender.phone?.trim() && (
            <EditableField
              value={sender.phone}
              onChange={(val) => onUpdateSender({ phone: val })}
              placeholder="Phone Number"
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
              onClick={() => onUpdateSender({ email: 'hello@studio.com' })}
              className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-1"
            >
              + Add Studio Contact
            </button>
          )}
        </div>

        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
            Prepared For
          </span>
          <EditableField
            value={client.name}
            onChange={(val) => onUpdateClient({ name: val })}
            placeholder="Client Organization"
            inputClassName="font-extrabold text-lg text-slate-900"
          />
          {client.email?.trim() && (
            <EditableField
              value={client.email}
              onChange={(val) => onUpdateClient({ email: val })}
              placeholder="contact@client.com"
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
              placeholder="Client Address"
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
              placeholder="Client Tax ID"
              inputClassName="text-[11px] font-mono text-slate-400"
            />
          )}
          {!hasClientExtra && (
            <button
              type="button"
              onClick={() => onUpdateClient({ addressLine1: 'Client Address' })}
              className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-1"
            >
              + Add Client Contact
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Line Items */}
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

      {/* Notes & Bank Instructions */}
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
