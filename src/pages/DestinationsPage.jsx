import PageHeader from '../components/PageHeader';
import Newsletter from '../components/Newsletter';
import { useBackToTop } from '../hooks/useScrollReveal';
import { DESTINATIONS } from '../utils/data';
import { Link } from 'react-router-dom';

export default function DestinationsPage() {
  useBackToTop();

  return (
    <>
      <PageHeader
        title="Explore Destinations"
        subtitle="From the world's highest peaks to lush jungle — Nepal has it all"
        breadcrumb={[{ label: 'Destinations' }]}
      />

      <section className="section-pad">
        <div className="container">
          {DESTINATIONS.map((dest, i) => (
            <div
              key={dest.id}
              className="row g-5 align-items-center"
              style={{ marginBottom: 80 }}
            >
              {/* Alternate image side */}
              <div className={`col-lg-6${i % 2 === 1 ? ' order-lg-2' : ''}`}>
                <div className="dest-hero-card">
                  <img src={dest.image} alt={dest.name} loading="lazy" />
                  <div className="dest-hero-overlay">
                    <div>
                      <div className="dest-info-badge">
                        <i className={`bi ${dest.badgeIcon}`} /> {dest.badge}
                      </div>
                      <div className="dest-info-name">{dest.name}</div>
                      <div className="dest-info-count">
                        Altitude: {dest.altitude} · {dest.tours} tours available
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-lg-6${i % 2 === 1 ? ' order-lg-1' : ''}`}>
                <span className="section-label">{dest.badge}</span>
                <h2 className="section-title">{dest.name}</h2>
                <div className="divider" />
                <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 16 }}>
                  {dest.description}
                </p>

                {/* Highlights */}
                <div className="row g-2 mb-4">
                  {dest.highlights.map(h => (
                    <div key={h} className="col-6">
                      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <i
                          className="bi bi-check-circle-fill"
                          style={{ color: 'var(--secondary)', marginTop: 3, flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '.88rem', color: 'var(--text-mid)' }}>{h}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meta */}
                <div
                  style={{
                    display: 'flex',
                    gap: 24,
                    flexWrap: 'wrap',
                    padding: '16px 20px',
                    background: 'var(--bg-light)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 24,
                  }}
                >
                  <div>
                    <div style={{ fontSize: '.72rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>Best Time</div>
                    <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{dest.bestTime}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '.72rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>Altitude</div>
                    <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{dest.altitude}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '.72rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>Tours</div>
                    <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{dest.tours} available</div>
                  </div>
                </div>

                <Link to="/tours" className="btn-primary-custom">
                  <i className="bi bi-compass-fill" /> View {dest.name} Tours
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
