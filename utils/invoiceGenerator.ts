import jsPDF from 'jspdf';

export interface InvoiceData {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  customerName?: string;
  date: string;
  currency: string;
}

export const generateInvoice = (invoiceData: InvoiceData) => {
  const doc = new jsPDF();

  // Set up colors and fonts
  const primaryColor = [139, 69, 19]; // Saddle brown
  const secondaryColor = [101, 67, 33]; // Dark brown

  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ARTISAN COFFEE', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Premium Coffee Experience', 105, 30, { align: 'center' });

  // Invoice title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 105, 55, { align: 'center' });

  // Order details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Order ID: ${invoiceData.orderId}`, 20, 75);
  doc.text(`Date: ${invoiceData.date}`, 20, 85);
  if (invoiceData.customerName) {
    doc.text(`Customer: ${invoiceData.customerName}`, 20, 95);
  }

  // Items table header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, 110, 170, 10, 'F');

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('Item', 25, 117);
  doc.text('Qty', 120, 117);
  doc.text('Price', 140, 117);
  doc.text('Total', 165, 117);

  // Items
  let yPosition = 130;
  doc.setFont('helvetica', 'normal');

  invoiceData.items.forEach((item) => {
    doc.text(item.name, 25, yPosition);
    doc.text(item.quantity.toString(), 125, yPosition);
    doc.text(`${invoiceData.currency}${item.price.toFixed(2)}`, 140, yPosition);
    doc.text(`${invoiceData.currency}${item.total.toFixed(2)}`, 165, yPosition);
    yPosition += 10;
  });

  // Totals
  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(`Subtotal: ${invoiceData.currency}${invoiceData.subtotal.toFixed(2)}`, 140, yPosition);
  yPosition += 10;
  doc.text(`Tax: ${invoiceData.currency}${invoiceData.tax.toFixed(2)}`, 140, yPosition);
  yPosition += 10;

  // Total with background
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(130, yPosition - 5, 60, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(`TOTAL: ${invoiceData.currency}${invoiceData.total.toFixed(2)}`, 135, yPosition + 2);

  // Footer
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for choosing Artisan Coffee!', 105, 270, { align: 'center' });
  doc.text('Experience excellence in every cup', 105, 280, { align: 'center' });

  return doc;
};

export const downloadInvoice = (invoiceData: InvoiceData) => {
  const doc = generateInvoice(invoiceData);
  doc.save(`invoice-${invoiceData.orderId}.pdf`);
};