import { InvoiceData, InvoiceCalculations } from '../types/invoice';

/**
 * Rounds a number strictly to 2 decimal places to avoid IEEE floating point inaccuracies
 */
export function round2(num: number): number {
  if (isNaN(num) || !isFinite(num)) return 0;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates line item total: quantity * unitPrice
 */
export function calculateLineTotal(quantity: number, unitPrice: number): number {
  const safeQty = Math.max(0, isNaN(quantity) ? 0 : quantity);
  const safePrice = Math.max(0, isNaN(unitPrice) ? 0 : unitPrice);
  return round2(safeQty * safePrice);
}

/**
 * Computes all invoice financial summary figures with strict safety guards
 */
export function calculateInvoice(invoice: InvoiceData): InvoiceCalculations {
  // 1. Calculate raw subtotal from line items
  const subtotal = round2(
    invoice.items.reduce((acc, item) => {
      const lineTotal = calculateLineTotal(item.quantity, item.unitPrice);
      return acc + lineTotal;
    }, 0)
  );

  // 2. Calculate discount amount
  let discountAmount = 0;
  if (invoice.discount && invoice.discount.enabled && invoice.discount.value > 0) {
    if (invoice.discount.type === 'percentage') {
      const pct = Math.min(100, Math.max(0, invoice.discount.value));
      discountAmount = round2(subtotal * (pct / 100));
    } else {
      // Fixed discount cannot exceed subtotal
      discountAmount = round2(Math.min(subtotal, Math.max(0, invoice.discount.value)));
    }
  }

  // 3. Subtotal after discount
  const taxableAmount = Math.max(0, round2(subtotal - discountAmount));

  // 4. Calculate Tax
  let taxAmount = 0;
  if (invoice.tax && invoice.tax.enabled && invoice.tax.rate > 0) {
    const rate = Math.max(0, invoice.tax.rate);
    taxAmount = round2(taxableAmount * (rate / 100));
  }

  // 5. Shipping / Extra handling fee
  const shippingAmount = round2(Math.max(0, isNaN(invoice.shipping) ? 0 : invoice.shipping));

  // 6. Total
  const total = round2(taxableAmount + taxAmount + shippingAmount);

  // 7. Amount Paid and Balance Due
  const amountPaid = round2(Math.max(0, isNaN(invoice.amountPaid) ? 0 : invoice.amountPaid));
  const balanceDue = round2(Math.max(0, total - amountPaid));

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    shippingAmount,
    total,
    amountPaid,
    balanceDue,
  };
}
