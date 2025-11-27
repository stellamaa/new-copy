'use client';

import { useEffect } from 'react';
import { upsideDownChars } from '../constants/characters';
import { createEventListenerManager } from '../utils/eventListeners';

export default function Navigation() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, registerTimeout, registerCleanup, cleanup } = createEventListenerManager();

    const navItems = [
      { id: 'nav-development', text: 'code + design' },
      { id: 'nav-art', text: 'art' },
      { id: 'nav-about', text: 'about' }
    ];

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (!element) return;
      element.innerHTML = '';

      const chars = item.text.split('').map((char) => {
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
          const upsideDownChar = upsideDownChars[originalChar] || originalChar;
          span.textContent = upsideDownChar;
          span.style.transform = 'rotate(180deg)';
        });
      };

      const handleMouseLeave = () => {
        chars.forEach((span, index) => {
          span.style.transform = 'rotate(0deg)';
          const restore = window.setTimeout(() => {
            span.textContent = item.text[index];
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
      <a href="#" className="nav-item" id="nav-development" data-text="code + design">
        code + design
      </a>
      <a href="#" className="nav-item" id="nav-art" data-text="art">
        art
      </a>
      <a href="#" className="nav-about" id="nav-about" data-text="about">
        about
      </a>
    </nav>
  );
}

