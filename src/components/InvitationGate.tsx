import React, { useState } from 'react';
import { Heart, MapPin, ChevronRight } from 'lucide-react';
import { triggerWeddingFireworks } from '../utils/fireworks';
import { weddingAudio } from './AudioEngine';
import { WEDDING_CONFIG, WEDDING_EVENTS } from '../data/weddingData';

interface InvitationGateProps {
  onOpen: () => void;
}

/**
 * Cute Double Happiness (Song Hỷ 囍) Bride & Groom character vector
 * matching the user's reference image with boy/girl faces & heart feet!
 */
export const CuteSongHyIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 76 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-md ${className}`}
    >
      {/* Top horizontal bars */}
      <rect x="22" y="16" width="34" height="4" rx="2" fill="white" />
      <rect x="64" y="16" width="34" height="4" rx="2" fill="white" />

      {/* Top vertical dividers */}
      <rect x="36" y="20" width="4" height="6" rx="1.5" fill="white" />
      <rect x="80" y="20" width="4" height="6" rx="1.5" fill="white" />

      {/* Second horizontal bars */}
      <rect x="22" y="26" width="34" height="4" rx="2" fill="white" />
      <rect x="64" y="26" width="34" height="4" rx="2" fill="white" />

      {/* Central connector bar */}
      <rect x="52" y="44" width="16" height="4" rx="2" fill="white" />

      {/* GROOM Head (Left side) */}
      <g>
        {/* Head outer box / face outline */}
        <rect x="23" y="34" width="32" height="22" rx="7" fill="none" stroke="white" strokeWidth="3.5" />
        {/* Boy Hair Fringe */}
        <path d="M26 38 Q32 44 39 38 Q46 44 52 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Groom Eyes */}
        <circle cx="33" cy="46" r="2" fill="white" />
        <circle cx="45" cy="46" r="2" fill="white" />
      </g>

      {/* BRIDE Head (Right side) */}
      <g>
        {/* Head outer box / face outline */}
        <rect x="65" y="34" width="32" height="22" rx="7" fill="none" stroke="white" strokeWidth="3.5" />
        {/* Girl Cute Bangs & Hair Ribbon Accent */}
        <path d="M68 37 Q74 41 81 37 Q88 41 94 37" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Bride Eyes */}
        <circle cx="75" cy="46" r="2" fill="white" />
        <circle cx="87" cy="46" r="2" fill="white" />
        {/* Blushing Cheeks */}
        <ellipse cx="71" cy="49" rx="1.8" ry="1.2" fill="#FCA5A5" />
        <ellipse cx="91" cy="49" rx="1.8" ry="1.2" fill="#FCA5A5" />
      </g>

      {/* Middle horizontal connecting line */}
      <rect x="18" y="60" width="84" height="4" rx="2" fill="white" />

      {/* Lower vertical supports */}
      <rect x="36" y="64" width="4" height="6" rx="1.5" fill="white" />
      <rect x="80" y="64" width="4" height="6" rx="1.5" fill="white" />

      {/* Sub-bar below */}
      <rect x="22" y="70" width="34" height="4" rx="2" fill="white" />
      <rect x="64" y="70" width="34" height="4" rx="2" fill="white" />

      {/* Connecting vertical stubs to hearts */}
      <rect x="37" y="74" width="4" height="5" rx="1" fill="white" />
      <rect x="79" y="74" width="4" height="5" rx="1" fill="white" />

      {/* LEFT Heart Foot (Groom Heart ♡) */}
      <path
        d="M39 81 C39 77 34 75 30 79 C24 85 39 98 39 98 C39 98 54 85 48 79 C44 75 39 77 39 81 Z"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* RIGHT Heart Foot (Bride Heart ♡) */}
      <path
        d="M81 81 C81 77 76 75 72 79 C66 85 81 98 81 98 C81 98 96 85 90 79 C86 75 81 77 81 81 Z"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const InvitationGate: React.FC<InvitationGateProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const mainEvent = WEDDING_EVENTS[0] || {
    timeStr: '09:00',
    title: 'Lễ Vu Quy',
    locationName: 'Tư gia Nhà Gái',
    address: 'Chợ tình EaTam, xã Tam Giang, tỉnh Đắk Lắk'
  };

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    // 1. Start playing romantic wedding music immediately on user gesture!
    try {
      weddingAudio.play();
    } catch {
      // safe fallback
    }

    // 2. Launch festive fireworks and celebration confetti
    triggerWeddingFireworks();

    // 3. Complete opening transition swiftly
    setTimeout(() => {
      setIsDismissed(true);
      onOpen();
    }, 380);
  };

  if (isDismissed) return null;

  return (
    <div 
      id="wedding-invitation-gate"
      className={`fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-hidden transition-all duration-400 ease-out ${
        isOpening ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Image with Dark Romantic Blur Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={WEDDING_CONFIG.bgImage || WEDDING_CONFIG.heroImage}
          onError={(e) => {
            e.currentTarget.src = WEDDING_CONFIG.heroImage;
          }}
          alt="Trương Minh Cảnh & Nguyễn Đàm Thanh Nhi"
          className="w-full h-full object-cover object-center filter blur-[2px] scale-105"
        />
        {/* Deep Ruby & Dark Overlay for maximum contrast */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4A0A0E]/80 via-black/50 to-[#35070A]/85" />
      </div>

      {/* Soft Ambient Gold Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-red-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Golden Sparkle Stars */}
        <div className="absolute top-6 left-6 text-amber-300/60 text-sm">✦</div>
        <div className="absolute top-12 right-8 text-yellow-300/60 text-xs">✧</div>
        <div className="absolute bottom-8 left-10 text-amber-300/60 text-sm">✦</div>
        <div className="absolute bottom-10 right-8 text-yellow-300/60 text-xs">✧</div>
      </div>

      {/* Main Luxury Envelope Container - Compact Viewport Fit */}
      <div className="relative w-full max-w-sm sm:max-w-md mx-auto z-10 flex flex-col justify-center max-h-[98vh]">
        {/* 3D Wedding Card Wrapper - Deep Ruby Red Palette matching reference image */}
        <div 
          onClick={handleOpenInvitation}
          className={`relative bg-gradient-to-b from-[#8C161D] via-[#7F1017] to-[#6A0C12] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-amber-300/60 cursor-pointer transform transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_25px_60px_rgba(185,28,28,0.4)] group text-white select-none ${
            isOpening ? 'rotate-x-12 translate-y-3' : ''
          }`}
        >
          {/* Subtle Inner White Outline Border */}
          <div className="absolute inset-2 sm:inset-2.5 border border-white/20 rounded-xl sm:rounded-2xl pointer-events-none" />
          <div className="absolute inset-3 sm:inset-3.5 border border-dashed border-amber-200/25 rounded-lg sm:rounded-xl pointer-events-none" />

          {/* Corner Floral Ornaments */}
          <div className="absolute top-2.5 left-2.5 text-amber-200/50 font-serif text-[10px] sm:text-xs pointer-events-none">❖</div>
          <div className="absolute top-2.5 right-2.5 text-amber-200/50 font-serif text-[10px] sm:text-xs pointer-events-none">❖</div>
          <div className="absolute bottom-2.5 left-2.5 text-amber-200/50 font-serif text-[10px] sm:text-xs pointer-events-none">❖</div>
          <div className="absolute bottom-2.5 right-2.5 text-amber-200/50 font-serif text-[10px] sm:text-xs pointer-events-none">❖</div>

          <div className="text-center relative z-10 space-y-2.5 sm:space-y-3.5">
            {/* Header: LỄ VU QUY */}
            <div className="pt-0.5">
              <div className="inline-flex items-center justify-center gap-2">
                <span className="h-[1px] w-6 sm:w-8 bg-amber-300/50" />
                <h3 className="font-heading uppercase tracking-[0.25em] text-amber-200 text-sm sm:text-base font-bold drop-shadow-xs">
                  LỄ VU QUY
                </h3>
                <span className="h-[1px] w-6 sm:w-8 bg-amber-300/50" />
              </div>
            </div>

            {/* Stylized Double Happiness (Song Hỷ 囍) Bride & Groom Icon */}
            <div className="py-0 transform group-hover:scale-105 transition-transform duration-300 flex justify-center">
              <CuteSongHyIcon size={56} className="text-white drop-shadow-md" />
            </div>

            {/* Couple Names - Script Calligraphy */}
            <div>
              <h1 className="font-script text-2xl sm:text-3xl md:text-4xl text-white tracking-wide leading-tight drop-shadow-md">
                <span>Thanh Nhi</span>
                <span className="font-serif italic text-amber-200 text-xl sm:text-2xl mx-1.5 font-normal">&</span>
                <span>Minh Cảnh</span>
              </h1>
            </div>

            {/* Wedding Date */}
            <div className="text-center">
              <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.16em] text-amber-100 font-semibold">
                CHỦ NHẬT, 27. 09. 2026
              </p>
              <p className="text-[10px] sm:text-[11px] text-amber-200/80 font-serif italic">
                (Nhằm ngày 17 tháng 08 năm Bính Ngọ)
              </p>
            </div>

            {/* Địa điểm (Location Details) */}
            <div className="bg-black/25 backdrop-blur-xs border border-white/15 rounded-xl py-2 px-3 text-white text-[11px] sm:text-xs shadow-inner">
              <div className="flex items-center justify-center gap-1.5 text-stone-100 font-light leading-snug">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>{mainEvent.locationName}: {mainEvent.address}</span>
              </div>
            </div>

            {/* Action Prompt Button - "Chạm để mở lời yêu thương" */}
            <div className="pt-1">
              <button
                id="btn-open-wedding-card"
                type="button"
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 hover:from-amber-400 hover:to-yellow-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 border border-amber-100 transition-all transform group-hover:-translate-y-0.5 active:scale-98"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 fill-rose-600 group-hover:scale-110 transition-transform animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-stone-900 text-[11px] sm:text-xs">
                  Chạm để mở lời yêu thương
                </span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

