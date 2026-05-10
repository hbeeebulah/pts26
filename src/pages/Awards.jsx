import { awardCategories } from '../data/content';

export default function Awards() {
  const cards = [
    { key: 'villageBuilder', headerClass: 'village' },
    { key: 'futureVillage', headerClass: 'future' },
    { key: 'futureForward', headerClass: 'forward' },
  ];

  return (
    <section className="page-section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h2 className="section-title">Summit Awards Program</h2>
        <div className="divider"></div>
        <p className="section-subtitle">Honouring excellence in family engagement and youth development.</p>
        <div className="awards-list">
          {cards.map(c => {
            const data = awardCategories[c.key];
            return (
              <div className="award-card" key={c.key}>
                <div className={`award-header ${c.headerClass}`}>
                  <h3>{data.title}</h3>
                  <p>{data.subtitle}</p>
                </div>
                <div className="award-body">
                  <p>{data.description}</p>
                  <div className="nominations-title">NOMINATIONS OPEN FOR:</div>
                  <div className="nominations-grid">
                    {data.nominations.map(n => (
                      <span className="nomination-tag" key={n}>{n}</span>
                    ))}
                  </div>
                  {data.link && (
                    <div style={{ marginTop: 24 }}>
                      <a href={data.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Nominate Now</a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
