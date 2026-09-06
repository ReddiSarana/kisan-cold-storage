import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  CalendarCheck,
  Truck,
  FileCheck,
  Clock,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Download,
  HelpCircle,
  FileText,
  MapPin,
  ChevronDown,
  ChevronUp,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function UserManualPage() {
  const { setActiveTab } = useApp();
  const [activeChapter, setActiveChapter] = useState(1);

  const chapters = [
    {
      id: 1,
      title: '1. Farmer Registration & Identity',
      icon: '👨‍🌾',
      tag: 'Initial Setup',
      summary: 'How to register on Krishivalaya with your mobile number and farm location.',
      steps: [
        {
          title: 'Enter Basic Cultivator Details',
          desc: 'Provide your full name, active mobile number (used for instant SMS alerts), state, district, mandal, and village.'
        },
        {
          title: 'Select Primary Harvest Produce',
          desc: 'Select your major seasonal produce (e.g. Red Chilli, Potato, Turmeric, Onion, Paddy) and estimated quintals to reserve.'
        },
        {
          title: 'Proceed to Land Document Verification',
          desc: 'Click "Proceed to Step 2: Submit Land Documents" to open the state land records verification screen.'
        }
      ]
    },
    {
      id: 2,
      title: '2. Dharani & Land Records Verification',
      icon: '📜',
      tag: 'Pattadar Title',
      summary: 'Authenticating your agricultural land ownership via Pattadar Passbook or Dharani RoR.',
      steps: [
        {
          title: 'Locate Your Pattadar Passbook (PPB) Number',
          desc: 'Find the passbook number printed on your green Government Pattadar Passbook cover (e.g. PPB-TS-2024-88421).'
        },
        {
          title: 'Enter Khata & Survey Number(s)',
          desc: 'Provide your Khata number (e.g. KH-819) and land survey numbers (e.g. 48/A, 49/1) as recorded in the Dharani registry.'
        },
        {
          title: 'Upload Scanned Document or Use 1-Click Demo Fill',
          desc: 'Upload a PDF or photo of your passbook/RoR-1B, or click "⚡ Auto-Fill Demo Passbook" for instant test validation.'
        },
        {
          title: 'Automated 3-Step Verification',
          desc: 'Our system queries the Dharani registry, confirms title ownership, and issues a verified Kisan Seal (KV-TS-2026-XXXXX).'
        }
      ]
    },
    {
      id: 3,
      title: '3. Finding Facilities & Booking Chamber Slots',
      icon: '📅',
      tag: 'Chamber Reservation',
      summary: 'How to discover nearby cold storages and reserve temperature-controlled space.',
      steps: [
        {
          title: 'Discover Closest Cold Storage Facilities',
          desc: 'View real-time highway distance and estimated tractor/truck transit travel times from your farm to each storage facility.'
        },
        {
          title: 'Select Optimal Climate Chamber',
          desc: 'Facilities provide calibrated multi-chamber rooms (e.g., 0°C–2°C for Apples/Onions, 2°C–4°C for Potatoes, 10°C–12°C for Chillies/Tomatoes).'
        },
        {
          title: 'Select Arrival Date & Time Window',
          desc: 'Choose your scheduled deposit date and preferred unloading shift (Morning 08:00 AM, Afternoon 01:00 PM, Evening 05:00 PM).'
        },
        {
          title: 'Confirm Booking & Receive Gate Token',
          desc: 'Receive an instant digital gate token (e.g. TK-101) displayed on screen and dispatched to your phone via SMS.'
        }
      ]
    },
    {
      id: 4,
      title: '4. Digital SMS Gate Tokens & Yard Management',
      icon: '🚜',
      tag: 'Zero-Wait Queues',
      summary: 'Eliminating days of highway congestion with automated digital queue call-ups.',
      steps: [
        {
          title: 'Stay at Your Field Until Notified',
          desc: 'No need to queue your tractor on the highway for days. Your spot in the facility queue is secured digitally.'
        },
        {
          title: 'Receive SMS Bay Call-Up Alert',
          desc: 'When your unloading bay is ready, you receive an automated SMS: "ATTENTION: Token TK-101 proceed to Bay 2 for weighbridge inspection."'
        },
        {
          title: 'Show Digital Token at Security Gate',
          desc: 'Show your token SMS or token card to the gate security guard for immediate clearance into the facility yard.'
        }
      ]
    },
    {
      id: 5,
      title: '5. Produce Deposit, Weighbridge & Storage',
      icon: '⚖️',
      tag: 'Warehouse Quality',
      summary: 'Transparent weighment, quality testing, and climate chamber storage.',
      steps: [
        {
          title: 'Gross Weighbridge Measurement',
          desc: 'Your tractor drives onto the digital weighbridge to record total incoming gross weight.'
        },
        {
          title: 'Scientific Quality & Moisture Inspection',
          desc: 'Certified APMC quality graders inspect a representative sample for grade, moisture percentage, and foreign matter.'
        },
        {
          title: 'Unloading into Assigned Climate Chamber',
          desc: 'Facility forklifts transfer your produce crates/gunny bags into the pre-chilled, relative-humidity-controlled chamber.'
        },
        {
          title: 'Tare Weighment & Net Produce Receipt',
          desc: 'Your empty tractor drives onto the weighbridge to record tare weight, calculating the exact legal net quintals stored.'
        }
      ]
    },
    {
      id: 6,
      title: '6. Electronic Warehouse Receipt (e-NWR) & Bank Loans',
      icon: '🏦',
      tag: 'Bank Pledge Liquidity',
      summary: 'Get 75% advance cash loan from banks without distress-selling your produce.',
      steps: [
        {
          title: 'Generate Legal Word (.docx) Warehouse Receipt',
          desc: 'Download your official WDRA-compliant electronic warehouse receipt (.docx) with digital bailment terms and QR verification.'
        },
        {
          title: 'Pledge with Scheduled National & Cooperative Banks',
          desc: 'Present the e-NWR receipt at State Bank of India, NABARD, Union Bank, or local agricultural cooperative bank.'
        },
        {
          title: 'Receive Up to 75% Advance Pledge Credit',
          desc: 'Banks disburse advance agricultural credit at subsidized interest rates (typically 7% p.a., eligible for prompt repayment subvention).'
        },
        {
          title: 'Sell Produce When Mandi Rates Peak',
          desc: 'When APMC mandi prices double in off-season months, authorize delivery to buyers, clear the bank loan, and pocket the surplus profit.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-bold backdrop-blur-md shadow-xs">
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>Official Farmer User Manual & Step-by-Step Walkthrough</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            How to Use Krishivalaya: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              The Complete Illustrated Farmer Handbook
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
            Designed for every Indian cultivator. Learn how to verify your land ownership, reserve temperature-controlled cold chambers, avoid highway queues with SMS tokens, and get bank loans against stored produce.
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
              onClick={() => setActiveTab('faq')}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-2xl backdrop-blur-md border border-white/20 transition text-xs sm:text-sm cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-teal-300" />
              <span>Frequently Asked Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Selection Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📚 Manual Table of Contents</span>
            <span className="text-xs font-semibold text-slate-400">Click any chapter to view detailed instructions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChapter(ch.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeChapter === ch.id
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-500 shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{ch.icon}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  activeChapter === ch.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {ch.tag}
                </span>
              </div>
              <h3 className={`font-black text-xs sm:text-sm ${activeChapter === ch.id ? 'text-emerald-950' : 'text-slate-800'}`}>
                {ch.title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {ch.summary}
              </p>
              <div className={`mt-3 pt-2 border-t text-[11px] font-bold flex items-center justify-between ${
                activeChapter === ch.id ? 'border-emerald-200 text-emerald-700' : 'border-slate-100 text-slate-400'
              }`}>
                <span>{activeChapter === ch.id ? 'Active Chapter' : 'Read Guide'}</span>
                <span>&rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Chapter Detailed Breakdown */}
      {chapters.find(c => c.id === activeChapter) && (
        <div className="bg-white rounded-3xl border-2 border-emerald-400/60 p-6 sm:p-10 shadow-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {(() => {
            const ch = chapters.find(c => c.id === activeChapter);
            return (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl p-2.5 bg-emerald-50 rounded-2xl border border-emerald-200">{ch.icon}</span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        Chapter {ch.id} of 6 • {ch.tag}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                        {ch.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      disabled={activeChapter === 1}
                      onClick={() => setActiveChapter(prev => Math.max(1, prev - 1))}
                      className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition disabled:opacity-30 cursor-pointer"
                    >
                      &larr; Previous
                    </button>
                    <button
                      disabled={activeChapter === chapters.length}
                      onClick={() => setActiveChapter(prev => Math.min(chapters.length, prev + 1))}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition disabled:opacity-30 cursor-pointer"
                    >
                      Next &rarr;
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {ch.summary} Follow the numbered steps below to perform this action quickly and accurately.
                </p>

                {/* Step List */}
                <div className="space-y-4">
                  {ch.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition flex items-start space-x-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900">
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chapter Action Guidance */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Followed by over 12,400 registered farmers across India.</span>
                  </div>

                  {activeChapter === 1 && (
                    <button
                      onClick={() => setActiveTab('signup')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
                    >
                      <span>Start Step 1: Sign Up Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {activeChapter === 2 && (
                    <button
                      onClick={() => setActiveTab('land_verification')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
                    >
                      <span>Open Land Verification Window</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {activeChapter >= 3 && (
                    <button
                      onClick={() => setActiveTab('signin')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
                    >
                      <span>Sign In to Access Feature</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* 24/7 Helpline Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-800/60">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black tracking-tight">Need Telephone Guidance?</h4>
            <p className="text-xs text-emerald-200/90 mt-0.5 leading-relaxed">
              Our rural extension officers speak 22 regional languages. Call toll-free from any mobile or landline.
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
