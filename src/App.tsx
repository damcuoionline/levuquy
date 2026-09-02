import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { RSVPSection } from './components/RSVPSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingPetals } from './components/FloatingPetals';
import { InvitationGate } from './components/InvitationGate';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { weddingAudio } from './components/AudioEngine';
import { WEDDING_CONFIG } from './data/weddingData';

export default function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isInvitationGateActive, setIsInvitationGateActive] = useState(true);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setIsPlayingMusic(state.isPlaying);
    });

    // Auto-start music on first user interaction if not playing
    const handleFirstUserInteraction = () => {
      if (!weddingAudio.getStatus()) {
        weddingAudio.play();
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, []);

  const toggleMusic = () => {
    weddingAudio.toggle();
  };

  const handleOpenInvitationGate = () => {
    setIsInvitationGateActive(true);
  };

  const handleCloseInvitationGate = () => {
    setIsInvitationGateActive(false);
  };

  return (
    <div className="min-h-screen bg-[#FEFCF7]/95 text-stone-800 flex flex-col relative selection:bg-amber-300 selection:text-stone-900 pb-16 sm:pb-0">
      {/* Fixed Fullscreen Background Image with Dimming Semi-Transparent Black Layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <img
          src={WEDDING_CONFIG.bgImage || WEDDING_CONFIG.heroImage}
          onError={(e) => {
            e.currentTarget.src = WEDDING_CONFIG.heroImage;
          }}
          alt="Hình Nền Đám Cưới Minh Cảnh & Thanh Nhi"
          className="w-full h-full object-cover object-center filter blur-[1px] scale-105"
        />
        {/* Lớp layout màu đen trong suốt phía trước để hình mờ dịu, sang trọng */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-stone-950/40" />
      </div>

      {/* 1. Interactive Royal Wedding Invitation Gate (Thiệp Mời Cưới Trực Quan Đầu Tiên) */}
      {isInvitationGateActive && (
        <InvitationGate onOpen={handleCloseInvitationGate} />
      )}

      {/* Gentle Floating Rose Petals Animation */}
      <FloatingPetals />

      {/* Luxury Navigation Bar */}
      <Navbar
        isPlaying={isPlayingMusic}
        toggleMusic={toggleMusic}
        onOpenInvitation={handleOpenInvitationGate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section: Romantic Welcome */}
        <HeroSection 
          onOpenInvitation={handleOpenInvitationGate}
        />

        {/* 2. Wedding Countdown Section */}
        <CountdownSection />

        {/* 3. The Wedding Events: Lễ Vu Quy & Tiệc Cưới */}
        <EventsSection />

        {/* 5. Photo Gallery with Lightbox */}
        <GallerySection />

        {/* 7. RSVP Form & Digital Guestbook */}
        <RSVPSection />

        {/* 8. FAQs: Dresscode palette, parking, queries */}
        <FAQSection />
      </main>

      {/* Footer: Sincere Gratitude & Hotlines */}
      <Footer />

      {/* Floating Bottom Quick Action Bar for Mobile Phones */}
      <FloatingMobileBar
        isPlaying={isPlayingMusic}
        toggleMusic={toggleMusic}
        onOpenInvitation={handleOpenInvitationGate}
      />

      {/* Floating Background Music Badge & Quick Controls for Desktop/Tablet */}
      <FloatingMusicPlayer />
    </div>
  );
}
