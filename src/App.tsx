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
import { SectionTransition } from './components/SectionTransition';
import { weddingAudio } from './components/AudioEngine';
import { WEDDING_CONFIG, GALLERY_PHOTOS, STORY_MILESTONES } from './data/weddingData';
import { preloadImages } from './utils/imageOptimizer';

export default function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isInvitationGateActive, setIsInvitationGateActive] = useState(true);

  // Background High-Speed Preloading of All Wedding Assets & Audio
  useEffect(() => {
    // 1. High priority: Hero, Cover, Couple avatars & QR images
    const criticalImages = [
      WEDDING_CONFIG.bgImage,
      WEDDING_CONFIG.heroImage,
      WEDDING_CONFIG.coupleCoverImage,
      WEDDING_CONFIG.groom.avatar,
      WEDDING_CONFIG.bride.avatar,
      WEDDING_CONFIG.groom.bank.qrCodeUrl,
      WEDDING_CONFIG.bride.bank.qrCodeUrl,
    ].filter(Boolean) as string[];

    preloadImages(criticalImages, 'high');

    // 2. Preload all gallery and story photos immediately so scroll is ultra smooth
    const secondaryImages = [
      ...GALLERY_PHOTOS.map((p) => p.imageUrl),
      ...STORY_MILESTONES.map((s) => s.image),
    ].filter(Boolean) as string[];

    preloadImages(secondaryImages, 'low');
  }, []);

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
    <div className="min-h-screen bg-[#FEFCF7] text-stone-800 flex flex-col relative selection:bg-amber-300 selection:text-stone-900 pb-16 sm:pb-0">
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

        {/* Transition 1: Seamless Silk Bridge from Dark Hero to Warm Ivory White */}
        <SectionTransition variant="hero-to-white" />

        {/* 2. Wedding Countdown Section */}
        <CountdownSection />

        {/* Transition 2: Gold Crest Ribbon */}
        <SectionTransition variant="gold-crest" className="bg-[#FEFDF9]" />

        {/* 3. The Wedding Events: Lễ Vu Quy & Tiệc Cưới */}
        <EventsSection />

        {/* Transition 3: Double Gold Hairline */}
        <SectionTransition variant="double-hairline" className="bg-gradient-to-b from-[#FEFDF9] to-[#FEFCF7]" />

        {/* 4. Photo Gallery with Lightbox */}
        <GallerySection />

        {/* Transition 4: Lotus Glow */}
        <SectionTransition variant="lotus-glow" className="bg-gradient-to-b from-[#FEFCF7] to-[#FEFCF6]" />

        {/* 5. RSVP Form & Digital Guestbook */}
        <RSVPSection />

        {/* Transition 5: Gold Crest Ribbon */}
        <SectionTransition variant="gold-crest" className="bg-[#FEFCF6]" />

        {/* 6. FAQs: Dresscode palette, parking, queries */}
        <FAQSection />

        {/* Transition 6: Double Gold Hairline */}
        <SectionTransition variant="double-hairline" className="bg-gradient-to-b from-[#FEFCF6] to-stone-900" />
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
