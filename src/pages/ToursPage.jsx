import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourCard from '../components/TourCard';
import PageHeader from '../components/PageHeader';
import Newsletter from '../components/Newsletter';
import { useBackToTop } from '../hooks/useScrollReveal';
import { TOURS } from '../utils/data';

const DURATION_MAP = { 'all': null, '1-5': [1, 5], '6-10': [6, 10], '11-20': [11, 20] };

export default function ToursPage() {
  useBackToTop();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('location') || '',
    maxPrice: 3000,
    duration: 'all',
    difficulty: 'all',
    minRating: '0',
    sort: 'default',
  });

  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const clearFilters = () =>
    setFilters({ search: '', maxPrice: 3000, duration: 'all', difficulty: 'all', minRating: '0', sort: 'default' });

  const filtered = useMemo(() => {
    let result = [...TOURS];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)
      );
    }

    // Price
    result = result.filter(t => t.price <= filters.maxPrice);

    // Duration
    const dRange = DURATION_MAP[filters.duration];
    if (dRange) result = result.filter(t => t.days >= dRange[0] && t.days <= dRange[1]);

    // Difficulty
    if (filters.difficulty !== 'all') result = result.filter(t => t.difficulty === filters.difficulty);

    // Rating
    if (filters.minRating !== '0') result = result.filter(t => t.rating >= Number(filters.minRating));

    // Sort
    switch (filters.sort) {
      case 'price-asc':      result.sort((a, b) => a.price - b.price); break;
      case 'price-desc':     result.sort((a, b) => b.price - a.price); break;
      case 'rating':         result.sort((a, b) => b.rating - a.rating); break;
      case 'duration-asc':   result.sort((a, b) => a.days - b.days); break;
      default: break;
    }

    return result;
  }, [filters]);

  return (
    <>
      <PageHeader
        title="All Tours"
        subtitle="Discover Nepal's most iconic trekking routes and cultural experiences"
        breadcrumb={[{ label: 'Tours' }]}
      />

      <section className="section-pad-sm">
        <div className="container">

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="row g-3 align-items-end">

              {/* Search */}
              <div className="col-12 col-md-4 col-lg-3">
                <label className="form-label">Search Tours</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by name or location..."
                    value={filters.search}
                    onChange={e => setFilter('search', e.target.value)}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="col-12 col-md-4 col-lg-2">
                <label className="form-label">
                  Max Price:{' '}
                  <strong>{filters.maxPrice >= 3000 ? 'Any Price' : `$${filters.maxPrice}`}</strong>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min={0}
                  max={3000}
                  step={50}
                  value={filters.maxPrice}
                  onChange={e => setFilter('maxPrice', Number(e.target.value))}
                />
              </div>

              {/* Duration */}
              <div className="col-6 col-md-4 col-lg-2">
                <label className="form-label">Duration</label>
                <select
                  className="form-select"
                  value={filters.duration}
                  onChange={e => setFilter('duration', e.target.value)}
                >
                  <option value="all">Any Duration</option>
                  <option value="1-5">1–5 Days</option>
                  <option value="6-10">6–10 Days</option>
                  <option value="11-20">11–20 Days</option>
                </select>
              </div>

              {/* Difficulty */}
              <div className="col-6 col-md-4 col-lg-2">
                <label className="form-label">Difficulty</label>
                <select
                  className="form-select"
                  value={filters.difficulty}
                  onChange={e => setFilter('difficulty', e.target.value)}
                >
                  <option value="all">Any Level</option>
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Rating */}
              <div className="col-6 col-md-4 col-lg-1">
                <label className="form-label">Min Rating</label>
                <select
                  className="form-select"
                  value={filters.minRating}
                  onChange={e => setFilter('minRating', e.target.value)}
                >
                  <option value="0">All</option>
                  <option value="4">4+</option>
                  <option value="4.5">4.5+</option>
                </select>
              </div>

              {/* Sort */}
              <div className="col-6 col-md-4 col-lg-1">
                <label className="form-label">Sort By</label>
                <select
                  className="form-select"
                  value={filters.sort}
                  onChange={e => setFilter('sort', e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                  <option value="rating">Rating</option>
                  <option value="duration-asc">Short First</option>
                </select>
              </div>

              {/* Clear */}
              <div className="col-12 col-lg-1">
                <button
                  className="btn-secondary-custom w-100 justify-content-center"
                  style={{ padding: '9px 12px', fontSize: '.83rem' }}
                  onClick={clearFilters}
                >
                  <i className="bi bi-x-circle" /> Clear
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span style={{ fontSize: '.9rem', color: 'var(--text-mid)', fontWeight: 600 }}>
              {filtered.length} tour{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Tours Grid */}
          {filtered.length > 0 ? (
            <div className="row g-4">
              {filtered.map(tour => (
                <div key={tour.id} className="col-md-6 col-lg-4">
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
              <h5>No tours match your filters</h5>
              <p className="text-muted">Try adjusting or clearing the filters to see more tours.</p>
              <button className="btn-primary-custom" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
