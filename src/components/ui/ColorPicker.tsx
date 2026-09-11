'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Palette, Check, X } from 'lucide-react';

import { useIsMounted } from '@/hooks/useIsMounted';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  variant?: 'desktop' | 'mobile' | 'auto';
}

const PRESET_COLORS = [
  { name: 'Royal Blue', hex: '#2563EB' },
  { name: 'Indigo', hex: '#4F46E5' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Violet', hex: '#7C3AED' },
  { name: 'Rose', hex: '#E11D48' },
  { name: 'Amber', hex: '#D97706' },
  { name: 'Slate', hex: '#475569' },
  { name: 'Midnight', hex: '#0F172A' },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  variant = 'auto',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customHex, setCustomHex] = useState(value);
  const mounted = useIsMounted();

  const popoverRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    if (!isOpen) {
      setCustomHex(value);
    }
    setIsOpen(!isOpen);
  };

  const [prevValue, setPrevValue] = useState(value);

  if (prevValue !== value) {
    setPrevValue(value);
    setCustomHex(value);
  }

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
      } else {
        document.body.style.overflow = 'hidden';
      }
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, variant]);

  const handleCustomHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHex(val);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      onChange(val);
    }
  };

  const handleNativeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHex(val);
    onChange(val);
  };

  const showDesktop = variant === 'desktop' || variant === 'auto';
  const showMobile = variant === 'mobile' || variant === 'auto';

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleOpen}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs active:bg-slate-100"
        title="Change Invoice Accent Color"
        aria-label="Choose accent color"
      >
        <span
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-black/10 shadow-xs shrink-0"
          style={{ backgroundColor: value }}
        />
        <span className="text-slate-700">Theme</span>
        <Palette className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {/* Desktop Inline Popover Dropdown (screens >= 1024px) */}
      {showDesktop && isOpen && (
        <div className="hidden lg:block absolute left-0 top-full mt-2 w-64 p-3 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Brand Accent
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Close color picker"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            {PRESET_COLORS.map((color) => {
              const isSelected = value.toLowerCase() === color.hex.toLowerCase();
              return (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => {
                    onChange(color.hex);
                    setCustomHex(color.hex);
                  }}
                  className="group relative w-12 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-hidden"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {isSelected && (
                    <Check className="w-4 h-4 text-white drop-shadow-sm stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2.5 border-t border-slate-100">
            <label className="text-[11px] font-medium text-slate-500 block mb-1">Custom Hex</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value}
                onChange={handleNativeColorChange}
                className="w-8 h-8 rounded border border-slate-200 p-0.5 cursor-pointer shrink-0"
              />
              <input
                type="text"
                value={customHex}
                onChange={handleCustomHexChange}
                placeholder="#2563EB"
                maxLength={7}
                className="w-full text-xs font-mono uppercase px-2.5 py-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile & Tablet Modal / Bottom Sheet via React Portal */}
      {showMobile &&
        isOpen &&
        mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="lg:hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <div
              className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 border border-slate-200 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-5 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs shrink-0"
                    style={{ backgroundColor: value }}
                  />
                  <h3 className="text-sm font-bold text-slate-900">Choose Accent Color</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 -mr-1 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close color picker"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preset Swatches: 2-column grid with >= 46px touch targets */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {PRESET_COLORS.map((color) => {
                  const isSelected = value.toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => {
                        onChange(color.hex);
                        setCustomHex(color.hex);
                      }}
                      className={`min-h-[46px] px-3 py-2 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-2 ring-blue-600 font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-white active:bg-slate-50'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Section */}
              <div className="pt-3 border-t border-slate-100 mb-4">
                <label className="text-xs font-semibold text-slate-600 block mb-2">
                  Custom Color
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 shrink-0 rounded-xl overflow-hidden border border-slate-300 shadow-xs">
                    <input
                      type="color"
                      value={value}
                      onChange={handleNativeColorChange}
                      className="absolute inset-0 w-[150%] h-[150%] -top-1 -left-1 cursor-pointer"
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={customHex}
                      onChange={handleCustomHexChange}
                      placeholder="#2563EB"
                      maxLength={7}
                      className="w-full min-h-[44px] px-3 text-sm font-mono uppercase bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Done CTA */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center active:scale-98"
              >
                Done
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
