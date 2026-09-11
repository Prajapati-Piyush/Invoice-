'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TemplateId } from '@/types/invoice';
import { X, Check, Sparkles } from 'lucide-react';

import { useIsMounted } from '@/hooks/useIsMounted';

interface TemplateOption {
  id: TemplateId;
  name: string;
  category: string;
  tagline: string;
  preview: React.ReactNode;
}

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  accentColor: string;
}

export const TemplateGalleryModal: React.FC<TemplateGalleryModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate,
  onSelectTemplate,
  accentColor,
}) => {
  const mounted = useIsMounted();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted || typeof document === 'undefined') return null;

  const templates: TemplateOption[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      category: 'Freelance & Tech',
      tagline: 'Clean whitespace, borderless table, and elegant typographic hierarchy.',
      preview: (
        <div className="w-full h-28 bg-white border border-slate-200 rounded-lg p-3 flex flex-col justify-between text-[6px] select-none pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="w-8 h-2 rounded-xs" style={{ backgroundColor: accentColor }} />
              <div className="w-12 h-1 bg-slate-200 rounded-xs" />
            </div>
            <div className="text-right space-y-0.5">
              <div className="w-10 h-2 bg-slate-300 rounded-xs ml-auto" />
              <div className="w-8 h-1 bg-slate-200 rounded-xs ml-auto" />
            </div>
          </div>
          <div className="space-y-1 my-1">
            <div className="w-full h-1 bg-slate-200 rounded-xs" />
            <div className="w-full h-1 bg-slate-100 rounded-xs" />
            <div className="w-full h-1 bg-slate-100 rounded-xs" />
          </div>
          <div className="flex justify-between items-end pt-1 border-t border-slate-100">
            <div className="w-10 h-1 bg-slate-200 rounded-xs" />
            <div className="w-8 h-2 rounded-xs" style={{ backgroundColor: `${accentColor}33` }} />
          </div>
        </div>
      ),
    },
    {
      id: 'professional',
      name: 'Professional',
      category: 'Corporate & B2B',
      tagline: 'Top accent strip with structured boxes for enterprise contracts and consulting.',
      preview: (
        <div className="w-full h-28 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between text-[6px] select-none pointer-events-none">
          <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />
          <div className="p-2.5 flex-1 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="w-10 h-2 bg-slate-800 rounded-xs" />
              <div className="w-12 h-2 rounded-xs" style={{ backgroundColor: accentColor }} />
            </div>
            <div className="grid grid-cols-2 gap-1 my-1">
              <div className="bg-slate-50 p-1 rounded-xs border border-slate-100 space-y-0.5">
                <div className="w-6 h-1 rounded-xs" style={{ backgroundColor: accentColor }} />
                <div className="w-10 h-1 bg-slate-200 rounded-xs" />
              </div>
              <div className="bg-slate-50 p-1 rounded-xs border border-slate-100 space-y-0.5">
                <div className="w-6 h-1 rounded-xs" style={{ backgroundColor: accentColor }} />
                <div className="w-10 h-1 bg-slate-200 rounded-xs" />
              </div>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-xs" />
          </div>
        </div>
      ),
    },
    {
      id: 'modern',
      name: 'Modern',
      category: 'Digital Agencies',
      tagline: 'Asymmetrical badge header, geometric accent glow, and modern summary card.',
      preview: (
        <div className="w-full h-28 bg-white border border-slate-200 rounded-lg p-3 flex flex-col justify-between text-[6px] select-none pointer-events-none relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="w-10 h-2 bg-slate-900 rounded-xs" />
              <div className="w-14 h-1 bg-slate-200 rounded-xs" />
            </div>
            <div className="px-1.5 py-0.5 rounded-sm text-white font-bold" style={{ backgroundColor: accentColor }}>
              INVOICE
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 my-1">
            <div className="space-y-0.5">
              <div className="w-8 h-1 bg-slate-300 rounded-xs" />
              <div className="w-12 h-1 bg-slate-200 rounded-xs" />
            </div>
            <div className="bg-slate-50 p-1 rounded-xs flex justify-between items-center">
              <div className="w-6 h-1 bg-slate-300 rounded-xs" />
              <div className="w-6 h-2 rounded-xs" style={{ backgroundColor: accentColor }} />
            </div>
          </div>
          <div className="w-full h-1 bg-slate-200 rounded-xs" />
        </div>
      ),
    },
    {
      id: 'creative',
      name: 'Creative',
      category: 'Designers & Creators',
      tagline: 'High-impact display header with a bold balance due callout block.',
      preview: (
        <div className="w-full h-28 bg-white border border-slate-200 rounded-lg p-3 flex flex-col justify-between text-[6px] select-none pointer-events-none">
          <div className="flex justify-between items-start">
            <div>
              <div className="w-14 h-3 bg-slate-900 rounded-xs font-black" />
              <div className="w-8 h-1 rounded-xs mt-0.5" style={{ backgroundColor: accentColor }} />
            </div>
            <div className="w-14 h-8 rounded-lg p-1 text-white flex flex-col justify-between shadow-xs" style={{ backgroundColor: accentColor }}>
              <div className="w-6 h-1 bg-white/60 rounded-xs" />
              <div className="w-10 h-2 bg-white rounded-xs" />
            </div>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-xs my-1" />
          <div className="flex justify-between">
            <div className="w-12 h-1 bg-slate-200 rounded-xs" />
            <div className="w-8 h-1 bg-slate-200 rounded-xs" />
          </div>
        </div>
      ),
    },
    {
      id: 'classic',
      name: 'Classic',
      category: 'Trade & Commercial',
      tagline: 'Traditional formal header rules, double borders, and remittance advice slip.',
      preview: (
        <div className="w-full h-28 bg-white border border-slate-200 rounded-lg p-3 flex flex-col justify-between text-[6px] select-none pointer-events-none">
          <div className="border-t-2 border-b border-slate-800 py-1 flex justify-between items-center">
            <div className="w-12 h-1.5 bg-slate-900 rounded-xs font-serif" />
            <div className="w-10 h-1.5 font-serif font-bold text-right" style={{ color: accentColor }}>
              INVOICE
            </div>
          </div>
          <div className="border border-slate-200 rounded-xs p-1 grid grid-cols-2 gap-1 my-1">
            <div className="w-10 h-1 bg-slate-200 rounded-xs" />
            <div className="w-10 h-1 bg-slate-200 rounded-xs" />
          </div>
          <div className="border-t border-dashed border-slate-300 pt-1 flex justify-between">
            <div className="w-10 h-1 bg-slate-300 rounded-xs" />
            <div className="w-8 h-1 bg-slate-300 rounded-xs" />
          </div>
        </div>
      ),
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">Choose Invoice Template</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate sm:whitespace-normal">
                Switch designs instantly. All invoice data is preserved.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center shrink-0"
            aria-label="Close template modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body: 5 Visual Cards */}
        <div className="p-3 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {templates.map((tpl) => {
            const isSelected =
              selectedTemplate === tpl.id ||
              (selectedTemplate === 'minimalist' && tpl.id === 'minimal') ||
              (selectedTemplate === 'corporate' && tpl.id === 'professional');

            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
                className={`group cursor-pointer rounded-xl border-2 p-3.5 transition-all relative flex flex-col justify-between hover:shadow-md ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  {/* Visual Mini Mockup */}
                  <div className="mb-3 transform group-hover:scale-[1.02] transition-transform">
                    {tpl.preview}
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm text-slate-900">{tpl.name}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {tpl.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-snug">{tpl.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900">
                      Select Template
                    </span>
                  )}
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-white ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-slate-300 group-hover:border-slate-400'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

