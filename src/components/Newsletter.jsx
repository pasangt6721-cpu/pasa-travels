import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate API call — wire up to newsletterApi.subscribe(email)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <section className="newsletter-section">
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <h2 className="newsletter-title">Get Travel Inspiration & Deals</h2>
            <p className="newsletter-sub">
              Join 5,000+ adventurers. Get exclusive offers, trek updates, and travel tips straight to your inbox.
            </p>
          </div>
          <div className="col-lg-6">
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn-primary-custom"
                  style={{ borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '13px 24px' }}
                  disabled={status === 'loading' || status === 'success'}
                >
                  {status === 'loading' ? (
                    <><span className="spinner-border spinner-border-sm me-2" /> Subscribing...</>
                  ) : status === 'success' ? (
                    <>✓ Subscribed!</>
                  ) : (
                    <>Subscribe <i className="bi bi-send-fill" /></>
                  )}
                </button>
              </div>
              <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginTop: 8, marginBottom: 0 }}>
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
