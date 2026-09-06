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
      {/* Unified Grand Top Hero Banner (Combined Official Ribbon + Landscape Hero) */}
      <section className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-emerald-500/80 bg-slate-950 flex flex-col justify-between">
        {/* Panoramic Rural Green Fields Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/rural-fields-banner-bg.jpg"
            alt="Scenic Agricultural Countryside"
            className="w-full h-full object-cover object-center"
          />
          {/* Blue Sky & Emerald Deep Gradient Overlays for High Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-blue-950/85 to-emerald-950/75"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-sky-950/85"></div>
        </div>

        {/* 1. TOP RIBBON SECTION (Increased Size: Farmer | Truck | Logo & Name | Crops | Storage Unit) */}
        <div className="relative z-10 bg-slate-950/80 backdrop-blur-xl border-b-2 border-emerald-500/50 px-4 sm:px-8 lg:px-12 py-4 sm:py-6 shadow-xl">
          <div className="flex items-center justify-between gap-3 sm:gap-6 overflow-x-auto no-scrollbar">
            
            {/* Left Group: Farmer Portrait + Truck Emblem (Larger Size) */}
            <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
              {/* 1. Farmer Portrait Box (Enlarged) */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-20 sm:w-22 sm:h-28 md:w-26 md:h-32 rounded-xl p-1.5 bg-white shadow-2xl border-2 border-amber-400/90 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src="/images/indian-farmer.jpg"
                    alt="Farmer - రైతు"
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-amber-300 mt-1 uppercase tracking-wider">
                  Farmer (రైతు)
                </span>
              </div>

              {/* 2. Cold Chain Truck Emblem (Enlarged) */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-22 sm:h-22 md:w-26 md:h-26 rounded-full p-1 bg-gradient-to-br from-amber-400 via-emerald-400 to-teal-400 shadow-2xl shrink-0 border-2 border-white/60">
                  <img
                    src="/images/cold-chain-truck.jpg"
                    alt="Cold Transport Truck"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-emerald-300 mt-1 uppercase tracking-wider">
                  Truck (రవాణా)
                </span>
              </div>
            </div>

            {/* Center: Krishivalaya Logo & Name (Enlarged Typography) */}
            <div className="flex flex-col items-center text-center px-2 sm:px-6 shrink-0 min-w-0">
              <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white p-2 shadow-2xl border-2 border-emerald-400 shrink-0">
                  <img
                    src="/krishivalaya-logo.jpg"
                    alt="Krishivalaya Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-white uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] font-sans">
                    KRISHIVALAYA
                  </span>
                  <span className="text-emerald-300/60 font-light text-xl sm:text-4xl hidden sm:inline">|</span>
                  <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-emerald-300 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                    కృషివలయ
                  </span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-amber-300 mt-1.5 drop-shadow-md">
                COLD STORAGE & POST-HARVEST DIGITAL WAREHOUSE RECEIPT PORTAL (e-NWR)
              </p>
            </div>

            {/* Right Group: Crops Emblem + Cold Storage Warehouse (Larger Size) */}
            <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
              {/* 4. Crops Emblem (Enlarged) */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-22 sm:h-22 md:w-26 md:h-26 rounded-full p-1 bg-gradient-to-br from-amber-400 via-emerald-400 to-teal-400 shadow-2xl shrink-0 border-2 border-white/60">
                  <img
                    src="/images/fresh-crops-emblem.jpg"
                    alt="Fresh Harvest Crops"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-emerald-300 mt-1 uppercase tracking-wider">
                  Crops (పంటలు)
                </span>
              </div>

              {/* 5. Storage Unit Warehouse Box (Enlarged) */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-20 sm:w-22 sm:h-28 md:w-26 md:h-32 rounded-xl p-1.5 bg-white shadow-2xl border-2 border-emerald-400/90 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src="/images/cold-storage-unit.jpg"
                    alt="Cold Storage Unit Warehouse"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-amber-300 mt-1 uppercase tracking-wider">
                  Storage (గోదాము)
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. MAIN BODY SECTION (Farmer with Plough on Left | Large Information & Buttons on Right) */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Circular Farmer with Wooden Plough (Enlarged) */}
            <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-start">
              <div className="relative w-60 h-60 sm:w-76 sm:h-76 lg:w-92 lg:h-92 rounded-full p-3 bg-white/30 backdrop-blur-md shadow-2xl border-4 border-white/90 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
                  <img
                    src="/images/telugu-farmer-plough.jpg"
                    alt="Farmer with Wooden Plough"
                    className="w-full h-full object-cover object-top scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Right: Large Explanatory Typography & Action Buttons */}
            <div className="md:col-span-7 lg:col-span-7 space-y-6 text-left">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 px-4 py-1.5 rounded-full text-emerald-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-md">
                  <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
                  <span>Empowering India's Agricultural Cold Chain & Post-Harvest Wealth</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                  Stop Perishable Distress Sales. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
                    Preserve, Pledge & Profit.
                  </span>
                </h2>
              </div>

              <div className="space-y-3 max-w-2xl">
                <p className="text-white text-base sm:text-xl font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Krishivalaya connects smallholder and commercial farmers directly with modern multi-chamber cold storage facilities, transparent tariffs, and zero-congestion digital gate tokens.
                </p>
                <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Safely preserve your perishable harvest, prevent distress sales, get 75% advance bank loans through digital e-NWR warehouse receipts, and sell when market prices peak for double profit.
                </p>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  🌾 Multi-Chamber Cold Storage • 75% Advance Bank Loans • Zero Gate Queue Tokens
                </p>
              </div>

              {/* Action Buttons with Increased Size */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setActiveTab('signin')}
                      className="flex items-center space-x-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-7 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 text-sm sm:text-base cursor-pointer border-2 border-white/70"
                    >
                      <LogIn className="w-5 h-5 text-slate-950" />
                      <span>Sign In (Direct Access)</span>
                      <ArrowRight className="w-5 h-5 text-slate-950" />
                    </button>

                    <button
                      onClick={() => setActiveTab('signup')}
                      className="flex items-center space-x-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black px-7 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 text-sm sm:text-base cursor-pointer border-2 border-white/70"
                    >
                      <UserPlus className="w-5 h-5 text-slate-950" />
                      <span>Sign Up & Verify Land</span>
                      <ArrowRight className="w-5 h-5 text-slate-950" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setActiveTab('crops')}
                    className="flex items-center space-x-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-7 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 text-sm sm:text-base cursor-pointer border-2 border-white/70"
                  >
                    <Warehouse className="w-5 h-5 text-slate-950" />
                    <span>Go to Inside Website</span>
                    <ArrowRight className="w-5 h-5 text-slate-950" />
                  </button>
                )}

                <a
                  href="#mind-map"
                  className="flex items-center space-x-2 bg-slate-950/85 hover:bg-slate-900 text-white font-bold px-6 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 text-sm sm:text-base border border-white/30 backdrop-blur-md"
                >
                  <span>🧠 Platform Mind Map</span>
                  <ArrowRight className="w-5 h-5 text-slate-200" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 3. BOTTOM FLOATING METRICS (Increased Size) */}
        <div className="relative z-10 bg-slate-950/90 backdrop-blur-xl border-t-2 border-white/15 px-6 sm:px-12 py-5 sm:py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <p className="text-2xl sm:text-4xl font-black text-emerald-300 font-mono">45,000+ MT</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">{t('capacityMonitored', "Cold Capacity Monitored")}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-teal-300 font-mono">12,400+</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">{t('registeredFarmers', "Registered Farmers")}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-amber-300 font-mono">0 Mins</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">{t('gateCongestion', "Gate Congestion with Live Tokens")}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-black text-blue-300 font-mono">₹42 Cr+</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">{t('pledgeCredit', "Pledge Credit Unlocked")}</p>
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
