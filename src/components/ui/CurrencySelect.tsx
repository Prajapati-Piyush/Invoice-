'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CurrencyConfig } from '@/types/invoice';
import { CURRENCIES } from '@/lib/currencies';
import { ChevronDown, Search, X, Check } from 'lucide-react';

import { useIsMounted } from '@/hooks/useIsMounted';

interface CurrencySelectProps {
  value: CurrencyConfig;
  onChange: (currency: CurrencyConfig) => void;
  variant?: 'desktop' | 'mobile' | 'auto';
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  variant = 'auto',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const mounted = useIsMounted();

  const popoverRef = useRef<HTMLDivElement>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  // Handle click outside on desktop & Escape key on all viewports
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      if (variant === 'desktop' || (variant === 'auto' && window.innerWidth >= 1024)) {
        document.addEventListener('mousedown', handleClickOutside);
        setTimeout(() => desktopSearchInputRef.current?.focus(), 50);
      } else {
        document.body.style.overflow = 'hidden';
        setTimeout(() => mobileSearchInputRef.current?.focus(), 80);
      }
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, variant]);

  const filteredCurrencies = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (c: CurrencyConfig) => {
    onChange(c);
    setIsOpen(false);
    setSearch('');
  };

  const showDesktop = variant === 'desktop' || variant === 'auto';
  const showMobile = variant === 'mobile' || variant === 'auto';

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs active:bg-slate-100"
        title="Select Invoice Currency"
        aria-label="Select currency"
      >
        <span className="font-semibold text-slate-800">{value.symbol}</span>
        <span className="text-slate-600">{value.code}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
      </button>

      {/* Desktop Floating Dropdown Popover (screens >= 1024px) */}
      {showDesktop && isOpen && (
        <div className="hidden lg:block absolute left-0 top-full mt-2 w-72 p-2 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 pointer-events-none" />
            <input
              ref={desktopSearchInputRef}
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:border-blue-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="max-h-56 overflow-y-auto space-y-0.5 pr-0.5">
            {filteredCurrencies.length === 0 ? (
              <p className="text-xs text-slate-400 p-2 text-center">No currency found</p>
            ) : (
              filteredCurrencies.map((c) => {
                const isSelected = c.code === value.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold w-6 text-slate-900 shrink-0">{c.symbol}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0 ml-1">
                      {c.code}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Mobile & Tablet Modal / Bottom Sheet Dialog via React Portal */}
      {showMobile &&
        isOpen &&
        mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="lg:hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
                setSearch('');
              }
            }}
          >
            <div
              className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-4 border border-slate-200 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-5 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Select Currency</h3>
                  <p className="text-[11px] text-slate-500">
                    Choose from 35+ supported global currencies
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className="w-9 h-9 -mr-1 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close currency picker"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-3 shrink-0">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  placeholder="Search currency (USD, EUR, INR, £...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full min-h-[44px] text-sm pl-9 pr-8 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-blue-500"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Currency list */}
              <div className="overflow-y-auto flex-1 divide-y divide-slate-100 pr-1">
                {filteredCurrencies.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No currencies matching &quot;{search}&quot;
                  </div>
                ) : (
                  filteredCurrencies.map((c) => {
                    const isSelected = c.code === value.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleSelect(c)}
                        className={`w-full min-h-[48px] flex items-center justify-between px-3 py-2 rounded-xl transition-colors text-left ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <span className="font-bold text-base w-8 text-slate-900 shrink-0">
                            {c.symbol}
                          </span>
                          <div className="truncate">
                            <span className="block text-xs font-semibold text-slate-800 truncate">
                              {c.name}
                            </span>
                            <span className="block text-[11px] text-slate-400 font-mono">
                              {c.code}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2 stroke-[2.5]" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
