// API Client with automatic fallback for standalone GitHub Pages static deployment
import {
  fallbackCrops,
  fallbackFacilities,
  fallbackBookings,
  fallbackQueue,
  fallbackSms
} from '../data/mockData';

const BASE_URL = '/api';

// In-memory fallback stores for static hosting
let localBookings = [...fallbackBookings];
let localQueue = [...fallbackQueue];
let localSms = [...fallbackSms];

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
      senderId: 'AGROVAULT',
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
      senderId: 'AGROVAULT',
      type: smsData.type || 'GENERAL',
      message: smsData.message,
      status: 'DELIVERED',
      timestamp: new Date().toISOString()
    };
    localSms.unshift(entry);
    return { success: true, data: entry };
  }
}

export function getDocxDownloadUrl(docType, bookingId) {
  return `${BASE_URL}/documents/generate-docx?docType=${encodeURIComponent(docType)}&bookingId=${encodeURIComponent(bookingId || '')}`;
}
