import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useBackToTop } from '../hooks/useScrollReveal';

const CONTACT_INFO = [
  {
    icon: 'bi-geo-alt-fill',
    label: 'Our Office',
    value: 'Thamel Marg, Kathmandu 44600, Nepal',
    sub: null,
  },
  {
    icon: 'bi-telephone-fill',
    label: 'Phone & WhatsApp',
    value: '+977 1 4701234',
    sub: '+977 98 0123456 (WhatsApp)',
  },
  {
    icon: 'bi-envelope-fill',
    label: 'Email',
    value: 'hello@pasatravels.com',
    sub: 'bookings@pasatravels.com',
  },
  {
    icon: 'bi-clock-fill',
    label: 'Office Hours',
    value: 'Sun–Fri: 9:00 AM – 6:00 PM (NPT)',
    sub: 'Saturday: 10:00 AM – 4:00 PM',
  },
];

export default function ContactPage() {
  useBackToTop();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', inquiry: 'General Inquiry', tour: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Wire up to: contactApi.send(form)
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', inquiry: 'General Inquiry', tour: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1800);
  };

  return (
    <>
      <PageHeader
        title="Get In Touch"
        subtitle="We're here to help plan your perfect Nepal adventure"
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="section-pad">
        <div className="container">
          <div className="row g-5">

            {/* LEFT: Info */}
            <div className="col-lg-5">
              <span className="section-label">Reach Out</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>
                We'd Love to Hear From You
              </h2>
              <div className="divider" />
              <p style={{ color: 'var(--text-mid)', marginBottom: 32 }}>
                Whether you're planning your first trek or a seasoned adventurer, our team is ready
                to craft your ideal Nepal experience. Response within 24 hours guaranteed.
              </p>

              {CONTACT_INFO.map(item => (
                <div key={item.label} className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className={`bi ${item.icon}`} />
                  </div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                    {item.sub && (
                      <div style={{ fontSize: '.82rem', color: 'var(--text-light)' }}>{item.sub}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="mt-4">
                <h6 style={{ fontSize: '.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-mid)', marginBottom: 16 }}>
                  Follow Our Adventures
                </h6>
                <div className="d-flex gap-3 flex-wrap">
                  {[
                    { icon: 'bi-facebook', color: '#1877f2', label: 'Facebook' },
                    { icon: 'bi-instagram', color: '#e1306c', label: 'Instagram' },
                    { icon: 'bi-youtube', color: '#ff0000', label: 'YouTube' },
                  ].map(s => (
                    <a key={s.label} href="#" className="social-btn-outline">
                      <i className={`bi ${s.icon}`} style={{ color: s.color }} /> {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="col-lg-7">
              <div className="contact-card">
                <h4 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>
                  Send Us a Message
                </h4>
                <p style={{ color: 'var(--text-mid)', fontSize: '.9rem', marginBottom: 28 }}>
                  Fill out the form and we'll respond within 24 hours.
                </p>

                {status === 'success' && (
                  <div
                    className="mb-4"
                    style={{
                      background: '#d1fae5',
                      border: '1.5px solid #6ee7b7',
                      color: '#065f46',
                      borderRadius: 'var(--radius-sm)',
                      padding: '14px 18px',
                      fontSize: '.9rem',
                    }}
                  >
                    <i className="bi bi-check-circle-fill me-2" />
                    <strong>Message sent!</strong> We'll get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-custom">Full Name *</label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setField('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Email Address *</label>
                      <input
                        type="email"
                        className="form-control form-control-custom"
                        placeholder="john@email.com"
                        value={form.email}
                        onChange={e => setField('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        className="form-control form-control-custom"
                        placeholder="+1 234 567 8901"
                        value={form.phone}
                        onChange={e => setField('phone', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Inquiry Type</label>
                      <select
                        className="form-select form-control-custom"
                        value={form.inquiry}
                        onChange={e => setField('inquiry', e.target.value)}
                      >
                        {['General Inquiry', 'Tour Booking', 'Guide Hire', 'Custom Tour Request', 'Group Booking', 'Other'].map(o => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label-custom">Tour of Interest</label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        placeholder="e.g. Everest Base Camp, Annapurna Circuit..."
                        value={form.tour}
                        onChange={e => setField('tour', e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label-custom">Message *</label>
                      <textarea
                        className="form-control form-control-custom"
                        rows={5}
                        placeholder="Tell us about your dream Nepal adventure..."
                        value={form.message}
                        onChange={e => setField('message', e.target.value)}
                        required
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn-primary-custom"
                        style={{ padding: '14px 32px' }}
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <><span className="spinner-border spinner-border-sm me-2" />Sending...</>
                        ) : (
                          <>Send Message <i className="bi bi-send-fill" /></>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
