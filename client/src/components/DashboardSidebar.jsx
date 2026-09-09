import React from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Snowflake,
  Warehouse,
  CalendarCheck,
  CreditCard,
  Truck,
  Clock,
  Activity,
  FileText,
  MessageSquare,
  User,
  ShieldCheck,
  PhoneCall,
  LogOut,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Bot
} from 'lucide-react';

export default function DashboardSidebar() {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    switchRole,
    unreadSmsCount,
    logoutUser,
    isLandVerified,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useApp();

  const { t } = useLanguage();

  const navItems = [
    {
      id: 'crops',
      label: t('crops', 'Crops Catalog'),
      desc: '77 Produce Climate Guides',
      icon: Snowflake,
      accent: 'text-sky-600 bg-sky-50 border-sky-200 group-hover:bg-sky-100',
      activeAccent: 'bg-sky-600 text-white shadow-sky-200'
    },
    {
      id: 'units',
      label: t('units', 'Storage Units'),
      desc: '12 Facilities & Tariffs',
      icon: Warehouse,
      accent: 'text-emerald-600 bg-emerald-50 border-emerald-200 group-hover:bg-emerald-100',
      activeAccent: 'bg-emerald-600 text-white shadow-emerald-200'
    },
    {
      id: 'booking',
      label: t('booking', 'Slot Booking'),
      desc: 'Reserve Chamber Space',
      icon: CalendarCheck,
      accent: 'text-amber-600 bg-amber-50 border-amber-200 group-hover:bg-amber-100',
      activeAccent: 'bg-amber-600 text-white shadow-amber-200'
    },
    {
      id: 'payment',
      label: t('payment', 'Payment Gateway'),
      desc: 'Tariff & Advance Checkout',
      icon: CreditCard,
      accent: 'text-emerald-600 bg-emerald-50 border-emerald-200 group-hover:bg-emerald-100',
      activeAccent: 'bg-emerald-600 text-white shadow-emerald-200'
    },
    {
      id: 'transport',
      label: t('transport', 'Transport Rental'),
      desc: 'Farm Pickup & Fleet',
      icon: Truck,
      accent: 'text-orange-600 bg-orange-50 border-orange-200 group-hover:bg-orange-100',
      activeAccent: 'bg-orange-600 text-white shadow-orange-200'
    },
    {
      id: 'queue',
      label: t('queue', 'Real-Time Queue'),
      desc: 'Live Gate Tokens & Yard',
      icon: Clock,
      accent: 'text-indigo-600 bg-indigo-50 border-indigo-200 group-hover:bg-indigo-100',
      activeAccent: 'bg-indigo-600 text-white shadow-indigo-200'
    },
    {
      id: 'tracking',
      label: t('tracking', 'Procurement Tracker'),
      desc: 'Mandi Rates & MSP',
      icon: Activity,
      accent: 'text-purple-600 bg-purple-50 border-purple-200 group-hover:bg-purple-100',
      activeAccent: 'bg-purple-600 text-white shadow-purple-200'
    },
    {
      id: 'documents',
      label: t('documents', 'Docx Request'),
      desc: 'e-NWR Receipts & 75% Loans',
      icon: FileText,
      accent: 'text-teal-600 bg-teal-50 border-teal-200 group-hover:bg-teal-100',
      activeAccent: 'bg-teal-600 text-white shadow-teal-200'
    },
    {
      id: 'sms',
      label: t('sms', 'SMS Alerts'),
      desc: 'Offline Dispatch Tokens',
      icon: MessageSquare,
      badge: unreadSmsCount,
      accent: 'text-rose-600 bg-rose-50 border-rose-200 group-hover:bg-rose-100',
      activeAccent: 'bg-rose-600 text-white shadow-rose-200'
    },
    {
      id: 'profile',
      label: 'Farmer Profile',
      desc: 'Land & Dharani Record',
      icon: User,
      accent: 'text-blue-600 bg-blue-50 border-blue-200 group-hover:bg-blue-100',
      activeAccent: 'bg-blue-600 text-white shadow-blue-200'
    },
    {
      id: 'gaaia',
      label: 'Gaaia AI Bot',
      desc: 'Ask Agri & Storage Questions',
      icon: Bot,
      accent: 'text-emerald-700 bg-emerald-50 border-emerald-300 group-hover:bg-emerald-100',
      activeAccent: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-emerald-200'
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const currentActiveItem = navItems.find(item => item.id === activeTab) || navItems[0];
  const ActiveIcon = currentActiveItem.icon;

  return (
    <>
      {/* Mobile Top Toggle Banner (visible on screens < lg) */}
      <div className="lg:hidden w-full bg-white rounded-2xl shadow-md border border-slate-200 p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <ActiveIcon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Module
            </span>
            <p className="text-sm font-black text-slate-900 leading-tight">
              {currentActiveItem.label}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen && setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{isMobileSidebarOpen ? 'Close Menu' : 'Dashboard Menu'}</span>
        </button>
      </div>

      {/* Mobile Drawer Backdrop (only visible on mobile when drawer is open) */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen && setIsMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Vertical Sidebar Component (Drawer on Mobile, Static Sidebar on Desktop) */}
      <aside
        className={`transition-all duration-300 z-50 ${
          isMobileSidebarOpen
            ? 'fixed inset-y-0 left-0 w-[86vw] max-w-xs sm:max-w-sm block'
            : 'hidden lg:block lg:w-80 lg:shrink-0 lg:self-start lg:sticky lg:top-20'
        }`}
      >
        <div className="bg-gradient-to-b from-[#064e3b] via-[#045d39] to-[#023e25] text-white h-full lg:h-auto rounded-r-3xl lg:rounded-3xl shadow-2xl border-r-2 lg:border-2 border-emerald-400/60 flex flex-col space-y-4 p-4 sm:p-5 max-h-screen lg:max-h-[calc(100vh-120px)] overflow-y-auto">
          
          {/* Mobile Close Button Header */}
          <div className="lg:hidden flex items-center justify-between pb-2 border-b border-white/15">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen && setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-4 bg-white/15 backdrop-blur-md text-white rounded-2xl shadow-lg border border-emerald-300/40 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-15 pointer-events-none">
              <Warehouse className="w-28 h-28 text-white" />
            </div>

            <div className="flex items-start space-x-3 relative z-10">
              <div className="relative shrink-0">
                <span className="text-4xl block bg-white/20 p-2.5 rounded-2xl border border-white/30 shadow-inner">
                  {currentUser.avatar}
                </span>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-base sm:text-lg font-black text-white truncate tracking-wide">
                  {currentUser.name}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 font-bold truncate capitalize mt-0.5">
                  {currentUser.role.replace('_', ' ')} • {currentUser.district || 'Warangal'}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="inline-flex items-center text-xs font-black uppercase tracking-wider bg-amber-400/30 text-amber-200 border border-amber-400/60 px-2.5 py-0.5 rounded-lg shadow-xs">
                    {currentUser.kccNumber || 'KCC-TS-88219'}
                  </span>
                  {isLandVerified && (
                    <span className="inline-flex items-center text-xs font-bold text-white bg-emerald-500/40 border border-emerald-300/60 px-2 py-0.5 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-300" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* View Profile Quick Link */}
            <button
              type="button"
              onClick={() => handleNavClick('profile')}
              className="mt-3.5 w-full flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-100 hover:text-white bg-white/15 hover:bg-white/25 px-3 py-2 rounded-xl transition cursor-pointer border border-white/20"
            >
              <span>Manage Land Title & Records</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Vertical Navigation Items */}
          <div>
            <div className="px-2 pb-2.5 flex items-center justify-between">
              <span className="text-xs font-black text-emerald-200 uppercase tracking-wider">
                Dashboard Modules
              </span>
              <span className="text-xs font-black text-slate-950 bg-amber-300 border border-amber-400 px-2.5 py-0.5 rounded-full shadow-xs">
                Vertical Layout
              </span>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full group flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-300 to-teal-200 text-slate-950 font-black shadow-xl shadow-emerald-950/80 scale-[1.02] border-2 border-white'
                        : 'bg-white/10 hover:bg-white/20 text-white font-extrabold border border-white/20 hover:border-emerald-300/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isActive
                            ? 'bg-slate-900 text-emerald-300 border-slate-700 shadow-inner'
                            : 'bg-white/15 text-emerald-200 border-white/20 group-hover:bg-emerald-500/40 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm sm:text-base font-black truncate ${isActive ? 'text-slate-950' : 'text-white'}`}>
                          {item.label}
                        </p>
                        <p className={`text-xs truncate ${isActive ? 'text-slate-800 font-bold' : 'text-emerald-200/80'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                      {item.badge > 0 && (
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-full animate-bounce ${
                            isActive
                              ? 'bg-slate-950 text-amber-300 font-black shadow-md'
                              : 'bg-rose-500 text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                          isActive ? 'text-slate-900' : 'text-emerald-200/60 group-hover:text-white'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Role Switcher (For Demo & Testing) */}
          <div className="pt-3 border-t border-white/10">
            <p className="text-xs font-black text-emerald-300/80 uppercase tracking-wider mb-2 px-1 text-left">
              Role Switcher
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(DEMO_USERS).map(([key, user]) => {
                const isCurrentRole = currentUser.role === user.role;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => switchRole(key)}
                    className={`py-2 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center transition border cursor-pointer ${
                      isCurrentRole
                        ? 'bg-emerald-400 text-slate-950 border-emerald-300 font-black shadow-md scale-105'
                        : 'bg-white/5 hover:bg-white/15 text-emerald-100 border-white/10'
                    }`}
                  >
                    <span className="text-base">{user.avatar}</span>
                    <span className="truncate capitalize text-xs mt-0.5">{user.role.replace('_', ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Support & Quick Action Card */}
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 space-y-3">
            <a
              href="tel:18001801551"
              className="flex items-center justify-between text-emerald-100 hover:text-white transition"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-emerald-200/80">24/7 Kisan Helpline</p>
                  <p className="text-sm font-black text-white font-mono">1800-180-1551</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded">
                Toll-Free
              </span>
            </a>

            <button
              type="button"
              onClick={logoutUser}
              className="w-full flex items-center justify-center space-x-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Dashboard</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
