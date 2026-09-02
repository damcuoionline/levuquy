import React, { useState } from 'react';
import { WEDDING_EVENTS, EventDetail } from '../data/weddingData';
import { Calendar, Clock, MapPin, Navigation, Sparkles, Heart, Gift, Camera, Utensils, Music, Car, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GoldenLotusIcon, WavingVietnameseFlag, SectionCornerDecorations } from './PatrioticEmblem';

export const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(WEDDING_EVENTS[0].id);

  const activeEvent = WEDDING_EVENTS.find((e) => e.id === activeTab) || WEDDING_EVENTS[0];

  const getTimelineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-3.5 h-3.5 text-amber-700" />;
      case 'Gift': return <Gift className="w-3.5 h-3.5 text-amber-700" />;
      case 'Heart': return <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />;
      case 'Camera': return <Camera className="w-3.5 h-3.5 text-amber-800" />;
      case 'Utensils': return <Utensils className="w-3.5 h-3.5 text-amber-800" />;
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
      case 'Music': return <Music className="w-3.5 h-3.5 text-amber-700" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const handleAddToCal = (event: EventDetail) => {
    const title = encodeURIComponent(event.calendarData.title);
    const details = encodeURIComponent(event.calendarData.description);
    const loc = encodeURIComponent(event.calendarData.location);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${event.calendarData.startTime}/${event.calendarData.endTime}&details=${details}&location=${loc}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="events"
      className="py-14 sm:py-20 relative bg-[#FEFDF9] overflow-hidden"
    >
      {/* Refined Corner Ornaments with Flag and Lotus */}
      <SectionCornerDecorations
        corners={['top-left', 'top-right']}
        variant="flag-and-lotus"
        className="opacity-80"
      />

      {/* Decorative Floating Lotus Elements */}
      <div className="absolute top-12 left-4 pointer-events-none opacity-25 hidden sm:block">
        <GoldenLotusIcon size={60} className="animate-lotus-glow" />
      </div>
      <div className="absolute top-12 right-4 pointer-events-none opacity-25 hidden sm:block">
        <GoldenLotusIcon size={60} className="animate-lotus-glow" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Motion Fly-Down */}
        <ScrollReveal direction="fly-down" duration={0.45} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-amber-50 text-red-900 border border-amber-300 shadow-2xs mb-3">
            <WavingVietnameseFlag width={22} height={14} showPole={false} />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold font-heading">
              Thông Tin Ngày Trọng Đại • Nhà Gái
            </span>
            <GoldenLotusIcon size={16} className="animate-lotus-glow" />
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-amber-950 tracking-tight mb-3">
            Lễ Vu Quy & Tiệc Mừng
          </h2>
          <div className="flex items-center justify-center gap-2 mx-auto mb-4">
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
            <GoldenLotusIcon size={18} className="text-amber-500 animate-spin-slow" />
            <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2 font-serif-cormorant italic text-base sm:text-lg">
            Kính mời quý quan khách, người thân và bạn bè cùng theo dõi các mốc thời gian và địa điểm tổ chức để ngày vui của Thanh Nhi được trọn vẹn nhất.
          </p>
        </ScrollReveal>

        {/* Event Selection Tabs */}
        <ScrollReveal direction="fly-up" duration={0.45} delay={0.05} className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-amber-100/70 border border-amber-200/90 shadow-inner max-w-md w-full gap-1.5">
            {WEDDING_EVENTS.map((event) => (
              <button
                key={event.id}
                onClick={() => setActiveTab(event.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-center ${
                  activeTab === event.id
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-stone-950 font-bold shadow-xs border border-amber-300 scale-[1.02]'
                    : 'text-stone-700 hover:text-amber-950 hover:bg-white/70'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-amber-900 shrink-0" />
                <span className="whitespace-nowrap font-heading tracking-tight">{event.tabName || event.title}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Active Event Showcase Card */}
        <ScrollReveal direction="zoom-blur" duration={0.5} delay={0.1}>
          <div className="bg-gradient-to-b from-amber-50/60 to-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-lg border border-amber-200/90 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 relative overflow-hidden">
            {/* Corner Decorative Lotus Watermark */}
            <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-10">
              <GoldenLotusIcon size={180} />
            </div>

            {/* Left Column: Event Core Info & Timeline */}
            <div className="lg:col-span-6 flex flex-col relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-800 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-2 self-start font-heading border border-red-200 shadow-2xs">
                <GoldenLotusIcon size={14} />
                <span>{activeEvent.subtitle}</span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-amber-950 mb-3 sm:mb-4">
                {activeEvent.title}
              </h3>

              {/* Time & Date Block */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/80 space-y-2.5 mb-5 shadow-2xs">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-950 text-xs sm:text-sm md:text-base">
                      {activeEvent.timeStr}
                    </p>
                    <p className="text-xs text-stone-600">{activeEvent.dateStr}</p>
                    <p className="text-[11px] sm:text-xs text-red-800 font-medium italic mt-0.5">
                      ({activeEvent.lunarDateStr})
                    </p>
                  </div>
                </div>

                <div className="border-t border-amber-100 pt-2.5 flex items-start gap-2.5 sm:gap-3">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-950 text-xs sm:text-sm">
                      {activeEvent.locationName}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                      {activeEvent.address}
                    </p>
                  </div>
                </div>

                {activeEvent.dressCodeTip && (
                  <div className="border-t border-amber-100 pt-2.5 flex items-start gap-2.5 sm:gap-3">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-stone-600 italic">
                      <span className="font-semibold text-stone-800">Trang phục gợi ý:</span> {activeEvent.dressCodeTip}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <a
                  href={activeEvent.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[150px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-500 hover:to-yellow-400 text-stone-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all border border-amber-200"
                >
                  <Navigation className="w-3.5 h-3.5 text-stone-950" />
                  <span>Chỉ Đường Google Maps</span>
                </a>

                <button
                  onClick={() => handleAddToCal(activeEvent)}
                  className="py-2.5 px-4 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-amber-950 border border-amber-300/80 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-800" />
                  <span>Lưu Vào Lịch</span>
                </button>
              </div>

              {/* Timeline Breakdown */}
              <div className="mt-1">
                <h4 className="font-heading text-sm sm:text-base font-bold text-amber-950 mb-2.5 flex items-center gap-2">
                  <GoldenLotusIcon size={16} />
                  <span>Lịch Trình Chi Tiết</span>
                </h4>
                <div className="space-y-2 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-200">
                  {activeEvent.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 relative pl-0.5">
                      <div className="w-6 h-6 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center shrink-0 z-10 shadow-2xs">
                        {getTimelineIcon(step.icon)}
                      </div>
                      <div className="bg-white hover:bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/80 flex-1 transition-colors">
                        <span className="text-xs font-bold text-amber-950 block">
                          {step.time}
                        </span>
                        <span className="text-xs text-stone-700 leading-snug">
                          {step.activity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Google Maps Interactive Preview */}
            <div className="lg:col-span-6 flex flex-col relative z-10">
              <div className="h-full min-h-[300px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-amber-200/80 shadow-2xs relative bg-amber-50/50 flex flex-col">
                <div className="p-2.5 sm:p-3 bg-amber-100/60 border-b border-amber-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-medium text-amber-950">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span className="truncate max-w-[200px] sm:max-w-[260px]">{activeEvent.locationName}</span>
                  </div>
                  <a
                    href={activeEvent.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <span>Mở bản đồ</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Dynamic Map Iframe */}
                <iframe
                  title={`Bản đồ ${activeEvent.title}`}
                  src={activeEvent.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="flex-1 w-full min-h-[260px] sm:min-h-[320px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="p-2.5 bg-amber-50/80 text-center border-t border-amber-200">
                  <p className="text-[11px] text-stone-600">
                    Tip: Nhấp &apos;Chỉ Đường Google Maps&apos; để mở ứng dụng Google Maps trực tiếp trên điện thoại.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

