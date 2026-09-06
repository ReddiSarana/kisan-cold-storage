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
    <div className="space-y-10 py-4 sm:py-6">
      {/* Official Top Banner Ribbon: Farmer | Truck | Logo & Name | Crops | Storage Unit */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#07361a] via-[#094d25] to-[#07361a] border-2 border-emerald-500/70 shadow-2xl py-3 px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          {/* 1. Farmer Portrait Box */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="w-13 h-16 sm:w-16 sm:h-20 rounded-lg p-1 bg-white shadow-md border-2 border-slate-300 overflow-hidden flex flex-col items-center justify-center shrink-0">
              <img
                src="/images/indian-farmer.jpg"
                alt="Farmer"
                className="w-full h-full object-cover object-top rounded-sm"
              />
            </div>

            {/* 2. Cold Chain Truck Emblem */}
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-br from-amber-400 to-emerald-400 shadow-md shrink-0 border border-white/40">
              <img
                src="/images/cold-chain-truck.jpg"
                alt="Cold Transport Truck"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* 3. Center: Krishivalaya Logo & Name in English & Telugu */}
          <div className="flex flex-col items-center text-center px-2 sm:px-4 shrink-0 min-w-0">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white p-1 shadow-md border border-emerald-300 shrink-0">
                <img
                  src="/krishivalaya-logo.jpg"
                  alt="Krishivalaya Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-lg sm:text-2xl md:text-3xl font-black tracking-wider text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
                  KRISHIVALAYA
                </span>
                <span className="text-emerald-300/60 font-light text-base sm:text-2xl">|</span>
                <span className="text-base sm:text-2xl md:text-3xl font-black text-emerald-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  కృషివలయ
                </span>
              </div>
            </div>
            <p className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-amber-300 mt-1 drop-shadow-sm">
              COLD STORAGE & DIGITAL WAREHOUSE RECEIPT PORTAL (e-NWR)
            </p>
          </div>

          {/* 4. Crops Emblem & 5. Storage Unit Warehouse Box */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* 4. Crops Emblem */}
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-br from-amber-400 to-emerald-400 shadow-md shrink-0 border border-white/40">
              <img
                src="/images/fresh-crops-emblem.jpg"
                alt="Fresh Harvest Crops"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* 5. Storage Unit Warehouse Box */}
            <div className="w-13 h-16 sm:w-16 sm:h-20 rounded-lg p-1 bg-white shadow-md border-2 border-slate-300 overflow-hidden flex flex-col items-center justify-center shrink-0">
              <img
                src="/images/cold-storage-unit.jpg"
                alt="Cold Storage Unit Warehouse"
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner matching user's reference design */}
      <section className="relative overflow-hidden rounded-3xl shadow-2xl border border-emerald-800/40 min-h-[420px] flex flex-col justify-between">
        {/* Panoramic Rural Green Fields Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rural-fields-banner-bg.jpg"
            alt="Scenic Agricultural Fields"
            className="w-full h-full object-cover object-center"
          />
          {/* Blue Sky Gradient Overlay matching reference image */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-blue-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-sky-900/40"></div>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Circular Cutout of Farmer with Wooden Plough */}
            <div className="md:col-span-4 lg:col-span-4 flex justify-center md:justify-start">
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-2 bg-white/30 backdrop-blur-md shadow-2xl border-4 border-white/80 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
                  <img
                    src="/images/telugu-farmer-plough.jpg"
                    alt="Farmer with Wooden Plough - రైతు"
                    className="w-full h-full object-cover object-top scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Right: Pill Badge Title & Explanatory Text (No Reviews) */}
            <div className="md:col-span-8 lg:col-span-8 space-y-4 text-left">
              {/* Title Pill Badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 border-2 border-white/80 px-6 py-2.5 rounded-full shadow-2xl">
                <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                  <img
                    src="/krishivalaya-logo.jpg"
                    alt="Krishivalaya Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl sm:text-4xl font-black text-white tracking-wide">
                    Krishivalaya
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                    Kisan Cold Chain
                  </span>
                </div>
              </div>

              {/* Informational English Text */}
              <div className="space-y-3 max-w-2xl">
                <p className="text-white text-base sm:text-xl font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Krishivalaya helps farmers easily find verified cold storage facilities, transparent tariffs, and live gate queues.
                </p>
                <p className="text-slate-100 text-sm sm:text-base font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Safely preserve your perishable harvest, prevent distress sales, get 75% advance bank loans through digital e-NWR warehouse receipts, and sell when market prices peak.
                </p>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  🌾 Stop Perishable Distress Sales • Multi-Chamber Cold Storage • 75% e-NWR Bank Loan
                </p>
              </div>

              {/* Action Buttons in English */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setActiveTab('signin')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-xl transition-all hover:scale-105 text-xs sm:text-sm cursor-pointer border-2 border-white/60"
                    >
                      <LogIn className="w-4 h-4 text-slate-950" />
                      <span>Sign In (Direct Access)</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>

                    <button
                      onClick={() => setActiveTab('signup')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-xl transition-all hover:scale-105 text-xs sm:text-sm cursor-pointer border-2 border-white/60"
                    >
                      <UserPlus className="w-4 h-4 text-slate-950" />
                      <span>Sign Up & Verify Land</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setActiveTab('crops')}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-xl transition-all hover:scale-105 text-xs sm:text-sm cursor-pointer border-2 border-white/60"
                  >
                    <Warehouse className="w-4 h-4 text-slate-950" />
                    <span>Go to Inside Website</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                )}

                <a
                  href="#mind-map"
                  className="flex items-center space-x-2 bg-slate-950/80 hover:bg-slate-900 text-white font-bold px-5 py-3 rounded-2xl shadow-xl transition-all hover:scale-105 text-xs sm:text-sm border border-white/30 backdrop-blur-md"
                >
                  <span>🧠 Platform Mind Map</span>
                  <ArrowRight className="w-4 h-4 text-slate-200" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Metrics on Banner Bottom */}
        <div className="relative z-10 bg-slate-950/85 backdrop-blur-md border-t border-white/15 px-6 sm:px-10 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <p className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">45,000+ MT</p>
            <p className="text-[11px] text-slate-300 font-medium">{t('capacityMonitored', "Cold Capacity Monitored")}</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-teal-300 font-mono">12,400+</p>
            <p className="text-[11px] text-slate-300 font-medium">{t('registeredFarmers', "Registered Farmers")}</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-amber-300 font-mono">0 Mins</p>
            <p className="text-[11px] text-slate-300 font-medium">{t('gateCongestion', "Gate Congestion with Live Tokens")}</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-blue-300 font-mono">₹42 Cr+</p>
            <p className="text-[11px] text-slate-300 font-medium">{t('pledgeCredit', "Pledge Credit Unlocked")}</p>
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
