/**
 * Initiates native browser print with clean dynamic document title
 * and frame synchronization so that when the user chooses "Save as PDF",
 * the document renders completely without missing styles or fonts.
 */
export function printInvoice(invoiceNumber: string, clientName?: string) {
  if (typeof window === 'undefined') return;

  const originalTitle = document.title;
  const safeNumber = (invoiceNumber || 'INV').replace(/[^a-zA-Z0-9-_]/g, '-');
  const safeClient = (clientName || '').replace(/[^a-zA-Z0-9-_]/g, '-').slice(0, 30);

  const suggestedFilename = safeClient
    ? `Invoice-${safeNumber}-${safeClient}`
    : `Invoice-${safeNumber}`;

  document.title = suggestedFilename;

  // Double requestAnimationFrame ensures any pending DOM paints and reflows finish
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Delay slightly for any background font/image assets
      setTimeout(() => {
        window.print();
        // Restore document title after print dialog closes
        setTimeout(() => {
          document.title = originalTitle;
        }, 1000);
      }, 100);
    });
  });
}
