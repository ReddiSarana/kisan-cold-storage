import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  transportFleetData,
  verifiedDrivers,
  initialTransportRentals
} from '../data/transportData';
import {
  fetchTransportFleet,
  fetchTransportDrivers,
  fetchTransportRentals,
  bookTransportRental,
  fetchBookings
} from '../services/api';
import {
  Truck,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Star,
  DollarSign,
  ArrowRight,
  Printer,
  Navigation,
  Sparkles,
  Compass,
  FileText,
  BadgePercent,
  Check,
  RefreshCw,
  Search,
  Filter,
  PhoneCall,
  Sliders,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function TransportRentalPage() {
  const {
    currentUser,
    activePaymentBooking,
    activeTransportBooking,
    setActiveTab,
    showToast
  } = useApp();

  const { t } = useLanguage();

  // Data States
  const [fleet, setFleet] = useState(transportFleetData);
  const [drivers, setDrivers] = useState(verifiedDrivers);
  const [recentBookings, setRecentBookings] = useState([]);
  const [myRentals, setMyRentals] = useState(initialTransportRentals);

  // Active Selected Vehicle & Driver
  const [selectedVehicleId, setSelectedVehicleId] = useState('tractor_trolley');
  const [selectedDriverId, setSelectedDriverId] = useState('drv-01');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');

  // Route & Commodity States (Pre-filled from active booking or user profile)
  const [originVillage, setOriginVillage] = useState(currentUser?.village || 'Maheshwaram');
  const [originMandal, setOriginMandal] = useState(currentUser?.mandal || 'Narsampet');
  const [originDistrict, setOriginDistrict] = useState(currentUser?.district || 'Warangal');
  const [originLandmark, setOriginLandmark] = useState('Survey No. 48/B, Near Rythu Vedika');
  const [destinationFacility, setDestinationFacility] = useState('Kakatiya Mega Cold Chain Hub, Warangal');
  const [transitDistanceKm, setTransitDistanceKm] = useState(24);
  const [produceName, setProduceName] = useState('Dry Red Chilli (Teja Variety)');
  const [quantityQuintals, setQuantityQuintals] = useState(100);
  const [bagsCount, setBagsCount] = useState(200);
  const [gateTokenNumber, setGateTokenNumber] = useState('TK-108');

  // Booking Schedule
  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Morning (07:00 AM - 09:00 AM)');
  const [needHelpers, setNeedHelpers] = useState(true);

  // Dispatch & Confirmation States
  const [isBooking, setIsBooking] = useState(false);
  const [activeWaybill, setActiveWaybill] = useState(null);

  // Load existing bookings and auto-fill transport details
  useEffect(() => {
    async function loadData() {
      try {
        const [fleetRes, driversRes, rentalsRes, bookingsRes] = await Promise.all([
          fetchTransportFleet(),
          fetchTransportDrivers(),
          fetchTransportRentals({ phone: currentUser?.phone || '' }),
          fetchBookings({ phone: currentUser?.phone || '' })
        ]);

        if (fleetRes && fleetRes.length > 0) setFleet(fleetRes);
        if (driversRes && driversRes.length > 0) setDrivers(driversRes);
        if (rentalsRes && rentalsRes.length > 0) setMyRentals(rentalsRes);
        if (bookingsRes && bookingsRes.length > 0) setRecentBookings(bookingsRes);

        // Pre-fill from activeTransportBooking or activePaymentBooking or latest booking
        const sourceBooking = activeTransportBooking || activePaymentBooking || (bookingsRes && bookingsRes[0]);
        if (sourceBooking) {
          if (sourceBooking.originVillage) setOriginVillage(sourceBooking.originVillage);
          if (sourceBooking.originMandal) setOriginMandal(sourceBooking.originMandal);
          if (sourceBooking.originDistrict) setOriginDistrict(sourceBooking.originDistrict);
          if (sourceBooking.originLandmark) setOriginLandmark(sourceBooking.originLandmark);
          if (sourceBooking.facilityName) setDestinationFacility(sourceBooking.facilityName);
          if (sourceBooking.cropName) setProduceName(sourceBooking.cropName);
          if (sourceBooking.quantityQuintals) setQuantityQuintals(Number(sourceBooking.quantityQuintals));
          if (sourceBooking.bagsCount) setBagsCount(Number(sourceBooking.bagsCount));
          if (sourceBooking.tokenNumber) setGateTokenNumber(sourceBooking.tokenNumber);
          if (sourceBooking.arrivalDate) setPickupDate(sourceBooking.arrivalDate);
        }
      } catch (err) {
        console.warn('Transport initial load error:', err);
      }
    }
    loadData();
  }, [currentUser?.phone, activeTransportBooking, activePaymentBooking]);

  // Selected vehicle object
  const activeVehicle = fleet.find(v => v.id === selectedVehicleId) || fleet[0];

  // Filtered drivers based on vehicle type or district
  const filteredDrivers = drivers.filter(d => {
    if (activeCategoryFilter !== 'ALL' && d.vehicleType !== selectedVehicleId) return false;
    return true;
  });

  const activeDriver = drivers.find(d => d.id === selectedDriverId) || filteredDrivers[0] || drivers[0];

  // Fare calculations
  const km = Math.max(1, Number(transitDistanceKm) || 20);
  const baseFare = activeVehicle.baseFare || 450;
  const distanceFare = (activeVehicle.perKmRate || 28) * km;
  const loadingFee = needHelpers ? (activeVehicle.loadingHelperFee || 250) : 0;
  const grossFare = baseFare + distanceFare + loadingFee;
  const govSubsidy = Math.round(grossFare * 0.20); // 20% Rythu Bandhu logistics subvention
  const netFare = grossFare - govSubsidy;

  // Handle Booking Transport
  const handleConfirmTransportBooking = async (e) => {
    if (e) e.preventDefault();

    setIsBooking(true);

    try {
      const payload = {
        farmerName: currentUser?.name || 'Mallaiah Goud',
        farmerPhone: currentUser?.phone || '+91 98765 12345',
        vehicleType: activeVehicle.id,
        driverId: activeDriver.id,
        pickupLocation: `${originLandmark}, ${originVillage}, ${originMandal} Mandal, ${originDistrict} Dist`,
        dropoffFacility: destinationFacility,
        distanceKm: km,
        produceName,
        quantityQuintals,
        bagsCount,
        pickupDate,
        pickupTimeSlot,
        needHelpers,
        gateTokenNumber
      };

      const res = await bookTransportRental(payload);
      if (res.success) {
        setActiveWaybill(res.waybill || res.data);
        setMyRentals(prev => [res.data, ...prev]);
        showToast(`🎉 Transport booked! Driver ${activeDriver.name} (${activeDriver.vehiclePlate}) assigned.`);
      }
    } catch (err) {
      showToast('⚠️ Transport booking failed: ' + err.message);
    } finally {
      setIsBooking(false);
    }
  };

  const handlePrintWaybill = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-800/70 border border-amber-600/40 px-3.5 py-1 rounded-full shadow-xs">
              Rythu Bandhu Agri-Logistics &amp; Fleet Rental
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Farm-to-Hub Transport Rental Facility
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
            Hire verified local tractor trolleys, mini trucks, heavy 10-wheelers, or active refrigerated reefer vans to haul your harvest directly from farm-gate to cold store. Enjoy 20% government freight subvention and automated digital waybills.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center space-x-3.5 shrink-0 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            🚜
          </div>
          <div>
            <p className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wide">Rythu Transport Help Desk</p>
            <a href="tel:18001801551" className="text-base font-black text-white hover:text-amber-200 hover:underline font-mono block">
              1800-180-1551
            </a>
            <p className="text-[10px] text-slate-300">20% Freight Subsidy • 24x7 Support</p>
          </div>
        </div>
      </div>

      {/* 3-Step Journey Stepper */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl p-3.5 sm:p-4 flex items-center space-x-3 shadow-md border border-amber-400">
            <div className="w-9 h-9 rounded-xl bg-white text-amber-800 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              1
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase text-amber-200 block">Step 1: Fleet Selection</span>
              <p className="text-xs sm:text-sm font-black text-white truncate">Choose Vehicle &amp; Driver</p>
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 sm:p-4 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              2
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Step 2: Fare &amp; Route</span>
              <p className="text-xs sm:text-sm font-black text-slate-900 truncate">Farm Gate ➔ Cold Storage</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center space-x-3 opacity-85">
            <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Step 3: Instant Dispatch</span>
              <p className="text-xs sm:text-sm font-bold text-slate-700 truncate">e-Waybill &amp; Gate Token</p>
            </div>
          </div>
        </div>
      </div>

      {activeWaybill ? (
        /* ================= WAYBILL / CONFIRMATION SCREEN ================= */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400 shadow-2xl space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-3xl flex items-center justify-center shadow-inner shrink-0">
                <Truck className="w-10 h-10" />
              </div>
              <div>
                <span className="inline-block bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                  Vehicle Dispatched &amp; Reserved
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Kisan Consignment Waybill &amp; Lorry Receipt
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Motor Vehicles Act 1988 &amp; Telangana Agricultural Marketing e-Waybill Compliance
                </p>
              </div>
            </div>

            {/* Waybill / LR Number Badge */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white p-4 sm:p-5 rounded-2xl text-center shadow-lg w-full sm:w-auto shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200 block">
                Goods Consignment LR Note
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono tracking-wider block">
                {activeWaybill.waybillNumber}
              </span>
              <span className="text-[11px] text-amber-100 mt-0.5 block">
                Gate Token: {activeWaybill.gateTokenNumber}
              </span>
            </div>
          </div>

          {/* Printable Official Waybill Document */}
          <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 p-6 sm:p-8 rounded-3xl border-2 border-amber-200 shadow-inner space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  🌾
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">
                    Krishivalaya Agricultural Transit Waybill
                  </h3>
                  <p className="text-xs text-slate-600">
                    Direct Farm-Gate to WDRA Cold Storage Transport Corridor
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Dispatch Date &amp; Time</span>
                <span className="text-xs font-mono font-bold text-slate-900">
                  {activeWaybill.pickupDate} • {activeWaybill.pickupTimeSlot}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Consignor (Farmer)</p>
                <p className="font-bold text-sm text-slate-900 mt-0.5">{activeWaybill.farmerName}</p>
                <p className="text-[11px] text-slate-500 font-mono">{activeWaybill.farmerPhone}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Assigned Driver &amp; Vehicle</p>
                <p className="font-bold text-sm text-amber-800 mt-0.5">{activeWaybill.driverName}</p>
                <p className="text-[11px] font-mono font-bold text-slate-800">{activeWaybill.vehiclePlate}</p>
                <a href={`tel:${activeWaybill.driverPhone}`} className="text-[11px] text-emerald-600 font-bold hover:underline inline-block mt-1">
                  📞 Call: {activeWaybill.driverPhone}
                </a>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Produce &amp; Load</p>
                <p className="font-bold text-sm text-slate-900 mt-0.5 truncate">{activeWaybill.produceName}</p>
                <p className="text-[11px] text-slate-600">{activeWaybill.quantityQuintals} Quintals ({activeWaybill.bagsCount} Bags)</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Net Subsidized Fare</p>
                <p className="font-black text-xl text-emerald-700 mt-0.5 font-mono">
                  ₹{activeWaybill.netFare.toLocaleString()}
                </p>
                <p className="text-[10px] text-amber-700 font-bold">20% Rythu Bandhu Subsidy Applied</p>
              </div>
            </div>

            {/* Route Details Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 text-xs">
              <h4 className="font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Verified Road Transit Route</span>
                <span className="font-mono text-emerald-700 font-bold">~{activeWaybill.distanceKm} km Road Distance</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">1. Farm Gate Pickup Location</span>
                  <strong className="text-slate-900 text-xs block mt-1">{activeWaybill.pickupLocation}</strong>
                </div>

                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">2. Cold Storage Destination Bay</span>
                  <strong className="text-emerald-900 text-xs block mt-1">{activeWaybill.dropoffFacility}</strong>
                </div>
              </div>
            </div>

            {/* SMS Dispatch Verification Box */}
            <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 flex items-start space-x-3">
              <span className="text-2xl shrink-0">📲</span>
              <div className="text-xs text-amber-950">
                <strong className="block font-bold">Dispatch SMS Sent to Driver ({activeWaybill.driverPhone}) &amp; Farmer ({activeWaybill.farmerPhone})</strong>
                "Krishivalaya Transport: Namaste {activeWaybill.farmerName}! {activeWaybill.vehicleName} reserved for {activeWaybill.pickupDate} ({activeWaybill.pickupTimeSlot}). Driver: {activeWaybill.driverName} ({activeWaybill.driverPhone}). Subsidized Net Fare: ₹{activeWaybill.netFare.toLocaleString()}. LR Waybill: {activeWaybill.waybillNumber}. Gate Pass Token: {activeWaybill.gateTokenNumber}."
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('queue')}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition transform hover:scale-[1.02] cursor-pointer"
            >
              <span>🚜 Proceed to Live Gate Queue (Token: {activeWaybill.gateTokenNumber})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handlePrintWaybill}
              className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-3.5 rounded-2xl shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Lorry Receipt (LR Waybill)</span>
            </button>

            <a
              href={`tel:${activeWaybill.driverPhone}`}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-3.5 rounded-2xl shadow-md transition cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Driver Directly</span>
            </a>

            <button
              type="button"
              onClick={() => setActiveWaybill(null)}
              className="ml-auto text-xs font-bold text-slate-500 hover:text-amber-700 px-3 py-2 cursor-pointer"
            >
              🔄 Book Another Vehicle
            </button>
          </div>
        </div>
      ) : (
        /* ================= MAIN BOOKING & FLEET SELECTION INTERFACE ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Fleet Selection & Driver Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Vehicle Fleet Cards */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                    🚜
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      Select Agricultural Vehicle Fleet
                    </h3>
                    <p className="text-xs text-slate-500">
                      Subsidized per-km rates with certified rural drivers
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full self-start sm:self-auto">
                  6 Fleet Categories
                </span>
              </div>

              {/* Fleet Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {fleet.map((v) => {
                  const isSelected = selectedVehicleId === v.id;
                  return (
                    <div
                      key={v.id}
                      onClick={() => {
                        setSelectedVehicleId(v.id);
                        // Pick first matching driver
                        const match = drivers.find(d => d.vehicleType === v.id);
                        if (match) setSelectedDriverId(match.id);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 shadow-md ring-2 ring-amber-400/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-3xl">{v.icon}</span>
                          <div>
                            <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                              {v.category}
                            </span>
                            <h4 className="font-black text-slate-900 text-xs sm:text-sm mt-1 leading-snug">
                              {v.name}
                            </h4>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="vehicleType"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500"
                        />
                      </div>

                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {v.tagline}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 block font-bold">Capacity</span>
                          <strong className="text-slate-900">{v.capacityTons} Tons ({v.capacityBags})</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-bold">Tariff</span>
                          <strong className="text-amber-700 font-mono font-bold">₹{v.perKmRate}/km</strong>
                        </div>
                      </div>

                      {v.isRefrigerated && (
                        <span className="inline-flex items-center text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md self-start">
                          ❄️ Active 2°C-8°C Cooling Chamber
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Driver Selection Section */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                    👨🏽‍🌾
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      Available Local Drivers &amp; Vehicle Plates
                    </h3>
                    <p className="text-xs text-slate-500">
                      RTO licensed, police verified, and GPS monitored
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-600">
                  {filteredDrivers.length} Available
                </span>
              </div>

              <div className="space-y-3">
                {filteredDrivers.map((drv) => {
                  const isSelected = selectedDriverId === drv.id;
                  return (
                    <div
                      key={drv.id}
                      onClick={() => {
                        setSelectedDriverId(drv.id);
                        setSelectedVehicleId(drv.vehicleType);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-400/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-2xl flex items-center justify-center shrink-0 border border-slate-200">
                          {drv.photo}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-black text-slate-900 text-sm">{drv.name}</h4>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center space-x-1">
                              <span>★</span>
                              <span>{drv.rating}</span>
                            </span>
                            {drv.policeVerified && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {drv.vehicleModel} • <strong className="text-slate-800 font-mono">{drv.vehiclePlate}</strong>
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Base: {drv.baseLocation} • {drv.tripsCompleted} Farm Trips Completed
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                          ETA ~{drv.etaMinutes} mins
                        </span>
                        <button
                          type="button"
                          className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white font-black'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected ? '✓ Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Route & Tariff Calculator Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Route Setup Card */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-amber-600" />
                <span>Pickup &amp; Delivery Corridor</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">
                    1. Farm Gate Pickup Place:
                  </label>
                  <input
                    type="text"
                    value={originLandmark}
                    onChange={(e) => setOriginLandmark(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {originVillage}, {originMandal} Mandal ({originDistrict} Dist)
                  </p>
                </div>

                <div>
                  <label className="text-slate-600 font-bold block mb-1">
                    2. Destination Cold Storage:
                  </label>
                  <input
                    type="text"
                    value={destinationFacility}
                    onChange={(e) => setDestinationFacility(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {/* Distance Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-600 font-bold">
                      Estimated Road Distance:
                    </label>
                    <span className="font-mono font-bold text-amber-700 text-sm">{transitDistanceKm} km</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    value={transitDistanceKm}
                    onChange={(e) => setTransitDistanceKm(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>5 km (Local)</span>
                    <span>50 km</span>
                    <span>150 km (Inter-District)</span>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-slate-600 font-bold block mb-1">Pickup Date:</label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-bold block mb-1">Time Slot:</label>
                    <select
                      value={pickupTimeSlot}
                      onChange={(e) => setPickupTimeSlot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                    >
                      <option>Morning (07:00 AM - 09:00 AM)</option>
                      <option>Midday (11:00 AM - 01:00 PM)</option>
                      <option>Evening (04:00 PM - 06:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Loading Helpers Toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">Include Farm Loading Helpers</span>
                    <span className="text-[10px] text-slate-400">2 helpers for lifting &amp; stacking (+₹{activeVehicle.loadingHelperFee || 250})</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={needHelpers}
                    onChange={(e) => setNeedHelpers(e.target.checked)}
                    className="h-4 w-4 text-amber-600 rounded-sm focus:ring-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Transparent Tariff Ledger Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-amber-950 to-emerald-950 text-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-amber-900/60 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                  Transparent Freight Ledger
                </span>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full font-mono font-bold">
                  Rythu Tariff
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Base Mobilization Charge</span>
                  <span className="font-mono font-bold text-white">₹{baseFare.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Distance Transit ({km} km × ₹{activeVehicle.perKmRate}/km)</span>
                  <span className="font-mono font-bold text-white">₹{distanceFare.toLocaleString()}</span>
                </div>

                {needHelpers && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Farm Loading/Unloading Assistance</span>
                    <span className="font-mono font-bold text-white">₹{loadingFee.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t border-white/10 pt-2 flex items-center justify-between text-slate-300">
                  <span>Gross Agricultural Freight</span>
                  <span className="font-mono font-bold text-white">₹{grossFare.toLocaleString()}</span>
                </div>

                {/* 20% Rythu Bandhu Subsidy */}
                <div className="flex items-center justify-between text-emerald-300 bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-500/30">
                  <span className="font-bold">Rythu Bandhu 20% Logistics Subvention</span>
                  <span className="font-mono font-bold">-₹{govSubsidy.toLocaleString()}</span>
                </div>

                {/* Net Payable Amount */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-amber-200 text-xs sm:text-sm">
                        Net Subsidized Fare (Farmer Payable)
                      </p>
                      <p className="text-[10px] text-slate-300">
                        Payable to driver upon cold store arrival
                      </p>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">
                      ₹{netFare.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Booking Button */}
              <button
                type="button"
                onClick={handleConfirmTransportBooking}
                disabled={isBooking}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-102 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>
                  {isBooking ? 'Dispatching Nearest Vehicle...' : `Confirm & Book ${activeVehicle.category}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Support Desk Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  📞
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Rythu Logistics Dispatch Desk
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Direct Coordination with Cold Storage Gate Security
                  </p>
                </div>
              </div>
              <div className="text-xs text-slate-600 divide-y divide-slate-100 pt-1">
                <div className="py-2 flex items-center justify-between">
                  <span>Logistics Helpline</span>
                  <strong className="font-mono text-amber-700">1800-180-1551</strong>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <span>Gate Token Associated</span>
                  <strong className="text-slate-800 font-mono">{gateTokenNumber}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
