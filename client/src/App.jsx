import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LanguageModal from './components/LanguageModal';


import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import UserManualPage from './pages/UserManualPage';
import FAQPage from './pages/FAQPage';
import CropsPage from './pages/CropsPage';
import StorageUnitsPage from './pages/StorageUnitsPage';
import SlotBookingPage from './pages/SlotBookingPage';
import PaymentGatewayPage from './pages/PaymentGatewayPage';
import TransportRentalPage from './pages/TransportRentalPage';
import QueuePage from './pages/QueuePage';
import TrackingPage from './pages/TrackingPage';
import DocumentsPage from './pages/DocumentsPage';
import SmsLogsPage from './pages/SmsLogsPage';
import AuthPage from './pages/AuthPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import LandVerificationPage from './pages/LandVerificationPage';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardContainer from './components/DashboardContainer';
import MobileBottomNav from './components/MobileBottomNav';
import { VoiceProvider } from './context/VoiceContext';
import KisanVoiceReaderBar from './components/KisanVoiceReaderBar';

function AppContent() {
  const { activeTab, setActiveTab, isAuthenticated, latestToast } = useApp();

  // If user is authenticated and attempts to access 'home' or 'about', redirect to 'crops'
  React.useEffect(() => {
    if (isAuthenticated && (activeTab === 'home' || activeTab === 'about')) {
      setActiveTab('crops');
    }
  }, [isAuthenticated, activeTab, setActiveTab]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Floating System Toast Alert */}
      {latestToast && (
        <div className="fixed top-20 right-4 sm:right-5 z-50 animate-bounce transition-all max-w-[90vw]">
          <div className="bg-slate-900/95 backdrop-blur text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
            <span className="truncate">{latestToast}</span>
          </div>
        </div>
      )}

      {/* Main Content Area: Dedicated Dashboard Container with Independent Scroll & Themes */}
      {isAuthenticated ? (
        <div className="pb-16 md:pb-0 flex-1 flex flex-col">
          <DashboardContainer>
            {activeTab === 'crops' && <CropsPage />}
            {activeTab === 'units' && <StorageUnitsPage />}
            {activeTab === 'booking' && <SlotBookingPage />}
            {activeTab === 'payment' && <PaymentGatewayPage />}
            {activeTab === 'transport' && <TransportRentalPage />}
            {activeTab === 'queue' && <QueuePage />}
            {activeTab === 'tracking' && <TrackingPage />}
            {activeTab === 'documents' && <DocumentsPage />}
            {activeTab === 'sms' && <SmsLogsPage />}
            {activeTab === 'profile' && <ProfilePage />}
            {activeTab === 'land_verification' && <LandVerificationPage />}
            {/* Fallbacks if unauthenticated tab is accessed */}
            {(activeTab === 'home' || activeTab === 'about') && <CropsPage />}
            {activeTab === 'about_us' && <AboutUsPage />}
            {activeTab === 'user_manual' && <UserManualPage />}
            {activeTab === 'faq' && <FAQPage />}
          </DashboardContainer>
        </div>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pb-16 md:pb-0">
          {(activeTab === 'home' || activeTab === 'about') && <HomePage />}
          {activeTab === 'about_us' && <AboutUsPage />}
          {activeTab === 'user_manual' && <UserManualPage />}
          {activeTab === 'faq' && <FAQPage />}
          {activeTab === 'auth' && <AuthPage />}
          {activeTab === 'signin' && <SignInPage />}
          {activeTab === 'signup' && <SignUpPage />}
          {activeTab === 'crops' && <CropsPage />}
          {activeTab === 'units' && <StorageUnitsPage />}
          {activeTab === 'booking' && <SlotBookingPage />}
          {activeTab === 'payment' && <PaymentGatewayPage />}
          {activeTab === 'transport' && <TransportRentalPage />}
          {activeTab === 'land_verification' && <LandVerificationPage />}
        </main>
      )}

      {/* Language Selection Modal (All 22 Official Languages + English) */}
      <LanguageModal />

      {/* Universal Footer */}
      <Footer />

      {/* Universal Kisan Audio Voice Reader (Reads each and every line) */}
      <KisanVoiceReaderBar />

      {/* Native Mobile Bottom Navigation Bar (Smartphones only) */}
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <VoiceProvider>
          <AppContent />
        </VoiceProvider>
      </LanguageProvider>
    </AppProvider>
  );
}
