/**
 * Centralized Field Validation Utilities for Krishivalaya
 */

// Validate 10-digit Indian mobile number
export function validatePhone(phone) {
  if (!phone) return { isValid: false, message: 'Mobile number is required.' };
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10) {
    return { isValid: false, message: `Incomplete phone number (${cleaned.length}/10 digits).` };
  }
  if (cleaned.length > 10 && !phone.startsWith('+91')) {
    return { isValid: false, message: 'Phone number cannot exceed 10 digits.' };
  }
  const last10 = cleaned.slice(-10);
  if (!/^[6-9]\d{9}$/.test(last10)) {
    return { isValid: false, message: 'Indian mobile number must start with 6, 7, 8, or 9.' };
  }
  return { isValid: true, message: '✓ Valid 10-digit mobile number' };
}

// Validate 6-digit SMS OTP
export function validateOtp(otp) {
  if (!otp) return { isValid: false, message: 'OTP is required.' };
  const cleaned = otp.trim();
  if (!/^\d+$/.test(cleaned)) {
    return { isValid: false, message: 'OTP must contain numbers only.' };
  }
  if (cleaned.length !== 6) {
    return { isValid: false, message: `Enter all 6 digits (${cleaned.length}/6 entered).` };
  }
  return { isValid: true, message: '✓ Valid 6-digit code' };
}

// Validate Name (at least 3 chars, letters and spaces only)
export function validateName(name, fieldLabel = 'Name') {
  if (!name || !name.trim()) return { isValid: false, message: `${fieldLabel} is required.` };
  const trimmed = name.trim();
  if (trimmed.length < 3) {
    return { isValid: false, message: `${fieldLabel} must be at least 3 characters.` };
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
    return { isValid: false, message: `${fieldLabel} should contain letters only.` };
  }
  return { isValid: true, message: `✓ Valid ${fieldLabel.toLowerCase()}` };
}

// Validate Indian Vehicle Registration Plate (e.g. TS 03 UB 4821 or TS-03-UB-4821)
export function validateVehicleNumber(vehicle) {
  if (!vehicle || !vehicle.trim()) return { isValid: false, message: 'Vehicle registration plate is required.' };
  const trimmed = vehicle.trim();
  if (trimmed.length < 5) {
    return { isValid: false, message: 'Registration plate is too short (min 5 characters).' };
  }
  // Allow letters, digits, spaces, and hyphens
  if (!/^[A-Za-z0-9\s-]+$/.test(trimmed)) {
    return { isValid: false, message: 'Only letters, numbers, and dashes allowed.' };
  }
  return { isValid: true, message: '✓ Valid vehicle plate' };
}

// Validate Arrival Date (cannot be in the past)
export function validateArrivalDate(dateStr) {
  if (!dateStr) return { isValid: false, message: 'Arrival date is required.' };
  const selectedDate = new Date(dateStr);
  selectedDate.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, message: 'Invalid date format.' };
  }
  if (selectedDate < today) {
    return { isValid: false, message: 'Arrival date cannot be in the past. Choose today or a future date.' };
  }
  return { isValid: true, message: '✓ Valid schedule date' };
}

// Validate 6-digit Indian PIN code
export function validatePincode(pincode) {
  if (!pincode) return { isValid: false, message: 'PIN code is required.' };
  const cleaned = pincode.toString().trim();
  if (!/^[1-9]\d{5}$/.test(cleaned)) {
    return { isValid: false, message: 'Must be a valid 6-digit Indian postal code.' };
  }
  return { isValid: true, message: '✓ Valid PIN code' };
}

// Validate positive weight/quantity in quintals
export function validateQuantity(quantity) {
  const num = Number(quantity);
  if (!quantity || isNaN(num) || num <= 0) {
    return { isValid: false, message: 'Weight must be greater than 0 Quintals.' };
  }
  if (num > 10000) {
    return { isValid: false, message: 'Maximum 10,000 Quintals per booking consignment.' };
  }
  return { isValid: true, message: '✓ Valid weight' };
}

// Validate Bags count
export function validateBags(bags) {
  const num = Number(bags);
  if (!bags || isNaN(num) || num <= 0) {
    return { isValid: false, message: 'Bags count must be at least 1 bag.' };
  }
  return { isValid: true, message: '✓ Valid bags count' };
}

// Validate Survey / Khata number
export function validateSurveyNumber(surveyNo) {
  if (!surveyNo || !surveyNo.trim()) return { isValid: false, message: 'Survey number is required.' };
  if (surveyNo.trim().length < 2) {
    return { isValid: false, message: 'Enter a valid Survey / Khata reference.' };
  }
  return { isValid: true, message: '✓ Valid survey number' };
}

// Validate Pattadar Passbook Number
export function validatePassbookNumber(passbook) {
  if (!passbook || !passbook.trim()) return { isValid: false, message: 'Passbook number is required.' };
  if (passbook.trim().length < 4) {
    return { isValid: false, message: 'Passbook number must be at least 4 characters.' };
  }
  return { isValid: true, message: '✓ Valid passbook number' };
}

// Validate Farm Extent (Acres)
export function validateAcres(acres) {
  const num = Number(acres);
  if (!acres || isNaN(num) || num <= 0) {
    return { isValid: false, message: 'Land extent must be greater than 0 acres.' };
  }
  if (num > 500) {
    return { isValid: false, message: 'Land extent cannot exceed 500 acres.' };
  }
  return { isValid: true, message: '✓ Valid land extent' };
}

// Validate mandatory text field (Village, Mandal, District)
export function validateRequiredText(val, fieldName = 'Field') {
  if (!val || !val.trim()) return { isValid: false, message: `${fieldName} is required.` };
  if (val.trim().length < 2) return { isValid: false, message: `${fieldName} must be at least 2 characters.` };
  return { isValid: true, message: `✓ Valid ${fieldName.toLowerCase()}` };
}
