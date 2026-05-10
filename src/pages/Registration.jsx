import { Link } from 'react-router-dom';

export default function Registration() {
  const cards = [
    {
      title: 'Virtual Teen Attendance', price: 'Free', cls: 'virtual',
      features: ['Live stream of all sessions', '30-day access to recordings', 'Virtual Q&A participation', 'Networking opportunities'],
      link: 'https://lu.ma/3wqqzva5', btnClass: 'btn btn-primary',
    },
    {
      title: 'Virtual Parent Attendance', price: 'Free', cls: 'parent',
      features: ['Live stream of all sessions', 'Digital workbook and resources', '30-day access to recordings', 'Virtual Q&A participation'],
      link: 'https://lu.ma/9yd6nja6', btnClass: 'btn btn-warm',
    },
    {
      title: 'On-site Summit/Awards', price: 'Paid', cls: 'onsite',
      features: ['Full access to all sessions', 'Lunch and refreshments', 'Physical resource materials', 'Networking opportunities'],
      link: 'https://www.eventporte.com/event-details/PTS2025', btnClass: 'btn btn-secondary',
    },
  ];

  return (
    <section className="page-section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h2 className="section-title">Registration</h2>
        <div className="divider"></div>
        <p className="section-subtitle">Select your preferred attendance option below. You will be redirected to our secure registration platform.</p>
        <div className="reg-grid">
          {cards.map((c, i) => (
            <div className={`reg-card ${c.cls}`} key={i}>
              <h3>{c.title}</h3>
              <div className="price">{c.price}</div>
              <ul>{c.features.map(f => <li key={f}>{f}</li>)}</ul>
              <a href={c.link} target="_blank" rel="noopener noreferrer" className={c.btnClass} style={{ width: '100%' }}>Register</a>
            </div>
          ))}
        </div>
        <div className="glass-card" style={{ maxWidth: 600, margin: '40px auto 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--accent-3)' }}>Note:</strong> Ticket closes 48 hours before the event. Contact{' '}
            <a href="mailto:info@timelessoul.com" style={{ color: 'var(--accent-1)', textDecoration: 'underline' }}>info@timelessoul.com</a> to learn more.
          </p>
        </div>
      </div>
    </section>
  );
}
