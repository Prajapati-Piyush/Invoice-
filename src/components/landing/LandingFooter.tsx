'use client';

import React from 'react';
import Link from 'next/link';
import { InvoxaLogo } from '../brand/InvoxaLogo';
import { ShieldCheck } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <InvoxaLogo size="md" className="brightness-125" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Invoxa is a free, modern, privacy-first invoice maker. Built for independent freelancers,
              contractors, and small businesses who value their time and data privacy.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Client-Side • No server data storage</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Templates
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  Minimal Invoice Template
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  Professional Corporate Template
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  Modern Agency Template
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  Creative Studio Template
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  Classic Remittance Template
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  Invoice Studio
                </Link>
              </li>
              <li>
                <Link href="/create?sample=true" className="hover:text-white transition-colors">
                  Try 10-Item Sample
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-white transition-colors">
                  Comparison Matrix
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Invoxa. All rights reserved. Free forever with zero watermarks.</p>
          <p className="flex items-center gap-1">
            <span>Built with Next.js, React, TypeScript & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
