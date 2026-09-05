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
  Sparkles,
  CalendarCheck,
  Search
} from 'lucide-react';

export default function StorageUnitsPage() {
  const { selectedCropFilter, setSelectedCropFilter, navigateToSlotBooking, openBookingFor } = useApp();
  const { t } = useLanguage();
  const [facilities, setFacilities] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
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
    const matchesSearch = !searchQuery ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.pincode && f.pincode.includes(searchQuery));
    const matchesCrop = !selectedCropFilter || f.supportedCrops.includes(selectedCropFilter);
    const matchesDistrict = selectedDistrict === 'All' || f.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesPrice = f.baseRatePerQuintalMonth <= maxPrice;
    return matchesSearch && matchesCrop && matchesDistrict && matchesPrice;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-800/70 border border-emerald-600/40 px-3.5 py-1 rounded-full shadow-xs">
            {t('storageRegistry', "Telangana Cold Chain & Storage Registry")}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t('storageTitle', "Telangana Cold Storage Facilities")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
            {t('storageDesc', "Discover real-time chamber capacities, WDRA certifications, and tariffs across Warangal, Nizamabad, Karimnagar, Khammam, Nalgonda, and Tandur.")}
          </p>
        </div>

        {selectedCropFilter && (
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center space-x-3 shadow-lg card-hover-lift">
            <div>
              <p className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wide">Filtered for Crop</p>
              <p className="text-base font-black capitalize text-white">{selectedCropFilter.replace('_', ' ')}</p>
            </div>
            <button
              onClick={() => setSelectedCropFilter('')}
              className="text-xs bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1.5 rounded-xl transition"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Farmer Booking 3-Step Guide Banner */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-green-50/80 border-2 border-emerald-300/80 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-emerald-200/80">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md">
              💡
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
                Farmer Guide: How to Reserve Cold Storage in 3 Simple Steps
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Simple 3-Step Farmer Booking Guide — Reserve cold storage space easily in minutes
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white px-4 py-2 rounded-full text-xs font-black flex items-center space-x-2 shadow-sm self-start sm:self-auto border border-emerald-600">
            <span>📞 Kisan Helpline:</span>
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
                🌾 Step 1: Pick Your Harvested Crop
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Choose your harvest (Chilli, Turmeric, Tomato, Onion, etc.) using the crop filter below to see units with the ideal temperature room.
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-teal-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              2
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                📍 Step 2: Choose Closest District / Facility
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Filter by your district (Warangal, Nizamabad, Khammam, etc.) to locate facilities closest to your farm and reduce tractor transport expense.
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-green-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-black flex items-center justify-center text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                📅 Step 3: Open Slot Booking Window
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Click <strong>"Book in Slot Booking Window"</strong> on your chosen facility to open the separate dedicated window where you pick your arrival date, time slot, and get your SMS token!
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
            <span>Search & Filter 135 Cold Storage Facilities</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong>{filteredFacilities.length}</strong> of <strong>{facilities.length}</strong> {t('activeFacilities', "active facilities")}
          </span>
        </div>

        {/* Search Bar for 135 Facilities */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search 135 cold storages by facility name, village, mandal, or road (e.g. Choppadandi, Enumamula, Sarangpur, Jadcherla, Gubba, Medchal)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none transition"
          />
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
                className="bg-white/95 backdrop-blur rounded-3xl border border-slate-200/90 shadow-sm card-hover-lift hover:border-emerald-400/80 transition overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Image & Badges */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden group">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none"></div>

                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-slate-950 inline mr-0.5" />
                        <span>WDRA Certified</span>
                      </span>
                      <span className="bg-slate-950/80 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">
                        {fac.chambersCount} Chambers
                      </span>
                    </div>

                    <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-md flex items-center space-x-1 text-xs font-black text-slate-900">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{fac.rating}</span>
                      <span className="text-slate-400 text-[10px] font-normal">({fac.reviewsCount})</span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 bg-slate-900/85 backdrop-blur text-white px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-semibold">{fac.location}, {fac.district}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 leading-snug tracking-tight">{fac.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Manager: {fac.managerName} • {fac.contactPhone}</p>
                    </div>

                    {/* Real-time Capacity Progress Bar */}
                    <div className="space-y-2 bg-slate-50/90 p-4 rounded-2xl border border-slate-100 shadow-2xs">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700">Live Cold Room Capacity:</span>
                        <span className="text-emerald-700 font-extrabold font-mono">
                          {fac.availableCapacityMT} MT Available / {fac.totalCapacityMT} MT Total
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            occupancyPct > 85 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          }`}
                          style={{ width: `${occupancyPct}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                        <span className={occupancyPct > 85 ? 'text-amber-700' : 'text-emerald-700'}>{occupancyPct}% Booked</span>
                        <span>{fac.unloadingBays} Active Unloading Bays</span>
                      </div>
                    </div>

                    {/* Supported Crops */}
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                        Calibrated produce chambers:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {fac.supportedCrops.map((c) => (
                          <span
                            key={c}
                            className={`text-xs font-bold px-3 py-1 rounded-xl capitalize border transition ${
                              selectedCropFilter === c
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-2xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {c.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      {fac.features.slice(0, 4).map((feat, i) => (
                        <div key={i} className="flex items-center space-x-2 truncate">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Tariff & Booking Action */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Storage Tariff</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-black font-mono text-slate-900">₹{fac.baseRatePerQuintalMonth}</span>
                      <span className="text-xs text-slate-500 font-medium">/ Qtl / Month</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateToSlotBooking(fac, selectedCropFilter)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs py-3.5 px-5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                  >
                    <CalendarCheck className="w-4 h-4 text-slate-950" />
                    <span>Book in Slot Booking Window</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
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
