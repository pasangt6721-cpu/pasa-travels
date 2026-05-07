import { useRef, useEffect } from 'react';
import GuideCard from '../components/GuideCard';
import PageHeader from '../components/PageHeader';
import Newsletter from '../components/Newsletter';
import { useBackToTop } from '../hooks/useScrollReveal';
import { GUIDES } from '../utils/data';

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

const STATS = [
  { icon: 'bi-person-check-fill', label: 'Certified Guides', count: 24, suffix: '+' },
  { icon: 'bi-translate',         label: 'Languages Spoken', count: 12, suffix: '+' },
  { icon: 'bi-star-fill',         label: 'Average Rating',   count: null, fixed: '4.9' },
  { icon: 'bi-map-fill',          label: 'Trips Completed',  count: 3000, suffix: '+' },
];

export default function GuidesPage() {
  useBackToTop();

  const c1 = useCounter(24, '+');
  const c2 = useCounter(12, '+');
  const c4 = useCounter(3000, '+');

  const counterRefs = [c1, c2, null, c4];

  return (
    <>
      <PageHeader
        title="Meet Our Expert Guides"
        subtitle="All guides are government-certified with extensive mountain and cultural expertise"
        breadcrumb={[{ label: 'Guides' }]}
      />

      <section className="section-pad">
        <div className="container">

          {/* Stats Bar */}
          <div className="row g-4 mb-5">
            {STATS.map((s, i) => (
              <div key={s.label} className="col-6 col-md-3 text-center">
                <div className="feature-card">
                  <div className="feature-icon mx-auto"><i className={`bi ${s.icon}`} /></div>
                  <div
                    ref={counterRefs[i]}
                    style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}
                  >
                    {s.fixed || '0' + (s.suffix || '')}
                  </div>
                  <div style={{ fontSize: '.85rem', color: 'var(--text-mid)' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Guides Grid */}
          <div className="row g-4">
            {GUIDES.map(guide => (
              <div key={guide.id} className="col-md-6 col-lg-3">
                <GuideCard guide={guide} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="text-center mt-5 p-5"
            style={{
              background: 'var(--bg-light)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
            }}
          >
            <h3 style={{ marginBottom: 12 }}>Can't find the right guide?</h3>
            <p style={{ color: 'var(--text-mid)', marginBottom: 24 }}>
              Tell us about your dream trek and we'll match you with the perfect guide.
            </p>
            <a href="/contact" className="btn-primary-custom">
              <i className="bi bi-chat-dots-fill" /> Request a Custom Guide
            </a>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
