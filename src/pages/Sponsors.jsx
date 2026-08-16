import { useState } from 'react';
import { partners, sponsors } from '../data/content';
import { Sparkles, HeartHandshake, Store, ExternalLink, Mail, Phone, X, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

// Custom inline SVG for pixel-perfect Instagram icon with official gradient
function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function Sponsors() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Sponsor'); // 'Sponsor' or 'Exhibitor'

  const openModal = (type) => {
    setModalType(type);
    setInquiryModalOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sponsors-page-wrapper">
      {/* ===== Hero Header ===== */}
      <section className="sponsors-hero">
        <div className="container">
          <div className="sponsors-hero-content">
            <span className="hero-badge">
              <Sparkles size={16} /> PTS 2026 Collaboration
            </span>
            <h1 className="sponsors-hero-title">
              Sponsors, Partners & Exhibitors
            </h1>
            <p className="sponsors-hero-subtitle">
              Empowering families, young minds, and communities through strategic collaboration and visionary partnerships.
            </p>
            
            {/* Anchor jump links */}
            <div className="sponsors-anchor-pills">
              <button onClick={() => scrollToSection('sponsors')} className="anchor-pill">
                <Award size={18} /> Sponsors
              </button>
              <button onClick={() => scrollToSection('partners')} className="anchor-pill active">
                <HeartHandshake size={18} /> Partners
              </button>
              <button onClick={() => scrollToSection('exhibitors')} className="anchor-pill">
                <Store size={18} /> Exhibitors
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* ========================================================= */}
        {/* SECTION 1: SPONSORS HEADING                               */}
        {/* ========================================================= */}
        <section id="sponsors" className="sponsors-section-block">
          <div className="section-header-badge-wrapper">
            <span className="section-badge sponsors-badge">
              <Award size={16} /> SECTION 01
            </span>
            <h2 className="sponsors-main-heading">Sponsors</h2>
            <div className="heading-gradient-bar"></div>
            <p className="sponsors-section-subtext">
              We are currently updating our official PTS 2026 sponsor directory. 
              Our sponsors make this empowerment vision accessible to thousands of parents and teens across Africa and beyond.
            </p>
          </div>

          {/* Sponsor Status Announcement Card */}
          <div className="sponsor-notice-card">
            <div className="notice-icon-box">
              <ShieldCheck size={32} />
            </div>
            <div className="notice-content">
              <h3>PTS 2026 Sponsor Logos Updating Soon</h3>
              <p>
                Sponsorship opportunities for PTS 2026 are actively open. Partner with us to showcase your brand to 1,000+ parents, educators, and teens.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => openModal('Sponsor')}>
              Become a Sponsor
            </button>
          </div>

          {/* Official Sponsors Grid */}
          <div className="sponsors-showcase-wrapper" style={{ marginTop: '32px' }}>
            <div className="sponsors-grid">
              {sponsors.map((s, i) => (
                <div className="sponsor-card" key={i}>
                  <div className="sponsor-logo-box">
                    <img src={s.logo} alt={s.name} loading="lazy" />
                  </div>
                  <span className="sponsor-name">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 2: PARTNER HEADING                                */}
        {/* ========================================================= */}
        <section id="partners" className="sponsors-section-block highlight-section">
          <div className="section-header-badge-wrapper">
            <span className="section-badge partners-badge">
              <HeartHandshake size={16} /> SECTION 02
            </span>
            <h2 className="sponsors-main-heading">Partners</h2>
            <div className="heading-gradient-bar"></div>
            <p className="sponsors-section-subtext">
              Recognizing our strategic partners who provide invaluable expertise, resources, and creative solutions to elevate the Parents-Teens Summit.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="partners-grid-container">
            {partners.map((partner) => (
              <div className="partner-card" key={partner.id}>
                <div className="partner-category-chip">
                  {partner.category}
                </div>

                {/* Logo Frame */}
                <div className="partner-logo-stage" style={partner.logoBg ? { background: partner.logoBg } : undefined}>
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} Logo`} 
                    className="partner-logo-img" 
                  />
                </div>

                {/* Details */}
                <div className="partner-card-body">
                  <h3 className="partner-name">{partner.name}</h3>
                  <div className="partner-subtitle">{partner.subtitle}</div>
                  <p className="partner-description">{partner.description}</p>
                  
                  <div className="partner-divider"></div>

                  {/* INSTAGRAM LINK & LOGO (Required below partner logo) */}
                  <div className="partner-social-block">
                    <a 
                      href={partner.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="partner-instagram-btn"
                      title={`Visit ${partner.name} on Instagram`}
                    >
                      <span className="insta-icon-wrapper">
                        <InstagramIcon size={18} />
                      </span>
                      <span className="insta-btn-text">Connect on Instagram</span>
                      <ExternalLink size={14} className="insta-ext-link" />
                    </a>
                    {partner.instagramHandle && (
                      <span className="partner-insta-handle">{partner.instagramHandle}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 3: EXHIBITOR HEADING                              */}
        {/* ========================================================= */}
        <section id="exhibitors" className="sponsors-section-block">
          <div className="section-header-badge-wrapper">
            <span className="section-badge exhibitors-badge">
              <Store size={16} /> SECTION 03
            </span>
            <h2 className="sponsors-main-heading">Exhibitors</h2>
            <div className="heading-gradient-bar"></div>
            <p className="sponsors-section-subtext">
              Our interactive exhibition hall features visionary brands, educational institutions, tech innovators, and teen-focused products.
            </p>
          </div>

          {/* Exhibitors Status & Invitation Card */}
          <div className="exhibitors-card-container">
            <div className="exhibitor-hero-box">
              <div className="exhibitor-tag">
                <Store size={20} /> PTS 2026 Exhibition Hall
              </div>
              <h3 className="exhibitor-title">Exhibitor Logos & Directory Coming Soon</h3>
              <p className="exhibitor-subtext">
                We will be uploading our official 2026 exhibitor logos and booth allocations shortly. 
                Are you interested in exhibiting your organization, product, or institution at the summit?
              </p>

              <div className="exhibitor-benefits-grid">
                <div className="benefit-item">
                  <CheckCircle2 size={20} className="benefit-check" />
                  <span>Direct physical & virtual booth access to 1,000+ attendees</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={20} className="benefit-check" />
                  <span>On-stage brand mention & program guide placement</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={20} className="benefit-check" />
                  <span>Dedicated live feature during physical & virtual sessions</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={20} className="benefit-check" />
                  <span>Networking with educators, speakers, and youth leaders</span>
                </div>
              </div>

              <div className="exhibitor-action-bar">
                <button className="btn btn-warm" onClick={() => openModal('Exhibitor')}>
                  Apply for Exhibition Booth
                </button>
                <a href="mailto:info@timelessoul.com?subject=PTS%202026%20Exhibitor%20Inquiry" className="btn btn-secondary">
                  Contact Exhibition Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== Inquiry Modal ===== */}
      {inquiryModalOpen && (
        <div className="sponsors-modal-overlay" onClick={() => setInquiryModalOpen(false)}>
          <div className="sponsors-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setInquiryModalOpen(false)}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <span className="modal-badge">{modalType} Partner</span>
              <h3>Join PTS 2026 as a {modalType}</h3>
              <p>Connect with our partnership team to reserve your slot or download our sponsorship deck.</p>
            </div>

            <div className="modal-contact-details">
              <div className="modal-contact-item">
                <Phone size={20} />
                <div>
                  <strong>Phone / WhatsApp:</strong>
                  <span>0913 822 8157</span>
                </div>
              </div>

              <div className="modal-contact-item">
                <Mail size={20} />
                <div>
                  <strong>Email Inquiry:</strong>
                  <span>info@timelessoul.com</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <a 
                href={`mailto:info@timelessoul.com?subject=PTS%202026%20${modalType}%20Inquiry`} 
                className="btn btn-primary" 
                style={{ width: '100%' }}
              >
                Send Email Inquiry
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
