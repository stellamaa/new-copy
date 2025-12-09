'use client';

import { useEffect } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export function useTheme() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, cleanup } = createEventListenerManager();
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    if (!toggleBtn) return;

    function updateThreeJSBackground(isDark) {
      // This will be handled by the Three.js hook
      const event = new CustomEvent('themeChange', { detail: { isDark } });
      window.dispatchEvent(event);
    }

    // Randomly choose between light and dark mode on each page load
    // Only do this if there's no saved theme preference
    try {
      const saved = localStorage.getItem('theme');
      let isDark;
      
      if (saved === 'dark' || saved === 'light') {
        // Use saved preference
        isDark = saved === 'dark';
      } else {
        // Randomly choose if no preference is saved
        isDark = Math.random() >= 0.5;
      }
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      toggleBtn.textContent = isDark ? 'light' : 'dark';
      updateThreeJSBackground(isDark);
    } catch (err) {
      // If localStorage fails, default to light mode
      root.classList.remove('dark');
      toggleBtn.textContent = 'dark';
      updateThreeJSBackground(false);
    }

    const handleClick = () => {
      const isDark = root.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (err) {
        // ignore storage errors
      }
      toggleBtn.textContent = isDark ? 'light' : 'dark';
      updateThreeJSBackground(isDark);
    };

    registerListener(toggleBtn, 'click', handleClick);

    return cleanup;
  }, []);
}

