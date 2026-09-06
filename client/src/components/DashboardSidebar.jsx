import React from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Snowflake,
  Warehouse,
  CalendarCheck,
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
  AlertTriangle
} from 'lucide-react';

export default function DashboardSidebar() {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    switchRole,
    unreadSmsCount,
    setIsSmsSimulatorOpen,
    isSmsSimulatorOpen,
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

      {/* Vertical Sidebar Component */}
      <aside
        className={`w-full lg:w-72 sm:lg:w-80 shrink-0 self-start lg:sticky lg:top-20 z-30 transition-all duration-300 ${
          isMobileSidebarOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col space-y-4 p-4 sm:p-5">
          
          {/* User Profile Card */}
          <div className="p-3.5 bg-gradient-to-br from-emerald-900 via-[#005a30] to-teal-950 text-white rounded-2xl shadow-md border border-emerald-700/60 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-15 pointer-events-none">
              <Warehouse className="w-28 h-28 text-white" />
            </div>

            <div className="flex items-start space-x-3 relative z-10">
              <div className="relative shrink-0">
                <span className="text-3xl block bg-white/10 p-2 rounded-2xl border border-white/20 shadow-inner">
                  {currentUser.avatar}
                </span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-sm font-black text-white truncate tracking-wide">
                  {currentUser.name}
                </h3>
                <p className="text-[11px] text-emerald-200 font-semibold truncate capitalize">
                  {currentUser.role.replace('_', ' ')} • {currentUser.district || 'Warangal'}
                </p>
                <div className="mt-1.5 flex items-center space-x-1.5">
                  <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-md">
                    {currentUser.kccNumber || 'KCC-TS-88219'}
                  </span>
                  {isLandVerified && (
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-300 bg-emerald-400/20 px-1.5 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3 mr-0.5 text-emerald-300" />
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
              className="mt-3 w-full flex items-center justify-between text-[11px] font-bold text-emerald-200 hover:text-white bg-white/10 hover:bg-white/15 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
            >
              <span>Manage Land Title & Records</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Vertical Navigation Items */}
          <div>
            <div className="px-2 pb-2 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Dashboard Modules
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Vertical Layout
              </span>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? `${item.activeAccent} shadow-lg font-black scale-[1.01]`
                        : 'hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-bold border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isActive
                            ? 'bg-white/20 text-white border-white/30'
                            : item.accent
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {item.label}
                        </p>
                        <p className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                      {item.badge > 0 && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce ${
                            isActive
                              ? 'bg-amber-300 text-slate-950'
                              : 'bg-rose-500 text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                          isActive ? 'text-white' : 'text-slate-300 group-hover:text-slate-500'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Role Switcher (For Demo & Testing) */}
          <div className="pt-3 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 px-1 text-left">
              Role Switcher (Simulator)
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {Object.entries(DEMO_USERS).map(([key, user]) => {
                const isCurrentRole = currentUser.role === user.role;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => switchRole(key)}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-extrabold flex flex-col items-center justify-center transition border cursor-pointer ${
                      isCurrentRole
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <span className="text-sm">{user.avatar}</span>
                    <span className="truncate capitalize">{user.role.replace('_', ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Support & Quick Action Card */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
            <a
              href="tel:18001801551"
              className="flex items-center justify-between text-slate-700 hover:text-emerald-700 transition"
            >
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-500">24/7 Kisan Helpline</p>
                  <p className="text-xs font-black text-slate-900 font-mono">1800-180-1551</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                Toll-Free
              </span>
            </a>

            <button
              type="button"
              onClick={() => setIsSmsSimulatorOpen(!isSmsSimulatorOpen)}
              className="w-full flex items-center justify-center space-x-1.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 py-2 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Open Phone SMS Simulator</span>
            </button>

            <button
              type="button"
              onClick={logoutUser}
              className="w-full flex items-center justify-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Dashboard</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
