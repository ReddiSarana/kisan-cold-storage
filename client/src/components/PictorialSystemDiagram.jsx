import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  Warehouse,
  Truck,
  Scale,
  FileCheck,
  Banknote,
  TrendingUp,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  CalendarCheck,
  Clock,
  Snowflake,
  ShieldCheck,
  Layers,
  Activity,
  Sparkles,
  ExternalLink,
  QrCode,
  MapPin,
  Check
} from 'lucide-react';

export default function PictorialSystemDiagram() {
  const { setActiveTab } = useApp();
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState('journey'); // 'journey' | 'blueprint' | 'infographic'
  const [selectedStage, setSelectedStage] = useState(0);

  // 6 End-to-End Visual Journey Stages
  const journeyStages = [
    {
      id: 0,
      step: '01',
      title: 'Harvest & Crop Selection',
      teluguSubtitle: 'పంట కోత & శాస్త్రీయ మార్గదర్శకాలు',
      shortDesc: 'Harvest produce and match with 77+ scientific temperature & humidity parameters.',
      badge: 'Scientific Guidelines',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Sprout,
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50/80',
      borderHover: 'hover:border-emerald-500',
      targetTab: 'crops',
      tabButtonText: 'Browse Crop Matrix',
      bulletPoints: [
        'Precise temperature guidelines (e.g. Potato 2°-4°C, Apple 0°-1°C)',
        'Recommended humidity levels to prevent dehydration & weight loss',
        'Storage duration metrics (up to 10 months in CA rooms)',
        'Zero harvest glut panic selling at local mandis'
      ],
      diagramStats: {
        metric: '77 Crops',
        sub: 'Scientific Database'
      }
    },
    {
      id: 1,
      step: '02',
      title: 'Facility & Slot Booking',
      teluguSubtitle: 'కోల్డ్ స్టోరేజ్ ఎంపిక & స్లాట్ బుకింగ్',
      shortDesc: 'Choose verified cold storage and book dedicated date, quintals & arrival slot.',
      badge: 'Dedicated Booking Portal',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      icon: Warehouse,
      color: 'from-teal-500 to-cyan-600',
      bgLight: 'bg-teal-50/80',
      borderHover: 'hover:border-teal-500',
      targetTab: 'booking',
      tabButtonText: 'Open Slot Booking Window',
      bulletPoints: [
        '16 cold storages with 72,000 MT live capacity across Telangana',
        'Transparent tariffs starting at ₹52 - ₹65/quintal/month',
        'Dedicated booking window separated from facility registry',
        'Select vehicle type (Tractor, Mini Truck, 10-Wheeler Lorry)'
      ],
      diagramStats: {
        metric: '16 Facilities',
        sub: 'Telangana & Regional Network'
      }
    },
    {
      id: 2,
      step: '03',
      title: 'Digital Token & Live Queue',
      teluguSubtitle: 'లైవ్ గేట్ క్యూ & SMS టోకెన్',
      shortDesc: 'Instant digital token generated. Live yard bays call vehicle via real-time SMS.',
      badge: 'Zero Highway Congestion',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: Smartphone,
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50/80',
      borderHover: 'hover:border-amber-500',
      targetTab: 'queue',
      tabButtonText: 'View Live Yard Queue',
      bulletPoints: [
        'Instant digital token generated (e.g. TK-108) with QR code',
        'Real-time yard dispatch assigns designated unloading Bay 1 or Bay 2',
        'Instant SMS alerts to farmer phone: "Proceed to Unloading Bay"',
        'Eliminates 3-day tractor waiting queues on highways'
      ],
      diagramStats: {
        metric: '0 Mins',
        sub: 'Average Highway Wait Time'
      }
    },
    {
      id: 3,
      step: '04',
      title: 'Weighbridge & Cold Storage',
      teluguSubtitle: 'వేబ్రిడ్జ్ బరువు & కోల్డ్ ఛాంబర్ భద్రత',
      shortDesc: 'Automated gross & tare weighbridge check-in and placement into cold chambers.',
      badge: 'Continuous IoT Control',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      icon: Snowflake,
      color: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50/80',
      borderHover: 'hover:border-cyan-500',
      targetTab: 'units',
      tabButtonText: 'Explore Storage Units',
      bulletPoints: [
        'Digital electronic weighbridge records net quintals accurately',
        'Palletized chamber stacking with automated slot numbering',
        '24/7 IoT sensors monitor temperature, relative humidity & ethylene',
        'Backup generators ensure 100% uninterrupted refrigeration'
      ],
      diagramStats: {
        metric: '99.8%',
        sub: 'Preservation Quality Rate'
      }
    },
    {
      id: 4,
      step: '05',
      title: 'e-NWR Receipt & Bank Loan',
      teluguSubtitle: 'e-NWR రసీదు & 75% బ్యాంక్ లోన్',
      shortDesc: 'Official WDRA electronic warehouse receipt generated for 75% instant bank pledge loan.',
      badge: 'WDRA Compliant & Bankable',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Banknote,
      color: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50/80',
      borderHover: 'hover:border-blue-500',
      targetTab: 'documents',
      tabButtonText: 'Generate e-NWR Receipt',
      bulletPoints: [
        'Legally binding electronic Negotiable Warehouse Receipt (e-NWR)',
        'Directly download official formatted Word .docx agreement',
        'Pledge with SBI, NABARD, Andhra Pragathi Grameena Bank',
        'Get up to 75% advance cash liquidity at 7% subsidized agricultural interest'
      ],
      diagramStats: {
        metric: '75%',
        sub: 'Pledge Credit Eligibility'
      }
    },
    {
      id: 5,
      step: '06',
      title: 'Off-Season Mandi Release',
      teluguSubtitle: 'మార్కెట్లో సరైన ధర వద్ద విక్రయం',
      shortDesc: 'Release stored produce during high-demand months when mandi rates double or triple.',
      badge: 'Maximum Profit Realization',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: TrendingUp,
      color: 'from-emerald-600 to-green-700',
      bgLight: 'bg-emerald-50/80',
      borderHover: 'hover:border-emerald-600',
      targetTab: 'units',
      tabButtonText: 'Check Market Gateways',
      bulletPoints: [
        'Monitors APMC wholesale mandi rates across Hyderabad, Warangal & Khammam',
        'Avoids harvesting gluts when tomatoes/potatoes drop to ₹2-₹5/kg',
        'Enables controlled phased sales when off-season prices reach ₹30-₹60/kg',
        'Boosts annual farmer take-home earnings by up to 180%'
      ],
      diagramStats: {
        metric: '2x - 3x',
        sub: 'Average Net Realization'
      }
    }
  ];

  // 6 Website Modules for the Blueprint View
  const websiteModules = [
    {
      id: 'crops',
      title: '1. Crop Guidelines Matrix',
      badge: 'Scientific Database',
      tagline: '77 Commercial & Horticulture Crops',
      desc: 'Look up optimal temperature (0°C to 15°C), humidity (85% to 95%), and maximum safe shelf life before booking.',
      icon: Sprout,
      color: 'from-emerald-500 to-teal-600',
      highlights: ['Crop search & filters', 'Moisture & shelf life info', 'Scientific cold guidelines', 'Telugu & 22 languages'],
      actionTab: 'crops'
    },
    {
      id: 'units',
      title: '2. Cold Storage Registry',
      badge: 'Facility Directory',
      tagline: '16 Facilities in Telangana & Regions',
      desc: 'Browse multi-chamber cold storage facilities with live occupied/available MT, tariff rates, and Google map navigation.',
      icon: Warehouse,
      color: 'from-teal-600 to-emerald-700',
      highlights: ['Chamber capacities (MT)', 'Transparent monthly tariffs', 'District location filters', 'Direct contact & map'],
      actionTab: 'units'
    },
    {
      id: 'booking',
      title: '3. Chamber Slot Booking Window',
      badge: 'Dedicated Booking Screen',
      tagline: 'Separate Standalone Window',
      desc: 'Book storage by entering farmer name, phone, crop type, quintals, arrival date, and preferred time slot.',
      icon: CalendarCheck,
      color: 'from-emerald-600 to-teal-600',
      highlights: ['Select arrival date & time', 'Automatic total cost calculator', 'Generates gate token on submit', 'Direct SMS integration'],
      actionTab: 'booking'
    },
    {
      id: 'queue',
      title: '4. Live Yard Queue & Bay Dispatch',
      badge: 'Smart Yard Management',
      tagline: 'Real-Time Bay 1 & Bay 2 Allocation',
      desc: 'Live LED board showing tokens in line, vehicles currently unloading at Bay 1 and Bay 2, and weighbridge telemetry.',
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      highlights: ['Live token callout display', 'Bay 1 & Bay 2 active monitors', 'Weighbridge gross/tare logging', 'Zero yard highway jams'],
      actionTab: 'queue'
    },
    {
      id: 'documents',
      title: '5. e-NWR Receipts & Documents',
      badge: 'Bank Pledge & WDRA',
      tagline: 'Official Downloadable Word (.docx)',
      desc: 'Generate and download genuine WDRA-standard Warehouse Receipts and Storage Agreements to secure 75% bank loans.',
      icon: FileCheck,
      color: 'from-blue-500 to-indigo-600',
      highlights: ['Official Word (.docx) generation', 'WDRA compliance certificate', 'Bank pledge pledgeable receipt', 'Instant local print/save'],
      actionTab: 'documents'
    },
    {
      id: 'profile',
      title: '6. Farmer Account & Profile',
      badge: 'Personalized Dashboard',
      tagline: 'Active Bookings & Language Settings',
      desc: 'Track personal booking history, check stored produce status, active tokens, and switch across all 22 official Indian languages.',
      icon: Smartphone,
      color: 'from-purple-500 to-indigo-600',
      highlights: ['Farmer ID & contact details', 'Active & past storage records', 'One-click token re-inspection', 'Full 22 official languages'],
      actionTab: 'profile'
    }
  ];

  return (
    <section id="pictorial-diagram" className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-200/90 shadow-xl space-y-8 overflow-hidden relative">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-teal-100/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-100/40 to-emerald-100/20 rounded-full blur-3xl pointer-events-none -z-0"></div>

      {/* Header & View Switcher */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pictorial Representation of AgroVault</span>
            </span>
            <span className="text-xs font-bold text-emerald-800 hidden sm:inline-block">
              {t('pictorialTag', 'Visual System Map')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            How the Whole Platform Works in Pictures
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            A complete visual diagram illustrating every step of the farmer's journey from harvest in the field to cold storage chambers, queue management, e-NWR receipts, and bank loans.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 shadow-inner shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveView('journey')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition ${
              activeView === 'journey'
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Farm-to-Mandi Journey</span>
          </button>
          <button
            onClick={() => setActiveView('blueprint')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition ${
              activeView === 'blueprint'
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Website Blueprint</span>
          </button>
          <button
            onClick={() => setActiveView('infographic')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition ${
              activeView === 'infographic'
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Visual Infographic</span>
          </button>
        </div>
      </div>

      {/* Visual Infographic Picture Banner */}
      <div className="relative z-10 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-4 sm:p-6 rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden group">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-white/10 gap-3">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white text-xs font-black uppercase tracking-wider">
              High-Definition Visual Ecosystem Diagram
            </span>
          </div>
          <span className="text-[11px] text-emerald-300 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/15">
            5 Connected Agricultural Stages
          </span>
        </div>
        
        <div className="mt-4 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl relative bg-slate-950">
          <img
            src="/images/platform-pictorial-diagram.jpg"
            alt="AgroVault Kisan Cold Storage Pictorial Representation Diagram"
            className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </div>

      {/* VIEW 1: FARM-TO-MANDI PICTORIAL JOURNEY */}
      {activeView === 'journey' && (
        <div className="relative z-10 space-y-8">
          {/* Horizontal Interactive Step Navigation Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {journeyStages.map((stage) => {
              const Icon = stage.icon;
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white/80 hover:bg-slate-50 border-slate-200/90 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Step {stage.step}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                    {stage.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {stage.diagramStats.metric}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Pictorial Stage Canvas */}
          {(() => {
            const current = journeyStages[selectedStage];
            const Icon = current.icon;
            return (
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-emerald-900/60 relative overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Stage Explanation & Highlights */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Stage {current.step} of 06
                      </span>
                      <span className="bg-white/10 border border-white/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full">
                        {current.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {current.title}
                      </h3>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                        {current.teluguSubtitle}
                      </p>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed font-normal">
                      {current.shortDesc}
                    </p>

                    {/* Feature Checkpoints */}
                    <div className="space-y-2.5 pt-2">
                      {current.bulletPoints.map((pt, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs text-slate-300">{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action button to immediately jump to corresponding section */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveTab(current.targetTab)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-5 py-3 rounded-2xl shadow-lg transition-all hover:scale-105 text-xs"
                      >
                        <span>{current.tabButtonText}</span>
                        <ArrowRight className="w-4 h-4 text-slate-950" />
                      </button>

                      <div className="flex items-center space-x-2">
                        {selectedStage > 0 && (
                          <button
                            onClick={() => setSelectedStage(selectedStage - 1)}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs transition"
                          >
                            &larr; Previous Stage
                          </button>
                        )}
                        {selectedStage < journeyStages.length - 1 && (
                          <button
                            onClick={() => setSelectedStage(selectedStage + 1)}
                            className="bg-white/10 hover:bg-white/20 text-emerald-300 font-bold px-3.5 py-2.5 rounded-xl text-xs transition"
                          >
                            Next Stage &rarr;
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Rich Pictorial Graphic Representation */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <div className="w-full bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/15 shadow-xl relative text-center space-y-4">
                      {/* Big Visual Graphic Box */}
                      <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/40 flex items-center justify-center shadow-inner group">
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${current.color} text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                        {/* Little pulsing indicator badge */}
                        <div className="absolute -top-2 -right-2 bg-emerald-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-ping"></span>
                          <span>Active Flow</span>
                        </div>
                      </div>

                      {/* Stat Callout */}
                      <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-emerald-500/30">
                        <div className="text-2xl font-black text-emerald-300 font-mono">
                          {current.diagramStats.metric}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {current.diagramStats.sub}
                        </div>
                      </div>

                      {/* Journey Progression Bar */}
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                          <span>Pipeline Progress</span>
                          <span className="text-emerald-400 font-bold">
                            {Math.round(((selectedStage + 1) / journeyStages.length) * 100)}% Completed
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                            style={{ width: `${((selectedStage + 1) / journeyStages.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Pictorial Flowchart Timeline Connector */}
          <div className="hidden lg:block bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4 text-center">
              Visual System Highway: Step-by-Step Interconnections
            </h4>
            <div className="flex items-center justify-between relative">
              {/* Connector line behind steps */}
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-600 -translate-y-1/2 z-0"></div>

              {journeyStages.map((stage) => {
                const Icon = stage.icon;
                const isCurrent = selectedStage === stage.id;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className="relative z-10 flex flex-col items-center cursor-pointer group"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 scale-110 shadow-lg'
                          : 'bg-white text-slate-600 border-2 border-slate-300 hover:border-emerald-500 group-hover:scale-105 shadow-xs'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-2 text-center max-w-[90px] leading-tight ${
                        isCurrent ? 'text-emerald-800 font-black' : 'text-slate-600'
                      }`}
                    >
                      {stage.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE WEBSITE BLUEPRINT & SCREEN MAP */}
      {activeView === 'blueprint' && (
        <div className="relative z-10 space-y-6">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  AgroVault Portal Architecture Blueprint
                </h4>
                <p className="text-xs text-slate-600">
                  Click any module card below to open its live interactive window.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-white text-emerald-800 px-3 py-1 rounded-full border border-emerald-300 shadow-xs hidden sm:inline-block">
              6 Core Windows
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {websiteModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className="bg-white rounded-2xl p-5 border-2 border-slate-200/90 hover:border-emerald-500 card-hover-lift transition shadow-xs flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-mono">
                        {mod.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition">
                        {mod.title}
                      </h3>
                      <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                        {mod.tagline}
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5">
                      {mod.highlights.map((h, i) => (
                        <div key={i} className="flex items-center space-x-2 text-[11px] text-slate-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveTab(mod.actionTab)}
                      className="w-full flex items-center justify-center space-x-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold py-2 rounded-xl text-xs transition group-hover:shadow-md"
                    >
                      <span>Open {mod.title.split('. ')[1]} Window</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: FULL SVG INFOGRAPHIC DIAGRAM */}
      {activeView === 'infographic' && (
        <div className="relative z-10 space-y-6">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-900/60 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full">
                System Schematic Diagram
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                AgroVault Cold Chain Cloud & Physical Infrastructure
              </h3>
              <p className="text-xs text-slate-300">
                Visualizing data, vehicle telemetry, cold chambers, and banking integration.
              </p>
            </div>

            {/* Pictorial SVG Schematic Canvas */}
            <div className="w-full overflow-x-auto py-4">
              <div className="min-w-[760px] max-w-4xl mx-auto bg-slate-900/90 rounded-2xl p-6 border border-emerald-500/30 relative">
                {/* SVG Visual Flow Connections */}
                <svg viewBox="0 0 800 380" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Connection Arrows & Lines */}
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                    </marker>
                  </defs>

                  {/* Flow Path 1: Farmer -> Cloud */}
                  <path d="M 140 190 L 260 190" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrow)" />

                  {/* Flow Path 2: Cloud -> Cold Facility */}
                  <path d="M 380 160 L 480 110" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrow)" />

                  {/* Flow Path 3: Cloud -> Banking Desk */}
                  <path d="M 380 220 L 480 270" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrow)" />

                  {/* Flow Path 4: Cold Facility -> Mandi */}
                  <path d="M 620 110 L 700 160" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrow)" />

                  {/* Flow Path 5: Banking Desk -> Farmer Loan Credit */}
                  <path d="M 480 300 C 350 360 200 340 120 250" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />

                  {/* Node 1: Farmer on Field */}
                  <g transform="translate(30, 130)">
                    <rect width="110" height="120" rx="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <circle cx="55" cy="42" r="22" fill="#065f46" />
                    <text x="55" y="47" fill="#6ee7b7" fontSize="20" textAnchor="middle">🚜</text>
                    <text x="55" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Farmer on Field</text>
                    <text x="55" y="96" fill="#94a3b8" fontSize="9" textAnchor="middle">77 Crop Guides</text>
                    <text x="55" y="108" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Slot Booking</text>
                  </g>

                  {/* Node 2: AgroVault Cloud Platform */}
                  <g transform="translate(260, 120)">
                    <rect width="130" height="140" rx="20" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" />
                    <circle cx="65" cy="45" r="25" fill="#022c22" />
                    <text x="65" y="52" fill="#34d399" fontSize="22" textAnchor="middle">⚡</text>
                    <text x="65" y="86" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">AgroVault Hub</text>
                    <text x="65" y="102" fill="#6ee7b7" fontSize="9" textAnchor="middle">Live Token Engine</text>
                    <text x="65" y="116" fill="#cbd5e1" fontSize="8" textAnchor="middle">SMS Dispatch Alerts</text>
                    <text x="65" y="128" fill="#facc15" fontSize="8" fontWeight="bold" textAnchor="middle">22 Languages</text>
                  </g>

                  {/* Node 3: Physical Cold Storage Yard & Chambers */}
                  <g transform="translate(480, 50)">
                    <rect width="140" height="125" rx="16" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                    <circle cx="70" cy="40" r="20" fill="#115e59" />
                    <text x="70" y="46" fill="#2dd4bf" fontSize="18" textAnchor="middle">❄️</text>
                    <text x="70" y="76" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Cold Storage Yard</text>
                    <text x="70" y="92" fill="#94a3b8" fontSize="9" textAnchor="middle">Bay 1 & 2 Live Queues</text>
                    <text x="70" y="106" fill="#2dd4bf" fontSize="9" fontWeight="bold" textAnchor="middle">Tare Weighbridge</text>
                  </g>

                  {/* Node 4: National Banks / e-NWR */}
                  <g transform="translate(480, 210)">
                    <rect width="140" height="125" rx="16" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="70" cy="40" r="20" fill="#1e3a8a" />
                    <text x="70" y="46" fill="#93c5fd" fontSize="18" textAnchor="middle">🏛️</text>
                    <text x="70" y="76" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">e-NWR & Banks</text>
                    <text x="70" y="92" fill="#94a3b8" fontSize="9" textAnchor="middle">WDRA Word docx</text>
                    <text x="70" y="106" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">75% Advance Loan</text>
                  </g>

                  {/* Node 5: APMC Mandi / Profitable Release */}
                  <g transform="translate(680, 130)">
                    <rect width="110" height="120" rx="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="55" cy="42" r="22" fill="#78350f" />
                    <text x="55" y="48" fill="#fde047" fontSize="20" textAnchor="middle">📈</text>
                    <text x="55" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">APMC Mandi</text>
                    <text x="55" y="96" fill="#94a3b8" fontSize="9" textAnchor="middle">Off-Season Sale</text>
                    <text x="55" y="108" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">2x - 3x Profit</text>
                  </g>
                </svg>

                {/* Subtitle labels */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-800 text-center text-[10px]">
                  <div className="bg-slate-800/80 p-2 rounded-xl text-emerald-300 font-medium">
                    1. Field Harvest & Slot
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-xl text-teal-300 font-medium">
                    2. Cloud Live Token
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-xl text-cyan-300 font-medium">
                    3. Smart Cold Storage
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-xl text-blue-300 font-medium">
                    4. 75% Bank Credit
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-xl text-amber-300 font-medium">
                    5. Double Price Mandi
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Quick Launch Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>All 6 components communicate in real time through Vite and Node.js APIs.</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('booking')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow-md transition"
                >
                  Try Slot Booking Now
                </button>
                <button
                  onClick={() => setActiveTab('queue')}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
                >
                  View Live Queue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
