import React from 'react';
import {
  FileCheck,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export const InvoiceGuideSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Essential Invoicing Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Everything You Need to Know About Professional Invoicing
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether you are a freelance developer, creative consultant, or small business owner,
            sending clear, structured invoices is key to getting paid on time and maintaining legal compliance.
          </p>
        </div>

        {/* 3 Guide Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Anatomy of an Invoice */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                1. The Anatomy of a Valid Invoice
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                A legally sound invoice must clearly identify both parties and itemize what work was completed.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Unique Identifier:</strong> Sequential number (e.g., INV-0042).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dates:</strong> Issue date and explicitly stated due date.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tax IDs:</strong> VAT, GSTIN, or EIN for tax compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Itemized Breakdown:</strong> Description, units, rates, and totals.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Payment Terms */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                2. Standard Payment Terms Explained
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Avoid payment disputes by specifying payment timelines upfront in your terms or agreement.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Due on Receipt:</strong> Payment expected immediately upon delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Net 15 / Net 30:</strong> Payment due 15 or 30 days after invoice date.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Late Fees:</strong> 1.5% - 2% per month on overdue invoices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Milestone Invoices:</strong> 50% upfront, 50% upon project approval.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Best Practices to Get Paid Faster */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                3. Best Practices to Get Paid Faster
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Simple habits that significantly reduce friction and prevent delays in Accounts Payable.
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Provide Complete Bank Info:</strong> Include IBAN, BIC/SWIFT, and wire details.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Send Same-Day:</strong> Bill immediately when milestones are accomplished.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Include Client PO #:</strong> Many corporate accounting desks reject invoices without a PO.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Send Vector PDFs:</strong> Always deliver sharp vector PDFs, never blurry screenshots.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Reference Checklist Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pre-Flight Checklist: Send With Confidence
                </h3>
                <p className="text-xs text-slate-500">
                  Run through these 5 quick checks before sending your invoice to a client.
                </p>
              </div>
            </div>

            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all shrink-0"
            >
              <span>Create Invoice Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs text-slate-600">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">1. Double-Check Math</span>
              <p className="text-slate-500 leading-relaxed">
                Invoxa calculates line totals, discounts, taxes, and balance due automatically to eliminate errors.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">2. Check Currency</span>
              <p className="text-slate-500 leading-relaxed">
                Ensure you are billing in the contract currency (USD, EUR, GBP, CAD, AUD, INR, JPY, etc.).
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">3. Verify Client Contact</span>
              <p className="text-slate-500 leading-relaxed">
                Direct the invoice to the exact department or finance contact who approves expenditures.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-sm">4. Clear Due Date</span>
              <p className="text-slate-500 leading-relaxed">
                Never write &quot;TBD&quot; or leave dates blank. A specific calendar date triggers AP accounting queues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
