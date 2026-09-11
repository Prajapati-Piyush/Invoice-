'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInvoice } from '@/hooks/useInvoice';
import { InvoxaLogo } from '@/components/brand/InvoxaLogo';
import { StudioControls } from '@/components/editor/StudioControls';
import { InvoiceCanvas } from '@/components/editor/InvoiceCanvas';
import { MobileFormView } from '@/components/editor/MobileFormView';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { CurrencySelect } from '@/components/ui/CurrencySelect';
import { TemplateGalleryModal } from '@/components/ui/TemplateGalleryModal';
import { ToastContainer } from '@/components/ui/Toast';
import { PrintableInvoice } from '@/components/print/PrintableInvoice';
import { useToast } from '@/hooks/useToast';
import { printInvoice } from '@/lib/print';
import { generateAndDownloadPdf } from '@/lib/pdf-generator';
import { formatMoney } from '@/lib/currencies';
import {
  Download,
  LayoutTemplate,
  RotateCcw,
  Sparkles,
  FileCheck2,
  Eye,
  Edit3,
  ArrowLeft,
  Loader2,
  Printer,
} from 'lucide-react';
import Link from 'next/link';

function CreateInvoiceContent() {
  const searchParams = useSearchParams();
  const {
    invoice,
    calculations,
    isLoaded,
    lastSaved,
    updateInvoice,
    updateSender,
    updateClient,
    updateCustomLabels,
    updatePaymentDetails,
    addItem,
    updateItem,
    removeItem,
    updateDiscount,
    updateTax,
    setCurrency,
    setTemplate,
    setAccentColor,
    loadSample,
    resetInvoice,
  } = useInvoice();

  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { toasts, addToast, dismissToast } = useToast();

  // Auto-load sample if ?sample=true in URL
  useEffect(() => {
    if (isLoaded && searchParams.get('sample') === 'true') {
      loadSample();
      addToast({
        type: 'info',
        title: 'Sample Invoice Loaded',
        description: 'Loaded a 10-line-item digital agency sample invoice.',
      });
    }
  }, [isLoaded, searchParams, loadSample, addToast]);

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    addToast({
      type: 'info',
      title: 'Generating PDF...',
      description: 'Rendering high-resolution vector PDF in your browser.',
    });

    try {
      const result = await generateAndDownloadPdf(invoice, calculations);
      if (result.success) {
        addToast({
          type: 'success',
          title: 'PDF Downloaded!',
          description: `Saved as ${result.filename}`,
        });
      } else {
        addToast({
          type: 'error',
          title: 'PDF Generation Failed',
          description: result.error || 'Could not render PDF. Please try again.',
        });
      }
    } catch (err: unknown) {
      console.error('Download PDF error:', err);
      addToast({
        type: 'error',
        title: 'PDF Generation Failed',
        description: 'An unexpected error occurred while generating PDF.',
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    addToast({
      type: 'info',
      title: 'Preparing Vector PDF...',
      description: 'Select "Save as PDF" in the browser print dialog.',
    });
    printInvoice(invoice.invoiceNumber, invoice.client.name);
  };

  const handleLoadSample = () => {
    loadSample();
    addToast({
      type: 'success',
      title: 'Sample Invoice Loaded',
      description: 'Loaded 10 agency line items with sample tax & discounts.',
    });
  };

  const handleReset = () => {
    if (confirm('Start a new invoice? Your business details and logo will be preserved.')) {
      resetInvoice();
      addToast({
        type: 'info',
        title: 'New Invoice Created',
        description: 'Cleared client & line items while keeping your company profile.',
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-500">Loading Invoxa Studio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900">
      {/* Studio Header Toolbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 h-14 lg:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Home Link */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Back to Homepage"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <InvoxaLogo accentColor={invoice.accentColor} size="sm" href="/" />

            {/* Auto-save badge */}
            <div
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100/80 text-emerald-700 text-[11px] font-medium"
              title={
                lastSaved
                  ? `Auto-saved locally at ${lastSaved.toLocaleTimeString()}`
                  : 'Auto-saved locally in browser'
              }
            >
              <FileCheck2 className="w-3 h-3 text-emerald-600" />
              <span>Saved locally</span>
            </div>
          </div>

          {/* Center Tools (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Visual Template Picker Trigger */}
            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
              <span className="capitalize">{invoice.templateId} Template</span>
            </button>

            <CurrencySelect value={invoice.currency} onChange={setCurrency} variant="desktop" />
            <ColorPicker value={invoice.accentColor} onChange={setAccentColor} variant="desktop" />
          </div>

          {/* Mobile View Switcher (Edit vs Preview) */}
          <div className="flex lg:hidden items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setMobileTab('edit')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                mobileTab === 'edit'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                mobileTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {/* Right Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Load 10-line agency sample"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Try Sample</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Start a fresh invoice (keeps your business profile)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>New</span>
            </button>

            {/* Secondary Print Action */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title="Print via browser printer dialog"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>

            {/* Primary Direct Download PDF Button (Direct Vector PDF Download) */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-hidden disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: invoice.accentColor }}
            >
              {isGeneratingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4 stroke-[2.5]" />
              )}
              <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary toolstrip */}
        <div className="flex lg:hidden items-center justify-between px-3 py-2 bg-slate-50/95 border-t border-slate-200/80 text-xs gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 flex items-center gap-1.5 shrink-0 shadow-xs hover:bg-slate-50 transition-colors"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
              <span className="capitalize">{invoice.templateId}</span>
            </button>
            <CurrencySelect value={invoice.currency} onChange={setCurrency} variant="mobile" />
            <ColorPicker value={invoice.accentColor} onChange={setAccentColor} variant="mobile" />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs font-medium text-slate-700 hover:text-slate-900 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg transition-colors shrink-0 shadow-xs hover:bg-slate-50"
            >
              Sample
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-slate-700 hover:text-slate-900 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg transition-colors shrink-0 shadow-xs hover:bg-slate-50"
            >
              New
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Area */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto">
        {/* Desktop Split-Screen (screens >= 1024px) */}
        <div className="hidden lg:flex w-full h-[calc(100vh-64px)] overflow-hidden">
          {/* Left Form Controls Sidebar */}
          <aside className="w-[430px] xl:w-[460px] h-full overflow-y-auto p-4 bg-slate-50/80 border-r border-slate-200/80 shrink-0">
            <StudioControls
              invoice={invoice}
              calculations={calculations}
              onUpdateSender={updateSender}
              onUpdateClient={updateClient}
              onUpdateInvoice={updateInvoice}
              onUpdateCustomLabels={updateCustomLabels}
              onUpdateItem={updateItem}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateDiscount={updateDiscount}
              onUpdateTax={updateTax}
              onUpdateShipping={(amount) => updateInvoice({ shipping: amount })}
              onUpdateAmountPaid={(amount) => updateInvoice({ amountPaid: amount })}
              onUpdatePaymentDetails={updatePaymentDetails}
            />
          </aside>

          {/* Right Live A4 Canvas Stage */}
          <main className="flex-1 h-full overflow-y-auto p-8 bg-slate-100/70 flex justify-center items-start">
            <div className="w-full max-w-[850px] pb-24">
              <InvoiceCanvas
                invoice={invoice}
                calculations={calculations}
                onUpdateSender={updateSender}
                onUpdateClient={updateClient}
                onUpdateInvoice={updateInvoice}
                onUpdateCustomLabels={updateCustomLabels}
                onUpdateItem={updateItem}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onUpdateDiscount={updateDiscount}
                onUpdateTax={updateTax}
                onUpdateShipping={(amount) => updateInvoice({ shipping: amount })}
                onUpdateAmountPaid={(amount) => updateInvoice({ amountPaid: amount })}
                onUpdatePaymentDetails={updatePaymentDetails}
              />
            </div>
          </main>
        </div>

        {/* Mobile Experience (screens < 1024px) */}
        <div className="block lg:hidden p-3 sm:p-4">
          {mobileTab === 'edit' ? (
            <div className="w-full max-w-lg mx-auto pb-24">
              <MobileFormView
                invoice={invoice}
                calculations={calculations}
                onUpdateSender={updateSender}
                onUpdateClient={updateClient}
                onUpdateInvoice={updateInvoice}
                onUpdateCustomLabels={updateCustomLabels}
                onUpdateItem={updateItem}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onUpdateDiscount={updateDiscount}
                onUpdateTax={updateTax}
                onUpdateShipping={(amount) => updateInvoice({ shipping: amount })}
                onUpdateAmountPaid={(amount) => updateInvoice({ amountPaid: amount })}
                onUpdatePaymentDetails={updatePaymentDetails}
              />
            </div>
          ) : (
            <div className="w-full overflow-x-auto pb-28 flex justify-center">
              <InvoiceCanvas
                invoice={invoice}
                calculations={calculations}
                onUpdateSender={updateSender}
                onUpdateClient={updateClient}
                onUpdateInvoice={updateInvoice}
                onUpdateCustomLabels={updateCustomLabels}
                onUpdateItem={updateItem}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onUpdateDiscount={updateDiscount}
                onUpdateTax={updateTax}
                onUpdateShipping={(amount) => updateInvoice({ shipping: amount })}
                onUpdateAmountPaid={(amount) => updateInvoice({ amountPaid: amount })}
                onUpdatePaymentDetails={updatePaymentDetails}
              />
            </div>
          )}

          {/* Sticky Mobile Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 sm:p-3 px-3 sm:px-4 flex items-center justify-between shadow-lg no-print gap-2">
            <div className="min-w-0 pr-1">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 block leading-none mb-0.5 truncate">
                Balance Due
              </span>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight block truncate">
                {formatMoney(calculations.balanceDue, invoice.currency)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {mobileTab === 'edit' ? (
                <button
                  type="button"
                  onClick={() => setMobileTab('preview')}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg sm:rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMobileTab('edit')}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg sm:rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white rounded-lg sm:rounded-xl shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 disabled:opacity-70 cursor-pointer"
                style={{ backgroundColor: invoice.accentColor }}
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Template Gallery Modal */}
      <TemplateGalleryModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        selectedTemplate={invoice.templateId}
        onSelectTemplate={(tpl) => {
          setTemplate(tpl);
          addToast({
            type: 'info',
            title: `Applied ${tpl} template`,
            description: 'Invoice layout refreshed. All data preserved.',
          });
        }}
        accentColor={invoice.accentColor}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Dedicated Clean Printable Invoice (Visible ONLY in print media, zero inputs/buttons) */}
      <div id="invoice-print" className="hidden print:block">
        <PrintableInvoice invoice={invoice} calculations={calculations} />
      </div>
    </div>
  );
}

export default function CreateInvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold text-slate-500">Initializing Invoxa Studio...</span>
          </div>
        </div>
      }
    >
      <CreateInvoiceContent />
    </Suspense>
  );
}

