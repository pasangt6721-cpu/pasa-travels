# PASA-TRAVELS — React Application

A fully converted React.js frontend for the PASA-TRAVELS Nepal trekking and tour booking platform.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
│
├── api/
│   └── index.js              # Axios instance + all API endpoint helpers
│
├── assets/
│   └── logo.png              # PASA-TRAVELS logo (used in Navbar, Footer, Auth pages)
│
├── components/
│   ├── TourCard.jsx          # Reusable tour card with wishlist toggle
│   ├── GuideCard.jsx         # Reusable guide card
│   ├── PageHeader.jsx        # Shared page hero with breadcrumb
│   └── Newsletter.jsx        # Newsletter subscription section
│
├── context/
│   └── AuthContext.jsx       # Authentication state (user, login, register, logout)
│
├── hooks/
│   └── useScrollReveal.js    # useScrollReveal, useCounter, useBackToTop, useNavbarScroll
│
├── layouts/
│   ├── Navbar.jsx            # Sticky navbar with logo + React Router NavLink
│   ├── Footer.jsx            # Footer with logo + links
│   └── Layout.jsx            # Wraps pages with Navbar + Footer + BackToTop
│
├── pages/
│   ├── HomePage.jsx          # Landing page (Hero, Features, Tours, Destinations, Guides, Reviews)
│   ├── ToursPage.jsx         # Full tours listing with live filter/sort
│   ├── TourDetailPage.jsx    # Tour detail with itinerary + booking calculator
│   ├── GuidesPage.jsx        # All guides with stats counters
│   ├── DestinationsPage.jsx  # Destination detail cards
│   ├── ContactPage.jsx       # Contact form + info
│   ├── LoginPage.jsx         # Auth login with social buttons + password toggle
│   ├── RegisterPage.jsx      # Auth register with password strength meter
│   └── NotFoundPage.jsx      # 404 page
│
├── routes/
│   └── AppRoutes.jsx         # React Router DOM v6 route definitions
│
├── utils/
│   └── data.js               # Static data (TOURS, GUIDES, DESTINATIONS, TESTIMONIALS)
│
├── App.jsx                   # Root: BrowserRouter + AuthProvider + AppRoutes
├── main.jsx                  # ReactDOM entry point
└── index.css                 # Global styles (CSS variables, all components)
```

---

## 🔌 Backend Integration (Django REST API)

The app is backend-ready. Update `VITE_API_URL` in a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

### Available API helpers (`src/api/index.js`):

| Module         | Methods                          |
|---------------|----------------------------------|
| `tourApi`     | `getAll(params)`, `getById(id)`, `getFeatured()` |
| `guideApi`    | `getAll(params)`, `getById(id)` |
| `destinationApi` | `getAll()`, `getById(id)`    |
| `authApi`     | `login()`, `register()`, `logout()`, `me()` |
| `contactApi`  | `send(data)`                    |
| `newsletterApi` | `subscribe(email)`            |

### Swapping static data for API calls

Each page currently uses static data from `src/utils/data.js`. To connect to your API:

```jsx
// Example: Replace static data in ToursPage.jsx
import { useState, useEffect } from 'react';
import { tourApi } from '../api';

const [tours, setTours] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  tourApi.getAll(filters)
    .then(res => setTours(res.data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, [filters]);
```

---

## 🖼️ Logo Usage

The PASA-TRAVELS logo is imported from `src/assets/logo.png` and used in:

- **Navbar** — Left side branding (38px height, responsive)
- **Footer** — Brand column with white filter applied
- **Login page** — Centered auth logo (56px height)
- **Register page** — Centered auth logo (56px height)

```jsx
import logo from '../assets/logo.png';
<img src={logo} alt="Pasa Travels Logo" className="navbar-logo" />
```

---

## ⚛️ React Features Used

| Feature | Usage |
|---------|-------|
| `useState` | Forms, filters, wishlist toggle, UI state |
| `useEffect` | Scroll listeners, counter animations, IntersectionObserver |
| `useRef` | DOM access for counter/reveal animations |
| `useMemo` | Memoized tour filtering & sorting |
| `useContext` | Auth state via `AuthContext` |
| `React Router v6` | `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useNavigate`, `useParams`, `useSearchParams` |

---

## 🎨 Design System

All CSS variables are defined in `src/index.css`:

```css
--primary:    #0B3D91;   /* Deep navy blue */
--secondary:  #3FA9F5;   /* Sky blue */
--accent:     #F5A623;   /* Golden amber */
--text-dark:  #12151e;
--text-mid:   #4a5568;
--bg-light:   #f7f9fc;
--radius-md:  16px;
--shadow-lg:  0 20px 60px rgba(11,61,145,.16);
```

Fonts: **Playfair Display** (headings) + **DM Sans** (body)

---

## 📱 Responsive Breakpoints

- Mobile: `< 480px`
- Tablet: `480px – 768px`
- Desktop: `> 768px`

All layouts use Bootstrap 5 grid + custom CSS media queries.
