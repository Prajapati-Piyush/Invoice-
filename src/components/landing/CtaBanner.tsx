'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-4 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Zero Friction • Instant Vector PDF</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 max-w-2xl mx-auto">
          Create Your First Professional Invoice Right Now
        </h2>

        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto mb-8">
          No signups, no credit cards, and no watermarks. Open the invoice studio and start typing
          immediately.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/create"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-blue-600 font-extrabold text-sm sm:text-base rounded-2xl shadow-xl transition-all active:scale-95 group"
          >
            <span>Create Free Invoice</span>
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/create?sample=true"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-700/60 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-2xl border border-white/20 transition-colors"
          >
            <span>Try 10-Line Sample</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

