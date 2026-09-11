'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TemplateId } from '@/types/invoice';
import { LayoutTemplate, ArrowRight, Check } from 'lucide-react';

export const TemplateShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TemplateId>('minimal');

  const templates: {
    id: TemplateId;
    name: string;
    subtitle: string;
    description: string;
    features: string[];
    idealFor: string;
  }[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      subtitle: 'Modern Typographic Elegance',
      description:
        'A clean, airy aesthetic emphasizing whitespace and refined typography. Perfect for developers, design consultants, and tech freelancers.',
      features: ['Borderless dynamic table', 'Clean typographic hierarchy', 'Subtle hairline dividers', 'Ample whitespace'],
      idealFor: 'Software Engineers, UI/UX Designers, Copywriters',
    },
    {
      id: 'professional',
      name: 'Professional',
      subtitle: 'Structured Corporate B2B Grid',
      description:
        'Features a distinct colored accent bar, structured "From" and "Billed To" boxed cards, and a formal table grid. Best for enterprise contracts.',
      features: ['Top brand accent strip', 'Boxed corporate entity cards', 'Formal shaded table header', 'Structured metadata grid'],
      idealFor: 'Management Consultants, Legal Advisors, Accounting Firms',
    },
    {
      id: 'modern',
      name: 'Modern',
      subtitle: 'Contemporary Asymmetric Style',
      description:
        'Bold modern badges, geometric background glow, and an eye-catching payment status indicator. Designed for forward-thinking creative agencies.',
      features: ['Asymmetrical badge header', 'Payment status pill badge', 'Modern summary card', 'Contemporary section flow'],
      idealFor: 'Digital Marketing Agencies, Media Production, Creators',
    },
    {
      id: 'creative',
      name: 'Creative',
      subtitle: 'High-Impact Agency Statement',
      description:
        'Features high-contrast display typography and an accent-colored balance due card that immediately commands attention.',
      features: ['Display typeface headline', 'Prominent balance callout card', 'High visual contrast', 'Agency-grade aesthetic'],
      idealFor: 'Brand Studios, Photographers, Art Directors, Architects',
    },
    {
      id: 'classic',
      name: 'Classic',
      subtitle: 'Traditional Commercial Remittance',
      description:
        'Traditional double-rule borders, serif typography, formal Remit-To blocks, and an authentic remittance slip with signature line.',
      features: ['Double-rule formal borders', 'Serif / sans hybrid styling', 'Remittance advice tear-off slip', 'Authorized signature block'],
      idealFor: 'Contractors, Physical Retail, Trade & Logistics, Services',
    },
  ];

  const currentTemplate = templates.find((t) => t.id === activeTab) || templates[0];

  return (
    <section id="templates" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold mb-3">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>5 Designer Invoice Templates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Crafted for Every Business Style
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Every template is 100% vector-printable on standard A4 paper, responsive on mobile,
            and adapts automatically to your brand accent color.
          </p>
        </div>

        {/* Template Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {templates.map((tpl) => {
            const isActive = activeTab === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setActiveTab(tpl.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
                }`}
              >
                {tpl.name}
              </button>
            );
          })}
        </div>

        {/* Template Detail Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Description & Features */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                {currentTemplate.name} Template
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {currentTemplate.subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {currentTemplate.description}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Key Design Elements
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {currentTemplate.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Ideal For:
              </span>
              <span className="inline-block px-3 py-1 bg-slate-100 rounded-lg font-semibold text-slate-700">
                {currentTemplate.idealFor}
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span>Use {currentTemplate.name} Template</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Representation */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between h-72 shadow-inner select-none pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="space-y-1.5">
                <div className="w-12 h-3 bg-blue-600 rounded-xs" />
                <div className="w-20 h-1.5 bg-slate-300 rounded-xs" />
                <div className="w-16 h-1.5 bg-slate-200 rounded-xs" />
              </div>
              <div className="text-right space-y-1">
                <div className="w-16 h-4 bg-slate-800 rounded-xs ml-auto" />
                <div className="w-12 h-2 bg-slate-300 rounded-xs ml-auto" />
              </div>
            </div>

            <div className="space-y-2 my-auto">
              <div className="h-4 bg-white border border-slate-200 rounded-xs flex items-center px-2 justify-between">
                <div className="w-24 h-1.5 bg-slate-400 rounded-xs" />
                <div className="w-8 h-1.5 bg-slate-400 rounded-xs" />
              </div>
              <div className="h-4 bg-white border border-slate-200 rounded-xs flex items-center px-2 justify-between">
                <div className="w-32 h-1.5 bg-slate-300 rounded-xs" />
                <div className="w-8 h-1.5 bg-slate-300 rounded-xs" />
              </div>
              <div className="h-4 bg-white border border-slate-200 rounded-xs flex items-center px-2 justify-between">
                <div className="w-20 h-1.5 bg-slate-300 rounded-xs" />
                <div className="w-8 h-1.5 bg-slate-300 rounded-xs" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
              <div className="w-24 h-2 bg-slate-200 rounded-xs" />
              <div className="w-16 h-4 bg-blue-100 text-blue-700 font-bold rounded-xs flex items-center justify-center text-[8px]">
                $4,800.00
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

