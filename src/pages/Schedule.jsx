import { useState } from 'react';
import { virtualTeenSchedule, virtualParentSchedule, physicalSchedule } from '../data/content';

const tabs = [
  { key: 'teen', label: 'Virtual Teen', data: virtualTeenSchedule },
  { key: 'parent', label: 'Virtual Parent', data: virtualParentSchedule },
  { key: 'physical', label: 'Physical', data: physicalSchedule },
];

export default function Schedule() {
  const [active, setActive] = useState('teen');
  const currentTab = tabs.find(t => t.key === active);

  return (
    <section className="page-section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h2 className="section-title">Event Schedule</h2>
        <div className="divider"></div>
        <p className="section-subtitle">Explore our curated sessions designed for teens, parents, and families.</p>
        <div className="schedule-tabs">
          {tabs.map(t => (
            <button key={t.key} className={`schedule-tab ${active === t.key ? 'active' : ''}`} onClick={() => setActive(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="schedule-list">
          {currentTab.data.map((item, i) => (
            <div className="schedule-item" key={i}>
              <div>
                <div className="schedule-topic">{item.topic}</div>
                <div className="schedule-facilitator">{item.facilitator}</div>
              </div>
              <div className="schedule-meta">
                <div className="schedule-date">{item.date}</div>
                <div className="schedule-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card" style={{ maxWidth: 600, margin: '40px auto 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--accent-3)' }}>Note:</strong> All time zones are set to West African Time (WAT).
          </p>
        </div>
      </div>
    </section>
  );
}
