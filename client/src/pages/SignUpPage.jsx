import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { sendOtp, verifyOtp } from '../services/api';
import {
  validateName,
  validatePhone,
  validateOtp,
  validateQuantity,
  validateRequiredText
} from '../utils/validation';
import {
  UserPlus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  FileText,
  MapPin,
  Sparkles,
  LogIn,
  Smartphone,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function SignUpPage() {
  const {
    startSignUp,
    setActiveTab,
    showToast
  } = useApp();

  const [farmerData, setFarmerData] = useState({
    name: '',
    phone: '+91 94413 89562',
    state: 'Telangana',
    district: 'Warangal Rural',
    mandal: 'Geesugonda',
    village: 'Dharmaram',
    primaryCrop: 'Chilli',
    expectedYieldQuintals: '120'
  });

  const [otpCode, setOtpCode] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpStatus, setOtpStatus] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [otpError, setOtpError] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateField = (field, val) => {
    switch (field) {
      case 'name':
        return validateName(val, 'Cultivator Name');
      case 'phone':
        return validatePhone(val);
      case 'state':
        return validateRequiredText(val, 'State');
      case 'district':
        return validateRequiredText(val, 'District');
      case 'mandal':
        return validateRequiredText(val, 'Mandal');
      case 'village':
        return validateRequiredText(val, 'Village');
      case 'expectedYieldQuintals':
        return validateQuantity(val);
      case 'otpCode':
        return validateOtp(val);
      default:
        return { isValid: true };
    }
  };

  const handleFieldChange = (field, val) => {
    setFarmerData(prev => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const res = validateField(field, val);
      setErrors(prev => ({ ...prev, [field]: res.isValid ? '' : res.message }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const val = field === 'otpCode' ? otpCode : farmerData[field];
    const res = validateField(field, val);
    setErrors(prev => ({ ...prev, [field]: res.isValid ? '' : res.message }));
  };

  const handleSendOtp = async () => {
    setTouched(prev => ({ ...prev, phone: true }));
    const check = validatePhone(farmerData.phone);
    if (!check.isValid) {
      setErrors(prev => ({ ...prev, phone: check.message }));
      showToast('⚠️ ' + check.message);
      return;
    }
    setErrors(prev => ({ ...prev, phone: '' }));

    setIsSendingOtp(true);
    setOtpError('');
    try {
      const res = await sendOtp(farmerData.phone, farmerData.name || 'Cultivator');
      setOtpStatus(res);
      setCountdown(30);

      if (res.method === 'TWILIO_VERIFY') {
        showToast(`📲 Real SMS OTP sent to ${farmerData.phone} via Twilio! Check your phone.`);
      } else {
        showToast(`🔑 Verification OTP generated for ${farmerData.phone}.`);
        if (res.otp) {
          setOtpCode(res.otp);
          setTouched(prev => ({ ...prev, otpCode: true }));
          setErrors(prev => ({ ...prev, otpCode: '' }));
        }
      }
    } catch (err) {
      showToast('Error requesting OTP: ' + err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setTouched(prev => ({ ...prev, otpCode: true }));
    const check = validateOtp(otpCode);
    if (!check.isValid) {
      setOtpError(check.message);
      setErrors(prev => ({ ...prev, otpCode: check.message }));
      return;
    }
    setErrors(prev => ({ ...prev, otpCode: '' }));

    setIsVerifyingOtp(true);
    setOtpError('');
    try {
      const res = await verifyOtp(farmerData.phone, otpCode);
      if (res.verified) {
        setIsPhoneVerified(true);
        showToast('✅ Mobile number successfully verified!');
      } else {
        setOtpError(res.message || 'Invalid verification code');
      }
    } catch (err) {
      setOtpError(err.message || 'Verification failed');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleQuickDemoFill = () => {
    const demo = {
      name: 'Ramesh Kumar',
      phone: '+91 94413 89562',
      state: 'Telangana',
      district: 'Warangal Rural',
      mandal: 'Geesugonda',
      village: 'Dharmaram',
      primaryCrop: 'Chilli',
      expectedYieldQuintals: '150'
    };
    setFarmerData(demo);
    setTouched({
      name: true,
      phone: true,
      state: true,
      district: true,
      mandal: true,
      village: true,
      expectedYieldQuintals: true
    });
    setErrors({});
    showToast('⚡ Pre-filled verified cultivator details!');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const nameCheck = validateName(farmerData.name, 'Cultivator Name');
    const phoneCheck = validatePhone(farmerData.phone);
    const stateCheck = validateRequiredText(farmerData.state, 'State');
    const districtCheck = validateRequiredText(farmerData.district, 'District');
    const mandalCheck = validateRequiredText(farmerData.mandal, 'Mandal');
    const villageCheck = validateRequiredText(farmerData.village, 'Village');
    const yieldCheck = validateQuantity(farmerData.expectedYieldQuintals);

    const newErrors = {
      name: nameCheck.isValid ? '' : nameCheck.message,
      phone: phoneCheck.isValid ? '' : phoneCheck.message,
      state: stateCheck.isValid ? '' : stateCheck.message,
      district: districtCheck.isValid ? '' : districtCheck.message,
      mandal: mandalCheck.isValid ? '' : mandalCheck.message,
      village: villageCheck.isValid ? '' : villageCheck.message,
      expectedYieldQuintals: yieldCheck.isValid ? '' : yieldCheck.message
    };

    setTouched({
      name: true,
      phone: true,
      state: true,
      district: true,
      mandal: true,
      village: true,
      expectedYieldQuintals: true
    });
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(msg => !!msg);
    if (hasError) {
      showToast('⚠️ Please correct highlighted field errors before proceeding.');
      return;
    }

    if (!isPhoneVerified) {
      setOtpError('Please click Send OTP and verify your 6-digit SMS OTP code before proceeding.');
      showToast('⚠️ Please verify your mobile number with the SMS OTP first.');
      return;
    }

    startSignUp({
      ...farmerData,
      isPhoneVerified: true,
      role: 'farmer',
      avatar: '👨‍🌾'
    });
  };


  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Breadcrumb & Step Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Page (About Us)</span>
        </button>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Already registered?</span>
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center space-x-1"
          >
            <span>Go to Sign In Page</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Step Pipeline Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-3 p-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-500 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 animate-pulse">
              1
            </div>
            <div>
              <p className="text-[11px] font-black text-emerald-950">Step 1: Cultivator Registration</p>
              <p className="text-[10px] text-emerald-700">Name & Farm Profile (Current)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-400">
            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
              2
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-700">Step 2: Land Documents</p>
              <p className="text-[10px] text-slate-500">Pattadar Passbook & Survey No.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-400">
            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
              3
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-700">Step 3: Inside Website Access</p>
              <p className="text-[10px] text-slate-500">Storage Units & Slot Booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sign Up Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Informational Sidebar */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg border border-emerald-300 shrink-0">
                <img
                  src="/krishivalaya-logo.jpg"
                  alt="Krishivalaya"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">Krishi<span className="text-emerald-300">valaya</span></span>
                <p className="text-[10px] text-emerald-200 font-medium">Empowering the Annadatha</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs text-emerald-200">
              <UserPlus className="w-4 h-4 text-emerald-300" />
              <span>Step 1 of 2: Registration</span>
            </div>

            <div>
              <h2 className="text-2xl font-black leading-tight">
                New Farmer Registration
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Register your farm details. On the next step, you will submit your Dharani / Pattadar Passbook land documents to verify your agricultural ownership and unlock direct cold chain access.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Reserved cold storage slots for genuine cultivators.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Subsidized agricultural electricity tariffs.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Direct bank-pledgeable e-NWR receipt generation.</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="w-full flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl shadow-md transition hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>⚡ Quick Fill Demo Farmer</span>
            </button>
          </div>
        </div>

        {/* Right Form */}
        <div className="md:col-span-7 p-8">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-900">Step 1: Farmer & Harvest Details</h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide your contact and farm details before land verification.
            </p>
          </div>

          <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cultivator / Farmer Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={farmerData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`w-full rounded-xl px-3 py-2.5 text-sm transition focus:outline-none focus:ring-2 ${
                    touched.name && errors.name
                      ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                      : touched.name && !errors.name
                      ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:ring-emerald-500'
                  }`}
                />
                {touched.name && (
                  <div className="absolute right-3 top-3 pointer-events-none">
                    {errors.name ? (
                      <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                )}
              </div>
              {touched.name && errors.name && (
                <p className="text-[11px] text-rose-600 flex items-center space-x-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
              {touched.name && !errors.name && (
                <p className="text-[11px] text-emerald-600 flex items-center space-x-1 mt-1 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>✓ Valid cultivator name</span>
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Mobile Number (Real SMS Alerts & Tokens) *</label>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => {
                      setFarmerData(prev => ({ ...prev, phone: '+91 94413 89562' }));
                      setTouched(prev => ({ ...prev, phone: true }));
                      setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded cursor-pointer"
                    title="Verified Twilio number for real SMS"
                  >
                    📲 +91 94413 89562 (Real Phone)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFarmerData(prev => ({ ...prev, phone: '+91 98765 43210' }));
                      setTouched(prev => ({ ...prev, phone: true }));
                      setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className="text-[10px] text-slate-500 hover:text-slate-700 bg-slate-100 px-2 py-0.5 rounded cursor-pointer"
                  >
                    Demo Phone
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="tel"
                    required
                    placeholder="+91 94413 89562"
                    value={farmerData.phone}
                    onChange={(e) => {
                      handleFieldChange('phone', e.target.value);
                      setIsPhoneVerified(false);
                    }}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full rounded-xl px-3 py-2.5 font-mono text-sm transition focus:outline-none focus:ring-2 ${
                      touched.phone && errors.phone
                        ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                        : touched.phone && !errors.phone
                        ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:ring-emerald-500'
                    }`}
                  />
                  {touched.phone && (
                    <div className="absolute right-3 top-3 pointer-events-none">
                      {errors.phone ? (
                        <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>

                {!isPhoneVerified ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || countdown > 0}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-3.5 py-2.5 rounded-xl transition flex items-center space-x-1 text-xs shrink-0 cursor-pointer shadow-xs"
                  >
                    {isSendingOtp ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : countdown > 0 ? (
                      <span>Resend ({countdown}s)</span>
                    ) : (
                      <>
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>{otpStatus ? 'Resend Real OTP' : 'Send Real OTP'}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="flex items-center space-x-1 bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-2.5 rounded-xl border border-emerald-300">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              {touched.phone && errors.phone && (
                <p className="text-[11px] text-rose-600 flex items-center space-x-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
              {touched.phone && !errors.phone && (
                <p className="text-[11px] text-emerald-600 flex items-center space-x-1 mt-1 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>✓ Valid 10-digit mobile number</span>
                </p>
              )}
            </div>

            {/* OTP Verification Box */}
            {otpStatus && !isPhoneVerified && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-start space-x-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    otpStatus.method === 'TWILIO_VERIFY' ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
                  }`} />
                  <div>
                    <p className="font-bold text-xs text-slate-900">
                      {otpStatus.method === 'TWILIO_VERIFY'
                        ? '🟢 Real Cellular SMS Sent to Your Phone!'
                        : '🔑 Verification OTP Dispatched'}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {otpStatus.method === 'TWILIO_VERIFY'
                        ? `A 6-digit verification code was dispatched to ${farmerData.phone} via Twilio. Check your mobile SMS inbox.`
                        : `Verification code generated: ${otpStatus.otp || 'Check SMS'}. Enter the 6-digit code below.`
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit SMS OTP"
                      value={otpCode}
                      onChange={(e) => {
                        setOtpCode(e.target.value);
                        if (touched.otpCode) {
                          const c = validateOtp(e.target.value);
                          setErrors(prev => ({ ...prev, otpCode: c.isValid ? '' : c.message }));
                        }
                      }}
                      onBlur={() => handleBlur('otpCode')}
                      className={`w-full rounded-xl px-3 py-2 text-xs font-mono tracking-widest transition focus:outline-none focus:ring-2 ${
                        touched.otpCode && errors.otpCode
                          ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                          : touched.otpCode && !errors.otpCode && otpCode.length === 6
                          ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                          : 'bg-white border border-slate-300 text-slate-900 focus:ring-emerald-500'
                      }`}
                    />
                    {touched.otpCode && (
                      <div className="absolute right-2.5 top-2 pointer-events-none">
                        {errors.otpCode ? (
                          <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                        ) : otpCode.length === 6 ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        ) : null}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || !otpCode}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center space-x-1"
                  >
                    {isVerifyingOtp ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                    <span>Verify Code</span>
                  </button>
                </div>

                {otpError && (
                  <p className="text-[11px] text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{otpError}</span>
                  </p>
                )}
                {touched.otpCode && errors.otpCode && (
                  <p className="text-[11px] text-rose-600 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.otpCode}</span>
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">State *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Telangana"
                    value={farmerData.state}
                    onChange={(e) => handleFieldChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                    className={`w-full rounded-xl px-3 py-2 text-slate-800 transition focus:outline-none focus:ring-2 ${
                      touched.state && errors.state
                        ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                        : touched.state && !errors.state
                        ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                        : 'bg-slate-50 border border-slate-200 focus:bg-white focus:ring-emerald-500'
                    }`}
                  />
                  {touched.state && (
                    <div className="absolute right-2.5 top-2.5 pointer-events-none">
                      {errors.state ? (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
                {touched.state && errors.state && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.state}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">District *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Warangal Rural"
                    value={farmerData.district}
                    onChange={(e) => handleFieldChange('district', e.target.value)}
                    onBlur={() => handleBlur('district')}
                    className={`w-full rounded-xl px-3 py-2 text-slate-800 transition focus:outline-none focus:ring-2 ${
                      touched.district && errors.district
                        ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                        : touched.district && !errors.district
                        ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                        : 'bg-slate-50 border border-slate-200 focus:bg-white focus:ring-emerald-500'
                    }`}
                  />
                  {touched.district && (
                    <div className="absolute right-2.5 top-2.5 pointer-events-none">
                      {errors.district ? (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
                {touched.district && errors.district && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.district}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mandal / Tehsil *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Geesugonda"
                    value={farmerData.mandal}
                    onChange={(e) => handleFieldChange('mandal', e.target.value)}
                    onBlur={() => handleBlur('mandal')}
                    className={`w-full rounded-xl px-3 py-2 text-slate-800 transition focus:outline-none focus:ring-2 ${
                      touched.mandal && errors.mandal
                        ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                        : touched.mandal && !errors.mandal
                        ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                        : 'bg-slate-50 border border-slate-200 focus:bg-white focus:ring-emerald-500'
                    }`}
                  />
                  {touched.mandal && (
                    <div className="absolute right-2.5 top-2.5 pointer-events-none">
                      {errors.mandal ? (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
                {touched.mandal && errors.mandal && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.mandal}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Village *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Dharmaram"
                    value={farmerData.village}
                    onChange={(e) => handleFieldChange('village', e.target.value)}
                    onBlur={() => handleBlur('village')}
                    className={`w-full rounded-xl px-3 py-2 text-slate-800 transition focus:outline-none focus:ring-2 ${
                      touched.village && errors.village
                        ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                        : touched.village && !errors.village
                        ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                        : 'bg-slate-50 border border-slate-200 focus:bg-white focus:ring-emerald-500'
                    }`}
                  />
                  {touched.village && (
                    <div className="absolute right-2.5 top-2.5 pointer-events-none">
                      {errors.village ? (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
                {touched.village && errors.village && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.village}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Crop</label>
                <select
                  value={farmerData.primaryCrop}
                  onChange={(e) => handleFieldChange('primaryCrop', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Chilli">Chilli (మిర్చి / लाल मिर्च)</option>
                  <option value="Potato">Potato (ఆలు)</option>
                  <option value="Turmeric">Turmeric (పసుపు / हल्दी)</option>
                  <option value="Onion">Onion (ఉల్లి / प्याज)</option>
                  <option value="Paddy">Paddy / Rice (వరి / धान)</option>
                  <option value="Cotton">Cotton (ప్రత్తి / कपास)</option>
                  <option value="Apple">Apple (సేబ్)</option>
                  <option value="Tomato">Tomato (టమాట / टमाटर)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Seasonal Yield (Quintals) *</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="120"
                    value={farmerData.expectedYieldQuintals}
                    onChange={(e) => handleFieldChange('expectedYieldQuintals', e.target.value)}
                    onBlur={() => handleBlur('expectedYieldQuintals')}
                    className={`w-full rounded-xl px-3 py-2 font-mono transition focus:outline-none focus:ring-2 ${
                      touched.expectedYieldQuintals && errors.expectedYieldQuintals
                        ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                        : touched.expectedYieldQuintals && !errors.expectedYieldQuintals
                        ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:ring-emerald-500'
                    }`}
                  />
                  {touched.expectedYieldQuintals && (
                    <div className="absolute right-2.5 top-2.5 pointer-events-none">
                      {errors.expectedYieldQuintals ? (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
                {touched.expectedYieldQuintals && errors.expectedYieldQuintals && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{errors.expectedYieldQuintals}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black py-3.5 rounded-xl shadow-md transition text-xs mt-4 cursor-pointer hover:scale-[1.02]"
            >
              <span>Proceed to Step 2: Submit Land Documents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Link to Sign In */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className="mt-2 inline-flex items-center space-x-2 text-xs font-black text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-xl transition cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Go to Sign In Page (Direct Access to Inside Website)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
