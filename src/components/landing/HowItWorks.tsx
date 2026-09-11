'use client';

import React from 'react';
import Link from 'next/link';
import { Edit3, Palette, Download, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Edit3,
      title: 'Enter Invoice Details',
      description:
        'Type directly on the canvas or use the sidebar form. Add line items, quantities, rates, tax, discounts, and payment notes.',
    },
    {
      number: '02',
      icon: Palette,
      title: 'Pick Template & Brand Color',
      description:
        'Select from 5 professional A4 layouts, pick your brand accent color, and choose from 35+ global world currencies.',
    },
    {
      number: '03',
      icon: Download,
      title: 'Download Razor-Sharp PDF',
      description:
        'Click "Download PDF" to generate a 100% watermark-free vector document ready to email to your client immediately.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Invoxa Works in 3 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            No signup wizards, no email verification, and no delay. Go from blank page to client-ready PDF in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
                  <span>Step {i + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span>Start Creating Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

