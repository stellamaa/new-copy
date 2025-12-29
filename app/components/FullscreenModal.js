'use client';

import { useEffect } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export default function FullscreenModal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, cleanup } = createEventListenerManager();

    const fullscreenModal = document.getElementById('fullscreen-modal');
    const closeModal = document.getElementById('close-modal');

    const handleModalBackgroundClick = (e) => {
      if (e.target === fullscreenModal) {
        closeFullscreenModal();
      }
    };

    const closeFullscreenModal = () => {
      const modal = document.getElementById('fullscreen-modal');
      const closeDevelopment = document.getElementById('close-development');

      if (modal) {
        modal.classList.remove('active');
      }

      if (closeDevelopment) {
        closeDevelopment.style.display = '';
      }
    };

    if (fullscreenModal) {
      registerListener(fullscreenModal, 'click', handleModalBackgroundClick);
    }

    if (closeModal) {
      registerListener(closeModal, 'click', (e) => {
        e.preventDefault();
        closeFullscreenModal();
      });
    }

    // Make showFullscreenImage available globally
    window.showFullscreenImage = (imageSrc) => {
      const modal = document.getElementById('fullscreen-modal');
      const fullscreenImage = document.getElementById('fullscreen-image');
      const closeDevelopment = document.getElementById('close-development');

      if (modal && fullscreenImage) {
        fullscreenImage.src = imageSrc;
        modal.classList.add('active');

        if (closeDevelopment) {
          closeDevelopment.style.display = 'none';
        }
      }
    };

    return () => {
      cleanup();
      delete window.showFullscreenImage;
    };
  }, []);

  return (
    <div id="fullscreen-modal" className="fullscreen-modal">
      <button className="close-modal" id="close-modal">
        ×
      </button>
      <img id="fullscreen-image" className="fullscreen-image" alt="Fullscreen view" />
    </div>
  );
}




