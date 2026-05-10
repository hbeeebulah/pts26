import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/speakers', label: 'Speakers' },
    { to: '/awards', label: 'Awards' },
    { to: '/registration', label: 'Register' },
    { to: '/sponsors', label: 'Sponsors' },
    { to: '/team', label: 'Team' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="nav-logo">PTS 2026</Link>
          <div className="nav-links">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''}>{l.label}</Link>
            ))}
          </div>
          <button className="nav-toggle" onClick={() => setMenuOpen(true)}><Menu size={28} /></button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}><X size={32} /></button>
        {links.map(l => (
          <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
      </div>
    </>
  );
}
