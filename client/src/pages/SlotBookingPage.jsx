import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchFacilities, fetchCrops, createBooking, getDocxDownloadUrl } from '../services/api';
import {
  CalendarCheck,
  Warehouse,
  Clock,
  Truck,
  CheckCircle,
  FileText,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Download,
  AlertCircle,
  MapPin,
  Layers,
  Thermometer,
  Percent,
  Calendar,
  DollarSign
} from 'lucide-react';

export default function SlotBookingPage() {
  const {
    currentUser,
    selectedBookingFacility,
    setSelectedBookingFacility,
    selectedBookingCrop,
    setActiveTab,
    setIsSmsSimulatorOpen,
    showToast
  } = useApp();

  const { t } = useLanguage();

  const [facilities, setFacilities] = useState([]);
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  // Form State
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  const [selectedCropId, setSelectedCropId] = useState('red_chilli');
  const [quantityQuintals, setQuantityQuintals] = useState(150);
  const [bagsCount, setBagsCount] = useState(300);
  const [expectedDurationMonths, setExpectedDurationMonths] = useState(6);
  const [arrivalDate, setArrivalDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('morning'); // 'morning', 'afternoon', 'evening'
  const [vehicleType, setVehicleType] = useState('Tractor Trolley');
  const [vehicleNumber, setVehicleNumber] = useState('TS-03-BK-2026');
  const [farmerName, setFarmerName] = useState(currentUser.name || 'Mallaiah Goud');
  const [farmerPhone, setFarmerPhone] = useState(currentUser.phone || '+91 98765 12345');
  const [village, setVillage] = useState(currentUser.village || 'Maheshwaram');
  const [district, setDistrict] = useState(currentUser.district || 'Warangal');
  const [kccNumber, setKccNumber] = useState(currentUser.kccNumber || 'KCC-TS-44921');
  const [notes, setNotes] = useState('');

  // Load facilities and crops
  useEffect(() => {
    async function loadData() {
      try {
        const [facList, cropList] = await Promise.all([
          fetchFacilities(),
          fetchCrops()
        ]);
        setFacilities(facList);
        setCrops(cropList);

        if (selectedBookingFacility) {
          setSelectedFacilityId(selectedBookingFacility.id);
        } else if (facList.length > 0) {
          setSelectedFacilityId(facList[0].id);
        }

        if (selectedBookingCrop) {
          setSelectedCropId(selectedBookingCrop);
        }
      } catch (e) {
        console.error('Error loading booking data:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [selectedBookingFacility, selectedBookingCrop]);

  // Sync bags count when quantity changes (approx 2 bags per quintal for 50kg bags)
  const handleQuantityChange = (val) => {
    const qtl = Math.max(1, Number(val) || 0);
    setQuantityQuintals(qtl);
    setBagsCount(qtl * 2);
  };

  // Find active facility
  const activeFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0] || {};
  const activeCrop = crops.find(c => c.id === selectedCropId) || { name: 'Agricultural Produce' };

  // Calculate Tariffs
  const ratePerQtlMonth = activeFacility?.baseRatePerQuintalMonth || 40;
  const storageTariff = quantityQuintals * ratePerQtlMonth * expectedDurationMonths;
  const handlingFeePerBag = activeFacility?.handlingFeePerBag || 5;
  const handlingCharges = bagsCount * handlingFeePerBag;
  const totalEstimatedCost = storageTariff + handlingCharges;
  const advanceAmount = Math.round(totalEstimatedCost * 0.25);
  const balanceDue = totalEstimatedCost - advanceAmount;

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        farmerName,
        farmerPhone,
        facilityId: activeFacility.id,
        cropId: selectedCropId,
        quantityQuintals,
        bagsCount,
        arrivalDate,
        expectedDurationMonths,
        vehicleNumber,
        vehicleType,
        timeSlot
      };

      const res = await createBooking(payload);
      if (res.success) {
        setSuccessBooking(res.data);
        showToast(`🎉 Chamber slot booked successfully! Token: ${res.token?.tokenId || 'TK-Generated'}`);
        setIsSmsSimulatorOpen(true);
      } else {
        alert('Booking submission failed: ' + (res.message || 'Please check input fields'));
      }
    } catch (err) {
      alert('Error during booking: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Window Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/60 px-3 py-0.5 rounded-full">
              {t('slotBookingWindow', "Dedicated Cold Storage Slot Booking Window")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Chamber Slot Reservation & Gate Pass
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Reserve temperature-controlled cold chamber space across Telangana's WDRA certified facilities. Choose your vehicle arrival slot, lock transparent tariff rates, and receive an instant digital Gate Token on your mobile via SMS.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl flex items-center space-x-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-lg">
            📞
          </div>
          <div>
            <p className="text-[10px] text-emerald-300 font-bold uppercase">Booking Assistance Desk</p>
            <a href="tel:18001801551" className="text-sm font-black text-white hover:underline font-mono">
              1800-180-1551 (Toll-Free)
            </a>
            <p className="text-[10px] text-slate-400">Available 24x7 for Farmers</p>
          </div>
        </div>
      </div>

      {/* Neat 4-Step Farmer Guide Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl shadow-md">
              💡
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                Farmer Guide: 4 Easy Steps to Reserve Your Chamber Slot
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Simple 4-Step Reservation Process — Direct booking without long gate waiting
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('units')}
            className="text-xs bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100 font-bold px-3 py-1.5 rounded-xl transition"
          >
            Explore Storage Registry &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                🏬 Step 1: Select Facility
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Choose an accredited cold storage unit closest to your farm or market.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-teal-200 shadow-sm flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                🌾 Step 2: Produce & Bags
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Specify commodity type, quantity in quintals, and intended months of storage.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-green-200 shadow-sm flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-black flex items-center justify-center text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                ⏰ Step 3: Pick Arrival Slot
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Choose morning, afternoon, or evening vehicle arrival window.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-sm flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-black flex items-center justify-center text-sm shrink-0">
              4
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                📱 Step 4: Instant SMS Token
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Receive instant gate entry pass on mobile with zero highway congestion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Booking Interface */}
      {successBooking ? (
        /* Confirmation Screen */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-400 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                  Chamber Slot Reserved & Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Gate Token & Booking Confirmed!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Official WDRA Bailment Record Created for <strong>{farmerName}</strong>
                </p>
              </div>
            </div>

            {/* Token Badge */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-4 sm:p-5 rounded-2xl text-center shadow-lg w-full sm:w-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 block">
                Digital Gate Token
              </span>
              <span className="text-3xl font-black font-mono tracking-wider block">
                {successBooking.tokenNumber || 'TK-108'}
              </span>
              <span className="text-[11px] text-emerald-100 mt-0.5 block">
                Bay Allocation: Chamber 2 - Bay 1
              </span>
            </div>
          </div>

          {/* Booking Breakdown Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Booking ID</p>
              <p className="font-mono font-black text-sm text-slate-900">{successBooking.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Selected Cold Storage</p>
              <p className="font-bold text-sm text-emerald-800">{activeFacility?.name || 'Cold Chain Hub'}</p>
              <p className="text-[11px] text-slate-500">{activeFacility?.district}, {activeFacility?.state}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Produce & Quantity</p>
              <p className="font-bold text-sm text-slate-900">{quantityQuintals} Quintals ({bagsCount} Bags)</p>
              <p className="text-[11px] text-slate-500 capitalize">{activeCrop?.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Arrival Schedule</p>
              <p className="font-bold text-sm text-slate-900">{arrivalDate}</p>
              <p className="text-[11px] text-slate-500 capitalize">{timeSlot} Slot</p>
            </div>
          </div>

          {/* SMS Notification callout */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start space-x-3">
            <span className="text-2xl">📲</span>
            <div className="text-xs text-amber-950">
              <strong className="block font-bold">SMS Dispatched to {farmerPhone}</strong>
              "AgroVault: Namaste {farmerName}! Slot confirmed at {activeFacility?.name} for {quantityQuintals} Qtl {activeCrop?.name}. Token: {successBooking.tokenNumber || 'TK-108'}. Date: {arrivalDate}. Advance payable upon inward weighment: ₹{advanceAmount.toLocaleString()}."
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsSmsSimulatorOpen(true)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md transition"
            >
              <span>📱 Open SMS Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('queue')}
              className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md transition"
            >
              <span>🚜 View Live Gate Queue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getDocxDownloadUrl('agreement', successBooking.id)}
              download
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Contract (.DOCX)</span>
            </a>

            <button
              onClick={() => {
                setSuccessBooking(null);
                setQuantityQuintals(150);
                setBagsCount(300);
              }}
              className="ml-auto text-xs font-bold text-slate-600 hover:text-emerald-700 px-3 py-2"
            >
              🔄 Book Another Slot
            </button>
          </div>
        </div>
      ) : (
        /* The Booking Form Grid */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Form Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Slot Reservation Details</h3>
                  <p className="text-xs text-slate-500">Fill in your harvest and arrival information</p>
                </div>
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                Step 1 of 1 • Instant Token
              </span>
            </div>

            {/* Field 1: Choose Cold Storage Facility */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. Select Cold Storage Facility *
              </label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                required
              >
                {facilities.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name} — {fac.district} (Avail: {fac.availableCapacityMT} MT • ₹{fac.baseRatePerQuintalMonth}/Qtl/mo)
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: Crop & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  2. Harvested Crop Commodity *
                </label>
                <select
                  value={selectedCropId}
                  onChange={(e) => setSelectedCropId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  required
                >
                  {crops.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  3. Quantity in Quintals *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={quantityQuintals}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pr-12 text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                  <span className="absolute right-3.5 top-3.5 text-xs text-slate-400 font-bold">
                    Qtl
                  </span>
                </div>
              </div>
            </div>

            {/* Field 3: Bag count & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Estimated Bag Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={bagsCount}
                  onChange={(e) => setBagsCount(Number(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400">Standard 50kg gunny bags</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Storage Duration in Months *
                </label>
                <select
                  value={expectedDurationMonths}
                  onChange={(e) => setExpectedDurationMonths(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  required
                >
                  <option value={1}>1 Month (Short Term Transit)</option>
                  <option value={2}>2 Months</option>
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months (Standard Season Post-Harvest)</option>
                  <option value={9}>9 Months (Extended Market Price Waiting)</option>
                  <option value={12}>12 Months (Full Year Storage)</option>
                </select>
              </div>
            </div>

            {/* Field 4: Arrival Date & Time Slot Cards */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                4. Select Arrival Date & Time Slot *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTimeSlot('morning')}
                    className={`p-2.5 rounded-xl border-2 text-center transition flex flex-col items-center justify-center ${
                      timeSlot === 'morning'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-base">🌅</span>
                    <span className="text-xs font-bold mt-1">Morning</span>
                    <span className="text-[10px] text-slate-500">8 AM - 11 AM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeSlot('afternoon')}
                    className={`p-2.5 rounded-xl border-2 text-center transition flex flex-col items-center justify-center ${
                      timeSlot === 'afternoon'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-base">☀️</span>
                    <span className="text-xs font-bold mt-1">Afternoon</span>
                    <span className="text-[10px] text-slate-500">12 PM - 3 PM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeSlot('evening')}
                    className={`p-2.5 rounded-xl border-2 text-center transition flex flex-col items-center justify-center ${
                      timeSlot === 'evening'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-base">🌇</span>
                    <span className="text-xs font-bold mt-1">Evening</span>
                    <span className="text-[10px] text-slate-500">4 PM - 7 PM</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Field 5: Vehicle & Driver Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Tractor Trolley">Tractor Trolley</option>
                  <option value="Small Commercial Vehicle (Bolero/Ace)">Bolero Pickup / Mini Truck</option>
                  <option value="6-Wheeler Medium Truck">6-Wheeler Medium Truck</option>
                  <option value="10-Wheeler Heavy Truck">10-Wheeler Heavy Truck</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Vehicle Reg Plate *
                </label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. TS-03-BK-2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-bold uppercase font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Field 6: Farmer Profile & Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Farmer Full Name *
                </label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Mobile Phone for SMS Token *
                </label>
                <input
                  type="tel"
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-bold font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button for Mobile */}
            <div className="lg:hidden pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-xl transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'Reserving Slot...' : 'Confirm Slot & Generate Gate Token'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Live Tariff Breakdown & Instant Receipt Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Facility Highlights Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
                  Chamber Spec Check
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                  WDRA Certified
                </span>
              </div>

              <div>
                <h4 className="font-black text-slate-900 text-base">{activeFacility?.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                  {activeFacility?.district}, {activeFacility?.state}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Chamber Temp</span>
                  <strong className="text-slate-800 font-mono text-sm">{activeFacility?.temperatureRange || '2°C - 4°C'}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Humidity RH</span>
                  <strong className="text-slate-800 font-mono text-sm">{activeFacility?.humidityRange || '85% - 90%'}</strong>
                </div>
              </div>
            </div>

            {/* Live Tariff Calculator & Cost Breakdown */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Transparent Tariff Ledger
                </span>
                <span className="text-xs bg-white/10 text-emerald-300 px-2.5 py-0.5 rounded-full font-mono">
                  Live Calculator
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Chamber Rent ({quantityQuintals} Qtl × ₹{ratePerQtlMonth} × {expectedDurationMonths} mo)</span>
                  <span className="font-mono font-bold text-white">₹{storageTariff.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Weighbridge & Bag Stacking Fee ({bagsCount} Bags × ₹{handlingFeePerBag})</span>
                  <span className="font-mono font-bold text-white">₹{handlingCharges.toLocaleString()}</span>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Total Estimated Storage Charges</span>
                  <span className="text-xl font-black font-mono text-emerald-400">
                    ₹{totalEstimatedCost.toLocaleString()}
                  </span>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-emerald-200">25% Advance Payable at Gate Weighment</p>
                    <p className="text-[10px] text-slate-400">Remaining 75% settled upon produce release</p>
                  </div>
                  <span className="text-base font-black font-mono text-amber-300">
                    ₹{advanceAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Bank Loan Subvention callout */}
              <div className="bg-emerald-800/40 border border-emerald-500/30 rounded-2xl p-3.5 flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-100 leading-relaxed">
                  <strong>75% NABARD Pledge Loan Eligible:</strong> Once deposited, use your e-NWR receipt at any SBI / Andhra Bank branch for an instant credit loan without selling your crop.
                </p>
              </div>

              {/* Confirm Slot Button (Desktop) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl transition hover:scale-102 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'Reserving Chamber Slot...' : 'Confirm Slot & Generate Gate Token'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
