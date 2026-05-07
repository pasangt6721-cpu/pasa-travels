import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/guides', label: 'Guides' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/contact', label: 'Contact' },
];

const TOP_TOURS = [
  'EBC Trek',
  'Annapurna Circuit',
  'Langtang Valley',
  'Upper Mustang',
  'Pokhara Tour',
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <img src={logo} alt="Pasa Travels Logo" className="footer-logo" />
              <span>PASA-TRAVELS</span>
            </div>
            <p className="footer-desc">
              Nepal's leading trekking and tour operator. We connect adventurous travelers
              with certified local guides for unforgettable Himalayan experiences since 2012.
            </p>
            <div className="footer-social">
              {[
                { icon: 'bi-facebook', label: 'Facebook' },
                { icon: 'bi-instagram', label: 'Instagram' },
                { icon: 'bi-twitter-x', label: 'Twitter' },
                { icon: 'bi-youtube', label: 'YouTube' },
                { icon: 'bi-star-fill', label: 'TripAdvisor' },
              ].map(s => (
                <a key={s.label} href="#" className="social-link" aria-label={s.label}>
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              {QUICK_LINKS.map(link => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <i className="bi bi-chevron-right" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Tours */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="footer-heading">Top Tours</h6>
            <ul className="footer-links">
              {TOP_TOURS.map(t => (
                <li key={t}>
                  <Link to="/tours">
                    <i className="bi bi-chevron-right" /> {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Contact Us</h6>
            {[
              {
                icon: 'bi-geo-alt-fill',
                label: 'Address',
                value: 'Thamel, Kathmandu, Nepal 44600',
              },
              {
                icon: 'bi-telephone-fill',
                label: 'Phone',
                value: '+977 1 4701234 · +977 98 0123456',
              },
              {
                icon: 'bi-envelope-fill',
                label: 'Email',
                value: 'hello@pasatravels.com',
              },
            ].map(item => (
              <div key={item.label} className="footer-contact-item">
                <div className="footer-contact-icon">
                  <i className={`bi ${item.icon}`} />
                </div>
                <div>
                  <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.45)', marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.8)' }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <span className="footer-bottom-text">© 2025 PASA-TRAVELS. All rights reserved.</span>
            <div className="d-flex gap-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(p => (
                <a
                  key={p}
                  href="#"
                  style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.4)', transition: 'color .3s' }}
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
