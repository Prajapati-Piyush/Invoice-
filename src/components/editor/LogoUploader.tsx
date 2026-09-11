'use client';

import React, { useRef, useState } from 'react';
import { compressImage } from '@/lib/image-compressor';
import { X, Image as ImageIcon } from 'lucide-react';

interface LogoUploaderProps {
  logoUrl?: string;
  onChange: (dataUrl?: string) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ logoUrl, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    try {
      setIsLoading(true);
      const compressed = await compressImage(file, 450, 0.88);
      onChange(compressed);
    } catch (e) {
      console.error('Failed to compress logo:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  if (logoUrl) {
    return (
      <div
        className="relative inline-block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt="Company Logo"
          className="max-h-20 max-w-[200px] object-contain rounded-sm"
        />

        {/* Hover overlay with Change and Remove actions */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 rounded-sm flex items-center justify-center gap-2 transition-opacity no-print">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 bg-white/90 text-slate-800 rounded-md hover:bg-white text-xs font-medium"
              title="Replace Logo"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="p-1.5 bg-red-600/90 text-white rounded-md hover:bg-red-600"
              title="Remove Logo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
          }}
        />
      </div>
    );
  }

  return (
    <div className="no-print">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`w-44 h-20 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors p-2 text-center group bg-slate-50/50 hover:bg-blue-50/20 ${
          isLoading ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mb-1 transition-colors" />
        <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600">
          {isLoading ? 'Processing...' : '+ Add Your Logo'}
        </span>
        <span className="text-[10px] text-slate-400">PNG, JPG, SVG</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />
    </div>
  );
};
