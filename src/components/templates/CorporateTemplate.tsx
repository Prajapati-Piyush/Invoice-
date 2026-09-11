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

export const CorporateTemplate: React.FC<TemplateProps> = ({
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
    <div className="w-full bg-white text-slate-800 font-sans select-text relative">
      {/* Top Accent Strip */}
      <div className="h-3 w-full" style={{ backgroundColor: accentColor }} />

      <div className="p-4 sm:p-8 md:p-12 print:p-12">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
          <div className="flex items-center gap-4">
            <LogoUploader
              logoUrl={sender.logoUrl}
              onChange={(url) => onUpdateSender({ logoUrl: url })}
            />
            <div>
              <EditableField
                value={sender.name}
                onChange={(val) => onUpdateSender({ name: val })}
                placeholder="Company Name Inc."
                inputClassName="font-extrabold text-xl text-slate-900 tracking-tight"
              />
              {sender.taxIdNumber?.trim() && (
                <EditableField
                  value={sender.taxIdNumber}
                  onChange={(val) => onUpdateSender({ taxIdNumber: val })}
                  placeholder="EIN / VAT ID"
                  inputClassName="text-xs font-mono text-slate-400"
                />
              )}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <EditableField
              value={customLabels.documentTitle}
              onChange={(val) => onUpdateCustomLabels({ documentTitle: val })}
              align="right"
              inputClassName="text-2xl sm:text-3xl font-black tracking-wider uppercase"
              style={{ color: accentColor }}
            />
            <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md text-xs font-semibold text-slate-700">
              <span>{customLabels.invoiceNumber}:</span>
              <div className="w-24">
                <EditableField
                  value={invoice.invoiceNumber}
                  onChange={(val) => onUpdateInvoice({ invoiceNumber: val })}
                  inputClassName="font-mono font-bold text-xs"
                />
              </div>
            </div>
            {hasPoNumber(invoice.poNumber) && (
              <div className="mt-1 flex sm:justify-end items-center gap-1.5 text-xs text-slate-500 group">
                <button
                  type="button"
                  onClick={() => onUpdateInvoice({ poNumber: undefined })}
                  className="text-slate-300 hover:text-red-500 transition-colors no-print"
                  title="Remove PO number"
                >
                  <X className="w-3 h-3" />
                </button>
                <span className="font-medium">PO #:</span>
                <div className="w-24">
                  <EditableField
                    value={invoice.poNumber || ''}
                    onChange={(val) => onUpdateInvoice({ poNumber: val })}
                    align="right"
                    inputClassName="font-mono font-semibold text-slate-700 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Structured From & To Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {/* Billed By Box */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 space-y-1">
            <span
              className="text-[11px] font-bold uppercase tracking-wider block mb-1"
              style={{ color: accentColor }}
            >
              {customLabels.fromSection}
            </span>
            <EditableField
              value={sender.name}
              onChange={(val) => onUpdateSender({ name: val })}
              placeholder="Your Business Name"
              inputClassName="font-bold text-sm text-slate-900"
            />
            {sender.email?.trim() && (
              <EditableField
                value={sender.email}
                onChange={(val) => onUpdateSender({ email: val })}
                placeholder="billing@company.com"
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
                placeholder="Address Line 1"
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
            {!hasSenderExtra && (
              <button
                type="button"
                onClick={() => onUpdateSender({ email: 'billing@company.com' })}
                className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-1"
              >
                + Add Sender Details
              </button>
            )}
          </div>

          {/* Billed To Box */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 space-y-1">
            <span
              className="text-[11px] font-bold uppercase tracking-wider block mb-1"
              style={{ color: accentColor }}
            >
              {customLabels.toSection}
            </span>
            <EditableField
              value={client.name}
              onChange={(val) => onUpdateClient({ name: val })}
              placeholder="Client Name / Organization"
              inputClassName="font-bold text-sm text-slate-900"
            />
            {client.email?.trim() && (
              <EditableField
                value={client.email}
                onChange={(val) => onUpdateClient({ email: val })}
                placeholder="client@org.com"
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
                placeholder="Client Tax / VAT Number"
                inputClassName="text-[11px] font-mono text-slate-400"
              />
            )}
            {!hasClientExtra && (
              <button
                type="button"
                onClick={() => onUpdateClient({ addressLine1: 'Client Address' })}
                className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-1"
              >
                + Add Client Details
              </button>
            )}
          </div>
        </div>

        {/* Dates Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-100/70 rounded-lg text-xs font-medium text-slate-700 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">{customLabels.issueDate}:</span>
            <EditableField
              value={invoice.issueDate}
              onChange={(val) => onUpdateInvoice({ issueDate: val })}
              type="date"
              inputClassName="font-semibold text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">{customLabels.dueDate}:</span>
            <EditableField
              value={invoice.dueDate}
              onChange={(val) => onUpdateInvoice({ dueDate: val })}
              type="date"
              inputClassName="font-semibold text-xs text-red-600"
            />
          </div>

          {invoice.paymentTerms?.trim() && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Terms:</span>
              <EditableField
                value={invoice.paymentTerms}
                onChange={(val) => onUpdateInvoice({ paymentTerms: val })}
                placeholder="Due upon receipt"
                inputClassName="font-medium text-xs text-slate-800"
              />
            </div>
          )}
        </div>

        {/* Line Items Table */}
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

        {/* Notes & Wire Instructions */}
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
    </div>
  );
};
