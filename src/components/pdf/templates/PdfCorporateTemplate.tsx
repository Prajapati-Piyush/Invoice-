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
    paddingTop: 0,
    paddingBottom: 48,
  },
  accentBar: {
    height: 6,
    width: '100%',
    marginBottom: 30,
  },
  contentWrapper: {
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 20,
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
    maxWidth: 130,
    maxHeight: 50,
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
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  invoiceBadge: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceBadgeText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#334155',
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
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  metaValueMono: {
    fontSize: 8.5,
    fontFamily: 'Courier-Bold',
    color: '#1e293b',
  },
  partiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  partyCol: {
    width: '48%',
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
    backgroundColor: '#1e293b',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    ...pdfSharedStyles.tableRowNoSplit,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 5,
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
    width: 230,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
    borderTopColor: '#cbd5e1',
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
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
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
    backgroundColor: '#ffffff',
    padding: 8,
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

export const PdfCorporateTemplate: React.FC<PdfTemplateProps> = ({ invoice, calculations }) => {
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
      {/* Top Accent Strip */}
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      <View style={styles.contentWrapper}>
        {/* Header Block */}
        <View style={styles.headerRow}>
          <View style={styles.senderCol}>
            {sender.logoUrl ? (
              /* eslint-disable-next-line jsx-a11y/alt-text */
              <Image src={sender.logoUrl} style={styles.logo} />
            ) : null}
            <Text style={styles.senderName}>{sender.name || 'Company Name Inc.'}</Text>
            {sender.taxIdNumber?.trim() ? (
              <Text style={styles.taxId}>Tax ID / EIN: {sender.taxIdNumber}</Text>
            ) : null}
            {sender.addressLine1?.trim() ? (
              <Text style={styles.subText}>{sender.addressLine1}</Text>
            ) : null}
            {sender.cityStateZip?.trim() ? (
              <Text style={styles.subText}>{sender.cityStateZip}</Text>
            ) : null}
            {sender.email?.trim() ? <Text style={styles.subText}>{sender.email}</Text> : null}
            {sender.phone?.trim() ? <Text style={styles.subText}>{sender.phone}</Text> : null}
          </View>

          <View style={styles.metaCol}>
            <Text style={[styles.docTitle, { color: accentColor }]}>
              {customLabels.documentTitle || 'INVOICE'}
            </Text>

            <View style={styles.invoiceBadge}>
              <Text style={styles.invoiceBadgeText}>
                {customLabels.invoiceNumber}: {invoice.invoiceNumber}
              </Text>
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

        {/* Bill To & Bill From Cards */}
        <View style={styles.partiesRow}>
          <View style={styles.partyCol}>
            <Text style={styles.sectionHeading}>{customLabels.toSection || 'BILLED TO'}</Text>
            <Text style={styles.clientName}>{client.name || 'Client Company'}</Text>
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

          {invoice.items.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.tableRow,
                idx % 2 === 1 ? { backgroundColor: '#f8fafc' } : {},
              ]}
              wrap={false}
            >
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
      </View>

      {/* Page Number & Footer */}
      <PdfPageFooter />
    </Page>
  );
};
