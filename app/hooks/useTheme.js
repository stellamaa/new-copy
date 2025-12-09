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

    try {
      const saved = localStorage.getItem('theme');
      // Default to light mode (white background) - only use dark if explicitly saved
      if (saved === 'dark') {
        root.classList.add('dark');
        toggleBtn.textContent = 'light';
        updateThreeJSBackground(true);
      } else {
        // Ensure light mode is the default
        root.classList.remove('dark');
        toggleBtn.textContent = 'dark';
        updateThreeJSBackground(false);
        // Clear any invalid theme preference to ensure light mode
        if (saved && saved !== 'light') {
          localStorage.setItem('theme', 'light');
        }
      }
    } catch (err) {
      // ignore storage errors, but ensure light mode
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

