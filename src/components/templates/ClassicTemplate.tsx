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
import { hasPoNumber } from '@/lib/invoice-helpers';
import { X } from 'lucide-react';

export const ClassicTemplate: React.FC<TemplateProps> = ({
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
    <div className="w-full bg-white text-slate-900 font-serif select-text p-4 sm:p-8 md:p-12 print:p-12 relative">
      {/* Formal Top Double-Rule Header */}
      <div className="border-t-4 border-slate-900 pt-4 pb-6 border-b border-slate-300">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <LogoUploader
              logoUrl={sender.logoUrl}
              onChange={(url) => onUpdateSender({ logoUrl: url })}
            />
            <div className="mt-3 space-y-0.5">
              <EditableField
                value={sender.name}
                onChange={(val) => onUpdateSender({ name: val })}
                placeholder="Business Name & Co."
                inputClassName="font-bold text-xl text-slate-900 uppercase tracking-wide font-serif"
              />
              <div className="text-xs text-slate-600 font-sans space-y-0.5">
                {sender.addressLine1?.trim() && (
                  <EditableField
                    value={sender.addressLine1}
                    onChange={(val) => onUpdateSender({ addressLine1: val })}
                    placeholder="Official Address"
                    inputClassName="text-xs text-slate-600 font-sans"
                  />
                )}
                {sender.cityStateZip?.trim() && (
                  <EditableField
                    value={sender.cityStateZip}
                    onChange={(val) => onUpdateSender({ cityStateZip: val })}
                    placeholder="City, State, Zip"
                    inputClassName="text-xs text-slate-600 font-sans"
                  />
                )}
                {sender.email?.trim() && (
                  <EditableField
                    value={sender.email}
                    onChange={(val) => onUpdateSender({ email: val })}
                    placeholder="email@company.com"
                    inputClassName="text-xs text-slate-600 font-sans"
                  />
                )}
                {sender.phone?.trim() && (
                  <EditableField
                    value={sender.phone}
                    onChange={(val) => onUpdateSender({ phone: val })}
                    placeholder="Phone"
                    inputClassName="text-xs text-slate-600 font-sans"
                  />
                )}
                {sender.taxIdNumber?.trim() && (
                  <EditableField
                    value={sender.taxIdNumber}
                    onChange={(val) => onUpdateSender({ taxIdNumber: val })}
                    placeholder="Tax Registration No."
                    inputClassName="text-[11px] font-mono text-slate-500 font-sans"
                  />
                )}
                {!hasSenderExtra && (
                  <button
                    type="button"
                    onClick={() => onUpdateSender({ addressLine1: 'Official Address' })}
                    className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-0.5 font-sans"
                  >
                    + Add Business Address
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-2 sm:min-w-[240px]">
            <EditableField
              value={customLabels.documentTitle}
              onChange={(val) => onUpdateCustomLabels({ documentTitle: val })}
              align="right"
              inputClassName="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase font-serif"
              style={{ color: accentColor }}
            />

            <div className="border border-slate-300 rounded-sm p-3 bg-slate-50/50 text-xs font-sans space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">{customLabels.invoiceNumber}:</span>
                <div className="w-24">
                  <EditableField
                    value={invoice.invoiceNumber}
                    onChange={(val) => onUpdateInvoice({ invoiceNumber: val })}
                    align="right"
                    inputClassName="font-bold font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">{customLabels.issueDate}:</span>
                <div className="w-28">
                  <EditableField
                    value={invoice.issueDate}
                    onChange={(val) => onUpdateInvoice({ issueDate: val })}
                    type="date"
                    align="right"
                    inputClassName="text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">{customLabels.dueDate}:</span>
                <div className="w-28">
                  <EditableField
                    value={invoice.dueDate}
                    onChange={(val) => onUpdateInvoice({ dueDate: val })}
                    type="date"
                    align="right"
                    inputClassName="text-xs font-semibold text-red-600"
                  />
                </div>
              </div>

              {hasPoNumber(invoice.poNumber) && (
                <div className="flex justify-between items-center group">
                  <span className="font-semibold text-slate-500 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onUpdateInvoice({ poNumber: undefined })}
                      className="text-slate-300 hover:text-red-500 transition-colors no-print"
                      title="Remove PO number"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    PO #:
                  </span>
                  <div className="w-28">
                    <EditableField
                      value={invoice.poNumber || ''}
                      onChange={(val) => onUpdateInvoice({ poNumber: val })}
                      align="right"
                      inputClassName="text-xs font-mono font-semibold text-slate-800"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Classical Remit & Sold To Two-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-300 text-xs font-sans">
        <div className="border border-slate-200 p-4 rounded-sm bg-slate-50/30">
          <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1 text-[11px]">
            {customLabels.fromSection} (Remit Payment To)
          </span>
          <EditableField
            value={sender.name}
            onChange={(val) => onUpdateSender({ name: val })}
            placeholder="Recipient Entity"
            inputClassName="font-bold text-slate-900 text-sm"
          />
          {sender.addressLine1?.trim() && (
            <EditableField
              value={sender.addressLine1}
              onChange={(val) => onUpdateSender({ addressLine1: val })}
              placeholder="Address"
              inputClassName="text-xs text-slate-600"
            />
          )}
          {sender.cityStateZip?.trim() && (
            <EditableField
              value={sender.cityStateZip}
              onChange={(val) => onUpdateSender({ cityStateZip: val })}
              placeholder="City, State, Zip"
              inputClassName="text-xs text-slate-600"
            />
          )}
          {sender.phone?.trim() && (
            <EditableField
              value={sender.phone}
              onChange={(val) => onUpdateSender({ phone: val })}
              placeholder="Phone"
              inputClassName="text-xs text-slate-600"
            />
          )}
        </div>

        <div className="border border-slate-200 p-4 rounded-sm bg-slate-50/30">
          <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1 text-[11px]">
            {customLabels.toSection} (Sold / Billed To)
          </span>
          <EditableField
            value={client.name}
            onChange={(val) => onUpdateClient({ name: val })}
            placeholder="Client Corporation / Purchaser"
            inputClassName="font-bold text-slate-900 text-sm"
          />
          {client.email?.trim() && (
            <EditableField
              value={client.email}
              onChange={(val) => onUpdateClient({ email: val })}
              placeholder="Client Email"
              inputClassName="text-xs text-slate-600"
            />
          )}
          {client.addressLine1?.trim() && (
            <EditableField
              value={client.addressLine1}
              onChange={(val) => onUpdateClient({ addressLine1: val })}
              placeholder="Billing Address"
              inputClassName="text-xs text-slate-600"
            />
          )}
          {client.cityStateZip?.trim() && (
            <EditableField
              value={client.cityStateZip}
              onChange={(val) => onUpdateClient({ cityStateZip: val })}
              placeholder="City, State, Zip"
              inputClassName="text-xs text-slate-600"
            />
          )}
          {client.taxIdNumber?.trim() && (
            <EditableField
              value={client.taxIdNumber}
              onChange={(val) => onUpdateClient({ taxIdNumber: val })}
              placeholder="Tax Identification No."
              inputClassName="text-[11px] font-mono text-slate-500"
            />
          )}
          {!hasClientExtra && (
            <button
              type="button"
              onClick={() => onUpdateClient({ addressLine1: 'Billing Address' })}
              className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-1"
            >
              + Add Client Address
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Line Items Table */}
      <div className="font-sans">
        <LineItemsTable
          items={invoice.items}
          currency={invoice.currency}
          onUpdateItem={onUpdateItem}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
          accentColor={accentColor}
          labels={customLabels}
        />
      </div>

      {/* Totals Section */}
      <div className="pb-8 font-sans">
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

      {/* Traditional Payment Remittance Advice & Notes */}
      <div className="border-t-2 border-dashed border-slate-300 pt-6 mt-6 font-sans">
        <PaymentNotes
          paymentDetails={invoice.paymentDetails}
          notes={invoice.notes}
          terms={invoice.terms}
          onUpdatePaymentDetails={onUpdatePaymentDetails}
          onUpdateNotes={(notes) => onUpdateInvoice({ notes })}
          onUpdateTerms={(terms) => onUpdateInvoice({ terms })}
        />

        {/* Formal Signature & Date line (Only if enabled) */}
        {invoice.hasSignature && (
          <SignatureBlock
            onRemove={() => onUpdateInvoice({ hasSignature: false })}
            isClassic
          />
        )}
      </div>

      {/* Quick Add Optional Sections Bar */}
      <div className="font-sans">
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
    </div>
  );
};
