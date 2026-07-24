import React from 'react';
import { Utensils, Calendar, MapPin, Star, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { businessInfo } from '../data/menuData';

interface MobileBottomNavProps {
  lang: Language;
  onOpenSeatMe: () => void;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  lang,
  onOpenSeatMe,
  onNavigate,
}) => {
  const t = translations[lang].nav;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#5E3023]/95 backdrop-blur-xl border-t border-[#D4A373]/30 px-2 py-2 shadow-2xl">
      <div className="grid grid-cols-5 gap-0.5 text-center">
        {/* Menu */}
        <button
          onClick={() => onNavigate('menu')}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#FAF7F2] hover:bg-white/10 transition-colors"
        >
          <Utensils className="w-4 h-4 text-[#D4A373] mb-0.5" />
          <span className="text-[9px] font-bold uppercase tracking-wider truncate">{t.menu}</span>
        </button>

        {/* Seat Me */}
        <button
          onClick={onOpenSeatMe}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#D4A373] text-white shadow-md transition-transform active:scale-95"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-bold uppercase tracking-wider truncate">{t.seatMe}</span>
        </button>

        {/* Wolt Order */}
        <a
          href={businessInfo.woltUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#00c2e8] text-white shadow-md transition-transform active:scale-95"
        >
          <ExternalLink className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-bold uppercase tracking-wider truncate">Wolt</span>
        </a>

        {/* Map */}
        <button
          onClick={() => onNavigate('location')}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#FAF7F2] hover:bg-white/10 transition-colors"
        >
          <MapPin className="w-4 h-4 text-[#D4A373] mb-0.5" />
          <span className="text-[9px] font-bold uppercase tracking-wider truncate">{t.location}</span>
        </button>

        {/* Reviews */}
        <button
          onClick={() => onNavigate('reviews')}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[#FAF7F2] hover:bg-white/10 transition-colors"
        >
          <Star className="w-4 h-4 text-[#D4A373] mb-0.5" />
          <span className="text-[9px] font-bold uppercase tracking-wider truncate">{t.reviews}</span>
        </button>
      </div>
    </div>
  );
};

