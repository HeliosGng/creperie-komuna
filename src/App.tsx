import React, { useState } from 'react';
import { Language, MenuItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ItemModal } from './components/ItemModal';
import { SeatMeModal } from './components/SeatMeModal';
import { DirectionsMap } from './components/DirectionsMap';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('sq');
  const [isSeatMeOpen, setIsSeatMeOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<MenuItem | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans text-amber-950 selection:bg-amber-400 selection:text-amber-950 antialiased">
      {/* Header Navbar */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenSeatMe={() => setIsSeatMeOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Banner */}
        <HeroSection
          lang={lang}
          onOpenSeatMe={() => setIsSeatMeOpen(true)}
          onNavigateMenu={() => handleNavigate('menu')}
        />

        {/* Menu Section with Filter, Items, and Prices */}
        <MenuSection
          lang={lang}
          onSelectItem={(item) => setSelectedModalItem(item)}
        />

        {/* Reviews Section */}
        <ReviewsSection lang={lang} />

        {/* Directions & Location Map */}
        <DirectionsMap lang={lang} />

        {/* About Creperie Story */}
        <AboutSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenSeatMe={() => setIsSeatMeOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        lang={lang}
        onOpenSeatMe={() => setIsSeatMeOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Item Details Modal */}
      <ItemModal
        item={selectedModalItem}
        lang={lang}
        onClose={() => setSelectedModalItem(null)}
      />

      {/* Table Reservation Modal ("Seat Me") */}
      <SeatMeModal
        isOpen={isSeatMeOpen}
        lang={lang}
        onClose={() => setIsSeatMeOpen(false)}
      />
    </div>
  );
}
