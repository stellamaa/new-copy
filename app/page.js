'use client';

import { usePageNavigation } from './hooks/usePageNavigation';
import { useTheme } from './hooks/useTheme';
import { useMediaPreview } from './hooks/useMediaPreview';
import { useMusicPlayer } from './hooks/useMusicPlayer';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import DevelopmentPage from './components/DevelopmentPageAlternative';
import AboutPage from './components/AboutPage';
import ArtPage from './components/ArtPage';
import FullscreenModal from './components/FullscreenModal';

export default function HomePage() {
  usePageNavigation();
  useTheme();
  useMediaPreview();
  useMusicPlayer();

  return (
    <div id="app-root" className="invertable">
      <div className="site-bio">
        <span>Stella Mathioudakis</span>
        <span> design focused developer / sound artist</span>
        <span>working across web, code, and sound</span>
        <span>exploring how technology can feel intentional.</span>
        <span>building digital spaces that invite reflection and</span>
        <span>connection.</span>
        <span>based in london / open to collaborations</span> 
        <span> worldwide.</span>
      </div>
      <Navigation />
      <div className="noise-overlay"></div>

      <LandingPage />
      <DevelopmentPage />
      <AboutPage />
      <ArtPage />

      <footer className="footer">
        <a href="mailto:stellamathioudakisart@gmail.com" className="email-link" id="email-link">
          say hi
        </a>
      </footer>

      <button id="theme-toggle" aria-label="Toggle dark mode">
        Dark
      </button>
    </div>
  );
}
