import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';
import { CurrencyConfig } from '@/types/invoice';

export const pdfSharedStyles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  classicPage: {
    padding: 36,
    fontSize: 9,
    fontFamily: 'Times-Roman',
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 20,
    left: 36,
    right: 36,
    textAlign: 'center',
    color: '#94a3b8',
  },
  tableRowNoSplit: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 6,
    paddingHorizontal: 8,
    minHeight: 24,
  },
});

/**
 * Formats money safely for vector PDF text output without unsupported glyph corruptions.
 */
export function formatPdfMoney(amount: number, currency: CurrencyConfig): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  const parts = Math.abs(safeAmount).toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedNumber = parts.join('.');
  const sign = safeAmount < 0 ? '-' : '';

  // Safe standard symbols that render perfectly in built-in PDF fonts (Helvetica / Times)
  const isAsciiSymbol = /^[$\xA2-\xA5\u00A3\u00A5]$/.test(currency.symbol);

  if (isAsciiSymbol) {
    if (currency.position === 'suffix') {
      return `${sign}${formattedNumber} ${currency.symbol.trim()}`;
    }
    return `${sign}${currency.symbol.trim()} ${formattedNumber}`;
  }

  // Fallback to currency code (e.g. INR 1,200.00) for standard PDF compatibility
  if (currency.position === 'suffix') {
    return `${sign}${formattedNumber} ${currency.code}`;
  }
  return `${sign}${currency.code} ${formattedNumber}`;
}

export const PdfPageFooter: React.FC = () => (
  <Text
    style={pdfSharedStyles.pageNumber}
    render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} • Generated with Invoxa`}
    fixed
  />
);
