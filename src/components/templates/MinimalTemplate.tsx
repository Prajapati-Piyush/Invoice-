'use client';

import React from 'react';
import {
  InvoiceData,
  InvoiceCalculations,
  BusinessEntity,
  LineItem,
  DiscountConfig,
  TaxConfig,
  PaymentDetails,
  InvoiceLabels,
} from '@/types/invoice';
import { EditableField } from '../editor/EditableField';
import { LogoUploader } from '../editor/LogoUploader';
import { LineItemsTable } from '../editor/LineItemsTable';
import { TotalsSummary } from '../editor/TotalsSummary';
import { PaymentNotes } from '../editor/PaymentNotes';
import { SignatureBlock } from '../editor/SignatureBlock';
import { QuickAddSectionsBar } from '../editor/QuickAddSectionsBar';
import { hasPoNumber } from '@/lib/invoice-helpers';
import { X } from 'lucide-react';

export interface TemplateProps {
  invoice: InvoiceData;
  calculations: InvoiceCalculations;
  onUpdateSender: (patch: Partial<BusinessEntity>) => void;
  onUpdateClient: (patch: Partial<BusinessEntity>) => void;
  onUpdateInvoice: (patch: Partial<InvoiceData>) => void;
  onUpdateCustomLabels: (patch: Partial<InvoiceLabels>) => void;
  onUpdateItem: (id: string, patch: Partial<LineItem>) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateDiscount: (patch: Partial<DiscountConfig>) => void;
  onUpdateTax: (patch: Partial<TaxConfig>) => void;
  onUpdateShipping: (amount: number) => void;
  onUpdateAmountPaid: (amount: number) => void;
  onUpdatePaymentDetails: (patch: Partial<PaymentDetails>) => void;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({
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
    <div className="w-full bg-white p-4 sm:p-8 md:p-12 print:p-12 text-slate-800 font-sans select-text">
      {/* Top Header: Logo on left, Document Title & Invoice # on right */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-100">
        <div>
          <LogoUploader
            logoUrl={sender.logoUrl}
            onChange={(url) => onUpdateSender({ logoUrl: url })}
          />
          <div className="mt-3 space-y-0.5">
            <EditableField
              value={sender.name}
              onChange={(val) => onUpdateSender({ name: val })}
              placeholder="Your Business Name"
              inputClassName="font-bold text-lg text-slate-900"
            />
            {sender.email?.trim() && (
              <EditableField
                value={sender.email}
                onChange={(val) => onUpdateSender({ email: val })}
                placeholder="your@email.com"
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
                placeholder="Street Address"
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
                placeholder="Tax ID / VAT / GSTIN"
                inputClassName="text-[11px] text-slate-400 font-mono"
              />
            )}
            {!hasSenderExtra && (
              <button
                type="button"
                onClick={() => onUpdateSender({ email: 'billing@company.com' })}
                className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-0.5"
              >
                + Add Business Contact
              </button>
            )}
          </div>
        </div>

        {/* Invoice Title, Number, Dates */}
        <div className="text-left sm:text-right space-y-1 sm:min-w-[220px]">
          <EditableField
            value={customLabels.documentTitle}
            onChange={(val) => onUpdateCustomLabels({ documentTitle: val })}
            align="right"
            inputClassName="text-2xl sm:text-3xl font-extrabold tracking-tight"
            style={{ color: accentColor }}
          />

          <div className="pt-2 space-y-1 text-xs">
            <div className="flex sm:justify-end items-center gap-2">
              <span className="text-slate-400 font-medium">{customLabels.invoiceNumber}:</span>
              <div className="w-28">
                <EditableField
                  value={invoice.invoiceNumber}
                  onChange={(val) => onUpdateInvoice({ invoiceNumber: val })}
                  align="right"
                  inputClassName="font-semibold text-slate-800 text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex sm:justify-end items-center gap-2">
              <span className="text-slate-400 font-medium">{customLabels.issueDate}:</span>
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
              <span className="text-slate-400 font-medium">{customLabels.dueDate}:</span>
              <div className="w-28">
                <EditableField
                  value={invoice.dueDate}
                  onChange={(val) => onUpdateInvoice({ dueDate: val })}
                  type="date"
                  align="right"
                  inputClassName="text-slate-700 text-xs"
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
                <span className="text-slate-400 font-medium">PO #:</span>
                <div className="w-28">
                  <EditableField
                    value={invoice.poNumber || ''}
                    onChange={(val) => onUpdateInvoice({ poNumber: val })}
                    placeholder="PO-0000"
                    align="right"
                    inputClassName="text-slate-700 text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="py-6 border-b border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          {customLabels.toSection}
        </span>
        <div className="max-w-sm space-y-0.5">
          <EditableField
            value={client.name}
            onChange={(val) => onUpdateClient({ name: val })}
            placeholder="Client or Company Name"
            inputClassName="font-semibold text-base text-slate-900"
          />
          {client.email?.trim() && (
            <EditableField
              value={client.email}
              onChange={(val) => onUpdateClient({ email: val })}
              placeholder="client@company.com"
              inputClassName="text-xs text-slate-500"
            />
          )}
          {client.phone?.trim() && (
            <EditableField
              value={client.phone}
              onChange={(val) => onUpdateClient({ phone: val })}
              placeholder="+1 (555) 000-0000"
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
              placeholder="Client Tax ID"
              inputClassName="text-[11px] text-slate-400 font-mono"
            />
          )}
          {!hasClientExtra && (
            <button
              type="button"
              onClick={() => onUpdateClient({ addressLine1: 'Client Street Address' })}
              className="no-print text-[11px] text-slate-400 hover:text-blue-600 block transition-colors pt-0.5"
            >
              + Add Client Address
            </button>
          )}
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

      {/* Notes & Bank Instructions (Only rendered if non-empty) */}
      <PaymentNotes
        paymentDetails={invoice.paymentDetails}
        notes={invoice.notes}
        terms={invoice.terms}
        onUpdatePaymentDetails={onUpdatePaymentDetails}
        onUpdateNotes={(notes) => onUpdateInvoice({ notes })}
        onUpdateTerms={(terms) => onUpdateInvoice({ terms })}
      />

      {/* Signature Section (Only rendered if enabled) */}
      {invoice.hasSignature && (
        <SignatureBlock onRemove={() => onUpdateInvoice({ hasSignature: false })} />
      )}

      {/* Quick Add Optional Sections Toolbar */}
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
