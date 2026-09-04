import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmsSimulator from './components/SmsSimulator';
import BookingModal from './components/BookingModal';
import LanguageModal from './components/LanguageModal';

import AboutPage from './pages/AboutPage';
import CropsPage from './pages/CropsPage';
import StorageUnitsPage from './pages/StorageUnitsPage';
import SlotBookingPage from './pages/SlotBookingPage';
import QueuePage from './pages/QueuePage';
import TrackingPage from './pages/TrackingPage';
import DocumentsPage from './pages/DocumentsPage';
import SmsLogsPage from './pages/SmsLogsPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const { activeTab, latestToast } = useApp();

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
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'crops' && <CropsPage />}
        {activeTab === 'units' && <StorageUnitsPage />}
        {activeTab === 'booking' && <SlotBookingPage />}
        {activeTab === 'queue' && <QueuePage />}
        {activeTab === 'tracking' && <TrackingPage />}
        {activeTab === 'documents' && <DocumentsPage />}
        {activeTab === 'sms' && <SmsLogsPage />}
        {activeTab === 'auth' && <AuthPage />}
        {activeTab === 'profile' && <ProfilePage />}
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
