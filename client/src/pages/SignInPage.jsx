import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { sendOtp, verifyOtp } from '../services/api';
import { validatePhone, validateOtp } from '../utils/validation';
import {
  LogIn,
  Phone,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  RefreshCw,
  AlertCircle,
  KeyRound,
  UserPlus
} from 'lucide-react';

export default function SignInPage() {
  const {
    loginUser,
    setActiveTab,
    showToast
  } = useApp();

  const [selectedRole, setSelectedRole] = useState('farmer');
  const [phone, setPhone] = useState('+91 94413 89562');
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpStatus, setOtpStatus] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [verifyError, setVerifyError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handlePhoneChange = (val) => {
    setPhone(val);
    setOtpSent(false);
    setOtpStatus(null);
    setOtp('');
    if (touched.phone) {
      const check = validatePhone(val);
      setFieldErrors(prev => ({ ...prev, phone: check.isValid ? '' : check.message }));
    }
  };

  const handleOtpChange = (val) => {
    setOtp(val);
    if (touched.otp) {
      const check = validateOtp(val);
      setFieldErrors(prev => ({ ...prev, otp: check.isValid ? '' : check.message }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'phone') {
      const check = validatePhone(phone);
      setFieldErrors(prev => ({ ...prev, phone: check.isValid ? '' : check.message }));
    } else if (field === 'otp') {
      const check = validateOtp(otp);
      setFieldErrors(prev => ({ ...prev, otp: check.isValid ? '' : check.message }));
    }
  };

  const handleSendOtp = async () => {
    setTouched(prev => ({ ...prev, phone: true }));
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.isValid) {
      setFieldErrors(prev => ({ ...prev, phone: phoneCheck.message }));
      setVerifyError(phoneCheck.message);
      return;
    }

    setIsSendingOtp(true);
    setVerifyError('');
    try {
      const res = await sendOtp(phone, selectedRole === 'farmer' ? 'Ramesh Kumar' : (selectedRole === 'facility_manager' ? 'Sanjay Singhal' : 'Sunil Verma'));
      setOtpStatus(res);
      setOtpSent(true);
      setCountdown(30);

      if (res.method === 'TWILIO_VERIFY') {
        showToast(`📲 Real SMS OTP sent to ${phone} via Twilio! Check your phone.`);
      } else {
        showToast(`🔑 Verification OTP generated for ${phone}.`);
        if (res.otp) {
          setOtp(res.otp);
          setTouched(prev => ({ ...prev, otp: true }));
          setFieldErrors(prev => ({ ...prev, otp: '' }));
        }
      }
    } catch (err) {
      setVerifyError('Error dispatching SMS OTP: ' + err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setTouched({ phone: true, otp: true });

    const phoneCheck = validatePhone(phone);
    const otpCheck = validateOtp(otp);

    if (!phoneCheck.isValid) {
      setFieldErrors(prev => ({ ...prev, phone: phoneCheck.message }));
      setVerifyError(phoneCheck.message);
      return;
    }

    if (!otpSent) {
      setVerifyError('Please click "Send OTP" to receive your 6-digit verification code on your mobile phone.');
      return;
    }

    if (!otpCheck.isValid) {
      setFieldErrors(prev => ({ ...prev, otp: otpCheck.message }));
      setVerifyError(otpCheck.message);
      return;
    }

    setIsVerifying(true);
    setVerifyError('');

    try {
      const verifyRes = await verifyOtp(phone, otp.trim());
      if (!verifyRes.verified) {
        setVerifyError(verifyRes.message || 'Invalid or expired OTP code. Please check the SMS on your mobile phone.');
        setIsVerifying(false);
        return;
      }

      showToast('✅ Mobile number verified via SMS OTP!');

      const signedInUser = {
        role: selectedRole,
        name: selectedRole === 'farmer' ? 'Ramesh Kumar' : (selectedRole === 'facility_manager' ? 'Sanjay Singhal' : 'Sunil Verma'),
        phone: phone || '+91 94413 89562',
        district: 'Warangal Rural',
        state: 'Telangana',
        kccNumber: 'KCC-TS-88219',
        avatar: selectedRole === 'farmer' ? '👨‍🌾' : (selectedRole === 'facility_manager' ? '🏭' : '📋')
      };

      loginUser(signedInUser);
    } catch (err) {
      setVerifyError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
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
          <span className="text-slate-400">Need a new account?</span>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center space-x-1"
          >
            <span>Go to Sign Up Page</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Sign In Card */}
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
                <span className="text-2xl font-black tracking-tight text-white">Krishi<span className="text-emerald-300">valaya</span> <span className="text-amber-300 font-bold text-lg ml-1">(కృషివలయ)</span></span>
                <p className="text-[10px] text-emerald-200 font-medium">Empowering the Annadatha • అన్నదాతకు అండగా</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Secure Cellular SMS OTP Sign In</span>
            </div>

            <div>
              <h2 className="text-2xl font-black leading-tight">
                Mobile OTP Sign In
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Sign in securely using the 6-digit verification code dispatched directly to your mobile phone via cellular SMS.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Direct cellular SMS verification sent straight to your phone.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Instant SMS delivery directly to your phone carrier.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Direct entry to storage chambers, queue tokens & e-NWRs.</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-slate-300">
            <p>New cultivator with land documents?</p>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className="mt-1 font-black text-amber-300 hover:text-amber-200 flex items-center space-x-1 cursor-pointer"
            >
              <span>Click here for Step 1: Sign Up &rarr;</span>
            </button>
          </div>
        </div>

        {/* Right Form */}
        <div className="md:col-span-7 p-8">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-900">Sign In via Mobile OTP</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your registered mobile number, request an OTP, and submit the 6-digit code received on your phone.
            </p>
          </div>

          {/* Role Choice */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 mb-2">Select Your Role</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'farmer', label: 'Farmer / Producer', icon: '👨‍🌾' },
                { id: 'facility_manager', label: 'Cold Storage', icon: '🏭' },
                { id: 'procurement_officer', label: 'Procurement', icon: '📋' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                    selectedRole === r.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-lg mb-1">{r.icon}</div>
                  <span className="text-xs">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Strict OTP Sign-In Form */}
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            {/* Mobile Number Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Registered Mobile Number *</label>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => {
                      setPhone('+91 94413 89562');
                      setOtpSent(false);
                      setOtpStatus(null);
                      setOtp('');
                      setTouched(prev => ({ ...prev, phone: true }));
                      setFieldErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded cursor-pointer"
                    title="User verified phone for real SMS"
                  >
                    📲 +91 94413 89562 (Real Phone)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhone('+91 98765 43210');
                      setOtpSent(false);
                      setOtpStatus(null);
                      setOtp('');
                      setTouched(prev => ({ ...prev, phone: true }));
                      setFieldErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className="text-[10px] text-slate-500 hover:text-slate-700 bg-slate-100 px-2 py-0.5 rounded cursor-pointer"
                  >
                    Demo Phone
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 94413 89562"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full rounded-xl pl-9 pr-9 py-2.5 font-mono text-sm transition focus:outline-none focus:ring-2 ${
                      touched.phone && fieldErrors.phone
                        ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                        : touched.phone && !fieldErrors.phone
                        ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:ring-emerald-500'
                    }`}
                  />
                  {touched.phone && (
                    <div className="absolute right-3 top-3 pointer-events-none">
                      {fieldErrors.phone ? (
                        <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || countdown > 0}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 text-xs shrink-0 cursor-pointer shadow-xs"
                >
                  {isSendingOtp ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending SMS...</span>
                    </>
                  ) : countdown > 0 ? (
                    <span>Resend in {countdown}s</span>
                  ) : (
                    <>
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>{otpSent ? 'Resend OTP' : 'Send OTP'}</span>
                    </>
                  )}
                </button>
              </div>
              {touched.phone && fieldErrors.phone && (
                <p className="text-[11px] text-rose-600 flex items-center space-x-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.phone}</span>
                </p>
              )}
              {touched.phone && !fieldErrors.phone && (
                <p className="text-[11px] text-emerald-600 flex items-center space-x-1 mt-1 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>✓ Valid 10-digit mobile phone number</span>
                </p>
              )}
            </div>

            {/* Live SMS Status Card */}
            {otpStatus && (
              <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                otpStatus.method === 'TWILIO_VERIFY'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-teal-50 border-teal-300 text-teal-950'
              }`}>
                <div className="flex items-start space-x-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                    otpStatus.method === 'TWILIO_VERIFY' ? 'bg-emerald-500 animate-ping' : 'bg-teal-500'
                  }`} />
                  <div>
                    <p className="font-bold text-xs">
                      {otpStatus.method === 'TWILIO_VERIFY'
                        ? '🟢 Real Cellular SMS Sent to Your Mobile!'
                        : '🔑 Verification OTP Dispatched'}
                    </p>
                    <p className="text-[11px] mt-0.5 opacity-90">
                      {otpStatus.method === 'TWILIO_VERIFY'
                        ? `A 6-digit verification code has been dispatched to ${phone} via Twilio. Please check your physical mobile phone's SMS inbox.`
                        : `Verification code generated: ${otpStatus.otp || 'Check SMS'}. Enter the 6-digit code below to sign in.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 6-Digit SMS OTP Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700 flex items-center space-x-1">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                  <span>6-Digit SMS Verification OTP *</span>
                </label>
                <span className="text-[10px] text-slate-400">Must submit SMS code from phone</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder={otpSent ? "Enter 6-digit SMS OTP from your phone" : "Click 'Send OTP' above first"}
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  onBlur={() => handleBlur('otp')}
                  className={`w-full rounded-xl px-3 py-2.5 font-mono tracking-widest text-sm transition focus:outline-none focus:ring-2 ${
                    touched.otp && fieldErrors.otp
                      ? 'bg-rose-50/30 border-2 border-rose-500 text-rose-900 focus:ring-rose-400'
                      : touched.otp && !fieldErrors.otp && otp.length === 6
                      ? 'bg-emerald-50/20 border-2 border-emerald-500 text-emerald-950 focus:ring-emerald-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:ring-emerald-500'
                  }`}
                />
                {touched.otp && (
                  <div className="absolute right-3 top-3 pointer-events-none">
                    {fieldErrors.otp ? (
                      <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
                    ) : otp.length === 6 ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : null}
                  </div>
                )}
              </div>
              {touched.otp && fieldErrors.otp && (
                <p className="text-[11px] text-rose-600 flex items-center space-x-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fieldErrors.otp}</span>
                </p>
              )}
              {touched.otp && !fieldErrors.otp && otp.length === 6 && (
                <p className="text-[11px] text-emerald-600 flex items-center space-x-1 mt-1 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>✓ 6-digit code format ready for submission</span>
                </p>
              )}
            </div>

            {verifyError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{verifyError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black py-3.5 rounded-xl shadow-md transition text-xs mt-4 cursor-pointer hover:scale-[1.01] disabled:opacity-60"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Cellular OTP...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Verify SMS OTP & Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Direct Switch to Sign Up */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Don't have an account yet?
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className="mt-2 inline-flex items-center space-x-2 text-xs font-black text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-xl transition cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Go to Sign Up Page (Step-by-Step with Land Verification)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

