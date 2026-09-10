import React from 'react';
import { GalleryPhoto, PhotoFrameStyle } from '../data/weddingData';
import { Heart, ZoomIn, Sparkles, Film, Mail, Bookmark, Camera } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface WeddingPictureFrameProps {
  photo: GalleryPhoto;
  index: number;
  fitMode: 'cover' | 'contain';
  styleMode: 'auto' | PhotoFrameStyle;
  likes: number;
  onLike: (e: React.MouseEvent, id: string) => void;
  onOpenLightbox: (index: number) => void;
  className?: string;
  aspectOverride?: string;
}

export const WeddingPictureFrame: React.FC<WeddingPictureFrameProps> = ({
  photo,
  index,
  fitMode,
  styleMode,
  likes,
  onLike,
  onOpenLightbox,
  className = '',
  aspectOverride,
}) => {
  const isLandscape = photo.orientation === 'landscape';
  const defaultAspect = isLandscape ? 'aspect-[16/10] sm:aspect-[3/2]' : 'aspect-[3/4]';
  const aspectClass = aspectOverride || defaultAspect;
  const focalPos = photo.focalPoint || 'center 20%';

  // Resolve active style (either from global filter or photo's curated default style)
  const activeStyle: PhotoFrameStyle =
    styleMode === 'auto' ? photo.defaultStyle || 'royal-gold' : styleMode;

  /* =========================================================================
     STYLE 1: ROYAL GOLD (Khung Gỗ Sơn Mài Mạ Vàng Hoàng Gia)
     ========================================================================= */
  if (activeStyle === 'royal-gold') {
    return (
      <div
        id={`frame-royal-${photo.id}`}
        onClick={() => onOpenLightbox(index)}
        className={`group relative rounded-2xl sm:rounded-[28px] p-2 sm:p-3 md:p-3.5 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#EAE0D0] border-2 border-amber-300/80 shadow-[0_14px_36px_rgba(180,120,40,0.14),0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_54px_rgba(180,120,40,0.28)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer ring-1 ring-amber-400/40 select-none ${className}`}
      >
        {/* 4 Corner Ornate Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-amber-500/80 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-amber-500/80 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-amber-500/80 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-amber-500/80 rounded-br-sm pointer-events-none" />

        {/* Passe-Partout Inner White Mat */}
        <div className="relative rounded-xl sm:rounded-2xl p-1.5 sm:p-2 bg-white/95 shadow-inner border border-amber-200/70 flex flex-col">
          <div className={`relative w-full ${aspectClass} rounded-lg sm:rounded-xl overflow-hidden bg-stone-900 shadow-inner`}>
            {/* Ambient Blurred Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={photo.imageUrl}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover blur-md scale-115 opacity-40"
              />
            </div>

            <OptimizedImage
              src={photo.imageUrl}
              alt={photo.title}
              className={`relative z-10 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                fitMode === 'contain' ? 'object-contain' : 'object-cover'
              }`}
              style={{ objectPosition: focalPos }}
            />

            {/* Glass Sheen */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badge */}
            <div className="absolute top-2.5 left-2.5 z-20">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900/75 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-amber-200 border border-amber-300/40 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>Hoàng Gia</span>
              </span>
            </div>

            {/* Quick Zoom */}
            <div className="absolute top-2.5 right-2.5 z-20">
              <div className="p-1.5 rounded-full bg-stone-900/70 backdrop-blur-md text-white/90 border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
              </div>
            </div>
          </div>

          {/* Brass Plaque */}
          <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 border border-amber-200/70 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-heading text-sm sm:text-base font-bold text-amber-950 truncate tracking-wide">
                {photo.title}
              </h3>
              <button
                type="button"
                onClick={(e) => onLike(e, photo.id)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 active:scale-90 transition-transform p-1 -mr-1"
                title="Thả tim cho bức ảnh"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>{likes}</span>
              </button>
            </div>
            <p className="text-stone-600 text-xs font-serif-cormorant italic truncate mt-0.5">
              {photo.quote || photo.caption}
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     STYLE 2: POLAROID (Ảnh Kỷ Niệm Vintage Polaroid & Băng Keo Washi)
     ========================================================================= */
  if (activeStyle === 'polaroid') {
    // Alternate subtle tilt for natural scrapbook aesthetic
    const tiltClass = index % 2 === 0 ? 'hover:rotate-0 rotate-[-1deg]' : 'hover:rotate-0 rotate-[1deg]';

    return (
      <div
        id={`frame-polaroid-${photo.id}`}
        onClick={() => onOpenLightbox(index)}
        className={`group relative rounded-xl p-2.5 sm:p-3 bg-[#FAF8F5] border border-stone-300/80 shadow-[0_12px_30px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 cursor-pointer select-none ${tiltClass} ${className}`}
      >
        {/* Washi Tape Accent at Top Center */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="w-20 sm:w-24 h-5 sm:h-6 bg-amber-200/75 backdrop-blur-xs border-x-2 border-dashed border-stone-400/40 shadow-xs rotate-[-1.5deg] flex items-center justify-center">
            <span className="text-[9px] font-mono tracking-widest text-amber-900/60 uppercase">
              {photo.dateTag || '27.09.2026'}
            </span>
          </div>
        </div>

        {/* Polaroid Picture Chamber */}
        <div className={`relative w-full ${aspectClass} rounded-sm overflow-hidden bg-stone-900 shadow-inner mt-1`}>
          <OptimizedImage
            src={photo.imageUrl}
            alt={photo.title}
            className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
              fitMode === 'contain' ? 'object-contain' : 'object-cover'
            }`}
            style={{ objectPosition: focalPos }}
          />

          {/* Polaroid Film Shine */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/15 opacity-40 group-hover:opacity-70 transition-opacity" />

          {/* Badge */}
          <div className="absolute top-2 left-2 z-20">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-950/70 text-[10px] font-mono text-amber-200 backdrop-blur-xs">
              <Camera className="w-2.5 h-2.5 text-amber-400" />
              <span>Polaroid</span>
            </span>
          </div>

          <div className="absolute top-2 right-2 z-20">
            <div className="p-1.5 rounded-full bg-stone-900/70 text-white opacity-0 group-hover:opacity-100 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
        </div>

        {/* Wide Polaroid Bottom Chin for Handwritten Note */}
        <div className="pt-3 pb-1 px-1 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="font-serif-cormorant text-base sm:text-lg font-bold italic text-stone-900 tracking-wide truncate">
              "{photo.title}"
            </span>
            <button
              type="button"
              onClick={(e) => onLike(e, photo.id)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 active:scale-90 transition-transform p-1 -mr-1"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{likes}</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 font-serif-cormorant italic mt-0.5">
            <span className="truncate">{photo.caption}</span>
            <span className="text-[10px] font-mono text-stone-400 shrink-0 ml-2">
              #memories
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     STYLE 3: FILM STRIP (Thước Phim Điện Ảnh 35mm Vintage Cinema Reel)
     ========================================================================= */
  if (activeStyle === 'film-strip') {
    return (
      <div
        id={`frame-film-${photo.id}`}
        onClick={() => onOpenLightbox(index)}
        className={`group relative rounded-2xl p-2 sm:p-3 bg-stone-950 border border-stone-800 shadow-[0_16px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_50px_rgba(217,119,6,0.25)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer select-none ${className}`}
      >
        {/* Top Film Sprocket Holes & Code Track */}
        <div className="flex items-center justify-between px-2 pb-2 text-[9px] font-mono text-amber-400/90 tracking-widest uppercase">
          <div className="flex items-center gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2.5 h-2 rounded-[2px] bg-stone-800 border border-stone-700" />
            ))}
          </div>
          <span className="flex items-center gap-1 font-bold text-amber-300">
            <Film className="w-3 h-3 text-amber-400" />
            <span>KODAK PORTRA 400</span>
          </span>
          <span className="hidden sm:inline text-stone-400">FRAME #{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Cinema Film Aperture Window */}
        <div className={`relative w-full ${aspectClass} rounded-md overflow-hidden bg-black shadow-inner`}>
          <OptimizedImage
            src={photo.imageUrl}
            alt={photo.title}
            className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
              fitMode === 'contain' ? 'object-contain' : 'object-cover'
            }`}
            style={{ objectPosition: focalPos }}
          />

          {/* Cinematic Edge Gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Cinema Badge */}
          <div className="absolute top-2 left-2 z-20">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-red-950/80 border border-red-500/50 text-[10px] font-mono text-red-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>CINEMA 35MM</span>
            </span>
          </div>

          <div className="absolute top-2 right-2 z-20">
            <div className="p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
        </div>

        {/* Bottom Film Sprockets & Audio Track */}
        <div className="pt-2 px-1 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-heading text-sm sm:text-base font-bold text-amber-200 truncate tracking-wide">
              {photo.title}
            </h3>
            <button
              type="button"
              onClick={(e) => onLike(e, photo.id)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 active:scale-90 transition-transform p-1"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{likes}</span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-stone-400">
            <span className="truncate text-stone-300 font-serif-cormorant italic text-xs">
              {photo.quote || photo.caption}
            </span>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-1.5 rounded-[1px] bg-stone-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     STYLE 4: EDITORIAL (Bìa Tạp Chí Thời Trang Cưới Vogue Haute Couture)
     ========================================================================= */
  if (activeStyle === 'editorial') {
    return (
      <div
        id={`frame-editorial-${photo.id}`}
        onClick={() => onOpenLightbox(index)}
        className={`group relative rounded-2xl p-2.5 sm:p-3 bg-stone-900 border-2 border-amber-400/70 shadow-[0_16px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_55px_rgba(217,119,6,0.3)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer select-none ${className}`}
      >
        <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden bg-stone-950 shadow-inner`}>
          <OptimizedImage
            src={photo.imageUrl}
            alt={photo.title}
            className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
              fitMode === 'contain' ? 'object-contain' : 'object-cover'
            }`}
            style={{ objectPosition: focalPos }}
          />

          {/* Magazine Masthead Heading Overlay */}
          <div className="absolute top-2 inset-x-2 z-20 flex flex-col items-center pointer-events-none">
            <span className="font-heading text-xl sm:text-2xl md:text-3xl font-black tracking-[0.25em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] uppercase">
              VOGUE
            </span>
            <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-widest text-amber-200/90 uppercase px-1 -mt-1 drop-shadow-md">
              <span>SPECIAL WEDDING ISSUE</span>
              <span>2026 EDITION</span>
            </div>
          </div>

          {/* Lower Editorial Article Headlines */}
          <div className="absolute bottom-2 inset-x-2.5 z-20 pointer-events-none">
            <div className="p-2 rounded-lg bg-stone-950/75 backdrop-blur-md border border-white/20">
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                LOVE & DESTINY
              </span>
              <p className="text-white text-xs sm:text-sm font-heading font-bold drop-shadow-sm truncate">
                {photo.title}
              </p>
              <p className="text-stone-300 text-[11px] font-serif-cormorant italic truncate">
                {photo.quote || "A timeless love story written in gold"}
              </p>
            </div>
          </div>

          <div className="absolute top-3 right-3 z-30">
            <div className="p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all">
              <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
        </div>

        {/* Editorial Footnote & Like */}
        <div className="mt-2 px-1 flex items-center justify-between text-xs text-stone-300">
          <span className="font-mono text-[10px] text-amber-400/90 tracking-wider">
            FEATURED BRIDE & GROOM
          </span>
          <button
            type="button"
            onClick={(e) => onLike(e, photo.id)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 active:scale-90 transition-transform"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     STYLE 5: FLOATING GLASS (Kính Thủy Tinh Vát Cạnh Pha Lê Hiện Đại)
     ========================================================================= */
  if (activeStyle === 'floating-glass') {
    return (
      <div
        id={`frame-glass-${photo.id}`}
        onClick={() => onOpenLightbox(index)}
        className={`group relative rounded-2xl p-2.5 sm:p-3 bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_16px_40px_rgba(30,20,10,0.1),0_0_0_1px_rgba(255,255,255,0.8)] hover:shadow-[0_24px_55px_rgba(180,120,40,0.22)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer select-none ${className}`}
      >
        {/* 4 Chrome Standoff Bolts */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-tr from-stone-300 via-white to-stone-400 border border-stone-400/80 shadow-xs z-30 pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-tr from-stone-300 via-white to-stone-400 border border-stone-400/80 shadow-xs z-30 pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-tr from-stone-300 via-white to-stone-400 border border-stone-400/80 shadow-xs z-30 pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-tr from-stone-300 via-white to-stone-400 border border-stone-400/80 shadow-xs z-30 pointer-events-none" />

        {/* Clear Glass Aperture */}
        <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden bg-stone-950 shadow-inner`}>
          <OptimizedImage
            src={photo.imageUrl}
            alt={photo.title}
            className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
              fitMode === 'contain' ? 'object-contain' : 'object-cover'
            }`}
            style={{ objectPosition: focalPos }}
          />

          {/* Diamond Cut Glass Reflection */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-90 transition-opacity" />

          {/* Badge */}
          <div className="absolute top-2.5 left-7 z-20">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/85 text-stone-900 text-[10px] font-semibold backdrop-blur-md shadow-xs border border-white/60">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              <span>Pha Lê</span>
            </span>
          </div>

          <div className="absolute top-2.5 right-7 z-20">
            <div className="p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all">
              <ZoomIn className="w-3 h-3 text-amber-300" />
            </div>
          </div>
        </div>

        {/* Minimalist Floating Label */}
        <div className="mt-2.5 px-1.5 flex items-center justify-between">
          <div className="truncate">
            <h3 className="font-heading text-sm sm:text-base font-bold text-stone-900 truncate">
              {photo.title}
            </h3>
            <p className="text-stone-500 text-xs font-serif-cormorant italic truncate">
              {photo.caption}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => onLike(e, photo.id)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 active:scale-90 transition-transform p-1 shrink-0 ml-2"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================================
     STYLE 6: POSTCARD (Bưu Thiếp Tình Yêu Cổ Điển Airmail & Tem Thư)
     ========================================================================= */
  return (
    <div
      id={`frame-postcard-${photo.id}`}
      onClick={() => onOpenLightbox(index)}
      className={`group relative rounded-2xl p-2.5 sm:p-3 bg-[#FDFBF7] border-2 border-dashed border-amber-300/80 shadow-[0_12px_32px_rgba(180,120,40,0.12)] hover:shadow-[0_22px_48px_rgba(180,120,40,0.24)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer select-none ${className}`}
    >
      {/* Airmail Diagonal Striped Edge Accent */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-[repeating-linear-gradient(45deg,#DC2626,#DC2626_10px,#FDFBF7_10px,#FDFBF7_20px,#2563EB_20px,#2563EB_30px,#FDFBF7_30px,#FDFBF7_40px)] rounded-t-2xl opacity-70" />

      {/* Picture Aperture with Postcard Stamp */}
      <div className={`relative w-full ${aspectClass} rounded-lg overflow-hidden bg-stone-900 shadow-inner mt-1`}>
        <OptimizedImage
          src={photo.imageUrl}
          alt={photo.title}
          className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
            fitMode === 'contain' ? 'object-contain' : 'object-cover'
          }`}
          style={{ objectPosition: focalPos }}
        />

        {/* Vintage Postmark & Stamp in Corner */}
        <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
          <div className="relative p-1 rounded-sm bg-amber-50 border border-dashed border-amber-600/80 shadow-md flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span className="text-[9px] font-mono font-bold text-amber-900">AIRMAIL</span>
          </div>
        </div>

        {/* Postal Ink Stamp Circular Seal */}
        <div className="absolute bottom-2.5 left-2.5 z-20 pointer-events-none">
          <div className="w-14 h-14 rounded-full border-2 border-red-600/60 flex flex-col items-center justify-center rotate-[-12deg] bg-white/40 backdrop-blur-xs text-[7px] font-mono font-bold text-red-800 uppercase tracking-tighter">
            <span>BƯU ĐIỆN</span>
            <span>TÌNH YÊU</span>
            <span>27.09.2026</span>
          </div>
        </div>

        <div className="absolute top-2.5 left-2.5 z-20">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-950/70 text-amber-200 text-[10px] font-mono">
            <Mail className="w-2.5 h-2.5 text-amber-400" />
            <span>Bưu Thiếp</span>
          </span>
        </div>
      </div>

      {/* Postcard Message Bottom */}
      <div className="mt-2.5 px-1 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif-cormorant text-base sm:text-lg font-bold text-amber-950 truncate">
            {photo.title}
          </h3>
          <button
            type="button"
            onClick={(e) => onLike(e, photo.id)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 active:scale-90 transition-transform"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{likes}</span>
          </button>
        </div>
        <p className="text-stone-600 text-xs font-serif-cormorant italic truncate mt-0.5">
          "Thương gửi: {photo.caption}"
        </p>
      </div>
    </div>
  );
};
