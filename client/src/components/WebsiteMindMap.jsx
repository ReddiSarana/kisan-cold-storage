import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  Warehouse,
  CalendarCheck,
  Clock,
  FileCheck,
  TrendingUp,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  Compass,
  CheckCircle2,
  HelpCircle,
  FolderTree,
  Share2,
  SlidersHorizontal
} from 'lucide-react';

// Mind Map Data Structure: Central Platform Node -> 6 Primary Branches -> Leaf Sub-Nodes
const MIND_MAP_DATA = {
  id: 'root',
  title: 'AgroVault Kisan Cold Chain',
  telugu: 'అగ్రోవాల్ట్ కిసాన్ కోల్డ్ చైన్ ప్లాట్‌ఫామ్',
  tagline: 'End-to-End Post-Harvest Preservation & Wealth Infrastructure',
  icon: '🌱',
  color: 'from-emerald-600 via-teal-600 to-cyan-700',
  borderColor: 'border-emerald-400',
  stats: '6 Modules • 77 Crops • 135 Hubs',
  branches: [
    {
      id: 'branch-crops',
      title: '1. Scientific Crop Matrix',
      telugu: 'శాస్త్రీయ పంటల మార్గదర్శకాలు',
      shortTitle: 'Crop Matrix',
      color: '#10b981',
      bgLight: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500',
      textAccent: 'text-emerald-400',
      badge: '77 Crops Database',
      icon: Sprout,
      actionTab: 'crops',
      actionText: 'Browse 77 Crops',
      summary: 'Scientific cold storage guidelines covering temperature, relative humidity, pre-cooling requirements, and safe shelf life for horticulture & field crops.',
      subNodes: [
        {
          id: 'c-cultivation',
          title: 'Cultivation & Harvest Guides',
          desc: 'Integrated drop-down cultivation guides on each crop card covering sowing, harvesting maturity, and post-harvest handling.',
          tag: 'Dropdown Guide'
        },
        {
          id: 'c-temp',
          title: 'Precision Temperature (0°C to 15°C)',
          desc: 'Scientifically validated temperature ranges: Potatoes at 2°-4°C, Apples at 0°-1°C, Chillies at 0°-2°C.',
          tag: 'Cold Range'
        },
        {
          id: 'c-humidity',
          title: 'Humidity & Moisture Control',
          desc: 'Recommended 85% to 95% relative humidity to eliminate water loss, skin shriveling, and weight loss.',
          tag: 'Humidity RH'
        },
        {
          id: 'c-shelflife',
          title: 'Shelf-Life Extension (Up to 10 Months)',
          desc: 'Extends produce longevity up to 10 months in Controlled Atmosphere (CA) chambers, eliminating panic selling.',
          tag: 'CA Storage'
        },
        {
          id: 'c-languages',
          title: 'Telugu & 22 Indian Languages',
          desc: 'Complete vernacular translation of scientific parameters and cultivation instructions for rural farmers.',
          tag: 'Vernacular'
        }
      ]
    },
    {
      id: 'branch-units',
      title: '2. Cold Storage Directory',
      telugu: 'కోల్డ్ స్టోరేజ్ యూనిట్ల రిజిస్ట్రీ',
      shortTitle: 'Storage Units',
      color: '#06b6d4',
      bgLight: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500',
      textAccent: 'text-cyan-400',
      badge: '135 Registered Facilities',
      icon: Warehouse,
      actionTab: 'units',
      actionText: 'Find Nearby Storage',
      summary: 'Comprehensive registry of 135 multi-chamber cold storage facilities across Telangana districts with live capacity, tariffs, and direct manager links.',
      subNodes: [
        {
          id: 'u-clusters',
          title: 'Telangana District Clusters',
          desc: 'Facilities in Karimnagar, Jammikunta, Choppadandi, Huzurabad, Warangal, Nizamabad, Hyderabad, Khammam & all 33 districts.',
          tag: '33 Districts'
        },
        {
          id: 'u-capacity',
          title: 'Chamber Capacities (MT) & Available Bays',
          desc: 'Live occupancy tracking showing available Metric Tonnes (MT), total bays, and multi-commodity rooms.',
          tag: 'Live MT'
        },
        {
          id: 'u-tariffs',
          title: 'Transparent Monthly Tariffs',
          desc: 'Itemized standard storage fees per quintal per month (e.g. ₹95 - ₹120/qtl/mo) with zero hidden markups.',
          tag: 'Transparent Rate'
        },
        {
          id: 'u-filter',
          title: 'Crop & District Smart Filters',
          desc: 'Instantly find which facilities specialize in Chilli, Turmeric, Potato, Onion, or Mango with compatible chambers.',
          tag: 'Smart Filter'
        },
        {
          id: 'u-contact',
          title: 'Direct Phone & Google Maps Route',
          desc: 'Direct phone contact to facility managers and GPS navigation directions right to the unloading bay.',
          tag: 'Directions'
        }
      ]
    },
    {
      id: 'branch-booking',
      title: '3. Chamber Slot Booking',
      telugu: 'ఛాంబర్ స్లాట్ బుకింగ్ విండో',
      shortTitle: 'Slot Booking',
      color: '#8b5cf6',
      bgLight: 'bg-purple-500/10',
      borderColor: 'border-purple-500',
      textAccent: 'text-purple-400',
      badge: 'Dedicated Standalone Window',
      icon: CalendarCheck,
      actionTab: 'booking',
      actionText: 'Book Chamber Slot',
      summary: 'Dedicated booking portal for farmers to reserve multi-chamber storage with multi-crop payloads, harvest origin places, and live transit route maps.',
      subNodes: [
        {
          id: 'b-multicrop',
          title: 'Multi-Crop Simultaneous Booking',
          desc: 'Add multiple produce commodities in a single booking window with dedicated quintals and bag counts.',
          tag: '+ Multi-Crop'
        },
        {
          id: 'b-origin',
          title: 'Accurate Harvest Origin Place & Geotag',
          desc: 'Farmer provides origin village, mandal, district, survey number, and farm gate PIN for WDRA traceability.',
          tag: 'Traceability'
        },
        {
          id: 'b-map',
          title: 'Live Transit Route & Highway Map',
          desc: 'Visual animated vector map connecting Point A (Farm Gate) to Point B (Cold Storage) with distance in km.',
          tag: 'Route Map'
        },
        {
          id: 'b-vehicle',
          title: 'Vehicle & Arrival Time Slots',
          desc: 'Register tractor trolley, Bolero, or truck number plate and choose morning, afternoon, or evening intake slots.',
          tag: 'Time Slots'
        },
        {
          id: 'b-advance',
          title: '25% Advance & Cost Breakdown Ledger',
          desc: 'Instant transparent ledger displaying storage rent, handling fees, 25% gate advance, and 75% final balance.',
          tag: 'Ledger'
        }
      ]
    },
    {
      id: 'branch-queue',
      title: '4. Live Yard Queue & Intake',
      telugu: 'లైవ్ యార్డ్ క్యూ & బే డిస్పాచ్',
      shortTitle: 'Yard Queue',
      color: '#f59e0b',
      bgLight: 'bg-amber-500/10',
      borderColor: 'border-amber-500',
      textAccent: 'text-amber-400',
      badge: 'Real-Time Bay Telemetry',
      icon: Clock,
      actionTab: 'queue',
      actionText: 'View Live Queue',
      summary: 'Real-time yard dispatch and queue management displaying digital gate tokens, active unloading at Bay 1 & Bay 2, and weighbridge logging.',
      subNodes: [
        {
          id: 'q-token',
          title: 'Digital Gate Token Engine (e.g. TK-108)',
          desc: 'Automated token assigned upon booking, prioritizing arrivals and eliminating multi-day highway traffic jams.',
          tag: 'Token Pass'
        },
        {
          id: 'q-weighbridge',
          title: 'Dharma Kanta (Weighbridge Telemetry)',
          desc: 'Automatic logging of gross incoming vehicle weight, moisture analysis, and tare vehicle weight after unloading.',
          tag: 'Weighbridge'
        },
        {
          id: 'q-bays',
          title: 'Bay 1 & Bay 2 Active Monitors',
          desc: 'Live status of unloading docks, crew bag-stacking progress, and chamber pre-cooling staging.',
          tag: 'Bay 1 & 2'
        },
        {
          id: 'q-sms',
          title: 'Automated SMS Alerts to Farmer Mobile',
          desc: 'Instant SMS dispatched to farmer phone when token is called, weighment is recorded, and produce is stacked.',
          tag: 'SMS Engine'
        },
        {
          id: 'q-inspection',
          title: 'Pre-Storage Quality & Moisture Test',
          desc: 'Digital moisture percentage test to ensure produce meets cold room safety guidelines before seal-in.',
          tag: 'Quality Gate'
        }
      ]
    },
    {
      id: 'branch-enwr',
      title: '5. e-NWR & Bank Pledge Credit',
      telugu: 'డిజిటల్ ఇ-ఎన్‌డబ్ల్యూఆర్ రసీదులు & బ్యాంక్ లోన్లు',
      shortTitle: 'e-NWR Receipts',
      color: '#ef4444',
      bgLight: 'bg-rose-500/10',
      borderColor: 'border-rose-500',
      textAccent: 'text-rose-400',
      badge: 'WDRA Certified Banking',
      icon: FileCheck,
      actionTab: 'documents',
      actionText: 'Download e-NWR Pass',
      summary: 'Official electronic Negotiable Warehouse Receipts (e-NWR) compliant with WDRA standards, enabling farmers to pledge stored produce for bank loans.',
      subNodes: [
        {
          id: 'w-receipt',
          title: 'Electronic Warehouse Receipt (e-NWR)',
          desc: 'Legally recognized electronic receipt under the Warehousing Development & Regulatory Authority (WDRA).',
          tag: 'WDRA Legal'
        },
        {
          id: 'w-docx',
          title: 'Downloadable Word (.docx) Agreement',
          desc: 'Official bailment contract and storage agreement generated instantly with farmer name, crop details, and stamps.',
          tag: 'Word .docx'
        },
        {
          id: 'w-pledge',
          title: '75% Advance Pledge Loans',
          desc: 'Pledge e-NWR with State Bank of India, NABARD, or Andhra Pragathi Grameena Bank for 75% market value liquidity.',
          tag: '75% Loan'
        },
        {
          id: 'w-interest',
          title: '7% Subsidized Agricultural Interest',
          desc: 'Prevents reliance on predatory moneylenders by accessing official subsidized interest rates for crop liquidity.',
          tag: '7% Interest'
        },
        {
          id: 'w-security',
          title: '100% Produce Insurance & Audit',
          desc: 'Chambers insured against fire, spoilage, breakdown, or natural calamities for complete risk-free storage.',
          tag: 'Insured'
        }
      ]
    },
    {
      id: 'branch-mandi',
      title: '6. Off-Season Mandi Release',
      telugu: 'ఆఫ్-సీజన్ మార్కెట్ విడుదల & లాభాలు',
      shortTitle: 'Market Release',
      color: '#eab308',
      bgLight: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500',
      textAccent: 'text-yellow-400',
      badge: '2x to 3x Net Farm Income',
      icon: TrendingUp,
      actionTab: 'units',
      actionText: 'Check Market Gateways',
      summary: 'Strategic market intelligence enabling farmers to release produce during seasonal shortages when wholesale prices double or triple.',
      subNodes: [
        {
          id: 'm-pricing',
          title: 'APMC Wholesale Mandi Price Signals',
          desc: 'Tracks price trends across Hyderabad, Warangal, Khammam, and regional APMC yards to spot peak profit windows.',
          tag: 'Price Signals'
        },
        {
          id: 'm-distress',
          title: 'Zero Harvest Glut Panic Selling',
          desc: 'Stops farmers from being forced to sell tomatoes or onions at ₹3/kg during harvest gluts by preserving them safely.',
          tag: 'Anti-Glut'
        },
        {
          id: 'm-profits',
          title: '2x to 3x Average Net Realization',
          desc: 'Selling stored produce 4 to 8 months later when wholesale rates rebound yields massive net income increases.',
          tag: '2x-3x Profit'
        },
        {
          id: 'm-buyers',
          title: 'Direct FPO & Wholesale Buyer Tie-Up',
          desc: 'Allows food processors, export houses, and supermarket aggregators to purchase directly from the cold storage chamber.',
          tag: 'Direct Buyer'
        },
        {
          id: 'm-settlement',
          title: 'Instant Gate Pass & Balance Settlement',
          desc: 'Clear remaining 75% storage tariff upon dispatch with instant digital gate release token and receipt.',
          tag: 'Gate Release'
        }
      ]
    }
  ]
};

export default function WebsiteMindMap() {
  const { setActiveTab } = useApp();
  const { t } = useLanguage();

  const [expandedBranches, setExpandedBranches] = useState({
    'branch-crops': true,
    'branch-units': true,
    'branch-booking': true,
    'branch-queue': true,
    'branch-enwr': true,
    'branch-mandi': true
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [layoutMode, setLayoutMode] = useState('mindmap'); // 'mindmap' | 'tree'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef(null);

  const toggleBranch = (branchId) => {
    setExpandedBranches((prev) => ({
      ...prev,
      [branchId]: !prev[branchId]
    }));
  };

  const expandAll = () => {
    const all = {};
    MIND_MAP_DATA.branches.forEach((b) => (all[b.id] = true));
    setExpandedBranches(all);
  };

  const collapseAll = () => {
    const none = {};
    MIND_MAP_DATA.branches.forEach((b) => (none[b.id] = false));
    setExpandedBranches(none);
  };

  const matchesSearch = (text, tag = '') => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return text.toLowerCase().includes(q) || tag.toLowerCase().includes(q);
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none bg-slate-950 border-0 flex flex-col p-4 sm:p-6 overflow-y-auto'
          : 'border-emerald-500/50 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 shadow-2xl shadow-emerald-950/40 p-4 sm:p-8'
      }`}
    >
      {/* Mind Map Header & Command Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-lg shadow-lg">
              🧠
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  AgroVault Platform Mind Map
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Interactive System Architecture
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                అగ్రోవాల్ట్ సమగ్ర మైండ్ మ్యాప్: Complete architectural mind map of all 6 interconnected post-harvest platform systems
              </p>
            </div>
          </div>
        </div>

        {/* Mind Map Controls: Search, View Mode & Expand/Collapse */}
        <div className="flex flex-wrap items-center gap-2 self-stretch lg:self-auto justify-start lg:justify-end">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mind map nodes..."
              className="bg-slate-900/90 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-44 sm:w-56"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Expand / Collapse All */}
          <button
            type="button"
            onClick={expandAll}
            className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition border border-white/10"
          >
            Expand All
          </button>

          <button
            type="button"
            onClick={collapseAll}
            className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition border border-white/10"
          >
            Collapse All
          </button>

          {/* Layout Mode Switcher */}
          <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setLayoutMode('mindmap')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                layoutMode === 'mindmap'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Share2 className="w-3 h-3" />
              <span>Mind Map Canvas</span>
            </button>

            <button
              type="button"
              onClick={() => setLayoutMode('tree')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                layoutMode === 'tree'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderTree className="w-3 h-3" />
              <span>Hierarchical Tree</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen Mind Map'}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Central Mind Map Canvas Area */}
      <div className="mt-8 space-y-8">
        {/* Central Root Hub Node */}
        <div className="flex justify-center">
          <div
            onClick={() =>
              setSelectedNode({
                title: MIND_MAP_DATA.title,
                subtitle: MIND_MAP_DATA.telugu,
                desc: MIND_MAP_DATA.tagline,
                stats: MIND_MAP_DATA.stats,
                actionTab: 'booking',
                actionText: 'Get Started with AgroVault'
              })
            }
            className="group cursor-pointer relative bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-400/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center max-w-xl transition-all duration-300 hover:scale-105 hover:border-emerald-300 hover:shadow-emerald-500/20"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-[10px] uppercase px-4 py-1 rounded-full shadow-md tracking-wider">
              CENTRAL PLATFORM CORE
            </div>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/30 mb-3 group-hover:rotate-6 transition-transform">
              🌾
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {MIND_MAP_DATA.title}
            </h2>
            <p className="text-xs text-emerald-300 font-semibold mt-0.5">
              {MIND_MAP_DATA.telugu}
            </p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {MIND_MAP_DATA.tagline}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[10px] font-bold bg-white/10 text-emerald-300 px-3 py-1 rounded-full border border-white/10">
                🌿 77 Crops Database
              </span>
              <span className="text-[10px] font-bold bg-white/10 text-cyan-300 px-3 py-1 rounded-full border border-white/10">
                🏢 135 Storage Facilities
              </span>
              <span className="text-[10px] font-bold bg-white/10 text-amber-300 px-3 py-1 rounded-full border border-white/10">
                📄 WDRA e-NWR Credit
              </span>
              <span className="text-[10px] font-bold bg-white/10 text-rose-300 px-3 py-1 rounded-full border border-white/10">
                🚜 Live Yard Tokens
              </span>
            </div>
          </div>
        </div>

        {/* Radiating Connector Visual Lines (SVG spline curves) */}
        <div className="hidden lg:block relative h-12 -my-2 overflow-visible pointer-events-none">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1200 48" fill="none">
            <path d="M 600 0 C 600 30, 100 20, 100 48" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
            <path d="M 600 0 C 600 30, 300 20, 300 48" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
            <path d="M 600 0 C 600 30, 500 20, 500 48" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
            <path d="M 600 0 C 600 30, 700 20, 700 48" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
            <path d="M 600 0 C 600 30, 900 20, 900 48" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
            <path d="M 600 0 C 600 30, 1100 20, 1100 48" stroke="#eab308" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.7" />
          </svg>
        </div>

        {/* 6 Radiating Primary Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MIND_MAP_DATA.branches.map((branch) => {
            const Icon = branch.icon;
            const isExpanded = expandedBranches[branch.id];
            const hasMatch =
              matchesSearch(branch.title) ||
              branch.subNodes.some((sn) => matchesSearch(sn.title, sn.tag));

            return (
              <div
                key={branch.id}
                className={`rounded-3xl border-2 transition-all duration-300 relative flex flex-col justify-between overflow-hidden ${
                  hasMatch
                    ? 'ring-2 ring-amber-400 shadow-2xl scale-[1.02]'
                    : ''
                } ${branch.bgLight} ${branch.borderColor} bg-slate-950/80 backdrop-blur-md`}
              >
                {/* Branch Top Header */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0"
                        style={{ backgroundColor: branch.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          className="text-[10px] font-black uppercase tracking-wider block"
                          style={{ color: branch.color }}
                        >
                          {branch.badge}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-white leading-tight">
                          {branch.title}
                        </h4>
                      </div>
                    </div>

                    {/* Expand/Collapse Branch Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleBranch(branch.id)}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition shrink-0"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {branch.summary}
                  </p>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab(branch.actionTab)}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold transition hover:translate-x-1"
                      style={{ color: branch.color }}
                    >
                      <span>Open {branch.shortTitle} Section</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sub-Branch Nodes Area (Mind Map Child Nodes) */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/10 space-y-2.5 bg-black/20">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Sub-Nodes ({branch.subNodes.length} Capabilities)
                    </span>

                    <div className="space-y-2">
                      {branch.subNodes.map((sub) => {
                        const subMatch = matchesSearch(sub.title, sub.tag);
                        return (
                          <div
                            key={sub.id}
                            onClick={() =>
                              setSelectedNode({
                                ...sub,
                                parentBranch: branch.title,
                                color: branch.color,
                                actionTab: branch.actionTab,
                                actionText: `Launch ${branch.shortTitle}`
                              })
                            }
                            className={`p-3 rounded-2xl border transition-all cursor-pointer group flex items-start justify-between gap-2.5 ${
                              subMatch
                                ? 'bg-amber-400/20 border-amber-400 text-white'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/25 text-slate-200'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1.5">
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: branch.color }}
                                ></span>
                                <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                                  {sub.title}
                                </h5>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-snug pl-3">
                                {sub.desc}
                              </p>
                            </div>

                            <span
                              className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 bg-white/5"
                              style={{
                                color: branch.color,
                                borderColor: `${branch.color}50`
                              }}
                            >
                              {sub.tag}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal / Inspector Drawer */}
      {selectedNode && (
        <div className="mt-6 bg-slate-900/95 border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                {selectedNode.parentBranch || 'Mind Map Node Inspector'}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white">
              {selectedNode.title}
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {selectedNode.desc || selectedNode.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2.5 self-end md:self-auto shrink-0">
            {selectedNode.actionTab && (
              <button
                type="button"
                onClick={() => setActiveTab(selectedNode.actionTab)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-lg transition flex items-center space-x-1.5"
              >
                <span>{selectedNode.actionText || 'Open in App'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Summary Bar */}
      <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Click any branch or sub-node to inspect its technical parameters and jump directly to that module.</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] font-semibold text-emerald-300">
          <span>🌿 77 Crops</span>
          <span>•</span>
          <span>🏢 135 Units</span>
          <span>•</span>
          <span>🚜 Live Queues</span>
          <span>•</span>
          <span>📄 WDRA e-NWR</span>
        </div>
      </div>
    </div>
  );
}
