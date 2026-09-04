import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchFacilities, fetchCrops } from '../services/api';
import {
  Warehouse,
  MapPin,
  Thermometer,
  ShieldCheck,
  Star,
  CheckCircle,
  Clock,
  Filter,
  ArrowRight,
  Phone,
  Layers,
  Sparkles
} from 'lucide-react';

export default function StorageUnitsPage() {
  const { selectedCropFilter, setSelectedCropFilter, openBookingFor } = useApp();
  const { t } = useLanguage();
  const [facilities, setFacilities] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [facList, cropList] = await Promise.all([
          fetchFacilities(),
          fetchCrops()
        ]);
        setFacilities(facList);
        setCrops(cropList);
      } catch (e) {
        console.error('Error fetching units:', e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const districts = ['All', ...Array.from(new Set(facilities.map(f => f.district)))];

  const filteredFacilities = facilities.filter((f) => {
    const matchesCrop = !selectedCropFilter || f.supportedCrops.includes(selectedCropFilter);
    const matchesDistrict = selectedDistrict === 'All' || f.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesPrice = f.baseRatePerQuintalMonth <= maxPrice;
    return matchesCrop && matchesDistrict && matchesPrice;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/60 px-3 py-1 rounded-full">
            {t('storageRegistry', "Telangana Cold Chain & Storage Registry")}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t('storageTitle', "Telangana Cold Storage Facilities")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('storageDesc', "Discover real-time chamber capacities, WDRA certifications, and tariffs across Warangal, Nizamabad, Karimnagar, Khammam, Nalgonda, and Tandur.")}
          </p>
        </div>

        {selectedCropFilter && (
          <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl flex items-center space-x-3">
            <div>
              <p className="text-[11px] text-emerald-300 font-bold uppercase">Filtered for Crop</p>
              <p className="text-base font-black capitalize text-white">{selectedCropFilter.replace('_', ' ')}</p>
            </div>
            <button
              onClick={() => setSelectedCropFilter('')}
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg transition"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Farmer Booking 3-Step Guide Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
              💡
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                రైతులకు సులువైన మార్గదర్శి: కోల్డ్ స్టోరేజ్ బుకింగ్ 3 దశల్లో
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Simple 3-Step Farmer Booking Guide — Reserve cold storage space easily in minutes
              </p>
            </div>
          </div>
          <div className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-sm self-start sm:self-auto">
            <span>📞 Kisan Helpline:</span>
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
                🌾 1. మీ పంటను ఎంచుకోండి (Pick Crop)
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Choose your harvest (Chilli, Turmeric, Tomato, Onion, etc.) using the crop filter below to see units with the ideal temperature room.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-teal-200 shadow-sm flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                📍 2. దగ్గరలోని జిల్లాను చూడండి (Pick District)
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Filter by your district (Warangal, Nizamabad, Khammam, etc.) to locate facilities closest to your farm and reduce tractor transport expense.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-green-200 shadow-sm flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-black flex items-center justify-center text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                📱 3. "Book Space" బటన్ నొక్కండి (Book Space)
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Click the green <strong>"Book Space"</strong> button on your chosen facility card. Enter your bag count and get your instant SMS confirmation!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Crop & Location Filters</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong>{filteredFacilities.length}</strong> {t('activeFacilities', "active facilities")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Filter by Crop */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">{t('selectCropFilter', "Select Crop Produced")}</label>
            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
            >
              <option value="">All Supported Crops</option>
              {crops.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Filter by District */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">{t('selectDistrictFilter', "Select District / Region")}</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d === 'All' ? t('allDistricts', 'All Districts') : `${d} District`}</option>
              ))}
            </select>
          </div>

          {/* Max Rate Slider */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
              <span>{t('maxTariff', "Max Storage Tariff:")}</span>
              <strong className="text-emerald-700">₹{maxPrice} / Qtl / Month</strong>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Facility Cards Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading cold storage facilities...</div>
      ) : filteredFacilities.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Warehouse className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No cold storage units match your criteria</h3>
          <p className="text-xs text-slate-500">Try broadening your crop or district filters.</p>
          <button
            onClick={() => {
              setSelectedCropFilter('');
              setSelectedDistrict('All');
              setMaxPrice(100);
            }}
            className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFacilities.map((fac) => {
            const occupancyPct = Math.round(((fac.totalCapacityMT - fac.availableCapacityMT) / fac.totalCapacityMT) * 100);
            return (
              <div
                key={fac.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Image & Badges */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-emerald-700/90 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                        WDRA Certified
                      </span>
                      <span className="bg-slate-900/80 backdrop-blur text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                        {fac.chambersCount} Chambers
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow flex items-center space-x-1 text-xs font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{fac.rating}</span>
                      <span className="text-slate-400 text-[10px]">({fac.reviewsCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur text-white px-3 py-1 rounded-lg text-xs flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{fac.location}, {fac.district}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 leading-snug">{fac.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">Manager: {fac.managerName} • {fac.contactPhone}</p>
                    </div>

                    {/* Real-time Capacity Progress Bar */}
                    <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700">Live Cold Room Capacity:</span>
                        <span className="text-emerald-700 font-bold">
                          {fac.availableCapacityMT} MT Available / {fac.totalCapacityMT} MT Total
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            occupancyPct > 85 ? 'bg-amber-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${occupancyPct}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{occupancyPct}% Booked</span>
                        <span>{fac.unloadingBays} Active Unloading Bays</span>
                      </div>
                    </div>

                    {/* Supported Crops */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Calibrated produce chambers:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {fac.supportedCrops.map((c) => (
                          <span
                            key={c}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize border ${
                              selectedCropFilter === c
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {c.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                      {fac.features.slice(0, 4).map((feat, i) => (
                        <div key={i} className="flex items-center space-x-1.5 truncate">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Tariff & Booking Action */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Storage Tariff</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xl font-black text-slate-900">₹{fac.baseRatePerQuintalMonth}</span>
                      <span className="text-[11px] text-slate-500 font-medium">/ Qtl / Month</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingFor(fac, selectedCropFilter)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-md transition hover:scale-105"
                  >
                    <Warehouse className="w-4 h-4" />
                    <span>Book Chamber Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
