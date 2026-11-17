import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram } from 'lucide-react';
import { CategoryId, CATEGORIES, STORE_CONFIG } from '../data/products';

interface FooterProps {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenSizeGuide }) => {
  const handleJump = (cat: CategoryId) => {
    onSelectCategory(cat);
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full overflow-x-clip bg-[#06231B] text-[#E3DDD0] border-t border-[#C59B43]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B3B2E] border border-[#C59B43]/60 flex items-center justify-center">
                <span className="font-serif-heritage font-bold text-[#DFC079] text-lg">L</span>
              </div>
              <div>
                <p className="font-serif-heritage text-xl font-bold text-[#FBF8F1]">LIBASUNNOOR</p>
                <p className="text-xs text-[#DFC079]">لباس النور • Garments of Light</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#B9C6BF]">
              Dedicated to dignified Islamic menswear. From crisp Emirati kanduras and embroidered
              jubbas to royal Nikah bishts and alcohol-free Cambodi oud, every piece honours
              Sunnah modesty and enduring heritage craftsmanship.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Assalamu Alaikum Libasunnoor!'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1DA851] hover:bg-[#179145] text-white text-xs font-semibold transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
              <a
                href="#collection"
                aria-label="Instagram"
                className="p-2 rounded-full border border-[#C59B43]/40 text-[#DFC079] hover:bg-[#0D3D2F] transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-serif-heritage text-base font-bold text-[#DFC079] mb-4">
              Curated Collections
            </h3>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => handleJump(c.id)}
                    className="text-[#C8D4CE] hover:text-[#DFC079] transition cursor-pointer"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h3 className="font-serif-heritage text-base font-bold text-[#DFC079] mb-4">
              Client Services
            </h3>
            <ul className="space-y-2.5 text-xs text-[#C8D4CE]">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#DFC079] transition cursor-pointer"
                >
                  Thobe &amp; Jubba Size Calculator
                </button>
              </li>
              <li>
                <a href="#atelier" className="hover:text-[#DFC079] transition">
                  Bespoke Nikah &amp; Eid Tailoring
                </a>
              </li>
              <li>
                <a href="#how-to-order" className="hover:text-[#DFC079] transition">
                  How WhatsApp Ordering Works
                </a>
              </li>
              <li>
                <span>7-Day Easy Size Exchange Policy</span>
              </li>
              <li>
                <span>Pan-India &amp; GCC Express Courier</span>
              </li>
            </ul>
          </div>

          {/* Flagship Boutique Contact */}
          <div>
            <h3 className="font-serif-heritage text-base font-bold text-[#DFC079] mb-4">
              Boutique &amp; Atelier
            </h3>
            <ul className="space-y-3 text-xs text-[#C8D4CE]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFC079] shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFC079] shrink-0" />
                <span>{STORE_CONFIG.displayPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DFC079] shrink-0" />
                <span>{STORE_CONFIG.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#DFC079] shrink-0 mt-0.5" />
                <span>
                  Sat – Thu: 10:00 AM – 9:30 PM
                  <br />
                  Friday: 2:30 PM – 10:00 PM (Post-Jummah)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#C59B43]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#95A89F]">
          <p>© {new Date().getFullYear()} Libasunnoor Heritage Menswear. All rights reserved.</p>
          <p>Crafted with ihsan • Effortless WhatsApp Boutique Experience</p>
        </div>
      </div>
    </footer>
  );
};
