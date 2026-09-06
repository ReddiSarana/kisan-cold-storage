import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  ShieldCheck,
  CalendarCheck,
  FileCheck,
  Sparkles,
  ArrowRight,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function FAQPage() {
  const { setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const faqs = [
    {
      category: 'General',
      q: 'What is Krishivalaya and how does it benefit farmers?',
      a: 'Krishivalaya is India’s first digital agricultural cold chain & WDRA warehouse platform. It connects smallholder and commercial farmers directly to multi-chamber cold storage facilities, transparent subsidized electricity tariffs, live automated gate queue tokens, and bank-pledgeable digital warehouse receipts (e-NWR) to stop distress sales during harvest glut periods.'
    },
    {
      category: 'General',
      q: 'Is Krishivalaya free to use for farmers?',
      a: 'Yes, platform registration, slot checking, distance calculations, and SMS queue tokens are completely free for all Indian farmers. Storing produce only incurs standard government-regulated warehouse tariffs per quintal/month, with zero hidden middleman commissions.'
    },
    {
      category: 'Land Verification',
      q: 'Why do I need to submit land documents to verify my account?',
      a: 'Under Ministry of Agriculture and Warehousing Development and Regulatory Authority (WDRA) guidelines, cold storage subsidies, priority bays, and e-NWR pledge loans are legally reserved for genuine agricultural cultivators. Verifying your Dharani / Pattadar Passbook ensures speculators and hoarders cannot capture reserved farmer space.'
    },
    {
      category: 'Land Verification',
      q: 'What if I am a tenant cultivator without a Pattadar Passbook in my name?',
      a: 'Tenant farmers and sharecroppers can register using a Crop Cultivator Rights Card (CCRC), registered lease deed, or Rythu Bandhu / PM-Kisan cultivator registration number. Our verification system supports tenant ownership classification.'
    },
    {
      category: 'Land Verification',
      q: 'How long does land verification take?',
      a: 'Land record verification with state land registries (such as Telangana Dharani, Meebhoomi, or Bhulekh) takes under 15 seconds through our automated integration. You receive instant clearance to enter the platform.'
    },
    {
      category: 'Cold Storage & Tariffs',
      q: 'How are cold storage rental charges calculated?',
      a: 'Tariffs are charged per quintal per month (typically ₹25 to ₹65/quintal/month depending on crop and chamber temperature). Subsidized agricultural electricity rates apply, ensuring rates are 30–40% lower than open commercial warehouses.'
    },
    {
      category: 'Cold Storage & Tariffs',
      q: 'How do you prevent spoilage of mixed crops?',
      a: 'Krishivalaya facilities use multi-chamber segregated cooling. Produce like Apples and Tomatoes (which emit ethylene gas) are stored in separate dedicated negative-pressure chambers away from ethylene-sensitive crops like Potatoes, Chillies, and Onions.'
    },
    {
      category: 'Cold Storage & Tariffs',
      q: 'Can I withdraw my produce early or store for longer periods?',
      a: 'Yes. You can withdraw your produce in partial batches at any time by presenting your electronic gate token. You only pay for the exact days and quintals stored.'
    },
    {
      category: 'SMS Tokens & Gate',
      q: 'Do I need a smartphone or internet at the warehouse gate?',
      a: 'No! Krishivalaya is built specifically for rural connectivity. All gate entry tokens, weighbridge readings, and bay call-up alerts are dispatched via standard SMS to any basic 2G feature phone. Simply show your SMS text at the gate.'
    },
    {
      category: 'SMS Tokens & Gate',
      q: 'How does the SMS Queue call-up system work?',
      a: 'When you book a chamber slot, you get a digital token (e.g. TK-101). During peak harvest, you do not need to wait in 3-kilometer road jams. You remain at your field or home until you receive an SMS alert instructing your tractor to proceed directly to an assigned unloading bay.'
    },
    {
      category: 'Bank Loans & e-NWR',
      q: 'How do I get a 75% bank loan against stored produce?',
      a: 'Once your produce is weighed and stored in a WDRA-registered facility, Krishivalaya generates an official electronic Negotiable Warehouse Receipt (e-NWR) in Word (.docx) format. You can submit this receipt to State Bank of India, NABARD, Union Bank, or rural cooperative banks to obtain an immediate 75% advance cash loan at subsidized agricultural interest rates.'
    },
    {
      category: 'Bank Loans & e-NWR',
      q: 'How do I repay the loan when I sell my crop?',
      a: 'When market mandi prices peak in off-season months, you sell the crop directly through the mandi or to buyers. The buyer pays the bank directly to release the pledge, the bank deducts the loan principal and interest, and the remaining net profit is transferred straight to your bank savings account.'
    }
  ];

  const categories = ['All', 'General', 'Land Verification', 'Cold Storage & Tariffs', 'SMS Tokens & Gate', 'Bank Loans & e-NWR'];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 border border-teal-400/30 px-3.5 py-1.5 rounded-full text-teal-300 text-xs font-bold backdrop-blur-md shadow-xs">
            <HelpCircle className="w-4 h-4 text-teal-300" />
            <span>Frequently Asked Questions • Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Got Questions? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300">
              Clear Answers for Every Farmer & Facility
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
            Everything you need to know about Krishivalaya cold preservation, Dharani land ownership verification, subsidized tariffs, SMS gate call-ups, and WDRA bank pledge loans.
          </p>

          {/* Search Box inside Banner */}
          <div className="relative max-w-xl pt-2">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., Dharani, bank loan, tariffs, SMS token, tenant)..."
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-slate-100 focus:text-slate-900 placeholder:text-slate-400 pl-10 pr-4 py-3 rounded-2xl border border-white/20 focus:border-emerald-400 text-xs sm:text-sm outline-hidden transition shadow-md backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all hover:border-emerald-400"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md inline-block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-black text-xs sm:text-sm text-slate-900 leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500 text-xs">
            <p className="font-bold text-sm text-slate-800">No matching questions found for "{searchQuery}"</p>
            <p className="mt-1">Try searching with a different keyword or view all categories.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs font-bold text-emerald-700 underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-800/60">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black tracking-tight">Still Need Help with Your Farm Produce?</h4>
            <p className="text-xs text-emerald-200/90 mt-0.5 leading-relaxed">
              Call the Government Kisan Call Centre toll-free 24/7 or speak with our local mandi coordinator.
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
