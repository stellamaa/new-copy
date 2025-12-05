'use client';

import { useState, useRef, useEffect } from 'react';
import { mediaFiles } from '../constants/mediaFiles';
import { useThreeJSAlternative } from '../hooks/useThreeJSAlternative';
import { useDevelopmentText } from '../hooks/useDevelopmentText';
import FullscreenModal from './FullscreenModal';

export default function DevelopmentPageAlternative() {
  const [isGridMode, setIsGridMode] = useState(true); // Grid is default
  const threeContainerRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  // Pass isGridMode to the hook - it will initialize when grid mode is false
  // On mobile, always pass true to prevent 3D initialization
  useThreeJSAlternative(threeContainerRef, handleMediaClick, isGridMode || isMobile);
  useDevelopmentText();

  const toggleGridMode = () => {
    // Prevent toggle on mobile - always stay in grid mode
    if (isMobile) {
      return;
    }
    setIsGridMode(!isGridMode);
  };

  // Load and play videos only when development page is active and grid mode is on
  useEffect(() => {
    const loadVideos = () => {
      const developmentPage = document.getElementById('development-page');
      const isPageActive = developmentPage?.classList.contains('active');
      
      if (isGridMode && isPageActive) {
        const videos = document.querySelectorAll('.grid-item-video');
        videos.forEach((video) => {
          if (video instanceof HTMLVideoElement) {
            // Only load video when page is active
            if (video.preload === 'none') {
              video.preload = 'auto';
              video.load();
            }
            video.play().catch(() => {
              // Ignore autoplay errors (browser may block autoplay)
            });
          }
        });
      }
    };

    // Check immediately
    loadVideos();

    // Also listen for when the page becomes active
    const developmentPage = document.getElementById('development-page');
    if (developmentPage) {
      const observer = new MutationObserver(() => {
        loadVideos();
      });
      observer.observe(developmentPage, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => observer.disconnect();
    }
  }, [isGridMode]);

  // Typing animation for "recent projects" text
  useEffect(() => {
    if (isGridMode) {
      setDisplayedText('');
      let currentIndex = 0;
      const text = 'recent projects';
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // 50ms per letter

      return () => clearInterval(typingInterval);
    }
  }, [isGridMode]);

  return (
    <div className="page development-page" id="development-page">
      <button className="close-development" id="close-development">
        ×
      </button>
      {!isMobile && (
        <button className="grid-toggle" id="grid-toggle" onClick={toggleGridMode}>
          {isGridMode ? '3D' : 'grid'}
        </button>
      )}
      <div 
        id="three-container" 
        ref={threeContainerRef} 
        className={(!isGridMode && !isMobile) ? 'active' : ''}
      ></div>
      <div className="development-text">
        <p>
          A few projects made with React, Typescript, Javascript, generative art sketches made with p5.js. If you would
          like to see my UX case studies send me an email.{' '}
        </p>
      </div>
      <div className="recent-projects-title">{isMounted && isMobile ? displayedText : 'recent projects'}</div>
      <div 
        className={`development-grid ${isGridMode ? 'active' : ''}`} 
        id="development-grid"
      >
        {mediaFiles.map((media) => {
          // Extract title from filename or use URL domain for videos
          const getTitle = () => {
            if (media.title) {
                return media.title;
              }
            if (media.type === 'video' && media.url) {
              try {
                const url = new URL(media.url);
                const domain = url.hostname.replace('www.', '').split('.')[0];
                // Capitalize first letter only
                return domain.charAt(0).toUpperCase() + domain.slice(1);
              } catch {
                return 'Video';
              }
            }
            // Extract name from image path (e.g., '/assets/image1.png' -> 'image1')
            const filename = media.src.split('/').pop().replace(/\.[^/.]+$/, '');
            return filename.replace(/[^a-zA-Z0-9]/g, '') || 'Image';
          };

          const title = getTitle();

          if (media.type === 'image') {
            return (
              <div
                key={media.src}
                className="development-grid-item development-grid-item-image"
                data-image-src={media.src}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (window.showFullscreenImage) {
                    window.showFullscreenImage(media.src);
                  }
                }}
              >
                <div className="grid-item-title">{title}</div>
                <img src={media.src} alt={title} className="grid-item-image" />
              </div>
            );
          }

          return (
            <div
              key={media.src}
              className="development-grid-item development-grid-item-video"
              data-video-url={media.url || ''}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (media.url) {
                  window.open(media.url, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <div className="grid-item-title">{title}</div>
              <video 
                src={media.src} 
                muted 
                loop 
                playsInline 
                autoPlay
                preload="none" 
                className="grid-item-video"
                onLoadedData={(e) => {
                  // Ensure video plays when loaded
                  e.target.play().catch(() => {
                    // Ignore autoplay errors
                  });
                }}
              />
            </div>
          );
        })}
      </div>
      <FullscreenModal />
    </div>
  );
}

