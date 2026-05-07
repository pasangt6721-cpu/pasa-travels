import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <div>
        <div style={{ fontSize: '6rem', lineHeight: 1, marginBottom: 16 }}>🏔️</div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: 'var(--primary)',
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          404
        </h1>
        <h2 style={{ marginBottom: 16 }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-mid)', maxWidth: 480, margin: '0 auto 32px' }}>
          Looks like this trail doesn't exist. Let's get you back on the right path.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/" className="btn-primary-custom">
            <i className="bi bi-house-fill" /> Back to Home
          </Link>
          <Link to="/tours" className="btn-secondary-custom">
            <i className="bi bi-compass-fill" /> Browse Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
