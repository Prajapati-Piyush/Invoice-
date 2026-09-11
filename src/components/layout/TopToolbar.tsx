'use client';

import React from 'react';
import { CurrencyConfig, TemplateId } from '@/types/invoice';
import { ColorPicker } from '../ui/ColorPicker';
import { CurrencySelect } from '../ui/CurrencySelect';
import { TemplateSelect } from '../ui/TemplateSelect';
import {
  Download,
  RotateCcw,
  Sparkles,
  FileCheck2,
  FileText,
  Eye,
  Edit3,
} from 'lucide-react';

interface TopToolbarProps {
  templateId: TemplateId;
  onTemplateChange: (t: TemplateId) => void;
  accentColor: string;
  onAccentColorChange: (c: string) => void;
  currency: CurrencyConfig;
  onCurrencyChange: (c: CurrencyConfig) => void;
  onLoadSample: () => void;
  onResetInvoice: () => void;
  onPrint: () => void;
  lastSaved: Date | null;
  mobileTab: 'edit' | 'preview';
  onMobileTabChange: (tab: 'edit' | 'preview') => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
  templateId,
  onTemplateChange,
  accentColor,
  onAccentColorChange,
  currency,
  onCurrencyChange,
  onLoadSample,
  onResetInvoice,
  onPrint,
  lastSaved,
  mobileTab,
  onMobileTabChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Auto-save status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs transition-colors"
              style={{ backgroundColor: accentColor }}
            >
              <FileText className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight block leading-tight">
                QuickInvoice
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-medium leading-none">
                100% Free & Private
              </span>
            </div>
          </div>

          {/* Auto-save badge */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100/80 text-emerald-700 text-[11px] font-medium"
            title={
              lastSaved
                ? `Last saved locally at ${lastSaved.toLocaleTimeString()}`
                : 'Auto-saved locally in browser'
            }
          >
            <FileCheck2 className="w-3 h-3 text-emerald-600" />
            <span>Saved in browser</span>
          </div>
        </div>

        {/* Center: Controls for Template, Currency, Accent (Desktop) */}
        <div className="hidden md:flex items-center gap-2.5">
          <TemplateSelect value={templateId} onChange={onTemplateChange} />
          <CurrencySelect value={currency} onChange={onCurrencyChange} />
          <ColorPicker value={accentColor} onChange={onAccentColorChange} />
        </div>

        {/* Mobile View Switcher (Edit vs Preview) */}
        <div className="flex md:hidden items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => onMobileTabChange('edit')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
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
            onClick={() => onMobileTabChange('preview')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              mobileTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right Actions: Sample, Reset, Download PDF */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onLoadSample}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Load realistic demo invoice"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Sample</span>
          </button>

          <button
            type="button"
            onClick={onResetInvoice}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Clear line items and start a new invoice (preserves your business info)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>New</span>
          </button>

          {/* Primary Download / Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-hidden"
            style={{ backgroundColor: accentColor }}
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Sub-bar for mobile when in Edit mode to change currency & color */}
      <div className="flex md:hidden items-center justify-between px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <CurrencySelect value={currency} onChange={onCurrencyChange} />
          <ColorPicker value={accentColor} onChange={onAccentColorChange} />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[11px] font-semibold text-slate-600 px-2 py-1 bg-white border border-slate-200 rounded-md"
          >
            Sample
          </button>
          <button
            type="button"
            onClick={onResetInvoice}
            className="text-[11px] font-semibold text-slate-600 px-2 py-1 bg-white border border-slate-200 rounded-md"
          >
            New
          </button>
        </div>
      </div>
    </header>
  );
};
