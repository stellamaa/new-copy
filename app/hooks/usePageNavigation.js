'use client';

import { useLayoutEffect, useRef } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export function usePageNavigation() {
  const isAboutOpenRef = useRef(false);
  const isArtOpenRef = useRef(false);
  const currentPageRef = useRef('landing');

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, cleanup } = createEventListenerManager();

    function goToLanding() {
      const landingPage = document.getElementById('landing-page');
      const developmentPage = document.getElementById('development-page');
      const aboutPage = document.getElementById('about-page');
      const artPage = document.getElementById('art-page');
      const nav = document.querySelector('.nav');

      developmentPage?.classList.remove('active');
      aboutPage?.classList.remove('active');
      artPage?.classList.remove('active');
      isAboutOpenRef.current = false;
      isArtOpenRef.current = false;

      if (landingPage) {
        landingPage.classList.remove('hidden');
        // Force display to ensure it's visible - clear all inline styles first
        landingPage.style.display = '';
        landingPage.style.opacity = '';
        landingPage.style.visibility = '';
        landingPage.style.zIndex = '';
        // Then set display after a brief moment to override CSS
        setTimeout(() => {
          if (landingPage) {
            landingPage.style.display = 'flex';
          }
        }, 50);
      }
      if (nav) {
        nav.style.display = 'flex';
      }
      currentPageRef.current = 'landing';

      if (typeof window.reloadRandomImages === 'function') {
        window.reloadRandomImages();
      }
    }

    function goToDevelopment() {
      const landingPage = document.getElementById('landing-page');
      const developmentPage = document.getElementById('development-page');

      if (landingPage) {
        // Hide immediately
        landingPage.style.display = 'none';
        landingPage.style.opacity = '0';
        landingPage.style.visibility = 'hidden';
        landingPage.style.zIndex = '-1';
        landingPage.classList.add('hidden');
      }
      developmentPage?.classList.add('active');
      currentPageRef.current = 'development';
      
      // Trigger Three.js initialization
      setTimeout(() => {
        const event = new CustomEvent('initThreeJS');
        window.dispatchEvent(event);
      }, 100);
    }

    function toggleArt() {
      const artPage = document.getElementById('art-page');
      const nav = document.querySelector('.nav');
      if (!artPage) return;

      if (isArtOpenRef.current) {
        artPage.classList.remove('active');
        isArtOpenRef.current = false;
        goToLanding();
      } else {
        // Force reflow to ensure transition works
        artPage.offsetHeight;
        artPage.classList.add('active');
        isArtOpenRef.current = true;
        if (nav) {
          nav.style.display = 'none';
        }
      }
    }

    function toggleAbout() {
      const aboutPage = document.getElementById('about-page');
      const nav = document.querySelector('.nav');

      if (!aboutPage) return;

      if (isAboutOpenRef.current) {
        aboutPage.classList.remove('active');
        isAboutOpenRef.current = false;
        goToLanding();
      } else {
        // Force reflow to ensure transition works
        aboutPage.offsetHeight;
        aboutPage.classList.add('active');
        isAboutOpenRef.current = true;
        if (nav) {
          nav.style.display = 'none';
        }
      }
    }

    function closeAboutPage() {
      const aboutPage = document.getElementById('about-page');
      aboutPage?.classList.remove('active');
      isAboutOpenRef.current = false;
      goToLanding();
    }

    function closeArtPage() {
      const artPage = document.getElementById('art-page');
      artPage?.classList.remove('active');
      isArtOpenRef.current = false;
      goToLanding();
    }

    function closeDevelopmentPage() {
      const developmentPage = document.getElementById('development-page');
      developmentPage?.classList.remove('active');
      goToLanding();
    }

    // Use event delegation with capture phase to ensure clicks work (handles overlays blocking)
    const handleClick = (e) => {
      const target = e.target?.closest?.('#nav-name, #nav-development, #nav-art, #nav-about, #close-about, #close-art, #close-development');
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();

      if (target.id === 'nav-name') goToLanding();
      else if (target.id === 'nav-development') goToDevelopment();
      else if (target.id === 'nav-art') toggleArt();
      else if (target.id === 'nav-about') toggleAbout();
      else if (target.id === 'close-about') closeAboutPage();
      else if (target.id === 'close-art') closeArtPage();
      else if (target.id === 'close-development') closeDevelopmentPage();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isAboutOpenRef.current) {
          closeAboutPage();
        } else if (isArtOpenRef.current) {
          closeArtPage();
        }
      }
    };

    const appRoot = document.getElementById('app-root');
    if (appRoot) {
      registerListener(appRoot, 'click', handleClick);
    }
    registerListener(document, 'keydown', handleKeyDown);

    // Initialize landing page - ensure it's visible by default
    try {
      const landingPage = document.getElementById('landing-page');
      if (landingPage) {
        landingPage.style.opacity = '1';
        landingPage.style.visibility = 'visible';
        landingPage.style.display = 'flex';
      }
    } catch (error) {
      console.error('Landing page display init failed', error);
    }

    return cleanup;
  }, []);

  return {
    isAboutOpen: isAboutOpenRef.current,
    isArtOpen: isArtOpenRef.current,
    currentPage: currentPageRef.current
  };
}

