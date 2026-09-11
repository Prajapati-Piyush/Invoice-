import { InvoiceData, InvoiceLabels } from '../types/invoice';
import { DEFAULT_CURRENCY } from './currencies';

export const DEFAULT_LABELS: InvoiceLabels = {
  documentTitle: 'INVOICE',
  invoiceNumber: 'Invoice No.',
  issueDate: 'Issue Date',
  dueDate: 'Due Date',
  fromSection: 'Billed By',
  toSection: 'Billed To',
  itemHeading: 'Description',
  qtyHeading: 'Qty',
  rateHeading: 'Rate',
  amountHeading: 'Amount',
  subtotal: 'Subtotal',
  discount: 'Discount',
  tax: 'Tax',
  shipping: 'Shipping / Handling',
  total: 'Total',
  amountPaid: 'Amount Paid',
  balanceDue: 'Balance Due',
};

export function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export function getDueDateString(daysAhead = 14): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

export function createDefaultInvoice(): InvoiceData {
  return {
    id: 'inv_' + Date.now(),
    templateId: 'minimal',
    accentColor: '#2563EB', // Classic Royal Blue
    currency: DEFAULT_CURRENCY,

    invoiceNumber: 'INV-0001',
    issueDate: getTodayDateString(),
    dueDate: getDueDateString(14),
    paymentTerms: 'Payment due within 14 days',

    sender: {
      name: '',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      cityStateZip: '',
      country: '',
      taxIdNumber: '',
    },

    client: {
      name: '',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      cityStateZip: '',
      country: '',
      taxIdNumber: '',
    },

    items: [
      {
        id: 'item_1',
        description: 'Web Design & Development Consultation',
        quantity: 1,
        unitPrice: 1500,
      },
      {
        id: 'item_2',
        description: 'Brand Identity Guidelines & Asset Export',
        quantity: 1,
        unitPrice: 750,
      },
    ],

    discount: {
      enabled: false,
      type: 'percentage',
      value: 0,
    },

    tax: {
      enabled: false,
      name: 'Tax / VAT',
      rate: 10,
    },

    shipping: 0,
    amountPaid: 0,

    notes: '',
    terms: '',
    paymentDetails: {},
    hasSignature: false,

    customLabels: { ...DEFAULT_LABELS },
  };
}
