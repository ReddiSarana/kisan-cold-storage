import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  ShieldCheck,
  TrendingUp,
  Clock,
  FileCheck,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Warehouse,
  Award,
  BookOpen,
  HelpCircle,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function AboutUsPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg border border-emerald-400/50 shrink-0">
              <img
                src="/krishivalaya-logo.jpg"
                alt="Krishivalaya Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-bold backdrop-blur-md shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span>India's Premier Digital Agricultural Cold Chain & WDRA Network</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            About Krishivalaya: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              Empowering the Annadatha Across India
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl font-normal">
            Every year, India loses nearly ₹92,000 Crores worth of harvested fruits and vegetables due to lack of accessible scientific cold storage. Krishivalaya bridges smallholder farmers directly with multi-chamber cold storage facilities, transparent tariffs, live gate queues, and bank-pledgeable warehouse receipts (e-NWR).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('signin')}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-lg transition-all hover:scale-105 text-xs sm:text-sm cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-slate-950" />
              <span>Sign In (Direct Access)</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('signup')}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-lg transition-all hover:scale-105 text-xs sm:text-sm cursor-pointer border border-amber-300"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              <span>Sign Up & Verify Land</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('user_manual')}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-2xl backdrop-blur-md border border-white/20 transition text-xs sm:text-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Read User Manual</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left relative z-10">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">45,000+ MT</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Cold Capacity Monitored</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-2xl sm:text-3xl font-black text-teal-300 font-mono">12,400+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Registered Cultivators</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">0 Mins</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Gate Congestion with SMS Tokens</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-2xl sm:text-3xl font-black text-blue-300 font-mono">₹42 Cr+</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">Pledge Credit Unlocked</p>
          </div>
        </div>
      </div>

      {/* The 3 Core Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-3.5 py-1 rounded-full shadow-xs">
            Our Core Mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How Krishivalaya Transforms Indian Agriculture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From field to cold chamber to bank credit, we empower farmers to preserve quality and double realized profit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-rose-300 transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">1. Stopping Distress Sales</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When market arrivals surge during harvest season, APMC prices crash by up to 70%. Storing produce in scientifically monitored chambers lets farmers release batches when prices peak in the off-season.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">2. Zero-Congestion SMS Queue</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tractor queues outside cold storages used to block highways for days. Our automated SMS queue assigns arrival tokens so farmers drive in only when their specific unloading bay is ready.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">3. Bank-Pledgeable Digital e-NWR</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under WDRA regulations, stored receipts can be pledged immediately with national banks (SBI, NABARD, Union Bank) for 75% advance cash liquidity at 7% p.a. interest, freeing farmers from local moneylenders.
            </p>
          </div>
        </div>
      </section>

      {/* Accreditation Badges */}
      <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <Award className="w-10 h-10 text-emerald-700 shrink-0" />
          <div>
            <h4 className="font-black text-sm text-emerald-950">WDRA & Government Norms Compliant</h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Certified facilities adhere to Warehousing Development and Regulatory Authority (WDRA) guidelines and MoFPI cold chain specifications.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-white px-3 py-1.5 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-900 shadow-2xs">
            WDRA Certified ✓
          </span>
          <span className="bg-white px-3 py-1.5 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-900 shadow-2xs">
            Dharani Verified ✓
          </span>
        </div>
      </section>

      {/* Real Farmer Testimonials */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-3.5 py-1 rounded-full shadow-xs">
            Real Farmer Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted by Thousands of Annadathas Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "During peak harvest in Warangal, my tractor used to wait days in road traffic. With Krishivalaya's SMS queue token, I stayed at my village until I received the SMS alert: 'Token TK-101 proceed to Bay 2'. Completely hassle-free!"
            </p>
            <div className="flex items-center space-x-3 pt-3 border-t border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                RK
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Ramesh Kumar</h5>
                <p className="text-[10px] text-slate-500">Chilli Farmer • Warangal Rural</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "The ability to download genuine Word .docx e-NWR receipts directly allowed me to secure an agricultural pledge loan of ₹1,80,000 from SBI within 48 hours. I didn't have to borrow from local moneylenders at 24% interest."
            </p>
            <div className="flex items-center space-x-3 pt-3 border-t border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                SP
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Suresh Patel</h5>
                <p className="text-[10px] text-slate-500">Vegetable Grower • Nashik, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "As a cold store owner, our gate traffic used to be chaotic with angry farmers blocking the highway. The live token board and automated weighbridge logging reduced our turnaround time by 60%."
            </p>
            <div className="flex items-center space-x-3 pt-3 border-t border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                SS
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-800">Sanjay Singhal</h5>
                <p className="text-[10px] text-slate-500">Managing Director • Kakatiya Cold Chain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Helpline Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-800/60">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black tracking-tight">Have Questions About Krishivalaya?</h4>
            <p className="text-xs text-emerald-200/90 mt-0.5 leading-relaxed">
              Reach out to our 24/7 agricultural dispatch desk or call the toll-free Kisan helpline.
            </p>
          </div>
        </div>
        <a
          href="tel:18001801551"
          className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 px-6 py-3 rounded-xl font-black text-xs shadow-lg transition-all hover:scale-105 font-mono shrink-0 cursor-pointer"
        >
          Call 1800-180-1551
        </a>
      </div>
    </div>
  );
}
