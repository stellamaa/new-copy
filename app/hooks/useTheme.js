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

    // Read the current theme state (set by the random script in layout)
    // Don't override it - just sync the button text and Three.js background
    const isDark = root.classList.contains('dark');
    toggleBtn.textContent = isDark ? 'light' : 'dark';
    updateThreeJSBackground(isDark);

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

