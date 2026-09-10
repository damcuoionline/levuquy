import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { Heart, MapPin, ChevronDown, PartyPopper, Sparkles } from 'lucide-react';
import { triggerWeddingFireworks } from '../utils/fireworks';
import { WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';
import { ScrollReveal } from './ScrollReveal';

interface HeroSectionProps {
  onOpenGiftModal?: () => void;
  onOpenInvitation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInvitation }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isPhotoPopped, setIsPhotoPopped] = useState(false);
  const popTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (popTimeoutRef.current) {
        clearTimeout(popTimeoutRef.current);
      }
    };
  }, []);

  const triggerPhotoPop = () => {
    if (popTimeoutRef.current) {
      clearTimeout(popTimeoutRef.current);
    }
    setIsPhotoPopped(true);
    try {
      triggerWeddingFireworks();
    } catch {
      // safe fallback
    }

    // Hold prominently, then smoothly and gradually sink back down to normal
    popTimeoutRef.current = setTimeout(() => {
      setIsPhotoPopped(false);
    }, 2000);
  };

  const handleFireworks = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerWeddingFireworks();
    triggerPhotoPop();
  };

  const scrollToInvitation = () => {
    triggerPhotoPop();
    const target = document.getElementById('wedding-invitation-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth transition from dark to white:
  // Starts gently brightening around scrollY = 60, smoothly turns into pure warm ivory white by scrollY = 650.
  const whiteProgress = Math.min(1, Math.max(0, (scrollY - 50) / 600));

  // Dynamic color interpolation from warm luxury dark rgb(24, 20, 18) to pure ivory rgb(254, 252, 247)
  const r = Math.round(24 + whiteProgress * (254 - 24));
  const g = Math.round(20 + whiteProgress * (252 - 20));
  const b = Math.round(18 + whiteProgress * (247 - 18));
  const heroBgColor = `rgb(${r}, ${g}, ${b})`;
  const isBrightTheme = whiteProgress > 0.45;

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: heroBgColor }}
    >
      {/* 1. Background Couple Photo & Backdrop - Sticky inside Hero with smooth fade-to-white */}
      <div 
        className="sticky top-0 left-0 w-full h-[100dvh] -mb-[100dvh] z-0 overflow-hidden pointer-events-none transition-colors duration-300"
        style={{ backgroundColor: heroBgColor }}
      >
        {/* =========================================================================
            [VỊ TRÍ THAY ĐƯỜNG DẪN ẢNH NỀN HẬU CẢNH NẾU DÙNG]:
            - Bức ảnh nền trải rộng toàn màn hình
            - Giữ NGUYÊN 100% MÀU SẮC GỐC (filter: none)
            ========================================================================= */}
        <img
          id="wedding-hero-bg-photo"
          src={WEDDING_CONFIG.bgImage || WEDDING_CONFIG.heroImage}
          onError={(e) => {
            e.currentTarget.src = WEDDING_CONFIG.heroImage;
          }}
          loading="eager"
          decoding="async"
          alt="Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi"
          className="w-full h-full object-cover object-[center_20%] sm:object-[center_24%]"
          style={{
            opacity: Math.max(0.12, 1 - whiteProgress * 0.95),
            filter: 'none', // Giữ nguyên 100% màu sắc gốc
          }}
        />

        {/* Soft, gentle vignette: Keeps scene deep and romantic */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-stone-950/40 pointer-events-none transition-opacity"
          style={{ 
            opacity: (1 - whiteProgress),
            transitionDuration: '500ms',
          }}
        />

        {/* Seamless Luminous Ivory White Canvas Overlay: Gracefully dissolves scene into pure white */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity"
          style={{ 
            backgroundColor: '#FEFCF7',
            opacity: whiteProgress,
            transitionDuration: '500ms',
          }}
        />
      </div>

      {/* 2. Initial Fullscreen View (Stage 1): Only the Couple Photo is shown clean and unobstructed */}
      <div className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-end items-center px-4 pb-4 sm:pb-6 pointer-events-auto">
        {/* Bottom Scroll Prompt: "Vuốt lên để xem thiệp cưới" */}
        <div className="text-center flex flex-col items-center cursor-pointer group mb-1" onClick={scrollToInvitation}>
          <div className="px-5 py-2.5 rounded-full bg-stone-950/75 backdrop-blur-md border border-amber-400/60 text-amber-200 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300 flex items-center gap-2 mb-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-100">
              Vuốt lên để xem thiệp cưới
            </span>
          </div>
          <ChevronDown className="w-5 h-5 animate-bounce text-amber-300" />
        </div>
      </div>

      {/* 3. Main Wedding Invitation Card & Details (Stage 2): Smoothly adapts from Dark to White */}
      <div 
        id="wedding-invitation-content"
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center"
      >
        {/* Patriotic Warm Welcome Grand Badge */}
        <ScrollReveal direction="fly-down" duration={0.45} className="w-full flex justify-center">
          <div className={`inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md border text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-5 sm:mb-6 shadow-xl transition-all duration-300 ${
            isBrightTheme 
              ? "bg-white/95 border-amber-400/80 text-amber-950 shadow-amber-900/5"
              : "bg-stone-950/80 border-amber-400/60 text-amber-200 shadow-stone-950/40"
          }`}>
            <WavingVietnameseFlag width={32} height={21} showPole={false} />
            <span className={`whitespace-nowrap ${isBrightTheme ? "text-amber-800 font-bold" : "text-amber-300 font-bold"}`}>
              Việt Nam • Trăm Năm Hạnh Phúc
            </span>
          </div>
        </ScrollReveal>

        {/* Script Intro with Motion fly-left */}
        <ScrollReveal direction="fly-left" duration={0.45} delay={0.05} className="w-full flex justify-center">
          <p className={`font-script text-2xl sm:text-4xl mb-1 sm:mb-2 transition-colors duration-300 whitespace-nowrap text-center ${
            isBrightTheme ? "text-amber-800 drop-shadow-xs" : "text-amber-200 drop-shadow-md"
          }`}>
            Lễ Vu Quy
          </p>
        </ScrollReveal>

        {/* Main Grand Names - Pure, Elegant, High-Contrast Typography: Bride first in Vu Quy */}
        <ScrollReveal direction="fly-up" duration={0.5} delay={0.08} className="w-full flex justify-center">
          <div className="relative my-2 w-full text-center">
            <h1 className="font-heading text-[18px] min-[360px]:text-[21px] min-[390px]:text-[23px] min-[420px]:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight sm:tracking-normal uppercase leading-tight text-center">
              <span className={`block whitespace-nowrap transition-all duration-300 ${
                isBrightTheme
                  ? "text-stone-900 drop-shadow-xs"
                  : "bg-gradient-to-r from-amber-100 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-2xl"
              }`}>
                Nguyễn Đàm Thanh Nhi
              </span>
              <span className={`block text-2xl sm:text-3xl md:text-4xl font-script normal-case my-1 sm:my-2 font-normal transition-colors duration-300 ${
                isBrightTheme ? "text-amber-700" : "text-amber-300"
              }`}>
                &
              </span>
              <span className={`block whitespace-nowrap transition-all duration-300 ${
                isBrightTheme
                  ? "text-stone-900 drop-shadow-xs"
                  : "bg-gradient-to-r from-amber-200 via-white to-amber-100 bg-clip-text text-transparent drop-shadow-2xl"
              }`}>
                Trương Minh Cảnh
              </span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Elegant Golden Divider */}
        <ScrollReveal direction="zoom" duration={0.45} delay={0.1} className="w-full flex justify-center">
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className={`w-16 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent ${
              isBrightTheme ? "via-amber-500 to-amber-600" : "via-amber-400 to-amber-300"
            }`} />
            <div className={`w-2 h-2 rotate-45 transition-colors duration-300 ${
              isBrightTheme ? "bg-amber-600" : "bg-amber-400"
            }`} />
            <div className={`w-16 sm:w-28 h-[1.5px] bg-gradient-to-l from-transparent ${
              isBrightTheme ? "via-amber-500 to-amber-600" : "via-amber-400 to-amber-300"
            }`} />
          </div>
        </ScrollReveal>

        {/* Intimate & Heartfelt Thank-You Letter to Guests */}
        <ScrollReveal direction="fly-up" duration={0.5} delay={0.12} className="w-full flex justify-center">
          <div className={`relative my-3 sm:my-5 max-w-2xl mx-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-xl transition-all duration-300 ${
            isBrightTheme
              ? "bg-white/95 border border-amber-300/70 shadow-[0_15px_40px_rgba(180,120,40,0.12)] text-stone-800"
              : "bg-stone-900/60 border border-amber-300/40 shadow-2xl text-stone-100"
          }`}>
            {/* Subtle Inner Gold Border */}
            <div className={`absolute inset-2 sm:inset-2.5 border rounded-xl sm:rounded-2xl pointer-events-none transition-colors duration-300 ${
              isBrightTheme ? "border-amber-300/35" : "border-amber-300/20"
            }`} />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 transition-colors duration-300 ${
                isBrightTheme 
                  ? "bg-amber-100 text-amber-900 border border-amber-300/60" 
                  : "bg-amber-400/20 text-amber-200 border border-amber-300/40"
              }`}>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                <span className="whitespace-nowrap">Lời Tri Ân & Cảm Ơn Thân Mật</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
              </div>

              <h3 className={`font-heading text-sm sm:text-xl md:text-2xl font-bold mb-1.5 transition-colors duration-300 text-center text-balance ${
                isBrightTheme ? "text-amber-900" : "text-amber-200"
              }`}>
                <span className="inline-block whitespace-nowrap">Kính gửi Quý Quan Khách</span>{' '}
                <span className="inline-block whitespace-nowrap">&amp; Người Thân Yêu Quý</span>
              </h3>

              <p className={`font-serif-cormorant italic text-xs sm:text-sm md:text-base leading-relaxed text-center px-1 sm:px-3 transition-colors duration-300 ${
                isBrightTheme ? "text-stone-700 font-normal" : "text-stone-200"
              }`}>
                “Tình yêu đẹp nhất là khi được đơm hoa kết trái trong vòng tay yêu thương và chúc phúc của gia đình, Thầy Cô, Bạn bè cùng những người thân quý nhất. Sự hiện diện và tình cảm chân thành của Quý vị chính là món quà trân quý và ý nghĩa vô giá trong ngày Vu Quy của chúng con/chúng mình. Gia đình nhà gái cùng cô dâu <span className="whitespace-nowrap font-medium">Thanh Nhi</span> & chú rể <span className="whitespace-nowrap font-medium">Minh Cảnh</span> xin gửi lời cảm ơn sâu sắc và nồng hậu nhất!”
              </p>

              <div className={`mt-3 pt-2.5 border-t flex flex-col xs:flex-row items-center justify-between gap-1 w-full text-[11px] sm:text-xs font-medium px-1 transition-colors duration-300 ${
                isBrightTheme ? "border-amber-200 text-stone-600" : "border-amber-300/30 text-amber-200/90"
              }`}>
                <span className={`font-script text-sm sm:text-base font-normal whitespace-nowrap transition-colors duration-300 ${
                  isBrightTheme ? "text-amber-800" : "text-amber-300"
                }`}>
                  Thanh Nhi & Minh Cảnh
                </span>
                <span className={`font-serif italic whitespace-nowrap transition-colors duration-300 ${
                  isBrightTheme ? "text-stone-500" : "text-stone-300"
                }`}>
                  Trân trọng kính mời & cảm ơn!
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Location Badge */}
        <ScrollReveal direction="fly-right" duration={0.45} delay={0.14} className="w-full flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-3 sm:my-4 text-xs">
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] sm:text-xs shadow-md backdrop-blur-md transition-all duration-300 ${
              isBrightTheme
                ? "bg-white/95 border-amber-300/80 text-stone-800"
                : "bg-stone-900/80 border-amber-400/40 text-amber-100"
            }`}>
              <MapPin className={`w-3.5 h-3.5 shrink-0 ${isBrightTheme ? "text-amber-700" : "text-amber-300"}`} />
              <span className="whitespace-nowrap">Tư Gia Nhà Gái • Chợ tình EaTam, Đắk Lắk</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal direction="fly-up" duration={0.5} delay={0.16} className="w-full flex justify-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto px-4 max-w-md sm:max-w-none mx-auto">
            <a
              href="#rsvp"
              id="hero-rsvp-cta"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wide shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-amber-200 shrink-0"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span className="whitespace-nowrap">Đăng Ký Tham Dự (RSVP)</span>
            </a>

            <a
              href="#events"
              id="hero-events-cta"
              className={`w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shrink-0 ${
                isBrightTheme
                  ? "bg-red-700 hover:bg-red-800 text-white border border-red-300/50 shadow-rose-900/10"
                  : "bg-red-950/60 hover:bg-red-900/70 text-amber-200 border border-amber-400/50 backdrop-blur-md"
              }`}
            >
              <span className="whitespace-nowrap">Lễ Vu Quy (Nhà Gái)</span>
            </a>

            <button
              id="hero-fireworks-btn"
              onClick={handleFireworks}
              title="Bắn pháo hoa chúc mừng"
              className={`w-full sm:w-auto px-5 py-3.5 rounded-full font-medium text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-md shrink-0 ${
                isBrightTheme
                  ? "bg-amber-100/90 hover:bg-amber-200/90 text-amber-900 border border-amber-300/70"
                  : "bg-amber-400/20 hover:bg-amber-400/35 text-amber-200 border border-amber-300/50 backdrop-blur-md"
              }`}
            >
              <PartyPopper className={`w-4 h-4 ${isBrightTheme ? "text-amber-700" : "text-amber-300"}`} />
              <span className="whitespace-nowrap">Pháo Hoa 🎉</span>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#countdown"
        className={`relative z-10 my-4 flex flex-col items-center transition-colors group ${
          isBrightTheme ? "text-stone-600 hover:text-amber-900" : "text-stone-300 hover:text-amber-300"
        }`}
      >
        <span className={`text-[10px] uppercase tracking-widest font-medium mb-0.5 group-hover:translate-y-0.5 transition-transform ${
          isBrightTheme ? "text-stone-700 font-semibold" : "text-amber-200/90"
        }`}>
          Lịch trình & Đếm ngược
        </span>
        <ChevronDown className={`w-4 h-4 animate-bounce ${isBrightTheme ? "text-amber-700" : "text-amber-300"}`} />
      </a>

      {/* Subtle bottom spacing flowing directly into the next section */}
      <div className="relative z-10 w-full h-8 sm:h-12 pointer-events-none" />
    </section>
  );
};


