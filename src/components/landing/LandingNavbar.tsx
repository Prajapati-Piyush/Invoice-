'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InvoxaLogo } from '../brand/InvoxaLogo';
import { ArrowRight, Menu, X } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <InvoxaLogo size="md" showTagline href="/" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#templates" className="hover:text-blue-600 transition-colors">
            Templates
          </a>
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
            How It Works
          </a>
          <a href="#comparison" className="hover:text-blue-600 transition-colors">
            Why Invoxa
          </a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/create?sample=true"
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-colors"
          >
            Try Sample
          </Link>

          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span>Create Free Invoice</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/create"
            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-xs"
          >
            Create Free
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <a
            href="#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-1"
          >
            Templates
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-1"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-1"
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-1"
          >
            FAQ
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/create"
              className="w-full text-center py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs"
            >
              Create Free Invoice
            </Link>
            <Link
              href="/create?sample=true"
              className="w-full text-center py-2 text-slate-700 bg-slate-100 font-semibold rounded-xl text-xs"
            >
              Try 10-Item Sample
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

