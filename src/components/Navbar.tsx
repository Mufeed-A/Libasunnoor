import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Ruler,
  Heart,
  Menu,
  X,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { CategoryId, CATEGORIES, STORE_CONFIG } from '../data/products';
import { CurrencyCode } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onOpenCart: () => void;
  onOpenSizeGuide: () => void;
  onOpenWishlist: () => void;
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenSizeGuide,
  onOpenWishlist,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavCategory = (cat: CategoryId) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      {/* Top Heritage Announcement Bar */}
      <div className="bg-[#07261D] text-[#EFE6D2] border-b border-[#C59B43]/30 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#DFC079] shrink-0" />
            <span>
              Complimentary Pan-India Shipping on orders above ₹2,499 • Express Nikah &amp; Jummah Dispatch
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={onOpenSizeGuide}
              className="inline-flex items-center gap-1.5 text-[#DFC079] hover:text-white transition cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Thobe Length Finder</span>
            </button>
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Assalamu Alaikum Libasunnoor! I need help choosing a size/style.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#DFC079] transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#DFC079]" />
              <span>WhatsApp Stylist: {STORE_CONFIG.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#FBF8F1]/95 backdrop-blur-md border-b border-[#E4D8C2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#0B3B2E] hover:bg-[#EFE6D4] transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Crest & Wordmark */}
            <a
              href="#top"
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0B3B2E] border border-[#C59B43]/60 flex items-center justify-center shadow-sm group-hover:bg-[#0F4D3C] transition">
                <svg className="w-7 h-7" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 4L29.5 9.5H37.5V17.5L43 23L37.5 28.5V36.5H29.5L24 42L18.5 36.5H10.5V28.5L5 23L10.5 17.5V9.5H18.5L24 4Z"
                    stroke="#DFC079"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M19.5 16V30H29.5"
                    stroke="#FBF8F1"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="28" cy="18.5" r="2.2" fill="#DFC079" />
                </svg>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-heritage text-xl sm:text-2xl font-bold tracking-tight text-[#082E23]">
                    LIBASUNNOOR
                  </span>
                  <span className="hidden sm:inline text-sm text-[#9B7424] font-medium">
                    لباس النور
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#5B645D]">
                  Heritage Thobes &amp; Attire
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1F312B]">
              <button
                onClick={() => handleNavCategory('all')}
                className={`py-1 border-b-2 transition cursor-pointer ${
                  activeCategory === 'all'
                    ? 'border-[#0B3B2E] text-[#0B3B2E] font-semibold'
                    : 'border-transparent hover:text-[#0B3B2E]'
                }`}
              >
                Shop All
              </button>
              <button
                onClick={() => handleNavCategory('thobes')}
                className={`py-1 border-b-2 transition cursor-pointer ${
                  activeCategory === 'thobes'
                    ? 'border-[#0B3B2E] text-[#0B3B2E] font-semibold'
                    : 'border-transparent hover:text-[#0B3B2E]'
                }`}
              >
                Thobes
              </button>
              <button
                onClick={() => handleNavCategory('jubbas')}
                className={`py-1 border-b-2 transition cursor-pointer ${
                  activeCategory === 'jubbas'
                    ? 'border-[#0B3B2E] text-[#0B3B2E] font-semibold'
                    : 'border-transparent hover:text-[#0B3B2E]'
                }`}
              >
                Jubbas
              </button>
              <button
                onClick={() => handleNavCategory('kurtas-bishts')}
                className={`py-1 border-b-2 transition cursor-pointer ${
                  activeCategory === 'kurtas-bishts'
                    ? 'border-[#0B3B2E] text-[#0B3B2E] font-semibold'
                    : 'border-transparent hover:text-[#0B3B2E]'
                }`}
              >
                Kurtas &amp; Bishts
              </button>
              <button
                onClick={() => handleNavCategory('attar-prayer')}
                className={`py-1 border-b-2 transition cursor-pointer ${
                  activeCategory === 'attar-prayer'
                    ? 'border-[#0B3B2E] text-[#0B3B2E] font-semibold'
                    : 'border-transparent hover:text-[#0B3B2E]'
                }`}
              >
                Attar &amp; Prayer
              </button>
              <a
                href="#atelier"
                className="py-1 border-b-2 border-transparent hover:text-[#0B3B2E] transition"
              >
                Bespoke Atelier
              </a>
            </nav>

            {/* Right Utility Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Currency Selector */}
              <select
                aria-label="Select Currency"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="hidden sm:block text-xs font-semibold bg-[#F3EBDC] text-[#0B3B2E] border border-[#D8C7A6] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0B3B2E] cursor-pointer"
              >
                <option value="INR">INR (₹)</option>
                <option value="AED">AED</option>
                <option value="SAR">SAR</option>
              </select>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-full text-[#0B3B2E] hover:bg-[#EFE6D4] transition cursor-pointer"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2.5 rounded-full text-[#0B3B2E] hover:bg-[#EFE6D4] transition cursor-pointer"
                aria-label="Saved items"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C59B43] text-[#082E23] text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 bg-[#0B3B2E] hover:bg-[#125240] text-[#FBF8F1] px-3.5 sm:px-4 py-2.5 rounded-full text-sm font-medium shadow-sm transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#DFC079]" />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-[#DFC079] text-[#082E23] text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Expandable Search Bar */}
          {searchOpen && (
            <div className="pb-4 pt-1 animate-fadeIn">
              <div className="relative max-w-xl mx-auto">
                <Search className="w-4 h-4 text-[#6D756F] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    const el = document.getElementById('collection');
                    if (el && e.target.value.length === 1) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  placeholder="Search Emirati thobes, emerald jubbas, Cambodi oud, kufi caps..."
                  className="w-full pl-11 pr-10 py-2.5 bg-white border border-[#D8C7A6] rounded-full text-sm text-[#16221D] placeholder:text-[#7D857E] focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#6D756F] hover:text-[#0B3B2E]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E4D8C2] bg-[#FBF8F1] px-4 py-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4D8C2]">
              <span className="text-xs uppercase tracking-wider text-[#6D756F] font-semibold">
                Browse Categories
              </span>
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="text-xs font-semibold bg-[#F3EBDC] text-[#0B3B2E] border border-[#D8C7A6] rounded-lg px-2.5 py-1"
              >
                <option value="INR">INR (₹)</option>
                <option value="AED">AED</option>
                <option value="SAR">SAR</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavCategory(cat.id)}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    activeCategory === cat.id
                      ? 'bg-[#0B3B2E] text-[#FBF8F1]'
                      : 'text-[#1A2621] hover:bg-[#F3EBDC]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-xs opacity-75">{cat.subtitle.split(' ')[0]}</span>
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-[#E4D8C2] flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSizeGuide();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#0B3B2E] text-[#0B3B2E] text-xs font-semibold"
              >
                <Ruler className="w-4 h-4" />
                Size &amp; Length Finder
              </button>
              <a
                href="#atelier"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#F3EBDC] text-[#0B3B2E] text-xs font-semibold"
              >
                Bespoke Tailoring
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
