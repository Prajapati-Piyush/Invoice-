export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    q: 'Is Invoxa really 100% free with no watermark?',
    a: 'Yes, absolutely. Invoxa is completely free with zero watermarks on any exported PDF. You do not need to sign up, subscribe, or provide credit card information.',
  },
  {
    q: 'Do I need to create an account or provide an email to download my invoice?',
    a: 'Never. Unlike many online tools that trick you into filling an invoice and then demand your email address, Invoxa generates your vector PDF instantly in 1 click.',
  },
  {
    q: 'Where is my financial and client data stored?',
    a: 'All data is stored strictly inside your own browser using HTML5 localStorage. Your invoice numbers, rates, client names, and banking details never leave your device and are never sent to external servers.',
  },
  {
    q: 'Can I reuse my business details for future invoices?',
    a: 'Yes! Invoxa automatically caches your business name, address, tax ID, logo, and bank wire details. When you click "New Invoice", your client and item rows are cleared while your business profile remains saved.',
  },
  {
    q: 'How does Invoxa support multiple line items and multi-page invoices?',
    a: 'Invoxa is built for real-world business invoices. Our templates include CSS page-break rules (break-inside: avoid) ensuring that 10+ line items flow naturally across pages without cutting text or table rows awkwardly.',
  },
  {
    q: 'Does Invoxa handle taxes, discounts, and multiple currencies?',
    a: 'Yes. You can add percentage or fixed discounts, custom tax rates (such as VAT, GST, or State Sales Tax), shipping charges, and select from 35+ global world currencies with authentic symbols and decimal formatting.',
  },
  {
    q: 'Can I upload my company logo?',
    a: 'Yes. You can upload PNG, JPG, or SVG logos. Invoxa automatically optimizes and compresses your logo on an in-memory canvas before saving, ensuring it fits cleanly inside browser storage without quota errors.',
  },
];

