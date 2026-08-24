import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Award, CheckCircle, Sparkles, UserCheck, Play, VideoOff } from 'lucide-react';
import { speakers as speakersData, virtualTeenSchedule, virtualParentSchedule, physicalSchedule, isSessionPast } from '../data/content';

export default function SpeakerBio() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find current speaker
  const speaker = speakersData.find((s) => s.id === id);

  // Filter speakers that have full bios for quick navigation
  const featuredSpeakers = speakersData.filter((s) => s.hasBio);
  const currentIndex = featuredSpeakers.findIndex((s) => s.id === id);
  const prevSpeaker = currentIndex > 0 ? featuredSpeakers[currentIndex - 1] : null;
  const nextSpeaker = currentIndex < featuredSpeakers.length - 1 ? featuredSpeakers[currentIndex + 1] : null;

  if (!speaker) {
    return (
      <section className="page-section" style={{ paddingTop: 140, minHeight: '70vh' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Speaker Not Found</h2>
          <p style={{ color: 'var(--text-muted)', margin: '16px 0 24px' }}>
            The speaker profile you are looking for does not exist or has been moved.
          </p>
          <Link to="/speakers" className="btn btn-primary">
            <ArrowLeft size={18} /> Back to Speakers
          </Link>
        </div>
      </section>
    );
  }

  // Check if speaker has session in schedules
  const allSessions = [...virtualTeenSchedule, ...virtualParentSchedule, ...physicalSchedule];
  const speakerSessions = allSessions.filter((session) =>
    session.facilitator.toLowerCase().includes(speaker.name.toLowerCase()) ||
    (speaker.title && session.facilitator.toLowerCase().includes(speaker.title.toLowerCase()))
  );

  return (
    <section className="page-section bio-page-section" style={{ paddingTop: 120 }}>
      <div className="container">
        {/* Back link */}
        <div className="bio-navigation-bar">
          <Link to="/speakers" className="bio-back-button">
            <ArrowLeft size={18} /> Back to All Speakers
          </Link>
          {speaker.hasBio && (
            <span className="bio-status-badge">
              <Sparkles size={14} /> Official Speaker Bio
            </span>
          )}
        </div>

        {/* Main Bio Container Card */}
        <div className="speaker-bio-card glass-card">
          {/* Top Header Grid with Picture at Top Left */}
          <div className="bio-top-layout">
            {/* Top Left Picture */}
            <div className="bio-image-col">
              <div className="bio-image-frame">
                <img src={speaker.img} alt={speaker.name} className="bio-portrait" />
                <div className="bio-image-badge">Speaker</div>
              </div>
            </div>

            {/* Top Right Header Info */}
            <div className="bio-header-info">
              <span className="bio-category-tag">Parents Teens Summit 2026</span>
              <h1 className="bio-speaker-name">{speaker.name}</h1>
              {speaker.title && <p className="bio-speaker-title">{speaker.title}</p>}
              {speaker.role && <p className="bio-speaker-role">{speaker.role}</p>}

              {/* Highlights / Badges */}
              {speaker.highlights && speaker.highlights.length > 0 && (
                <div className="bio-highlights-list">
                  {speaker.highlights.map((item, idx) => (
                    <span className="bio-highlight-chip" key={idx}>
                      <CheckCircle size={14} /> {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="bio-content-divider"></div>

          {/* Detailed Biography Text Section */}
          <div className="bio-body-section">
            <h2 className="bio-section-heading">About the Speaker</h2>
            
            {speaker.bio ? (
              <div className="bio-text-content">
                {speaker.bio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="bio-text-placeholder">
                <p>
                  {speaker.name} is a featured speaker at Parents Teens Summit 2026. Detailed profile and session guidelines will be updated shortly.
                </p>
              </div>
            )}

            {/* Sessions facilitation if applicable */}
            {speakerSessions.length > 0 && (
              <div className="bio-sessions-block">
                <h3><Calendar size={18} /> Sessions Facilitated by {speaker.name}</h3>
                <div className="bio-sessions-grid">
                  {speakerSessions.map((session, sIdx) => {
                    const isPast = isSessionPast(session.date, session.time, session.isPast);
                    return (
                      <div className="bio-session-card" key={sIdx}>
                        <div className="session-topic">{session.topic}</div>
                        <div className="session-time-meta">
                          <span>📅 {session.date}</span>
                          <span>⏰ {session.time}</span>
                        </div>
                        {(isPast || session.youtubeUrl) && (
                          <div style={{ marginTop: 10 }}>
                            {session.youtubeUrl ? (
                              <a
                                href={session.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rewatch-btn available timeline"
                              >
                                <Play size={13} fill="currentColor" /> Rewatch Session
                              </a>
                            ) : (
                              <span className="rewatch-btn unavailable timeline">
                                <VideoOff size={12} /> Not Yet Available
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Call to action & Next/Prev navigation */}
            <div className="bio-action-footer">
              <div className="bio-cta-buttons">
                <Link to="/registration" className="btn btn-primary">
                  Register to Attend Session
                </Link>
                <Link to="/speakers" className="btn btn-secondary">
                  Explore More Speakers
                </Link>
              </div>

              {/* Next & Previous speaker links */}
              <div className="bio-speaker-nav-buttons">
                {prevSpeaker ? (
                  <Link to={`/speakers/${prevSpeaker.id}`} className="nav-speaker-btn prev">
                    <small>← Previous Bio</small>
                    <span>{prevSpeaker.name}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextSpeaker ? (
                  <Link to={`/speakers/${nextSpeaker.id}`} className="nav-speaker-btn next">
                    <small>Next Bio →</small>
                    <span>{nextSpeaker.name}</span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
