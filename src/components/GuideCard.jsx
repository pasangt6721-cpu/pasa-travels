import { Link } from 'react-router-dom';

function StarRating({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i}>{i <= Math.round(rating) ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

export default function GuideCard({ guide }) {
  return (
    <div className="guide-card">
      <div className="guide-card-img">
        <img src={guide.image} alt={guide.name} loading="lazy" />
        <div className="guide-verified">
          <i className="bi bi-patch-check-fill" /> Certified
        </div>
      </div>
      <div className="guide-card-body">
        <div className="guide-name">{guide.name}</div>
        <div className="guide-role">{guide.role}</div>
        <div className="guide-langs">
          <i className="bi bi-translate" /> {guide.languages}
        </div>
        <div className="tour-card-rating justify-content-center mb-3">
          <StarRating rating={guide.rating} />
          <strong>{guide.rating.toFixed(1)}</strong>
          <span className="rating-count">({guide.reviews})</span>
        </div>
        <div className="guide-stats">
          <div>
            <span className="guide-stat-val">{guide.experience}</span>
            <span className="guide-stat-key">Yrs Exp</span>
          </div>
          <div>
            <span className="guide-stat-val">{guide.trips}</span>
            <span className="guide-stat-key">Trips</span>
          </div>
          <div>
            <span className="guide-stat-val">{guide.rate}</span>
            <span className="guide-stat-key">/Day</span>
          </div>
        </div>
        <Link
          to="/contact"
          className="btn-primary-custom w-100 justify-content-center"
        >
          Hire {guide.name.split(' ')[0]}
        </Link>
      </div>
    </div>
  );
}
