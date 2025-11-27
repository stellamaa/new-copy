'use client';

import { useEffect } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export function useMusicPlayer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, cleanup } = createEventListenerManager();

    const genderBtn = document.getElementById('music-play-btn');
    const genderAudio = document.getElementById('gender-audio');
    const flawBtn = document.getElementById('flaw-play-btn');
    const flawAudio = document.getElementById('flaw-audio');
    const restrictionBtn = document.getElementById('restriction-play-btn');
    const restrictionAudio = document.getElementById('restriction-audio');
    const amazonBtn = document.getElementById('amazon-play-btn');
    const amazonAudio = document.getElementById('amazon-audio');

    const pairs = [
      [genderAudio, genderBtn],
      [flawAudio, flawBtn],
      [restrictionAudio, restrictionBtn],
      [amazonAudio, amazonBtn]
    ];

    function pauseAllExcept(exceptAudio, exceptBtn) {
      pairs.forEach(([audio, btn]) => {
        if (!audio) return;
        if (audio !== exceptAudio && !audio.paused) {
          audio.pause();
          if (btn) {
            btn.textContent = 'play';
          }
        }
      });
    }

    function setup(btn, audio) {
      if (!btn || !audio) return;

      const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (audio.paused) {
          pauseAllExcept(audio, btn);
          audio.play().then(() => {
            btn.textContent = 'pause';
          }).catch(() => {});
        } else {
          audio.pause();
          btn.textContent = 'play';
        }
      };

      const handleEnded = () => {
        btn.textContent = 'play';
      };

      registerListener(btn, 'click', handleClick);
      registerListener(audio, 'ended', handleEnded);
    }

    setup(genderBtn, genderAudio);
    setup(flawBtn, flawAudio);
    setup(restrictionBtn, restrictionAudio);
    setup(amazonBtn, amazonAudio);

    return cleanup;
  }, []);
}




