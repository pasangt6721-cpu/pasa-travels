import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Newsletter from '../components/Newsletter';
import { useBackToTop } from '../hooks/useScrollReveal';
import { TOURS } from '../utils/data';

const ITINERARY = [
  { day: 'Day 1', title: 'Arrival & Orientation', desc: 'Arrive in Kathmandu, hotel check-in, evening briefing with your guide.' },
  { day: 'Day 2', title: 'Fly to Lukla — Trek to Phakding', desc: 'Scenic 35-minute flight to Tenzing-Hillary Airport, begin trek through pine forests.' },
  { day: 'Day 3', title: 'Phakding to Namche Bazaar', desc: 'Trek through the Sagarmatha National Park entrance, steep ascent to Namche Bazaar (3,440m).' },
  { day: 'Day 4', title: 'Acclimatization Day at Namche', desc: 'Rest day for acclimatization. Optional hike to Everest View Hotel for first Everest views.' },
  { day: 'Day 5', title: 'Namche to Tengboche', desc: 'Trek past Khumjung village, rhododendron forests, and arrive at the iconic Tengboche Monastery.' },
];

const INCLUDES = [
  { yes: true,  text: 'Airport transfers & domestic flights' },
  { yes: true,  text: 'All accommodation (hotel + teahouses)' },
  { yes: true,  text: 'Certified guide & porter service' },
  { yes: true,  text: 'All meals during the trek' },
  { yes: true,  text: 'Sagarmatha National Park permits' },
  { yes: false, text: 'International flights' },
  { yes: false, text: 'Travel insurance (required)' },
  { yes: false, text: 'Personal gear & equipment' },
];

export default function TourDetailPage() {
  useBackToTop();
  const { id } = useParams();
  const tour = TOURS.find(t => t.id === Number(id)) || TOURS[0];

  const [travelers, setTravelers] = useState(1);
  const [bookDate, setBookDate] = useState('');
  const [bookStatus, setBookStatus] = useState('idle');

  const today = new Date().toISOString().split('T')[0];
  const subtotal = tour.price * travelers;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const handleBook = (e) => {
    e.preventDefault();
    setBookStatus('loading');
    setTimeout(() => {
      setBookStatus('confirmed');
      setTimeout(() => setBookStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <>
      <PageHeader
        title={tour.title}
        subtitle={tour.location}
        breadcrumb={[{ label: 'Tours', to: '/tours' }, { label: tour.title }]}
      />

      <section className="section-pad">
        <div className="container">
          <div className="row g-5">
            {/* LEFT: Tour Content */}
            <div className="col-lg-8">
              {/* Hero Image */}
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 32 }}>
                <img src={tour.image} alt={tour.title} style={{ width: '100%', height: 400, objectFit: 'cover' }} />
              </div>

              {/* Quick Stats */}
              <div className="row g-3 mb-5">
                {[
                  { icon: 'bi-calendar3',      label: 'Duration',   val: `${tour.days} Days` },
                  { icon: 'bi-bar-chart-fill', label: 'Difficulty', val: tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1) },
                  { icon: 'bi-person-fill',    label: 'Max Group',  val: `${tour.maxGroup} People` },
                  { icon: 'bi-star-fill',      label: 'Rating',     val: `${tour.rating} (${tour.reviews} reviews)` },
                ].map(s => (
                  <div key={s.label} className="col-6 col-md-3">
                    <div className="feature-card" style={{ padding: '20px 16px' }}>
                      <div className="feature-icon" style={{ width: 48, height: 48, fontSize: '1.2rem', marginBottom: 12 }}>
                        <i className={`bi ${s.icon}`} />
                      </div>
                      <div style={{ fontSize: '.75rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontWeight: 700, fontSize: '.95rem' }}>{s.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <h3 style={{ marginBottom: 16 }}>Tour Overview</h3>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 32 }}>
                Experience the awe-inspiring {tour.title} — one of Nepal's most iconic adventures.
                This carefully crafted itinerary balances challenge with comfort, taking you through
                breathtaking landscapes, authentic Himalayan villages, and unforgettable mountain vistas.
                Our certified guides ensure your safety and enrich your journey with deep local knowledge.
              </p>

              {/* Itinerary */}
              <h3 style={{ marginBottom: 24 }}>Itinerary</h3>
              <div style={{ marginBottom: 40 }}>
                {ITINERARY.map((item, i) => (
                  <div key={i} className="itinerary-item">
                    <div className="itinerary-day">
                      <span>{item.day}</span>
                    </div>
                    <div className="itinerary-content">
                      <h6>{item.title}</h6>
                      <p style={{ color: 'var(--text-mid)', fontSize: '.9rem', margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Includes / Excludes */}
              <h3 style={{ marginBottom: 24 }}>What's Included</h3>
              <div className="row g-2">
                {INCLUDES.map((item, i) => (
                  <div key={i} className="col-md-6">
                    <div className="include-item">
                      <i className={`bi ${item.yes ? 'bi-check-circle-fill icon-yes' : 'bi-x-circle-fill icon-no'}`} />
                      <span style={{ fontSize: '.9rem', color: 'var(--text-mid)' }}>{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Booking Card */}
            <div className="col-lg-4">
              <div className="booking-card">
                <h4>${tour.price.toLocaleString()}</h4>
                <div className="booking-price-sub">per person · all inclusive</div>

                <form onSubmit={handleBook} data-base-price={tour.price}>
                  {/* Date */}
                  <div className="mb-3">
                    <label className="form-label-custom">Departure Date</label>
                    <input
                      type="date"
                      className="form-control form-control-custom"
                      min={today}
                      value={bookDate}
                      onChange={e => setBookDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Travelers */}
                  <div className="mb-3">
                    <label className="form-label-custom">Number of Travelers</label>
                    <input
                      type="number"
                      className="form-control form-control-custom"
                      min={1}
                      max={tour.maxGroup}
                      value={travelers}
                      onChange={e => setTravelers(Math.max(1, Math.min(tour.maxGroup, Number(e.target.value))))}
                    />
                  </div>

                  {/* Summary */}
                  <div className="booking-summary">
                    <div className="row mb-2">
                      <div className="col">
                        <span style={{ fontSize: '.88rem', color: 'var(--text-mid)' }}>
                          ${tour.price.toLocaleString()} × {travelers}
                        </span>
                      </div>
                      <div className="col-auto">
                        <span style={{ fontSize: '.88rem' }}>${subtotal.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col"><span style={{ fontSize: '.88rem', color: 'var(--text-mid)' }}>Taxes & Fees (10%)</span></div>
                      <div className="col-auto"><span style={{ fontSize: '.88rem' }}>${tax.toLocaleString()}</span></div>
                    </div>
                    <div className="row" style={{ borderTop: '1px dashed var(--border)', paddingTop: 12, marginTop: 4 }}>
                      <div className="col"><strong>Total</strong></div>
                      <div className="col-auto"><strong style={{ color: 'var(--primary)' }}>${total.toLocaleString()}</strong></div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary-custom w-100 justify-content-center"
                    style={{ padding: 14 }}
                    disabled={bookStatus === 'loading'}
                  >
                    {bookStatus === 'loading' ? (
                      <><span className="spinner-border spinner-border-sm me-2" />Processing...</>
                    ) : bookStatus === 'confirmed' ? (
                      <>✓ Booking Confirmed!</>
                    ) : (
                      <>Book Now <i className="bi bi-arrow-right-circle-fill" /></>
                    )}
                  </button>
                </form>

                <div className="text-center mt-3" style={{ fontSize: '.8rem', color: 'var(--text-light)' }}>
                  <i className="bi bi-shield-check me-1" /> Free cancellation up to 48 hours before
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
