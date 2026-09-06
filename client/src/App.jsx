import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmsSimulator from './components/SmsSimulator';
import BookingModal from './components/BookingModal';
import LanguageModal from './components/LanguageModal';

import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import UserManualPage from './pages/UserManualPage';
import FAQPage from './pages/FAQPage';
import CropsPage from './pages/CropsPage';
import StorageUnitsPage from './pages/StorageUnitsPage';
import SlotBookingPage from './pages/SlotBookingPage';
import QueuePage from './pages/QueuePage';
import TrackingPage from './pages/TrackingPage';
import DocumentsPage from './pages/DocumentsPage';
import SmsLogsPage from './pages/SmsLogsPage';
import AuthPage from './pages/AuthPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import LandVerificationPage from './pages/LandVerificationPage';

function AppContent() {
  const { activeTab, setActiveTab, isAuthenticated, latestToast } = useApp();

  // If user is authenticated and attempts to access 'home' or 'about', redirect to 'crops'
  React.useEffect(() => {
    if (isAuthenticated && (activeTab === 'home' || activeTab === 'about')) {
      setActiveTab('crops');
    }
  }, [isAuthenticated, activeTab, setActiveTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Floating System Toast Alert */}
      {latestToast && (
        <div className="fixed top-20 right-5 z-50 animate-bounce transition-all">
          <div className="bg-slate-900/95 backdrop-blur text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{latestToast}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {!isAuthenticated && (activeTab === 'home' || activeTab === 'about') && <HomePage />}
        {isAuthenticated && (activeTab === 'home' || activeTab === 'about') && <CropsPage />}
        {activeTab === 'about_us' && <AboutUsPage />}
        {activeTab === 'user_manual' && <UserManualPage />}
        {activeTab === 'faq' && <FAQPage />}
        {activeTab === 'crops' && <CropsPage />}
        {activeTab === 'units' && <StorageUnitsPage />}
        {activeTab === 'booking' && <SlotBookingPage />}
        {activeTab === 'queue' && <QueuePage />}
        {activeTab === 'tracking' && <TrackingPage />}
        {activeTab === 'documents' && <DocumentsPage />}
        {activeTab === 'sms' && <SmsLogsPage />}
        {activeTab === 'auth' && <AuthPage />}
        {activeTab === 'signin' && <SignInPage />}
        {activeTab === 'signup' && <SignUpPage />}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'land_verification' && <LandVerificationPage />}
      </main>

      {/* Interactive On-Screen Farmer Smartphone SMS Simulator */}
      <SmsSimulator />

      {/* Language Selection Modal (All 22 Official Languages + English) */}
      <LanguageModal />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AppProvider>
  );
}
