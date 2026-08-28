import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, User, LayoutGrid, ListFilter, Sparkles, ExternalLink, Info, CheckCircle2, ArrowRight, Play, VideoOff } from 'lucide-react';
import { 
  virtualParentMatrix, 
  virtualTeenMatrix, 
  virtualTeenSchedule, 
  virtualParentSchedule, 
  physicalSchedule, 
  speakers,
  isSessionPast
} from '../data/content';

export default function Schedule() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [listTab, setListTab] = useState('parent'); // 'parent', 'teen', 'physical'
  const [matrixTab, setMatrixTab] = useState('all'); // 'all', 'parent', 'teen'

  // Helper to find speaker data by ID
  const getSpeaker = (speakerId) => {
    if (!speakerId) return null;
    return speakers.find((s) => s.id === speakerId);
  };

  const handleSpeakerClick = (e, speakerId) => {
    if (!speakerId) return;
    e.stopPropagation();
    navigate(`/speakers/${speakerId}`);
  };

  // Helper component to render the Rewatch button / indicator
  const renderRewatchButton = (dateStr, timeStr, youtubeUrl, explicitPast, isTimeline = false) => {
    const isPast = isSessionPast(dateStr, timeStr, explicitPast);
    
    // If the day hasn't passed and no explicit video link is added, show nothing
    if (!isPast && (!youtubeUrl || youtubeUrl.trim() === '')) {
      return null;
    }

    if (youtubeUrl && youtubeUrl.trim() !== '') {
      return (
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`rewatch-btn available ${isTimeline ? 'timeline' : ''}`}
          title="Rewatch session video on YouTube"
          onClick={(e) => e.stopPropagation()}
        >
          <Play size={isTimeline ? 14 : 12} fill="currentColor" /> Rewatch Session
        </a>
      );
    }

    return (
      <span 
        className={`rewatch-btn unavailable ${isTimeline ? 'timeline' : ''}`} 
        title="Session recording is not yet available"
      >
        <VideoOff size={isTimeline ? 13 : 11} /> Not Yet Available
      </span>
    );
  };

  return (
    <section className="page-section schedule-page" style={{ paddingTop: 120 }}>
      <div className="container">
        {/* Header */}
        <div className="schedule-header-wrapper">
          <span className="hero-badge">
            <Calendar size={14} style={{ marginRight: 6 }} /> August 24 – 29, 2026 • Virtual & In-Person
          </span>
          <h1 className="section-title">Summit Schedule</h1>
          <div className="divider"></div>
          <p className="section-subtitle">
            Explore our virtual keynotes, workshops, and age-tailored tracks. 
            <strong style={{ color: 'var(--accent-1)', display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 6 }}>
              Click any speaker's name to view their bio page!
            </strong>
          </p>

          {/* Top Controls: View Mode Switcher */}
          <div className="schedule-view-controls">
            <div className="view-toggle-group">
              <button 
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={18} /> Matrix Table View
              </button>
              <button 
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <ListFilter size={18} /> Timeline View
              </button>
            </div>
          </div>
        </div>

        {/* ==================== GRID MATRIX VIEW (ATTACHED SPREADSHEET FORMAT) ==================== */}
        {viewMode === 'grid' && (
          <div className="matrix-schedule-container">
            {/* Matrix Filter Selector */}
            <div className="matrix-tab-bar">
              <button 
                className={`matrix-tab-btn ${matrixTab === 'all' ? 'active' : ''}`}
                onClick={() => setMatrixTab('all')}
              >
                <Sparkles size={16} /> Both Summits (Side-by-Side)
              </button>
              <button 
                className={`matrix-tab-btn ${matrixTab === 'parent' ? 'active' : ''}`}
                onClick={() => setMatrixTab('parent')}
              >
                Virtual Summit (Parents)
              </button>
              <button 
                className={`matrix-tab-btn ${matrixTab === 'teen' ? 'active' : ''}`}
                onClick={() => setMatrixTab('teen')}
              >
                Virtual Summit (Teens)
              </button>
              <button 
                className={`matrix-tab-btn ${matrixTab === 'physical' ? 'active' : ''}`}
                onClick={() => setMatrixTab('physical')}
              >
                In-Person Summit (Aug 29)
              </button>
            </div>

            <p className="grid-scroll-hint">
              <span>💡 Tip: Scroll horizontally or tap speaker names to read full biographies</span>
            </p>

            <div className={`matrix-tables-grid ${matrixTab !== 'all' ? 'single-table' : ''}`}>
              
              {/* ================= PARENTS MATRIX TABLE ================= */}
              {(matrixTab === 'all' || matrixTab === 'parent') && (
                <div className="matrix-table-card glass-card">
                  <div className="matrix-table-header parents-theme">
                    <h3>{virtualParentMatrix.title}</h3>
                    <span className="matrix-subtitle-badge">Parents Track • Aug 24 - 27</span>
                  </div>

                  <div className="table-responsive-wrapper">
                    <table className="schedule-spreadsheet-table parents-table">
                      <thead>
                        {/* Sub-Themes Row */}
                        <tr className="subtheme-header-row">
                          <th className="subtheme-corner-header">SUB-THEMES</th>
                          {virtualParentMatrix.days.map((d, idx) => (
                            <th key={idx} className="subtheme-header-cell">
                              <span className="subtheme-day-label">{d.day}</span>
                              <span className="subtheme-title">{d.subTheme}</span>
                            </th>
                          ))}
                        </tr>
                        {/* Day Row */}
                        <tr className="days-label-row">
                          <th className="corner-label-cell">Day Breakdown</th>
                          {virtualParentMatrix.days.map((d, idx) => (
                            <th key={idx} className="day-name-cell">{d.day}:</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {virtualParentMatrix.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={`schedule-row ${row.colorType}`}>
                            <td className={`category-header-cell ${row.colorType}`}>
                              {row.category}
                            </td>

                            {row.cells.map((cell, cIdx) => {
                              const speakerData = getSpeaker(cell.speakerId);
                              const displayName = speakerData ? speakerData.name : cell.speaker;
                              const sessionDate = cell.date || virtualParentMatrix.days[cIdx]?.date;
                              
                              return (
                                <td 
                                  key={cIdx} 
                                  rowSpan={cell.rowSpan || 1}
                                  className={`session-cell ${cell.isCombined ? 'combined-session-cell' : ''} ${row.colorType}-cell`}
                                >
                                  <div className="cell-content-box">
                                    <div className="session-topic-title">
                                      {cell.topic}
                                    </div>

                                    {/* Speaker Link */}
                                    {cell.speakerId ? (
                                      <button 
                                        className="speaker-bio-link-btn"
                                        onClick={(e) => handleSpeakerClick(e, cell.speakerId)}
                                        title={`View ${displayName}'s bio page`}
                                      >
                                        {speakerData?.img && (
                                          <img src={speakerData.img} alt={displayName} className="speaker-mini-avatar" />
                                        )}
                                        <span className="speaker-name-label">{displayName}</span>
                                        <ExternalLink size={13} className="bio-arrow-icon" />
                                      </button>
                                    ) : (
                                      <div className="speaker-name-static">
                                        {cell.speaker}
                                      </div>
                                    )}

                                    {cell.time && (
                                      <div className="session-time-pill">
                                        ⏰ {cell.time}
                                      </div>
                                    )}

                                    {/* Rewatch Session Button / Status */}
                                    {renderRewatchButton(sessionDate, cell.time, cell.youtubeUrl, cell.isPast, false)}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ================= TEENS MATRIX TABLE ================= */}
              {(matrixTab === 'all' || matrixTab === 'teen') && (
                <div className="matrix-table-card glass-card">
                  <div className="matrix-table-header teens-theme">
                    <h3>{virtualTeenMatrix.title}</h3>
                    <span className="matrix-subtitle-badge">Teens Track • Aug 24 - 26</span>
                  </div>

                  <div className="table-responsive-wrapper">
                    <table className="schedule-spreadsheet-table teens-table">
                      <thead>
                        {/* Sub-Themes Row */}
                        <tr className="subtheme-header-row teens-header">
                          <th className="subtheme-corner-header">SUB-THEMES</th>
                          {virtualTeenMatrix.days.map((d, idx) => (
                            <th key={idx} className="subtheme-header-cell">
                              <span className="subtheme-day-label">{d.day}</span>
                              <span className="subtheme-title">{d.subTheme}</span>
                            </th>
                          ))}
                        </tr>
                        {/* Day Row */}
                        <tr className="days-label-row">
                          <th className="corner-label-cell">Age Group</th>
                          {virtualTeenMatrix.days.map((d, idx) => (
                            <th key={idx} className="day-name-cell">{d.day}:</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {virtualTeenMatrix.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={`schedule-row ${row.colorType}`}>
                            <td className={`category-header-cell ${row.colorType}`}>
                              {row.category}
                            </td>

                            {row.cells.map((cell, cIdx) => {
                              const sessionDate = cell.date || virtualTeenMatrix.days[cIdx]?.date;

                              // If cell contains multiple speakers (e.g. Zahra Ajet/Zainab Aderohunmu)
                              if (cell.speakers) {
                                return (
                                  <td 
                                    key={cIdx} 
                                    rowSpan={cell.rowSpan || 1}
                                    className={`session-cell ${row.colorType}-cell`}
                                  >
                                    <div className="cell-content-box">
                                      <div className="session-topic-title">
                                        {cell.topic}
                                      </div>
                                      <div className="multi-speakers-row">
                                        {cell.speakers.map((sp, sIndex) => {
                                          const spData = getSpeaker(sp.speakerId);
                                          const spDisplayName = spData ? spData.name : sp.name;
                                          return (
                                            <button 
                                              key={sIndex}
                                              className="speaker-bio-link-btn mini"
                                              onClick={(e) => handleSpeakerClick(e, sp.speakerId)}
                                              title={`View ${spDisplayName}'s bio page`}
                                            >
                                              {spData?.img && (
                                                <img src={spData.img} alt={spDisplayName} className="speaker-mini-avatar" />
                                              )}
                                              <span className="speaker-name-label">{spDisplayName}</span>
                                              <ExternalLink size={12} className="bio-arrow-icon" />
                                            </button>
                                          );
                                        })}
                                      </div>
                                      {cell.time && (
                                        <div className="session-time-pill">
                                          ⏰ {cell.time}
                                        </div>
                                      )}

                                      {/* Rewatch Session Button / Status */}
                                      {renderRewatchButton(sessionDate, cell.time, cell.youtubeUrl, cell.isPast, false)}
                                    </div>
                                  </td>
                                );
                              }

                              const speakerData = getSpeaker(cell.speakerId);
                              const displayName = speakerData ? speakerData.name : cell.speaker;

                              return (
                                <td 
                                  key={cIdx} 
                                  rowSpan={cell.rowSpan || 1}
                                  className={`session-cell ${row.colorType}-cell`}
                                >
                                  <div className="cell-content-box">
                                    {cell.mergedLabel && (
                                      <span className="merged-age-tag">{cell.mergedLabel}</span>
                                    )}
                                    <div className="session-topic-title">
                                      {cell.topic}
                                    </div>

                                    {cell.speakerId ? (
                                      <button 
                                        className="speaker-bio-link-btn"
                                        onClick={(e) => handleSpeakerClick(e, cell.speakerId)}
                                        title={`View ${displayName}'s bio page`}
                                      >
                                        {speakerData?.img && (
                                          <img src={speakerData.img} alt={displayName} className="speaker-mini-avatar" />
                                        )}
                                        <span className="speaker-name-label">{displayName}</span>
                                        <ExternalLink size={13} className="bio-arrow-icon" />
                                      </button>
                                    ) : (
                                      <div className="speaker-name-static">
                                        {cell.speaker}
                                      </div>
                                    )}

                                    {cell.time && (
                                      <div className="session-time-pill">
                                        ⏰ {cell.time}
                                      </div>
                                    )}

                                    {/* Rewatch Session Button / Status */}
                                    {renderRewatchButton(sessionDate, cell.time, cell.youtubeUrl, cell.isPast, false)}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ================= IN-PERSON SUMMIT PROGRAM TABLE ================= */}
              {(matrixTab === 'all' || matrixTab === 'physical') && (
                <div className="matrix-table-card glass-card">
                  <div className="matrix-table-header physical-theme">
                    <h3>IN-PERSON SUMMIT PROGRAMME</h3>
                    <span className="matrix-subtitle-badge physical">Main Event • Aug 29, 2026</span>
                  </div>

                  <div className="table-responsive-wrapper">
                    <table className="schedule-spreadsheet-table physical-table">
                      <thead>
                        <tr>
                          <th style={{ width: '140px' }}>Time</th>
                          <th style={{ width: '90px' }}>Duration</th>
                          <th>Programme / Session</th>
                          <th>Facilitator / Lead</th>
                        </tr>
                      </thead>
                      <tbody>
                        {physicalSchedule.map((item, pIdx) => {
                          const matchedSpeaker = speakers.find(s => 
                            s.name.toLowerCase().includes(item.facilitator.toLowerCase()) || 
                            (item.facilitator.toLowerCase().includes(s.name.toLowerCase()))
                          );

                          return (
                            <tr key={pIdx}>
                              <td className="time-cell">
                                <strong style={{ color: 'var(--accent-1)' }}>{item.time}</strong>
                              </td>
                              <td className="duration-cell">
                                <span className="duration-pill">{item.duration}</span>
                              </td>
                              <td className="topic-cell">
                                <span style={{ fontWeight: 600, color: '#fff' }}>{item.topic}</span>
                              </td>
                              <td className="facilitator-cell">
                                {matchedSpeaker ? (
                                  <Link to={`/speakers/${matchedSpeaker.id}`} className="facilitator-link">
                                    {matchedSpeaker.img && <img src={matchedSpeaker.img} alt={matchedSpeaker.name} className="mini-avatar" />}
                                    <span>{item.facilitator}</span>
                                    <ExternalLink size={12} />
                                  </Link>
                                ) : (
                                  <span className="facilitator-text" style={{ color: 'var(--text-secondary)' }}>{item.facilitator}</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ==================== TIMELINE / LIST VIEW ==================== */}
        {viewMode === 'list' && (
          <div className="timeline-schedule-container">
            <div className="schedule-tabs">
              <button 
                className={`schedule-tab ${listTab === 'parent' ? 'active' : ''}`}
                onClick={() => setListTab('parent')}
              >
                Virtual Parents (Aug 24-27)
              </button>
              <button 
                className={`schedule-tab ${listTab === 'teen' ? 'active' : ''}`}
                onClick={() => setListTab('teen')}
              >
                Virtual Teens (Aug 24-26)
              </button>
              <button 
                className={`schedule-tab ${listTab === 'physical' ? 'active' : ''}`}
                onClick={() => setListTab('physical')}
              >
                In-Person Summit (Aug 29)
              </button>
            </div>

            <div className="schedule-list">
              {listTab === 'parent' && virtualParentSchedule.map((item, i) => {
                // Find matching speaker in data
                const matchedSpeaker = speakers.find(s => 
                  s.name.toLowerCase().includes(item.facilitator.toLowerCase()) || 
                  (item.facilitator.toLowerCase().includes(s.name.toLowerCase()))
                );

                return (
                  <div className="schedule-item glass-card" key={i}>
                    <div className="schedule-main">
                      <span className="schedule-track-badge parent">Parents Session</span>
                      <h3 className="schedule-topic">{item.topic}</h3>
                      <div className="schedule-facilitator-row">
                        <span className="facilitator-label">Facilitator:</span>
                        {matchedSpeaker ? (
                          <Link to={`/speakers/${matchedSpeaker.id}`} className="facilitator-link">
                            {matchedSpeaker.img && <img src={matchedSpeaker.img} alt={matchedSpeaker.name} className="mini-avatar" />}
                            <span>{item.facilitator}</span>
                            <ExternalLink size={14} />
                          </Link>
                        ) : (
                          <span className="facilitator-text">{item.facilitator}</span>
                        )}
                      </div>
                    </div>
                    <div className="schedule-meta">
                      <div className="schedule-date">📅 {item.date}</div>
                      <div className="schedule-time">⏰ {item.time}</div>
                      {/* Rewatch Session Button / Status */}
                      {renderRewatchButton(item.date, item.time, item.youtubeUrl, item.isPast, true)}
                    </div>
                  </div>
                );
              })}

              {listTab === 'teen' && virtualTeenSchedule.map((item, i) => {
                const matchedSpeaker = speakers.find(s => 
                  s.name.toLowerCase().includes(item.facilitator.toLowerCase()) || 
                  (item.facilitator.toLowerCase().includes(s.name.toLowerCase()))
                );

                return (
                  <div className="schedule-item glass-card" key={i}>
                    <div className="schedule-main">
                      <span className="schedule-track-badge teen">Teens Session</span>
                      <h3 className="schedule-topic">{item.topic}</h3>
                      <div className="schedule-facilitator-row">
                        <span className="facilitator-label">Facilitator:</span>
                        {matchedSpeaker ? (
                          <Link to={`/speakers/${matchedSpeaker.id}`} className="facilitator-link">
                            {matchedSpeaker.img && <img src={matchedSpeaker.img} alt={matchedSpeaker.name} className="mini-avatar" />}
                            <span>{item.facilitator}</span>
                            <ExternalLink size={14} />
                          </Link>
                        ) : (
                          <span className="facilitator-text">{item.facilitator}</span>
                        )}
                      </div>
                    </div>
                    <div className="schedule-meta">
                      <div className="schedule-date">📅 {item.date}</div>
                      <div className="schedule-time">⏰ {item.time}</div>
                      {/* Rewatch Session Button / Status */}
                      {renderRewatchButton(item.date, item.time, item.youtubeUrl, item.isPast, true)}
                    </div>
                  </div>
                );
              })}

              {listTab === 'physical' && physicalSchedule.map((item, i) => {
                const matchedSpeaker = speakers.find(s => 
                  s.name.toLowerCase().includes(item.facilitator.toLowerCase()) || 
                  (item.facilitator.toLowerCase().includes(s.name.toLowerCase()))
                );

                return (
                  <div className="schedule-item glass-card" key={i}>
                    <div className="schedule-main">
                      <span className="schedule-track-badge physical">In-Person Summit</span>
                      <h3 className="schedule-topic">{item.topic}</h3>
                      <div className="schedule-facilitator-row">
                        <span className="facilitator-label">Facilitator / Lead:</span>
                        {matchedSpeaker ? (
                          <Link to={`/speakers/${matchedSpeaker.id}`} className="facilitator-link">
                            {matchedSpeaker.img && <img src={matchedSpeaker.img} alt={matchedSpeaker.name} className="mini-avatar" />}
                            <span>{item.facilitator}</span>
                            <ExternalLink size={14} />
                          </Link>
                        ) : (
                          <span className="facilitator-text">{item.facilitator}</span>
                        )}
                      </div>
                    </div>
                    <div className="schedule-meta">
                      <div className="schedule-date">📅 {item.date}</div>
                      <div className="schedule-time">⏰ {item.time}</div>
                      {item.duration && <div className="schedule-duration" style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: 4, fontWeight: 600 }}>⏱️ {item.duration}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Note Footer */}
        <div className="glass-card schedule-note-card">
          <p>
            <strong style={{ color: 'var(--accent-3)' }}>Note:</strong> All virtual sessions are conducted live online via Zoom/Webinar. Time zones are listed in West African Time (WAT / GMT+1).
          </p>
          <div style={{ marginTop: 16 }}>
            <Link to="/registration" className="btn btn-primary">
              Register for Virtual & Physical Sessions
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
