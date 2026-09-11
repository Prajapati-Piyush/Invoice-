'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, FileText, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-radial from-blue-50/50 via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs mb-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>100% Free Forever • No Signup • Client-Side Privacy</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Free Invoice Maker for Fast, Professional Invoices.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Zero Login.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            The instant, privacy-first invoice maker for freelancers, contractors, and growing
            businesses. Download pixel-perfect vector PDFs without accounts, watermarks, or subscription traps.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
            <Link
              href="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 group"
            >
              <span>Create Free Invoice</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/create?sample=true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Try 10-Item Sample</span>
            </Link>
          </div>

          {/* Trust Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No signup or credit card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No watermark on PDF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Client-side local storage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>35+ Currencies supported</span>
            </div>
          </div>
        </div>

        {/* Visual Product Mockup Stage */}
        <div className="mt-14 relative max-w-4xl mx-auto">
          {/* Subtle glow background */}
          <div className="absolute inset-0 -top-6 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-violet-500/10 blur-3xl rounded-3xl -z-10" />

          {/* Mockup Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-4 sm:p-8 relative">
            {/* Mockup Header Bar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                  I
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Apex Studio & Labs</h3>
                  <p className="text-xs text-slate-400">Invoice #INV-2026-0042</p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                  Total Due: $15,188.75
                </span>
              </div>
            </div>

            {/* Mockup Line Items Preview */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-xs py-2 border-b border-slate-100 font-semibold text-slate-400 uppercase tracking-wider">
                <span>Description</span>
                <span>Qty</span>
                <span>Rate</span>
                <span className="text-right">Amount</span>
              </div>

              <div className="flex justify-between items-center text-xs py-1.5">
                <span className="font-semibold text-slate-800">
                  Website Architecture & Interactive Wireframing
                </span>
                <span className="text-slate-500">1</span>
                <span className="text-slate-500">$3,500.00</span>
                <span className="font-bold text-slate-900 text-right">$3,500.00</span>
              </div>

              <div className="flex justify-between items-center text-xs py-1.5">
                <span className="font-semibold text-slate-800">
                  UI/UX Design System & Modular Figma Token Library
                </span>
                <span className="text-slate-500">1</span>
                <span className="text-slate-500">$2,800.00</span>
                <span className="font-bold text-slate-900 text-right">$2,800.00</span>
              </div>

              <div className="flex justify-between items-center text-xs py-1.5">
                <span className="font-semibold text-slate-800">
                  Next.js App Router Engineering & Tailwind CSS
                </span>
                <span className="text-slate-500">40</span>
                <span className="text-slate-500">$120.00</span>
                <span className="font-bold text-slate-900 text-right">$4,800.00</span>
              </div>
            </div>

            {/* Floating Trust Pills around Mockup */}
            <div className="hidden sm:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/80 items-center gap-3 text-xs font-bold text-slate-800">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight">100% Private</p>
                <p className="text-[10px] text-slate-400 font-normal">Data stays in your browser</p>
              </div>
            </div>

            <div className="hidden sm:flex absolute -right-6 top-1/3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/80 items-center gap-3 text-xs font-bold text-slate-800">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight">Vector PDF</p>
                <p className="text-[10px] text-slate-400 font-normal">Crisp print & zero blur</p>
              </div>
            </div>

            {/* Bottom Mockup Action Overlay */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500">
                Switch between 5 templates, custom brand colors, and 35+ currencies.
              </p>
              <Link
                href="/create"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Open Studio Now &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

