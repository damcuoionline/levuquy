import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS, WEDDING_CONFIG, PhotoFrameStyle } from '../data/weddingData';
import {
  Heart,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  LayoutGrid,
  Columns,
  Image as ImageIcon,
  Check,
  Palette,
  Camera,
  Film,
  Mail,
  Layers,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GoldenLotusIcon, WavingVietnameseFlag } from './PatrioticEmblem';
import { WeddingPictureFrame } from './WeddingPictureFrame';

type GalleryLayout = 'grid' | 'masonry' | 'curated';
type FitMode = 'cover' | 'contain';
type StyleFilter = 'auto' | PhotoFrameStyle;

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<GalleryLayout>('grid');
  const [fitMode, setFitMode] = useState<FitMode>('cover');
  const [styleMode, setStyleMode] = useState<StyleFilter>('auto');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, number>>({});

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const handleLikePhoto = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxZoom(1);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setLightboxZoom(1);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
      setLightboxZoom(1);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
      setLightboxZoom(1);
    }
  };

  const toggleZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxZoom((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
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
      className="py-16 sm:py-24 relative bg-gradient-to-b from-[#FEFCF7] via-[#FFFDF9] to-[#FEFDF9] overflow-hidden"
    >
      {/* Subtle Background Textures & Atmosphere */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#D97706_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="fly-down" duration={0.5} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-amber-50 text-red-900 border border-amber-300 shadow-2xs mb-3.5">
            <WavingVietnameseFlag width={22} height={14} showPole={false} />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold font-heading whitespace-nowrap">
              Khung Ảnh Cưới • Đa Phong Cách
            </span>
            <GoldenLotusIcon size={16} className="animate-lotus-glow" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-amber-950 tracking-tight mb-3 leading-tight md:whitespace-nowrap text-balance">
            <span className="inline-block whitespace-nowrap">Album Ảnh</span>{' '}
            <span className="inline-block whitespace-nowrap">Kỷ Niệm</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mx-auto mb-4">
            <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <GoldenLotusIcon size={20} className="text-amber-500 animate-spin-slow" />
            <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed px-2 font-serif-cormorant italic">
            Mỗi bức ảnh mang một phong cách nghệ thuật riêng biệt: từ Khung Hoàng Gia sang trọng, Thước Phim Điện Ảnh 35mm hoài niệm, Ảnh Polaroid ghi chú kỷ niệm, Bìa Tạp Chí Vogue thời thượng đến Kính Pha Lê và Bưu Thiếp Tình Yêu.
          </p>
        </ScrollReveal>

        {/* Master Control Hub: Categories, Styles, Display Fit, and Layout */}
        <div className="flex flex-col gap-3.5 mb-8 sm:mb-10 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-amber-200/80 shadow-[0_4px_24px_rgba(180,120,40,0.08)]">
          {/* Row 1: Categories & Layout/Fit Switchers */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 pb-3 border-b border-amber-100">
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap w-full lg:w-auto">
              {[
                { key: 'all', label: `Tất Cả (${GALLERY_PHOTOS.length})` },
                { key: 'prewedding', label: 'Pre-Wedding' },
                { key: 'studio', label: 'Studio Sang Trọng' },
                { key: 'moments', label: 'Đời Thường & Kỷ Niệm' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  id={`gallery-filter-${cat.key}`}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.key
                      ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white font-semibold shadow-md shadow-amber-900/15 scale-102'
                      : 'bg-stone-100/90 text-stone-700 hover:bg-amber-100/60 hover:text-amber-900 border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right Controls: Fit Mode & Layout Mode */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center w-full lg:w-auto">
              {/* Display Fit Mode Toggle */}
              <div className="flex items-center bg-stone-100/90 p-1 rounded-xl border border-stone-200/80">
                <button
                  id="btn-fit-cover"
                  type="button"
                  onClick={() => setFitMode('cover')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                    fitMode === 'cover'
                      ? 'bg-white text-amber-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Lấp đầy khung tranh theo tỷ lệ chuẩn nghệ thuật"
                >
                  {fitMode === 'cover' && <Check className="w-3 h-3 text-amber-600" />}
                  <span>Chuẩn Khung Tranh</span>
                </button>
                <button
                  id="btn-fit-contain"
                  type="button"
                  onClick={() => setFitMode('contain')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                    fitMode === 'contain'
                      ? 'bg-white text-amber-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Hiển thị trọn vẹn 100% bức ảnh gốc không cắt viền"
                >
                  {fitMode === 'contain' && <Check className="w-3 h-3 text-amber-600" />}
                  <span>Trọn Hình 100%</span>
                </button>
              </div>

              {/* Layout Mode Switcher */}
              <div className="flex items-center bg-stone-100/90 p-1 rounded-xl border border-stone-200/80 shrink-0">
                <button
                  id="btn-layout-grid"
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    layoutMode === 'grid'
                      ? 'bg-white text-amber-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Lưới đối xứng sang trọng"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Khung Chuẩn</span>
                  <span className="sm:hidden">Lưới</span>
                </button>

                <button
                  id="btn-layout-curated"
                  type="button"
                  onClick={() => setLayoutMode('curated')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    layoutMode === 'curated'
                      ? 'bg-white text-amber-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Bố cục tuyển chọn tranh tiêu điểm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Tiêu Điểm</span>
                  <span className="sm:hidden">Tiêu điểm</span>
                </button>

                <button
                  id="btn-layout-masonry"
                  type="button"
                  onClick={() => setLayoutMode('masonry')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    layoutMode === 'masonry'
                      ? 'bg-white text-amber-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Bố cục so le mềm mại"
                >
                  <Columns className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">So Le</span>
                  <span className="sm:hidden">So le</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Artistic Frame Styles Selector (Nhiều phong cách đặc sắc) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 text-amber-950 text-xs font-bold font-heading shrink-0">
              <Palette className="w-4 h-4 text-amber-600" />
              <span>Chọn Phong Cách Trưng Bày:</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
              {[
                {
                  id: 'auto',
                  label: 'Đa Sắc Nghệ Thuật',
                  shortLabel: 'Đa Sắc',
                  icon: Sparkles,
                  color: 'text-amber-600',
                  tip: 'Mỗi bức ảnh mang một phong cách riêng biệt được tuyển chọn',
                },
                {
                  id: 'royal-gold',
                  label: 'Khung Hoàng Gia',
                  shortLabel: 'Hoàng Gia',
                  icon: Layers,
                  color: 'text-amber-500',
                  tip: 'Khung tranh mạ vàng cổ điển sang trọng',
                },
                {
                  id: 'polaroid',
                  label: 'Ảnh Polaroid',
                  shortLabel: 'Polaroid',
                  icon: Camera,
                  color: 'text-stone-600',
                  tip: 'Ảnh vintage chụp lấy liền dán băng keo washi',
                },
                {
                  id: 'film-strip',
                  label: 'Cuộn Phim 35mm',
                  shortLabel: 'Phim 35mm',
                  icon: Film,
                  color: 'text-orange-500',
                  tip: 'Thước phim điện ảnh Kodak Portra hoài niệm',
                },
                {
                  id: 'editorial',
                  label: 'Tạp Chí Vogue',
                  shortLabel: 'Tạp Chí',
                  icon: Sparkles,
                  color: 'text-rose-500',
                  tip: 'Bìa tạp chí thời trang cưới cao cấp',
                },
                {
                  id: 'floating-glass',
                  label: 'Kính Pha Lê',
                  shortLabel: 'Pha Lê',
                  icon: Sparkles,
                  color: 'text-cyan-500',
                  tip: 'Kính acrylic vát cạnh pha lê không viền',
                },
                {
                  id: 'postcard',
                  label: 'Bưu Thiếp Kỷ Niệm',
                  shortLabel: 'Bưu Thiếp',
                  icon: Mail,
                  color: 'text-blue-500',
                  tip: 'Bưu thiếp tình yêu hoài niệm kèm mộc bưu điện',
                },
              ].map((style) => {
                const IconComponent = style.icon;
                const isActive = styleMode === style.id;

                return (
                  <button
                    key={style.id}
                    id={`btn-style-${style.id}`}
                    type="button"
                    onClick={() => setStyleMode(style.id as StyleFilter)}
                    title={style.tip}
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs transition-all duration-300 ${
                      isActive
                        ? 'bg-amber-950 text-amber-200 font-bold shadow-sm ring-2 ring-amber-400/50 scale-102'
                        : 'bg-stone-100/90 text-stone-700 hover:bg-amber-100/70 hover:text-amber-950 border border-stone-200/60'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : style.color}`} />
                    <span className="hidden md:inline">{style.label}</span>
                    <span className="md:hidden">{style.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 1. CLASSIC GALLERY WALL (Khung Chuẩn Đối Xứng) */}
        {layoutMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {filteredPhotos.map((photo, index) => {
              const isLandscape = photo.orientation === 'landscape';
              const likes = (likedPhotos[photo.id] || 0) + (25 + ((index * 9) % 37));

              return (
                <div
                  key={photo.id}
                  className={isLandscape ? 'sm:col-span-2' : 'col-span-1'}
                >
                  <WeddingPictureFrame
                    photo={photo}
                    index={index}
                    fitMode={fitMode}
                    styleMode={styleMode}
                    likes={likes}
                    onLike={handleLikePhoto}
                    onOpenLightbox={openLightbox}
                    aspectOverride={isLandscape ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[3/4]'}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* 2. CURATED SHOWCASE WALL (Bố Cục Tranh Tiêu Điểm) */}
        {layoutMode === 'curated' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {filteredPhotos.map((photo, index) => {
              const likes = (likedPhotos[photo.id] || 0) + (25 + ((index * 9) % 37));
              const isFirst = index === 0;
              const isLandscape = photo.orientation === 'landscape';

              return (
                <div
                  key={photo.id}
                  className={
                    isFirst
                      ? 'sm:col-span-2 row-span-2'
                      : isLandscape
                      ? 'sm:col-span-2'
                      : 'col-span-1'
                  }
                >
                  <WeddingPictureFrame
                    photo={photo}
                    index={index}
                    fitMode={fitMode}
                    styleMode={styleMode}
                    likes={likes}
                    onLike={handleLikePhoto}
                    onOpenLightbox={openLightbox}
                    aspectOverride={
                      isFirst
                        ? 'aspect-[4/5] sm:aspect-[3/4]'
                        : isLandscape
                        ? 'aspect-[16/10] sm:aspect-[16/9]'
                        : 'aspect-[3/4]'
                    }
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* 3. STAGGERED MASONRY GALLERY (So Le Dáng Tranh Thanh Thoát) */}
        {layoutMode === 'masonry' && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 lg:gap-7 space-y-5 sm:space-y-6 lg:space-y-7">
            {filteredPhotos.map((photo, index) => {
              const isLandscape = photo.orientation === 'landscape';
              const likes = (likedPhotos[photo.id] || 0) + (25 + ((index * 9) % 37));

              const aspectPattern = isLandscape
                ? 'aspect-[16/10]'
                : index % 3 === 0
                ? 'aspect-[3/4]'
                : index % 3 === 1
                ? 'aspect-[4/5]'
                : 'aspect-[2/3]';

              return (
                <div key={photo.id} className="break-inside-avoid">
                  <WeddingPictureFrame
                    photo={photo}
                    index={index}
                    fitMode={fitMode}
                    styleMode={styleMode}
                    likes={likes}
                    onLike={handleLikePhoto}
                    onOpenLightbox={openLightbox}
                    aspectOverride={aspectPattern}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Google Drive Original High-Res Album Link */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-red-50 to-amber-50 border border-amber-300/80 shadow-[0_8px_30px_rgba(180,83,9,0.08)]">
            <div className="flex items-center gap-3 text-amber-950 font-medium text-xs sm:text-sm">
              <ImageIcon className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Xem trọn bộ album ảnh cưới gốc chất lượng siêu nét (Full HD / 4K):</span>
            </div>
            <a
              id="btn-view-drive-gallery"
              href={WEDDING_CONFIG.googleDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-98"
            >
              <span>Mở Google Drive Album</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* LUXURY FULLSCREEN LIGHTBOX WITH ZOOM & STYLE INFO */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          id="wedding-gallery-lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 transition-all duration-300 select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Khung {lightboxIndex + 1} / {filteredPhotos.length}</span>
              {filteredPhotos[lightboxIndex].dateTag && (
                <span className="hidden sm:inline text-stone-400 text-xs border-l border-stone-600 pl-2">
                  {filteredPhotos[lightboxIndex].dateTag}
                </span>
              )}
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              {/* Zoom In/Out Toggle */}
              <button
                type="button"
                onClick={toggleZoom}
                className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-amber-600 hover:text-white border border-white/20 transition-all"
                title={`Thu phóng ảnh (Hiện tại: ${lightboxZoom}x)`}
              >
                {lightboxZoom > 1 ? (
                  <ZoomOut className="w-4 h-4 text-amber-300" />
                ) : (
                  <ZoomIn className="w-4 h-4 text-amber-300" />
                )}
              </button>

              <button
                type="button"
                onClick={(e) => handleLikePhoto(e, filteredPhotos[lightboxIndex].id)}
                className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-rose-600 hover:text-white border border-white/20 transition-all"
                title="Thả tim"
              >
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 transition-all"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={prevPhoto}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-amber-600 border border-white/20 transition-all z-30 transform active:scale-90"
            title="Ảnh trước (Mũi tên trái)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextPhoto}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-amber-600 border border-white/20 transition-all z-30 transform active:scale-90"
            title="Ảnh sau (Mũi tên phải)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Picture Frame Exhibition Presentation */}
          <div
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center p-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Framed Artwork Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-amber-300/80 shadow-[0_30px_70px_rgba(0,0,0,0.9)] bg-stone-950 max-h-[75vh] flex items-center justify-center p-1 sm:p-2">
              <img
                src={filteredPhotos[lightboxIndex].imageUrl}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto select-none transition-transform duration-300"
                style={{
                  transform: `scale(${lightboxZoom})`,
                }}
              />
            </div>

            {/* Gallery Label Below Image */}
            <div className="mt-3 text-center max-w-2xl px-5 py-2.5 rounded-xl bg-stone-900/85 backdrop-blur-md border border-amber-300/30 shadow-lg">
              <h3 className="text-white font-heading font-bold text-base sm:text-xl drop-shadow-md text-amber-200">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-serif-cormorant italic mt-0.5 text-stone-200">
                {filteredPhotos[lightboxIndex].caption}
              </p>
              {filteredPhotos[lightboxIndex].quote && (
                <p className="text-amber-400/90 text-xs font-serif-cormorant italic mt-1 border-t border-white/10 pt-1">
                  "{filteredPhotos[lightboxIndex].quote}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
