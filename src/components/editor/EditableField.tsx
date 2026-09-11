'use client';

import React, { useRef, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  inputClassName?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date';
  min?: number;
  step?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  id?: string;
  style?: React.CSSProperties;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  placeholder = 'Click to edit...',
  multiline = false,
  className = '',
  inputClassName = '',
  align = 'left',
  type = 'text',
  min,
  step,
  onKeyDown,
  id,
  style,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height to fit content
  useEffect(() => {
    if (multiline && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, multiline]);

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  if (multiline) {
    return (
      <div className={`relative group w-full ${className}`}>
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          rows={1}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          style={style}
          className={`w-full resize-none overflow-hidden bg-transparent rounded-sm px-1.5 py-0.5 border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all text-slate-800 placeholder:text-slate-300 ${alignClasses} ${inputClassName}`}
        />
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        min={min}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        style={style}
        className={`w-full bg-transparent rounded-sm px-1.5 py-0.5 border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all text-slate-800 placeholder:text-slate-300 ${alignClasses} ${inputClassName}`}
      />
    </div>
  );
};
