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
    ...pdfSharedStyles.page,
    paddingBottom: 48,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 20,
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
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  subText: {
    fontSize: 8.5,
    color: '#64748b',
    lineHeight: 1.35,
  },
  taxId: {
    fontSize: 8,
    color: '#94a3b8',
    fontFamily: 'Courier',
    marginTop: 2,
  },
  docTitle: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  metaCards: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  metaCard: {
    backgroundColor: '#f8fafc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  metaCardLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  metaCardValue: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    marginTop: 1,
  },
  billToSection: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    ...pdfSharedStyles.tableRowNoSplit,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 6,
    paddingHorizontal: 8,
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
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
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
    color: '#64748b',
  },
  totalVal: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    marginTop: 4,
    borderTopWidth: 1.5,
    borderTopColor: '#e2e8f0',
  },
  grandTotalLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  grandTotalVal: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  balanceCard: {
    marginTop: 6,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  balanceVal: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
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
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  signatureContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
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
    borderBottomColor: '#94a3b8',
    height: 30,
    marginBottom: 4,
  },
  signatureText: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
  },
});

export const PdfModernTemplate: React.FC<PdfTemplateProps> = ({ invoice, calculations }) => {
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
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.senderCol}>
          {sender.logoUrl ? (
            /* eslint-disable-next-line jsx-a11y/alt-text */
            <Image src={sender.logoUrl} style={styles.logo} />
          ) : null}
          <Text style={styles.senderName}>{sender.name || 'Your Brand or Studio'}</Text>
          {sender.email?.trim() ? <Text style={styles.subText}>{sender.email}</Text> : null}
          {sender.phone?.trim() ? <Text style={styles.subText}>{sender.phone}</Text> : null}
          {sender.addressLine1?.trim() ? (
            <Text style={styles.subText}>{sender.addressLine1}</Text>
          ) : null}
          {sender.cityStateZip?.trim() ? (
            <Text style={styles.subText}>{sender.cityStateZip}</Text>
          ) : null}
          {sender.taxIdNumber?.trim() ? (
            <Text style={styles.taxId}>Tax ID: {sender.taxIdNumber}</Text>
          ) : null}
        </View>

        <View style={styles.metaCol}>
          <Text style={[styles.docTitle, { color: accentColor }]}>
            {customLabels.documentTitle || 'INVOICE'}
          </Text>

          <View style={styles.metaCards}>
            <View style={styles.metaCard}>
              <Text style={styles.metaCardLabel}>{customLabels.invoiceNumber}</Text>
              <Text style={styles.metaCardValue}>{invoice.invoiceNumber}</Text>
            </View>
            <View style={styles.metaCard}>
              <Text style={styles.metaCardLabel}>{customLabels.dueDate}</Text>
              <Text style={styles.metaCardValue}>{invoice.dueDate}</Text>
            </View>
          </View>

          <View style={{ marginTop: 6, alignItems: 'flex-end' }}>
            <Text style={styles.subText}>
              {customLabels.issueDate}: {invoice.issueDate}
            </Text>
            {showPo ? (
              <Text style={styles.subText}>PO #: {invoice.poNumber}</Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* Bill To */}
      <View style={styles.billToSection}>
        <Text style={styles.sectionHeading}>{customLabels.toSection || 'BILLED TO'}</Text>
        <Text style={styles.clientName}>{client.name || 'Client Name'}</Text>
        {client.email?.trim() ? <Text style={styles.subText}>{client.email}</Text> : null}
        {client.phone?.trim() ? <Text style={styles.subText}>{client.phone}</Text> : null}
        {client.addressLine1?.trim() ? (
          <Text style={styles.subText}>{client.addressLine1}</Text>
        ) : null}
        {client.cityStateZip?.trim() ? (
          <Text style={styles.subText}>{client.cityStateZip}</Text>
        ) : null}
        {client.taxIdNumber?.trim() ? (
          <Text style={styles.taxId}>Tax ID: {client.taxIdNumber}</Text>
        ) : null}
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
            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>{customLabels.balanceDue}:</Text>
              <Text style={[styles.balanceVal, { color: accentColor }]}>
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
