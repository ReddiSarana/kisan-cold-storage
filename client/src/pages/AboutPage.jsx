import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import WebsiteMindMap from '../components/WebsiteMindMap';
import {
  Snowflake,
  ShieldCheck,
  TrendingUp,
  Truck,
  FileCheck,
  Users,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Warehouse,
  CalendarCheck
} from 'lucide-react';

export default function AboutPage() {
  const { setActiveTab, setSelectedCropFilter } = useApp();
  const { t } = useLanguage();

  const handleCropQuickSelect = (cropId) => {
    setSelectedCropFilter(cropId);
    setActiveTab('units');
  };

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-emerald-900/50">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-400/30 px-4 py-1.5 rounded-full text-emerald-300 text-xs font-bold backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span>{t('aboutHeroTag', "Empowering India's Agricultural Cold Chain & Post-Harvest Wealth")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t('aboutHeroTitle', "Stop Perishable Distress Sales.")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              {t('aboutHeroSubtitle', "Preserve, Pledge & Profit.")}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            {t('aboutHeroDesc', "Every year, India loses nearly ₹92,000 Crores worth of fruits and vegetables due to lacking cold storage access. AgroVault connects smallholder and commercial farmers directly with modern, multi-chamber cold storage facilities, transparent tariffs, live gate queues, and bank-pledgeable digital warehouse receipts (e-NWR).")}
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <button
              onClick={() => setActiveTab('booking')}
              className="flex items-center space-x-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 text-sm"
            >
              <CalendarCheck className="w-4 h-4 text-slate-950" />
              <span>{t('bookSlot', "Book Chamber Slot")}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('units')}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl backdrop-blur-md border border-white/20 transition hover:border-emerald-400/50 text-sm shadow-sm"
            >
              <Warehouse className="w-4 h-4 text-emerald-300" />
              <span>{t('findUnits', "Storage Units Registry")}</span>
            </button>

            <button
              onClick={() => setActiveTab('queue')}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl backdrop-blur-md border border-white/20 transition hover:border-teal-400/50 text-sm shadow-sm"
            >
              <Clock className="w-4 h-4 text-teal-300" />
              <span>{t('liveQueue', "Live Yard Queue")}</span>
            </button>

            <a
              href="#mind-map"
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black px-5 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105 text-sm"
            >
              <span>🧠 Platform Mind Map</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>

            <button
              onClick={() => setActiveTab('crops')}
              className="flex items-center space-x-2 text-emerald-300 hover:text-emerald-200 text-xs font-bold px-3 py-2 transition hover:translate-x-1"
            >
              <span>{t('exploreGuidelines', "Explore Crop Temperature Guides →")}</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Badges / KPIs */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left relative z-10">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 card-hover-lift">
            <p className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">45,000+ MT</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{t('capacityMonitored', "Cold Capacity Monitored")}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 card-hover-lift">
            <p className="text-2xl sm:text-3xl font-black text-teal-300 font-mono">12,400+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{t('registeredFarmers', "Registered Farmers")}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 card-hover-lift">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">0 Mins</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{t('gateCongestion', "Gate Congestion with Live Tokens")}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 card-hover-lift">
            <p className="text-2xl sm:text-3xl font-black text-blue-300 font-mono">₹42 Cr+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{t('pledgeCredit', "Pledge Credit Unlocked")}</p>
          </div>
        </div>
      </section>

      {/* Pictorial Representation & Visual Architecture of the Website */}
      <PictorialSystemDiagram />

      {/* Neat Farmer Step-by-Step Directions Board */}
      <section className="bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-amber-50/80 border-2 border-emerald-300/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-200/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                Farmer Direct Guide • Easy 4 Steps
              </span>
              <span className="text-xs text-emerald-800 font-bold">Simple Process</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">
              How Any Farmer Can Use This Website in 4 Simple Steps
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Click any step below to immediately open that section. No complicated forms or logins required.
            </p>
          </div>

          <div className="bg-white px-4 py-2.5 rounded-2xl border border-emerald-300 shadow-xs flex items-center space-x-3 shrink-0">
            <PhoneCall className="w-5 h-5 text-emerald-600 animate-bounce" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Need Phone Help?</span>
              <strong className="text-sm font-black text-emerald-800 font-mono">1800-180-1551</strong>
            </div>
          </div>
        </div>

        {/* 4 Big Simple Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab('crops')}
            className="bg-white/90 backdrop-blur p-5 rounded-2xl border-2 border-emerald-200 hover:border-emerald-500 shadow-xs card-hover-lift transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center shadow-xs">
                  1
                </span>
                <span className="text-3xl group-hover:scale-110 transition-transform">🌱</span>
              </div>
              <h3 className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition">
                Check Crop Guidelines
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                See exact storage temperature, humidity & shelf life for 77 crops across Telangana.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
              <span>View Crops &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('booking')}
            className="bg-white/90 backdrop-blur p-5 rounded-2xl border-2 border-teal-200 hover:border-teal-500 shadow-xs card-hover-lift transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center shadow-xs">
                  2
                </span>
                <span className="text-3xl group-hover:scale-110 transition-transform">📅</span>
              </div>
              <h3 className="font-black text-sm text-slate-900 group-hover:text-teal-700 transition">
                Chamber Slot Booking
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Open dedicated slot booking window, select arrival date & time slot, and get your digital gate token.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition">
              <span>Open Slot Booking Window &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('queue')}
            className="bg-white/90 backdrop-blur p-5 rounded-2xl border-2 border-amber-200 hover:border-amber-500 shadow-xs card-hover-lift transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shadow-xs">
                  3
                </span>
                <span className="text-3xl group-hover:scale-110 transition-transform">🚜</span>
              </div>
              <h3 className="font-black text-sm text-slate-900 group-hover:text-amber-700 transition">
                Live Gate Queue & Token
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Avoid highway traffic jams! Get an SMS token and drive in only when your bay is ready.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition">
              <span>View Gate Queue &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('documents')}
            className="bg-white/90 backdrop-blur p-5 rounded-2xl border-2 border-blue-200 hover:border-blue-500 shadow-xs card-hover-lift transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center shadow-xs">
                  4
                </span>
                <span className="text-3xl group-hover:scale-110 transition-transform">🏦</span>
              </div>
              <h3 className="font-black text-sm text-slate-900 group-hover:text-blue-700 transition">
                Get Bank Loan (e-NWR)
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Download legal Government WDRA receipt and pledge with banks for 75% advance cash loan.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-1 transition">
              <span>Get Loan Receipt &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-3.5 py-1 rounded-full shadow-xs">
            {t('theChallenge', "The Agricultural Challenge")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('whyColdChain', "Why Cold Chain Access is Essential for Farmers")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Post-harvest glut forces farmers to dump produce at throwaway prices. Scientific cold preservation balances demand and triples farmer incomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/90 backdrop-blur p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:border-rose-300 card-hover-lift space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">Eliminating Harvest Glut Panic</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When potato or tomato harvests surge simultaneously, local APMC mandi prices plummet by up to 70%. Cold storing allows farmers to release produce steadily throughout the year when market rates double.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:border-emerald-300 card-hover-lift space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">Zero-Wait Yard Queue Management</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              During peak harvest weeks, tractors wait in 3-kilometer lines outside cold storages for days. Our automated digital token queue assigns live unloading bays and notifies farmers via SMS when to arrive.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:border-blue-300 card-hover-lift space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">Digital Warehouse Receipts (e-NWR)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under WDRA regulations, stored crop receipts can be pledged immediately with national banks for 75% advance liquidity, ensuring farmers don't run out of cash for the next sowing cycle.
            </p>
          </div>
        </div>
      </section>

      {/* How the Platform Works */}
      <section className="bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 space-y-8 border border-slate-200/80 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-teal-900 bg-teal-100/90 border border-teal-200 px-3.5 py-1 rounded-full shadow-xs">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How AgroVault Works for Every Farmer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Seamless technology tailored for simplicity, mobile SMS notifications, and physical warehouse operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Search & Match Crop',
              desc: 'Select your crop (Potato, Apple, Onion, etc.) to see nearby cold storage facilities with calibrated temperature and humidity chambers.',
              icon: Snowflake,
              action: () => setActiveTab('crops')
            },
            {
              step: '02',
              title: 'Book Space & Get Token',
              desc: 'Reserve required quintals, choose duration, and receive an instant Digital Gate Entry Token (e.g. TK-102) on your phone.',
              icon: Truck,
              action: () => setActiveTab('units')
            },
            {
              step: '03',
              title: 'SMS Yard Call & Weighment',
              desc: 'Our real-time queue engine sends an SMS alert when your bay is ready. Drive in, record gross and tare weighbridge metrics.',
              icon: Clock,
              action: () => setActiveTab('queue')
            },
            {
              step: '04',
              title: 'Download DOCX & Track',
              desc: 'Generate legally binding Storage Agreements and e-NWR Warehouse Receipts in Word (.docx) format for bank loans.',
              icon: FileCheck,
              action: () => setActiveTab('documents')
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className="bg-white/95 backdrop-blur p-6 rounded-2xl shadow-xs border border-slate-200/80 hover:border-emerald-500 card-hover-lift transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-emerald-600/30 group-hover:text-emerald-600 transition">
                      {item.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-teal-700 group-hover:text-white group-hover:shadow-md transition duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-2 group-hover:text-emerald-700 transition">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
                  <span>Explore step &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AgroVault Platform Mind Map */}
      <section id="mind-map" className="scroll-mt-20">
        <WebsiteMindMap />
      </section>

      {/* Crops Quick Selector */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-3.5 py-1 rounded-full shadow-xs">
              Crop Temperature Intelligence
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Select Your Crop to Find Optimal Storage
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('crops')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 group"
          >
            <span>View Full Scientific Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { id: 'potato', name: 'Potato (आलू)', temp: '2°C - 4°C', duration: '8 Months', emoji: '🥔', border: 'hover:border-amber-400' },
            { id: 'apple', name: 'Apple (सेब)', temp: '0°C - 1°C', duration: '10 Months (CA)', emoji: '🍎', border: 'hover:border-rose-400' },
            { id: 'onion', name: 'Onion (प्याज)', temp: '0°C - 2°C (Dry)', duration: '6 Months', emoji: '🧅', border: 'hover:border-purple-400' },
            { id: 'tomato', name: 'Tomato (टमाटर)', temp: '10°C - 12°C', duration: '5 Weeks', emoji: '🍅', border: 'hover:border-red-400' },
          ].map((c) => (
            <div
              key={c.id}
              onClick={() => handleCropQuickSelect(c.id)}
              className={`bg-white/95 backdrop-blur rounded-2xl p-4 border border-slate-200/90 ${c.border} card-hover-lift transition cursor-pointer group shadow-xs`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="text-lg">{c.emoji}</span>
                  <span className="text-xs font-black text-slate-800">{c.name}</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono font-bold">
                  {c.temp}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Safe Preservation: <strong className="text-slate-700">{c.duration}</strong></p>
              <div className="mt-3 text-[11px] text-emerald-600 font-bold group-hover:text-emerald-700 flex items-center justify-between">
                <span>Find Matching Units</span>
                <span className="group-hover:translate-x-1 transition">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Farmer Testimonials */}
      <section className="bg-white/90 backdrop-blur rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-3.5 py-1 rounded-full shadow-xs">
            Real Impact Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted by Thousands of Farmers & Operators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50/80 backdrop-blur p-6 rounded-2xl border border-slate-200/80 card-hover-lift space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "During the March potato harvest in Agra, my tractor used to wait 36 hours in line. With AgroVault's SMS queue token, I stayed at my field until I got the SMS: 'Token TK-101 proceed to Bay 2'. Zero hassle!"
            </p>
            <div className="flex items-center space-x-3 pt-3 border-t border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                RK
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Ramesh Kumar</h5>
                <p className="text-[10px] text-slate-500">Potato Farmer • Khandari, Agra</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 backdrop-blur p-6 rounded-2xl border border-slate-200/80 card-hover-lift space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "The ability to download genuine Word .docx e-NWR receipts directly allowed me to secure an agricultural pledge loan of ₹1,80,000 from SBI within 48 hours. I didn't have to borrow from local moneylenders at 24% interest."
            </p>
            <div className="flex items-center space-x-3 pt-3 border-t border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                SP
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Suresh Patel</h5>
                <p className="text-[10px] text-slate-500">Vegetable Grower • Nashik, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 backdrop-blur p-6 rounded-2xl border border-slate-200/80 card-hover-lift space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "As a cold store owner, our gate traffic used to be absolute chaos with angry farmers blocking the highway. The live token board and automated weighbridge logging reduced our turnaround time by 60%."
            </p>
            <div className="flex items-center space-x-3 pt-3 border-t border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                SS
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Sanjay Singhal</h5>
                <p className="text-[10px] text-slate-500">Managing Director • Shiv Ganga Cold Storage</p>
              </div>
            </div>
          </div>
        </div>
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
            className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 px-6 py-3 rounded-xl font-black text-xs shadow-lg transition-all hover:scale-105 font-mono"
          >
            Call 1800-180-1551
          </a>
        </div>
      </section>
    </div>
  );
}
