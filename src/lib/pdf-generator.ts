import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { InvoiceData, InvoiceCalculations } from '@/types/invoice';
import { InvoicePdfDocument } from '@/components/pdf/InvoicePdfDocument';

/**
 * Sanitizes a string for safe usage in a file name.
 */
function sanitizeFileNamePart(text: string, fallback: string): string {
  const sanitized = text
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return sanitized.length > 0 ? sanitized : fallback;
}

/**
 * Generates an SEO & user-friendly file name such as "Invoice-INV-0001-Acme-Corp.pdf".
 */
export function generateInvoiceFilename(invoice: InvoiceData): string {
  const invNumber = sanitizeFileNamePart(invoice.invoiceNumber || '', 'INV-0001');
  const clientName = sanitizeFileNamePart(invoice.client.name || '', 'Client');
  return `Invoice-${invNumber}-${clientName}.pdf`;
}

/**
 * Generates a real client-side vector PDF and triggers a direct browser download.
 * NEVER invokes window.print() or the browser print dialog.
 */
export async function generateAndDownloadPdf(
  invoice: InvoiceData,
  calculations: InvoiceCalculations
): Promise<{ success: boolean; filename: string; error?: string }> {
  try {
    const filename = generateInvoiceFilename(invoice);

    // Create the PDF document element
    const docElement = React.createElement(InvoicePdfDocument, {
      invoice,
      calculations,
    });

    // Generate PDF blob in browser memory
    // Cast needed as react-pdf's DocumentProps strict type expects top-level Document tags directly
    const blob = await pdf(docElement as unknown as Parameters<typeof pdf>[0]).toBlob();

    // Create object URL and trigger direct download
    const blobUrl = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.style.display = 'none';
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = filename;

    // Append to body, trigger download, clean up
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();

    setTimeout(() => {
      if (document.body.contains(downloadAnchor)) {
        document.body.removeChild(downloadAnchor);
      }
      URL.revokeObjectURL(blobUrl);
    }, 2500);

    return { success: true, filename };
  } catch (err: unknown) {
    console.error('Failed to generate client-side PDF:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error generating PDF';
    return { success: false, filename: 'invoice.pdf', error: errorMessage };
  }
}
