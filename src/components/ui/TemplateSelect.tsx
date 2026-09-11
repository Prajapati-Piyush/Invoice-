'use client';

import React from 'react';
import { TemplateId } from '@/types/invoice';
import { LayoutTemplate } from 'lucide-react';

interface TemplateSelectProps {
  value: TemplateId;
  onChange: (template: TemplateId) => void;
}

const TEMPLATES: { id: TemplateId; label: string; desc: string }[] = [
  { id: 'minimalist', label: 'Minimalist', desc: 'Clean, modern & typography-first' },
  { id: 'corporate', label: 'Corporate', desc: 'Structured grid with accent bar' },
  { id: 'creative', label: 'Creative', desc: 'Bold display headers & callout pill' },
];

export const TemplateSelect: React.FC<TemplateSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
      {TEMPLATES.map((t) => {
        const isActive = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              isActive
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
            title={t.desc}
          >
            <LayoutTemplate className="w-3 h-3 text-slate-400" />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

