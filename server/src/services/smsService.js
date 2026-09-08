// SMS Dispatch Service for Krishivalaya
import { initialSmsLogs } from '../data/seedData.js';

class SmsService {
  constructor() {
    this.smsLogs = [...initialSmsLogs];
    this.sseClients = new Set();
    this.activeOtps = new Map(); // clean10 -> { code, expiresAt, method }
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

  // Send real SMS via Twilio Verify Service (Bypasses trial template restrictions!)
  async sendViaTwilioVerify(phone) {
    const { e164 } = this.formatPhone(phone);
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!sid || !token || !verifySid) {
      throw new Error("Twilio Verify credentials not configured in environment");
    }

    console.log(`[Twilio Verify] Requesting real OTP SMS delivery to ${e164}...`);
    const authHeader = 'Basic ' + Buffer.from(`${sid.trim()}:${token.trim()}`).toString('base64');
    const body = new URLSearchParams({
      To: e164,
      Channel: 'sms'
    });

    const response = await fetch(`https://verify.twilio.com/v2/Services/${verifySid.trim()}/Verifications`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });

    const result = await response.json();
    console.log("[Twilio Verify Dispatch Response]:", result);
    if (!response.ok || (result.status !== "pending" && result.status !== "approved")) {
      throw new Error(result.message || `Twilio Verify failed (Code: ${result.code || response.status})`);
    }
    return result;
  }

  // Check code via Twilio Verify Service
  async checkTwilioVerify(phone, code) {
    const { e164 } = this.formatPhone(phone);
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!sid || !token || !verifySid) {
      throw new Error("Twilio Verify credentials not configured in environment");
    }

    console.log(`[Twilio Verify] Checking OTP code for ${e164}...`);
    const authHeader = 'Basic ' + Buffer.from(`${sid.trim()}:${token.trim()}`).toString('base64');
    const body = new URLSearchParams({
      To: e164,
      Code: code.trim()
    });

    const response = await fetch(`https://verify.twilio.com/v2/Services/${verifySid.trim()}/VerificationCheck`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });

    const result = await response.json();
    console.log("[Twilio Verify Check Response]:", result);
    if (result.status === "approved" && result.valid === true) {
      return { verified: true, method: "TWILIO_VERIFY", result };
    }
    return { verified: false, message: result.message || "Invalid OTP code", result };
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
        route: "q",
        message: message,
        language: "english",
        flash: 0,
        numbers: clean10
      })
    });

    const result = await response.json();
    console.log("[Fast2SMS Gateway Response]:", result);
    if (!response.ok || result.return === false || (result.status_code !== 200 && result.return !== true)) {
      const errorMsg = Array.isArray(result.message)
        ? result.message.join(", ")
        : (result.message || "Fast2SMS dispatch failed");
      throw new Error(errorMsg);
    }
    return result;
  }

  // Send real SMS via Twilio Messages API
  async sendViaTwilio(phone, message) {
    const { e164 } = this.formatPhone(phone);
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;

    console.log(`[Twilio Messages] Attempting real SMS delivery to ${e164}...`);
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

  // Send an OTP code (Cellular Twilio Verify + Transparent Fallback)
  async sendOtp({ phone, name = "Cultivator" }) {
    const { clean10, e164 } = this.formatPhone(phone);
    let gatewayUsed = "SIMULATOR";
    let deliveryStatus = "DELIVERED (SIMULATED)";
    let gatewayError = null;

    // Always generate an active 6-digit verification code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    this.activeOtps.set(clean10, {
      code: generatedOtp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      createdAt: new Date().toISOString()
    });

    // 1. Try Twilio Verify Service (Real cellular SMS to phone)
    let twilioAttempted = false;
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_VERIFY_SERVICE_SID) {
      try {
        await this.sendViaTwilioVerify(phone);
        twilioAttempted = true;
        gatewayUsed = "Twilio Verify (Cellular Gateway)";
        deliveryStatus = "SENT_TO_PHONE";
        console.log(`[REAL CELLULAR SMS] Twilio Verify OTP requested for physical mobile: ${e164}`);
      } catch (err) {
        gatewayError = err.message;
        console.warn(`[Twilio Verify Warning]: ${err.message}. Falling back to virtual simulator.`);
      }
    }

    const messageText = `Krishivalaya: Your OTP verification code is ${generatedOtp}. Valid for 10 minutes.`;

    const smsEntry = {
      id: `sms-otp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      recipientPhone: phone,
      recipientName: name,
      senderId: twilioAttempted ? "TWILIO-VERIFY" : "KRISHIVALAYA",
      type: "OTP_VERIFICATION",
      message: messageText,
      gateway: gatewayUsed,
      gatewayError,
      status: deliveryStatus,
      timestamp: new Date().toISOString()
    };

    this.smsLogs.unshift(smsEntry);
    if (this.smsLogs.length > 200) this.smsLogs.pop();

    this.broadcastEvent("NEW_SMS", smsEntry);

    return {
      success: true,
      method: twilioAttempted ? "TWILIO_VERIFY" : "SESSION_OTP",
      status: deliveryStatus,
      phone: e164,
      otp: generatedOtp, // Always provided so cultivator is never locked out by telecom filters
      gateway: gatewayUsed,
      gatewayNotice: "Indian telecom (TRAI DLT) regulations restrict delivery from international trial numbers. If your cellular carrier delays delivery, enter the instant verification code shown above.",
      message: twilioAttempted
        ? `Verification code dispatched to ${e164}! Code: ${generatedOtp} (Active for 10 mins).`
        : `Verification code generated: ${generatedOtp}. Enter the 6-digit code to sign in.`
    };
  }

  // Verify submitted OTP code - Checks session code, demo bypass, and Twilio Verify
  async verifyOtp({ phone, code }) {
    if (!phone || !code) {
      return { success: false, message: "Phone number and OTP code are required" };
    }

    const { clean10, e164 } = this.formatPhone(phone);
    const cleanCode = code.toString().trim();

    // 1. Check active in-memory session OTPs
    const record = this.activeOtps.get(clean10);
    if (record && record.expiresAt > Date.now()) {
      if (record.code === cleanCode) {
        this.activeOtps.delete(clean10);
        return { success: true, verified: true, method: "SESSION_OTP" };
      }
    }

    // 2. Universal demo bypass code
    if (cleanCode === "123456") {
      return { success: true, verified: true, method: "DEMO_BYPASS" };
    }

    // 3. Check Twilio Verify Service if active
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_VERIFY_SERVICE_SID) {
      try {
        const verifyRes = await this.checkTwilioVerify(phone, cleanCode);
        if (verifyRes.verified) {
          return { success: true, verified: true, method: "TWILIO_VERIFY" };
        }
      } catch (err) {
        console.warn("[Twilio Verify Check Warning]:", err.message);
      }
    }

    return {
      success: false,
      verified: false,
      message: record
        ? `Invalid OTP code. Please enter the 6-digit code displayed above (${record.code}) or demo code 123456.`
        : "Invalid OTP code. Please enter the valid 6-digit code received or demo code 123456."
    };
  }


  // Send an SMS notification (Real Gateway or Simulator Fallback)
  async sendSms({ recipientPhone, recipientName, message, type = "GENERAL" }) {
    const phone = recipientPhone || "+91 98765 00000";
    let gatewayUsed = "SIMULATOR";
    let deliveryStatus = "DELIVERED (SIMULATED)";
    let gatewayError = null;

    // 1. Try Fast2SMS
    if (process.env.FAST2SMS_API_KEY && process.env.FAST2SMS_API_KEY.trim()) {
      try {
        await this.sendViaFast2Sms(phone, message);
        gatewayUsed = "Fast2SMS (Cellular)";
        deliveryStatus = "SENT_TO_PHONE";
      } catch (err) {
        gatewayError = err.message;
        gatewayUsed = "Fast2SMS (Gateway Restricted)";
        deliveryStatus = "GATEWAY_ERROR";
      }
    }

    // 2. Try Twilio Messages API if Fast2SMS didn't send
    if (deliveryStatus !== "SENT_TO_PHONE" && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      try {
        await this.sendViaTwilio(phone, message);
        gatewayUsed = "Twilio (Cellular)";
        deliveryStatus = "SENT_TO_PHONE";
        gatewayError = null;
      } catch (err) {
        gatewayError = err.message;
        gatewayUsed = "Twilio (Trial Account Restricted)";
        deliveryStatus = "SIMULATOR_FALLBACK";
      }
    }

    if (deliveryStatus !== "SENT_TO_PHONE") {
      console.log(`[SMS SIMULATOR] Dispatched to on-screen phone. Status: ${deliveryStatus}`);
    }

    const smsEntry = {
      id: `sms-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      recipientPhone: phone,
      recipientName: recipientName || "Farmer",
      senderId: "KRISHIVALAYA",
      type,
      message,
      gateway: gatewayUsed,
      gatewayError,
      status: deliveryStatus === "SENT_TO_PHONE" ? "SENT_TO_PHONE" : "DELIVERED (SIMULATED)",
      timestamp: new Date().toISOString()
    };

    this.smsLogs.unshift(smsEntry);

    // Keep memory tidy
    if (this.smsLogs.length > 200) {
      this.smsLogs.pop();
    }

    console.log(`[SMS DISPATCHED] Status: ${smsEntry.status} | To: ${recipientName} (${phone}) | Gateway: ${gatewayUsed}`);

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

