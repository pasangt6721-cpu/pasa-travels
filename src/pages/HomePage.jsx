import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TourCard from '../components/TourCard';
import GuideCard from '../components/GuideCard';
import Newsletter from '../components/Newsletter';
import { useBackToTop } from '../hooks/useScrollReveal';
import { TOURS, GUIDES, DESTINATIONS, TESTIMONIALS } from '../utils/data';

// ── Counter animation hook ──────────────────────────────────────
function useCounter(target, suffix = '') {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 24);
      observer.unobserve(el);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);
  return ref;
}

// ── Scroll reveal hook ──────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => { el.style.opacity = ''; el.classList.add('animate-fade-up'); }, delay);
      observer.unobserve(el);
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

// ── Hero Search Card ─────────────────────────────────────────────
function HeroSearchCard() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ location: '', date: today, travelers: '1 Person' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.location) params.set('location', form.location);
    if (form.date) params.set('date', form.date);
    if (form.travelers) params.set('travelers', form.travelers);
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <div className="search-card">
      <h5><i className="bi bi-search text-primary-custom me-2" />Find Your Perfect Tour</h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 search-field">
            <label htmlFor="searchLocation">Destination</label>
            <select
              className="form-select"
              id="searchLocation"
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            >
              <option value="">All Destinations</option>
              {['Everest Region', 'Annapurna Region', 'Kathmandu Valley', 'Pokhara', 'Langtang', 'Mustang'].map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="col-6 search-field">
            <label htmlFor="searchDate">Departure Date</label>
            <input
              type="date"
              className="form-control"
              id="searchDate"
              min={today}
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </div>
          <div className="col-6 search-field">
            <label htmlFor="searchTravelers">Travelers</label>
            <select
              className="form-select"
              id="searchTravelers"
              value={form.travelers}
              onChange={e => setForm(f => ({ ...f, travelers: e.target.value }))}
            >
              {['1 Person', '2 People', '3-5 People', '6+ People'].map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn-primary-custom w-100 justify-content-center">
              <i className="bi bi-search" /> Search Tours
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ── Feature Cards ────────────────────────────────────────────────
const FEATURES = [
  { icon: 'bi-shield-fill-check', title: 'Certified Guides', text: 'All guides are government-certified with years of mountain experience.' },
  { icon: 'bi-currency-dollar',   title: 'Best Price Guarantee', text: 'We match any lower price you find for the same tour package.' },
  { icon: 'bi-headset',           title: '24/7 Support', text: 'Our support team is always available before and during your trip.' },
  { icon: 'bi-arrow-counterclockwise', title: 'Free Cancellation', text: 'Cancel up to 48 hours before departure for a full refund.' },
];

// ── Homepage ─────────────────────────────────────────────────────
export default function HomePage() {
  useBackToTop();

  const countTravelers = useCounter(1200, '+');
  const countRoutes    = useCounter(48, '+');
  const countReviews   = useCounter(95, '%');

  const featureRefs = [useReveal(0), useReveal(80), useReveal(160), useReveal(240)];
  const tourRefs    = [useReveal(0), useReveal(80), useReveal(160), useReveal(0), useReveal(80), useReveal(160)];
  const destRef     = useReveal(0);
  const dest2       = useReveal(60);
  const dest3       = useReveal(120);
  const dest4       = useReveal(180);
  const guideRefs   = [useReveal(0), useReveal(80), useReveal(160), useReveal(240)];
  const reviewRefs  = [useReveal(0), useReveal(80), useReveal(160)];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="container py-5">
          <div className="row align-items-center gy-5">
            {/* Left: Copy */}
            <div className="col-lg-6 hero-content">
              <div className="hero-eyebrow animate-fade-up">
                <i className="bi bi-star-fill" /> #1 Trekking Company in Nepal
              </div>
              <h1 className="hero-title animate-fade-up-d1">
                Explore Nepal with<br /><span>Expert Local</span> Guides
              </h1>
              <p className="hero-subtitle animate-fade-up-d2">
                From Everest Base Camp to Annapurna Circuit, discover the world's most breathtaking
                landscapes with certified, passionate guides who know every trail.
              </p>
              <div className="d-flex flex-wrap gap-3 animate-fade-up-d3">
                <Link to="/tours" className="btn-primary-custom">
                  <i className="bi bi-compass-fill" /> Explore Tours
                </Link>
                <Link to="/guides" className="btn-white">
                  <i className="bi bi-person-fill" /> Meet Our Guides
                </Link>
              </div>

              <div className="hero-stats animate-fade-up-d3">
                <div>
                  <div className="hero-stat-num" ref={countTravelers}>0+</div>
                  <div className="hero-stat-label">Happy Travelers</div>
                </div>
                <div>
                  <div className="hero-stat-num" ref={countRoutes}>0+</div>
                  <div className="hero-stat-label">Tour Routes</div>
                </div>
                <div>
                  <div className="hero-stat-num" ref={countReviews}>0%</div>
                  <div className="hero-stat-label">5-Star Reviews</div>
                </div>
              </div>
            </div>

            {/* Right: Search Card */}
            <div className="col-lg-5 offset-lg-1 animate-fade-up-d2">
              <HeroSearchCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="section-pad-sm bg-light-custom">
        <div className="container">
          <div className="row g-4">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="col-6 col-md-3" ref={featureRefs[i]}>
                <div className="feature-card">
                  <div className="feature-icon"><i className={`bi ${f.icon}`} /></div>
                  <h5>{f.title}</h5>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURS ───────────────────────────────────── */}
      <section className="section-pad">
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-lg-6">
              <span className="section-label">Top Picks</span>
              <h2 className="section-title">Featured Tours</h2>
              <div className="divider" />
              <p className="section-sub">
                Handpicked adventures for every type of traveler, from gentle cultural walks to epic mountain treks.
              </p>
            </div>
            <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
              <Link to="/tours" className="btn-secondary-custom">
                View All Tours <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>

          <div className="row g-4">
            {TOURS.slice(0, 6).map((tour, i) => (
              <div key={tour.id} className="col-md-6 col-lg-4" ref={tourRefs[i]}>
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ─────────────────────────────── */}
      <section className="section-pad bg-light-custom">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label">Where To Go</span>
            <h2 className="section-title">Popular Destinations</h2>
            <div className="divider mx-auto" />
            <p className="section-sub mx-auto text-center">
              Nepal's landscapes range from lush subtropical forests to the world's highest peaks.
            </p>
          </div>

          <div className="destinations-grid">
            {/* Featured: Everest */}
            <div className="dest-card dest-card-featured dest-card-lg" ref={destRef}>
              <img
                src="https://images.unsplash.com/photo-1484910292437-025e5d13ce87?w=800&auto=format&fit=crop"
                alt="Everest"
                loading="lazy"
              />
              <div className="dest-overlay">
                <div>
                  <div className="dest-info-name">Everest Region</div>
                  <div className="dest-info-count"><i className="bi bi-compass me-1" />12 tours available</div>
                </div>
              </div>
            </div>

            {[
              { name: 'Annapurna', tours: 9, img: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&auto=format&fit=crop', ref: dest2 },
              { name: 'Kathmandu', tours: 8, img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop', ref: dest3 },
              { name: 'Pokhara',   tours: 6, img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop', ref: dest4 },
            ].map(d => (
              <div key={d.name} className="dest-card" ref={d.ref}>
                <img src={d.img} alt={d.name} loading="lazy" />
                <div className="dest-overlay">
                  <div>
                    <div className="dest-info-name">{d.name}</div>
                    <div className="dest-info-count"><i className="bi bi-compass me-1" />{d.tours} tours</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/destinations" className="btn-secondary-custom">
              <i className="bi bi-map-fill" /> Explore All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOP GUIDES ───────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-lg-6">
              <span className="section-label">Our Experts</span>
              <h2 className="section-title">Meet Top Guides</h2>
              <div className="divider" />
              <p className="section-sub">
                Every guide is certified, experienced, and passionate about sharing Nepal's wonders with you.
              </p>
            </div>
            <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
              <Link to="/guides" className="btn-secondary-custom">
                All Guides <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>

          <div className="row g-4">
            {GUIDES.slice(0, 4).map((guide, i) => (
              <div key={guide.id} className="col-md-6 col-lg-3" ref={guideRefs[i]}>
                <GuideCard guide={guide} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section-pad bg-light-custom">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label">Traveler Stories</span>
            <h2 className="section-title">What Our Guests Say</h2>
            <div className="divider mx-auto" />
          </div>

          <div className="row g-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id} className="col-md-6 col-lg-4" ref={reviewRefs[i]}>
                <div className="review-card">
                  <div className="review-quote">"</div>
                  <p className="review-text">{t.text}</p>
                  <div className="review-user">
                    <img src={t.avatar} alt={t.name} className="review-avatar" loading="lazy" />
                    <div>
                      <div className="review-name">{t.name}</div>
                      <div className="tour-card-rating" style={{ marginBottom: 2 }}>
                        <span className="stars">{'★'.repeat(t.rating)}</span>
                      </div>
                      <div className="review-country">
                        <i className="bi bi-geo-alt" /> {t.country}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────── */}
      <Newsletter />
    </>
  );
}
