import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Palette,
  Type,
  Compass,
  Smartphone
} from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

// Color themes for the dashboard
const THEMES = {
  forest: {
    id: 'forest',
    name: 'Forest Emerald',
    icon: '🌿',
    bg: 'bg-gradient-to-br from-[#064e3b] via-[#045d39] to-[#02331f] text-white',
    border: 'border-emerald-400/60',
    headerBg: 'bg-gradient-to-r from-[#032d18] via-[#064e3b] to-[#022413]',
    accentText: 'text-emerald-100',
    accentBg: 'bg-emerald-500',
    pillActive: 'bg-emerald-400 text-slate-950 font-black shadow-lg',
    pillInactive: 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Dark',
    icon: '🌌',
    bg: 'bg-gradient-to-br from-[#06120d] via-[#091f16] to-[#040e0a] text-slate-100',
    border: 'border-emerald-500/30',
    headerBg: 'bg-gradient-to-r from-slate-950 via-[#072418] to-slate-950',
    accentText: 'text-emerald-300',
    accentBg: 'bg-emerald-500',
    pillActive: 'bg-emerald-500 text-slate-950 font-black shadow-emerald-900',
    pillInactive: 'bg-slate-900/90 text-emerald-200 hover:bg-slate-800 border border-emerald-800/60'
  },
  harvest: {
    id: 'harvest',
    name: 'Golden Harvest',
    icon: '🌾',
    bg: 'bg-gradient-to-br from-[#fbf5e8] via-[#fffbf0] to-[#f5ebd6]',
    border: 'border-amber-300/80',
    headerBg: 'bg-gradient-to-r from-[#2c1a05] via-[#3d2508] to-[#1f1203]',
    accentText: 'text-amber-900',
    accentBg: 'bg-amber-600',
    pillActive: 'bg-amber-600 text-white shadow-amber-200',
    pillInactive: 'bg-white/80 text-amber-950 hover:bg-amber-100/60 border border-amber-200'
  },
  ocean: {
    id: 'ocean',
    name: 'Royal Teal',
    icon: '🌊',
    bg: 'bg-gradient-to-br from-[#e7f3f6] via-[#f0f8fa] to-[#dff0f4]',
    border: 'border-teal-300/80',
    headerBg: 'bg-gradient-to-r from-[#05222b] via-[#083543] to-[#03181f]',
    accentText: 'text-teal-900',
    accentBg: 'bg-teal-600',
    pillActive: 'bg-teal-600 text-white shadow-teal-200',
    pillInactive: 'bg-white/80 text-teal-950 hover:bg-teal-100/60 border border-teal-200'
  }
};

export default function DashboardContainer({ children }) {
  const { activeTab, openMobileSimulator } = useApp();
  const { t } = useLanguage();
  const isPreviewChild = typeof window !== 'undefined' && window.location.search.includes('mobile_preview=1');

  // Color Theme State
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('kisan_dashboard_theme') || 'forest';
  });

  // Font Scale State: 'normal' (A-, 100%), 'large' (A, 115%), 'xlarge' (A+, 130%)
  const [fontSizeScale, setFontSizeScale] = useState(() => {
    return localStorage.getItem('kisan_dashboard_font_size') || 'normal';
  });

  // Ensure 'A-' (normal) is selected upon login and listen for login font reset events
  useEffect(() => {
    const saved = localStorage.getItem('kisan_dashboard_font_size');
    if (!saved || saved === 'large') {
      setFontSizeScale('normal');
      localStorage.setItem('kisan_dashboard_font_size', 'normal');
    }

    const handleFontEvent = (e) => {
      const size = e.detail || localStorage.getItem('kisan_dashboard_font_size') || 'normal';
      setFontSizeScale(size);
    };

    window.addEventListener('kisan_font_size_changed', handleFontEvent);
    return () => window.removeEventListener('kisan_font_size_changed', handleFontEvent);
  }, []);

  // Scroll position & percentage tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  // Dedicated Ref for the Dashboard Scrollable Content Container
  const dashboardScrollRef = useRef(null);

  const themeConfig = THEMES[selectedTheme] || THEMES.forest;

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    localStorage.setItem('kisan_dashboard_theme', themeId);
  };

  const handleFontSizeChange = (scale) => {
    setFontSizeScale(scale);
    localStorage.setItem('kisan_dashboard_font_size', scale);
  };

  // Track scroll position in the independent dashboard viewport
  const handleScroll = () => {
    const el = dashboardScrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    const percent = maxScroll > 0 ? Math.round((scrollTop / maxScroll) * 100) : 0;

    setScrollProgress(percent);
    setCanScrollUp(scrollTop > 20);
    setCanScrollDown(scrollTop < maxScroll - 20);
  };

  useEffect(() => {
    const el = dashboardScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll to top when changing dashboard tab
  useEffect(() => {
    if (dashboardScrollRef.current) {
      dashboardScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Smooth scroll controls for the separate dashboard container
  const scrollDashboardToTop = () => {
    if (dashboardScrollRef.current) {
      dashboardScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollDashboardToBottom = () => {
    if (dashboardScrollRef.current) {
      dashboardScrollRef.current.scrollTo({
        top: dashboardScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollDashboardStepUp = () => {
    if (dashboardScrollRef.current) {
      dashboardScrollRef.current.scrollBy({ top: -450, behavior: 'smooth' });
    }
  };

  const scrollDashboardStepDown = () => {
    if (dashboardScrollRef.current) {
      dashboardScrollRef.current.scrollBy({ top: 450, behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${themeConfig.bg} ${
      fontSizeScale === 'xlarge'
        ? 'dashboard-font-xlarge'
        : fontSizeScale === 'large'
        ? 'dashboard-font-large'
        : 'dashboard-font-normal'
    }`}>
      <div className="max-w-[1600px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5">

        {/* Top Dedicated Dashboard Controller Toolbar */}
        <div className="mb-4 p-3.5 sm:p-4 rounded-3xl border-2 border-emerald-400/50 shadow-xl flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#043320] via-[#084a30] to-[#032616] text-white">
          {/* Left: Active Module Identifier & Scroll Active Badge */}
          <div className="flex items-center space-x-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300 block">
                  Dashboard Active
                </span>
                <span className="text-[11px] font-black text-slate-950 bg-amber-300 border border-amber-400 px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-xs">
                  <span>↕ Separate Scroll Bar Active</span>
                </span>
              </div>
              <p className="text-base sm:text-lg font-black capitalize leading-tight mt-0.5 text-white">
                {activeTab.replace('_', ' ')} Module
              </p>
            </div>
          </div>

          {/* Middle: Dedicated Scroll Up / Down Controls (Desktop Only >= 1024px) */}
          <div className="hidden lg:flex items-center space-x-1.5 sm:space-x-2 bg-slate-100/90 dark:bg-slate-800/80 p-1 sm:p-1.5 rounded-2xl border border-slate-300/80 dark:border-slate-700">
            <span className="text-xs font-black text-slate-600 dark:text-slate-300 px-2 flex items-center space-x-1 shrink-0">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scroll:</span>
            </span>

            <button
              type="button"
              onClick={scrollDashboardToTop}
              title="Scroll Dashboard to Top"
              className="flex items-center space-x-1 bg-white dark:bg-slate-700 hover:bg-emerald-50 text-slate-800 dark:text-white px-2.5 py-1.5 rounded-xl text-xs font-black shadow-xs transition border border-slate-200 dark:border-slate-600 cursor-pointer hover:scale-105"
            >
              <ArrowUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Top</span>
            </button>

            <button
              type="button"
              onClick={scrollDashboardStepUp}
              title="Scroll Dashboard Up"
              className="flex items-center space-x-1 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-xs transition cursor-pointer hover:scale-105"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Up</span>
            </button>

            <button
              type="button"
              onClick={scrollDashboardStepDown}
              title="Scroll Dashboard Down"
              className="flex items-center space-x-1 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-xs transition cursor-pointer hover:scale-105"
            >
              <ChevronDown className="w-4 h-4" />
              <span>Down</span>
            </button>

            <button
              type="button"
              onClick={scrollDashboardToBottom}
              title="Scroll Dashboard to Bottom"
              className="flex items-center space-x-1 bg-white dark:bg-slate-700 hover:bg-emerald-50 text-slate-800 dark:text-white px-2.5 py-1.5 rounded-xl text-xs font-black shadow-xs transition border border-slate-200 dark:border-slate-600 cursor-pointer hover:scale-105"
            >
              <ArrowDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bottom</span>
            </button>

            {/* Scroll Progress Meter */}
            <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-100/90 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-300/80 shrink-0">
              {scrollProgress}%
            </span>
          </div>

          {/* Right: Color Themes & Font Size Zoom */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Color Palette Switcher */}
            <div className="flex items-center space-x-1 bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-300/80 dark:border-slate-700">
              <span className="text-xs font-black text-slate-600 dark:text-slate-300 px-1.5 flex items-center space-x-1">
                <Palette className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Color:</span>
              </span>
              {Object.values(THEMES).map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => handleThemeChange(th.id)}
                  title={`Switch to ${th.name} Theme`}
                  className={`px-2 py-1 rounded-xl text-xs font-black flex items-center space-x-1 transition cursor-pointer ${
                    selectedTheme === th.id
                      ? 'bg-emerald-700 text-white shadow-xs font-black scale-105'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{th.icon}</span>
                  <span className="hidden md:inline text-xs">{th.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Font Size Zoom Tool (A- / A / A+) */}
            <div className="flex items-center space-x-1 bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-300/80 dark:border-slate-700">
              <span className="text-xs font-black text-slate-600 dark:text-slate-300 px-1.5 flex items-center space-x-1">
                <Type className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Font:</span>
              </span>
              {[
                { id: 'normal', label: 'A-', title: 'Standard Font' },
                { id: 'large', label: 'A', title: 'Large Font (+15%)' },
                { id: 'xlarge', label: 'A+', title: 'Extra Large Font (+30%)' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleFontSizeChange(f.id)}
                  title={f.title}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                    fontSizeScale === f.id
                      ? 'bg-emerald-700 text-white shadow-xs scale-105'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Mobile View Simulator Button */}
            {!isPreviewChild && (
              <button
                type="button"
                onClick={openMobileSimulator}
                className="hidden md:flex items-center space-x-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 px-3 py-1.5 rounded-2xl text-xs font-black shadow-md transition cursor-pointer hover:scale-105 border border-amber-300"
                title="Open Interactive Mobile View Display Simulator"
              >
                <Smartphone className="w-3.5 h-3.5 text-slate-950" />
                <span>📱 Mobile View</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Layout: Sidebar & Separate Scrollable Viewport */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
          {/* Vertical Sidebar */}
          <DashboardSidebar />

          {/* Separate Independent Scroll Container for the Dashboard */}
          <main
            ref={dashboardScrollRef}
            id="dashboard-main-content"
            tabIndex={0}
            className="flex-1 min-w-0 w-full lg:h-[calc(100vh-140px)] lg:overflow-y-scroll dashboard-scrollbar p-2 sm:p-4 rounded-2xl sm:rounded-3xl transition-all focus:outline-none bg-white/10 backdrop-blur-md border border-emerald-400/30 sm:border-2 shadow-2xl"
          >
            {children}
          </main>
        </div>
      </div>

      {/* Floating Quick Action Controller: Dedicated Scroll Up & Down Widget (Desktop & Tablet) */}
      <div className="fixed bottom-36 sm:bottom-28 right-3 sm:right-6 z-30 hidden sm:flex flex-col items-center space-y-1.5 bg-slate-950/95 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl border-2 border-emerald-400/80">
        {/* Scroll Up Button */}
        <button
          type="button"
          onClick={scrollDashboardStepUp}
          title="Scroll Dashboard Up (⬆)"
          className="w-11 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition cursor-pointer hover:scale-110 active:scale-95"
        >
          <ChevronUp className="w-7 h-7 stroke-[3]" />
        </button>

        {/* Live Scroll Percentage Display */}
        <button
          type="button"
          onClick={scrollDashboardToTop}
          title="Click to Jump to Top"
          className="text-xs font-mono font-black text-amber-300 hover:text-white bg-white/10 px-2.5 py-1 rounded-lg cursor-pointer border border-white/10"
        >
          {scrollProgress}%
        </button>

        {/* Scroll Down Button */}
        <button
          type="button"
          onClick={scrollDashboardStepDown}
          title="Scroll Dashboard Down (⬇)"
          className="w-11 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition cursor-pointer hover:scale-110 active:scale-95"
        >
          <ChevronDown className="w-7 h-7 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
