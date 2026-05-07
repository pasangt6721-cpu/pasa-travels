import { Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage';
import ToursPage from '../pages/ToursPage';
import TourDetailPage from '../pages/TourDetailPage';
import GuidesPage from '../pages/GuidesPage';
import DestinationsPage from '../pages/DestinationsPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages — no navbar/footer */}
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Main layout */}
      <Route element={<Layout />}>
        <Route path="/"              element={<HomePage />} />
        <Route path="/tours"         element={<ToursPage />} />
        <Route path="/tours/:id"     element={<TourDetailPage />} />
        <Route path="/guides"        element={<GuidesPage />} />
        <Route path="/destinations"  element={<DestinationsPage />} />
        <Route path="/contact"       element={<ContactPage />} />
        <Route path="*"              element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
