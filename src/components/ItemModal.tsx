import React from 'react';
import { X, Sparkles, ExternalLink } from 'lucide-react';
import { MenuItem, Language } from '../types';
import { translations } from '../data/translations';
import { businessInfo } from '../data/menuData';

interface ItemModalProps {
  item: MenuItem | null;
  lang: Language;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  lang,
  onClose,
}) => {
  if (!item) return null;

  const t = translations[lang].itemModal;
  const curr = translations[lang].menuSection.currency;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl shadow-2xl overflow-hidden border border-[#E5D3C0] max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors shadow-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clean Header Banner without Photo */}
        <div className="bg-[#5E3023] text-white p-6 sm:p-8 relative">
          <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
            {item.popular && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4A373] text-white text-[10px] font-bold uppercase tracking-wider">
                ★ {translations[lang].menuSection.popular}
              </span>
            )}
            {item.isChefSpecial && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#E5D3C0] text-[#5E3023] text-[10px] font-bold uppercase tracking-wider">
                ✨ {translations[lang].menuSection.chefSpecial}
              </span>
            )}
            {item.isVegetarian && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider">
                🌱 {translations[lang].menuSection.vegetarian}
              </span>
            )}
          </div>

          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {item.name}
            </h2>
            <div className="shrink-0 bg-[#D4A373] text-[#5E3023] px-3.5 py-1 rounded-full font-serif font-bold text-lg shadow-sm">
              {item.price} {curr}
            </div>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-[#5E3023]">
          {/* Description */}
          {item.description[lang] && (
            <div className="border-b border-[#5E3023]/15 pb-4">
              <p className="text-[#5E3023]/90 text-sm font-medium leading-relaxed">
                {item.description[lang]}
              </p>
            </div>
          )}

          {/* Ingredients List */}
          {item.ingredients && item.ingredients[lang].length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A373] mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{t.ingredientsTitle}</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients[lang].map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-[#E5D3C0]/40 border border-[#E5D3C0] text-[#5E3023] text-xs font-semibold"
                  >
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#E5D3C0]/30 border-t border-[#5E3023]/15 flex items-center justify-between gap-3 shrink-0">
          <a
            href={businessInfo.woltUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-[#00c2e8] hover:bg-[#00a8ca] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{lang === 'sq' ? 'Porosit në Wolt' : 'Order on Wolt'}</span>
          </a>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-[#5E3023] hover:bg-[#D4A373] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            {lang === 'sq' ? 'Mbyll' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

