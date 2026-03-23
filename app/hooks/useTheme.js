'use client';

import { useLayoutEffect } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export function useTheme() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, cleanup } = createEventListenerManager();
    const root = document.documentElement;

    function updateThreeJSBackground(isDark) {
      const event = new CustomEvent('themeChange', { detail: { isDark } });
      window.dispatchEvent(event);
    }

    const toggleBtn = document.getElementById('theme-toggle');
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') {
        root.classList.add('dark');
        if (toggleBtn) toggleBtn.textContent = 'light';
        updateThreeJSBackground(true);
      } else {
        root.classList.remove('dark');
        if (toggleBtn) toggleBtn.textContent = 'dark';
        updateThreeJSBackground(false);
      }
    } catch (err) {
      // ignore storage errors
    }

    const handleClick = (e) => {
      if (!e.target?.closest?.('#theme-toggle')) return;
      e.preventDefault();
      e.stopPropagation();

      const isDark = root.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (err) {
        // ignore storage errors
      }
      const btn = document.getElementById('theme-toggle');
      if (btn) btn.textContent = isDark ? 'light' : 'dark';
      updateThreeJSBackground(isDark);
    };

    const appRoot = document.getElementById('app-root');
    if (appRoot) {
      registerListener(appRoot, 'click', handleClick);
    }

    return cleanup;
  }, []);
}

