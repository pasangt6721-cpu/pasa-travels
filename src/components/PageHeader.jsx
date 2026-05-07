import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <div className="page-header">
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <nav aria-label="breadcrumb" className="page-header-breadcrumb mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {breadcrumb.map((crumb, i) =>
              i === breadcrumb.length - 1 ? (
                <li key={i} className="breadcrumb-item active">{crumb.label}</li>
              ) : (
                <li key={i} className="breadcrumb-item">
                  <Link to={crumb.to}>{crumb.label}</Link>
                </li>
              )
            )}
          </ol>
        </nav>
        <h1 className="page-header-title">{title}</h1>
        {subtitle && (
          <p style={{ color: 'rgba(255,255,255,.7)', marginTop: 8 }}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
