import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://invoxa.app"),
  title: {
    default: "Invoxa – Free Invoice Maker | No Signup, No Watermark",
    template: "%s | Invoxa",
  },
  description:
    "Create and download professional PDF invoices in seconds. 100% free with 5 designer templates, 35+ currencies, zero signup, and client-side privacy.",
  keywords: [
    "free invoice maker",
    "free invoice generator",
    "invoice maker no signup",
    "invoice generator no login",
    "free invoice PDF",
    "professional invoice maker",
    "invoice maker for freelancers",
    "invoice maker for small business",
  ],
  authors: [{ name: "Invoxa" }],
  creator: "Invoxa",
  publisher: "Invoxa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://invoxa.app",
    siteName: "Invoxa",
    title: "Invoxa – Free Invoice Maker | No Signup, No Watermark",
    description:
      "Create and download professional PDF invoices in seconds. 100% free, client-side, zero signup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoxa – Free Invoice Maker | No Signup, No Watermark",
    description:
      "Create and download professional PDF invoices in seconds. 100% free, client-side, zero signup.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
