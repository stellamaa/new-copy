'use client';

import { useEffect, useRef } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export function usePageNavigation() {
  const isAboutOpenRef = useRef(false);
  const isArtOpenRef = useRef(false);
  const currentPageRef = useRef('landing');

  useEffect(() => {
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

    // Set up navigation handlers
    const navName = document.getElementById('nav-name');
    const navDevelopment = document.getElementById('nav-development');
    const navArt = document.getElementById('nav-art');
    const navAbout = document.getElementById('nav-about');
    const closeAbout = document.getElementById('close-about');
    const closeArt = document.getElementById('close-art');
    const closeDevelopment = document.getElementById('close-development');

    const handleNavNameClick = (e) => {
      e.preventDefault();
      goToLanding();
    };

    const handleNavDevelopmentClick = (e) => {
      e.preventDefault();
      goToDevelopment();
    };

    const handleNavArtClick = (e) => {
      e.preventDefault();
      toggleArt();
    };

    const handleNavAboutClick = (e) => {
      e.preventDefault();
      toggleAbout();
    };

    const handleCloseAboutClick = (e) => {
      e.preventDefault();
      closeAboutPage();
    };

    const handleCloseArtClick = (e) => {
      e.preventDefault();
      closeArtPage();
    };

    const handleCloseDevelopmentClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeDevelopmentPage();
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

    if (navName) registerListener(navName, 'click', handleNavNameClick);
    if (navDevelopment) registerListener(navDevelopment, 'click', handleNavDevelopmentClick);
    if (navArt) registerListener(navArt, 'click', handleNavArtClick);
    if (navAbout) registerListener(navAbout, 'click', handleNavAboutClick);
    if (closeAbout) registerListener(closeAbout, 'click', handleCloseAboutClick);
    if (closeArt) registerListener(closeArt, 'click', handleCloseArtClick);
    if (closeDevelopment) registerListener(closeDevelopment, 'click', handleCloseDevelopmentClick);
    registerListener(document, 'keydown', handleKeyDown);

    // Ensure close buttons are visible on mobile
    const ensureCloseButtonsVisible = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        const closeAbout = document.getElementById('close-about');
        const closeArt = document.getElementById('close-art');
        const closeDevelopment = document.getElementById('close-development');
        
        [closeAbout, closeArt, closeDevelopment].forEach(button => {
          if (button) {
            // Remove conflicting inline styles and let CSS handle positioning
            button.style.display = '';
            button.style.visibility = '';
            button.style.opacity = '';
            button.style.position = '';
            button.style.bottom = '';
            button.style.right = '';
            button.style.left = '';
            button.style.zIndex = '';
            // CSS will handle all positioning via !important rules
          }
        });
      }
    };

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

    // Ensure close buttons are visible on mobile initially and on resize
    ensureCloseButtonsVisible();
    const resizeHandler = () => {
      ensureCloseButtonsVisible();
    };
    registerListener(window, 'resize', resizeHandler);
    
    // Also ensure visibility when pages become active
    const observer = new MutationObserver(() => {
      ensureCloseButtonsVisible();
    });
    
    const aboutPage = document.getElementById('about-page');
    const artPage = document.getElementById('art-page');
    const developmentPage = document.getElementById('development-page');
    
    [aboutPage, artPage, developmentPage].forEach(page => {
      if (page) {
        observer.observe(page, {
          attributes: true,
          attributeFilter: ['class']
        });
      }
    });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, []);

  return {
    isAboutOpen: isAboutOpenRef.current,
    isArtOpen: isArtOpenRef.current,
    currentPage: currentPageRef.current
  };
}

