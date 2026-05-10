import { Link } from 'react-router-dom';
import { Calendar, Users, Sparkles, Globe } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">📅 August 24 – 29, 2026 • Lagos, Nigeria</span>
          <h1>
            Parent-Teen<br />
            <span className="gradient-text">Summit 2026</span>
          </h1>
          <p>Bridging the communication and connection gap between parents and their teenage children through immersive sessions, expert-led workshops, and community dialogue.</p>
          <div className="hero-buttons">
            <Link to="/registration" className="btn btn-primary">Register Now</Link>
            <Link to="/schedule" className="btn btn-secondary">View Schedule</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><h3>5th</h3><p>Annual Edition</p></div>
            <div className="hero-stat"><h3>20+</h3><p>Expert Speakers</p></div>
            <div className="hero-stat"><h3>1000+</h3><p>Attendees Expected</p></div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="page-section">
        <div className="container">
          <h2 className="section-title">About The Summit</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Now in its fifth year, PTS has become a catalyst for healing, learning, and transforming intergenerational relationships.</p>
          <div className="about-grid">
            <div className="about-text">
              <p>The Parents Teens Summit (PTS) is an annual initiative designed to bridge the communication and connection gap between parents and their teenage children through immersive sessions, expert-led workshops, and community dialogue.</p>
              <p>Each year, the Summit curates learning experiences that address relevant family dynamics, mental wellness, digital life challenges, emotional regulation, and long-term resilience for parents and Adolescents aged 9–18.</p>
              <div className="about-features">
                <div className="about-feature"><div className="icon"><Calendar size={18} /></div><span>5-Day Event</span></div>
                <div className="about-feature"><div className="icon"><Users size={18} /></div><span>Parent and Teen</span></div>
                <div className="about-feature"><div className="icon"><Sparkles size={18} /></div><span>Expert-Led</span></div>
                <div className="about-feature"><div className="icon"><Globe size={18} /></div><span>Virtual & In-Person</span></div>
              </div>
            </div>
            <div className="about-image-wrapper">
              <div className="about-image-glow"></div>
              <img src="https://pts25.netlify.app/PTS%20banner.png" alt="PTS Banner" />
            </div>
          </div>
        </div>
      </section>

      <CountdownTimer />

      {/* Experience Cards */}
      <section className="page-section">
        <div className="container">
          <h2 className="section-title">Join Us!</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Choose how you want to participate — from anywhere in the world or on-site in Lagos.</p>
          <div className="experience-grid">
            <div className="experience-card virtual">
              <h3 style={{ color: 'var(--accent-1)' }}>🌐 Virtual Experience</h3>
              <ul>
                {['Attend from anywhere', 'Interactive online platform', 'Digital workbook and resources', '30-day access to session recordings', 'Live Q&A opportunities'].map(item => (
                  <li key={item}><span className="check">✓</span>{item}</li>
                ))}
              </ul>
              <Link to="/registration" className="btn btn-primary" style={{ width: '100%' }}>Register Now</Link>
            </div>
            <div className="experience-card inperson">
              <h3 style={{ color: 'var(--accent-3)' }}>📍 In-Person Experience</h3>
              <ul>
                {['Direct interaction with facilitators', 'Networking with other families', 'Hands-on workshop activities', 'Lunch and refreshments provided', 'Resource kit to take home'].map(item => (
                  <li key={item}><span className="check">✓</span>{item}</li>
                ))}
              </ul>
              <Link to="/registration" className="btn btn-warm" style={{ width: '100%' }}>Register Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="page-section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Last Year's Highlight</h2>
          <div className="divider" style={{ marginBottom: 48 }}></div>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/CtA8rlZ1NGc?si=Gy2X_Hm4t8UrEtuH"
              title="PTS Highlight Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
