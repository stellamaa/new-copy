'use client';

import { useEffect } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export function useDevelopmentGrid() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth > 768) return;

    const { registerListener, cleanup } = createEventListenerManager();

    const showFullscreenImage = (src) => {
      if (window.showFullscreenImage) {
        window.showFullscreenImage(src);
      }
    };

    const imageItems = document.querySelectorAll('.development-grid-item[data-image-src]');
    imageItems.forEach((item) => {
      const src = item.getAttribute('data-image-src');
      if (!src) return;
      const handleClick = () => {
        showFullscreenImage(src);
      };
      const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          showFullscreenImage(src);
        }
      };
      registerListener(item, 'click', handleClick);
      registerListener(item, 'keydown', handleKeyDown);
    });

    const videoItems = document.querySelectorAll('.development-grid-item[data-video-url]');
    videoItems.forEach((item) => {
      const url = item.getAttribute('data-video-url');
      if (!url) return;
      const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
      const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      };
      registerListener(item, 'click', handleClick);
      registerListener(item, 'keydown', handleKeyDown);
    });

    return cleanup;
  }, []);
}




