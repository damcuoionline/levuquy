import React from 'react';
import { Heart, Calendar, Volume2, VolumeX } from 'lucide-react';

interface FloatingMobileBarProps {
  isPlaying?: boolean;
  toggleMusic?: () => void;
  onOpenGiftModal?: () => void;
  onOpenInvitation: () => void;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({
  isPlaying = false,
  toggleMusic,
  onOpenInvitation,
}) => {
  return (
    <aside 
      aria-label="Thanh điều hướng nhanh di động"
      className="fixed bottom-3 left-3 right-3 z-40 sm:hidden bg-white/95 backdrop-blur-lg border border-amber-200/90 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex items-center justify-around gap-1.5"
    >
      <button
        onClick={onOpenInvitation}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-stone-700 hover:text-amber-900 active:bg-amber-50 transition-colors"
      >
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mb-0.5" />
        <span className="text-[10px] font-medium tracking-tight">Mở Thiệp</span>
      </button>

      <a
        href="#events"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-stone-700 hover:text-amber-900 active:bg-amber-50 transition-colors"
      >
        <Calendar className="w-4 h-4 text-amber-700 mb-0.5" />
        <span className="text-[10px] font-medium tracking-tight">Lễ Vu Quy</span>
      </a>

      {/* Direct Music Toggle Button */}
      <button
        onClick={toggleMusic}
        title={isPlaying ? "Tắt âm thanh" : "Bật âm thanh"}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
          isPlaying 
            ? 'text-amber-950 bg-amber-100/80 font-bold' 
            : 'text-stone-700 hover:text-amber-900 active:bg-amber-50'
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-600 mb-0.5 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-stone-400 mb-0.5" />
        )}
        <span className="text-[10px] font-medium tracking-tight">
          {isPlaying ? 'Tắt Nhạc' : 'Bài Hát'}
        </span>
      </button>

      <a
        href="#rsvp"
        className="flex-1.5 flex items-center justify-center py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 font-bold text-[11px] shadow-sm active:scale-95 transition-all text-center"
      >
        <span>Gửi RSVP</span>
      </a>
    </aside>
  );
};
