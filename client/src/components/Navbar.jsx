import React, { useState } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Snowflake,
  Sprout,
  Clock,
  FileText,
  MessageSquare,
  Activity,
  Warehouse,
  User,
  PhoneCall,
  Menu,
  X,
  ChevronDown,
  Globe
} from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    switchRole,
    unreadSmsCount,
    setIsSmsSimulatorOpen,
    isSmsSimulatorOpen
  } = useApp();

  const {
    currentLanguage,
    setIsLanguageModalOpen,
    t
  } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'about', label: t('about', 'About Us'), icon: Sprout },
    { id: 'crops', label: t('crops', 'Crops Catalog'), icon: Snowflake },
    { id: 'units', label: t('units', 'Storage Units'), icon: Warehouse },
    { id: 'queue', label: t('queue', 'Real-Time Queue'), icon: Clock, badge: 'Live' },
    { id: 'tracking', label: t('tracking', 'Procurement Tracker'), icon: Activity },
    { id: 'documents', label: t('documents', 'Docx Request'), icon: FileText },
    { id: 'sms', label: t('sms', 'SMS Alerts'), icon: MessageSquare, countBadge: unreadSmsCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Top Banner for Farmer Helpline & Language */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="flex items-center font-medium">
            <PhoneCall className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            {t('kisanCallCenter', 'Kisan Call Centre Toll-Free:')} <strong className="ml-1 text-emerald-200">1800-180-1551</strong>
          </span>
          <span className="hidden sm:inline-block text-emerald-300/50">|</span>
          <span className="hidden sm:inline-block text-emerald-200">
            {t('portalDesc', '🌾 Cold Storage & Digital Warehouse Receipt Portal (WDRA Certified)')}
          </span>
        </div>
        <div className="flex items-center space-x-2.5">
          {/* Language Switcher Trigger (Top Banner) */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center space-x-1 bg-emerald-700/90 hover:bg-emerald-600 px-2.5 py-0.5 rounded text-white text-[11px] font-medium transition border border-emerald-500/50"
            title="Change Language (22 Official Languages + English)"
          >
            <Globe className="w-3 h-3 text-emerald-300 mr-1" />
            <span className="font-bold">{currentLanguage.native}</span>
            <span className="text-emerald-200 text-[10px]">({currentLanguage.name})</span>
            <ChevronDown className="w-2.5 h-2.5 text-emerald-300 ml-0.5" />
          </button>

          {/* Real-time SMS Simulator Trigger */}
          <button
            onClick={() => setIsSmsSimulatorOpen(!isSmsSimulatorOpen)}
            className="flex items-center bg-emerald-700/80 hover:bg-emerald-600 px-2 py-0.5 rounded text-white text-[11px] font-medium transition"
          >
            <MessageSquare className="w-3 h-3 mr-1 text-emerald-300" />
            {t('smsSimulator', 'SMS Simulator')}
            {unreadSmsCount > 0 && (
              <span className="ml-1.5 bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {unreadSmsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('about')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Snowflake className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">Agro<span className="text-emerald-600">Vault</span></span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  {currentLanguage.code === 'en' ? 'एग्रोवोल्ट' : currentLanguage.native}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{t('portalTagline', 'Smart Cold Storage & Queue')}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-1.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.countBadge > 0 && (
                    <span className="ml-1.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.countBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Language Switcher & User Profile / Quick Switcher */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Dedicated Desktop Language Switcher Button */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/50 text-slate-700 transition group shadow-2xs"
              title="Select Language / 22 Official Scheduled Languages of India"
            >
              <Globe className="w-4 h-4 text-emerald-600 group-hover:rotate-45 transition-transform" />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">{currentLanguage.native}</p>
                <p className="text-[10px] text-slate-500 capitalize">{currentLanguage.name}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
            </button>

            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg border border-slate-200 text-left transition"
              >
                <span className="text-xl">{currentUser.avatar}</span>
                <div className="text-xs">
                  <p className="font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold capitalize">{currentUser.role.replace('_', ' ')}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Role Switcher Dropdown */}
              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                  <div className="px-2 py-1.5 border-b border-slate-100 mb-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Demo Quick Switch</p>
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
                        setActiveTab('auth');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-center text-xs text-emerald-700 font-semibold hover:underline py-1"
                    >
                      Login / Create New Account &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveTab('auth')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition"
            >
              {t('signIn', 'Sign In')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="p-2 text-slate-600 hover:text-emerald-700 relative rounded-lg hover:bg-slate-100"
              title="Change Language"
            >
              <Globe className="w-5 h-5 text-emerald-600" />
            </button>
            <button
              onClick={() => setIsSmsSimulatorOpen(!isSmsSimulatorOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 relative"
            >
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              {unreadSmsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {/* Mobile Language Button */}
          <button
            onClick={() => {
              setIsLanguageModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 mb-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-sm"
          >
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Language:</span>
              <strong className="text-emerald-700 font-bold">{currentLanguage.native} ({currentLanguage.name})</strong>
            </div>
            <span className="text-xs text-emerald-600 font-bold underline">Change &rarr;</span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-4 h-4 mr-2 text-emerald-600" />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="px-2 py-1 text-xs text-slate-500">
              Active User: <strong>{currentUser.name}</strong> ({currentUser.role})
            </div>
            <button
              onClick={() => {
                setActiveTab('auth');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-lg text-center"
            >
              Sign In / Switch Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
