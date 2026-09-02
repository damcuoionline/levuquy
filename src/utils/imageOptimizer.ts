/**
 * Image URL optimization & High-Speed Preloading Service
 */

// Global set to keep track of loaded images in memory so we don't flash skeletons on already loaded images
export const memoryLoadedImages = new Set<string>();

/**
 * Converts GitHub repository URLs to direct high-speed CDN / Raw URLs to bypass redirect hops
 */
export function getOptimizedImageUrl(url: string): string {
  if (!url) return '';
  
  // Convert github blob URL with raw=true to raw.githubusercontent.com
  if (url.includes('github.com') && url.includes('/blob/main/')) {
    return url
      .replace('https://github.com/', 'https://raw.githubusercontent.com/')
      .replace('/blob/main/', '/main/')
      .replace('?raw=true', '');
  }
  
  return url;
}

/**
 * Preload an array of image URLs in the background into browser cache
 */
export function preloadImages(urls: string[], priority: 'high' | 'low' = 'low'): Promise<void[]> {
  const optimizedUrls = urls.map(getOptimizedImageUrl).filter(Boolean);
  
  const promises = optimizedUrls.map((src) => {
    return new Promise<void>((resolve) => {
      if (memoryLoadedImages.has(src)) {
        resolve();
        return;
      }
      
      const img = new Image();
      img.decoding = 'async';
      if (priority === 'high') {
        img.fetchPriority = 'high';
      }
      
      img.onload = () => {
        memoryLoadedImages.add(src);
        resolve();
      };
      
      img.onerror = () => {
        // Resolve anyway so Promise.all doesn't fail
        resolve();
      };
      
      img.src = src;
    });
  });

  return Promise.all(promises);
}
