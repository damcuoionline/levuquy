import React from 'react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { Heart, MapPin, ChevronDown, PartyPopper } from 'lucide-react';
import { triggerWeddingFireworks } from '../utils/fireworks';
import { WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';
import { ScrollReveal } from './ScrollReveal';

interface HeroSectionProps {
  onOpenGiftModal?: () => void;
  onOpenInvitation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInvitation }) => {
  const handleFireworks = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerWeddingFireworks();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 text-white"
    >
      {/* Refined Patriotic Corner Ornaments (Top & Bottom Corners) */}
      <SectionCornerDecorations
        corners={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        variant="flag-and-lotus"
        className="opacity-90 mt-14 sm:mt-16"
      />

      {/* Background Image with Instant Async Decoding */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={WEDDING_CONFIG.bgImage || WEDDING_CONFIG.heroImage}
          onError={(e) => {
            e.currentTarget.src = WEDDING_CONFIG.heroImage;
          }}
          loading="eager"
          decoding="async"
          alt="Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Deep regal crimson and dark ambient overlay for a patriotic luxury atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-black/55 to-stone-950/70" />
        <div className="absolute inset-0 bg-red-950/25 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Hero Content Container with Motion Blur ScrollReveal */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center flex flex-col items-center">
        
        {/* Patriotic Warm Welcome Grand Badge */}
        <ScrollReveal direction="fly-down" duration={0.45}>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-1.5 sm:py-2 rounded-full bg-stone-950/80 backdrop-blur-md border border-amber-400/60 text-amber-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-5 sm:mb-6 shadow-xl">
            <WavingVietnameseFlag width={32} height={21} showPole={false} />
            <span className="text-amber-300 font-bold">Việt Nam • Trăm Năm Hạnh Phúc</span>
          </div>
        </ScrollReveal>

        {/* Script Intro with Motion fly-left */}
        <ScrollReveal direction="fly-left" duration={0.45} delay={0.05}>
          <p className="font-script text-2xl sm:text-4xl text-amber-200 mb-1 sm:mb-2 drop-shadow-md">
            Lễ Vu Quy
          </p>
        </ScrollReveal>

        {/* Main Grand Names - Pure, Elegant, High-Contrast Typography */}
        <ScrollReveal direction="zoom-blur" duration={0.5} delay={0.1}>
          <div className="relative my-2">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-normal text-white uppercase leading-tight drop-shadow-2xl">
              <span className="bg-gradient-to-r from-amber-100 via-white to-amber-200 bg-clip-text text-transparent">
                Trương Minh Cảnh
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-script text-amber-300 normal-case my-1.5 sm:my-2.5 font-normal">
                &
              </span>
              <span className="bg-gradient-to-r from-amber-200 via-white to-amber-100 bg-clip-text text-transparent">
                Nguyễn Đàm Thanh Nhi
              </span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Elegant Golden Divider */}
        <ScrollReveal direction="zoom" duration={0.45} delay={0.12}>
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-amber-300" />
            <div className="w-2 h-2 rotate-45 bg-amber-400 shadow-xs" />
            <div className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-l from-transparent via-amber-400 to-amber-300" />
          </div>
        </ScrollReveal>

        {/* Patriotic Warm Greeting Message */}
        <ScrollReveal direction="fly-up" duration={0.45} delay={0.15}>
          <p className="max-w-xl text-stone-200 font-serif-cormorant italic text-sm sm:text-base md:text-lg px-2 drop-shadow-md leading-relaxed">
            “Non sông gấm vóc dệt duyên lành — Minh Cảnh & Thanh Nhi nguyện cùng nhau vun đắp tổ ấm hạnh phúc, trọn vẹn tình yêu lứa đôi hòa cùng niềm tự hào quê hương đất nước.”
          </p>
        </ScrollReveal>

        {/* Location Badge */}
        <ScrollReveal direction="fly-right" duration={0.45} delay={0.18}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-5 sm:my-6 text-xs text-amber-100">
            <div className="flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-400/40 text-[11px] sm:text-xs shadow-md">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Tư Gia Nhà Gái • Chợ tình EaTam, Đắk Lắk</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal direction="fly-up" duration={0.5} delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto px-4 max-w-md sm:max-w-none">
            <a
              href="#rsvp"
              id="hero-rsvp-cta"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wide shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-amber-200"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>Đăng Ký Tham Dự (RSVP)</span>
            </a>

            <a
              href="#events"
              id="hero-events-cta"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-red-950/60 hover:bg-red-900/70 text-amber-200 border border-amber-400/50 backdrop-blur-md font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
            >
              <span>Lễ Vu Quy (Nhà Gái)</span>
            </a>

            <button
              id="hero-fireworks-btn"
              onClick={handleFireworks}
              title="Bắn pháo hoa chúc mừng"
              className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-amber-400/20 hover:bg-amber-400/35 text-amber-200 border border-amber-300/50 backdrop-blur-md font-medium text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-md"
            >
              <PartyPopper className="w-4 h-4 text-amber-300" />
              <span>Pháo Hoa 🎉</span>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#countdown"
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-stone-300 hover:text-amber-300 transition-colors group"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium mb-0.5 group-hover:translate-y-0.5 transition-transform text-amber-200/90">
          Khám phá ngày vui
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-300" />
      </a>
    </section>
  );
};

