import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Check,
  ShoppingBag,
  MessageCircle,
  Ruler,
  Sparkles,
  ShieldCheck,
  Minus,
  Plus,
} from 'lucide-react';
import { Product, STORE_CONFIG } from '../data/products';
import { CurrencyCode, formatPrice, buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  currency: CurrencyCode;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    customNotes?: string
  ) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState('');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[Math.min(2, product.sizes.length - 1)] || product.sizes[0]);
      setSelectedColor(product.colors[0].name);
      setQuantity(1);
      setCustomNotes('');
      setAddedFeedback(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity, customNotes);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1600);
  };

  const whatsappDirectUrl = buildSingleProductWhatsAppUrl(
    product,
    selectedSize,
    selectedColor,
    quantity,
    currency,
    customNotes,
    STORE_CONFIG.whatsappNumber
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FBF8F1] rounded-3xl border border-[#D8C7A6] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#082E23] shadow-md flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Column */}
        <div className="md:w-1/2 bg-[#EFE7D6] relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 sm:h-96 md:h-full object-cover object-center"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#082E23] text-[#DFC079] border border-[#C59B43]/50">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right Specification & Ordering Column */}
        <div className="md:w-1/2 p-5 sm:p-8 overflow-y-auto space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-widest font-semibold text-[#0D4233]">
                {product.categoryLabel} • {product.sku}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#1A2621]">
                <Star className="w-4 h-4 fill-[#C59B43] text-[#C59B43]" />
                {product.rating.toFixed(1)} ({product.reviewsCount} reviews)
              </span>
            </div>

            <h2 className="font-serif-heritage text-2xl sm:text-3xl font-bold text-[#082E23]">
              {product.name}
            </h2>
            <p className="text-sm text-[#9C782B] font-medium">{product.arabicSubtitle}</p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-3 border-b border-[#E4D8C2]">
            <span className="text-2xl sm:text-3xl font-bold text-[#082E23]">
              {formatPrice(product.priceInr, currency)}
            </span>
            {product.originalPriceInr && (
              <>
                <span className="text-sm text-[#848C86] line-through">
                  {formatPrice(product.originalPriceInr, currency)}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EFE2C4] text-[#7D5B14]">
                  Save {formatPrice(product.originalPriceInr - product.priceInr, currency)}
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-[#3E4B44] leading-relaxed">{product.description}</p>

          {/* Shade Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#49564F]">
              Shade: <span className="text-[#082E23]">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                    selectedColor === color.name
                      ? 'border-[#082E23] bg-[#082E23] text-[#FBF8F1]'
                      : 'border-[#D8C7A6] bg-white text-[#1A2621] hover:border-[#082E23]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#49564F]">
                {product.sizeType === 'thobe-length'
                  ? 'Select Thobe Length (Inches)'
                  : 'Select Size / Option'}
              </label>
              {product.sizeType === 'thobe-length' && (
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D4233] underline hover:text-[#9C782B] cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  Height-to-Length Chart
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#0B3B2E] text-[#FBF8F1] border-[#0B3B2E] shadow-xs'
                      : 'bg-white text-[#1F2E28] border-[#D8C7A6] hover:border-[#0B3B2E]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Custom Tailoring / Gift Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#49564F]">
              Optional Sleeve / Hem Alteration or Gift Note
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g., Shorten hem by 1 inch, or include Eid Hadiyah card..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs text-[#1A2621] placeholder:text-[#8A928C] focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
            />
          </div>

          {/* Quantity + Primary Buttons */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-[#D8C7A6] bg-white rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-[#082E23] hover:bg-[#F3EBDC] rounded-l-xl cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-[#082E23]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-[#082E23] hover:bg-[#F3EBDC] rounded-r-xl cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0B3B2E] hover:bg-[#135441] text-[#FBF8F1] text-sm font-semibold shadow-sm transition cursor-pointer"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-[#DFC079]" />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#DFC079]" />
                    <span>
                      Add to Bag • {formatPrice(product.priceInr * quantity, currency)}
                    </span>
                  </>
                )}
              </button>
            </div>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#1DA851] hover:bg-[#189346] text-white text-sm font-semibold shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order Directly on WhatsApp Now</span>
            </a>
          </div>

          {/* Fabric & Highlights Accordion Card */}
          <div className="bg-[#F4ECDD] rounded-2xl p-4 space-y-2.5 border border-[#E4D8C2] text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#082E23]">
              <Sparkles className="w-4 h-4 text-[#9C782B]" />
              <span>Craftsmanship &amp; Fabric Specifications</span>
            </div>
            <p className="text-[#3C4942]">
              <strong className="text-[#082E23]">Fabric:</strong> {product.fabric}
            </p>
            <p className="text-[#3C4942]">
              <strong className="text-[#082E23]">Cut &amp; Fit:</strong> {product.fit}
            </p>
            <ul className="space-y-1 pt-1">
              {product.highlights.map((hl) => (
                <li key={hl} className="flex items-start gap-2 text-[#3C4942]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D4233] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
