import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, memoryLoadedImages } from '../utils/imageOptimizer';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  fallbackSrc,
  ...rest
}) => {
  const optimizedSrc = getOptimizedImageUrl(src);
  const isAlreadyCached = memoryLoadedImages.has(optimizedSrc);
  
  const [isLoaded, setIsLoaded] = useState<boolean>(isAlreadyCached);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(optimizedSrc);

  useEffect(() => {
    const directUrl = getOptimizedImageUrl(src);
    setCurrentSrc(directUrl);
    
    if (memoryLoadedImages.has(directUrl)) {
      setIsLoaded(true);
      return;
    }

    // Check if the image is already in browser cache
    const img = new Image();
    img.src = directUrl;
    if (img.complete && img.naturalWidth > 0) {
      memoryLoadedImages.add(directUrl);
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = () => {
    memoryLoadedImages.add(currentSrc);
    setIsLoaded(true);
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else if (src && currentSrc !== src) {
      // Fallback to original URL if direct transformed URL had an issue
      setCurrentSrc(src);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Golden/Champagne Shimmer Skeleton Placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center z-0">
          <div className="w-full h-full bg-gradient-to-r from-amber-950/30 via-amber-700/20 to-amber-950/30 animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Actual Image with Fade-in and Optimized Decoding */}
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-500 ease-out ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-102 blur-xs'
        } ${className}`}
        {...rest}
      />
    </div>
  );
};
