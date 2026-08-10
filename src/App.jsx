import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import RouteSeo from '@/components/Seo';
// Add page imports here
import Home from '@/pages/Home';
import Estimator from '@/pages/Estimator';
import Funnel from '@/pages/Funnel';
import Results from '@/pages/Results';
import Book from '@/pages/Book';
import Booked from '@/pages/Booked';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Leads from '@/pages/admin/Leads';
import LeadDetail from '@/pages/admin/LeadDetail';
import Pipeline from '@/pages/admin/Pipeline';
import Emails from '@/pages/admin/Emails';
import SettingsPage from '@/pages/admin/SettingsPage';
import PompanoBeach from '@/pages/seo/PompanoBeach';
import EpoxyGarageFloorCost from '@/pages/seo/EpoxyGarageFloorCost';
import TwoCarGarageEpoxyCost from '@/pages/seo/TwoCarGarageEpoxyCost';
import ThreeCarGarageEpoxyCost from '@/pages/seo/ThreeCarGarageEpoxyCost';
import GarageFloorCoatingCost from '@/pages/seo/GarageFloorCoatingCost';
import ColorCharts from '@/pages/ColorCharts';
import Locations from '@/pages/Locations';
import HowItWorksPage from '@/pages/HowItWorks';
import GalleryPage from '@/pages/Gallery';
import ReviewsPage from '@/pages/Reviews';
import AboutPage from '@/pages/About';
import ContactPage from '@/pages/Contact';
import Competitors from '@/pages/admin/Competitors';
import GoogleSeo from '@/pages/admin/GoogleSeo';
import LocationSeoPage from '@/pages/seo/LocationSeoPage';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/estimate" element={<Estimator />} />
      <Route path="/funnel" element={<Funnel />} />
      <Route path="/results/:id" element={<Results />} />
      <Route path="/book/:id" element={<Book />} />
      <Route path="/booked/:id" element={<Booked />} />
      <Route path="/fl/pompano-beach" element={<PompanoBeach />} />
      <Route path="/epoxy-garage-floor-cost" element={<EpoxyGarageFloorCost />} />
      <Route path="/2-car-garage-epoxy-cost" element={<TwoCarGarageEpoxyCost />} />
      <Route path="/3-car-garage-epoxy-cost" element={<ThreeCarGarageEpoxyCost />} />
      <Route path="/garage-floor-coating-cost" element={<GarageFloorCoatingCost />} />
      <Route path="/color-charts" element={<ColorCharts />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="leads/:id" element={<LeadDetail />} />
        <Route path="pipeline" element={<Pipeline />} />
        <Route path="emails" element={<Emails />} />
        <Route path="competitors" element={<Competitors />} />
        <Route path="google" element={<GoogleSeo />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="/:state/:citySlug" element={<LocationSeoPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <RouteSeo />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App