// Real-Time Yard Queue & Token Management Service
import { initialQueueTokens } from '../data/seedData.js';
import { smsService } from './smsService.js';

class QueueService {
  constructor() {
    this.tokens = [...initialQueueTokens];
    this.nextSeq = 106;
  }

  getQueue(facilityId = null) {
    let list = this.tokens;
    if (facilityId) {
      list = list.filter(t => t.facilityId === facilityId);
    }
    // Sort: active/called first, then waiting, then completed
    const order = { unloading: 1, called: 2, weighing: 3, waiting: 4, completed: 5 };
    return list.sort((a, b) => (order[a.status] || 99) - (order[b.status] || 99));
  }

  generateToken({ bookingId, farmerName, farmerPhone, vehicleNumber, cropName, cropsList, quantityQuintals, facilityId }) {
    const tokenId = `TK-${this.nextSeq++}`;
    const token = {
      tokenId,
      bookingId: bookingId || `BK-${Date.now()}`,
      farmerName: farmerName || "Farmer",
      farmerPhone: farmerPhone || "+91 98765 00000",
      vehicleNumber: vehicleNumber || "TS-03-BK-2026",
      cropName: cropName || "Produce",
      cropsList: cropsList || null,
      quantityQuintals: Number(quantityQuintals) || 100,
      facilityId: facilityId || "cs-telangana-01",
      status: "waiting",
      assignedBay: null,
      estimatedWaitMins: Math.max(15, (this.tokens.filter(t => t.status === "waiting").length + 1) * 20),
      calledAt: null,
      dockedAt: null,
      createdAt: new Date().toISOString()
    };

    this.tokens.push(token);

    // Send SMS Notification
    smsService.sendSms({
      recipientPhone: token.farmerPhone,
      recipientName: token.farmerName,
      type: "QUEUE_TOKEN_ISSUED",
      message: `Namaste ${token.farmerName}! Your Gate Entry Token is ${tokenId} for ${token.quantityQuintals} Qtl ${token.cropName}. Est wait: ~${token.estimatedWaitMins} mins. Please wait in Holding Yard.`
    });

    smsService.broadcastEvent("QUEUE_UPDATED", this.getQueue());
    return token;
  }

  updateTokenStatus(tokenId, newStatus, assignedBay = null) {
    const token = this.tokens.find(t => t.tokenId === tokenId);
    if (!token) return null;

    token.status = newStatus;
    if (assignedBay) token.assignedBay = assignedBay;

    if (newStatus === "called") {
      token.calledAt = new Date().toISOString();
      token.estimatedWaitMins = 0;
      // Send urgent SMS
      smsService.sendSms({
        recipientPhone: token.farmerPhone,
        recipientName: token.farmerName,
        type: "QUEUE_CALL",
        message: `PRIORITY ALERT: Token ${token.tokenId}! Farmer ${token.farmerName}, please proceed vehicle ${token.vehicleNumber} to ${token.assignedBay || "Unloading Bay 1"} immediately.`
      });
    } else if (newStatus === "weighing") {
      token.dockedAt = new Date().toISOString();
      smsService.sendSms({
        recipientPhone: token.farmerPhone,
        recipientName: token.farmerName,
        type: "WEIGHMENT_ALERT",
        message: `Token ${token.tokenId}: Vehicle on weighbridge. Gross weight recording in progress.`
      });
    } else if (newStatus === "unloading") {
      token.dockedAt = token.dockedAt || new Date().toISOString();
    } else if (newStatus === "completed") {
      smsService.sendSms({
        recipientPhone: token.farmerPhone,
        recipientName: token.farmerName,
        type: "UNLOADING_COMPLETED",
        message: `Token ${token.tokenId}: Unloading completed in Chamber. Tare weighment verified. E-Receipt ready!`
      });
    }

    // Recalculate remaining wait times for waiting tokens
    let waitCounter = 15;
    for (const t of this.tokens.filter(x => x.status === "waiting")) {
      t.estimatedWaitMins = waitCounter;
      waitCounter += 20;
    }

    smsService.broadcastEvent("QUEUE_UPDATED", this.getQueue());
    return token;
  }

  callNextToBay(assignedBay = "Bay 1", facilityId = "cs-agra-01") {
    const waitingToken = this.tokens.find(t => t.status === "waiting" && (!facilityId || t.facilityId === facilityId));
    if (!waitingToken) return null;
    return this.updateTokenStatus(waitingToken.tokenId, "called", assignedBay);
  }
}

export const queueService = new QueueService();
