import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
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
  PhoneCall
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
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-semibold backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t('aboutHeroTag', "Empowering India's Agricultural Cold Chain & Post-Harvest Wealth")}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t('aboutHeroTitle', "Stop Perishable Distress Sales.")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
              {t('aboutHeroSubtitle', "Preserve, Pledge & Profit.")}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('aboutHeroDesc', "Every year, India loses nearly ₹92,000 Crores worth of fruits and vegetables due to lacking cold storage access. AgroVault connects smallholder and commercial farmers directly with modern, multi-chamber cold storage facilities, transparent tariffs, live gate queues, and bank-pledgeable digital warehouse receipts (e-NWR).")}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('units')}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition hover:scale-105 text-sm"
            >
              <span>{t('findUnits', "Find & Book Cold Storage")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('queue')}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl backdrop-blur border border-white/20 transition text-sm"
            >
              <Clock className="w-4 h-4 text-emerald-300" />
              <span>{t('liveQueue', "Live Yard Queue")}</span>
            </button>

            <button
              onClick={() => setActiveTab('crops')}
              className="flex items-center space-x-2 text-emerald-300 hover:text-emerald-200 text-xs font-semibold px-4 py-2"
            >
              <span>{t('exploreGuidelines', "Explore Crop Temperature Guides →")}</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Badges */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-300">45,000+ MT</p>
            <p className="text-xs text-slate-400 mt-0.5">{t('capacityMonitored', "Cold Capacity Monitored")}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-teal-300">12,400+</p>
            <p className="text-xs text-slate-400 mt-0.5">{t('registeredFarmers', "Registered Farmers")}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-amber-300">0 Mins</p>
            <p className="text-xs text-slate-400 mt-0.5">{t('gateCongestion', "Gate Congestion with Live Tokens")}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-blue-300">₹42 Cr+</p>
            <p className="text-xs text-slate-400 mt-0.5">{t('pledgeCredit', "Pledge Credit Unlocked")}</p>
          </div>
        </div>
      </section>

      {/* Neat Farmer Step-by-Step Directions Board */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-200/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Farmer Direct Guide • రైతులకు మార్గదర్శి
              </span>
              <span className="text-xs text-emerald-800 font-bold">Simple 4 Steps</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
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
            className="bg-white p-5 rounded-2xl border-2 border-emerald-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                  1
                </span>
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition">
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
            onClick={() => setActiveTab('units')}
            className="bg-white p-5 rounded-2xl border-2 border-teal-200 hover:border-teal-500 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
                  2
                </span>
                <span className="text-2xl">🏬</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition">
                Find & Book Cold Storage
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Pick your district (Warangal, Nizamabad, etc.), check transparent rent, and reserve bags.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition">
              <span>Find Units &rarr;</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('queue')}
            className="bg-white p-5 rounded-2xl border-2 border-amber-200 hover:border-amber-500 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
                  3
                </span>
                <span className="text-2xl">🚜</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition">
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
            className="bg-white p-5 rounded-2xl border-2 border-blue-200 hover:border-blue-500 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center">
                  4
                </span>
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition">
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
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            {t('theChallenge', "The Agricultural Challenge")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('whyColdChain', "Why Cold Chain Access is Essential for Farmers")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Post-harvest glut forces farmers to dump produce at throwaway prices. Scientific cold preservation balances demand and triples farmer incomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Eliminating Harvest Glut Panic</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When potato or tomato harvests surge simultaneously, local APMC mandi prices plummet by up to 70%. Cold storing allows farmers to release produce steadily throughout the year when market rates double.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Zero-Wait Yard Queue Management</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              During peak harvest weeks, tractors wait in 3-kilometer lines outside cold storages for days. Our automated digital token queue assigns live unloading bays and notifies farmers via SMS when to arrive.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Digital Warehouse Receipts (e-NWR)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under WDRA regulations, stored crop receipts can be pledged immediately with national banks for 75% advance liquidity, ensuring farmers don't run out of cash for the next sowing cycle.
            </p>
          </div>
        </div>
      </section>

      {/* How the Platform Works */}
      <section className="bg-slate-100 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            How AgroVault Works for Every Farmer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
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
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-emerald-600/30 group-hover:text-emerald-600 transition">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition">
                  <span>Explore step &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Crops Quick Selector */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Crop Temperature Intelligence
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Select Your Crop to Find Optimal Storage
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('crops')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1"
          >
            <span>View Full Scientific Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { id: 'potato', name: 'Potato (आलू)', temp: '2°C - 4°C', duration: '8 Months', bg: 'from-amber-500 to-amber-700' },
            { id: 'apple', name: 'Apple (सेब)', temp: '0°C - 1°C', duration: '10 Months (CA)', bg: 'from-rose-500 to-rose-700' },
            { id: 'onion', name: 'Onion (प्याज)', temp: '0°C - 2°C (Dry)', duration: '6 Months', bg: 'from-purple-500 to-purple-700' },
            { id: 'tomato', name: 'Tomato (टमाटर)', temp: '10°C - 12°C', duration: '5 Weeks', bg: 'from-red-500 to-red-700' },
          ].map((c) => (
            <div
              key={c.id}
              onClick={() => handleCropQuickSelect(c.id)}
              className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">{c.name}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-medium">
                  {c.temp}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Safe Preservation: <strong>{c.duration}</strong></p>
              <div className="mt-3 text-[11px] text-emerald-600 font-semibold group-hover:underline flex items-center justify-between">
                <span>Find Units</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Farmer Testimonials */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Real Impact Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Trusted by Thousands of Farmers & Operators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "During the March potato harvest in Agra, my tractor used to wait 36 hours in line. With AgroVault's SMS queue token, I stayed at my field until I got the SMS: 'Token TK-101 proceed to Bay 2'. Zero hassle!"
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                RK
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Ramesh Kumar</h5>
                <p className="text-[10px] text-slate-500">Potato Farmer • Khandari, Agra</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "The ability to download genuine Word .docx e-NWR receipts directly allowed me to secure an agricultural pledge loan of ₹1,80,000 from SBI within 48 hours. I didn't have to borrow from local moneylenders at 24% interest."
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                SP
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Suresh Patel</h5>
                <p className="text-[10px] text-slate-500">Vegetable Grower • Nashik, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "As a cold store owner, our gate traffic used to be absolute chaos with angry farmers blocking the highway. The live token board and automated weighbridge logging reduced our turnaround time by 60%."
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-slate-200/60">
              <div className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
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
      <section className="bg-emerald-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h4 className="text-lg font-bold">Have Questions About Storage or Booking?</h4>
            <p className="text-xs text-emerald-200 mt-0.5">
              Call the official Ministry of Agriculture Kisan Call Centre toll-free or reach out to our cold chain dispatch desk.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <a
            href="tel:18001801551"
            className="bg-white text-emerald-900 hover:bg-emerald-50 px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition"
          >
            Call 1800-180-1551
          </a>
        </div>
      </section>
    </div>
  );
}
