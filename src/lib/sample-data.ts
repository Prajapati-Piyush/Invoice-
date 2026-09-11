import { InvoiceData } from '../types/invoice';
import { DEFAULT_CURRENCY } from './currencies';
import { DEFAULT_LABELS, getTodayDateString, getDueDateString } from './default-data';

export function createSampleInvoice(): InvoiceData {
  return {
    id: 'inv_sample_apex_10',
    templateId: 'minimal',
    accentColor: '#2563EB',
    currency: DEFAULT_CURRENCY,

    invoiceNumber: 'INV-2026-0042',
    issueDate: getTodayDateString(),
    dueDate: getDueDateString(14),
    paymentTerms: 'Net 14 Days (Due upon receipt)',
    poNumber: 'PO-88291',

    sender: {
      name: 'Apex Studio & Labs Ltd.',
      email: 'billing@apexstudio.design',
      phone: '+1 (415) 890-2345',
      addressLine1: '548 Market Street, Suite 3200',
      addressLine2: 'Financial District',
      cityStateZip: 'San Francisco, CA 94104',
      country: 'United States',
      taxIdNumber: 'US-EIN-94-3829104',
    },

    client: {
      name: 'Vanguard Global Technologies Inc.',
      email: 'accounts-payable@vanguardglobal.io',
      phone: '+1 (512) 674-9900',
      addressLine1: '300 Colorado Street, 18th Floor',
      cityStateZip: 'Austin, TX 78701',
      country: 'United States',
      taxIdNumber: 'US-EIN-74-8291034',
    },

    // 10 realistic agency line items
    items: [
      {
        id: 'sample_item_1',
        description: 'Website Architecture, Information Design & Interactive Wireframing',
        quantity: 1,
        unitPrice: 3500,
      },
      {
        id: 'sample_item_2',
        description: 'Complete UI/UX Design System & Modular Figma Token Component Library',
        quantity: 1,
        unitPrice: 2800,
      },
      {
        id: 'sample_item_3',
        description: 'Next.js App Router Engineering & Responsive Tailwind CSS Implementation',
        quantity: 40,
        unitPrice: 120,
      },
      {
        id: 'sample_item_4',
        description: 'Cloud Infrastructure Setup, Serverless CI/CD Pipelines & Domain DNS Configuration',
        quantity: 1,
        unitPrice: 1500,
      },
      {
        id: 'sample_item_5',
        description: 'Comprehensive Technical SEO Audit, Canonical Routing & Schema.org JSON-LD Metadata',
        quantity: 1,
        unitPrice: 950,
      },
      {
        id: 'sample_item_6',
        description: 'Technical Content Strategy, Brand Messaging & High-Conversion Copywriting',
        quantity: 1,
        unitPrice: 1200,
      },
      {
        id: 'sample_item_7',
        description: 'Digital Accessibility Audit & Remediations (WCAG 2.1 AA Compliance Certification)',
        quantity: 8,
        unitPrice: 150,
      },
      {
        id: 'sample_item_8',
        description: 'Global Edge CDN Deployment, SSL Security Headers & Asset Cache Tuning',
        quantity: 1,
        unitPrice: 450,
      },
      {
        id: 'sample_item_9',
        description: 'Server-Side Analytics Instrumentation & Conversion Funnel Event Tracking',
        quantity: 1,
        unitPrice: 850,
      },
      {
        id: 'sample_item_10',
        description: '1-Month Post-Launch Priority SLA Support, Monitoring & Performance Assurance',
        quantity: 1,
        unitPrice: 1200,
      },
    ],

    discount: {
      enabled: true,
      type: 'percentage',
      value: 10,
    },

    tax: {
      enabled: true,
      name: 'State Sales Tax',
      rate: 8.25,
    },

    shipping: 0,
    amountPaid: 5000,

    notes: 'Thank you for choosing Apex Studio! Please include invoice reference INV-2026-0042 in all ACH / Wire memos.',
    terms: 'Payment is due within 14 calendar days. Unpaid balances past the due date will incur a 1.5% late fee per month. All intellectual property rights transfer upon complete settlement.',

    paymentDetails: {
      bankName: 'First Commercial Bank of California',
      accountName: 'Apex Studio & Labs Ltd.',
      accountNumber: '**** **** 9042',
      routingOrSwift: 'FCBC-US-66',
      iban: 'US89 FCBC 0123 4567 8901 23',
      paymentLink: 'https://pay.apexstudio.design/inv-0042',
      customInstructions: 'Direct Wire or ACH transfers preferred. For corporate credit card settlements, follow the secure payment link above.',
    },
    hasSignature: true,

    customLabels: { ...DEFAULT_LABELS },
  };
}
