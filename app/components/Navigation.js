'use client';

import { useEffect } from 'react';
import { upsideDownChars } from '../constants/characters';
import { createEventListenerManager } from '../utils/eventListeners';

export default function Navigation() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, registerTimeout, registerCleanup, cleanup } = createEventListenerManager();

    // Apply rotation to all nav items (nav-item and nav-about)
    const elements = document.querySelectorAll('.nav-item, .nav-about');

    elements.forEach((element) => {
      const text = element.getAttribute('data-text') || element.textContent?.trim() || '';
      if (!text) return;

      element.innerHTML = '';

      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.transition = 'transform 0.3s ease';
        element.appendChild(span);
        return span;
      });

      const handleMouseEnter = () => {
        chars.forEach((span) => {
          const originalChar = span.textContent?.toLowerCase() || '';
          const upsideDownChar = upsideDownChars[originalChar] ?? originalChar;
          span.textContent = upsideDownChar;
          span.style.transform = 'rotate(180deg)';
        });
      };

      const handleMouseLeave = () => {
        chars.forEach((span, index) => {
          span.style.transform = 'rotate(0deg)';
          const restore = window.setTimeout(() => {
            span.textContent = text[index];
          }, 300);
          registerTimeout(restore);
        });
      };

      registerListener(element, 'mouseenter', handleMouseEnter);
      registerListener(element, 'mouseleave', handleMouseLeave);

      registerCleanup(() => {
        element.innerHTML = '';
      });
    });

    return cleanup;
  }, []);

  return (
    <nav className="nav">
      <a href="#" className="nav-item" id="nav-development" data-text="code + design,">
        code + design,
      </a>
      <a href="#" className="nav-item" id="nav-art" data-text="art,">
        art,
      </a>
      <a href="#" className="nav-about" id="nav-about" data-text="information">
        information
      </a>
    </nav>
  );
}

