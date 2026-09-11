'use client';

import React from 'react';
import { X } from 'lucide-react';

interface SignatureBlockProps {
  onRemove: () => void;
  isClassic?: boolean;
}

export const SignatureBlock: React.FC<SignatureBlockProps> = ({ onRemove, isClassic }) => {
  return (
    <div className="pt-8 mt-6 border-t border-slate-200 relative group text-xs print-break-inside-avoid">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Authorization & Signing
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="no-print opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 flex items-center gap-1 text-[11px] font-medium bg-slate-50 hover:bg-red-50 px-2 py-0.5 rounded-md"
          title="Remove signature section"
        >
          <X className="w-3 h-3" />
          <span>Remove Signature</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="border-b border-slate-400 h-10 mb-1.5"></div>
          <span className={`text-[10px] uppercase font-semibold text-slate-500 ${isClassic ? 'font-serif' : 'font-sans'}`}>
            Authorized Signature
          </span>
        </div>
        <div>
          <div className="border-b border-slate-400 h-10 mb-1.5"></div>
          <span className={`text-[10px] uppercase font-semibold text-slate-500 ${isClassic ? 'font-serif' : 'font-sans'}`}>
            Date & Acknowledgment
          </span>
        </div>
      </div>
    </div>
  );
};

