import React from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { CurrencyCode, formatPrice } from '../utils/whatsapp';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: CurrencyCode;
  onRemoveWishlist: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onRemoveWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FBF8F1] rounded-3xl border border-[#D8C7A6] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#082E23] text-[#FBF8F1] flex items-center justify-between border-b border-[#C59B43]/40">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#DFC079] fill-[#DFC079]" />
            <h2 className="font-serif-heritage text-lg font-bold">Saved Pieces ({products.length})</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 rounded-full hover:bg-[#124637] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-3">
          {products.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="font-serif-heritage text-lg font-bold text-[#082E23]">
                No Saved Pieces Yet
              </p>
              <p className="text-xs text-[#5E6962]">
                Tap the heart icon on any thobe, jubba, or attar to save it for later.
              </p>
            </div>
          ) : (
            products.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E4D8C2]"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-heritage text-sm font-bold text-[#082E23] truncate">
                    {p.name}
                  </h4>
                  <p className="text-xs text-[#6B746E]">{p.categoryLabel}</p>
                  <p className="text-sm font-bold text-[#0D4233] mt-1">
                    {formatPrice(p.priceInr, currency)}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B3B2E] text-[#FBF8F1] text-xs font-semibold cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#DFC079]" />
                    Select
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(p.id)}
                    className="text-[11px] text-[#7A827D] hover:text-red-700 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
