'use client';

import { useState, useEffect, useMemo, useCallback, useSyncExternalStore } from 'react';
import {
  InvoiceData,
  LineItem,
  BusinessEntity,
  DiscountConfig,
  TaxConfig,
  PaymentDetails,
  CurrencyConfig,
  TemplateId,
  InvoiceLabels,
} from '@/types/invoice';
import { createDefaultInvoice } from '@/lib/default-data';
import { createSampleInvoice } from '@/lib/sample-data';
import { calculateInvoice } from '@/lib/calculations';

const STORAGE_KEY = 'quick_invoice_draft_v2';
const SENDER_CACHE_KEY = 'quick_invoice_sender_profile_v2';

function loadInitialInvoice(): InvoiceData {
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const def = createDefaultInvoice();
        return {
          ...def,
          ...parsed,
          items: parsed.items?.length ? parsed.items : def.items,
          customLabels: { ...def.customLabels, ...(parsed.customLabels || {}) },
        };
      }
    } catch (e) {
      console.warn('Could not restore invoice draft:', e);
    }
  }
  return createDefaultInvoice();
}

// React 18/19 hydration detection via useSyncExternalStore
const emptySubscribe = () => () => {};

export function useInvoice() {
  const [invoice, setInvoice] = useState<InvoiceData>(loadInitialInvoice);
  const isLoaded = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save to localStorage whenever invoice changes (debounced by 200ms)
  useEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice));
        // Cache sender details separately so New Invoice doesn't wipe company info
        if (invoice.sender.name || invoice.sender.logoUrl) {
          window.localStorage.setItem(
            SENDER_CACHE_KEY,
            JSON.stringify({
              sender: invoice.sender,
              paymentDetails: invoice.paymentDetails,
              accentColor: invoice.accentColor,
              currency: invoice.currency,
              templateId: invoice.templateId,
            })
          );
        }
        setLastSaved(new Date());
      } catch (e) {
        console.warn('Auto-save error:', e);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [invoice, isLoaded]);

  // Real-time calculations with memoization
  const calculations = useMemo(() => {
    return calculateInvoice(invoice);
  }, [invoice]);

  // Root update helper
  const updateInvoice = useCallback((patch: Partial<InvoiceData>) => {
    setInvoice((prev) => ({ ...prev, ...patch }));
  }, []);

  // Update sender info
  const updateSender = useCallback((patch: Partial<BusinessEntity>) => {
    setInvoice((prev) => ({
      ...prev,
      sender: { ...prev.sender, ...patch },
    }));
  }, []);

  // Update client info
  const updateClient = useCallback((patch: Partial<BusinessEntity>) => {
    setInvoice((prev) => ({
      ...prev,
      client: { ...prev.client, ...patch },
    }));
  }, []);

  // Update labels
  const updateCustomLabels = useCallback((patch: Partial<InvoiceLabels>) => {
    setInvoice((prev) => ({
      ...prev,
      customLabels: { ...prev.customLabels, ...patch },
    }));
  }, []);

  // Update payment instructions / bank details
  const updatePaymentDetails = useCallback((patch: Partial<PaymentDetails>) => {
    setInvoice((prev) => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, ...patch },
    }));
  }, []);

  // Add line item
  const addItem = useCallback(() => {
    const newItem: LineItem = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      description: '',
      quantity: 1,
      unitPrice: 0,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  }, []);

  // Update specific line item
  const updateItem = useCallback((id: string, patch: Partial<LineItem>) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }, []);

  // Remove line item
  const removeItem = useCallback((id: string) => {
    setInvoice((prev) => {
      if (prev.items.length <= 1) {
        return {
          ...prev,
          items: [{ id: 'item_1', description: '', quantity: 1, unitPrice: 0 }],
        };
      }
      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
  }, []);

  // Reorder items if needed
  const reorderItems = useCallback((newItems: LineItem[]) => {
    setInvoice((prev) => ({ ...prev, items: newItems }));
  }, []);

  // Update discount
  const updateDiscount = useCallback((patch: Partial<DiscountConfig>) => {
    setInvoice((prev) => ({
      ...prev,
      discount: { ...prev.discount, ...patch },
    }));
  }, []);

  // Update tax
  const updateTax = useCallback((patch: Partial<TaxConfig>) => {
    setInvoice((prev) => ({
      ...prev,
      tax: { ...prev.tax, ...patch },
    }));
  }, []);

  // Set currency
  const setCurrency = useCallback((currency: CurrencyConfig) => {
    setInvoice((prev) => ({ ...prev, currency }));
  }, []);

  // Set template
  const setTemplate = useCallback((templateId: TemplateId) => {
    setInvoice((prev) => ({ ...prev, templateId }));
  }, []);

  // Set accent color
  const setAccentColor = useCallback((accentColor: string) => {
    setInvoice((prev) => ({ ...prev, accentColor }));
  }, []);

  // Load realistic sample invoice
  const loadSample = useCallback(() => {
    setInvoice(createSampleInvoice());
  }, []);

  // Reset invoice to fresh blank (preserves sender profile and settings)
  const resetInvoice = useCallback(() => {
    const blank = createDefaultInvoice();
    try {
      const cached = window.localStorage.getItem(SENDER_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.sender) blank.sender = parsed.sender;
        if (parsed.paymentDetails) blank.paymentDetails = parsed.paymentDetails;
        if (parsed.accentColor) blank.accentColor = parsed.accentColor;
        if (parsed.currency) blank.currency = parsed.currency;
        if (parsed.templateId) blank.templateId = parsed.templateId;
      }
    } catch (e) {
      console.warn('Could not read cached sender:', e);
    }
    setInvoice(blank);
  }, []);

  return {
    invoice,
    calculations,
    isLoaded,
    lastSaved,
    updateInvoice,
    updateSender,
    updateClient,
    updateCustomLabels,
    updatePaymentDetails,
    addItem,
    updateItem,
    removeItem,
    reorderItems,
    updateDiscount,
    updateTax,
    setCurrency,
    setTemplate,
    setAccentColor,
    loadSample,
    resetInvoice,
  };
}

