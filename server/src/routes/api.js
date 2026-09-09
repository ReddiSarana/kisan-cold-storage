import express from 'express';
import { cropsData, storageFacilities, initialBookings } from '../data/seedData.js';
import { queueService } from '../services/queueService.js';
import { smsService } from '../services/smsService.js';
import { DocxService } from '../services/docxService.js';
import { resolveGaaiaQuery, GAAIA_TOPICS, POPULAR_QUESTIONS } from '../services/gaaiaBrain.js';

const router = express.Router();

// In-memory data store for live session
let bookings = [...initialBookings];
let facilities = [...storageFacilities];
let payments = [
  {
    txnId: 'TXN-KV-88129031',
    bookingId: 'BK-2026-902',
    farmerName: 'K. Srinivas Reddy',
    farmerPhone: '+91 94250 67890',
    amount: 15000,
    paymentMode: 'kcc',
    paymentType: 'advance_25',
    status: 'SUCCESS',
    facilityName: 'Nizamabad Turmeric & Agri-Logistics Terminal',
    timestamp: '2026-09-02T11:50:00Z'
  },
  {
    txnId: 'TXN-KV-99410284',
    bookingId: 'BK-2026-903',
    farmerName: 'P. Venkataiah',
    farmerPhone: '+91 98881 22334',
    amount: 25000,
    paymentMode: 'upi',
    paymentType: 'advance_25',
    status: 'SUCCESS',
    facilityName: 'Telangana Seed Bowl Dehumidified Vault',
    timestamp: '2026-09-03T08:25:00Z'
  }
];

let transportFleet = [
  {
    id: 'tractor_trolley',
    name: 'Mahindra / Swaraj Agri Tractor Trolley',
    category: 'Tractor Trolley',
    capacityTons: 4.5,
    capacityBags: '90 - 120 Gunny Bags',
    perKmRate: 28,
    baseFare: 450,
    loadingHelperFee: 250,
    isRefrigerated: false,
    speedAvgKmph: 30,
    icon: '🚜'
  },
  {
    id: 'mini_truck',
    name: 'Mahindra Bolero Maxi Truck / Tata Ace Mega',
    category: 'Mini Pickup Truck',
    capacityTons: 2.2,
    capacityBags: '40 - 55 Bags / Crates',
    perKmRate: 32,
    baseFare: 550,
    loadingHelperFee: 200,
    isRefrigerated: false,
    speedAvgKmph: 55,
    icon: '🛻'
  },
  {
    id: 'medium_truck',
    name: 'Eicher Pro 2059XP (6-Wheeler Cargo)',
    category: 'Medium Commercial Truck',
    capacityTons: 7.5,
    capacityBags: '150 - 180 Bags',
    perKmRate: 42,
    baseFare: 800,
    loadingHelperFee: 400,
    isRefrigerated: false,
    speedAvgKmph: 50,
    icon: '🚚'
  },
  {
    id: 'reefer_van',
    name: 'Carrier Cold-Chain Reefer Van (Active Chill)',
    category: 'Refrigerated Cold Van',
    capacityTons: 5.0,
    capacityBags: '100 - 120 Crates',
    perKmRate: 52,
    baseFare: 1200,
    loadingHelperFee: 300,
    isRefrigerated: true,
    speedAvgKmph: 60,
    icon: '❄️'
  },
  {
    id: 'heavy_truck',
    name: 'Ashok Leyland 10-Wheeler Taurus Truck',
    category: 'Heavy Multi-Axle Truck',
    capacityTons: 16.0,
    capacityBags: '320 - 360 Bags',
    perKmRate: 64,
    baseFare: 1600,
    loadingHelperFee: 700,
    isRefrigerated: false,
    speedAvgKmph: 45,
    icon: '🚛'
  },
  {
    id: 'electric_cargo',
    name: 'Piaggio Ape E-City HD / Treo Zor EV',
    category: 'Electric Agri-Cargo 3W',
    capacityTons: 0.8,
    capacityBags: '15 - 20 Bags / Crates',
    perKmRate: 18,
    baseFare: 250,
    loadingHelperFee: 150,
    isRefrigerated: false,
    speedAvgKmph: 35,
    icon: '⚡'
  }
];

let transportDrivers = [
  {
    id: 'drv-01',
    name: 'G. Komuraiah',
    phone: '+91 98480 32114',
    photo: '👨🏽‍🌾',
    district: 'Warangal',
    baseLocation: 'Narsampet, Warangal Rural',
    vehicleModel: 'Mahindra 575 DI Tractor Trolley',
    vehiclePlate: 'TS-03-TR-8812',
    vehicleType: 'tractor_trolley',
    rating: 4.9,
    tripsCompleted: 342,
    isAvailable: true,
    transitRadiusKm: 45,
    etaMinutes: 20
  },
  {
    id: 'drv-02',
    name: 'K. Tirupati Rao',
    phone: '+91 97011 88452',
    photo: '👨🏽',
    district: 'Warangal',
    baseLocation: 'Enumamula APMC, Warangal',
    vehicleModel: 'Mahindra Bolero Maxi Truck HD',
    vehiclePlate: 'TS-03-UA-4421',
    vehicleType: 'mini_truck',
    rating: 4.8,
    tripsCompleted: 218,
    isAvailable: true,
    transitRadiusKm: 70,
    etaMinutes: 25
  },
  {
    id: 'drv-03',
    name: 'M. Ramesh Yadav',
    phone: '+91 99890 12563',
    photo: '🧔🏽',
    district: 'Nizamabad',
    baseLocation: 'Armoor Cross Road, Nizamabad',
    vehicleModel: 'Carrier Supra 750 Reefer Van',
    vehiclePlate: 'TS-16-RF-9011',
    vehicleType: 'reefer_van',
    rating: 4.95,
    tripsCompleted: 189,
    isAvailable: true,
    transitRadiusKm: 120,
    etaMinutes: 35
  },
  {
    id: 'drv-04',
    name: 'B. Sammaiah',
    phone: '+91 98661 77320',
    photo: '👨🏾‍🌾',
    district: 'Karimnagar',
    baseLocation: 'Choppadandi, Karimnagar',
    vehicleModel: 'Swaraj 855 FE Tractor Trolley',
    vehiclePlate: 'TS-02-TR-3390',
    vehicleType: 'tractor_trolley',
    rating: 4.7,
    tripsCompleted: 410,
    isAvailable: true,
    transitRadiusKm: 40,
    etaMinutes: 15
  },
  {
    id: 'drv-05',
    name: 'P. Ravinder Reddy',
    phone: '+91 94405 66782',
    photo: '👨🏽',
    district: 'Warangal',
    baseLocation: 'Wardhannapet, Warangal',
    vehicleModel: 'Eicher Pro 2059XP Cargo',
    vehiclePlate: 'TS-03-UB-7788',
    vehicleType: 'medium_truck',
    rating: 4.85,
    tripsCompleted: 265,
    isAvailable: true,
    transitRadiusKm: 90,
    etaMinutes: 30
  },
  {
    id: 'drv-06',
    name: 'Sk. Khaja Pasha',
    phone: '+91 99120 44558',
    photo: '👳🏽',
    district: 'Khammam',
    baseLocation: 'Sathupalli Road, Khammam',
    vehicleModel: 'Ashok Leyland 10-Wheeler Taurus',
    vehiclePlate: 'TS-04-TX-1029',
    vehicleType: 'heavy_truck',
    rating: 4.9,
    tripsCompleted: 380,
    isAvailable: true,
    transitRadiusKm: 180,
    etaMinutes: 45
  },
  {
    id: 'drv-07',
    name: 'Ch. Madhusudhan',
    phone: '+91 98492 33119',
    photo: '👨🏽',
    district: 'Warangal',
    baseLocation: 'Kazipet Market, Hanamkonda',
    vehicleModel: 'Piaggio Ape E-City HD EV Cargo',
    vehiclePlate: 'TS-03-EV-2024',
    vehicleType: 'electric_cargo',
    rating: 4.9,
    tripsCompleted: 145,
    isAvailable: true,
    transitRadiusKm: 25,
    etaMinutes: 10
  }
];

let transportRentals = [
  {
    rentalId: 'TR-2026-081',
    bookingId: 'BK-2026-902',
    farmerName: 'K. Srinivas Reddy',
    farmerPhone: '+91 94250 67890',
    vehicleType: 'tractor_trolley',
    vehicleName: 'Mahindra 575 DI Tractor Trolley',
    vehiclePlate: 'TS-03-TR-8812',
    driverName: 'G. Komuraiah',
    driverPhone: '+91 98480 32114',
    pickupLocation: 'Survey No. 42, Maheshwaram Village, Narsampet, Warangal',
    dropoffFacility: 'Kakatiya Mega Cold Chain Hub, Warangal',
    distanceKm: 24,
    produceName: 'Dry Red Chilli',
    quantityQuintals: 100,
    bagsCount: 200,
    pickupDate: '2026-09-08',
    pickupTimeSlot: 'Morning (07:00 AM - 09:00 AM)',
    baseFare: 450,
    distanceFare: 672,
    loadingFee: 250,
    grossFare: 1372,
    govSubsidy: 274,
    netFare: 1098,
    tripStatus: 'completed',
    waybillNumber: 'LR-TS-2026-09941',
    gateTokenNumber: 'TK-101',
    createdAt: '2026-09-08T06:30:00Z'
  },
  {
    rentalId: 'TR-2026-082',
    bookingId: 'BK-2026-903',
    farmerName: 'P. Venkataiah',
    farmerPhone: '+91 98881 22334',
    vehicleType: 'medium_truck',
    vehicleName: 'Eicher Pro 2059XP (6-Wheeler)',
    vehiclePlate: 'TS-03-UB-7788',
    driverName: 'P. Ravinder Reddy',
    driverPhone: '+91 94405 66782',
    pickupLocation: 'Farm Gate, Gangadhara Village, Karimnagar',
    dropoffFacility: 'Telangana Seed Bowl Dehumidified Vault, Karimnagar',
    distanceKm: 32,
    produceName: 'Certified Seed Paddy',
    quantityQuintals: 300,
    bagsCount: 600,
    pickupDate: '2026-09-08',
    pickupTimeSlot: 'Afternoon (01:00 PM - 03:00 PM)',
    baseFare: 800,
    distanceFare: 1344,
    loadingFee: 400,
    grossFare: 2544,
    govSubsidy: 508,
    netFare: 2036,
    tripStatus: 'in_transit',
    waybillNumber: 'LR-TS-2026-09942',
    gateTokenNumber: 'TK-103',
    createdAt: '2026-09-08T11:15:00Z'
  }
];



// --- CROPS API ---
router.get('/crops', (req, res) => {
  res.json({ success: true, data: cropsData });
});

// --- STORAGE FACILITIES API ---
router.get('/facilities', (req, res) => {
  const { crop, district, maxRate } = req.query;
  let filtered = facilities;

  if (crop) {
    filtered = filtered.filter(f => f.supportedCrops.includes(crop.toLowerCase()));
  }
  if (district) {
    filtered = filtered.filter(f => f.district.toLowerCase().includes(district.toLowerCase()));
  }
  if (maxRate) {
    filtered = filtered.filter(f => f.baseRatePerQuintalMonth <= Number(maxRate));
  }

  res.json({ success: true, data: filtered });
});

router.get('/facilities/:id', (req, res) => {
  const facility = facilities.find(f => f.id === req.params.id);
  if (!facility) return res.status(404).json({ success: false, message: "Facility not found" });
  res.json({ success: true, data: facility });
});

// --- BOOKINGS API ---
router.get('/bookings', (req, res) => {
  const { phone, facilityId } = req.query;
  let result = bookings;
  if (phone) {
    const clean = phone.replace(/\D/g, "");
    result = result.filter(b => b.farmerPhone.replace(/\D/g, "").includes(clean));
  }
  if (facilityId) {
    result = result.filter(b => b.facilityId === facilityId);
  }
  res.json({ success: true, data: result });
});

router.post('/bookings', (req, res) => {
  const {
    farmerName,
    farmerPhone,
    facilityId,
    cropId,
    cropName: incomingCropName,
    cropsList,
    quantityQuintals,
    bagsCount,
    arrivalDate,
    expectedDurationMonths = 6,
    vehicleNumber,
    vehicleType,
    originDistrict,
    originMandal,
    originVillage,
    originLandmark,
    originPincode,
    originSourceType,
    originAddress: incomingOriginAddress,
    originLocation: incomingOriginLocation
  } = req.body;

  if (!farmerName || !farmerPhone || !facilityId) {
    return res.status(400).json({ success: false, message: "Missing required fields for booking" });
  }

  const facility = facilities.find(f => f.id === facilityId);

  // Normalize multi-crop or single-crop produce items
  let resolvedCropsList = [];
  let totalQty = 0;
  let totalBags = 0;

  if (Array.isArray(cropsList) && cropsList.length > 0) {
    resolvedCropsList = cropsList.map(c => {
      const cropObj = cropsData.find(cd => cd.id === c.cropId);
      const q = Math.max(1, Number(c.quantityQuintals) || 0);
      const b = Number(c.bagsCount) || Math.round(q * 2);
      totalQty += q;
      totalBags += b;
      return {
        cropId: c.cropId,
        cropName: c.cropName || cropObj?.name || c.cropId,
        quantityQuintals: q,
        bagsCount: b
      };
    });
  } else {
    const q = Math.max(1, Number(quantityQuintals) || 100);
    const b = Number(bagsCount) || Math.round(q * 2);
    totalQty = q;
    totalBags = b;
    const cropObj = cropsData.find(cd => cd.id === cropId);
    resolvedCropsList = [{
      cropId: cropId || 'produce',
      cropName: incomingCropName || cropObj?.name || cropId || 'Agricultural Produce',
      quantityQuintals: q,
      bagsCount: b
    }];
  }

  const primaryCropId = resolvedCropsList[0]?.cropId || cropId || 'produce';
  const crop = cropsData.find(c => c.id === primaryCropId);
  const cropNamesSummary = incomingCropName || resolvedCropsList.map(c => c.cropName).join(', ');

  // Sourcing Place & Harvest Origin Details
  const resolvedOriginDistrict = originDistrict || "Warangal";
  const resolvedOriginVillage = originVillage || "Maheshwaram";
  const resolvedOriginMandal = originMandal || "Narsampet";
  const resolvedOriginLandmark = originLandmark || "Survey No. 48/B, Near Rythu Vedika";
  const resolvedOriginPincode = originPincode || "506132";
  const resolvedOriginSourceType = originSourceType || "Own Cultivated Land / Farm Gate";
  const originAddress = incomingOriginAddress || `${resolvedOriginVillage}, ${resolvedOriginMandal} Mandal, ${resolvedOriginDistrict} Dist - ${resolvedOriginPincode}`;
  const originLocation = incomingOriginLocation || {
    district: resolvedOriginDistrict,
    mandal: resolvedOriginMandal,
    village: resolvedOriginVillage,
    landmark: resolvedOriginLandmark,
    pincode: resolvedOriginPincode,
    sourceType: resolvedOriginSourceType
  };

  const duration = Number(expectedDurationMonths) || 6;
  const rate = facility ? facility.baseRatePerQuintalMonth : (crop?.avgTariffPerQuintalMonth || 40);
  const estimatedCostTotal = totalQty * rate * duration;
  const advancePaid = Math.round(estimatedCostTotal * 0.25);
  const balanceDue = estimatedCostTotal - advancePaid;

  const bookingId = `BK-2026-${Math.floor(100 + Math.random() * 900)}`;

  // Create queue token for arrival with origin location
  const token = queueService.generateToken({
    bookingId,
    farmerName,
    farmerPhone,
    vehicleNumber: vehicleNumber || "TS-03-BK-2026",
    cropName: cropNamesSummary,
    cropsList: resolvedCropsList,
    quantityQuintals: totalQty,
    facilityId,
    originAddress,
    originVillage: resolvedOriginVillage,
    originDistrict: resolvedOriginDistrict,
    originLocation
  });

  const newBooking = {
    id: bookingId,
    farmerId: `farmer-${Date.now()}`,
    farmerName,
    farmerPhone,
    facilityId,
    facilityName: facility ? facility.name : "Cold Storage Hub",
    cropId: primaryCropId,
    cropName: cropNamesSummary,
    cropsList: resolvedCropsList,
    quantityQuintals: totalQty,
    bagsCount: totalBags,
    originDistrict: resolvedOriginDistrict,
    originMandal: resolvedOriginMandal,
    originVillage: resolvedOriginVillage,
    originLandmark: resolvedOriginLandmark,
    originPincode: resolvedOriginPincode,
    originSourceType: resolvedOriginSourceType,
    originAddress,
    originLocation,
    bookingDate: new Date().toISOString().split("T")[0],
    arrivalDate: arrivalDate || new Date().toISOString().split("T")[0],
    expectedDurationMonths: duration,
    vehicleNumber: vehicleNumber || "TS-03-BK-2026",
    vehicleType: vehicleType || "Tractor Trolley",
    status: "confirmed",
    tokenNumber: token.tokenId,
    estimatedCostTotal,
    advancePaid,
    balanceDue,
    chamberAllocated: "Pending Arrival Inspection",
    weighmentGrossKg: null,
    weighmentTareKg: null,
    weighmentNetKg: null,
    qualityGrade: "Pending Inspection",
    eNwrNumber: null,
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);

  // Update facility available capacity
  if (facility) {
    facility.availableCapacityMT = Math.max(0, facility.availableCapacityMT - Math.round(totalQty / 10));
  }

  // Send Booking Confirmation SMS with sourcing place
  smsService.sendSms({
    recipientPhone: farmerPhone,
    recipientName: farmerName,
    type: "BOOKING_CONFIRMATION",
    message: `Krishivalaya: Namaste ${farmerName}! Booking ${bookingId} confirmed at ${facility?.name || "Cold Store"} for ${totalQty} Qtl (${cropNamesSummary}) sourced from ${resolvedOriginVillage}, ${resolvedOriginMandal} (${resolvedOriginDistrict} Dist). Token: ${token.tokenId}. Date: ${arrivalDate || newBooking.arrivalDate}.`
  });

  res.status(201).json({ success: true, data: newBooking, token });
});

// Update booking status (weighment, grading, payment)
router.patch('/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

  const {
    status,
    weighmentGrossKg,
    weighmentTareKg,
    qualityGrade,
    chamberAllocated,
    advancePaid,
    balanceDue,
    eNwrNumber
  } = req.body;

  if (status) booking.status = status;
  if (chamberAllocated) booking.chamberAllocated = chamberAllocated;
  if (qualityGrade) booking.qualityGrade = qualityGrade;
  if (advancePaid !== undefined) booking.advancePaid = advancePaid;
  if (balanceDue !== undefined) booking.balanceDue = balanceDue;

  if (weighmentGrossKg !== undefined) booking.weighmentGrossKg = Number(weighmentGrossKg);
  if (weighmentTareKg !== undefined) {
    booking.weighmentTareKg = Number(weighmentTareKg);
    if (booking.weighmentGrossKg) {
      booking.weighmentNetKg = booking.weighmentGrossKg - booking.weighmentTareKg;
    }
  }

  if (eNwrNumber) {
    booking.eNwrNumber = eNwrNumber;
  } else if (booking.status === "stored" && !booking.eNwrNumber) {
    booking.eNwrNumber = `ENWR-${Date.now().toString().slice(-6)}`;
  }

  // If status is stored, notify farmer
  if (status === "stored") {
    smsService.sendSms({
      recipientPhone: booking.farmerPhone,
      recipientName: booking.farmerName,
      type: "STORED_CONFIRMATION",
      message: `Krishivalaya: Produce safely deposited in ${booking.chamberAllocated}. Net Weight: ${booking.weighmentNetKg || (booking.quantityQuintals * 50)} Kg. e-NWR No: ${booking.eNwrNumber}.`
    });
  }

  res.json({ success: true, data: booking });
});

// --- PAYMENTS API ---
router.get('/payments', (req, res) => {
  const { bookingId, phone } = req.query;
  let result = payments;
  if (bookingId) {
    result = result.filter(p => p.bookingId === bookingId);
  }
  if (phone) {
    const clean = phone.replace(/\D/g, "");
    result = result.filter(p => p.farmerPhone.replace(/\D/g, "").includes(clean));
  }
  res.json({ success: true, data: result });
});

router.post('/payments', (req, res) => {
  const {
    bookingId,
    farmerName,
    farmerPhone,
    amount,
    paymentMode, // 'upi', 'kcc', 'netbanking', 'gate_cash', 'escrow_pledge'
    paymentType, // 'advance_25', 'full', 'balance'
    facilityName,
    referenceDetails
  } = req.body;

  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ success: false, message: "Valid payment amount is required" });
  }

  const numAmount = Number(amount);
  const txnId = `TXN-KV-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const newPayment = {
    txnId,
    bookingId: bookingId || `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
    farmerName: farmerName || 'Valued Farmer',
    farmerPhone: farmerPhone || '+91 98765 12345',
    amount: numAmount,
    paymentMode: paymentMode || 'upi',
    paymentType: paymentType || 'advance_25',
    facilityName: facilityName || 'Kakatiya Mega Cold Chain Hub',
    status: 'SUCCESS',
    referenceDetails: referenceDetails || {},
    timestamp: new Date().toISOString()
  };

  payments.unshift(newPayment);

  // Update booking record if found
  const relatedBooking = bookings.find(b => b.id === bookingId);
  if (relatedBooking) {
    relatedBooking.advancePaid = (relatedBooking.advancePaid || 0) + numAmount;
    relatedBooking.balanceDue = Math.max(0, (relatedBooking.estimatedCostTotal || relatedBooking.advancePaid) - relatedBooking.advancePaid);
    relatedBooking.paymentStatus = relatedBooking.balanceDue === 0 ? 'fully_paid' : 'advance_paid';
    if (!relatedBooking.payments) relatedBooking.payments = [];
    relatedBooking.payments.push(newPayment);
  }

  // Real-time SMS Confirmation Alert to Farmer
  const modeLabels = {
    upi: 'UPI / QR Scan',
    kcc: 'Kisan Credit Card (KCC)',
    netbanking: 'Agri NetBanking',
    gate_cash: 'Gate Counter Cash',
    escrow_pledge: 'e-NWR NABARD Escrow'
  };
  const modeText = modeLabels[paymentMode] || (paymentMode ? paymentMode.toUpperCase() : 'UPI');

  smsService.sendSms({
    recipientPhone: newPayment.farmerPhone,
    recipientName: newPayment.farmerName,
    type: 'PAYMENT_CONFIRMATION',
    message: `Krishivalaya: Namaste ${newPayment.farmerName}! Payment of ₹${numAmount.toLocaleString()} received via ${modeText} for Booking ${newPayment.bookingId}. Txn ID: ${txnId}. Cold chamber reservation deposit confirmed.`
  });

  res.status(201).json({ success: true, data: newPayment, transaction: newPayment });
});

// --- TRANSPORT RENTAL API ---
router.get('/transport/fleet', (req, res) => {
  res.json({ success: true, data: transportFleet });
});

router.get('/transport/drivers', (req, res) => {
  const { district, vehicleType } = req.query;
  let result = transportDrivers;
  if (district) {
    result = result.filter(d => d.district.toLowerCase() === district.toLowerCase());
  }
  if (vehicleType) {
    result = result.filter(d => d.vehicleType === vehicleType);
  }
  res.json({ success: true, data: result });
});

router.get('/transport/rentals', (req, res) => {
  const { phone, bookingId } = req.query;
  let result = transportRentals;
  if (phone) {
    const clean = phone.replace(/\D/g, '');
    result = result.filter(r => r.farmerPhone.replace(/\D/g, '').includes(clean));
  }
  if (bookingId) {
    result = result.filter(r => r.bookingId === bookingId);
  }
  res.json({ success: true, data: result });
});

router.post('/transport/rentals', (req, res) => {
  const {
    bookingId,
    farmerName,
    farmerPhone,
    vehicleType,
    driverId,
    pickupLocation,
    dropoffFacility,
    distanceKm = 25,
    produceName = 'Agricultural Produce',
    quantityQuintals = 100,
    bagsCount = 200,
    pickupDate,
    pickupTimeSlot = 'Morning (07:00 AM - 09:00 AM)',
    needHelpers = true,
    gateTokenNumber
  } = req.body;

  if (!farmerName || !farmerPhone) {
    return res.status(400).json({ success: false, message: 'Farmer name and phone are required' });
  }

  const vehicle = transportFleet.find(v => v.id === vehicleType) || transportFleet[0];
  const driver = transportDrivers.find(d => d.id === driverId) || transportDrivers.find(d => d.vehicleType === vehicle.id) || transportDrivers[0];

  const km = Math.max(1, Number(distanceKm) || 20);
  const baseFare = vehicle.baseFare || 450;
  const distanceFare = (vehicle.perKmRate || 28) * km;
  const loadingFee = needHelpers ? (vehicle.loadingHelperFee || 250) : 0;
  const grossFare = baseFare + distanceFare + loadingFee;
  const govSubsidy = Math.round(grossFare * 0.20); // 20% Rythu Bandhu logistics subvention
  const netFare = grossFare - govSubsidy;

  const rentalId = `TR-2026-${Math.floor(100 + Math.random() * 900)}`;
  const waybillNumber = `LR-TS-2026-${Math.floor(10000 + Math.random() * 90000)}`;

  const newRental = {
    rentalId,
    bookingId: bookingId || `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
    farmerName,
    farmerPhone,
    vehicleType: vehicle.id,
    vehicleName: vehicle.name,
    vehiclePlate: driver.vehiclePlate || 'TS-03-TR-8812',
    driverId: driver.id,
    driverName: driver.name,
    driverPhone: driver.phone,
    pickupLocation: pickupLocation || 'Farm Gate, Warangal',
    dropoffFacility: dropoffFacility || 'Kakatiya Mega Cold Chain Hub, Warangal',
    distanceKm: km,
    produceName,
    quantityQuintals: Number(quantityQuintals) || 100,
    bagsCount: Number(bagsCount) || 200,
    pickupDate: pickupDate || new Date().toISOString().split('T')[0],
    pickupTimeSlot,
    baseFare,
    distanceFare,
    loadingFee,
    grossFare,
    govSubsidy,
    netFare,
    tripStatus: 'assigned',
    waybillNumber,
    gateTokenNumber: gateTokenNumber || 'TK-108',
    createdAt: new Date().toISOString()
  };

  transportRentals.unshift(newRental);

  // Send real-time dispatch SMS alert
  smsService.sendSms({
    recipientPhone: farmerPhone,
    recipientName: farmerName,
    type: 'TRANSPORT_DISPATCH',
    message: `Krishivalaya Transport: Namaste ${farmerName}! ${vehicle.name} reserved for ${newRental.pickupDate} (${pickupTimeSlot}). Driver: ${driver.name} (${driver.phone}). Pickup from: ${newRental.pickupLocation}. Subsidized Net Fare: ₹${netFare.toLocaleString()}. LR Waybill: ${waybillNumber}.`
  });

  res.status(201).json({ success: true, data: newRental, waybill: newRental });
});

// --- QUEUE API ---
router.get('/queue', (req, res) => {
  res.json({ success: true, data: queueService.getQueue(req.query.facilityId) });
});

router.post('/queue/tokens', (req, res) => {
  const token = queueService.generateToken(req.body);
  res.status(201).json({ success: true, data: token });
});

router.patch('/queue/tokens/:tokenId', (req, res) => {
  const { status, assignedBay } = req.body;
  const updated = queueService.updateTokenStatus(req.params.tokenId, status, assignedBay);
  if (!updated) return res.status(404).json({ success: false, message: "Token not found" });

  // If status is completed or weighing, also update booking
  const relatedBooking = bookings.find(b => b.tokenNumber === req.params.tokenId);
  if (relatedBooking) {
    if (status === "weighing") relatedBooking.status = "in_yard";
    if (status === "unloading") relatedBooking.status = "in_progress";
    if (status === "completed") relatedBooking.status = "stored";
  }

  res.json({ success: true, data: updated });
});

router.post('/queue/call-next', (req, res) => {
  const { assignedBay, facilityId } = req.body;
  const token = queueService.callNextToBay(assignedBay || "Bay 1", facilityId);
  if (!token) {
    return res.status(404).json({ success: false, message: "No waiting tokens available in the queue." });
  }
  res.json({ success: true, data: token });
});

// --- SMS & OTP AUTH API ---
router.get('/sms/logs', (req, res) => {
  res.json({ success: true, data: smsService.getAllLogs(req.query.phone) });
});

router.post('/sms/send', async (req, res) => {
  const { recipientPhone, recipientName, message, type } = req.body;
  if (!recipientPhone || !message) {
    return res.status(400).json({ success: false, message: "recipientPhone and message are required" });
  }
  const entry = await smsService.sendSms({ recipientPhone, recipientName, message, type });
  res.status(201).json({ success: true, data: entry });
});

// Send OTP via Real Cellular SMS (Twilio Verify) or Simulator
const handleSendOtp = async (req, res) => {
  try {
    const { phone, name } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }
    const result = await smsService.sendOtp({ phone, name });
    res.status(200).json(result);
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify OTP submitted by user
const handleVerifyOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) {
      return res.status(400).json({ success: false, message: "Phone and code are required" });
    }
    const result = await smsService.verifyOtp({ phone, code });
    if (result.verified) {
      res.status(200).json({ success: true, ...result });
    } else {
      res.status(400).json({ success: false, ...result });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

router.post('/auth/send-otp', handleSendOtp);
router.post('/send-otp', handleSendOtp);
router.post('/auth/verify-otp', handleVerifyOtp);
router.post('/verify-otp', handleVerifyOtp);


// --- DOCX GENERATION API ---
router.get('/documents/generate-docx', async (req, res) => {
  try {
    const { docType = "agreement", bookingId } = req.query;
    const booking = bookings.find(b => b.id === bookingId) || bookings[0];

    const facility = facilities.find(f => f.id === booking.facilityId) || facilities[0];

    let buffer;
    let filename = `Krishivalaya_${docType}_${booking.id}.docx`;

    const payload = {
      ...booking,
      facilityLocation: `${facility.location}, ${facility.district}`,
      monthlyTariffPerQuintal: facility.baseRatePerQuintalMonth
    };

    if (docType === "agreement") {
      buffer = await DocxService.generateStorageAgreement(payload);
    } else if (docType === "enwr") {
      buffer = await DocxService.generateEnwrReceipt(payload);
    } else if (docType === "gate_pass") {
      buffer = await DocxService.generateGatePass({
        ...payload,
        tokenId: booking.tokenNumber || "TK-101",
        assignedBay: "Bay 2"
      });
    } else {
      buffer = await DocxService.generateStorageAgreement(payload);
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (err) {
    console.error("DOCX generation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Post endpoint for custom data generation
router.post('/documents/generate-docx', async (req, res) => {
  try {
    const { docType = "agreement", ...customData } = req.body;
    let buffer;
    const filename = `Krishivalaya_${docType}_${Date.now()}.docx`;

    if (docType === "agreement") {
      buffer = await DocxService.generateStorageAgreement(customData);
    } else if (docType === "enwr") {
      buffer = await DocxService.generateEnwrReceipt(customData);
    } else if (docType === "gate_pass") {
      buffer = await DocxService.generateGatePass(customData);
    } else {
      buffer = await DocxService.generateStorageAgreement(customData);
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (err) {
    console.error("DOCX custom generation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- NATIVE REGIONAL TTS AUDIO STREAMING API ---
import https from 'https';

router.get('/tts', (req, res) => {
  try {
    const { text, lang = 'te' } = req.query;
    if (!text || !text.trim()) {
      return res.status(400).send("Text parameter is required");
    }

    // Auto-detect script if text contains Telugu, Devanagari, or other regional characters
    let detectedLang = lang;
    if (/[\u0C00-\u0C7F]/.test(text)) {
      detectedLang = 'te'; // Telugu
    } else if (/[\u0900-\u097F]/.test(text)) {
      detectedLang = 'hi'; // Hindi
    } else if (/[\u0B80-\u0BFF]/.test(text)) {
      detectedLang = 'ta'; // Tamil
    } else if (/[\u0C80-\u0CFF]/.test(text)) {
      detectedLang = 'kn'; // Kannada
    } else if (/[\u0D00-\u0D7F]/.test(text)) {
      detectedLang = 'ml'; // Malayalam
    } else if (/[\u0A80-\u0AFF]/.test(text)) {
      detectedLang = 'gu'; // Gujarati
    } else if (/[\u0980-\u09FF]/.test(text)) {
      detectedLang = 'bn'; // Bengali
    }

    const encodedText = encodeURIComponent(text.slice(0, 250).trim());
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${detectedLang}&client=tw-ob&q=${encodedText}`;

    https.get(googleTtsUrl, (ttsRes) => {
      res.setHeader('Content-Type', ttsRes.headers['content-type'] || 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      ttsRes.pipe(res);
    }).on('error', (err) => {
      console.error("TTS Stream Error:", err);
      res.status(500).send("TTS generation failed");
    });
  } catch (err) {
    console.error("TTS handler error:", err);
    res.status(500).send("TTS error");
  }
});

// ----------------------------------------------------
// GAAIA - Agricultural AI Assistant Endpoints
// ----------------------------------------------------

// Get available topics & popular sample questions
router.get('/gaaia/topics', (req, res) => {
  try {
    res.json({
      success: true,
      topics: GAAIA_TOPICS,
      popularQuestions: POPULAR_QUESTIONS
    });
  } catch (err) {
    console.error('Error fetching GAAIA topics:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch topics' });
  }
});

// Ask GAAIA a question
router.post('/gaaia/ask', (req, res) => {
  try {
    const { question, lang = 'en', context = {} } = req.body || {};
    const result = resolveGaaiaQuery(question, lang, context);

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result
    });
  } catch (err) {
    console.error('Error in GAAIA ask endpoint:', err);
    res.status(500).json({
      success: false,
      error: 'GAAIA encountered an error processing your query',
      answer: 'I apologize, an error occurred while processing your question. Please try again or call our Kisan Helpline at 1800-180-1551.'
    });
  }
});

export default router;
