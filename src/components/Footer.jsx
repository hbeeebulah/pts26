import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Parent-Teen Summit</h3>
            <div className="footer-contact-item"><MapPin size={16} /><span>Timeless Soul Inc, Lagos, Nigeria</span></div>
            <div className="footer-contact-item"><Phone size={16} /><span>0913 822 8157</span></div>
            <div className="footer-contact-item"><Mail size={16} /><span>info@timelessoul.com</span></div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/schedule">Schedule</Link>
              <Link to="/speakers">Speakers</Link>
              <Link to="/registration">Register</Link>
            </div>
          </div>
          <div>
            <h3>Connect With Us</h3>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">f</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">𝕏</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">📷</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">in</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Parent-Teen Summit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
