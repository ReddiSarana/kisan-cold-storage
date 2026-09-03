import express from 'express';
import { cropsData, storageFacilities, initialBookings } from '../data/seedData.js';
import { queueService } from '../services/queueService.js';
import { smsService } from '../services/smsService.js';
import { DocxService } from '../services/docxService.js';

const router = express.Router();

// In-memory data store for live session
let bookings = [...initialBookings];
let facilities = [...storageFacilities];

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
    quantityQuintals,
    bagsCount,
    arrivalDate,
    expectedDurationMonths = 6,
    vehicleNumber,
    vehicleType
  } = req.body;

  if (!farmerName || !farmerPhone || !facilityId || !cropId || !quantityQuintals) {
    return res.status(400).json({ success: false, message: "Missing required fields for booking" });
  }

  const facility = facilities.find(f => f.id === facilityId);
  const crop = cropsData.find(c => c.id === cropId);

  const qty = Number(quantityQuintals);
  const duration = Number(expectedDurationMonths) || 6;
  const rate = facility ? facility.baseRatePerQuintalMonth : (crop?.avgTariffPerQuintalMonth || 40);
  const estimatedCostTotal = qty * rate * duration;
  const advancePaid = Math.round(estimatedCostTotal * 0.25);
  const balanceDue = estimatedCostTotal - advancePaid;

  const bookingId = `BK-2026-${Math.floor(100 + Math.random() * 900)}`;

  // Create queue token for arrival
  const token = queueService.generateToken({
    bookingId,
    farmerName,
    farmerPhone,
    vehicleNumber: vehicleNumber || "UP-80-AB-0000",
    cropName: crop ? crop.name : "Produce",
    quantityQuintals: qty,
    facilityId
  });

  const newBooking = {
    id: bookingId,
    farmerId: `farmer-${Date.now()}`,
    farmerName,
    farmerPhone,
    facilityId,
    facilityName: facility ? facility.name : "Cold Storage Hub",
    cropId,
    cropName: crop ? crop.name : cropId,
    quantityQuintals: qty,
    bagsCount: Number(bagsCount) || Math.round(qty * 2),
    bookingDate: new Date().toISOString().split("T")[0],
    arrivalDate: arrivalDate || new Date().toISOString().split("T")[0],
    expectedDurationMonths: duration,
    vehicleNumber: vehicleNumber || "Pending",
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
    facility.availableCapacityMT = Math.max(0, facility.availableCapacityMT - Math.round(qty / 10));
  }

  // Send Booking Confirmation SMS
  smsService.sendSms({
    recipientPhone: farmerPhone,
    recipientName: farmerName,
    type: "BOOKING_CONFIRMATION",
    message: `AgroVault: Namaste ${farmerName}! Booking ${bookingId} confirmed at ${facility?.name || "Cold Store"} for ${qty} Qtl ${crop?.name}. Token: ${token.tokenId}. Date: ${arrivalDate}.`
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
      message: `AgroVault: Produce safely deposited in ${booking.chamberAllocated}. Net Weight: ${booking.weighmentNetKg || (booking.quantityQuintals * 50)} Kg. e-NWR No: ${booking.eNwrNumber}.`
    });
  }

  res.json({ success: true, data: booking });
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

// --- SMS API ---
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

// --- DOCX GENERATION API ---
router.get('/documents/generate-docx', async (req, res) => {
  try {
    const { docType = "agreement", bookingId } = req.query;
    const booking = bookings.find(b => b.id === bookingId) || bookings[0];

    const facility = facilities.find(f => f.id === booking.facilityId) || facilities[0];

    let buffer;
    let filename = `AgroVault_${docType}_${booking.id}.docx`;

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
    const filename = `AgroVault_${docType}_${Date.now()}.docx`;

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

export default router;
