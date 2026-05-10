import { sponsors } from '../data/content';

export default function Sponsors() {
  return (
    <section className="page-section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h2 className="section-title">Our Valued Sponsors & Partners</h2>
        <div className="divider"></div>
        <p className="section-subtitle">Thank you to our sponsors who make this event possible.</p>
        <div className="sponsors-grid">
          {sponsors.map((s, i) => (
            <div className="sponsor-card" key={i}>
              <img src={s.logo} alt={s.name} />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
