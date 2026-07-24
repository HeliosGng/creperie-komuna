import React, { useState, useEffect } from 'react';
import { Utensils, Calendar, Star, ExternalLink, Menu as MenuIcon, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { businessInfo } from '../data/menuData';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  onOpenSeatMe: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenSeatMe,
  onNavigate,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'menu', label: t.menu },
    { id: 'reserve', label: t.reserve },
    { id: 'reviews', label: t.reviews },
    { id: 'location', label: t.location },
    { id: 'about', label: t.about },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'reserve') {
      onOpenSeatMe();
    } else {
      onNavigate(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#5E3023]/10'
          : 'bg-gradient-to-b from-[#5E3023]/60 via-[#5E3023]/20 to-transparent py-4 text-[#5E3023]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#5E3023] flex items-center justify-center text-white shadow-md group-hover:bg-[#D4A373] transition-colors">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span
                className={`font-serif text-xl sm:text-2xl font-bold tracking-tight block leading-none ${
                  isScrolled ? 'text-[#5E3023]' : 'text-white sm:text-[#5E3023] lg:text-white'
                }`}
              >
                Creperie <span className="text-[#D4A373] font-sans font-medium text-sm sm:text-base">• Komuna</span>
              </span>
              <span
                className={`text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase block mt-0.5 ${
                  isScrolled ? 'text-[#D4A373]' : 'text-[#E5D3C0]'
                }`}
              >
                Tirana · Fresh & Artisanal
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#E5D3C0]/40 backdrop-blur-md p-1.5 rounded-full border border-[#5E3023]/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#5E3023] text-white shadow-xs'
                      : isScrolled
                      ? 'text-[#5E3023] hover:text-[#D4A373] hover:bg-white/50'
                      : 'text-white sm:text-[#5E3023] lg:text-white hover:text-[#D4A373] hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher & Actions */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#5E3023] p-1 rounded-full px-2 space-x-1 shadow-xs">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  lang === 'en'
                    ? 'bg-white text-[#5E3023]'
                    : 'text-white hover:text-[#D4A373]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('sq')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  lang === 'sq'
                    ? 'bg-white text-[#5E3023]'
                    : 'text-white hover:text-[#D4A373]'
                }`}
              >
                SQ
              </button>
            </div>

            {/* Seat Me Button */}
            <button
              onClick={onOpenSeatMe}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#5E3023] hover:bg-[#D4A373] text-white shadow-md transition-all hover:scale-102"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{t.seatMe}</span>
            </button>

            {/* Wolt Order Button */}
            <a
              href={businessInfo.woltUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#00c2e8] hover:bg-[#00a8ca] text-white shadow-md transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.orderWolt}</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full lg:hidden ${
                isScrolled
                  ? 'text-[#5E3023] bg-[#E5D3C0]/50 hover:bg-[#E5D3C0]'
                  : 'text-white bg-[#5E3023]/60 hover:bg-[#5E3023]'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#5E3023]/15 text-[#5E3023] px-4 pt-4 pb-6 mt-3 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#5E3023]/10">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#D4A373] fill-[#D4A373]" />
              <span className="text-xs font-semibold text-[#5E3023]">
                4.4 ★ (30 reviews)
              </span>
            </div>
            <span className="text-xs text-emerald-800 font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300">
              {t.openUntil}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#E5D3C0]/30 hover:bg-[#E5D3C0] text-[#5E3023] flex items-center justify-between border border-[#E5D3C0]"
              >
                <span>{item.label}</span>
                <span className="text-[#D4A373] text-xs">→</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSeatMe();
              }}
              className="w-full py-3 px-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#5E3023] hover:bg-[#D4A373] text-white flex items-center justify-center gap-1.5 shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#D4A373]" />
              <span>{t.seatMe}</span>
            </button>
            <a
              href={businessInfo.woltUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#00c2e8] hover:bg-[#00a8ca] text-white flex items-center justify-center gap-1.5 shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.orderWolt}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

