import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Compass } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { businessInfo } from '../data/menuData';

interface DirectionsMapProps {
  lang: Language;
}

export const DirectionsMap: React.FC<DirectionsMapProps> = ({ lang }) => {
  const t = translations[lang].directions;

  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    businessInfo.address[lang]
  )}`;
  const appleMapsUrl = `http://maps.apple.com/?daddr=${encodeURIComponent(
    businessInfo.address[lang]
  )}`;
  const wazeUrl = `https://waze.com/ul?ll=41.318,19.805&navigate=yes`;

  return (
    <section id="location" className="py-20 bg-[#FAF7F2] text-[#5E3023] relative overflow-hidden border-t border-sep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5D3C0]/40 text-[#5E3023] text-xs font-bold uppercase tracking-[0.2em] border border-[#E5D3C0]">
            <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Tirana 1060 • Komuna e Parisit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5E3023] tracking-tight">
            {t.title}
          </h2>
          <p className="serif italic text-[#D4A373] text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information & Action Links Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5D3C0] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E5D3C0]/40 border border-[#E5D3C0] flex items-center justify-center text-[#5E3023] shrink-0">
                  <MapPin className="w-6 h-6 text-[#D4A373]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-[0.2em] block">
                    {t.addressLabel}
                  </span>
                  <p className="text-[#5E3023] font-bold text-base sm:text-lg leading-snug">
                    {businessInfo.address[lang]}
                  </p>
                  <p className="text-xs text-[#5E3023]/70 mt-1">
                    {t.plusCodeLabel}: <span className="text-[#5E3023] font-bold">{businessInfo.plusCode}</span>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E5D3C0]/40 border border-[#E5D3C0] flex items-center justify-center text-[#5E3023] shrink-0">
                  <Phone className="w-6 h-6 text-[#D4A373]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-[0.2em] block">
                    {t.phoneLabel}
                  </span>
                  <a
                    href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
                    className="serif text-[#5E3023] font-bold text-xl hover:text-[#D4A373] transition-colors block"
                  >
                    {businessInfo.phone}
                  </a>
                  <span className="text-xs text-emerald-800 font-medium">
                    ✓ {lang === 'sq' ? 'Telefononi për porosi apo rezervime' : 'Call for reservations or takeaway'}
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E5D3C0]/40 border border-[#E5D3C0] flex items-center justify-center text-[#5E3023] shrink-0">
                  <Clock className="w-6 h-6 text-[#D4A373]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-[0.2em] block">
                    {t.hoursLabel}
                  </span>
                  <p className="text-[#5E3023] font-bold text-sm sm:text-base">
                    {t.hoursValue}
                  </p>
                  <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{t.openStatus}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-sep space-y-2.5">
              <a
                href={googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-lg bg-[#5E3023] hover:bg-[#D4A373] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#D4A373]" />
                <span>{t.getDirectionsBtn}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-[#E5D3C0]/40 hover:bg-[#E5D3C0] text-[#5E3023] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#E5D3C0] transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>{t.appleMapsBtn}</span>
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-[#E5D3C0]/40 hover:bg-[#E5D3C0] text-[#5E3023] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#E5D3C0] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>{t.wazeBtn}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Map Display */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-[#E5D3C0] min-h-[380px] lg:min-h-[460px] relative shadow-md flex flex-col">
            <iframe
              title="Creperie Komuna Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.388836544837!2d19.8050!3d41.3180!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350310000000001%3A0x1!2sRruga%20Medar%20Shtylla%2C%20Tiran%C3%AB!5e0!3m2!1sen!2sal!4v1710000000000!5m2!1sen!2sal"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', filter: 'contrast(1.02)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full flex-1"
            />

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E5D3C0] shadow-xl max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#5E3023]" />
                <span className="serif font-bold text-sm text-[#5E3023]">Creperie Komuna</span>
              </div>
              <p className="text-[11px] text-[#D4A373] font-semibold mt-0.5">
                Rruga Medar Shtylla, Tirana 1060
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
