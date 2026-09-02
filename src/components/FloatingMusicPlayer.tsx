import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Disc3, Music2 } from 'lucide-react';
import { weddingAudio, SongTrack, AudioState } from './AudioEngine';

export const FloatingMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(weddingAudio.getStatus());
  const [currentTrack, setCurrentTrack] = useState<SongTrack>(weddingAudio.getCurrentTrack());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state: AudioState) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrack(state.currentTrack);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    weddingAudio.toggle();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.nextTrack();
  };

  return (
    <div
      aria-label="Trình phát nhạc nền đám cưới"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center select-none"
    >
      {/* Floating Compact Player Pill / Disc */}
      <div 
        className={`flex items-center gap-2 bg-[#FFFDF7]/95 backdrop-blur-md border-2 border-amber-300/90 shadow-[0_10px_35px_rgba(217,119,6,0.22)] rounded-full p-1.5 transition-all duration-300 ${
          isExpanded ? 'pr-3.5' : 'pr-2 sm:pr-3.5'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Spinning Vinyl Disc Button */}
        <button
          type="button"
          onClick={handleToggle}
          title={isPlaying ? "Tạm dừng nhạc (Pause)" : "Phát nhạc nền (Play)"}
          className="relative group focus:outline-hidden"
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-900 border-2 border-amber-300 flex items-center justify-center shadow-md transition-transform duration-300 active:scale-95 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            {/* Vinyl record grooves */}
            <div className="absolute inset-1 rounded-full border border-stone-700/80 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-stone-700/40 pointer-events-none" />
            
            {/* Center label */}
            <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
            </div>

            {/* Play/Pause Overlay indicator on hover */}
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white fill-white" />
              ) : (
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              )}
            </div>
          </div>

          {/* Floating musical note animation when playing */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          )}
        </button>

        {/* Track info & controls */}
        <div 
          onClick={handleToggle}
          className="flex flex-col cursor-pointer max-w-[130px] sm:max-w-[170px] pl-1 pr-0.5"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-800 flex items-center gap-0.5">
              {isPlaying ? (
                <>
                  <Volume2 className="w-3 h-3 text-amber-600 animate-pulse" />
                  <span>Đang phát</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-stone-400" />
                  <span>Tạm dừng</span>
                </>
              )}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-0.5 h-2">
                <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-1.5" />
                <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-2" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 bg-amber-600 rounded-full animate-pulse h-1" style={{ animationDelay: '0.4s' }} />
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <p className="text-[11px] sm:text-xs font-bold text-amber-950 truncate leading-tight">
              {currentTrack.title}
            </p>
            <span className="text-[10px] text-stone-500 hidden sm:inline truncate">
              - {currentTrack.artist}
            </span>
          </div>
        </div>

        {/* Play/Pause & Next Button Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleToggle}
            title={isPlaying ? "Tạm dừng" : "Phát tiếp"}
            className="p-1.5 rounded-full hover:bg-amber-200/60 text-stone-700 hover:text-amber-950 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-stone-800" />
            ) : (
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-stone-800 ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            title="Đổi bài tiếp theo"
            className="p-1.5 rounded-full hover:bg-amber-200/60 text-stone-700 hover:text-amber-950 active:scale-95 transition-all"
          >
            <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
