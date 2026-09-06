import React, { useState } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Snowflake,
  Clock,
  FileText,
  MessageSquare,
  Activity,
  Warehouse,
  CalendarCheck,
  User,
  PhoneCall,
  Menu,
  X,
  ChevronDown,
  Globe,
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    switchRole,
    unreadSmsCount,
    setIsSmsSimulatorOpen,
    isSmsSimulatorOpen,
    isAuthenticated,
    logoutUser
  } = useApp();

  const {
    currentLanguage,
    setLanguage,
    setIsLanguageModalOpen,
    t
  } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Visitor navigation matching government portal: Home, About us, User Manuals, FAQ
  const unauthenticatedNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about_us', label: 'About us' },
    { id: 'user_manual', label: 'User Manuals' },
    { id: 'faq', label: 'FAQ' }
  ];

  const authenticatedNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'crops', label: t('crops', 'Crops Catalog'), icon: Snowflake },
    { id: 'units', label: t('units', 'Storage Units'), icon: Warehouse },
    { id: 'booking', label: t('booking', 'Slot Booking'), icon: CalendarCheck },
    { id: 'queue', label: t('queue', 'Real-Time Queue'), icon: Clock },
    { id: 'tracking', label: t('tracking', 'Procurement Tracker'), icon: Activity },
    { id: 'documents', label: t('documents', 'Docx Request'), icon: FileText },
    { id: 'sms', label: t('sms', 'SMS Alerts'), icon: MessageSquare, countBadge: unreadSmsCount },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : unauthenticatedNavItems;

  const handleLanguageToggle = () => {
    if (currentLanguage.code === 'te') {
      setLanguage('en');
    } else {
      setLanguage('te');
    }
  };

  return (
    <header className="sticky top-0 z-40 shadow-xl">
      {/* 1. TOP UTILITY HELPLINE STRIP */}
      <div className="bg-[#042411] text-white text-[11px] px-4 py-1 flex justify-between items-center border-b border-emerald-900/60 select-none">
        <div className="flex items-center space-x-3">
          <span className="flex items-center font-medium">
            <span className="flex h-2 w-2 relative mr-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <PhoneCall className="w-3 h-3 mr-1 text-emerald-300" />
            {t('kisanCallCenter', 'Kisan Call Centre Toll-Free:')} <strong className="ml-1 text-emerald-300 font-mono tracking-wide">1800-180-1551</strong>
          </span>
          <span className="hidden sm:inline-block text-emerald-500/40">|</span>
          <span className="hidden sm:inline-block text-emerald-200/90 font-medium">
            🌾 Official National Cold Storage & e-NWR Digital Warehouse Portal
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* 22 Languages Modal Button */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center space-x-1 text-emerald-200 hover:text-white px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer"
            title="Browse all 22 official scheduled languages"
          >
            <Globe className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">22 Languages</span>
          </button>

          {/* SMS Simulator Button */}
          <button
            onClick={() => setIsSmsSimulatorOpen(!isSmsSimulatorOpen)}
            className="flex items-center bg-emerald-800/80 hover:bg-emerald-700/90 px-2 py-0.5 rounded-full text-white text-[10px] font-bold transition border border-emerald-600/40 cursor-pointer"
          >
            <MessageSquare className="w-3 h-3 mr-1 text-emerald-300" />
            SMS Simulator
            {unreadSmsCount > 0 && (
              <span className="ml-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full animate-bounce">
                {unreadSmsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. MAJESTIC GOVERNMENT PORTAL BANNER (Bhu Bharati Styled) */}
      <div className="relative overflow-hidden bg-[#053d1c] border-b border-emerald-950 shadow-md">
        {/* Scenic Green Countryside Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/govt-green-banner-bg.jpg"
            alt="Agricultural Countryside"
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#032e15]/90 via-[#05431e]/75 to-[#032e15]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#021f0e]/50 via-transparent to-[#05431e]/30"></div>
        </div>

        {/* Banner Inner Content: Farmer | Truck | Center Brand | Crops | Storage Unit */}
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
            {/* Left Pair: Framed Farmer Portrait & Truck Emblem */}
            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              {/* Position 1: Farmer Portrait (White Frame) */}
              <div
                onClick={() => setActiveTab('home')}
                className="w-14 h-18 sm:w-20 sm:h-26 md:w-24 md:h-30 rounded-xs bg-white p-1 sm:p-1.5 shadow-2xl border-2 border-slate-200/90 overflow-hidden flex flex-col items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300 cursor-pointer"
                title="Krishivalaya Farmer - కృషివలయ రైతు"
              >
                <img
                  src="/images/indian-farmer.jpg"
                  alt="Farmer - రైతు"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Position 2: Cold Chain Truck Emblem (Circular Gold Border) */}
              <div
                className="w-12 h-12 sm:w-18 sm:h-18 md:w-22 md:h-22 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-2xl shrink-0 border-2 border-white/70 overflow-hidden flex items-center justify-center"
                title="Cold Chain Logistics Truck"
              >
                <img
                  src="/images/cold-chain-truck.jpg"
                  alt="Cold Transport Truck"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Position 3: Logo, KRISHIVALAYA Brand Name & Tagline */}
            <div
              onClick={() => setActiveTab('home')}
              className="flex-1 flex items-center justify-center px-1 sm:px-4 cursor-pointer group"
            >
              <div className="flex items-center justify-center space-x-2.5 sm:space-x-4">
                {/* Krishivalaya Logo */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white p-1 sm:p-1.5 shadow-2xl border-2 border-emerald-400/90 shrink-0 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/krishivalaya-logo.jpg"
                    alt="Krishivalaya Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                {/* Name & Tagline */}
                <div className="text-left">
                  <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-none">
                    KRISHIVALAYA
                  </span>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold text-amber-300 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mt-1 sm:mt-1.5">
                    Empowering the Annadatha
                  </p>
                </div>
              </div>
            </div>

            {/* Right Pair: Crops Emblem & Framed Storage Unit */}
            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              {/* Position 4: Fresh Crops Emblem (Circular Gold Border) */}
              <div
                className="w-12 h-12 sm:w-18 sm:h-18 md:w-22 md:h-22 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 shadow-2xl shrink-0 border-2 border-white/70 overflow-hidden flex items-center justify-center"
                title="Fresh Harvest Agricultural Crops"
              >
                <img
                  src="/images/fresh-crops-emblem.jpg"
                  alt="Fresh Harvest Crops"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Position 5: Storage Unit Warehouse (White Frame) */}
              <div
                className="w-14 h-18 sm:w-20 sm:h-26 md:w-24 md:h-30 rounded-xs bg-white p-1 sm:p-1.5 shadow-2xl border-2 border-slate-200/90 overflow-hidden flex flex-col items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300"
                title="Multi-Chamber Cold Storage Unit Warehouse"
              >
                <img
                  src="/images/cold-storage-unit.jpg"
                  alt="Cold Storage Warehouse"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ATTACHED GREEN SUB-NAVIGATION BAR (Home | About us | User Manuals | FAQ ... తెలుగు | Login) */}
      <nav className="bg-[#006837] border-t-2 border-[#f7c844] border-b border-[#004e28] shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 sm:h-12">
            {/* Left: Navigation Tabs */}
            <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar py-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-2.5 sm:px-3.5 py-1.5 rounded text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
                      isActive
                        ? 'text-[#48e68b] bg-black/20 border-b-2 border-[#48e68b] shadow-inner'
                        : 'text-white hover:text-[#a8ffce] hover:bg-white/10'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{item.label}</span>
                    {item.countBadge > 0 && (
                      <span className="ml-1 bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                        {item.countBadge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Center: CLEAN AND EMPTY (Disclaimer intentionally removed as crossed out in red by user) */}
            <div className="hidden lg:block flex-1"></div>

            {/* Right: Language Switcher | Login */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {/* Language Switcher: తెలుగు / English toggle */}
              <button
                onClick={handleLanguageToggle}
                className="text-white hover:text-amber-200 text-xs sm:text-sm font-extrabold tracking-wide transition cursor-pointer px-1 py-1"
                title="Toggle Telugu / English"
              >
                {currentLanguage.code === 'te' ? 'English' : 'తెలుగు'}
              </button>

              <span className="text-white/50 font-light text-sm">|</span>

              {/* Login / User Profile Button */}
              {!isAuthenticated ? (
                <button
                  onClick={() => setActiveTab('signin')}
                  className="flex items-center space-x-1 text-white hover:text-amber-200 text-xs sm:text-sm font-bold tracking-wide transition cursor-pointer px-1.5 py-1 rounded hover:bg-white/10"
                >
                  <User className="w-4 h-4 text-white" />
                  <span>Login</span>
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="flex items-center space-x-1.5 text-white hover:text-amber-200 text-xs sm:text-sm font-bold transition cursor-pointer px-2 py-1 rounded bg-black/20"
                  >
                    <span className="text-base">{currentUser.avatar}</span>
                    <span className="max-w-[100px] truncate">{currentUser.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-white" />
                  </button>

                  {/* Dropdown Menu */}
                  {roleDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in duration-150">
                      <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 mb-2">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-2xl">{currentUser.avatar}</span>
                          <div>
                            <p className="font-black text-xs text-slate-900 leading-tight">{currentUser.name}</p>
                            <p className="text-[10px] text-emerald-800 font-semibold">{currentUser.district}, {currentUser.state}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('profile');
                            setRoleDropdownOpen(false);
                          }}
                          className="mt-2.5 w-full flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg shadow-xs transition"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>View My Profile</span>
                        </button>
                      </div>

                      <div className="px-2 py-1 border-b border-slate-100 mb-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demo Quick Switch</p>
                      </div>
                      {Object.entries(DEMO_USERS).map(([key, user]) => (
                        <button
                          key={key}
                          onClick={() => {
                            switchRole(key);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 px-2.5 py-2 rounded-lg text-left text-xs transition ${
                            currentUser.role === user.role
                              ? 'bg-emerald-50 text-emerald-900 font-semibold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="text-lg">{user.avatar}</span>
                          <div className="truncate">
                            <p className="font-bold truncate">{user.name}</p>
                            <p className="text-[10px] text-slate-500 capitalize">{user.role.replace('_', ' ')}</p>
                          </div>
                        </button>
                      ))}

                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            logoutUser();
                            setRoleDropdownOpen(false);
                          }}
                          className="w-full text-center text-xs text-rose-600 hover:text-rose-700 font-bold py-1 flex items-center justify-center space-x-1 hover:bg-rose-50 rounded-lg transition"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Hamburger Button */}
              <div className="sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1 text-white hover:text-amber-300 rounded"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#004e28] border-t border-emerald-700 px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded text-sm font-bold ${
                  activeTab === item.id ? 'bg-[#48e68b] text-slate-950' : 'text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            {!isAuthenticated ? (
              <div className="pt-2 border-t border-emerald-700 flex space-x-2">
                <button
                  onClick={() => {
                    setActiveTab('signin');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 bg-emerald-500 text-slate-950 font-bold py-2 rounded text-xs text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setActiveTab('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 bg-amber-400 text-slate-950 font-bold py-2 rounded text-xs text-center"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-rose-600 text-white font-bold py-2 rounded text-xs text-center"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
