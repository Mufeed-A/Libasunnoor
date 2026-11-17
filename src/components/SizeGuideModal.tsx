import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';
import { THOBE_SIZE_CHART, STORE_CONFIG } from '../data/products';
import { WhatsAppIcon } from './WhatsAppIcon';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [heightCm, setHeightCm] = useState<number>(173);
  const [buildType, setBuildType] = useState<'slim' | 'regular' | 'broad'>('regular');

  if (!isOpen) return null;

  const computeRecommendedSize = (): string => {
    let base = 56;
    if (heightCm <= 163) base = 52;
    else if (heightCm <= 169) base = 54;
    else if (heightCm <= 175) base = 56;
    else if (heightCm <= 181) base = 58;
    else if (heightCm <= 187) base = 60;
    else base = 62;

    if (buildType === 'broad' && base < 62) {
      return `${base} (or ${base + 2} for relaxed chest room with hem trim)`;
    }
    return `${base}`;
  };

  const recommended = computeRecommendedSize();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FBF8F1] rounded-3xl border border-[#D8C7A6] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#082E23] text-[#FBF8F1] flex items-center justify-between border-b border-[#C59B43]/40">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#DFC079]" />
            <div>
              <h2 className="font-serif-heritage text-xl font-bold">
                Thobe &amp; Jubba Size Calculator
              </h2>
              <p className="text-xs text-[#C8D6CF]">
                Gulf length sizing measured from shoulder to ankle bone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-2 rounded-full hover:bg-[#124637] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Interactive Calculator */}
          <div className="p-5 rounded-2xl bg-[#F3EBDC] border border-[#DFD1B5] space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#082E23]">
              <Sparkles className="w-4 h-4 text-[#9C782B]" />
              <span>Instant Height-to-Thobe Length Finder</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#1F312B] mb-1.5">
                  <span>Your Height</span>
                  <span className="text-[#0B3B2E] font-bold">
                    {heightCm} cm ({Math.floor(heightCm / 30.48)}&apos;
                    {Math.round((heightCm % 30.48) / 2.54)}&quot;)
                  </span>
                </div>
                <input
                  type="range"
                  min={155}
                  max={196}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-[#0B3B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6D756F] mt-1">
                  <span>155 cm (5&apos;1&quot;)</span>
                  <span>175 cm (5&apos;9&quot;)</span>
                  <span>196 cm (6&apos;5&quot;)</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#1F312B] mb-1.5">
                  Frame / Build
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['slim', 'regular', 'broad'] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBuildType(b)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize border transition cursor-pointer ${
                        buildType === b
                          ? 'bg-[#0B3B2E] text-[#FBF8F1] border-[#0B3B2E]'
                          : 'bg-white text-[#1F312B] border-[#D8C7A6]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#082E23] text-[#FBF8F1] flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#DFC079]">
                  Recommended Thobe / Jubba Length
                </p>
                <p className="font-serif-heritage text-lg font-bold">Size {recommended}</p>
              </div>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `Assalamu Alaikum Libasunnoor! My height is ${heightCm} cm (${buildType} build). Could you confirm if Size ${recommended} is ideal for me?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#DFC079] text-[#082E23] text-xs font-semibold hover:bg-[#EAD093] transition"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Verify with Tailor</span>
              </a>
            </div>
          </div>

          {/* Standard Reference Table */}
          <div>
            <h3 className="font-serif-heritage text-base font-bold text-[#082E23] mb-2.5">
              Standard Thobe &amp; Jubba Reference Chart
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#E4D8C2]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B3B2E] text-[#DFC079] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Height (ft/in)</th>
                    <th className="py-3 px-4">Height (cm)</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Garment Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4D8C2] bg-white">
                  {THOBE_SIZE_CHART.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FAF5E9]">
                      <td className="py-2.5 px-4 font-bold text-[#082E23]">{row.size}</td>
                      <td className="py-2.5 px-4 text-[#34423B]">{row.heightFt}</td>
                      <td className="py-2.5 px-4 text-[#34423B]">{row.heightCm}</td>
                      <td className="py-2.5 px-4 text-[#34423B]">{row.chestIn}</td>
                      <td className="py-2.5 px-4 font-medium text-[#0D4233]">{row.lengthIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-[#5F6A63] mt-2.5">
              Tip: Prefer your thobe slightly above the ankle (Sunnah length)? Simply choose one
              size shorter or mention &ldquo;Sunnah ankle hem&rdquo; in your WhatsApp order note for
              complimentary alteration before dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
