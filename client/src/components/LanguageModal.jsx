import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  Globe,
  Search,
  X,
  Check,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function LanguageModal() {
  const {
    languages,
    currentLanguage,
    selectedLanguageCode,
    changeLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    t
  } = useLanguage();

  const { showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');

  // Filter languages based on search query and region tags
  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lang.name.toLowerCase().includes(q) ||
        lang.native.toLowerCase().includes(q) ||
        lang.region.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (regionFilter === 'ALL') return true;
      if (regionFilter === 'SOUTH') {
        return ['te', 'ta', 'kn', 'ml'].includes(lang.code);
      }
      if (regionFilter === 'NORTH_CENTRAL') {
        return ['hi', 'pa', 'doi', 'ks', 'sa', 'ur'].includes(lang.code);
      }
      if (regionFilter === 'EAST_NE') {
        return ['bn', 'or', 'as', 'brx', 'mni', 'sat', 'mai', 'ne'].includes(lang.code);
      }
      if (regionFilter === 'WEST') {
        return ['mr', 'gu', 'kok', 'sd'].includes(lang.code);
      }
      return true;
    });
  }, [languages, searchQuery, regionFilter]);

  if (!isLanguageModalOpen) return null;

  const handleSelectLanguage = (code, name, native) => {
    changeLanguage(code);
    setIsLanguageModalOpen(false);
    if (showToast) {
      showToast(`🌐 Language changed to ${native} (${name})`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-emerald-300">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                {t('selectLanguage', 'Select Language')}
                <span className="text-xs font-semibold bg-emerald-700/80 text-emerald-200 px-2 py-0.5 rounded-full">
                  22 Official + English
                </span>
              </h2>
              <p className="text-xs text-emerald-200/90 font-medium">
                {t('officialLanguages', 'All 22 Official Scheduled Languages of India')} (8th Schedule)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Quick Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchLanguage', 'Search language by name, script or region (e.g., Telugu, தமிழ், Hindi, Assam)...')}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-sm"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Regional Quick Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setRegionFilter('ALL')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                regionFilter === 'ALL'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              All (23)
            </button>
            <button
              onClick={() => setRegionFilter('SOUTH')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                regionFilter === 'SOUTH'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              South India (తెలుగు, தமிழ், ಕನ್ನಡ, മലയാളം)
            </button>
            <button
              onClick={() => setRegionFilter('NORTH_CENTRAL')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                regionFilter === 'NORTH_CENTRAL'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              North & Central (हिन्दी, ਪੰਜਾਬੀ, ڈوگری, कॉशुर)
            </button>
            <button
              onClick={() => setRegionFilter('EAST_NE')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                regionFilter === 'EAST_NE'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              East & Northeast (বাংলা, ଓଡ଼ିଆ, অসমীয়া, ᱥᱟᱱᱛᱟᱲᱤ)
            </button>
            <button
              onClick={() => setRegionFilter('WEST')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                regionFilter === 'WEST'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              West (मराठी, ગુજરાતી, कोंकणी, سنڌي)
            </button>
          </div>
        </div>

        {/* Languages Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-slate-100/50">
          {filteredLanguages.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-semibold">No matching language found</p>
              <p className="text-xs text-slate-400 mt-1">Try typing the English name or native script</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === selectedLanguageCode;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code, lang.name, lang.native)}
                    className={`relative text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md hover:bg-emerald-50/40'
                    }`}
                  >
                    <div>
                      {/* Native Script Display */}
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xl font-bold tracking-tight ${
                          isSelected ? 'text-emerald-900' : 'text-slate-900 group-hover:text-emerald-700'
                        }`}>
                          {lang.native}
                        </span>
                        {isSelected && (
                          <span className="flex items-center text-[11px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                            <Check className="w-3 h-3 mr-0.5 stroke-[3]" />
                            {t('active', 'Active')}
                          </span>
                        )}
                      </div>

                      {/* English Name & Code */}
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700">
                        <span>{lang.name}</span>
                        <span className="text-slate-400 text-[10px] font-mono uppercase">({lang.code})</span>
                      </div>
                    </div>

                    {/* Region / Usage Area */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                      <span className="truncate">{lang.region}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Instant UI translations in all official languages + automatic Google neural machine translation for descriptions.
            </span>
          </div>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
