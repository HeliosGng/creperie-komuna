import React from 'react';
import { Calendar, ExternalLink, MapPin, Star, Clock, Utensils, Heart, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { businessInfo, heroCrepeImg, creperieAmbianceImg } from '../data/menuData';

interface HeroSectionProps {
  lang: Language;
  onOpenSeatMe: () => void;
  onNavigateMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenSeatMe,
  onNavigateMenu,
}) => {
  const t = translations[lang].hero;

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#FAF7F2]">
      {/* Soft background ambient grain */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Oval Visual Showcase Frame (Artistic Flair signature) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-md h-[420px] sm:h-[480px] bg-[#E5D3C0] mask-oval flex items-center justify-center overflow-hidden relative shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroCrepeImg})` }}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Floating Reserved Card */}
            <div className="absolute -bottom-6 right-2 sm:right-6 bg-white/95 backdrop-blur-md p-5 shadow-2xl rounded-2xl w-64 border border-[#FAF7F2] z-20">
              <h3 className="serif italic text-lg font-serif font-bold text-[#5E3023] mb-1">
                {lang === 'sq' ? 'Rezervoni Tavolinën?' : 'Reserved for you?'}
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-[#D4A373] font-semibold mb-3">
                {lang === 'sq' ? 'Përjetoni shijen e Tiranës' : 'Experience authentic Tirana flavors'}
              </p>
              <button
                onClick={onOpenSeatMe}
                className="w-full bg-[#5E3023] text-white py-2.5 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-[#D4A373] transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{t.seatMe || 'Seat Me'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Text & Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2 pl-0 lg:pl-6">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A373] bg-[#E5D3C0]/40 px-3 py-1 rounded-full border border-[#D4A373]/30 inline-flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#5E3023] fill-[#5E3023]" />
                {t.badge}
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t.dineIn} · {t.takeout} · {t.delivery}
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#5E3023] tracking-tight leading-[1.12]">
                {t.title}
              </h1>
              <p className="serif italic text-lg sm:text-xl text-[#D4A373] mt-2 font-medium">
                Komuna e Parisit • Tirana, Albania
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#5E3023]/80 font-normal leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>

            {/* Info Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#5E3023]">
              <div className="flex items-center gap-1.5 bg-[#E5D3C0]/30 px-3 py-1.5 rounded-lg border border-[#E5D3C0]">
                <Star className="w-4 h-4 text-[#D4A373] fill-[#D4A373]" />
                <span className="font-bold">{businessInfo.rating} ★</span>
                <span className="text-[#5E3023]/70">({businessInfo.reviewCount} {lang === 'sq' ? 'vlerësime' : 'reviews'})</span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#E5D3C0]/30 px-3 py-1.5 rounded-lg border border-[#E5D3C0]">
                <MapPin className="w-4 h-4 text-[#D4A373]" />
                <span>{t.addressShort}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#E5D3C0]/30 px-3 py-1.5 rounded-lg border border-[#E5D3C0]">
                <Clock className="w-4 h-4 text-[#D4A373]" />
                <span>{businessInfo.hours[lang]}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={onNavigateMenu}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#5E3023] hover:bg-[#D4A373] text-white font-bold text-xs tracking-widest uppercase shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Utensils className="w-4 h-4 text-[#D4A373]" />
                <span>{t.viewMenu}</span>
              </button>

              <button
                onClick={onOpenSeatMe}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white hover:bg-[#E5D3C0]/50 text-[#5E3023] font-bold text-xs tracking-widest uppercase border border-[#5E3023]/20 flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#D4A373]" />
                <span>{t.reserveTable}</span>
              </button>

              <a
                href={businessInfo.woltUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#00c2e8] hover:bg-[#00a8ca] text-white font-bold text-xs tracking-widest uppercase shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{lang === 'sq' ? 'Porosit në Wolt' : 'Order on Wolt'}</span>
              </a>
            </div>

            {/* Testimonial Quote */}
            <div className="pt-4 border-t border-sep max-w-xl">
              <blockquote className="serif italic text-xs sm:text-sm text-[#5E3023]/80">
                &ldquo;{lang === 'sq' ? 'Krepat më të mira në Tiranë me shërbimin më të ngrohtë e mikpritës!' : 'The best homemade crepes in Tirana with the warmest and friendliest service!'}&rdquo;
              </blockquote>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#D4A373] mt-1">
                — Local Guide (5★)
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#D4A373] text-[10px] uppercase tracking-widest font-bold">
        <button
          onClick={onNavigateMenu}
          className="animate-bounce hover:text-[#5E3023] transition-colors cursor-pointer flex flex-col items-center"
        >
          <span>{lang === 'sq' ? 'Zbrisni për menunë' : 'Scroll for menu'}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

