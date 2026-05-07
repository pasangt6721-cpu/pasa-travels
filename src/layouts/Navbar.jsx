import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/guides', label: 'Guides' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar navbar-expand-lg navbar-custom${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand-custom" to="/" onClick={closeMenu}>
          <img src={logo} alt="Pasa Travels Logo" className="navbar-logo" />
          <span>PASA-TRAVELS</span>
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav Links */}
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`}>
          <ul className="navbar-nav mx-auto gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.to} className="nav-item">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `nav-link nav-link-custom${isActive ? ' active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex align-items-center gap-2 ms-3">
            <Link
              to="/login"
              className="nav-link btn-nav-login"
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="nav-link btn-nav-register"
              onClick={closeMenu}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
