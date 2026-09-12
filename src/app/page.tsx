import React from 'react';
import { Metadata } from 'next';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { TemplateShowcase } from '@/components/landing/TemplateShowcase';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ComparisonTable } from '@/components/landing/ComparisonTable';
import { InvoiceGuideSection } from '@/components/landing/InvoiceGuideSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { FAQ_DATA } from '@/lib/faq-data';
import { CtaBanner } from '@/components/landing/CtaBanner';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Invoxa – Free Invoice Maker | No Signup, No Watermark, Private & Fast',
  description:
    'Create and download professional PDF invoices in seconds. 100% free with 5 designer templates, 35+ currencies, zero signup, and client-side privacy.',
  keywords: [
    'free invoice maker',
    'free invoice generator',
    'invoice maker no signup',
    'invoice generator no login',
    'free invoice PDF',
    'professional invoice maker',
    'invoice maker for freelancers',
    'invoice maker for small business',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Invoxa – Free Invoice Maker (No Signup, No Watermark)',
    description:
      'The modern, privacy-first invoice maker for freelancers and small businesses. Create pixel-perfect vector PDF invoices instantly.',
    url: SITE_URL,
    siteName: 'Invoxa',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoxa – Free Invoice Maker (No Signup, No Watermark)',
    description:
      'Create and download professional PDF invoices in seconds. 100% free, client-side, zero signup.',
  },
};

export default function LandingPage() {
  // Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLdSoftware = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Invoxa',
    operatingSystem: 'Any Web Browser',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free, privacy-first invoice maker and vector PDF generator with zero login or subscription requirements.',
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Invoxa',
    url: SITE_URL,
  };

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Invoxa',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: 'Privacy-focused business invoicing software and free PDF invoice maker.',
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />

      {/* Landing Page Content Sections */}
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <TemplateShowcase />
        <FeatureGrid />
        <HowItWorks />
        <ComparisonTable />
        <InvoiceGuideSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <LandingFooter />
    </div>
  );
}
