'use client';

import { useEffect } from 'react';
import { mediaFiles } from '../constants/mediaFiles';
import { useThreeJS } from '../hooks/useThreeJS';
import { useDevelopmentText } from '../hooks/useDevelopmentText';
import { useDevelopmentGrid } from '../hooks/useDevelopmentGrid';
import FullscreenModal from './FullscreenModal';

export default function DevelopmentPage() {
  // Ensure videos autoplay on mobile
  useEffect(() => {
    const videos = document.querySelectorAll('.development-grid-item video');
    videos.forEach((video) => {
      if (video instanceof HTMLVideoElement) {
        video.play().catch(() => {
          // Ignore autoplay errors (browser may block autoplay)
        });
      }
    });
  }, []);
  const handleMediaClick = (media) => {
    if (media.type === 'video' && media.url) {
      window.open(media.url, '_blank', 'noopener,noreferrer');
    } else if (media.type === 'image') {
      if (window.showFullscreenImage) {
        window.showFullscreenImage(media.src);
      }
    }
  };

  useThreeJS(handleMediaClick);
  useDevelopmentText();
  useDevelopmentGrid();

  return (
    <div className="page development-page" id="development-page">
      <button className="close-development" id="close-development">
        ×
      </button>
      <div id="three-container"></div>

      <div className="development-grid" id="development-grid">
        {mediaFiles.map((media) => {
          if (media.type === 'image') {
            return (
              <div
                key={media.src}
                className="development-grid-item"
                data-image-src={media.src}
                role="button"
                tabIndex={0}
              >
                <img src={media.src} alt="Project still" />
              </div>
            );
          }

          return (
            <div
              key={media.src}
              className="development-grid-item"
              data-video-url={media.url || ''}
              role="button"
              tabIndex={0}
            >
              <video 
                src={media.src} 
                muted 
                loop 
                playsInline 
                autoPlay
                preload="auto"
                style={{ pointerEvents: 'none' }}
              />
              {media.url && <span className="development-grid-item-label">Open project</span>}
            </div>
          );
        })}
      </div>
      <FullscreenModal />
    </div>
  );
}

