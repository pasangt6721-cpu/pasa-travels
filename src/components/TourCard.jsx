import { useState } from 'react';
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

export default function TourCard({ tour, style = {} }) {
  const [wishlisted, setWishlisted] = useState(false);

  const difficultyLabel =
    tour.difficulty.charAt(0).toUpperCase() + tour.difficulty.slice(1);

  return (
    <div className="tour-card" style={style}>
      <div className="tour-card-img">
        <img src={tour.image} alt={tour.title} loading="lazy" />
        {tour.badge && (
          <span
            className="tour-card-badge"
            style={tour.badgeColor ? { background: tour.badgeColor } : {}}
          >
            {tour.badge}
          </span>
        )}
        <button
          className={`tour-card-wishlist${wishlisted ? ' active' : ''}`}
          aria-label="Add to wishlist"
          onClick={() => setWishlisted(w => !w)}
        >
          <i className={wishlisted ? 'bi bi-heart-fill' : 'bi bi-heart'} />
        </button>
      </div>

      <div className="tour-card-body">
        <div className="tour-card-location">
          <i className="bi bi-geo-alt-fill" /> {tour.location}
        </div>
        <h3 className="tour-card-title">{tour.title}</h3>
        <div className="tour-card-meta">
          <span><i className="bi bi-calendar3" /> {tour.days} Days</span>
          <span><i className="bi bi-person-fill" /> Max {tour.maxGroup}</span>
          <span><i className="bi bi-bar-chart-fill" /> {difficultyLabel}</span>
        </div>
        <div className="tour-card-rating">
          <StarRating rating={tour.rating} />
          <strong>{tour.rating.toFixed(1)}</strong>
          <span className="rating-count">({tour.reviews} reviews)</span>
        </div>
        <div className="tour-card-footer">
          <div>
            <div className="tour-price-label">From</div>
            <div className="tour-price">
              ${tour.price.toLocaleString()} <span>/ person</span>
            </div>
          </div>
          <Link
            to={`/tours/${tour.id}`}
            className="btn-primary-custom"
            style={{ padding: '9px 18px', fontSize: '.85rem' }}
          >
            View Details <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
