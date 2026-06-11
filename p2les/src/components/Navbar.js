import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import '../resources/css/Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/especialidades', label: 'Especialidades' },
  { to: '/medicos', label: 'Médicos' },
  { to: '/contato', label: 'Contato' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Brand */}
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark">V</span>
          <span className="navbar__brand-text">
            <span className="navbar__brand-main">Vitae</span>
            <span className="navbar__brand-sub">Clínica Médica</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="navbar__actions">
          <a href="tel:+551134567890" className="navbar__phone">
            <Phone size={14} />
            (11) 3456-7890
          </a>
          <Link to="/agendamento" className="btn-cta">
            Agendar Consulta
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`navbar__mobile-link ${location.pathname === to ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link to="/agendamento" className="btn-cta btn-cta--mobile">
          Agendar Consulta
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
