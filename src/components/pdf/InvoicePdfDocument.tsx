import React from 'react';
import { Document } from '@react-pdf/renderer';
import { InvoiceData, InvoiceCalculations } from '@/types/invoice';
import { PdfMinimalTemplate } from './templates/PdfMinimalTemplate';
import { PdfCorporateTemplate } from './templates/PdfCorporateTemplate';
import { PdfModernTemplate } from './templates/PdfModernTemplate';
import { PdfCreativeTemplate } from './templates/PdfCreativeTemplate';
import { PdfClassicTemplate } from './templates/PdfClassicTemplate';

export interface InvoicePdfDocumentProps {
  invoice: InvoiceData;
  calculations: InvoiceCalculations;
}

export const InvoicePdfDocument: React.FC<InvoicePdfDocumentProps> = ({
  invoice,
  calculations,
}) => {
  const renderTemplate = () => {
    switch (invoice.templateId) {
      case 'professional':
      case 'corporate':
        return <PdfCorporateTemplate invoice={invoice} calculations={calculations} />;
      case 'modern':
        return <PdfModernTemplate invoice={invoice} calculations={calculations} />;
      case 'creative':
        return <PdfCreativeTemplate invoice={invoice} calculations={calculations} />;
      case 'classic':
        return <PdfClassicTemplate invoice={invoice} calculations={calculations} />;
      case 'minimal':
      case 'minimalist':
      default:
        return <PdfMinimalTemplate invoice={invoice} calculations={calculations} />;
    }
  };

  return (
    <Document
      title={`Invoice-${invoice.invoiceNumber || 'INV'}`}
      author={invoice.sender.name || 'Invoxa'}
      subject={`Invoice for ${invoice.client.name || 'Client'}`}
      creator="Invoxa Free Invoice Maker"
      producer="Invoxa PDF Engine"
    >
      {renderTemplate()}
    </Document>
  );
};

