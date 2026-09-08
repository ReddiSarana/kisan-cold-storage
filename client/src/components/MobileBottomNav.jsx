import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Home,
  Info,
  LogIn,
  UserPlus,
  Globe,
  Snowflake,
  Warehouse,
  CalendarCheck,
  Clock,
  Menu
} from 'lucide-react';

export default function MobileBottomNav() {
  const {
    activeTab,
    setActiveTab,
    isAuthenticated,
    unreadSmsCount,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useApp();

  const { setIsLanguageModalOpen, currentLanguage } = useLanguage();

  if (isAuthenticated) {
    const authNav = [
      { id: 'crops', label: 'Crops', icon: Snowflake },
      { id: 'units', label: 'Storage', icon: Warehouse },
      { id: 'booking', label: 'Book', icon: CalendarCheck },
      { id: 'queue', label: 'Queue', icon: Clock },
      {
        id: 'menu',
        label: 'Menu',
        icon: Menu,
        badge: unreadSmsCount,
        isAction: true,
        action: () => setIsMobileSidebarOpen && setIsMobileSidebarOpen(!isMobileSidebarOpen)
      }
    ];

    return (
      <nav
        aria-label="Mobile Navigation Bar"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#042411]/95 backdrop-blur-xl border-t-2 border-emerald-500/40 shadow-[0_-8px_25px_rgba(0,0,0,0.5)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 gap-1 items-center">
          {authNav.map((item) => {
            const Icon = item.icon;
            const isActive = !item.isAction && activeTab === item.id;
            const isMenuToggled = item.id === 'menu' && isMobileSidebarOpen;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveTab(item.id);
                    if (isMobileSidebarOpen && setIsMobileSidebarOpen) {
                      setIsMobileSidebarOpen(false);
                    }
                  }
                }}
                className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive || isMenuToggled
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30 -translate-y-0.5'
                    : 'text-emerald-100 hover:text-white hover:bg-white/10 font-bold'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive || isMenuToggled ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-slate-900 shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Unauthenticated Mobile Bottom Bar
  const visitorNav = [
    { id: 'home', label: 'Home', icon: Home, tab: 'home' },
    { id: 'about_us', label: 'About', icon: Info, tab: 'about_us' },
    { id: 'signin', label: 'Sign In', icon: LogIn, tab: 'signin' },
    { id: 'signup', label: 'Sign Up', icon: UserPlus, tab: 'signup' },
    {
      id: 'language',
      label: currentLanguage?.code?.toUpperCase() || 'Lang',
      icon: Globe,
      isAction: true,
      action: () => setIsLanguageModalOpen(true)
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#042411]/95 backdrop-blur-xl border-t-2 border-emerald-500/40 shadow-[0_-8px_25px_rgba(0,0,0,0.5)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-5 gap-1 items-center">
        {visitorNav.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isAction && activeTab === item.tab;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  setActiveTab(item.tab);
                }
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-400/30 -translate-y-0.5'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10 font-bold'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
