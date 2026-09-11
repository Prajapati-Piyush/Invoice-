import { CurrencyConfig } from '../types/invoice';

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', position: 'prefix' },
  { code: 'EUR', symbol: '€', name: 'Euro', position: 'prefix' },
  { code: 'GBP', symbol: '£', name: 'British Pound', position: 'prefix' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', position: 'prefix' },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', position: 'prefix' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', position: 'prefix' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', position: 'prefix' },
  { code: 'CHF', symbol: 'CHF ', name: 'Swiss Franc', position: 'prefix' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', position: 'prefix' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', position: 'prefix' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', position: 'prefix' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', position: 'prefix' },
  { code: 'SAR', symbol: 'SAR ', name: 'Saudi Riyal', position: 'prefix' },
  { code: 'BRL', symbol: 'R$ ', name: 'Brazilian Real', position: 'prefix' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', position: 'prefix' },
  { code: 'ZAR', symbol: 'R ', name: 'South African Rand', position: 'prefix' },
  { code: 'SEK', symbol: ' kr', name: 'Swedish Krona', position: 'suffix' },
  { code: 'NOK', symbol: ' kr', name: 'Norwegian Krone', position: 'suffix' },
  { code: 'DKK', symbol: ' kr', name: 'Danish Krone', position: 'suffix' },
  { code: 'PLN', symbol: ' zł', name: 'Polish Zloty', position: 'suffix' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', position: 'prefix' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', position: 'prefix' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', position: 'prefix' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', position: 'prefix' },
  { code: 'MYR', symbol: 'RM ', name: 'Malaysian Ringgit', position: 'prefix' },
  { code: 'IDR', symbol: 'Rp ', name: 'Indonesian Rupiah', position: 'prefix' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', position: 'prefix' },
  { code: 'CZK', symbol: ' Kč', name: 'Czech Koruna', position: 'suffix' },
  { code: 'HUF', symbol: ' Ft', name: 'Hungarian Forint', position: 'suffix' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', position: 'prefix' },
  { code: 'CLP', symbol: 'CLP$', name: 'Chilean Peso', position: 'prefix' },
  { code: 'COP', symbol: 'COL$', name: 'Colombian Peso', position: 'prefix' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', position: 'prefix' },
  { code: 'KES', symbol: 'KSh ', name: 'Kenyan Shilling', position: 'prefix' },
];

export const DEFAULT_CURRENCY: CurrencyConfig = CURRENCIES[0]; // USD

export function formatMoney(amount: number, currency: CurrencyConfig): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  // Format with 2 decimal places and locale comma separators
  const parts = Math.abs(safeAmount).toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedNumber = parts.join('.');
  const sign = safeAmount < 0 ? '-' : '';

  if (currency.position === 'suffix') {
    return `${sign}${formattedNumber}${currency.symbol}`;
  }
  return `${sign}${currency.symbol}${formattedNumber}`;
}
