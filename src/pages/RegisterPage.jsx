import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function StrengthMeter({ password }) {
  const calc = (v) => {
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  };

  const strength = calc(password);
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(strength / 4) * 100}%`,
            background: colors[strength],
            borderRadius: 99,
            transition: 'all .3s',
          }}
        />
      </div>
      <span style={{ fontSize: '.75rem', color: colors[strength], fontWeight: 600 }}>
        {labels[strength]}
      </span>
    </div>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', agree: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setStatus('loading');
    setError('');
    // Wire up to: authApi.register(form) via AuthContext
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

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-sub">Join thousands of Nepal adventure travelers</p>

        {/* Social Signup */}
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

        <div className="divider-text">or register with email</div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', borderRadius: 'var(--radius-sm)', padding: '10px 14px', fontSize: '.88rem', marginBottom: 16 }}>
            <i className="bi bi-exclamation-circle me-2" />{error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label-custom">First Name</label>
              <input
                type="text"
                className="form-control form-control-custom"
                placeholder="John"
                value={form.firstName}
                onChange={e => setField('firstName', e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label-custom">Last Name</label>
              <input
                type="text"
                className="form-control form-control-custom"
                placeholder="Doe"
                value={form.lastName}
                onChange={e => setField('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3 mt-3">
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
            <label className="form-label-custom">Phone (Optional)</label>
            <input
              type="tel"
              className="form-control form-control-custom"
              placeholder="+1 234 567 8901"
              value={form.phone}
              onChange={e => setField('phone', e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Password</label>
            <div className="input-icon-wrap">
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                className="form-control form-control-custom"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={e => setField('password', e.target.value)}
                required
                minLength={8}
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
            <StrengthMeter password={form.password} />
          </div>

          <div className="mb-4">
            <label className="form-label-custom">Confirm Password</label>
            <div className="input-icon-wrap">
              <input
                type={showConfirm ? 'text' : 'password'}
                className="form-control form-control-custom"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={e => setField('confirm', e.target.value)}
                required
              />
              <button
                type="button"
                className="icon"
                onClick={() => setShowConfirm(p => !p)}
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="agreeTerms"
              checked={form.agree}
              onChange={e => setField('agree', e.target.checked)}
              required
            />
            <label className="form-check-label" htmlFor="agreeTerms" style={{ fontSize: '.88rem', color: 'var(--text-mid)' }}>
              I agree to the{' '}
              <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</a>{' '}
              and{' '}
              <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary-custom w-100 justify-content-center mb-4"
            style={{ padding: 13 }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <><span className="spinner-border spinner-border-sm me-2" />Creating...</>
            ) : (
              <>Create Account <i className="bi bi-arrow-right-circle-fill" /></>
            )}
          </button>
        </form>

        <p className="text-center" style={{ fontSize: '.88rem', color: 'var(--text-mid)', margin: 0 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
