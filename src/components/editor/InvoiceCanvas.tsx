'use client';

import React from 'react';
import { TemplateProps, MinimalTemplate } from '../templates/MinimalTemplate';
import { CorporateTemplate } from '../templates/CorporateTemplate';
import { ModernTemplate } from '../templates/ModernTemplate';
import { CreativeTemplate } from '../templates/CreativeTemplate';
import { ClassicTemplate } from '../templates/ClassicTemplate';

export const InvoiceCanvas: React.FC<TemplateProps> = (props) => {
  const { templateId } = props.invoice;

  const renderTemplate = () => {
    switch (templateId) {
      case 'professional':
      case 'corporate':
        return <CorporateTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'minimal':
      case 'minimalist':
      default:
        return <MinimalTemplate {...props} />;
    }
  };

  return (
    <div
      id="invoice-print-canvas"
      className="w-full max-w-[850px] mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200/80 overflow-hidden transition-all duration-200"
    >
      {renderTemplate()}
    </div>
  );
};
