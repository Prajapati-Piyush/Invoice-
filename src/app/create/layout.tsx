import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice Studio – Create Free PDF Invoice',
  description:
    'Free online invoice creator. Customize line items, tax, discounts, currencies, and download razor-sharp PDF invoices immediately with no login or watermarks.',
  alternates: {
    canonical: 'https://invoxa.app/create',
  },
  openGraph: {
    title: 'Invoice Studio – Invoxa Free Invoice Maker',
    description: 'Instant client-side PDF invoice creator with no signup required.',
    url: 'https://invoxa.app/create',
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

