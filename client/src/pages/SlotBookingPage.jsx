import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchFacilities, fetchCrops, createBooking, getDocxDownloadUrl } from '../services/api';
import FarmToStorageRouteMap from '../components/FarmToStorageRouteMap';
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
  DollarSign,
  Plus,
  Trash2,
  Navigation
} from 'lucide-react';

const TELANGANA_DISTRICTS = [
  'Adilabad',
  'Bhadradri Kothagudem',
  'Hanamkonda',
  'Hyderabad',
  'Jagtial',
  'Jangaon',
  'Jayashankar Bhupalpally',
  'Jogulamba Gadwal',
  'Kamareddy',
  'Karimnagar',
  'Khammam',
  'Kumuram Bheem Asifabad',
  'Mahabubabad',
  'Mahabubnagar',
  'Mancherial',
  'Medak',
  'Medchal-Malkajgiri',
  'Mulugu',
  'Nagarkurnool',
  'Nalgonda',
  'Narayanpet',
  'Nirmal',
  'Nizamabad',
  'Peddapalli',
  'Rajanna Sircilla',
  'Rangareddy',
  'Sangareddy',
  'Siddipet',
  'Suryapet',
  'Vikarabad',
  'Wanaparthy',
  'Warangal',
  'Yadadri Bhuvanagiri'
];

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
  
  // Multi-crop state array
  const [bookedCrops, setBookedCrops] = useState([
    { cropId: 'dry_red_chilli', quantityQuintals: 100, bagsCount: 200 }
  ]);

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
  const [kccNumber, setKccNumber] = useState(currentUser.kccNumber || 'KCC-TS-44921');
  const [notes, setNotes] = useState('');

  // Crop Origin / Sourcing Place State (Accurate place where crops are sourced)
  const [originDistrict, setOriginDistrict] = useState(currentUser.district || 'Warangal');
  const [originMandal, setOriginMandal] = useState(currentUser.mandal || 'Narsampet');
  const [originVillage, setOriginVillage] = useState(currentUser.village || 'Maheshwaram');
  const [originLandmark, setOriginLandmark] = useState('Survey No. 48/B, Near Rythu Vedika');
  const [originPincode, setOriginPincode] = useState(currentUser.pincode || '506132');
  const [originSourceType, setOriginSourceType] = useState('Own Cultivated Land / Farm Gate');

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
          setBookedCrops([
            { cropId: selectedBookingCrop, quantityQuintals: 100, bagsCount: 200 }
          ]);
        } else if (cropList.length > 0) {
          const defaultCrop = cropList.find(c => c.id === 'dry_red_chilli' || c.id === 'red_chilli') || cropList[0];
          setBookedCrops([
            { cropId: defaultCrop.id, quantityQuintals: 100, bagsCount: 200 }
          ]);
        }
      } catch (e) {
        console.error('Error loading booking data:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [selectedBookingFacility, selectedBookingCrop]);

  // Multi-crop actions
  const handleAddCrop = () => {
    const alreadySelectedIds = new Set(bookedCrops.map(c => c.cropId));
    const nextCrop = crops.find(c => !alreadySelectedIds.has(c.id)) || crops[0];
    setBookedCrops(prev => [
      ...prev,
      {
        cropId: nextCrop ? nextCrop.id : 'turmeric',
        quantityQuintals: 50,
        bagsCount: 100
      }
    ]);
  };

  const handleRemoveCrop = (index) => {
    if (bookedCrops.length <= 1) return;
    setBookedCrops(prev => prev.filter((_, i) => i !== index));
  };

  const handleCropChange = (index, field, value) => {
    setBookedCrops(prev => {
      const updated = [...prev];
      if (field === 'quantityQuintals') {
        const qtl = Math.max(1, Number(value) || 0);
        updated[index] = {
          ...updated[index],
          quantityQuintals: qtl,
          bagsCount: qtl * 2
        };
      } else if (field === 'bagsCount') {
        updated[index] = {
          ...updated[index],
          bagsCount: Math.max(0, Number(value) || 0)
        };
      } else if (field === 'cropId') {
        updated[index] = {
          ...updated[index],
          cropId: value
        };
      }
      return updated;
    });
  };

  // Totals across all selected crops
  const totalQuantityQuintals = bookedCrops.reduce((sum, item) => sum + (Number(item.quantityQuintals) || 0), 0);
  const totalBagsCount = bookedCrops.reduce((sum, item) => sum + (Number(item.bagsCount) || 0), 0);

  // Find active facility
  const activeFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0] || {};

  // Calculate Tariffs
  const ratePerQtlMonth = activeFacility?.baseRatePerQuintalMonth || 40;
  const storageTariff = totalQuantityQuintals * ratePerQtlMonth * expectedDurationMonths;
  const handlingFeePerBag = activeFacility?.handlingFeePerBag || 5;
  const handlingCharges = totalBagsCount * handlingFeePerBag;
  const totalEstimatedCost = storageTariff + handlingCharges;
  const advanceAmount = Math.round(totalEstimatedCost * 0.25);
  const balanceDue = totalEstimatedCost - advanceAmount;

  // Resolved crop items with details
  const resolvedBookedCrops = bookedCrops.map(item => {
    const cropObj = crops.find(c => c.id === item.cropId) || { name: item.cropId, category: 'Produce' };
    const cropTariff = (Number(item.quantityQuintals) || 0) * ratePerQtlMonth * expectedDurationMonths;
    return {
      ...item,
      cropName: cropObj.name,
      category: cropObj.category,
      cropTariff
    };
  });

  const handlePreFillProfile = () => {
    if (currentUser.district) setOriginDistrict(currentUser.district);
    if (currentUser.mandal) setOriginMandal(currentUser.mandal);
    if (currentUser.village) setOriginVillage(currentUser.village);
    if (currentUser.pincode) setOriginPincode(currentUser.pincode);
    showToast('📍 Pre-filled farm origin with your registered profile details!');
  };

  const transitDistanceKm = originDistrict.toLowerCase() === (activeFacility?.district || '').toLowerCase() ? 18 : 54;

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cropsList = resolvedBookedCrops.map(c => ({
        cropId: c.cropId,
        cropName: c.cropName,
        quantityQuintals: Number(c.quantityQuintals) || 0,
        bagsCount: Number(c.bagsCount) || 0
      }));

      const cropNamesList = cropsList.map(c => c.cropName);
      const cropNamesSummary = cropNamesList.join(', ');

      const originAddress = `${originVillage}, ${originMandal} Mandal, ${originDistrict} Dist - ${originPincode}`;
      const originLocation = {
        district: originDistrict,
        mandal: originMandal,
        village: originVillage,
        landmark: originLandmark,
        pincode: originPincode,
        sourceType: originSourceType,
        estimatedDistanceKm: transitDistanceKm
      };

      const payload = {
        farmerName,
        farmerPhone,
        facilityId: activeFacility.id,
        cropId: bookedCrops[0]?.cropId || 'produce',
        cropName: cropNamesSummary,
        cropsList,
        quantityQuintals: totalQuantityQuintals,
        bagsCount: totalBagsCount,
        arrivalDate,
        expectedDurationMonths,
        vehicleNumber,
        vehicleType,
        timeSlot,
        originDistrict,
        originMandal,
        originVillage,
        originLandmark,
        originPincode,
        originSourceType,
        originAddress,
        originLocation
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
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-800/70 border border-emerald-600/40 px-3.5 py-1 rounded-full shadow-xs">
              {t('slotBookingWindow', "Dedicated Cold Storage Slot Booking Window")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Chamber Slot Reservation & Gate Pass
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
            Reserve temperature-controlled cold chamber space across Telangana's WDRA certified facilities. Choose your vehicle arrival slot, lock transparent tariff rates, and receive an instant digital Gate Token on your mobile via SMS.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center space-x-3.5 shrink-0 shadow-lg card-hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            📞
          </div>
          <div>
            <p className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wide">Booking Assistance Desk</p>
            <a href="tel:18001801551" className="text-base font-black text-white hover:text-emerald-200 hover:underline font-mono block">
              1800-180-1551
            </a>
            <p className="text-[10px] text-slate-300">Toll-Free • 24x7 for Farmers</p>
          </div>
        </div>
      </div>

      {/* Neat 4-Step Farmer Guide Banner */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-green-50/80 border-2 border-emerald-300/80 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-emerald-200/80">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xl shadow-md">
              💡
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
                Farmer Guide: 4 Easy Steps to Reserve Your Chamber Slot
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Simple 4-Step Reservation Process — Direct booking without long gate waiting
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('units')}
            className="text-xs bg-white text-emerald-800 border border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 font-bold px-4 py-2 rounded-xl transition shadow-xs"
          >
            Explore Storage Registry &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-emerald-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              1
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                🏬 Step 1: Select Facility
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Choose an accredited cold storage unit closest to your farm or market.
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-teal-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              2
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                🌾 Step 2: Produce & Bags
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Specify commodity type, quantity in quintals, and intended months of storage.
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-green-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-green-100 text-green-800 font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              3
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">
                ⏰ Step 3: Pick Arrival Slot
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Choose morning, afternoon, or evening vehicle arrival window.
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-4.5 border border-blue-200/90 shadow-xs card-hover-lift flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-black flex items-center justify-center text-sm shrink-0 shadow-xs">
              4
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">
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
              <p className="text-[10px] text-slate-400 font-bold uppercase">Total Produce & Quantity</p>
              <p className="font-bold text-sm text-slate-900">{totalQuantityQuintals} Quintals ({totalBagsCount} Bags)</p>
              <p className="text-[11px] text-slate-500 font-semibold">{bookedCrops.length} Commodity Type(s)</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Arrival Schedule</p>
              <p className="font-bold text-sm text-slate-900">{arrivalDate}</p>
              <p className="text-[11px] text-slate-500 capitalize">{timeSlot} Slot</p>
            </div>
          </div>

          {/* Accurate Sourcing Place & Farm Traceability Card */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-2xl p-5 border-2 border-emerald-200/90 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  📍
                </span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Verified Crop Sourcing Place & Farm Traceability
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    WDRA Chain of Custody, Geotag & Farm Origin Record
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white text-emerald-800 border border-emerald-300 shadow-xs self-start sm:self-auto">
                ✓ Origin Geotagged
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/90 p-3 rounded-xl border border-emerald-200/60 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Village & Mandal</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{originVillage}, {originMandal}</p>
                <p className="text-[11px] text-slate-500">PIN: {originPincode}</p>
              </div>

              <div className="bg-white/90 p-3 rounded-xl border border-emerald-200/60 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Origin District</p>
                <p className="font-bold text-emerald-800 text-sm mt-0.5">{originDistrict} District</p>
                <p className="text-[11px] text-slate-500">State: Telangana</p>
              </div>

              <div className="bg-white/90 p-3 rounded-xl border border-emerald-200/60 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Farm Gate / Survey No.</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5 truncate">{originLandmark || 'Farm Gate'}</p>
                <p className="text-[11px] text-slate-500">{originSourceType}</p>
              </div>

              <div className="bg-white/90 p-3 rounded-xl border border-emerald-200/60 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Transit Distance</p>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">~{transitDistanceKm} km</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Direct Farm ➔ Hub Route</p>
              </div>
            </div>
          </div>

          {/* Visual Interactive Transit Map on Success Confirmation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>Verified Transit Corridor & Highway Route Map</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Gate Entry Clearance Active
              </span>
            </div>
            <FarmToStorageRouteMap
              originVillage={originVillage}
              originMandal={originMandal}
              originDistrict={originDistrict}
              originLandmark={originLandmark}
              originPincode={originPincode}
              originSourceType={originSourceType}
              facility={activeFacility}
              vehicleType={vehicleType}
              vehicleNumber={vehicleNumber}
              distanceKm={transitDistanceKm}
            />
          </div>

          {/* Dedicated Breakdown of all booked crops */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Reserved Commodities Breakdown ({resolvedBookedCrops.length} Crops)</span>
              </h4>
              <span className="text-[11px] font-mono font-bold text-slate-600">
                Combined: {totalQuantityQuintals} Qtl • {totalBagsCount} Bags
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {resolvedBookedCrops.map((c, i) => (
                <div key={i} className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Crop #{i + 1}
                    </span>
                    <p className="font-bold text-sm text-slate-900 mt-1">{c.cropName}</p>
                    <p className="text-[11px] text-slate-500">{c.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-black text-sm text-emerald-700">{c.quantityQuintals} Qtl</p>
                    <p className="text-[11px] text-slate-500">{c.bagsCount} Bags</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Notification callout */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start space-x-3">
            <span className="text-2xl">📲</span>
            <div className="text-xs text-amber-950">
              <strong className="block font-bold">SMS Dispatched to {farmerPhone}</strong>
              "AgroVault: Namaste {farmerName}! Slot confirmed at {activeFacility?.name} for {totalQuantityQuintals} Qtl ({resolvedBookedCrops.map(c => `${c.quantityQuintals} Qtl ${c.cropName}`).join(', ')}) sourced from {originVillage}, {originMandal} ({originDistrict} Dist). Token: {successBooking.tokenNumber || 'TK-108'}. Date: {arrivalDate}. Advance payable upon inward weighment: ₹{advanceAmount.toLocaleString()}."
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
                setBookedCrops([
                  { cropId: crops[0]?.id || 'dry_red_chilli', quantityQuintals: 100, bagsCount: 200 }
                ]);
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

            {/* Field 2: Multi-Crop Selection & Produce Quantities */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    2. Harvested Crops & Commodities *
                  </label>
                  <p className="text-xs text-slate-500">
                    Book chamber space for one or multiple crops in a single gate pass
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 px-2.5 py-1 rounded-lg">
                    {bookedCrops.length} {bookedCrops.length === 1 ? 'Crop' : 'Crops'} Selected
                  </span>
                  <button
                    type="button"
                    onClick={handleAddCrop}
                    className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-xs transition hover:scale-102"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Crop</span>
                  </button>
                </div>
              </div>

              {/* Crop Rows List */}
              <div className="space-y-3.5">
                {bookedCrops.map((cropItem, idx) => {
                  const currentCropObj = crops.find(c => c.id === cropItem.cropId);
                  return (
                    <div
                      key={idx}
                      className="bg-slate-50/90 hover:bg-slate-50 rounded-2xl p-4 border border-slate-200/90 shadow-xs transition space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-black text-slate-800">
                            Commodity #{idx + 1}: {currentCropObj?.name || 'Select Crop'}
                          </span>
                          {currentCropObj?.category && (
                            <span className="text-[10px] bg-slate-200/80 text-slate-700 font-semibold px-2 py-0.5 rounded-md hidden sm:inline-block">
                              {currentCropObj.category}
                            </span>
                          )}
                        </div>

                        {bookedCrops.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCrop(idx)}
                            className="flex items-center space-x-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg transition font-bold"
                            title="Remove this crop"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        {/* Crop Selector (6 cols) */}
                        <div className="sm:col-span-6 space-y-1">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase">
                            Crop Type
                          </label>
                          <select
                            value={cropItem.cropId}
                            onChange={(e) => handleCropChange(idx, 'cropId', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                            required
                          >
                            {crops.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name} ({c.category})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Quantity (3 cols) */}
                        <div className="sm:col-span-3 space-y-1">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase">
                            Weight (Quintals)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              max="10000"
                              value={cropItem.quantityQuintals}
                              onChange={(e) => handleCropChange(idx, 'quantityQuintals', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 pr-9 text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                              required
                            />
                            <span className="absolute right-2.5 top-2.5 text-[11px] text-slate-400 font-bold">
                              Qtl
                            </span>
                          </div>
                        </div>

                        {/* Bags Count (3 cols) */}
                        <div className="sm:col-span-3 space-y-1">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase">
                            Gunny Bags
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              value={cropItem.bagsCount}
                              onChange={(e) => handleCropChange(idx, 'bagsCount', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 pr-10 text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                            />
                            <span className="absolute right-2.5 top-2.5 text-[10px] text-slate-400 font-bold">
                              Bags
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Crop Button Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl">
                <div className="text-xs text-emerald-950 font-medium flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Need to deposit multiple crops? Click <strong>"+ Add Another Crop"</strong> to combine them on 1 gate pass.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddCrop}
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center space-x-1.5 bg-white border border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-800 text-xs font-black px-4 py-2 rounded-xl transition shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+ Add Another Crop</span>
                </button>
              </div>

              {/* Multi-Crop Totals Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Total Produce</p>
                  <p className="font-mono font-black text-sm text-slate-900">{bookedCrops.length} Commodity Types</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <p className="text-[10px] text-emerald-700 uppercase font-bold">Total Weight</p>
                  <p className="font-mono font-black text-sm text-emerald-900">{totalQuantityQuintals} Qtl ({Math.round(totalQuantityQuintals / 10 * 10) / 10} MT)</p>
                </div>
                <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-teal-700 uppercase font-bold">Total Bags</p>
                  <p className="font-mono font-black text-sm text-teal-900">{totalBagsCount} Bags (~50kg)</p>
                </div>
              </div>
            </div>

            {/* Field 3: Duration */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Storage Duration in Months *
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

                <div className="sm:col-span-2 grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTimeSlot('morning')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden card-hover-lift ${
                      timeSlot === 'morning'
                        ? 'border-emerald-500 bg-gradient-to-b from-emerald-50 to-teal-50 text-emerald-950 font-black shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {timeSlot === 'morning' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                    <span className="text-xl">🌅</span>
                    <span className="text-xs font-black mt-1">Morning</span>
                    <span className="text-[10px] text-slate-500 font-semibold">8 AM - 11 AM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeSlot('afternoon')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden card-hover-lift ${
                      timeSlot === 'afternoon'
                        ? 'border-emerald-500 bg-gradient-to-b from-emerald-50 to-teal-50 text-emerald-950 font-black shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {timeSlot === 'afternoon' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                    <span className="text-xl">☀️</span>
                    <span className="text-xs font-black mt-1">Afternoon</span>
                    <span className="text-[10px] text-slate-500 font-semibold">12 PM - 3 PM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeSlot('evening')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all duration-200 flex flex-col items-center justify-center relative overflow-hidden card-hover-lift ${
                      timeSlot === 'evening'
                        ? 'border-emerald-500 bg-gradient-to-b from-emerald-50 to-teal-50 text-emerald-950 font-black shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {timeSlot === 'evening' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                    <span className="text-xl">🌇</span>
                    <span className="text-xs font-black mt-1">Evening</span>
                    <span className="text-[10px] text-slate-500 font-semibold">4 PM - 7 PM</span>
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

            {/* Field 7: Accurate Place Where Crops Are Sourced */}
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                    📍
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                      7. Accurate Crop Sourcing & Harvest Origin Place *
                    </label>
                    <p className="text-xs text-slate-500">
                      Specify exact farm / mandal / village from where you are bringing the produce
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePreFillProfile}
                  className="self-start sm:self-auto text-[11px] bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition shadow-xs flex items-center space-x-1"
                >
                  <span>📍 Auto-fill My Registered Farm Place</span>
                </button>
              </div>

              {/* District & Mandal Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Origin District (Telangana) *
                  </label>
                  <select
                    value={originDistrict}
                    onChange={(e) => setOriginDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  >
                    {TELANGANA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} District
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Mandal / Tehsil *
                  </label>
                  <input
                    type="text"
                    value={originMandal}
                    onChange={(e) => setOriginMandal(e.target.value)}
                    placeholder="e.g. Narsampet, Choppadandi, Armoor"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Village & Landmark / Survey No. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Village / Gram Panchayat *
                  </label>
                  <input
                    type="text"
                    value={originVillage}
                    onChange={(e) => setOriginVillage(e.target.value)}
                    placeholder="e.g. Maheshwaram, Rekurthi, Dharmaram"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Farm Gate / Survey No. / Landmark *
                  </label>
                  <input
                    type="text"
                    value={originLandmark}
                    onChange={(e) => setOriginLandmark(e.target.value)}
                    placeholder="e.g. Survey No. 48/B, Rythu Vedika Road"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Sourcing Type & PIN Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Produce Sourcing Source Type *
                  </label>
                  <select
                    value={originSourceType}
                    onChange={(e) => setOriginSourceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  >
                    <option value="Own Cultivated Land / Farm Gate">Own Farm / Harvest Field</option>
                    <option value="Leased Agricultural Land">Leased Agricultural Land</option>
                    <option value="FPO / Rythu Sangham Aggregation Point">FPO / Rythu Sangham Aggregation Point</option>
                    <option value="Village Post-Harvest Threshing Yard">Village Threshing Yard / Drying Platform</option>
                    <option value="Local APMC Market Yard / Rythu Bazaar">Local APMC Market Yard / Rythu Bazaar</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Postal PIN Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={originPincode}
                    onChange={(e) => setOriginPincode(e.target.value)}
                    placeholder="e.g. 506132"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm font-mono font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Interactive Visual Farm-to-Storage Transit Route Map */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center space-x-1.5">
                      <Navigation className="w-4 h-4 text-emerald-600" />
                      <span>Live Visual Transit Route & Road Corridor Map</span>
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Point A ➔ Point B
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800">
                    Est. Transit: ~{transitDistanceKm} km
                  </span>
                </div>

                <FarmToStorageRouteMap
                  originVillage={originVillage}
                  originMandal={originMandal}
                  originDistrict={originDistrict}
                  originLandmark={originLandmark}
                  originPincode={originPincode}
                  originSourceType={originSourceType}
                  facility={activeFacility}
                  vehicleType={vehicleType}
                  vehicleNumber={vehicleNumber}
                  distanceKm={transitDistanceKm}
                />
              </div>
            </div>

            {/* Submit Button for Mobile */}
            <div className="lg:hidden pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 hover:from-emerald-600 hover:to-teal-800 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'Reserving Slot...' : 'Confirm Slot & Generate Gate Token'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Live Tariff Breakdown & Instant Receipt Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Facility Highlights Card */}
            <div className="bg-white/95 backdrop-blur p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 card-hover-lift">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Chamber Spec Check
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-mono font-bold">
                  WDRA Certified
                </span>
              </div>

              <div>
                <h4 className="font-black text-slate-900 text-lg tracking-tight">{activeFacility?.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1 flex-shrink-0" />
                  {activeFacility?.district}, {activeFacility?.state}
                </p>
              </div>

              {/* Sourcing Origin Path chip */}
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-950 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center">
                  <MapPin className="w-3 h-3 text-emerald-600 mr-1 shrink-0" />
                  Produce Sourced From:
                </span>
                <p className="font-bold text-slate-900 truncate">
                  {originVillage}, {originMandal} ({originDistrict} Dist)
                </p>
                <p className="text-[10px] text-slate-600 truncate">
                  {originLandmark} • ~{transitDistanceKm} km road distance
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Chamber Temp</span>
                  <strong className="text-slate-800 font-mono text-sm">{activeFacility?.temperatureRange || '2°C - 4°C'}</strong>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Humidity RH</span>
                  <strong className="text-slate-800 font-mono text-sm">{activeFacility?.humidityRange || '85% - 90%'}</strong>
                </div>
              </div>
            </div>

            {/* Live Tariff Calculator & Cost Breakdown */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-emerald-900/60 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  Transparent Tariff Ledger
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 rounded-full font-mono font-bold">
                  Live Calculator
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-3.5 text-xs">
                {/* Per-crop itemized summary if multiple crops */}
                {bookedCrops.length > 1 && (
                  <div className="space-y-2 pb-3 border-b border-white/10">
                    <p className="text-[11px] font-bold uppercase text-emerald-300">
                      Produce Breakdown ({bookedCrops.length} Crops):
                    </p>
                    {resolvedBookedCrops.map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-slate-300 text-[11px]">
                        <span className="truncate pr-2">#{i + 1} {c.cropName} ({c.quantityQuintals} Qtl)</span>
                        <span className="font-mono text-emerald-200 shrink-0">₹{c.cropTariff.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-medium">Total Rent ({totalQuantityQuintals} Qtl × ₹{ratePerQtlMonth} × {expectedDurationMonths} mo)</span>
                  <span className="font-mono font-bold text-white">₹{storageTariff.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-medium">Weighbridge & Stacking Fee ({totalBagsCount} Bags × ₹{handlingFeePerBag})</span>
                  <span className="font-mono font-bold text-white">₹{handlingCharges.toLocaleString()}</span>
                </div>

                <div className="border-t border-white/10 pt-3.5 flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Total Estimated Storage Charges</span>
                  <span className="text-2xl font-black font-mono text-emerald-300">
                    ₹{totalEstimatedCost.toLocaleString()}
                  </span>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-emerald-200">25% Advance Payable at Gate Weighment</p>
                    <p className="text-[10px] text-slate-400">Remaining 75% settled upon produce release</p>
                  </div>
                  <span className="text-lg font-black font-mono text-amber-300">
                    ₹{advanceAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Bank Loan Subvention callout */}
              <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-2xl p-3.5 flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-100 leading-relaxed">
                  <strong>75% NABARD Pledge Loan Eligible:</strong> Once deposited, use your e-NWR receipt at any SBI / Andhra Bank branch for an instant credit loan without selling your crop.
                </p>
              </div>

              {/* Confirm Slot Button (Desktop) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-102 disabled:opacity-50 flex items-center justify-center space-x-2"
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
