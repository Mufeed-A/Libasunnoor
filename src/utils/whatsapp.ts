import { CartItem, Product, STORE_CONFIG } from '../data/products';

export type CurrencyCode = 'INR' | 'AED' | 'SAR';

const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rateFromInr: number; decimals: number }> = {
  INR: { symbol: '₹', rateFromInr: 1, decimals: 0 },
  AED: { symbol: 'AED ', rateFromInr: 0.044, decimals: 0 },
  SAR: { symbol: 'SAR ', rateFromInr: 0.045, decimals: 0 },
};

export function formatPrice(amountInr: number, currency: CurrencyCode = 'INR'): string {
  const cfg = CURRENCY_RATES[currency];
  const converted = amountInr * cfg.rateFromInr;
  if (currency === 'INR') {
    return `₹${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${cfg.symbol}${Math.round(converted).toLocaleString('en-US')}`;
}

export interface CustomerCheckoutInfo {
  fullName: string;
  phone: string;
  cityAndAddress: string;
  pincode: string;
  deliveryPreference: 'Home Delivery (Courier)' | 'Express Dispatch' | 'Store Pickup (Kochi)';
  paymentPreference: 'UPI / GPay on Confirmation' | 'Cash on Delivery' | 'Bank Transfer';
  tailoringNotes: string;
}

export function buildCartWhatsAppUrl(
  items: CartItem[],
  customer: CustomerCheckoutInfo,
  currency: CurrencyCode,
  whatsappNumber: string = STORE_CONFIG.whatsappNumber
): string {
  const subtotalInr = items.reduce((sum, item) => sum + item.product.priceInr * item.quantity, 0);
  const shippingInr = subtotalInr >= STORE_CONFIG.freeShippingThresholdInr || subtotalInr === 0 ? 0 : 99;
  const totalInr = subtotalInr + shippingInr;

  const lines: string[] = [
    `Assalamu Alaikum *${STORE_CONFIG.brandName}*!`,
    `I would like to place an order from your website:`,
    ``,
    `*Order Items:*`,
  ];

  items.forEach((item, index) => {
    const lineTotal = formatPrice(item.product.priceInr * item.quantity, currency);
    lines.push(
      `${index + 1}. *${item.product.name}* (${item.product.sku})`,
      `   • Size/Option: ${item.selectedSize} | Shade: ${item.selectedColor}`,
      `   • Qty: ${item.quantity} × ${formatPrice(item.product.priceInr, currency)} = *${lineTotal}*`
    );
    if (item.customNotes?.trim()) {
      lines.push(`   • Item Note: ${item.customNotes.trim()}`);
    }
  });

  lines.push(
    ``,
    `*Order Summary:*`,
    `• Subtotal: ${formatPrice(subtotalInr, currency)}`,
    `• Shipping: ${shippingInr === 0 ? 'FREE' : formatPrice(shippingInr, currency)}`,
    `• *Estimated Total: ${formatPrice(totalInr, currency)}*`
  );

  lines.push(``, `*Customer & Delivery Details:*`);
  if (customer.fullName.trim()) lines.push(`• Name: ${customer.fullName.trim()}`);
  if (customer.phone.trim()) lines.push(`• Phone: ${customer.phone.trim()}`);
  if (customer.cityAndAddress.trim()) lines.push(`• Address: ${customer.cityAndAddress.trim()}`);
  if (customer.pincode.trim()) lines.push(`• PIN / Postal Code: ${customer.pincode.trim()}`);
  lines.push(`• Delivery Mode: ${customer.deliveryPreference}`);
  lines.push(`• Preferred Payment: ${customer.paymentPreference}`);
  if (customer.tailoringNotes.trim()) {
    lines.push(`• Custom Length / Gift Note: ${customer.tailoringNotes.trim()}`);
  }

  lines.push(``, `Please confirm availability and share payment/dispatch details. JazakAllahu Khairan!`);

  const cleanDigits = whatsappNumber.replace(/\D/g, '') || STORE_CONFIG.whatsappNumber;
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildSingleProductWhatsAppUrl(
  product: Product,
  selectedSize: string,
  selectedColor: string,
  quantity: number,
  currency: CurrencyCode,
  customNotes?: string,
  whatsappNumber: string = STORE_CONFIG.whatsappNumber
): string {
  const total = formatPrice(product.priceInr * quantity, currency);
  const lines = [
    `Assalamu Alaikum *${STORE_CONFIG.brandName}*!`,
    `I would like to order this item directly:`,
    ``,
    `• *Product:* ${product.name} (${product.sku})`,
    `• *Size / Option:* ${selectedSize}`,
    `• *Shade:* ${selectedColor}`,
    `• *Quantity:* ${quantity}`,
    `• *Total:* ${total}`,
  ];
  if (customNotes?.trim()) {
    lines.push(`• *Tailoring / Note:* ${customNotes.trim()}`);
  }
  lines.push(``, `Please let me know availability and delivery timeline!`);

  const cleanDigits = whatsappNumber.replace(/\D/g, '') || STORE_CONFIG.whatsappNumber;
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildBespokeWhatsAppUrl(
  measurementDetails: {
    garmentType: string;
    heightCm: string;
    chestIn: string;
    thobeLengthIn: string;
    sleeveIn: string;
    occasionDate: string;
    notes: string;
  },
  whatsappNumber: string = STORE_CONFIG.whatsappNumber
): string {
  const lines = [
    `Assalamu Alaikum *${STORE_CONFIG.brandName} Atelier*!`,
    `I would like to request *Custom Tailoring / Bespoke Stitching*:`,
    ``,
    `• *Garment Style:* ${measurementDetails.garmentType}`,
    `• *Height:* ${measurementDetails.heightCm || 'To discuss'}`,
    `• *Chest:* ${measurementDetails.chestIn || 'To discuss'}`,
    `• *Preferred Length:* ${measurementDetails.thobeLengthIn || 'Standard'}`,
    `• *Sleeve Length:* ${measurementDetails.sleeveIn || 'Standard'}`,
    `• *Occasion / Target Date:* ${measurementDetails.occasionDate || 'Flexible'}`,
  ];
  if (measurementDetails.notes.trim()) {
    lines.push(`• *Additional Preferences:* ${measurementDetails.notes.trim()}`);
  }
  lines.push(``, `Please guide me on fabric options and stitching timeline.`);
  const cleanDigits = whatsappNumber.replace(/\D/g, '') || STORE_CONFIG.whatsappNumber;
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
}
