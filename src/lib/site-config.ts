/**
 * Centralized site configuration for production URLs and SEO metadata.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://invoxa-invoice.vercel.app';

/**
 * Google Search Console verification token.
 * Paste your token here directly, or set the NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
 * environment variable in your Vercel project settings.
 */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE';

