import React from 'react';
import { ArrowRight, Ruler, ShieldCheck, MessageCircle, Award, Truck } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenSizeGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenSizeGuide }) => {
  return (
    <section id="top" className="relative overflow-hidden bg-emerald-pattern text-[#FBF8F1]">
      {/* Decorative Gold Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C59B43] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Left Editorial Copy */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F4636]/90 border border-[#C59B43]/40 text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[#DFC079]">
              <span className="w-2 h-2 rounded-full bg-[#DFC079] animate-pulse shrink-0" />
              <span className="truncate">Jummah, Nikah &amp; Eid 2026 Collection</span>
            </div>

            <div className="space-y-3">
              <p className="text-[#DFC079] font-serif-heritage italic text-lg sm:text-xl">
                لباس النور — Garments Woven with Dignity &amp; Light
              </p>
              <h1 className="font-serif-heritage text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.12] tracking-tight text-[#FBF8F1]">
                Regal Heritage Attire for the{' '}
                <span className="text-[#DFC079]">Modern Believer.</span>
              </h1>
            </div>

            <p className="text-[#D8E2DC] text-base sm:text-lg leading-relaxed max-w-xl">
              Discover finely tailored Emirati &amp; Saudi thobes, gold-embroidered Moroccan jubbas,
              ceremonial bishts, handcrafted Omani kufis, and pure alcohol-free Cambodi oud —
              delivered to your doorstep via effortless WhatsApp concierge ordering.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2.5 bg-[#DFC079] hover:bg-[#E9CE8E] text-[#082E23] font-semibold px-7 py-4 rounded-full shadow-lg shadow-black/20 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSizeGuide}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#DFC079]/50 text-[#FBF8F1] hover:bg-[#0F4636] font-medium transition cursor-pointer"
              >
                <Ruler className="w-4 h-4 text-[#DFC079]" />
                <span>Find My Thobe Size</span>
              </button>
            </div>

            {/* Direct WhatsApp Concierge Note */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm text-[#C8D6CF]">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>
                Select your size, add to bag, and place your complete order on{' '}
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    'Assalamu Alaikum Libasunnoor! I would like to browse your latest thobes and jubbas.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DFC079] underline underline-offset-4 hover:text-white font-medium"
                >
                  WhatsApp in one tap
                </a>
                .
              </span>
            </div>
          </div>

          {/* Right Archway Framed Campaign Image */}
          <div className="lg:col-span-6 relative min-w-0">
            <div className="relative mx-auto max-w-xl px-1 sm:px-0">
              {/* Subtle Gold Offset Arch Frame */}
              <div className="hidden sm:block absolute -inset-2.5 rounded-t-[140px] rounded-b-3xl border border-[#C59B43]/40 pointer-events-none" />

              <div className="relative rounded-t-[132px] rounded-b-2xl overflow-hidden shadow-2xl border-2 border-[#C59B43]/60 bg-[#13382C]">
                <img
                  src="/images/hero-banner.jpg"
                  alt="Distinguished gentleman wearing Libasunnoor Ivory Thobe and Emerald Gold Zari Bisht beneath sunlit sandstone arches"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062119]/85 via-transparent to-transparent" />

                {/* Floating Featured Look Card inside Hero */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-[#082E23]/90 backdrop-blur-md border border-[#C59B43]/45 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#DFC079]">
                      Featured Ceremonial Ensemble
                    </p>
                    <p className="font-serif-heritage text-base sm:text-lg font-semibold text-[#FBF8F1]">
                      Al-Noor Kandura &amp; Royal Emerald Zari Bisht
                    </p>
                  </div>
                  <button
                    onClick={onExploreCollection}
                    className="shrink-0 text-xs font-semibold bg-[#DFC079] text-[#082E23] px-3.5 py-2 rounded-lg hover:bg-[#EAD093] transition cursor-pointer"
                  >
                    Shop Look
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage Value Strip */}
      <div className="border-t border-[#C59B43]/25 bg-[#06231B]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-xs sm:text-sm text-[#E5DEC9]">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#DFC079] shrink-0" />
            <div>
              <p className="font-semibold text-white">Japanese &amp; Korean Fabrics</p>
              <p className="text-xs text-[#B7C7BF]">Breathable, cool-touch &amp; anti-crease</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-[#DFC079] shrink-0" />
            <div>
              <p className="font-semibold text-white">Lengths 52&quot; to 62&quot; + Custom</p>
              <p className="text-xs text-[#B7C7BF]">Precision Gulf &amp; Indian sizing</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-[#DFC079] shrink-0" />
            <div>
              <p className="font-semibold text-white">Instant WhatsApp Checkout</p>
              <p className="text-xs text-[#B7C7BF]">Personal verification before dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#DFC079] shrink-0" />
            <div>
              <p className="font-semibold text-white">2–5 Day Tracked Delivery</p>
              <p className="text-xs text-[#B7C7BF]">Easy size exchange guarantee</p>
            </div>
          </div>
        </div>
      </div>
      <ShieldCheck className="hidden" />
    </section>
  );
};
