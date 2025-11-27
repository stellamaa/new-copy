'use client';

import { useEffect } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export function useMediaPreview() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, cleanup } = createEventListenerManager();
    const isMobile = window.innerWidth <= 768;

    const restrictionRow = document.querySelector('.restriction-row');
    const mediaPreview = document.getElementById('media-preview');
    const ktVideo = document.getElementById('kt-video');
    const sculptureVideo = document.getElementById('sculpture-video');
    const flawPreview = document.getElementById('flaw-media-preview');

    const genderRow = document.querySelector('.gender-row');
    const genderPreview = document.getElementById('gender-media-preview');
    const genderVideo = document.getElementById('gender-video');

    const flawRow = document.querySelector('.flaw-row');

    if (restrictionRow && mediaPreview) {
      const showRestriction = () => {
        genderPreview?.classList.remove('active');
        flawPreview?.classList.remove('active');
        mediaPreview.classList.add('active');
        ktVideo?.play().catch(() => {});
        sculptureVideo?.play().catch(() => {});
      };

      const hideRestriction = () => {
        mediaPreview.classList.remove('active');
        ktVideo?.pause();
        sculptureVideo?.pause();
      };

      if (!isMobile) {
        registerListener(restrictionRow, 'mouseenter', showRestriction);
        registerListener(restrictionRow, 'mouseleave', hideRestriction);
      }

      const handleRestrictionClick = (e) => {
        if (!isMobile) return;
        e.preventDefault();
        e.stopPropagation();
        if (mediaPreview.classList.contains('active')) {
          hideRestriction();
        } else {
          genderPreview?.classList.remove('active');
          flawPreview?.classList.remove('active');
          showRestriction();
        }
      };
      registerListener(restrictionRow, 'click', handleRestrictionClick);

      if (isMobile) {
        const handleDocumentClick = (e) => {
          if (!restrictionRow.contains(e.target) && !mediaPreview.contains(e.target)) {
            hideRestriction();
          }
        };
        registerListener(document, 'click', handleDocumentClick);
      }
    }

    if (genderRow && genderPreview) {
      const showGender = () => {
        mediaPreview?.classList.remove('active');
        genderPreview.classList.add('active');
        genderVideo?.play().catch(() => {});
      };

      const hideGender = () => {
        genderPreview.classList.remove('active');
        genderVideo?.pause();
      };

      if (!isMobile) {
        registerListener(genderRow, 'mouseenter', showGender);
        registerListener(genderRow, 'mouseleave', hideGender);
      }

      const handleGenderClick = (e) => {
        if (!isMobile) return;
        e.preventDefault();
        e.stopPropagation();
        if (genderPreview.classList.contains('active')) {
          hideGender();
        } else {
          mediaPreview?.classList.remove('active');
          flawPreview?.classList.remove('active');
          showGender();
        }
      };
      registerListener(genderRow, 'click', handleGenderClick);

      if (isMobile) {
        const handleDocumentClick = (e) => {
          if (!genderRow.contains(e.target) && !genderPreview.contains(e.target)) {
            hideGender();
          }
        };
        registerListener(document, 'click', handleDocumentClick);
      }
    }

    if (flawRow && flawPreview) {
      const showFlaw = () => {
        mediaPreview?.classList.remove('active');
        genderPreview?.classList.remove('active');
        flawPreview.classList.add('active');
      };

      const hideFlaw = () => {
        flawPreview.classList.remove('active');
      };

      if (!isMobile) {
        registerListener(flawRow, 'mouseenter', showFlaw);
        registerListener(flawRow, 'mouseleave', hideFlaw);
      }

      const handleFlawClick = (e) => {
        if (!isMobile) return;
        e.preventDefault();
        e.stopPropagation();
        if (flawPreview.classList.contains('active')) {
          hideFlaw();
        } else {
          mediaPreview?.classList.remove('active');
          genderPreview?.classList.remove('active');
          showFlaw();
        }
      };
      registerListener(flawRow, 'click', handleFlawClick);

      if (isMobile) {
        const handleDocumentClick = (e) => {
          if (!flawRow.contains(e.target) && !flawPreview.contains(e.target)) {
            hideFlaw();
          }
        };
        registerListener(document, 'click', handleDocumentClick);
      }
    }

    return cleanup;
  }, []);
}




