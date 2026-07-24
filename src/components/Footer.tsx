import React from 'react';
import { Utensils, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { businessInfo } from '../data/menuData';

interface FooterProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSeatMe: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  onOpenSeatMe,
  onNavigate,
}) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;

  return (
    <footer className="bg-[#5E3023] text-[#FAF7F2] border-t border-[#D4A373]/30 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#FAF7F2]/10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#D4A373] flex items-center justify-center text-[#5E3023] shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Creperie <span className="serif italic text-[#D4A373] text-lg font-normal">(Komuna)</span>
              </span>
            </div>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[11px] font-bold">
                🟢 {lang === 'sq' ? 'Hapur deri në 12:30 AM' : 'Open until 12:30 AM'}
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs font-semibold uppercase tracking-wider">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#D4A373] transition-colors"
                >
                  {navT.menu}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSeatMe}
                  className="hover:text-[#D4A373] transition-colors"
                >
                  {navT.reserve} ("Seat Me")
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#D4A373] transition-colors"
                >
                  {navT.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-[#D4A373] transition-colors"
                >
                  {navT.location}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D4A373] transition-colors"
                >
                  {navT.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">
              {lang === 'sq' ? 'Kontakt & Orari' : 'Contact & Hours'}
            </h4>
            <div className="space-y-2 text-xs text-[#FAF7F2]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span>{businessInfo.address[lang]}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {businessInfo.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>{businessInfo.hours[lang]}</span>
              </p>
            </div>
          </div>

          {/* Experience & Online Delivery */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">
              {lang === 'sq' ? 'Porosit & Rezervo' : 'Order & Reserve'}
            </h4>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
              {lang === 'sq'
                ? 'Porositni krepat tuaja në Wolt ose rezervoni një tryezë me shërbimin tonë "Seat Me".'
                : 'Order your crepes via Wolt or reserve a cozy table with our "Seat Me" service.'}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={businessInfo.woltUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#00c2e8] hover:bg-[#00a8ca] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Wolt Order</span>
              </a>
              <button
                onClick={onOpenSeatMe}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#D4A373] hover:bg-white hover:text-[#5E3023] text-[#5E3023] font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
              >
                <span>{navT.seatMe}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D4A373]">
          <p>© {new Date().getFullYear()} Creperie (Komuna). {t.rights}</p>
          
          <div className="flex items-center gap-2">
            <span>Language:</span>
            <button
              onClick={() => onLanguageChange('sq')}
              className={`px-2.5 py-0.5 rounded font-bold transition-colors ${
                lang === 'sq' ? 'bg-[#D4A373] text-[#5E3023]' : 'bg-[#FAF7F2]/10 text-[#FAF7F2]'
              }`}
            >
              SQ
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-0.5 rounded font-bold transition-colors ${
                lang === 'en' ? 'bg-[#D4A373] text-[#5E3023]' : 'bg-[#FAF7F2]/10 text-[#FAF7F2]'
              }`}
            >
              EN
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

