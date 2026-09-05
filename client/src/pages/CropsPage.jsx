import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchCrops } from '../services/api';
import {
  Thermometer,
  Droplets,
  Clock,
  Package,
  Search,
  ArrowRight,
  Info,
  Warehouse,
  MapPin,
  Sprout
} from 'lucide-react';
import CropCultivationDropdown from '../components/CropCultivationDropdown';

export default function CropsPage() {
  const { setActiveTab, setSelectedCropFilter } = useApp();
  const { t } = useLanguage();
  const [crops, setCrops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCropId, setExpandedCropId] = useState(null);

  const toggleCropGuide = (cropId) => {
    setExpandedCropId(prev => prev === cropId ? null : cropId);
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCrops();
        setCrops(data);
      } catch (e) {
        console.error('Error fetching crops:', e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleBookCrop = (cropId) => {
    setSelectedCropFilter(cropId);
    setActiveTab('units');
  };

  const categories = [
    'All',
    'Cereals & Millets',
    'Pulses & Legumes',
    'Oilseeds',
    'Commercial & Fiber',
    'Commercial & Spices',
    'Vegetables',
    'Fruits',
    'Certified Seeds',
    'Plantation & Flowers'
  ];

  const filteredCrops = crops.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.growingDistricts && c.growingDistricts.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-900/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-800/70 border border-emerald-600/40 px-3.5 py-1 rounded-full shadow-xs">
            Telangana Agronomic Standards • Complete 77 Commodities Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t('crops', 'Telangana Crops, Produce & Seeds Catalog')} ({filteredCrops.length} of 77)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {t('exploreGuidelines', 'Comprehensive cold preservation benchmarks calibrated specifically for all 77 crops, vegetables, fruits, pulses, oilseeds, spices, and certified seeds grown across Telangana — from Warangal Teja chillies and Nizamabad turmeric to Seed Bowl hybrid paddy and Tandur GI red gram.')}
          </p>
        </div>
      </div>

      {/* Farmer Crop Catalog Guide */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-green-50/80 border-2 border-emerald-300/80 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-emerald-200/80">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md">
              🌾
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
                Farmer Guide: Temperature Benchmarks & 1-Click Booking
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Ideal Storage Temperatures, Humidity Benchmarks & 1-Click Reservation
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white px-4 py-2 rounded-full text-xs font-black flex items-center space-x-2 shadow-sm self-start sm:self-auto border border-emerald-600">
            <span>📞 Kisan Call Centre:</span>
            <a href="tel:18001801551" className="underline font-mono tracking-wide">1800-180-1551</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-emerald-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              1
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                🔍 Step 1: Search Your Commodity
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Type your harvested crop name (Chilli, Turmeric, Tomato, Onion, etc.) in the search bar below to view moisture and temperature tolerances.
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-teal-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              2
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                ❄️ Step 2: Check Temperature & Shelf Life
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Each crop card specifies optimal chamber temperature (°C), relative humidity (RH %), ambient vs cold shelf-life, and packaging advice.
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-green-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-green-100 text-green-800 font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              3
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                🏬 Step 3: Click "Book Storage"
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Click the button on any crop card to filter and open facilities designed specifically for that commodity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/90 backdrop-blur rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={t('searchCrop', 'Search 77 crops (e.g. Mirchi, Turmeric, Mango)...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                  : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Cards Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400 font-medium">Loading crops intelligence catalog...</div>
      ) : filteredCrops.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <p className="text-sm font-bold text-slate-800">No crops found matching your filter.</p>
          <p className="text-xs text-slate-400">Try searching for other commodities or selecting "All" category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white/95 backdrop-blur rounded-3xl border border-slate-200/90 shadow-sm card-hover-lift hover:border-emerald-400/80 transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Crop Image & Header */}
                <div className="relative h-48 overflow-hidden bg-slate-100 group">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>

                  <div className="absolute top-3.5 left-3.5">
                    <span className="bg-slate-950/80 backdrop-blur text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/10 uppercase tracking-wide">
                      {crop.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 right-3.5">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-md font-mono">
                      ~₹{crop.avgTariffPerQuintalMonth} / Qtl / Mo
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight tracking-tight">{crop.name}</h3>
                    <p className="text-[11px] text-emerald-800 font-bold mt-1 flex items-center flex-wrap">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600 flex-shrink-0" />
                      <span>Telangana Hubs: <span className="font-normal text-slate-600">{crop.growingDistricts || 'Telangana Districts'}</span></span>
                    </p>
                  </div>

                  {/* Primary Metrics 2x2 */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex items-start space-x-2.5">
                      <Thermometer className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">{t('optimumTemp', 'Optimum Temp')}</span>
                        <strong className="text-slate-800 text-xs font-mono font-bold">{crop.optimumTemp}</strong>
                      </div>
                    </div>

                    <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex items-start space-x-2.5">
                      <Droplets className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">{t('humidity', 'Humidity (RH)')}</span>
                        <strong className="text-slate-800 text-xs font-mono font-bold">{crop.humidity}</strong>
                      </div>
                    </div>

                    <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex items-start space-x-2.5">
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">{t('shelfLife', 'Cold Shelf Life')}</span>
                        <strong className="text-slate-800 text-xs font-bold">{crop.shelfLifeCold}</strong>
                      </div>
                    </div>

                    <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex items-start space-x-2.5">
                      <Package className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">{t('packaging', 'Packaging')}</span>
                        <strong className="text-slate-800 text-xs truncate block max-w-[110px] font-bold">{crop.packaging}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Technical Tip */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 flex items-start space-x-2 text-[11px] text-amber-950">
                    <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{crop.storageTips}</span>
                  </div>

                  {/* Cultivation & Agronomic Guide Dropdown */}
                  <CropCultivationDropdown
                    crop={crop}
                    isExpanded={expandedCropId === crop.id}
                    onToggle={() => toggleCropGuide(crop.id)}
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleBookCrop(crop.id)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs py-3.5 px-4 rounded-2xl shadow-md shadow-emerald-500/15 transition-all hover:scale-102"
                >
                  <Warehouse className="w-4 h-4 text-slate-950" />
                  <span>{t('findForCrop', 'Find & Book Cold Units for')} {crop.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
