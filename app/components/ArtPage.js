'use client';

export default function ArtPage() {
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

        <audio id="gender-audio" preload="auto">
          <source src="/assets/Up and onward master.wav" type="audio/wav" />
        </audio>
        <audio id="flaw-audio" preload="auto">
          <source src="/assets/WAVES OF VIOLENCE.mp3" type="audio/mpeg" />
        </audio>
        <audio id="restriction-audio" preload="auto">
          <source src="/assets/loop1.mp3" type="audio/mpeg" />
        </audio>
        <audio id="amazon-audio" preload="auto">
          <source src="/assets/in a world in amazon FINAL.mp3" type="audio/mpeg" />
        </audio>

        <div className="media-preview" id="media-preview">
          <video className="preview-video" id="kt-video" muted loop playsInline>
            <source src="/assets/KT.mov" type="video/mp4" />
          </video>
          <img className="preview-image" id="mining-image" src="/assets/Mining.jpg" alt="Mining" />
          <video className="preview-video" id="sculpture-video" muted loop playsInline>
            <source src="/assets/sculpture.mov" type="video/mp4" />
          </video>
        </div>

        <div className="media-preview2" id="gender-media-preview">
          <video className="preview-video2" id="gender-video" muted loop playsInline>
            <source src="/assets/GenderLondon.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="media-preview" id="flaw-media-preview">
          <img className="preview-image" id="flaw-image" src="/assets/FLAW.jpg" alt="FLAW" />
        </div>
      </div>
    </div>
  );
}




