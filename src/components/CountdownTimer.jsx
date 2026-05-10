import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const target = new Date('2026-08-24T00:00:00');

  function calcTime() {
    const diff = target - new Date();
    return {
      days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  }

  const [time, setTime] = useState(calcTime());

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page-section countdown-section">
      <div className="container">
        <h2 className="section-title">Countdown to PTS 2026</h2>
        <div className="divider" style={{ marginBottom: 48 }}></div>
        <div className="countdown-grid">
          {[
            { val: time.days, label: 'Days' },
            { val: time.hours, label: 'Hours' },
            { val: time.minutes, label: 'Minutes' },
            { val: time.seconds, label: 'Seconds' },
          ].map(item => (
            <div className="countdown-item" key={item.label}>
              <div className="number">{String(item.val).padStart(2, '0')}</div>
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
