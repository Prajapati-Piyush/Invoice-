'use client';

import React from 'react';
import { InvoiceData, DiscountConfig, TaxConfig, PaymentDetails } from '@/types/invoice';
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
import {
  Plus,
  Percent,
  Receipt,
  Truck,
  DollarSign,
  Landmark,
  FileText,
  ShieldAlert,
  PenTool,
  Hash,
} from 'lucide-react';

interface QuickAddSectionsBarProps {
  invoice: InvoiceData;
  onUpdateInvoice: (patch: Partial<InvoiceData>) => void;
  onUpdateDiscount: (patch: Partial<DiscountConfig>) => void;
  onUpdateTax: (patch: Partial<TaxConfig>) => void;
  onUpdateShipping: (amount: number) => void;
  onUpdateAmountPaid: (amount: number) => void;
  onUpdatePaymentDetails: (patch: Partial<PaymentDetails>) => void;
  totalAmount: number;
}

export const QuickAddSectionsBar: React.FC<QuickAddSectionsBarProps> = ({
  invoice,
  onUpdateInvoice,
  onUpdateDiscount,
  onUpdateTax,
  onUpdateShipping,
  onUpdateAmountPaid,
  onUpdatePaymentDetails,
  totalAmount,
}) => {
  const showDiscount = hasDiscount(invoice.discount);
  const showTax = hasTax(invoice.tax);
  const showShipping = hasShipping(invoice.shipping);
  const showAmountPaid = hasAmountPaid(invoice.amountPaid);
  const showBank = hasBankDetails(invoice.paymentDetails);
  const showNotes = hasNotes(invoice.notes);
  const showTerms = hasTerms(invoice.terms);
  const showSignature = Boolean(invoice.hasSignature);
  const showPo = hasPoNumber(invoice.poNumber);

  // Check if there are any sections left to add
  const hasSectionsToAdd =
    !showDiscount ||
    !showTax ||
    !showShipping ||
    !showAmountPaid ||
    !showBank ||
    !showNotes ||
    !showTerms ||
    !showSignature ||
    !showPo;

  if (!hasSectionsToAdd) {
    return null;
  }

  return (
    <div className="no-print pt-6 pb-2 border-t border-dashed border-slate-200 mt-6">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Add Optional Sections:
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {!showDiscount && (
          <button
            type="button"
            onClick={() => onUpdateDiscount({ enabled: true, type: 'percentage', value: 10 })}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
            <Percent className="w-3 h-3 text-slate-400" />
            <span>Add Discount</span>
          </button>
        )}

        {!showTax && (
          <button
            type="button"
            onClick={() => onUpdateTax({ enabled: true, name: 'VAT', rate: 10 })}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <Receipt className="w-3 h-3 text-slate-400" />
            <span>Add Tax / VAT</span>
          </button>
        )}

        {!showShipping && (
          <button
            type="button"
            onClick={() => onUpdateShipping(15)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <Truck className="w-3 h-3 text-slate-400" />
            <span>Add Shipping / Extra Charges</span>
          </button>
        )}

        {!showAmountPaid && (
          <button
            type="button"
            onClick={() => onUpdateAmountPaid(Math.round(totalAmount * 0.5) || 50)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <DollarSign className="w-3 h-3 text-slate-400" />
            <span>Add Deposit / Amount Paid</span>
          </button>
        )}

        {!showBank && (
          <button
            type="button"
            onClick={() =>
              onUpdatePaymentDetails({
                bankName: 'Chase Bank',
                accountNumber: '**** 1234',
                routingOrSwift: 'CHASUS33',
              })
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <Landmark className="w-3 h-3 text-slate-400" />
            <span>Add Bank Details</span>
          </button>
        )}

        {!showNotes && (
          <button
            type="button"
            onClick={() =>
              onUpdateInvoice({
                notes: 'Thank you for your business. We look forward to working with you again!',
              })
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <FileText className="w-3 h-3 text-slate-400" />
            <span>Add Notes</span>
          </button>
        )}

        {!showTerms && (
          <button
            type="button"
            onClick={() =>
              onUpdateInvoice({
                terms:
                  'Payment is due within 14 days of issue date. Invoices remaining unpaid after due date will incur a 1.5% late fee per month.',
              })
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <ShieldAlert className="w-3 h-3 text-slate-400" />
            <span>Add Terms</span>
          </button>
        )}

        {!showSignature && (
          <button
            type="button"
            onClick={() => onUpdateInvoice({ hasSignature: true })}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <PenTool className="w-3 h-3 text-slate-400" />
            <span>Add Signature</span>
          </button>
        )}

        {!showPo && (
          <button
            type="button"
            onClick={() => onUpdateInvoice({ poNumber: 'PO-2026-001' })}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <Hash className="w-3 h-3 text-slate-400" />
            <span>Add PO Number</span>
          </button>
        )}
      </div>
    </div>
  );
};

