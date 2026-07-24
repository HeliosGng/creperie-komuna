import React from 'react';
import { Sparkles, Award, Smile } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { creperieAmbianceImg, savoryCrepeImg } from '../data/menuData';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang].aboutSection;

  return (
    <section id="about" className="py-20 bg-[#FAF7F2] text-[#5E3023] relative overflow-hidden border-t border-sep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photos Grid */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-[#E5D3C0] shadow-md h-56 sm:h-64 mask-oval">
                  <img
                    src={creperieAmbianceImg}
                    alt="Creperie Ambiance"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#E5D3C0] shadow-xs">
                  <Smile className="w-7 h-7 text-[#D4A373] mb-2" />
                  <h4 className="font-serif font-bold text-[#5E3023] text-lg">
                    {lang === 'sq' ? 'Mikpritje e Ngrohtë' : 'Warm & Friendly Welcome'}
                  </h4>
                  <p className="text-xs text-[#5E3023]/75 mt-1">
                    {lang === 'sq' ? 'Me buzëqeshje dhe gatime me dashuri' : 'Homemade care with the warmest smile'}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-white p-5 rounded-2xl border border-[#E5D3C0] shadow-xs">
                  <Award className="w-7 h-7 text-[#D4A373] mb-2" />
                  <h4 className="font-serif font-bold text-[#5E3023] text-lg">
                    100% Fresh Daily Batter
                  </h4>
                  <p className="text-xs text-[#5E3023]/75 mt-1">
                    {lang === 'sq' ? 'Brumë i pjekur në çast me përbërës bio' : 'Made fresh daily for authentic taste'}
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#E5D3C0] shadow-md h-56 sm:h-64 mask-oval">
                  <img
                    src={savoryCrepeImg}
                    alt="Fresh Savory Crepe"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5D3C0]/40 text-[#5E3023] text-xs font-bold uppercase tracking-[0.2em] border border-[#E5D3C0]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{lang === 'sq' ? 'Histori Dashurie & Shije' : 'Our Craft & Passion'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5E3023] tracking-tight leading-tight">
              {t.title}
            </h2>

            <p className="serif italic text-[#D4A373] text-lg leading-relaxed">
              {t.p1}
            </p>

            <p className="text-[#5E3023]/80 text-sm sm:text-base leading-relaxed">
              {t.p2}
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-sep">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#5E3023] block uppercase tracking-wider">
                  1. {t.feature1Title}
                </span>
                <p className="text-xs text-[#5E3023]/70">
                  {t.feature1Desc}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#5E3023] block uppercase tracking-wider">
                  2. {t.feature2Title}
                </span>
                <p className="text-xs text-[#5E3023]/70">
                  {t.feature2Desc}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#5E3023] block uppercase tracking-wider">
                  3. {t.feature3Title}
                </span>
                <p className="text-xs text-[#5E3023]/70">
                  {t.feature3Desc}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

