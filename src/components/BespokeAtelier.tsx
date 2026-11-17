import React, { useState } from 'react';
import { Scissors, CheckCircle2 } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';
import { buildBespokeWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const BespokeAtelier: React.FC = () => {
  const [form, setForm] = useState({
    garmentType: 'Emirati Kandura (Custom Fit)',
    heightCm: '',
    chestIn: '',
    thobeLengthIn: '',
    sleeveIn: '',
    occasionDate: '',
    notes: '',
  });

  const whatsappUrl = buildBespokeWhatsAppUrl(form, STORE_CONFIG.whatsappNumber);

  return (
    <section id="atelier" className="py-16 sm:py-24 w-full overflow-x-clip bg-[#F3EBDC] border-y border-[#E0D2B8] bg-islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Atelier Visual & Heritage Story */}
          <div className="lg:col-span-6 space-y-6 min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#082E23] text-[#DFC079] text-xs font-semibold uppercase tracking-widest">
              <Scissors className="w-3.5 h-3.5" />
              <span>The Libasunnoor Bespoke Atelier</span>
            </div>

            <h2 className="font-serif-heritage text-3xl sm:text-4xl font-bold text-[#082E23] leading-tight">
              Custom-Stitched to Your Exact Posture &amp; Sunnah Length.
            </h2>

            <p className="text-sm sm:text-base text-[#3D4B43] leading-relaxed">
              Planning a Nikah groom ensemble, family Eid matching jubbas, or prefer custom collar
              and cuff proportions? Our master tailors cut every bespoke garment individually from
              imported Japanese Toyobo, Korean crepe, and pure European linen.
            </p>

            <div className="rounded-3xl overflow-hidden border-2 border-[#C59B43]/50 shadow-xl bg-[#082E23]">
              <img
                src="/images/craftsmanship-atelier.jpg"
                alt="Master tailor measuring ivory cotton and emerald fabric in the Libasunnoor Atelier"
                loading="lazy"
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#1E2F28]">
              {[
                'Complimentary Sunnah above-ankle hemming',
                'Groom & Groomsmen matching Nikah packages',
                'Father & Son coordinated Eid thobe sets',
                '5–7 day turnaround with WhatsApp fitting support',
              ].map((point) => (
                <div key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D4233] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Custom Measurement Request Card */}
          <div className="lg:col-span-6 min-w-0">
            <div className="bg-[#FBF8F1] rounded-3xl border border-[#D8C7A6] shadow-xl p-5 sm:p-8 space-y-5">
              <div className="border-b border-[#E4D8C2] pb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#9C782B]">
                  Direct Master Tailor Consultation
                </span>
                <h3 className="font-serif-heritage text-2xl font-bold text-[#082E23] mt-1">
                  Send Custom Measurements on WhatsApp
                </h3>
                <p className="text-xs text-[#59655E] mt-1">
                  Share what you know — our tailor will guide you step-by-step with fabric swatches
                  on WhatsApp video/chat.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F312B] mb-1.5">
                    Garment Silhouette
                  </label>
                  <select
                    value={form.garmentType}
                    onChange={(e) => setForm({ ...form, garmentType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-sm text-[#16221D] focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                  >
                    <option>Emirati Kandura (Custom Fit)</option>
                    <option>Saudi Collared Thobe</option>
                    <option>Moroccan Gold-Zari Jubba</option>
                    <option>Groom Nikah Thobe + Royal Bisht Set</option>
                    <option>Father &amp; Son Coordinated Eid Set</option>
                    <option>Linen-Cotton Kurta Pyjama Set</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      Height (cm or ft)
                    </label>
                    <input
                      type="text"
                      value={form.heightCm}
                      onChange={(e) => setForm({ ...form, heightCm: e.target.value })}
                      placeholder="e.g., 176 cm / 5'9&quot;"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      Chest (inches)
                    </label>
                    <input
                      type="text"
                      value={form.chestIn}
                      onChange={(e) => setForm({ ...form, chestIn: e.target.value })}
                      placeholder="e.g., 42 in"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      Length (in)
                    </label>
                    <input
                      type="text"
                      value={form.thobeLengthIn}
                      onChange={(e) => setForm({ ...form, thobeLengthIn: e.target.value })}
                      placeholder="e.g., 57 in"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      Sleeve (in)
                    </label>
                    <input
                      type="text"
                      value={form.sleeveIn}
                      onChange={(e) => setForm({ ...form, sleeveIn: e.target.value })}
                      placeholder="e.g., 24.5 in"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                      Occasion Date
                    </label>
                    <input
                      type="text"
                      value={form.occasionDate}
                      onChange={(e) => setForm({ ...form, occasionDate: e.target.value })}
                      placeholder="e.g., Next Jummah"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F312B] mb-1">
                    Fabric Shade / Embroidery Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="e.g., Pearl white Toyobo cotton, hidden snap buttons, Sunnah length above ankle..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C7A6] text-xs focus:outline-none focus:ring-2 focus:ring-[#0B3B2E]"
                  />
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0B3B2E] hover:bg-[#135340] text-[#FBF8F1] font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#DFC079] shrink-0" />
                  <span>Request Bespoke Quote on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
