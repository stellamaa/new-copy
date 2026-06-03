'use client';

import { useEffect } from 'react';
import { mediaFiles } from '../constants/mediaFiles';
import { useThreeJS } from '../hooks/useThreeJS';
import { useDevelopmentText } from '../hooks/useDevelopmentText';
import { useDevelopmentGrid } from '../hooks/useDevelopmentGrid';
import FullscreenModal from './FullscreenModal';
import CloseButton from './CloseButton';

export default function DevelopmentPage() {
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
      <CloseButton id="close-development" className="close-development" ariaLabel="Close development page" />
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
              <video src={media.src} muted loop playsInline preload="metadata" />
              {media.url && <span className="development-grid-item-label">Open project</span>}
            </div>
          );
        })}
      </div>
      <FullscreenModal />
    </div>
  );
}

