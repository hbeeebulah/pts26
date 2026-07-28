import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, UserCheck, Info } from 'lucide-react';
import { speakers as speakersData } from '../data/content';

export default function Speakers() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' or 'bios'
  const [activeModalSpeaker, setActiveModalSpeaker] = useState(null);

  const filteredSpeakers = speakersData.filter((s) => {
    if (filter === 'bios') return s.hasBio;
    return true;
  });

  const handleSpeakerClick = (speaker) => {
    if (speaker.hasBio) {
      navigate(`/speakers/${speaker.id}`);
    } else {
      setActiveModalSpeaker(speaker);
    }
  };

  return (
    <section className="page-section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h2 className="section-title">Meet Our Speakers</h2>
        <div className="divider"></div>
        <p className="section-subtitle">
          Industry experts and thought leaders committed to empowering families and youth. Click on any headshot to view full bio details.
        </p>

        {/* Filter Controls */}
        <div className="speakers-filter-bar">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Speakers ({speakersData.length})
          </button>
          <button
            className={`filter-btn ${filter === 'bios' ? 'active' : ''}`}
            onClick={() => setFilter('bios')}
          >
            <Sparkles size={16} /> Speaker Bios ({speakersData.filter((s) => s.hasBio).length})
          </button>
        </div>

        {/* Speakers Grid */}
        <div className="speakers-grid">
          {filteredSpeakers.map((s) => (
            <div
              className={`speaker-card ${s.hasBio ? 'has-bio-card' : ''}`}
              key={s.id || s.name}
              onClick={() => handleSpeakerClick(s)}
            >
              {s.hasBio && (
                <span className="bio-pill-badge">
                  <Sparkles size={12} /> View Bio
                </span>
              )}
              <div className="speaker-img-wrapper">
                <img className="speaker-img" src={s.img} alt={s.name} />
                <div className="speaker-headshot-overlay">
                  <span>{s.hasBio ? 'Read Full Bio →' : 'Speaker Profile'}</span>
                </div>
              </div>
              <div className="speaker-info">
                <h3>{s.name}</h3>
                <p className="speaker-role-text">{s.role || s.title || 'PTS 2026 Facilitator'}</p>
                {s.hasBio && (
                  <div className="view-bio-link">
                    <span>View Bio</span> <ArrowRight size={14} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for speakers without full bio attached */}
        {activeModalSpeaker && (
          <div className="speaker-modal-overlay" onClick={() => setActiveModalSpeaker(null)}>
            <div className="speaker-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setActiveModalSpeaker(null)}>×</button>
              <div className="modal-speaker-header">
                <img src={activeModalSpeaker.img} alt={activeModalSpeaker.name} className="modal-speaker-img" />
                <div>
                  <h3>{activeModalSpeaker.name}</h3>
                  <p style={{ color: 'var(--accent-1)' }}>{activeModalSpeaker.role || 'PTS 2026 Facilitator'}</p>
                </div>
              </div>
              <div className="modal-speaker-body">
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: '16px 0' }}>
                  {activeModalSpeaker.name} will be speaking at Parents Teens Summit 2026. The complete bio profile will be uploaded shortly.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button className="btn btn-secondary" onClick={() => setActiveModalSpeaker(null)}>Close</button>
                  <Link to="/registration" className="btn btn-primary" onClick={() => setActiveModalSpeaker(null)}>Register Now</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
