import { useState, useEffect, useMemo } from 'react';
import {
  SlidersHorizontal,
  Star,
  MessageCircle,
  ShoppingBag,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import {
  CATEGORIES,
  CategoryId,
  CartItem,
  PRODUCTS,
  Product,
  STORE_CONFIG,
  TESTIMONIALS,
} from './data/products';
import { CurrencyCode } from './utils/whatsapp';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { BespokeAtelier } from './components/BespokeAtelier';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';

const CART_STORAGE_KEY = 'libasunnoor_cart_v1';
const WISHLIST_STORAGE_KEY = 'libasunnoor_wishlist_v1';

export function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>(
    'featured'
  );
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore storage errors
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const handleAddToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: string,
    quantity: number,
    customNotes?: string
  ) => {
    const cleanNote = customNotes?.trim() || '';
    const cartKey = `${product.id}__${selectedSize}__${selectedColor}__${cleanNote}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          product,
          selectedSize,
          selectedColor,
          customNotes: cleanNote || undefined,
          quantity,
        },
      ];
    });

    showToast(`Added "${product.name}" (${selectedSize}) to your bag`);
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter((id) => id !== productId);
      }
      showToast('Saved to your favourites');
      return [...prev, productId];
    });
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.priceInr - b.priceInr);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.priceInr - a.priceInr);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const wishlistedProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#FBF8F1] text-[#16221D]">
      <Navbar
        cartCount={totalBagCount}
        wishlistCount={wishlistIds.length}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setCartOpen(true)}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 w-full max-w-full overflow-x-clip">
        {/* Hero Banner */}
        <Hero
          onExploreCollection={scrollToCollection}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
        />

        {/* Curated Category Visual Strip */}
        <section className="py-12 bg-[#F6EFE1] border-b border-[#E4D8C2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9C782B]">
                  Shop By Silhouette
                </p>
                <h2 className="font-serif-heritage text-2xl sm:text-3xl font-bold text-[#082E23]">
                  Heritage Wardrobe Essentials
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#536058]">
                Tailored for daily salah, Jummah congregations, Nikah ceremonies &amp; Eid ul-Fitr
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {[
                {
                  id: 'thobes' as CategoryId,
                  title: 'Emirati & Saudi Thobes',
                  count: '52" – 62" Lengths',
                  img: '/images/product-white-thobe.jpg',
                },
                {
                  id: 'jubbas' as CategoryId,
                  title: 'Gold Zari Jubbas',
                  count: 'Artisanal Embroidery',
                  img: '/images/product-emerald-jubba.jpg',
                },
                {
                  id: 'kurtas-bishts' as CategoryId,
                  title: 'Kurtas & Royal Bishts',
                  count: 'Nikah & Festive',
                  img: '/images/product-bisht-cloak.jpg',
                },
                {
                  id: 'caps' as CategoryId,
                  title: 'Omani Kumas & Kufis',
                  count: 'Handcrafted Stitch',
                  img: '/images/product-kufi-caps.jpg',
                },
                {
                  id: 'attar-prayer' as CategoryId,
                  title: 'Pure Oud & Sajjadas',
                  count: 'Alcohol-Free Oils',
                  img: '/images/product-attar-oud.jpg',
                },
              ].map((tile) => {
                const isSelected = activeCategory === tile.id;
                return (
                  <button
                    key={tile.id}
                    onClick={() => {
                      setActiveCategory(tile.id);
                      scrollToCollection();
                    }}
                    className={`group relative rounded-2xl overflow-hidden text-left h-44 sm:h-52 border-2 transition cursor-pointer ${
                      isSelected
                        ? 'border-[#082E23] ring-2 ring-[#C59B43]'
                        : 'border-[#DFD2BA] hover:border-[#C59B43]'
                    }`}
                  >
                    <img
                      src={tile.img}
                      alt={tile.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062119]/90 via-[#062119]/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-[#FBF8F1]">
                      <p className="text-[10px] uppercase tracking-wider text-[#DFC079]">
                        {tile.count}
                      </p>
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-serif-heritage text-sm sm:text-base font-bold leading-snug">
                          {tile.title}
                        </p>
                        <ArrowUpRight className="w-4 h-4 text-[#DFC079] shrink-0 opacity-80 group-hover:opacity-100" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main E-Commerce Product Catalog */}
        <section id="collection" className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Section Title & Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E4D8C2]">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9C782B]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Libasunnoor Signature Catalog</span>
                </div>
                <h2 className="font-serif-heritage text-3xl sm:text-4xl font-bold text-[#082E23]">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.label || 'All Collections'}
                </h2>
                <p className="text-sm text-[#57645C]">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.subtitle} • Select your size and
                  checkout seamlessly on WhatsApp.
                </p>
              </div>

              {/* Sort & Filter Pills */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-[#F3EBDC] border border-[#D8C7A6] rounded-xl px-3.5 py-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#0B3B2E]" />
                  <span className="text-xs font-semibold text-[#47544C]">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating'
                      )
                    }
                    className="bg-transparent text-xs font-bold text-[#082E23] focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured Heritage</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Horizontal Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 -mx-1 px-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#082E23] text-[#DFC079] border-[#082E23] shadow-xs'
                      : 'bg-white text-[#23322B] border-[#DFD2BA] hover:border-[#082E23]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E4D8C2] space-y-3">
                <p className="font-serif-heritage text-2xl font-bold text-[#082E23]">
                  No matching garments found
                </p>
                <p className="text-sm text-[#5D6962]">
                  Try clearing your search filter or browsing all heritage categories.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#0B3B2E] text-[#FBF8F1] text-xs font-semibold cursor-pointer"
                >
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onOpenModal={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* How Seamless WhatsApp Ordering Works */}
        <section id="how-to-order" className="py-16 bg-[#082E23] text-[#FBF8F1] bg-emerald-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#DFC079]">
                Personalised Concierge Commerce
              </span>
              <h2 className="font-serif-heritage text-3xl sm:text-4xl font-bold">
                Order via WhatsApp in 3 Simple Steps
              </h2>
              <p className="text-sm text-[#C6D4CD]">
                No passwords or lengthy sign-ups. Enjoy personal size verification and real-time
                dispatch updates directly on WhatsApp.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Curate Your Garments & Lengths',
                  desc: 'Select your preferred thobe length (52"–62"), kurta size, kufi circumference, or oud tola bottle and add items to your Libasunnoor Bag.',
                },
                {
                  step: '02',
                  title: 'Send Pre-Formatted WhatsApp Bag',
                  desc: 'Tap "Place Order via WhatsApp" — your itemized bag, total price, delivery address, and any hem notes open automatically in WhatsApp.',
                },
                {
                  step: '03',
                  title: 'Personal Confirmation & Fast Dispatch',
                  desc: 'Our stylist confirms stock & fit within minutes, shares a secure UPI / COD confirmation, and dispatches with live courier tracking.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 sm:p-7 rounded-3xl bg-[#0D3D2F]/85 border border-[#C59B43]/35 space-y-3"
                >
                  <span className="inline-block font-serif-heritage text-2xl font-bold text-[#DFC079] px-3.5 py-1 rounded-xl bg-[#07261D] border border-[#C59B43]/30">
                    {item.step}
                  </span>
                  <h3 className="font-serif-heritage text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#C8D6CF] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bespoke Tailoring & Custom Measurements */}
        <BespokeAtelier />

        {/* Patron Testimonials */}
        <section className="py-16 sm:py-20 bg-[#FBF8F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9C782B]">
                Words From Our Patrons
              </span>
              <h2 className="font-serif-heritage text-3xl sm:text-4xl font-bold text-[#082E23]">
                Worn on Jummahs, Nikahs &amp; Blessed Occasions
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="p-6 rounded-3xl bg-white border border-[#E4D8C2] shadow-xs flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 fill-[#C59B43] text-[#C59B43]"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F3EBDC] text-[#0D4233]">
                        {t.occasion}
                      </span>
                    </div>
                    <p className="text-sm text-[#35433C] leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EFE7D6]">
                    <p className="font-serif-heritage font-bold text-sm text-[#082E23]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#6E7771]">{t.location} • Verified WhatsApp Order</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer
        onSelectCategory={setActiveCategory}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Floating Sticky Bar / WhatsApp Concierge Button */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5">
        {totalBagCount > 0 && !cartOpen && (
          <button
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#082E23] text-[#FBF8F1] border border-[#C59B43] shadow-xl text-xs font-semibold hover:bg-[#0F4233] transition cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#DFC079]" />
            <span>Checkout Bag ({totalBagCount})</span>
          </button>
        )}

        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            'Assalamu Alaikum Libasunnoor! I have a question regarding your collection.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#1DA851] hover:bg-[#169144] text-white shadow-xl text-xs font-semibold transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#082E23] text-[#FBF8F1] border border-[#C59B43]/60 shadow-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#DFC079] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        products={wishlistedProducts}
        currency={currency}
        onRemoveWishlist={handleToggleWishlist}
        onSelectProduct={setSelectedProduct}
      />
    </div>
  );
}

export default App;
