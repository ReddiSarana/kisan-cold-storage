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

  // Clean phone number into 10-digit Indian format and E.164
  formatPhone(phone) {
    if (!phone) return { clean10: "9876500000", e164: "+919876500000" };
    const digits = phone.replace(/\D/g, "");
    let clean10 = digits;
    if (digits.length === 12 && digits.startsWith("91")) {
      clean10 = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      clean10 = digits.slice(1);
    } else if (digits.length > 10) {
      clean10 = digits.slice(-10);
    }
    const e164 = phone.startsWith("+") ? phone.replace(/\s+/g, "") : `+91${clean10}`;
    return { clean10, e164 };
  }

  // Send real SMS via Fast2SMS API (India)
  async sendViaFast2Sms(phone, message) {
    const { clean10 } = this.formatPhone(phone);
    const apiKey = process.env.FAST2SMS_API_KEY;
    console.log(`[Fast2SMS] Attempting real SMS delivery to +91 ${clean10}...`);

    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "authorization": apiKey.trim(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        route: "q", // Quick SMS route (transactional / test messages)
        message: message,
        language: "english",
        flash: 0,
        numbers: clean10
      })
    });

    const result = await response.json();
    console.log("[Fast2SMS Gateway Response]:", result);
    if (!response.ok || result.return === false || result.status_code !== 200 && result.return !== true) {
      const errorMsg = Array.isArray(result.message)
        ? result.message.join(", ")
        : (result.message || "Fast2SMS dispatch failed");
      throw new Error(errorMsg);
    }
    return result;
  }

  // Send real SMS via Twilio API
  async sendViaTwilio(phone, message) {
    const { e164 } = this.formatPhone(phone);
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;

    console.log(`[Twilio] Attempting real SMS delivery to ${e164}...`);
    const authHeader = 'Basic ' + Buffer.from(`${sid.trim()}:${token.trim()}`).toString('base64');
    const body = new URLSearchParams({
      To: e164,
      From: from.trim(),
      Body: message
    });

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid.trim()}/Messages.json`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });

    const result = await response.json();
    console.log("[Twilio Gateway Response]:", result);
    if (!response.ok) {
      throw new Error(result.message || "Twilio dispatch failed");
    }
    return result;
  }

  // Send an SMS notification (Real Gateway or Simulator Fallback)
  async sendSms({ recipientPhone, recipientName, message, type = "GENERAL" }) {
    const phone = recipientPhone || "+91 98765 00000";
    let gatewayUsed = "SIMULATOR";
    let deliveryStatus = "DELIVERED (SIMULATED)";
    let gatewayError = null;

    // 1. Check Fast2SMS
    if (process.env.FAST2SMS_API_KEY && process.env.FAST2SMS_API_KEY.trim()) {
      try {
        await this.sendViaFast2Sms(phone, message);
        gatewayUsed = "Fast2SMS (Cellular)";
        deliveryStatus = "SENT_TO_PHONE";
      } catch (err) {
        gatewayError = err.message;
        gatewayUsed = "Fast2SMS (Gateway Restricted)";
        deliveryStatus = "GATEWAY_ERROR";
        console.warn(`[Fast2SMS Gateway Error]: ${err.message}`);
      }
    }
    // 2. Or check Twilio
    else if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      try {
        await this.sendViaTwilio(phone, message);
        gatewayUsed = "Twilio (Cellular)";
        deliveryStatus = "SENT_TO_PHONE";
      } catch (err) {
        gatewayError = err.message;
        gatewayUsed = "Twilio (Failed)";
        deliveryStatus = "GATEWAY_ERROR";
        console.warn(`[Twilio Gateway Error]: ${err.message}`);
      }
    } else {
      console.log(`[SMS SIMULATOR] Dispatched to on-screen phone. (Add FAST2SMS_API_KEY or Twilio credentials to server/.env to send real SMS).`);
    }

    const smsEntry = {
      id: `sms-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      recipientPhone: phone,
      recipientName: recipientName || "Farmer",
      senderId: "AGROVAULT",
      type,
      message,
      gateway: gatewayUsed,
      gatewayError,
      status: deliveryStatus,
      timestamp: new Date().toISOString()
    };

    this.smsLogs.unshift(smsEntry);

    // Keep memory tidy
    if (this.smsLogs.length > 200) {
      this.smsLogs.pop();
    }

    console.log(`[SMS DISPATCHED] Status: ${deliveryStatus} | To: ${recipientName} (${phone}) | Gateway: ${gatewayUsed}`);

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
