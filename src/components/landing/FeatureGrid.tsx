'use client';

import React from 'react';
import { Lock, FileText, Globe2, Save, Calculator, SplitSquareVertical } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: Lock,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      title: '100% Private & Client-Side',
      description:
        'Your clients, rates, and bank instructions never touch a remote database. Everything runs directly within your browser session.',
    },
    {
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      title: 'Razor-Sharp Vector PDF',
      description:
        'Powered by native browser vector rendering with exact A4 margins. Text stays selectable and crisp with zero rasterization blur.',
    },
    {
      icon: Globe2,
      color: 'bg-violet-50 text-violet-600 border-violet-100',
      title: '35+ Global Currencies',
      description:
        'Seamlessly format totals in USD, EUR, GBP, CAD, AUD, INR, JPY, and more with authentic currency symbols and comma separators.',
    },
    {
      icon: Save,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      title: 'Smart Sender Memory',
      description:
        'Invoxa caches your business profile, logo, and bank details locally. Starting a new invoice never wipes your company information.',
    },
    {
      icon: Calculator,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      title: 'Instant Financial Calculations',
      description:
        'Automatic line totals, configurable taxes (VAT, GST, Sales Tax), percentage or fixed discounts, shipping fees, and live balance due.',
    },
    {
      icon: SplitSquareVertical,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      title: 'Multi-Page Page Break Guard',
      description:
        'CSS break-inside rules ensure that long 10+ line item invoices never cut description text or table rows awkwardly across pages.',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Built for Speed, Privacy & Precision
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Everything you need to bill clients professionally without the bloat and paywalls of
            traditional accounting software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${f.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

