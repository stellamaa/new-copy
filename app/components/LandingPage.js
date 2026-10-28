'use client';

import { useEffect, useRef, useState } from 'react';
import RandomImages from './RandomImages';
// import DraggableLeaf from './DraggableLeaf';

export default function LandingPage() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const stopMood = () => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    audio.pause();
    setPlaying(false);
  };

  const toggleMood = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      stopMood();
    }
  };

  useEffect(() => {
    const landing = document.getElementById('landing-page');
    const root = document.getElementById('app-root');
    if (!landing) return;

    const sync = () => {
      const overlayOpen =
        landing.classList.contains('hidden') ||
        root?.classList.contains('overlay-development') ||
        root?.classList.contains('overlay-about') ||
        root?.classList.contains('overlay-art');
      if (overlayOpen) stopMood();
    };

    const observer = new MutationObserver(sync);
    observer.observe(landing, { attributes: true, attributeFilter: ['class', 'style'] });
    if (root) observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page" id="landing-page">
      <button
        type="button"
        className={`mood-button${playing ? ' is-playing' : ''}`}
        onClick={toggleMood}
        aria-pressed={playing}
        aria-label={playing ? 'Pause mood' : 'Play mood'}
      >
       [ where I am in my mind ]
      </button>
      <audio ref={audioRef} src="/assets/birds.mp3" loop preload="none" />
      <div className="landing-content">
        <RandomImages />
        {/* <DraggableLeaf /> */}
      </div>
    </div>
  );
}




