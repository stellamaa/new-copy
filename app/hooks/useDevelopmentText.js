'use client';

import { useEffect } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export function useDevelopmentText() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, registerCleanup, cleanup } = createEventListenerManager();

    const developmentText = document.querySelector('.development-text p');
    if (!developmentText) return;

    const text = developmentText.textContent || '';
    developmentText.textContent = '';

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      return span;
    });

    developmentText.append(...chars);

    const handleMouseEnter = () => {
      chars.forEach((char) => {
        if (char.textContent === '\u00A0') return;
        const translateX = (Math.random() - 0.9) * 10;
        const translateY = (Math.random() - 0.2) * 10;
        const rotate = (Math.random() - 0.2) * 45;
        char.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((char) => {
        char.style.transform = 'translate(0px, 0px) rotate(0deg)';
      });
    };

    registerListener(developmentText, 'mouseenter', handleMouseEnter);
    registerListener(developmentText, 'mouseleave', handleMouseLeave);

    registerCleanup(() => {
      developmentText.innerHTML = '';
    });

    return cleanup;
  }, []);
}




