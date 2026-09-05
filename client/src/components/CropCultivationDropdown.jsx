import React, { useState } from 'react';
import { getCultivationGuide } from '../data/cultivationGuides';
import {
  Sprout,
  Calendar,
  Clock,
  Droplets,
  Layers,
  FlaskConical,
  ShieldAlert,
  Scissors,
  Snowflake,
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function CropCultivationDropdown({ crop, isExpanded, onToggle }) {
  const guide = getCultivationGuide(crop);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'nutrients' | 'protection' | 'postharvest'

  if (!guide) return null;

  return (
    <div className="border-t border-slate-100 mt-3 pt-3">
      {/* Dropdown Toggle Button */}
      <button
        onClick={onToggle}
        type="button"
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 ${
          isExpanded
            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md'
            : 'bg-emerald-50/90 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/90'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Sprout className={`w-4 h-4 ${isExpanded ? 'text-white' : 'text-emerald-600 animate-pulse'}`} />
          <span className="tracking-wide">
            {isExpanded ? 'Hide Cultivation Guide' : '🌱 View Cultivation & Agronomic Guide'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isExpanded
                ? 'bg-white/20 text-emerald-100 border border-white/20'
                : 'bg-emerald-200/60 text-emerald-900'
            }`}
          >
            PJTSAU Guide
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform duration-300" />
          )}
        </div>
      </button>

      {/* Expandable Dropdown Drawer Content */}
      {isExpanded && (
        <div className="mt-3 bg-slate-50/90 rounded-2xl p-4 border border-emerald-200/80 space-y-4 text-slate-800 animate-fadeIn">
          {/* Sub-tab navigation inside dropdown */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] font-bold scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                activeTab === 'overview'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
              }`}
            >
              📅 Sowing & Soil
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('nutrients')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                activeTab === 'nutrients'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
              }`}
            >
              🧪 NPK & Water
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('protection')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                activeTab === 'protection'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
              }`}
            >
              🛡️ Pest Control
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('postharvest')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                activeTab === 'postharvest'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
              }`}
            >
              ❄️ Harvest & Cold Prep
            </button>
          </div>

          {/* TAB 1: SOWING & SOIL */}
          {activeTab === 'overview' && (
            <div className="space-y-3">
              {/* Season & Duration */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="flex items-center space-x-1.5 text-emerald-800">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sowing Season & Optimal Months</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-mono">
                    {guide.durationDays}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {guide.season}
                </p>
              </div>

              {/* Soil & Land Preparation */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                <span className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  <span>Soil Type & Land Preparation</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {guide.soil}
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-start space-x-1.5">
                  <span className="text-teal-700 font-bold shrink-0">Prep:</span>
                  <span>{guide.nurseryPrep}</span>
                </div>
              </div>

              {/* Seed Rate & Spacing */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Seed Rate / Acre</span>
                  <strong className="text-slate-900 text-xs mt-0.5 block leading-tight font-mono">
                    {guide.seedRate}
                  </strong>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Spacing (Row × Plant)</span>
                  <strong className="text-slate-900 text-xs mt-0.5 block leading-tight font-mono">
                    {guide.spacing}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NUTRIENTS & WATER */}
          {activeTab === 'nutrients' && (
            <div className="space-y-3">
              {/* Irrigation Schedule */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                <span className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Irrigation & Critical Water Stages</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {guide.irrigation}
                </p>
              </div>

              {/* Fertilizer & NPK Dosage */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                <span className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
                  <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                  <span>Fertilizer & Nutrition Schedule (NPK)</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {guide.fertilizer}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: PEST & DISEASE PROTECTION */}
          {activeTab === 'protection' && (
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                <span className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Major Pests, Diseases & Integrated Management</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {guide.pestsAndDiseases}
                </p>
              </div>

              {/* Climate & Weather */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Climate Requirements</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {guide.climate}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: HARVEST & COLD STORAGE PREPARATION */}
          {activeTab === 'postharvest' && (
            <div className="space-y-3">
              {/* Harvesting Indicators */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                <span className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
                  <Scissors className="w-3.5 h-3.5 text-amber-600" />
                  <span>Harvesting Maturity Signs</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {guide.harvesting}
                </p>
              </div>

              {/* Post-Harvest & Pre-cooling before Cold Storage */}
              <div className="bg-emerald-950 text-white p-3 rounded-xl border border-emerald-800 shadow-md space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-xs font-black text-emerald-300">
                    <Snowflake className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cold Storage Preparation & Pre-Cooling</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full font-mono">
                    Mandatory Step
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {guide.postHarvestHandling}
                </p>
              </div>

              {/* Expected Yield */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Expected Average Yield</span>
                  <strong className="text-emerald-800 text-sm font-black font-mono">{guide.yieldPerAcre}</strong>
                </div>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Farmer Pro-Tip Footer Callout */}
          <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/90 rounded-xl p-2.5 flex items-start space-x-2 text-[11px] text-amber-950">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-tight">
              <strong className="text-amber-900 font-bold">University Agronomist Tip: </strong>
              <span>{guide.agronomicTip}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
