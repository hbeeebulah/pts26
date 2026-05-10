import { teamMembers } from '../data/content';

export default function Team() {
  return (
    <section className="page-section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h2 className="section-title">Our Team</h2>
        <div className="divider"></div>
        <p className="section-subtitle">The dedicated individuals behind the Parents Teens Summit.</p>
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div className="team-card" key={i}>
              <img className="team-img" src={m.img} alt={m.name} />
              <h3>{m.name}</h3>
              <div className="role">{m.role}</div>
              <p className="bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
