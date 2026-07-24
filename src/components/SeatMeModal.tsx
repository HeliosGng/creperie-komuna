import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Sparkles, Copy, MessageCircle } from 'lucide-react';
import { Language, TableReservation } from '../types';
import { translations } from '../data/translations';

interface SeatMeModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const SeatMeModal: React.FC<SeatMeModalProps> = ({
  isOpen,
  lang,
  onClose,
}) => {
  if (!isOpen) return null;

  const t = translations[lang].seatMe;
  const whatsappNumber = '355692105947';

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:00');
  const [area, setArea] = useState<'indoor' | 'terrace'>('indoor');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation state
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Time slots generated from 08:00 to 23:00
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  const getWhatsAppUrl = (res: TableReservation) => {
    const areaText = res.area === 'indoor'
      ? (lang === 'sq' ? '🏠 Brenda' : '🏠 Indoor')
      : (lang === 'sq' ? '🌿 Tarracë' : '🌿 Terrace');

    const msg = lang === 'sq'
      ? `Përshëndetje Creperie Komuna! 🥞\n\nDëshiroj të bëj një rezervim tavoline:\n\n📌 Kod Rezervimi: ${res.id}\n👤 Emri: ${res.fullName}\n📞 Telefon: ${res.phone}${res.email ? `\n✉️ Email: ${res.email}` : ''}\n📅 Data: ${res.date}\n⏰ Ora: ${res.time}\n👥 Personat: ${res.guests}\n📍 Zona: ${areaText}${res.specialRequests ? `\n💬 Kërkesa të veçanta: ${res.specialRequests}` : ''}`
      : `Hello Creperie Komuna! 🥞\n\nI would like to book a table reservation:\n\n📌 Reservation Code: ${res.id}\n👤 Name: ${res.fullName}\n📞 Phone: ${res.phone}${res.email ? `\n✉️ Email: ${res.email}` : ''}\n📅 Date: ${res.date}\n⏰ Time: ${res.time}\n👥 Guests: ${res.guests}\n📍 Area: ${areaText}${res.specialRequests ? `\n💬 Special Requests: ${res.specialRequests}` : ''}`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const code = 'CREP-' + Math.floor(1000 + Math.random() * 9000);
    const newRes: TableReservation = {
      id: code,
      fullName,
      phone,
      email,
      guests,
      date,
      time,
      area,
      specialRequests,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Save to localStorage
    try {
      const saved = localStorage.getItem('creperie_reservations');
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(newRes);
      localStorage.setItem('creperie_reservations', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    const waUrl = getWhatsAppUrl(newRes);

    // Reset form fields
    setFullName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');

    // Close modal
    onClose();

    // Open WhatsApp directly via window.location.href (works seamlessly on mobile & desktop)
    window.location.href = waUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl shadow-2xl overflow-hidden border border-[#E5D3C0] max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#5E3023] text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1 text-[#D4A373] text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seat Me • Creperie Komuna</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
            {t.title}
          </h2>
          <p className="serif italic text-xs sm:text-sm text-[#D4A373] mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-[#5E3023]">
          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Area Selection Cards */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A373] mb-2">
                  1. {t.form.area}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setArea('indoor')}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      area === 'indoor'
                        ? 'bg-[#5E3023] text-white border-[#5E3023] shadow-md font-bold'
                        : 'bg-white text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373] font-medium text-xs'
                    }`}
                  >
                    <span className="block text-base mb-1">🏠</span>
                    <span className="text-xs">{t.form.areaIndoor}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setArea('terrace')}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      area === 'terrace'
                        ? 'bg-[#5E3023] text-white border-[#5E3023] shadow-md font-bold'
                        : 'bg-white text-[#5E3023] border-[#E5D3C0] hover:border-[#D4A373] font-medium text-xs'
                    }`}
                  >
                    <span className="block text-base mb-1">🌿</span>
                    <span className="text-xs">{t.form.areaTerrace}</span>
                  </button>
                </div>
              </div>

              {/* Guests, Date, Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Guests */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5E3023] mb-1">
                    {t.form.guests}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-3 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? (lang === 'sq' ? 'Person' : 'Guest') : (lang === 'sq' ? 'Persona' : 'Guests')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5E3023] mb-1">
                    {t.form.date}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5E3023] mb-1">
                    {t.form.time}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A373]">
                  2. {lang === 'sq' ? 'Të dhënat tuaja' : 'Contact Details'}
                </label>

                <div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.form.fullNamePlaceholder}
                    className="w-full p-3.5 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] text-sm font-medium placeholder-[#5E3023]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.form.phonePlaceholder}
                    className="w-full p-3.5 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] text-sm font-medium placeholder-[#5E3023]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    required
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.form.emailPlaceholder}
                    className="w-full p-3.5 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] text-sm font-medium placeholder-[#5E3023]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder={t.form.specialRequestsPlaceholder}
                    className="w-full p-3.5 rounded-lg bg-white border border-[#E5D3C0] text-[#5E3023] text-sm font-medium placeholder-[#5E3023]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A373] resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>{t.form.submit}</span>
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

