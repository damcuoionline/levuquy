import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS, WEDDING_CONFIG } from '../data/weddingData';
import { Heart, ZoomIn, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GoldenLotusIcon, WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';
import { OptimizedImage } from './OptimizedImage';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <section
      id="gallery"
      className="py-14 sm:py-20 relative bg-[#FEFCF7] overflow-hidden"
    >
      {/* Corner Ornaments with Waving Flag & Glowing Lotus */}
      <SectionCornerDecorations
        corners={['top-left', 'top-right']}
        variant="flag-and-lotus"
        className="opacity-75"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="fly-down" duration={0.5} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-amber-50 text-red-900 border border-amber-300 shadow-2xs mb-3">
            <WavingVietnameseFlag width={22} height={14} showPole={false} />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold font-heading">
              Khoảnh Khắc Tình Yêu
            </span>
            <GoldenLotusIcon size={16} className="animate-lotus-glow" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-amber-950 tracking-tight mb-3">
            Album Ảnh Kỷ Niệm
          </h2>
          <div className="flex items-center justify-center gap-2 mx-auto mb-4">
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <GoldenLotusIcon size={18} className="text-amber-500 animate-spin-slow" />
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2 font-serif-cormorant italic text-base sm:text-lg">
            Mỗi bức ảnh là một mảnh ghép lưu giữ trọn vẹn tình yêu, ánh mắt và những nụ cười hạnh phúc nhất của Minh Cảnh & Thanh Nhi.
          </p>
        </ScrollReveal>

        {/* Filter Categories with Scroll Reveal */}
        <ScrollReveal direction="fly-up" duration={0.45} delay={0.05} className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 flex-wrap">
          {[
            { key: 'all', label: `Tất Cả (${GALLERY_PHOTOS.length})` },
            { key: 'prewedding', label: 'Pre-Wedding' },
            { key: 'studio', label: 'Studio Sang Trọng' },
            { key: 'moments', label: 'Đời Thường & Kỷ Niệm' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-stone-950 font-bold shadow-xs scale-105 border border-amber-300'
                  : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Photo Grid - Staggered directional scroll reveal fly-in for smooth animations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredPhotos.map((photo, index) => {
            const flyDir = index % 2 === 0 ? 'fly-left' : 'fly-right';
            return (
              <ScrollReveal
                key={photo.id}
                direction={flyDir}
                delay={(index % 4) * 0.05}
                duration={0.55}
                className="w-full"
              >
                <div
                  onClick={() => openLightbox(index)}
                  className="group relative h-48 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md border border-amber-200/80 cursor-pointer bg-stone-100 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <OptimizedImage
                    src={photo.imageUrl}
                    alt={photo.title}
                    containerClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-300 ease-out"
                  />

                  {/* Hover Overlay with Caption & Responsive Text Wrapping */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3 text-white">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-heading text-xs sm:text-sm font-bold text-yellow-300 truncate pr-1">
                        {photo.title}
                      </h4>
                      <ZoomIn className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-stone-200 line-clamp-2 font-serif-cormorant italic break-words">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Top Category Badge */}
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-xs text-yellow-200 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] uppercase font-semibold border border-amber-400/30">
                    {photo.category}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Google Drive Full Album CTA */}
        {WEDDING_CONFIG.googleDriveUrl && (
          <ScrollReveal direction="fly-up" duration={0.45} delay={0.1} className="mt-10 sm:mt-12 text-center">
            <a
              href={WEDDING_CONFIG.googleDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-amber-50 hover:bg-amber-100/80 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300/80 shadow-xs hover:shadow-md transition-all active:scale-95 text-center max-w-full break-words"
            >
              <span>Xem Toàn Bộ Album Ảnh Gốc Đầy Đủ Trên Google Drive</span>
              <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
            </a>
          </ScrollReveal>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            title="Ảnh trước (Mũi tên trái)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Main Image Container */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center relative px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[lightboxIndex].imageUrl}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-h-[66vh] sm:max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />
            {/* Caption Card */}
            <div className="mt-3 text-center text-white max-w-xl px-3 break-words">
              <h3 className="font-heading text-base sm:text-lg font-bold text-yellow-300">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif-cormorant italic mt-0.5">
                “{filteredPhotos[lightboxIndex].caption}”
              </p>
              <span className="text-[10px] sm:text-[11px] text-stone-400 mt-1 block">
                Ảnh {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            title="Ảnh sau (Mũi tên phải)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

