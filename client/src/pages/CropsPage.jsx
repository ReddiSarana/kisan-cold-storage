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
  MapPin
} from 'lucide-react';

export default function CropsPage() {
  const { setActiveTab, setSelectedCropFilter } = useApp();
  const { t } = useLanguage();
  const [crops, setCrops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-700/50 px-3 py-1 rounded-full">
            Telangana Agronomic Standards • Complete 77 Commodities Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t('crops', 'Telangana Crops, Produce & Seeds Catalog')} ({filteredCrops.length} of 77)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('exploreGuidelines', 'Comprehensive cold preservation benchmarks calibrated specifically for all 77 crops, vegetables, fruits, pulses, oilseeds, spices, and certified seeds grown across Telangana — from Warangal Teja chillies and Nizamabad turmeric to Seed Bowl hybrid paddy and Tandur GI red gram.')}
          </p>
        </div>
      </div>

      {/* Farmer Crop Catalog Guide */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl shadow-md">
              🌾
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                రైతులకు పంట గైడ్‌లైన్స్: నిల్వ ఉష్ణోగ్రత & బుకింగ్
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Farmer Guide: Ideal Storage Temperatures, Shelf-Life & 1-Click Booking
              </p>
            </div>
          </div>
          <div className="bg-emerald-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-sm self-start sm:self-auto">
            <span>📞 Kisan Call Centre:</span>
            <a href="tel:18001801551" className="underline font-mono">1800-180-1551</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                🔍 మీ పంటను సెర్చ్ చేయండి
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                కింది సెర్చ్ బార్‌లో మీ పంట పేరు (మిర్చి, పసుపు, టమాటా మొదలైనవి) టైప్ చేసి సరైన తేమ & ఉష్ణోగ్రత వివరాలు తెలుసుకోండి.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-teal-200 shadow-sm flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                ❄️ నిల్వ సమయం & జాగ్రత్తలు
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ప్రతి పంట కార్డులో ఉష్ణోగ్రత (°C), తేమ (Humidity %), గరిష్ట నిల్వ కాలం మరియు ప్యాకేజింగ్ సలహాలు స్పష్టంగా చూడవచ్చు.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-green-200 shadow-sm flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-black flex items-center justify-center text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                🏬 "Book Units" క్లిక్ చేయండి
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                మీ పంట కార్డుపై ఉన్న <strong>"Book Units for this Crop"</strong> బటన్ నొక్కగానే ఆ పంటకు అనువైన కోల్డ్ స్టోరేజ్ జాబితా కనిపిస్తుంది.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative w-full lg:w-80 flex-shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={t('searchCrop', 'Search 77 crops (e.g. Mirchi, Turmeric, Mango)...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Cards Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading crops intelligence catalog...</div>
      ) : filteredCrops.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold">No crops found matching your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/80 transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Crop Image & Header */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/80 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {crop.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                      ~₹{crop.avgTariffPerQuintalMonth} / Qtl / Mo
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-tight">{crop.name}</h3>
                    <p className="text-[11px] text-emerald-800 font-semibold mt-1 flex items-center flex-wrap">
                      <MapPin className="w-3 h-3 mr-1 text-emerald-600 flex-shrink-0" />
                      <span>Telangana Hubs: <span className="font-normal text-slate-600">{crop.growingDistricts || 'Telangana Districts'}</span></span>
                    </p>
                  </div>

                  {/* Primary Metrics 2x2 */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start space-x-2">
                      <Thermometer className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">{t('optimumTemp', 'Optimum Temp')}</span>
                        <strong className="text-slate-800 text-xs">{crop.optimumTemp}</strong>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start space-x-2">
                      <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">{t('humidity', 'Humidity (RH)')}</span>
                        <strong className="text-slate-800 text-xs">{crop.humidity}</strong>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">{t('shelfLife', 'Cold Shelf Life')}</span>
                        <strong className="text-slate-800 text-xs">{crop.shelfLifeCold}</strong>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start space-x-2">
                      <Package className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">{t('packaging', 'Packaging')}</span>
                        <strong className="text-slate-800 text-xs truncate block max-w-[100px]">{crop.packaging}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Technical Tip */}
                  <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-2.5 flex items-start space-x-2 text-[11px] text-amber-900">
                    <Info className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>{crop.storageTips}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleBookCrop(crop.id)}
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition"
                >
                  <Warehouse className="w-4 h-4" />
                  <span>{t('findForCrop', 'Find & Book Cold Units for')} {crop.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
