import { speakers as speakersData } from '../data/content';

export default function Speakers() {
  return (
    <section className="page-section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h2 className="section-title">Meet Our Speakers</h2>
        <div className="divider"></div>
        <p className="section-subtitle">Industry experts and thought leaders committed to empowering families and youth.</p>
        <div className="speakers-grid">
          {speakersData.map((s, i) => (
            <div className="speaker-card" key={i}>
              <div className="speaker-img-wrapper">
                <img className="speaker-img" src={s.img} alt={s.name} />
              </div>
              <div className="speaker-info">
                <h3>{s.name}</h3>
                <p>{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
