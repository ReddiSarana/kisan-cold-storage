import React, { useState, useMemo } from 'react';
import {
  Warehouse,
  MapPin,
  Clock,
  Truck,
  CheckCircle,
  Thermometer,
  ShieldCheck,
  Phone,
  Search,
  ArrowRight,
  X,
  Filter,
  Layers,
  Sparkles,
  Navigation,
  DollarSign
} from 'lucide-react';
import { getCropFacilitiesWithDistance } from '../utils/distanceCalculator';

export default function CropStorageUnitsModal({
  isOpen,
  onClose,
  cropId,
  crops = [],
  facilities = [],
  originDistrict = 'Warangal',
  originMandal = 'Narsampet',
  originVillage = 'Maheshwaram',
  selectedFacilityId = '',
  onSelectFacility
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'nearest' | 'same_district' | 'high_capacity'
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'capacity' | 'tariff'

  // Look up selected crop details
  const currentCrop = useMemo(() => {
    return crops.find(c => c.id === cropId) || {
      id: cropId,
      name: cropId ? cropId.replace(/_/g, ' ').toUpperCase() : 'Selected Crop',
      category: 'Agricultural Commodity',
      optimumTemp: '2°C - 8°C',
      humidity: '85% - 90%'
    };
  }, [cropId, crops]);

  // Enriched matching facilities with distance & transit time
  const matchedFacilities = useMemo(() => {
    if (!isOpen) return [];
    return getCropFacilitiesWithDistance({
      facilities,
      cropId,
      originDistrict,
      cropName: currentCrop.name
    });
  }, [isOpen, facilities, cropId, originDistrict, currentCrop.name]);

  // Filtered & sorted facilities
  const displayedFacilities = useMemo(() => {
    let result = [...matchedFacilities];

    // Filter mode
    if (filterMode === 'nearest') {
      result = result.filter(f => f.distanceKm <= 40);
    } else if (filterMode === 'same_district') {
      result = result.filter(f => f.isSameDistrict);
    } else if (filterMode === 'high_capacity') {
      result = result.filter(f => (f.availableCapacityMT || 0) >= 1000);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(f =>
        (f.name && f.name.toLowerCase().includes(q)) ||
        (f.district && f.district.toLowerCase().includes(q)) ||
        (f.location && f.location.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (sortBy === 'distance') {
      result.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (sortBy === 'capacity') {
      result.sort((a, b) => (b.availableCapacityMT || 0) - (a.availableCapacityMT || 0));
    } else if (sortBy === 'tariff') {
      result.sort((a, b) => {
        const rateA = a.baseRatePerQuintalMonth || a.monthlyRentPerQuintal || 40;
        const rateB = b.baseRatePerQuintalMonth || b.monthlyRentPerQuintal || 40;
        return rateA - rateB;
      });
    }

    return result;
  }, [matchedFacilities, filterMode, searchQuery, sortBy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-500/30 flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 text-white p-5 sm:p-7 relative shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Cold Storage Discovery • పంట నిల్వ కేంద్రాలు</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex flex-wrap items-center gap-2">
                <span>Storage Units Providing Space For</span>
                <span className="text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-xl border border-emerald-500/40">
                  {currentCrop.name}
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Found <strong>{matchedFacilities.length}</strong> calibrated cold chain facilities with real-time road distance and travel times from your farm.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition hover:scale-105 shrink-0 border border-white/20"
              title="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Farmer Farm Origin & Crop Preservation Specs Banner */}
          <div className="mt-4 pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 block uppercase font-bold tracking-wider">
                  Your Farm Sourcing Place
                </span>
                <strong className="text-white text-xs block truncate">
                  {originVillage}, {originMandal} ({originDistrict} Dist)
                </strong>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-amber-300 shrink-0" />
                <div>
                  <span className="text-[10px] text-amber-300 block uppercase font-bold">Optimal Storage Temp</span>
                  <span className="text-white font-mono font-bold text-xs">{currentCrop.optimumTemp || '0°C - 4°C'}</span>
                </div>
              </div>
              <div className="border-l border-white/20 pl-3">
                <span className="text-[10px] text-cyan-300 block uppercase font-bold">Relative Humidity</span>
                <span className="text-white font-mono font-bold text-xs">{currentCrop.humidity || '85% - 90%'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200 shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search facility name or location..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none shadow-xs"
              />
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto text-xs">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                  filterMode === 'all'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Matching ({matchedFacilities.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('nearest')}
                className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                  filterMode === 'nearest'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Nearby (&lt;40 km)
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('same_district')}
                className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                  filterMode === 'same_district'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                In {originDistrict}
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2 text-xs self-end sm:self-auto shrink-0">
              <span className="text-slate-500 font-bold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="distance">📍 Nearest Distance</option>
                <option value="capacity">📦 Highest Available Space</option>
                <option value="tariff">💰 Lowest Tariff</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scrollable Facility Cards Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {displayedFacilities.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl border border-amber-200">
                🔍
              </div>
              <h4 className="font-bold text-base text-slate-800">No Matching Facilities Found</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No cold storage units matched your current filter criteria. Try selecting "All Matching" or clear your search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilterMode('all');
                  setSearchQuery('');
                }}
                className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            displayedFacilities.map((fac) => {
              const isSelected = fac.id === selectedFacilityId;
              const ratePerQtl = fac.baseRatePerQuintalMonth || fac.monthlyRentPerQuintal || 40;

              return (
                <div
                  key={fac.id}
                  className={`rounded-3xl p-5 sm:p-6 border-2 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-400/30'
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {/* Left Column: Facility Details & Badges */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {fac.isSameDistrict && (
                        <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-300">
                          🟢 Local Hub ({fac.district})
                        </span>
                      )}
                      {fac.isDirectMatch ? (
                        <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-amber-300">
                          ⭐ Specializes in {currentCrop.name}
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                          Multi-Commodity Chamber
                        </span>
                      )}
                      <span className="bg-teal-50 text-teal-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-teal-200">
                        WDRA Certified
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                        {fac.name}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{fac.location || fac.district}, Telangana • PIN: {fac.pincode || '500001'}</span>
                      </p>
                    </div>

                    {/* Capacity & Chamber Specs */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Available Space</span>
                        <span className="font-mono font-black text-emerald-700 text-sm">
                          {(fac.availableCapacityMT || 2500).toLocaleString()} MT
                        </span>
                        <span className="text-[11px] text-slate-500"> / {(fac.totalCapacityMT || 5000).toLocaleString()} MT</span>
                      </div>

                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Chamber Temp</span>
                        <span className="font-mono font-bold text-slate-800 text-xs">
                          {fac.temperatureRange || '0°C to 4°C'}
                        </span>
                      </div>

                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Tariff Rate</span>
                        <span className="font-mono font-black text-emerald-800 text-xs">
                          ₹{ratePerQtl}
                        </span>
                        <span className="text-[10px] text-slate-500"> /Qtl/Month</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle/Right Column: REAL-TIME DISTANCE & TRAVEL TIME CALLOUT */}
                  <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                    {/* Distance & Transit Time Pill */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50/80 border-2 border-amber-300 rounded-2xl p-3 sm:p-3.5 w-full md:w-60 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-amber-900 tracking-wide flex items-center space-x-1">
                          <Navigation className="w-3 h-3 text-amber-700" />
                          <span>Road Transit to Farmer</span>
                        </span>
                        <span className="text-base font-black text-amber-950 font-mono">
                          ~{fac.distanceKm} km
                        </span>
                      </div>

                      <div className="space-y-1 pt-1 border-t border-amber-200/60 text-[11px]">
                        <div className="flex items-center justify-between text-slate-800">
                          <span className="flex items-center space-x-1 text-slate-600 font-semibold">
                            <span>🚜 Tractor:</span>
                          </span>
                          <strong className="font-bold text-amber-900">{fac.transit.tractorTime}</strong>
                        </div>
                        <div className="flex items-center justify-between text-slate-800">
                          <span className="flex items-center space-x-1 text-slate-600 font-semibold">
                            <span>🚚 Mini Truck:</span>
                          </span>
                          <strong className="font-bold text-slate-900">{fac.transit.truckTime}</strong>
                        </div>
                        <div className="text-[10px] text-slate-500 truncate pt-0.5">
                          Route: <span className="font-medium text-slate-700">{fac.highwayRoute}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {isSelected ? (
                      <div className="w-full flex items-center justify-center space-x-1.5 bg-emerald-100 text-emerald-900 font-black text-xs px-5 py-3 rounded-2xl border border-emerald-300">
                        <CheckCircle className="w-4 h-4 text-emerald-700" />
                        <span>Currently Selected for Booking</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectFacility(fac);
                          onClose();
                        }}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-md shadow-emerald-600/20 transition-all hover:scale-102 flex items-center justify-center space-x-2"
                      >
                        <span>Select this Cold Storage</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center space-x-2 text-slate-300 text-center sm:text-left">
            <span>📞 Kisan Call Centre Toll-Free:</span>
            <strong className="font-mono text-emerald-400">1800-180-1551</strong>
            <span className="hidden sm:inline text-slate-500">• 24/7 Gate Assistance</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-xl border border-white/20 transition"
          >
            Close & Keep Current Selection
          </button>
        </div>
      </div>
    </div>
  );
}
