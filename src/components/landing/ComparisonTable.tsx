'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <section id="comparison" className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Invoxa Compares to Traditional Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Most &quot;free&quot; invoice generators hit you with email gates or forced subscriptions once you
            click download. Here is how Invoxa is different.
          </p>
        </div>

        <div className="bg-slate-50/70 rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-white text-slate-500">
                  <th className="p-4 sm:p-6 font-semibold">Feature</th>
                  <th className="p-4 sm:p-6 font-extrabold text-blue-600 bg-blue-50/40">
                    Invoxa
                  </th>
                  <th className="p-4 sm:p-6 font-semibold">Wave / FreshBooks</th>
                  <th className="p-4 sm:p-6 font-semibold">&quot;Free&quot; Clones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-slate-700">
                <tr>
                  <td className="p-4 sm:p-6 font-bold text-slate-900">Account / Signup Required</td>
                  <td className="p-4 sm:p-6 font-extrabold text-emerald-600 bg-blue-50/20 flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Never (0s setup)</span>
                  </td>
                  <td className="p-4 sm:p-6 text-slate-500">Mandatory (5-15 min)</td>
                  <td className="p-4 sm:p-6 text-amber-600">Email captured before PDF</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-6 font-bold text-slate-900">PDF Watermarks</td>
                  <td className="p-4 sm:p-6 font-extrabold text-emerald-600 bg-blue-50/20 flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>None (100% Clean)</span>
                  </td>
                  <td className="p-4 sm:p-6 text-slate-500">None on paid plans</td>
                  <td className="p-4 sm:p-6 text-red-500 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    <span>Watermark on free tier</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-6 font-bold text-slate-900">Client & Financial Data Privacy</td>
                  <td className="p-4 sm:p-6 font-extrabold text-emerald-600 bg-blue-50/20 flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>100% Local in Browser</span>
                  </td>
                  <td className="p-4 sm:p-6 text-slate-500">Stored on 3rd-party servers</td>
                  <td className="p-4 sm:p-6 text-slate-500">Stored in remote database</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-6 font-bold text-slate-900">Pricing & Hidden Fees</td>
                  <td className="p-4 sm:p-6 font-extrabold text-emerald-600 bg-blue-50/20 flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>100% Free Forever</span>
                  </td>
                  <td className="p-4 sm:p-6 text-slate-500">$19 – $55 / month</td>
                  <td className="p-4 sm:p-6 text-slate-500">Freemium traps & upsells</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-6 font-bold text-slate-900">PDF Output Resolution</td>
                  <td className="p-4 sm:p-6 font-extrabold text-emerald-600 bg-blue-50/20 flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Crisp Vector Text & A4</span>
                  </td>
                  <td className="p-4 sm:p-6 text-slate-500">Vector PDF</td>
                  <td className="p-4 sm:p-6 text-slate-500">Often blurry raster screenshots</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-6 font-bold text-slate-900">Currencies Supported</td>
                  <td className="p-4 sm:p-6 font-extrabold text-emerald-600 bg-blue-50/20 flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>35+ World Currencies</span>
                  </td>
                  <td className="p-4 sm:p-6 text-slate-500">Paid tier required</td>
                  <td className="p-4 sm:p-6 text-slate-500">Limited (USD only)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
