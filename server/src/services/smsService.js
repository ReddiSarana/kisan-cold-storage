// SMS Dispatch Service for AgroVault
import { initialSmsLogs } from '../data/seedData.js';

class SmsService {
  constructor() {
    this.smsLogs = [...initialSmsLogs];
    this.sseClients = new Set();
  }

  // Register SSE client connection
  registerClient(res) {
    this.sseClients.add(res);
  }

  unregisterClient(res) {
    this.sseClients.delete(res);
  }

  broadcastEvent(eventType, payload) {
    const data = JSON.stringify({ type: eventType, payload, timestamp: new Date().toISOString() });
    for (const client of this.sseClients) {
      try {
        client.write(`data: ${data}\n\n`);
      } catch (err) {
        console.error("Error writing to SSE client:", err.message);
      }
    }
  }

  // Send an SMS notification
  async sendSms({ recipientPhone, recipientName, message, type = "GENERAL" }) {
    const smsEntry = {
      id: `sms-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      recipientPhone: recipientPhone || "+91 98765 00000",
      recipientName: recipientName || "Farmer",
      senderId: "AGROVAULT",
      type,
      message,
      status: "DELIVERED",
      timestamp: new Date().toISOString()
    };

    // If external SMS gateway environment variables exist (Twilio or Fast2SMS), attempt sending
    if (process.env.FAST2SMS_API_KEY) {
      try {
        console.log(`[Fast2SMS] Attempting real SMS to ${recipientPhone}`);
        // Can call Fast2SMS or Twilio API if key is present
      } catch (err) {
        console.warn("Real SMS gateway error:", err.message);
      }
    }

    this.smsLogs.unshift(smsEntry);

    // Keep memory tidy
    if (this.smsLogs.length > 200) {
      this.smsLogs.pop();
    }

    console.log(`[SMS DISPATCHED] To: ${recipientName} (${recipientPhone}) | ${message}`);

    // Broadcast update to real-time subscribers & live phone simulator
    this.broadcastEvent("NEW_SMS", smsEntry);

    return smsEntry;
  }

  getAllLogs(phone = null) {
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, "");
      return this.smsLogs.filter(s => s.recipientPhone.replace(/\D/g, "").includes(cleanPhone));
    }
    return this.smsLogs;
  }
}

export const smsService = new SmsService();
