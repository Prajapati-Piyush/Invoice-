export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'CAD'
  | 'AUD'
  | 'INR'
  | 'JPY'
  | 'CHF'
  | 'CNY'
  | 'SGD'
  | 'NZD'
  | 'BRL'
  | 'ZAR'
  | 'AED'
  | 'SAR'
  | 'MXN'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'PLN'
  | 'TRY'
  | string;

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  position: 'prefix' | 'suffix';
}

export interface BusinessEntity {
  name: string;
  logoUrl?: string; // base64 DataURI
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  cityStateZip?: string;
  country?: string;
  taxIdNumber?: string; // VAT ID, EIN, GSTIN, etc.
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type DiscountType = 'percentage' | 'fixed';

export interface DiscountConfig {
  enabled: boolean;
  type: DiscountType;
  value: number; // e.g., 10 for 10% or 50 for $50
}

export interface TaxConfig {
  enabled: boolean;
  name: string; // e.g., "VAT", "GST", "Sales Tax"
  rate: number; // percentage, e.g., 20 for 20%
}

export interface PaymentDetails {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  routingOrSwift?: string;
  iban?: string;
  paymentLink?: string;
  customInstructions?: string;
}

export interface InvoiceLabels {
  documentTitle: string; // e.g. "INVOICE"
  invoiceNumber: string; // e.g. "Invoice #"
  issueDate: string; // e.g. "Invoice Date"
  dueDate: string; // e.g. "Due Date"
  fromSection: string; // e.g. "Billed By"
  toSection: string; // e.g. "Billed To"
  itemHeading: string; // e.g. "Description"
  qtyHeading: string; // e.g. "Qty"
  rateHeading: string; // e.g. "Rate"
  amountHeading: string; // e.g. "Amount"
  subtotal: string; // e.g. "Subtotal"
  discount: string; // e.g. "Discount"
  tax: string; // e.g. "Tax"
  shipping: string; // e.g. "Shipping / Handling"
  total: string; // e.g. "Total"
  amountPaid: string; // e.g. "Amount Paid"
  balanceDue: string; // e.g. "Balance Due"
}

export type TemplateId =
  | 'minimal'
  | 'professional'
  | 'modern'
  | 'creative'
  | 'classic'
  | 'minimalist' // backwards compatibility alias for minimal
  | 'corporate'; // backwards compatibility alias for professional

export interface InvoiceData {
  id: string;
  templateId: TemplateId;
  accentColor: string; // Hex color code (e.g., "#2563EB")
  currency: CurrencyConfig;

  invoiceNumber: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  paymentTerms: string; // e.g., "Due on receipt", "Net 15", "Net 30"
  poNumber?: string;

  sender: BusinessEntity;
  client: BusinessEntity;

  items: LineItem[];

  discount: DiscountConfig;
  tax: TaxConfig;
  shipping: number;
  amountPaid: number;

  notes?: string;
  terms?: string;
  paymentDetails: PaymentDetails;
  hasSignature?: boolean;

  customLabels: InvoiceLabels;
}

export interface InvoiceCalculations {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  shippingAmount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
}

