'use client';

import { useEffect } from 'react';

export default function ArtPage() {
  // Load and play videos/audio only when art page is active
  useEffect(() => {
    const loadMedia = () => {
      const artPage = document.getElementById('art-page');
      const isPageActive = artPage?.classList.contains('active');
      
      if (isPageActive) {
        // Load audio files
        const audioElements = document.querySelectorAll('#gender-audio, #flaw-audio, #restriction-audio, #amazon-audio');
        audioElements.forEach((audio) => {
          if (audio instanceof HTMLAudioElement && audio.preload === 'none') {
            audio.preload = 'auto';
            audio.load();
          }
        });

        // Load and play videos
        const videos = document.querySelectorAll('.preview-video, .preview-video2');
        videos.forEach((video) => {
          if (video instanceof HTMLVideoElement) {
            if (video.preload === 'none') {
              video.preload = 'auto';
              video.load();
            }
            video.play().catch(() => {
              // Ignore autoplay errors (browser may block autoplay)
            });
          }
        });
      }
    };

    // Check immediately
    loadMedia();

    // Listen for when the page becomes active
    const artPage = document.getElementById('art-page');
    if (artPage) {
      const observer = new MutationObserver(() => {
        loadMedia();
      });
      observer.observe(artPage, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="page art-page" id="art-page">
      <button className="close-art" id="close-art">
        ×
      </button>
      <div className="about-content">
        <div className="services-section">
          <h3>Music</h3>
          <ul className="services-list">
            <li>
              <a href="https://mapledeathrecords.bandcamp.com/album/lp2" target="_blank" rel="noopener noreferrer">
                LP2 (2021)
              </a>
            </li>
            <li>
              <a href="https://mapledeathrecords.bandcamp.com/album/moving" target="_blank" rel="noopener noreferrer">
                Moving (2023)
              </a>
            </li>
            <li>
              <a href="https://mapledeathrecords.bandcamp.com/album/moods" target="_blank" rel="noopener noreferrer">
                Moods (2020)
              </a>
            </li>
            <li>Music Sync Clients include Nanushka, Zara, WEB SERIES SKMY. </li>
          </ul>
        </div>
        <div className="services-section">
          <h3>Selected Exhibitions and Installations</h3>
          <table className="list-table">
            <tbody>
              <tr className="restriction-row" data-media="restriction">
                <td>
                  Restriction: En Context - Curation and coordination, Audio-visual Compositions, Sculpture. Kulturtemplet, Gothenburg
                  (2021)
                  <button className="music-play-btn" id="restriction-play-btn">
                    play
                  </button>
                </td>
              </tr>
              <tr className="gender-row" data-media="gender">
                <td>
                  Gender Project -  Stage Management and Composition for blindfolded listening experience. Studio 9294, London (2019)
                  <button className="music-play-btn" id="music-play-btn">
                    play
                  </button>
                </td>
              </tr>
              <tr className="flaw-row">
                <td>
                  FLAW - Sound-art Composition for video installation, Truman Brewery, London (2022)
                  <button className="music-play-btn" id="flaw-play-btn">
                    play
                  </button>
                </td>
              </tr>
              <tr>
                <td>Gender Project - Sound-art Composition. Silk Gallery, Athens (2022) </td>
              </tr>
              <tr className="amazon-row">
                <td>
                  Amazon Forest Fires Fundraiser Event - Sound-art Composition for live performance, for Undergrowth Collective, Grow, London.
                  (2019)
                  <button className="music-play-btn" id="amazon-play-btn">
                    play
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <audio id="gender-audio" preload="none">
          <source src="https://media.stellamathioudakis.com/Up and onward master.wav" type="audio/wav" />
        </audio>
        <audio id="flaw-audio" preload="none">
          <source src="https://media.stellamathioudakis.com/WAVES OF VIOLENCE.mp3" type="audio/mpeg" />
        </audio>
        <audio id="restriction-audio" preload="none">
          <source src="https://media.stellamathioudakis.com/loop1.mp3" type="audio/mpeg" />
        </audio>
        <audio id="amazon-audio" preload="none">
          <source src="https://media.stellamathioudakis.com/in a world in amazon FINAL.mp3" type="audio/mpeg" />
        </audio>

        <div className="media-preview" id="media-preview">
          <video className="preview-video" id="kt-video" muted loop playsInline autoPlay preload="none">
            <source src="https://media.stellamathioudakis.com/KT.mov" type="video/mp4" />
          </video>
          <img className="preview-image" id="mining-image" src="/assets/Mining.jpg" alt="Mining" loading="lazy" />
          <video className="preview-video" id="sculpture-video" muted loop playsInline autoPlay preload="none">
            <source src="https://media.stellamathioudakis.com/sculpture.mov" type="video/mp4" />
          </video>
        </div>

        <div className="media-preview2" id="gender-media-preview">
          <video className="preview-video2" id="gender-video" muted loop playsInline autoPlay preload="none">
            <source src="https://media.stellamathioudakis.com/GenderLondon.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="media-preview" id="flaw-media-preview">
          <img className="preview-image" id="flaw-image" src="/assets/FLAW.jpg" alt="FLAW" loading="lazy" />
        </div>
      </div>
    </div>
  );
}




