'use client';

export default function AboutPage() {
  return (
    <div className="page about-page" id="about-page">
      <button className="close-about" id="close-about">
        ×
      </button>
      <div className="about-content">
        <div className="about-text">
          <p>I work between design, code, and sound <br />
focusing on creating digital experiences that carry a sense of presence.  
<br />
my background in art, music, and holistic practices <br />
shapes how I write and design for the web: <br />
as something tactile, rhythmic, and emotional. <br />

<br />
I'm drawn to projects that merge the poetic with the technical <br />
websites, installations, collaborations that feel  
conscious and alive. <br />

currently based in London,  
working independently and with studios,  
artists, and brands  
who value clarity, experimentation, and care.</p>

        
        </div>

        <div className="services-section">
          <h3>Services</h3>
          <ul className="services-list">
            <li>Interactive Web Development</li>
            <li>Digital + Physical Installations</li>
            <li>User Experience Design and Research</li>
            <li>Music and Sound-Art Composition</li>
            <li>Meditation + Art Events</li>
          </ul>
        </div>

        <div className="contact-section">
          <h3>Contact:</h3>
          <p>
            <span>E-mail:</span> <span id="email">stellamathioudakisart@gmail.com</span> 
            <br/>
            <span>open to collaborations, commissions, and conversation.  </span>
          </p>
        </div>
      </div>
    </div>
  );
}




