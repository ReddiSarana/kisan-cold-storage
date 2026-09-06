import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import WebsiteMindMap from '../components/WebsiteMindMap';
import {
  Sparkles,
  ArrowRight,
  PhoneCall,
  Warehouse,
  LogIn,
  UserPlus,
  ShieldCheck,
  TrendingUp,
  Clock,
  FileCheck
} from 'lucide-react';

export default function HomePage() {
  const { setActiveTab, isAuthenticated } = useApp();
  const { t } = useLanguage();

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-emerald-900/50">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Large Website Name for First Page */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
              Krishi<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">valaya</span>
            </h1>
            <p className="text-xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 leading-snug">
              {t('aboutHeroTitle', "Stop Perishable Distress Sales.")} <br className="hidden sm:inline" />
              <span>{t('aboutHeroSubtitle', "Preserve, Pledge & Profit.")}</span>
            </p>
          </div>

          {/* Logo beside the Description */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 max-w-3xl bg-white/5 border border-white/10 p-5 sm:p-6 rounded-3xl backdrop-blur-md shadow-2xl">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 flex items-center justify-center shadow-xl border-2 border-emerald-400/80 shrink-0">
              <img
                src="/krishivalaya-logo.jpg"
                alt="Krishivalaya Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-400/30 px-3.5 py-1 rounded-full text-emerald-300 text-xs font-bold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                <span>{t('aboutHeroTag', "Empowering India's Agricultural Cold Chain & Post-Harvest Wealth")}</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                {t('aboutHeroDesc', "Every year, India loses nearly ₹92,000 Crores worth of fruits and vegetables due to lacking cold storage access. Krishivalaya connects smallholder and commercial farmers directly with modern, multi-chamber cold storage facilities, transparent tariffs, live gate queues, and bank-pledgeable digital warehouse receipts (e-NWR).")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setActiveTab('signin')}
                  className="flex items-center space-x-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 text-sm cursor-pointer border-2 border-emerald-300"
                >
                  <LogIn className="w-4 h-4 text-slate-950" />
                  <span>Sign In (Direct Access)</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={() => setActiveTab('signup')}
                  className="flex items-center space-x-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-amber-400/25 transition-all hover:scale-105 text-sm cursor-pointer border-2 border-amber-300"
                >
                  <UserPlus className="w-4 h-4 text-slate-950" />
                  <span>Sign Up & Verify Land</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setActiveTab('crops')}
                className="flex items-center space-x-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 text-sm cursor-pointer"
              >
                <Warehouse className="w-4 h-4 text-slate-950" />
                <span>Go to Inside Website</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            )}

            <a
              href="#mind-map"
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black px-5 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105 text-sm"
            >
              <span>🧠 Platform Mind Map</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>
          </div>
        </div>

        {/* Floating Metrics */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left relative z-10">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">45,000+ MT</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{t('capacityMonitored', "Cold Capacity Monitored")}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-2xl sm:text-3xl font-black text-teal-300 font-mono">12,400+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{t('registeredFarmers', "Registered Farmers")}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">0 Mins</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{t('gateCongestion', "Gate Congestion with Live Tokens")}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-2xl sm:text-3xl font-black text-blue-300 font-mono">₹42 Cr+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{t('pledgeCredit', "Pledge Credit Unlocked")}</p>
          </div>
        </div>
      </section>


      {/* Platform Mind Map */}
      <section id="mind-map" className="scroll-mt-20">
        <WebsiteMindMap />
      </section>

      {/* 24/7 Helpline Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-800/60">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-lg font-black tracking-tight">Have Questions About Storage or Booking?</h4>
            <p className="text-xs text-emerald-200/90 mt-0.5 leading-relaxed">
              Call the official Ministry of Agriculture Kisan Call Centre toll-free or reach out to our cold chain dispatch desk.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <a
            href="tel:18001801551"
            className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 px-6 py-3 rounded-xl font-black text-xs shadow-lg transition-all hover:scale-105 font-mono cursor-pointer"
          >
            Call 1800-180-1551
          </a>
        </div>
      </section>
    </div>
  );
}
