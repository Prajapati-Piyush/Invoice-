'use client';

import React from 'react';
import { PaymentDetails } from '@/types/invoice';
import { EditableField } from './EditableField';
import { hasBankDetails, hasNotes, hasTerms } from '@/lib/invoice-helpers';
import { X } from 'lucide-react';

interface PaymentNotesProps {
  paymentDetails: PaymentDetails;
  notes?: string;
  terms?: string;
  onUpdatePaymentDetails: (patch: Partial<PaymentDetails>) => void;
  onUpdateNotes: (notes: string) => void;
  onUpdateTerms: (terms: string) => void;
}

export const PaymentNotes: React.FC<PaymentNotesProps> = ({
  paymentDetails,
  notes,
  terms,
  onUpdatePaymentDetails,
  onUpdateNotes,
  onUpdateTerms,
}) => {
  const showBank = hasBankDetails(paymentDetails);
  const showNotes = hasNotes(notes);
  const showTerms = hasTerms(terms);

  // If nothing is provided, render absolutely nothing! (Zero whitespace waste)
  if (!showBank && !showNotes && !showTerms) {
    return null;
  }

  const handleClearBank = () => {
    onUpdatePaymentDetails({
      bankName: '',
      accountName: '',
      accountNumber: '',
      routingOrSwift: '',
      iban: '',
      paymentLink: '',
      customInstructions: '',
    });
  };

  const isSplitGrid = showBank && (showNotes || showTerms);

  return (
    <div
      className={`w-full pt-6 border-t border-slate-100 text-xs text-slate-600 print-break-inside-avoid ${
        isSplitGrid ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'
      }`}
    >
      {/* Payment Details & Bank Wire Info (Only if user has entered bank details) */}
      {showBank && (
        <div className={`space-y-2 group relative ${isSplitGrid ? '' : 'max-w-md'}`}>
          <div className="flex justify-between items-center">
            <p className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
              Payment Instructions
            </p>
            <button
              type="button"
              onClick={handleClearBank}
              className="no-print opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 flex items-center gap-1 text-[11px] font-medium bg-slate-50 hover:bg-red-50 px-2 py-0.5 rounded-md"
              title="Remove payment instructions"
            >
              <X className="w-3 h-3" />
              <span>Remove</span>
            </button>
          </div>

          <div className="space-y-1 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
            {paymentDetails.bankName !== undefined && (
              <div className="grid grid-cols-3 gap-1 items-center">
                <span className="text-slate-400 font-medium">Bank:</span>
                <div className="col-span-2">
                  <EditableField
                    value={paymentDetails.bankName || ''}
                    onChange={(val) => onUpdatePaymentDetails({ bankName: val })}
                    placeholder="Bank Name"
                    inputClassName="text-xs font-medium text-slate-800"
                  />
                </div>
              </div>
            )}

            {paymentDetails.accountName !== undefined && (
              <div className="grid grid-cols-3 gap-1 items-center">
                <span className="text-slate-400 font-medium">Account Name:</span>
                <div className="col-span-2">
                  <EditableField
                    value={paymentDetails.accountName || ''}
                    onChange={(val) => onUpdatePaymentDetails({ accountName: val })}
                    placeholder="Account Holder Name"
                    inputClassName="text-xs font-medium text-slate-800"
                  />
                </div>
              </div>
            )}

            {paymentDetails.accountNumber !== undefined && (
              <div className="grid grid-cols-3 gap-1 items-center">
                <span className="text-slate-400 font-medium">Account No:</span>
                <div className="col-span-2">
                  <EditableField
                    value={paymentDetails.accountNumber || ''}
                    onChange={(val) => onUpdatePaymentDetails({ accountNumber: val })}
                    placeholder="Account / IBAN Number"
                    inputClassName="text-xs font-mono text-slate-800"
                  />
                </div>
              </div>
            )}

            {paymentDetails.routingOrSwift !== undefined && (
              <div className="grid grid-cols-3 gap-1 items-center">
                <span className="text-slate-400 font-medium">Routing / SWIFT:</span>
                <div className="col-span-2">
                  <EditableField
                    value={paymentDetails.routingOrSwift || ''}
                    onChange={(val) => onUpdatePaymentDetails({ routingOrSwift: val })}
                    placeholder="Routing No. or SWIFT/BIC"
                    inputClassName="text-xs font-mono text-slate-800"
                  />
                </div>
              </div>
            )}

            {paymentDetails.iban !== undefined && (
              <div className="grid grid-cols-3 gap-1 items-center">
                <span className="text-slate-400 font-medium">IBAN:</span>
                <div className="col-span-2">
                  <EditableField
                    value={paymentDetails.iban || ''}
                    onChange={(val) => onUpdatePaymentDetails({ iban: val })}
                    placeholder="IBAN Code"
                    inputClassName="text-xs font-mono text-slate-800"
                  />
                </div>
              </div>
            )}

            {paymentDetails.paymentLink !== undefined && (
              <div className="grid grid-cols-3 gap-1 items-center">
                <span className="text-slate-400 font-medium">Payment Link:</span>
                <div className="col-span-2">
                  <EditableField
                    value={paymentDetails.paymentLink || ''}
                    onChange={(val) => onUpdatePaymentDetails({ paymentLink: val })}
                    placeholder="Payment URL"
                    inputClassName="text-xs text-blue-600 truncate"
                  />
                </div>
              </div>
            )}

            {paymentDetails.customInstructions !== undefined && (
              <div className="pt-1">
                <EditableField
                  value={paymentDetails.customInstructions || ''}
                  onChange={(val) => onUpdatePaymentDetails({ customInstructions: val })}
                  placeholder="Additional payment notes..."
                  multiline
                  inputClassName="text-xs text-slate-600"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notes & Terms (Only if text is provided) */}
      {(showNotes || showTerms) && (
        <div className={`space-y-4 ${isSplitGrid ? '' : 'max-w-xl'}`}>
          {showNotes && (
            <div className="group relative">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                  Notes to Client
                </p>
                <button
                  type="button"
                  onClick={() => onUpdateNotes('')}
                  className="no-print opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 flex items-center gap-1 text-[11px] font-medium bg-slate-50 hover:bg-red-50 px-2 py-0.5 rounded-md"
                  title="Remove notes"
                >
                  <X className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
              <EditableField
                value={notes || ''}
                onChange={onUpdateNotes}
                placeholder="Notes to client..."
                multiline
                inputClassName="text-xs text-slate-600"
              />
            </div>
          )}

          {showTerms && (
            <div className="group relative">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                  Terms & Conditions
                </p>
                <button
                  type="button"
                  onClick={() => onUpdateTerms('')}
                  className="no-print opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 flex items-center gap-1 text-[11px] font-medium bg-slate-50 hover:bg-red-50 px-2 py-0.5 rounded-md"
                  title="Remove terms"
                >
                  <X className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
              <EditableField
                value={terms || ''}
                onChange={onUpdateTerms}
                placeholder="Terms and conditions..."
                multiline
                inputClassName="text-xs text-slate-400"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
