import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye, Check } from 'lucide-react';
import { Product, STORE_CONFIG } from '../data/products';
import { CurrencyCode, formatPrice, buildSingleProductWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenModal,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[Math.min(2, product.sizes.length - 1)] || product.sizes[0]
  );
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].name);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const directWhatsAppHref = buildSingleProductWhatsAppUrl(
    product,
    selectedSize,
    selectedColor,
    1,
    currency,
    undefined,
    STORE_CONFIG.whatsappNumber
  );

  return (
    <article className="group bg-white rounded-2xl border border-[#E4D8C2] hover:border-[#C59B43] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Portrait Image */}
      <div
        onClick={() => onOpenModal(product)}
        className="relative aspect-[4/5] overflow-hidden bg-[#F2EBDD] cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#082E23]/92 text-[#DFC079] border border-[#C59B43]/40 shadow-xs">
              {product.badge}
            </span>
          )}
          {product.originalPriceInr && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DFC079] text-[#082E23] w-fit">
              Save{' '}
              {Math.round(
                ((product.originalPriceInr - product.priceInr) / product.originalPriceInr) * 100
              )}
              %
            </span>
          )}
        </div>

        {/* Wishlist & Quick View Floating Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label="Save to wishlist"
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-xs cursor-pointer ${
              isWishlisted
                ? 'bg-[#082E23] text-[#DFC079]'
                : 'bg-white/90 text-[#1A2621] hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            aria-label="Quick view details"
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1A2621] flex items-center justify-center backdrop-blur-md transition shadow-xs cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6B746E]">
            <span className="uppercase tracking-wider font-medium text-[#0D4233]">
              {product.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-[#1A2621]">
              <Star className="w-3.5 h-3.5 fill-[#C59B43] text-[#C59B43]" />
              {product.rating.toFixed(1)}
              <span className="text-[#7D857E]">({product.reviewsCount})</span>
            </span>
          </div>

          <div onClick={() => onOpenModal(product)} className="cursor-pointer">
            <h3 className="font-serif-heritage text-lg font-bold text-[#0F241D] group-hover:text-[#0D4233] leading-snug transition">
              {product.name}
            </h3>
            <p className="text-xs text-[#9C782B] font-medium mt-0.5">{product.arabicSubtitle}</p>
          </div>

          <p className="text-xs text-[#546058] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Size & Color Quick Selector */}
        <div className="space-y-3 pt-1">
          {/* Color Swatches if multiple */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#6B746E] font-medium">Shade:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={`w-5 h-5 rounded-full border transition cursor-pointer ${
                      selectedColor === c.name
                        ? 'ring-2 ring-[#0B3B2E] ring-offset-1 border-[#0B3B2E]'
                        : 'border-[#CFC3AC]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#414D46] truncate">{selectedColor}</span>
            </div>
          )}

          {/* Compact Size Pills */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5B645E]">
                {product.sizeType === 'thobe-length'
                  ? 'Length (in)'
                  : product.sizeType === 'volume'
                  ? 'Bottle Size'
                  : 'Select Size'}
              </span>
              <button
                type="button"
                onClick={() => onOpenModal(product)}
                className="text-[11px] text-[#0D4233] underline hover:text-[#9C782B] cursor-pointer"
              >
                Details
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.slice(0, 5).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-[#0B3B2E] text-[#FBF8F1] border-[#0B3B2E]'
                      : 'bg-[#FAF6EC] text-[#22312B] border-[#DFD2BA] hover:border-[#0B3B2E]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Action Buttons */}
          <div className="pt-2 border-t border-[#EFE6D5] space-y-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#082E23]">
                {formatPrice(product.priceInr, currency)}
              </span>
              {product.originalPriceInr && (
                <span className="text-xs text-[#878F89] line-through">
                  {formatPrice(product.originalPriceInr, currency)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2">
              <button
                type="button"
                onClick={handleQuickAdd}
                className={`col-span-3 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  justAdded
                    ? 'bg-[#15694F] text-white'
                    : 'bg-[#0B3B2E] hover:bg-[#125240] text-[#FBF8F1]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#DFC079]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#DFC079]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <a
                href={directWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                title="Instant Order on WhatsApp"
                className="col-span-2 inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl text-xs font-semibold bg-[#E8F8EE] hover:bg-[#D5F3E0] text-[#0F5C33] border border-[#A8E0BE] transition"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#1DA851] shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
