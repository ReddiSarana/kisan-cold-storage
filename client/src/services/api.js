import {
  fallbackCrops,
  fallbackFacilities,
  fallbackBookings,
  fallbackQueue,
  fallbackSms
} from '../data/mockData';
import {
  transportFleetData,
  verifiedDrivers,
  initialTransportRentals
} from '../data/transportData';

const BASE_URL = '/api';

// In-memory fallback stores for static hosting
let localBookings = [...fallbackBookings];
let localQueue = [...fallbackQueue];
let localSms = [...fallbackSms];
let localRentals = [...initialTransportRentals];

export async function fetchCrops() {
  try {
    const res = await fetch(`${BASE_URL}/crops`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || fallbackCrops;
  } catch (err) {
    return fallbackCrops;
  }
}

export async function fetchFacilities(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/facilities?${query}`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || fallbackFacilities;
  } catch (err) {
    return fallbackFacilities;
  }
}

export async function fetchFacilityById(id) {
  try {
    const res = await fetch(`${BASE_URL}/facilities/${id}`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data;
  } catch (err) {
    return fallbackFacilities.find(f => f.id === id) || fallbackFacilities[0];
  }
}

export async function fetchBookings(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/bookings?${query}`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || localBookings;
  } catch (err) {
    return localBookings;
  }
}

export async function createBooking(bookingData) {
  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('API unavailable');
    return await res.json();
  } catch (err) {
    // Client-side simulation
    const tokenId = `TK-${100 + localQueue.length + 1}`;
    const cropNameDisplay = bookingData.cropName || (bookingData.cropsList ? bookingData.cropsList.map(c => c.cropName || c.cropId).join(', ') : bookingData.cropId);
    const totalQty = Number(bookingData.quantityQuintals) || 100;
    const totalBags = Number(bookingData.bagsCount) || totalQty * 2;

    const originAddress = bookingData.originAddress || `${bookingData.originVillage || 'Maheshwaram'}, ${bookingData.originMandal || 'Narsampet'} (${bookingData.originDistrict || 'Warangal'} Dist)`;

    const newBooking = {
      id: `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
      farmerName: bookingData.farmerName,
      farmerPhone: bookingData.farmerPhone,
      facilityId: bookingData.facilityId,
      cropId: bookingData.cropId,
      cropName: cropNameDisplay,
      cropsList: bookingData.cropsList || null,
      quantityQuintals: totalQty,
      bagsCount: totalBags,
      originDistrict: bookingData.originDistrict || 'Warangal',
      originMandal: bookingData.originMandal || 'Narsampet',
      originVillage: bookingData.originVillage || 'Maheshwaram',
      originLandmark: bookingData.originLandmark || 'Survey No. 48/B, Near Rythu Vedika',
      originPincode: bookingData.originPincode || '506132',
      originSourceType: bookingData.originSourceType || 'Own Cultivated Land / Farm Gate',
      originAddress,
      originLocation: bookingData.originLocation || null,
      arrivalDate: bookingData.arrivalDate,
      vehicleNumber: bookingData.vehicleNumber || 'TS-03-BK-2026',
      status: 'confirmed',
      tokenNumber: tokenId,
      estimatedCostTotal: totalQty * 40 * (bookingData.expectedDurationMonths || 6),
      advancePaid: Math.round(totalQty * 40 * 1.5),
      balanceDue: Math.round(totalQty * 40 * 4.5),
      chamberAllocated: 'Chamber 2 - Bay 1'
    };
    localBookings.unshift(newBooking);

    const token = {
      tokenId,
      farmerName: bookingData.farmerName,
      farmerPhone: bookingData.farmerPhone,
      vehicleNumber: bookingData.vehicleNumber || 'TS-03-BK-2026',
      cropName: cropNameDisplay,
      cropsList: bookingData.cropsList || null,
      originAddress,
      originVillage: bookingData.originVillage || 'Maheshwaram',
      originDistrict: bookingData.originDistrict || 'Warangal',
      quantityQuintals: totalQty,
      status: 'waiting',
      estimatedWaitMins: 20
    };
    localQueue.push(token);

    // Add SMS
    localSms.unshift({
      id: `sms-${Date.now()}`,
      recipientPhone: bookingData.farmerPhone,
      recipientName: bookingData.farmerName,
      senderId: 'KRISHIVALAYA',
      type: 'BOOKING_CONFIRMATION',
      message: `Namaste ${bookingData.farmerName}! Booking confirmed for ${totalQty} Qtl (${cropNameDisplay}) sourced from ${bookingData.originVillage || 'Maheshwaram'} (${bookingData.originDistrict || 'Warangal'} Dist). Token: ${tokenId}. Please report with vehicle.`,
      status: 'DELIVERED',
      timestamp: new Date().toISOString()
    });

    return { success: true, data: newBooking, token };
  }
}

export async function updateBooking(bookingId, updates) {
  try {
    const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('API unavailable');
    return await res.json();
  } catch (err) {
    const found = localBookings.find(b => b.id === bookingId);
    if (found) {
      Object.assign(found, updates);
      return { success: true, data: found };
    }
    return { success: false };
  }
}

export async function fetchQueue(facilityId = '') {
  try {
    const url = facilityId ? `${BASE_URL}/queue?facilityId=${facilityId}` : `${BASE_URL}/queue`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || localQueue;
  } catch (err) {
    return localQueue;
  }
}

export async function updateTokenStatus(tokenId, status, assignedBay = null) {
  try {
    const res = await fetch(`${BASE_URL}/queue/tokens/${tokenId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, assignedBay })
    });
    if (!res.ok) throw new Error('API unavailable');
    return await res.json();
  } catch (err) {
    const t = localQueue.find(x => x.tokenId === tokenId);
    if (t) {
      t.status = status;
      if (assignedBay) t.assignedBay = assignedBay;
      return { success: true, data: t };
    }
    return { success: false };
  }
}

export async function callNextToken(assignedBay = 'Bay 1', facilityId = 'cs-agra-01') {
  try {
    const res = await fetch(`${BASE_URL}/queue/call-next`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedBay, facilityId })
    });
    if (!res.ok) throw new Error('API unavailable');
    return await res.json();
  } catch (err) {
    const waiting = localQueue.find(x => x.status === 'waiting');
    if (waiting) {
      waiting.status = 'called';
      waiting.assignedBay = assignedBay;
      return { success: true, data: waiting };
    }
    return { success: false, message: 'No waiting tokens.' };
  }
}

export async function fetchSmsLogs(phone = '') {
  try {
    const url = phone ? `${BASE_URL}/sms/logs?phone=${encodeURIComponent(phone)}` : `${BASE_URL}/sms/logs`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || localSms;
  } catch (err) {
    return localSms;
  }
}

export async function sendSms(smsData) {
  try {
    const res = await fetch(`${BASE_URL}/sms/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(smsData)
    });
    if (!res.ok) throw new Error('API unavailable');
    return await res.json();
  } catch (err) {
    const entry = {
      id: `sms-${Date.now()}`,
      recipientPhone: smsData.recipientPhone,
      recipientName: smsData.recipientName || 'Farmer',
      senderId: 'KRISHIVALAYA',
      type: smsData.type || 'GENERAL',
      message: smsData.message,
      status: 'DELIVERED',
      timestamp: new Date().toISOString()
    };
    localSms.unshift(entry);
    return { success: true, data: entry };
  }
}

export async function sendOtp(phone, name = 'Farmer') {
  try {
    const res = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, name })
    });
    return await res.json();
  } catch (err) {
    // Fallback simulation
    const dummyOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localSms.unshift({
      id: `sms-${Date.now()}`,
      recipientPhone: phone,
      recipientName: name,
      senderId: 'KRISHIVALAYA',
      type: 'OTP_VERIFICATION',
      message: `Your Krishivalaya verification code is ${dummyOtp}. Valid for 10 minutes.`,
      status: 'DELIVERED',
      timestamp: new Date().toISOString()
    });
    return {
      success: true,
      method: 'SESSION_OTP',
      otp: dummyOtp,
      message: `Offline verification code generated: ${dummyOtp}`
    };
  }
}

export async function verifyOtp(phone, code) {
  try {
    const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code })
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Could not connect to verification server. Please ensure backend is running.' };
  }
}


export function getDocxDownloadUrl(docType, bookingId) {
  return `${BASE_URL}/documents/generate-docx?docType=${encodeURIComponent(docType)}&bookingId=${encodeURIComponent(bookingId || '')}`;
}

export async function processPayment(paymentData) {
  try {
    const res = await fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
    if (!res.ok) throw new Error('Payment API request failed');
    return await res.json();
  } catch (err) {
    console.warn('Payment API offline fallback simulation:', err);
    // Offline / GitHub Pages fallback simulation
    const txnId = `TXN-KV-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newPayment = {
      txnId,
      bookingId: paymentData.bookingId || `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
      farmerName: paymentData.farmerName || 'Valued Farmer',
      farmerPhone: paymentData.farmerPhone || '+91 98765 12345',
      amount: Number(paymentData.amount) || 2500,
      paymentMode: paymentData.paymentMode || 'upi',
      paymentType: paymentData.paymentType || 'advance_25',
      facilityName: paymentData.facilityName || 'Kakatiya Mega Cold Chain Hub',
      status: 'SUCCESS',
      referenceDetails: paymentData.referenceDetails || {},
      timestamp: new Date().toISOString()
    };
    return { success: true, data: newPayment, transaction: newPayment };
  }
}

export async function fetchPayments(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/payments?${query}`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    return [];
  }
}

export async function fetchTransportFleet() {
  try {
    const res = await fetch(`${BASE_URL}/transport/fleet`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || transportFleetData;
  } catch (err) {
    return transportFleetData;
  }
}

export async function fetchTransportDrivers(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/transport/drivers?${query}`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || verifiedDrivers;
  } catch (err) {
    return verifiedDrivers;
  }
}

export async function fetchTransportRentals(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/transport/rentals?${query}`);
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    return data.data || localRentals;
  } catch (err) {
    return localRentals;
  }
}

export async function bookTransportRental(rentalData) {
  try {
    const res = await fetch(`${BASE_URL}/transport/rentals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rentalData)
    });
    if (!res.ok) throw new Error('Transport API request failed');
    return await res.json();
  } catch (err) {
    console.warn('Transport rental API fallback simulation:', err);
    const vehicle = transportFleetData.find(v => v.id === rentalData.vehicleType) || transportFleetData[0];
    const driver = verifiedDrivers.find(d => d.id === rentalData.driverId) || verifiedDrivers[0];
    const km = Math.max(1, Number(rentalData.distanceKm) || 20);
    const baseFare = vehicle.baseFare || 450;
    const distanceFare = (vehicle.perKmRate || 28) * km;
    const loadingFee = rentalData.needHelpers ? (vehicle.loadingHelperFee || 250) : 0;
    const grossFare = baseFare + distanceFare + loadingFee;
    const govSubsidy = Math.round(grossFare * 0.20);
    const netFare = grossFare - govSubsidy;

    const rentalId = `TR-2026-${Math.floor(100 + Math.random() * 900)}`;
    const waybillNumber = `LR-TS-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newRental = {
      rentalId,
      bookingId: rentalData.bookingId || `BK-2026-${Math.floor(100 + Math.random() * 900)}`,
      farmerName: rentalData.farmerName || 'Farmer',
      farmerPhone: rentalData.farmerPhone || '+91 98765 12345',
      vehicleType: vehicle.id,
      vehicleName: vehicle.name,
      vehiclePlate: driver.vehiclePlate,
      driverId: driver.id,
      driverName: driver.name,
      driverPhone: driver.phone,
      pickupLocation: rentalData.pickupLocation || 'Farm Gate',
      dropoffFacility: rentalData.dropoffFacility || 'Kakatiya Mega Cold Chain Hub',
      distanceKm: km,
      produceName: rentalData.produceName || 'Produce',
      quantityQuintals: Number(rentalData.quantityQuintals) || 100,
      bagsCount: Number(rentalData.bagsCount) || 200,
      pickupDate: rentalData.pickupDate || new Date().toISOString().split('T')[0],
      pickupTimeSlot: rentalData.pickupTimeSlot || 'Morning (07:00 AM - 09:00 AM)',
      baseFare,
      distanceFare,
      loadingFee,
      grossFare,
      govSubsidy,
      netFare,
      tripStatus: 'assigned',
      waybillNumber,
      gateTokenNumber: rentalData.gateTokenNumber || 'TK-108',
      createdAt: new Date().toISOString()
    };

    localRentals.unshift(newRental);
    return { success: true, data: newRental, waybill: newRental };
  }
}



