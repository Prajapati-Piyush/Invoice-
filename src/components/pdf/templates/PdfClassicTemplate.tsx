import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { PdfTemplateProps } from './PdfMinimalTemplate';
import { formatPdfMoney, PdfPageFooter, pdfSharedStyles } from '../PdfShared';
import {
  hasBankDetails,
  hasNotes,
  hasTerms,
  hasDiscount,
  hasTax,
  hasShipping,
  hasAmountPaid,
  hasPoNumber,
} from '@/lib/invoice-helpers';

const styles = StyleSheet.create({
  page: {
    ...pdfSharedStyles.classicPage,
    paddingBottom: 48,
  },
  topDoubleRule: {
    borderTopWidth: 3,
    borderTopColor: '#0f172a',
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 16,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  senderCol: {
    maxWidth: '55%',
  },
  metaCol: {
    minWidth: 180,
    alignItems: 'flex-end',
  },
  logo: {
    maxWidth: 120,
    maxHeight: 45,
    objectFit: 'contain',
    marginBottom: 8,
  },
  senderName: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  subText: {
    fontSize: 8.5,
    color: '#475569',
    lineHeight: 1.35,
  },
  taxId: {
    fontSize: 8,
    color: '#64748b',
    fontFamily: 'Courier',
    marginTop: 2,
  },
  docTitle: {
    fontSize: 24,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 3,
  },
  metaLabel: {
    fontSize: 8.5,
    color: '#64748b',
    marginRight: 6,
  },
  metaValue: {
    fontSize: 8.5,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
  },
  metaValueMono: {
    fontSize: 8.5,
    fontFamily: 'Courier-Bold',
    color: '#0f172a',
  },
  partiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  partyCol: {
    width: '48%',
  },
  sectionHeading: {
    fontSize: 8,
    fontFamily: 'Times-Bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderTopWidth: 1.5,
    borderTopColor: '#0f172a',
    borderBottomWidth: 1.5,
    borderBottomColor: '#0f172a',
    paddingVertical: 5,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    ...pdfSharedStyles.tableRowNoSplit,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  colDesc: {
    flex: 3,
  },
  colQty: {
    flex: 0.8,
    textAlign: 'right',
  },
  colRate: {
    flex: 1.1,
    textAlign: 'right',
  },
  colAmount: {
    flex: 1.1,
    textAlign: 'right',
  },
  itemDesc: {
    fontSize: 9,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
  },
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  totalsBox: {
    width: 220,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  totalLabel: {
    fontSize: 8.5,
    color: '#475569',
  },
  totalVal: {
    fontSize: 8.5,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginTop: 4,
    borderTopWidth: 1.5,
    borderTopColor: '#0f172a',
    borderBottomWidth: 2,
    borderBottomColor: '#0f172a',
  },
  grandTotalLabel: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
  },
  grandTotalVal: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginTop: 4,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    paddingTop: 16,
  },
  splitCols: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  infoBlock: {
    flex: 1,
  },
  bankBox: {
    backgroundColor: '#f8fafc',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginTop: 4,
  },
  bankRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bankLabel: {
    width: 80,
    fontSize: 8,
    color: '#64748b',
  },
  bankVal: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Times-Bold',
    color: '#0f172a',
  },
  signatureContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
  },
  signatureCols: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  signatureBox: {
    width: '45%',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#0f172a',
    height: 30,
    marginBottom: 4,
  },
  signatureText: {
    fontSize: 8,
    color: '#475569',
    textTransform: 'uppercase',
    fontFamily: 'Times-Bold',
  },
});

export const PdfClassicTemplate: React.FC<PdfTemplateProps> = ({ invoice, calculations }) => {
  const { sender, client, customLabels, currency, accentColor } = invoice;

  const showDiscount = hasDiscount(invoice.discount);
  const showTax = hasTax(invoice.tax);
  const showShipping = hasShipping(invoice.shipping);
  const showAmountPaid = hasAmountPaid(invoice.amountPaid);
  const showPo = hasPoNumber(invoice.poNumber);

  const showBank = hasBankDetails(invoice.paymentDetails);
  const showNotes = hasNotes(invoice.notes);
  const showTerms = hasTerms(invoice.terms);
  const showPaymentSection = showBank || showNotes || showTerms;

  return (
    <Page size="A4" style={styles.page}>
      {/* Formal Top Double-Rule Header */}
      <View style={styles.topDoubleRule}>
        <View style={styles.headerRow}>
          <View style={styles.senderCol}>
            {sender.logoUrl ? (
              /* eslint-disable-next-line jsx-a11y/alt-text */
              <Image src={sender.logoUrl} style={styles.logo} />
            ) : null}
            <Text style={styles.senderName}>{sender.name || 'Business Name & Co.'}</Text>
            {sender.addressLine1?.trim() ? (
              <Text style={styles.subText}>{sender.addressLine1}</Text>
            ) : null}
            {sender.cityStateZip?.trim() ? (
              <Text style={styles.subText}>{sender.cityStateZip}</Text>
            ) : null}
            {sender.email?.trim() ? <Text style={styles.subText}>{sender.email}</Text> : null}
            {sender.phone?.trim() ? <Text style={styles.subText}>{sender.phone}</Text> : null}
            {sender.taxIdNumber?.trim() ? (
              <Text style={styles.taxId}>Tax ID: {sender.taxIdNumber}</Text>
            ) : null}
          </View>

          <View style={styles.metaCol}>
            <Text style={[styles.docTitle, { color: accentColor }]}>
              {customLabels.documentTitle || 'INVOICE'}
            </Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{customLabels.invoiceNumber}:</Text>
              <Text style={styles.metaValueMono}>{invoice.invoiceNumber}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{customLabels.issueDate}:</Text>
              <Text style={styles.metaValue}>{invoice.issueDate}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{customLabels.dueDate}:</Text>
              <Text style={styles.metaValue}>{invoice.dueDate}</Text>
            </View>

            {showPo ? (
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>PO #:</Text>
                <Text style={styles.metaValueMono}>{invoice.poNumber}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      {/* Bill To */}
      <View style={styles.partiesRow}>
        <View style={styles.partyCol}>
          <Text style={styles.sectionHeading}>{customLabels.toSection || 'BILLED TO'}</Text>
          <Text style={styles.clientName}>{client.name || 'Client Name'}</Text>
          {client.addressLine1?.trim() ? (
            <Text style={styles.subText}>{client.addressLine1}</Text>
          ) : null}
          {client.cityStateZip?.trim() ? (
            <Text style={styles.subText}>{client.cityStateZip}</Text>
          ) : null}
          {client.email?.trim() ? <Text style={styles.subText}>{client.email}</Text> : null}
          {client.phone?.trim() ? <Text style={styles.subText}>{client.phone}</Text> : null}
          {client.taxIdNumber?.trim() ? (
            <Text style={styles.taxId}>Tax ID: {client.taxIdNumber}</Text>
          ) : null}
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.colDesc]}>
            {customLabels.itemHeading || 'Description'}
          </Text>
          <Text style={[styles.tableHeaderCell, styles.colQty]}>
            {customLabels.qtyHeading || 'Qty'}
          </Text>
          <Text style={[styles.tableHeaderCell, styles.colRate]}>
            {customLabels.rateHeading || 'Rate'}
          </Text>
          <Text style={[styles.tableHeaderCell, styles.colAmount]}>
            {customLabels.amountHeading || 'Amount'}
          </Text>
        </View>

        {invoice.items.map((item) => (
          <View key={item.id} style={styles.tableRow} wrap={false}>
            <View style={styles.colDesc}>
              <Text style={styles.itemDesc}>{item.description || 'Item description'}</Text>
            </View>
            <Text style={[styles.subText, styles.colQty]}>{item.quantity}</Text>
            <Text style={[styles.subText, styles.colRate]}>
              {formatPdfMoney(item.unitPrice, currency)}
            </Text>
            <Text style={[styles.itemDesc, styles.colAmount]}>
              {formatPdfMoney(item.quantity * item.unitPrice, currency)}
            </Text>
          </View>
        ))}
      </View>

      {/* Totals Summary */}
      <View style={styles.totalsContainer} wrap={false}>
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{customLabels.subtotal}:</Text>
            <Text style={styles.totalVal}>{formatPdfMoney(calculations.subtotal, currency)}</Text>
          </View>

          {showDiscount ? (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                {customLabels.discount}
                {invoice.discount.type === 'percentage' ? ` (${invoice.discount.value}%)` : ''}:
              </Text>
              <Text style={styles.totalVal}>
                -{formatPdfMoney(calculations.discountAmount, currency)}
              </Text>
            </View>
          ) : null}

          {showTax ? (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                {invoice.tax.name || customLabels.tax} ({invoice.tax.rate}%):
              </Text>
              <Text style={styles.totalVal}>
                +{formatPdfMoney(calculations.taxAmount, currency)}
              </Text>
            </View>
          ) : null}

          {showShipping ? (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{customLabels.shipping}:</Text>
              <Text style={styles.totalVal}>
                +{formatPdfMoney(calculations.shippingAmount, currency)}
              </Text>
            </View>
          ) : null}

          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>{customLabels.total}:</Text>
            <Text style={[styles.grandTotalVal, { color: accentColor }]}>
              {formatPdfMoney(calculations.total, currency)}
            </Text>
          </View>

          {showAmountPaid ? (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{customLabels.amountPaid}:</Text>
              <Text style={styles.totalVal}>
                -{formatPdfMoney(calculations.amountPaid, currency)}
              </Text>
            </View>
          ) : null}

          {showAmountPaid ? (
            <View style={styles.balanceRow}>
              <Text style={styles.grandTotalLabel}>{customLabels.balanceDue}:</Text>
              <Text style={styles.grandTotalVal}>
                {formatPdfMoney(calculations.balanceDue, currency)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Payment Details, Notes & Terms (Strictly Conditional) */}
      {showPaymentSection ? (
        <View style={styles.bottomSection} wrap={false}>
          <View style={styles.splitCols}>
            {showBank ? (
              <View style={styles.infoBlock}>
                <Text style={styles.sectionHeading}>Payment Details</Text>
                <View style={styles.bankBox}>
                  {invoice.paymentDetails.bankName?.trim() ? (
                    <View style={styles.bankRow}>
                      <Text style={styles.bankLabel}>Bank:</Text>
                      <Text style={styles.bankVal}>{invoice.paymentDetails.bankName}</Text>
                    </View>
                  ) : null}
                  {invoice.paymentDetails.accountName?.trim() ? (
                    <View style={styles.bankRow}>
                      <Text style={styles.bankLabel}>Account Name:</Text>
                      <Text style={styles.bankVal}>{invoice.paymentDetails.accountName}</Text>
                    </View>
                  ) : null}
                  {invoice.paymentDetails.accountNumber?.trim() ? (
                    <View style={styles.bankRow}>
                      <Text style={styles.bankLabel}>Account No:</Text>
                      <Text style={styles.bankVal}>{invoice.paymentDetails.accountNumber}</Text>
                    </View>
                  ) : null}
                  {invoice.paymentDetails.routingOrSwift?.trim() ? (
                    <View style={styles.bankRow}>
                      <Text style={styles.bankLabel}>Routing / SWIFT:</Text>
                      <Text style={styles.bankVal}>{invoice.paymentDetails.routingOrSwift}</Text>
                    </View>
                  ) : null}
                  {invoice.paymentDetails.iban?.trim() ? (
                    <View style={styles.bankRow}>
                      <Text style={styles.bankLabel}>IBAN:</Text>
                      <Text style={styles.bankVal}>{invoice.paymentDetails.iban}</Text>
                    </View>
                  ) : null}
                  {invoice.paymentDetails.paymentLink?.trim() ? (
                    <View style={styles.bankRow}>
                      <Text style={styles.bankLabel}>Pay Link:</Text>
                      <Text style={styles.bankVal}>{invoice.paymentDetails.paymentLink}</Text>
                    </View>
                  ) : null}
                  {invoice.paymentDetails.customInstructions?.trim() ? (
                    <View style={styles.bankRow}>
                      <Text style={styles.bankLabel}>Instructions:</Text>
                      <Text style={styles.bankVal}>
                        {invoice.paymentDetails.customInstructions}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}

            {showNotes || showTerms ? (
              <View style={styles.infoBlock}>
                {showNotes ? (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.sectionHeading}>Notes</Text>
                    <Text style={styles.subText}>{invoice.notes}</Text>
                  </View>
                ) : null}
                {showTerms ? (
                  <View>
                    <Text style={styles.sectionHeading}>Terms & Conditions</Text>
                    <Text style={styles.subText}>{invoice.terms}</Text>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      ) : null}

      {/* Signature Section */}
      {invoice.hasSignature ? (
        <View style={styles.signatureContainer} wrap={false}>
          <Text style={styles.sectionHeading}>Authorization & Signing</Text>
          <View style={styles.signatureCols}>
            <View style={styles.signatureBox}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Authorized Signature</Text>
            </View>
            <View style={styles.signatureBox}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Date & Acknowledgment</Text>
            </View>
          </View>
        </View>
      ) : null}

      {/* Page Number & Footer */}
      <PdfPageFooter />
    </Page>
  );
};
