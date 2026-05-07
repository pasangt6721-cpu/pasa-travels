import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    // Wire up to: authApi.login(form) via AuthContext
    setTimeout(() => {
      setStatus('idle');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          <Link to="/" className="brand">
            <img src={logo} alt="Pasa Travels Logo" style={{ height: 56, width: 'auto', marginRight: 10 }} />
            PASA-TRAVELS
          </Link>
        </div>

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to manage your bookings and explore tours</p>

        {/* Social Login */}
        <div className="row g-2 mb-3">
          <div className="col-6">
            <button className="btn-social" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </div>
          <div className="col-6">
            <button className="btn-social" type="button">
              <i className="bi bi-facebook" style={{ color: '#1877f2', fontSize: '1.1rem' }} />
              Facebook
            </button>
          </div>
        </div>

        <div className="divider-text">or sign in with email</div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: '.88rem', marginBottom: 16 }}>
            <i className="bi bi-exclamation-circle me-2" />{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label-custom">Email Address</label>
            <div className="input-icon-wrap">
              <input
                type="email"
                className="form-control form-control-custom"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setField('email', e.target.value)}
                required
              />
              <span className="icon"><i className="bi bi-envelope" /></span>
            </div>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label-custom" style={{ marginBottom: 0 }}>Password</label>
              <a href="#" style={{ fontSize: '.8rem', color: 'var(--secondary)', fontWeight: 600 }}>
                Forgot password?
              </a>
            </div>
            <div className="input-icon-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                className="form-control form-control-custom"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setField('password', e.target.value)}
                required
              />
              <button
                type="button"
                className="icon"
                onClick={() => setShowPw(p => !p)}
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              checked={form.remember}
              onChange={e => setField('remember', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe" style={{ fontSize: '.88rem', color: 'var(--text-mid)' }}>
              Keep me signed in for 30 days
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary-custom w-100 justify-content-center mb-4"
            style={{ padding: 13 }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <><span className="spinner-border spinner-border-sm me-2" />Signing in...</>
            ) : (
              <>Sign In <i className="bi bi-arrow-right-circle-fill" /></>
            )}
          </button>
        </form>

        <p className="text-center" style={{ fontSize: '.88rem', color: 'var(--text-mid)', margin: 0 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create one free
          </Link>
        </p>

        <p className="text-center mt-4" style={{ fontSize: '.78rem', color: 'var(--text-light)' }}>
          By signing in, you agree to our{' '}
          <a href="#" style={{ color: 'var(--secondary)' }}>Terms of Service</a> and{' '}
          <a href="#" style={{ color: 'var(--secondary)' }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
