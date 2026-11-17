import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Copy,
  Check,
  Truck,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { CartItem, STORE_CONFIG } from '../data/products';
import {
  CurrencyCode,
  CustomerCheckoutInfo,
  formatPrice,
  buildCartWhatsAppUrl,
} from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'bag' | 'checkout'>('bag');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const [customer, setCustomer] = useState<CustomerCheckoutInfo>({
    fullName: '',
    phone: '',
    cityAndAddress: '',
    pincode: '',
    deliveryPreference: 'Home Delivery (Courier)',
    paymentPreference: 'UPI / GPay on Confirmation',
    tailoringNotes: '',
  });

  if (!isOpen) return null;

  const subtotalInr = items.reduce((sum, item) => sum + item.product.priceInr * item.quantity, 0);
  const freeShippingRemaining = Math.max(0, STORE_CONFIG.freeShippingThresholdInr - subtotalInr);
  const shippingInr = subtotalInr === 0 || freeShippingRemaining === 0 ? 0 : 99;
  const totalInr = subtotalInr + shippingInr;

  const whatsappOrderUrl = buildCartWhatsAppUrl(
    items,
    customer,
    currency,
    STORE_CONFIG.whatsappNumber
  );

  const handleCopySummary = async () => {
    try {
      const decodedText = decodeURIComponent(whatsappOrderUrl.split('?text=')[1] || '');
      await navigator.clipboard.writeText(decodedText.replace(/\*/g, ''));
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs" onClick={onClose}>
      <aside
        className="w-full max-w-md bg-[#FBF8F1] h-full shadow-2xl border-l border-[#D8C7A6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#082E23] text-[#FBF8F1] flex items-center justify-between border-b border-[#C59B43]/40">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' ? (
              <button
                onClick={() => setStep('bag')}
                className="p-1.5 rounded-lg hover:bg-[#124637] text-[#DFC079] transition cursor-pointer"
                aria-label="Back to bag"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <ShoppingBag className="w-5 h-5 text-[#DFC079]" />
            )}
            <div>
              <h2 className="font-serif-heritage text-lg font-bold leading-tight">
                {step === 'bag' ? 'Your Libasunnoor Bag' : 'WhatsApp Order Details'}
              </h2>
              <p className="text-[11px] text-[#C8D6CF]">
                {items.reduce((s, i) => s + i.quantity, 0)} item(s) curated
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag"
            className="p-2 rounded-full hover:bg-[#124637] text-[#FBF8F1] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Banner */}
        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-[#F2E9D6] border-b border-[#E4D8C2] text-xs">
            {freeShippingRemaining > 0 ? (
              <div className="space-y-1.5">
                <p className="flex items-center gap-1.5 text-[#1F312B]">
                  <Truck className="w-3.5 h-3.5 text-[#0D4233]" />
                  <span>
                    Add <strong>{formatPrice(freeShippingRemaining, currency)}</strong> more for{' '}
                    <strong className="text-[#0D4233]">FREE Pan-India Shipping</strong>
                  </span>
                </p>
                <div className="h-1.5 w-full bg-[#DFD2BA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0B3B2E] transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotalInr / STORE_CONFIG.freeShippingThresholdInr) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <p className="flex items-center gap-1.5 text-[#0B3B2E] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#9C782B]" />
                <span>Alhamdulillah! Your order qualifies for Complimentary Express Shipping.</span>
              </p>
            )}
          </div>
        )}

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFE6D4] flex items-center justify-center text-[#0B3B2E]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-heritage text-xl font-bold text-[#082E23]">
                  Your Bag is Currently Empty
                </h3>
                <p className="text-xs text-[#5E6962] max-w-xs">
                  Explore our tailored Emirati thobes, emerald zari jubbas, kufi caps, and pure
                  Cambodi oud attar.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#0B3B2E] text-[#FBF8F1] text-xs font-semibold hover:bg-[#135240] transition cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : step === 'bag' ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex gap-3.5 p-3 rounded-2xl bg-white border border-[#E4D8C2] shadow-2xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 rounded-xl object-cover bg-[#EFE7D6] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-heritage text-sm font-bold text-[#082E23] leading-snug line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartKey)}
                          aria-label="Remove item"
                          className="text-[#8B928D] hover:text-red-700 p-0.5 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#5B665F] mt-0.5">
                        Size: <strong>{item.selectedSize}</strong> • {item.selectedColor}
                      </p>
                      {item.customNotes && (
                        <p className="text-[11px] text-[#9C782B] italic mt-0.5 truncate">
                          Note: {item.customNotes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center border border-[#DFD2BA] rounded-lg bg-[#FAF6EC]">
                        <button
                          onClick={() => onUpdateQuantity(item.cartKey, -1)}
                          className="p-1 text-[#082E23] hover:bg-[#EDE3CE] rounded-l-lg cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#082E23]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartKey, 1)}
                          className="p-1 text-[#082E23] hover:bg-[#EDE3CE] rounded-r-lg cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#082E23]">
                        {formatPrice(item.product.priceInr * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-xs text-[#7A827D] hover:text-red-700 underline cursor-pointer"
                >
                  Clear entire bag
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Customer Delivery Details Form for WhatsApp Message */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#EEF6F2] border border-[#BFDCD0] text-xs text-[#123D2F]">
                Fill in your delivery details below — we will format your complete itemized order
                into a ready-to-send WhatsApp message to our boutique concierge.
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="e.g., Mohammed Fazil"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      PIN / Postal Code
                    </label>
                    <input
                      type="text"
                      value={customer.pincode}
                      onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                      placeholder="e.g., 682016"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                    Delivery Address &amp; City
                  </label>
                  <textarea
                    rows={2}
                    value={customer.cityAndAddress}
                    onChange={(e) => setCustomer({ ...customer, cityAndAddress: e.target.value })}
                    placeholder="House/Flat name, Street, Landmark, City, State"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      Delivery Mode
                    </label>
                    <select
                      value={customer.deliveryPreference}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          deliveryPreference: e.target
                            .value as CustomerCheckoutInfo['deliveryPreference'],
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    >
                      <option value="Home Delivery (Courier)">Home Delivery (Courier)</option>
                      <option value="Express Dispatch">Express Nikah/Eid Dispatch</option>
                      <option value="Store Pickup (Kochi)">Boutique Pickup (Kochi)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      Preferred Payment
                    </label>
                    <select
                      value={customer.paymentPreference}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          paymentPreference: e.target
                            .value as CustomerCheckoutInfo['paymentPreference'],
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    >
                      <option value="UPI / GPay on Confirmation">UPI / GPay on Confirmation</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                    Custom Length / Gift Message (Optional)
                  </label>
                  <input
                    type="text"
                    value={customer.tailoringNotes}
                    onChange={(e) => setCustomer({ ...customer, tailoringNotes: e.target.value })}
                    placeholder="Any sleeve/length adjustment or Hadiyah gift wrap note..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Totals & CTA */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E4D8C2] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#546058]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalInr, currency)}</span>
              </div>
              <div className="flex justify-between text-[#546058]">
                <span>Shipping</span>
                <span className={shippingInr === 0 ? 'text-[#0D4233] font-semibold' : ''}>
                  {shippingInr === 0 ? 'FREE' : formatPrice(shippingInr, currency)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#082E23] pt-1.5 border-t border-[#EFE6D4]">
                <span>Estimated Total</span>
                <span>{formatPrice(totalInr, currency)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <div className="space-y-2">
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#0B3B2E] hover:bg-[#125240] text-[#FBF8F1] text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#DFC079]" />
                  <span>Proceed to WhatsApp Checkout</span>
                </button>
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#E8F8EE] hover:bg-[#D7F2E2] text-[#0E5C33] text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <span>Quick Send to WhatsApp Without Address</span>
                </a>
              </div>
            ) : (
              <div className="space-y-2">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-[#1DA851] hover:bg-[#179145] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Place Order via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full py-2 px-4 rounded-xl border border-[#D8C7A6] text-[#1F312B] hover:bg-[#F7F1E4] text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0D4233]" />
                      <span>Order Text Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Order Summary Text</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
