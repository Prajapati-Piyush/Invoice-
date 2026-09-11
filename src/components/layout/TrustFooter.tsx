'use client';

import React from 'react';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

export const TrustFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 pt-16 pb-24 mt-20 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                100% Private & Client-Side
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your invoices, clients, rates, and bank details never touch an external server.
                Everything runs securely right inside your browser.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Zero Signup, Zero Email Capture
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No credit card, no registration, no confirmation links. Open the page, write your
                invoice, and export a clean vector PDF in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                No Watermarks or Limits
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every exported PDF is 100% watermark-free, razor-sharp vector text, ready to email
                or print for your clients.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison Mini-Matrix */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-12">
          <h3 className="text-base font-bold text-slate-900 mb-4 text-center">
            How QuickInvoice compares to traditional invoice makers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 font-semibold">Feature</th>
                  <th className="pb-3 font-bold text-blue-600">QuickInvoice</th>
                  <th className="pb-3 font-semibold">Wave / FreshBooks</th>
                  <th className="pb-3 font-semibold">Invoiced / Free Clones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 text-slate-700">
                <tr>
                  <td className="py-2.5 font-medium">Account or Login Required</td>
                  <td className="py-2.5 font-bold text-emerald-600">Never (0 seconds)</td>
                  <td className="py-2.5 text-slate-500">Mandatory</td>
                  <td className="py-2.5 text-slate-500">Often captures email</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">PDF Watermarks</td>
                  <td className="py-2.5 font-bold text-emerald-600">None</td>
                  <td className="py-2.5 text-slate-500">None (Paid)</td>
                  <td className="py-2.5 text-amber-600">Watermark on free tier</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">Financial Data Privacy</td>
                  <td className="py-2.5 font-bold text-emerald-600">Local in your browser</td>
                  <td className="py-2.5 text-slate-500">Stored on 3rd-party cloud</td>
                  <td className="py-2.5 text-slate-500">Cloud database</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">Pricing / Subscription</td>
                  <td className="py-2.5 font-bold text-emerald-600">100% Free Forever</td>
                  <td className="py-2.5 text-slate-500">$19 – $55 / month</td>
                  <td className="py-2.5 text-slate-500">Freemium traps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Copyright & Subtext */}
        <div className="text-center text-xs text-slate-400 space-y-1">
          <p>Built with Next.js, React, TypeScript & Tailwind CSS.</p>
          <p>Runs entirely client-side. No trackers, no cookies, no user data collection.</p>
        </div>
      </div>
    </footer>
  );
};
