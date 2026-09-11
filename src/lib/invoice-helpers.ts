import { PaymentDetails, TaxConfig, DiscountConfig } from '../types/invoice';

export function hasBankDetails(paymentDetails?: PaymentDetails): boolean {
  if (!paymentDetails) return false;
  return Boolean(
    paymentDetails.bankName?.trim() ||
    paymentDetails.accountName?.trim() ||
    paymentDetails.accountNumber?.trim() ||
    paymentDetails.routingOrSwift?.trim() ||
    paymentDetails.iban?.trim() ||
    paymentDetails.paymentLink?.trim() ||
    paymentDetails.customInstructions?.trim()
  );
}

export function hasNotes(notes?: string): boolean {
  return Boolean(notes && notes.trim().length > 0);
}

export function hasTerms(terms?: string): boolean {
  return Boolean(terms && terms.trim().length > 0);
}

export function hasTax(tax?: TaxConfig): boolean {
  return Boolean(tax && tax.enabled && tax.rate > 0);
}

export function hasDiscount(discount?: DiscountConfig): boolean {
  return Boolean(discount && discount.enabled && discount.value > 0);
}

export function hasShipping(shipping?: number): boolean {
  return Boolean(shipping && shipping > 0);
}

export function hasAmountPaid(amountPaid?: number): boolean {
  return Boolean(amountPaid && amountPaid > 0);
}

export function hasPoNumber(poNumber?: string): boolean {
  return Boolean(poNumber && poNumber.trim().length > 0);
}

