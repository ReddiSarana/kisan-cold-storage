import React, { useState, useEffect } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { sendOtp, verifyOtp } from '../services/api';
import {
  User,
  Phone,
  ShieldCheck,
  Warehouse,
  FileCheck,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Lock,
  MapPin,
  LogIn,
  UserPlus,
  Smartphone,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function AuthPage() {
  const {
    currentUser,
    setCurrentUser,
    switchRole,
    setActiveTab,
    showToast,
    loginUser,
    startSignUp,
    isAuthenticated
  } = useApp();

  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [selectedRole, setSelectedRole] = useState('farmer');

  const [formState, setFormState] = useState({
    name: '',
    phone: '+91 94413 89562',
    district: 'Warangal Rural',
    state: 'Telangana',
    mandal: 'Geesugonda',
    village: 'Dharmaram',
    kccNumber: '',
    primaryCrop: 'Chilli'
  });

  const [passcode, setPasscode] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpStatus, setOtpStatus] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [verifyError, setVerifyError] = useState('');

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!formState.phone || formState.phone.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSendingOtp(true);
    setVerifyError('');
    try {
      const res = await sendOtp(formState.phone, formState.name || 'Cultivator');
      setOtpStatus(res);
      setCountdown(30);

      if (res.method === 'TWILIO_VERIFY') {
        showToast(`📲 Real SMS sent to ${formState.phone} via Twilio! Check your phone.`);
      } else {
        showToast(`🔑 Verification OTP generated for ${formState.phone}.`);
        if (res.otp) {
          setPasscode(res.otp);
        }
      }
    } catch (err) {
      showToast('Error requesting OTP: ' + err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (authMode === 'login') {
      if (!passcode || passcode.trim().length < 4) {
        setVerifyError('Please enter the 6-digit OTP code received via SMS.');
        return;
      }
      try {
        const verifyRes = await verifyOtp(formState.phone, passcode.trim());
        if (!verifyRes.verified) {
          setVerifyError(verifyRes.message || 'Invalid or expired OTP code. Please enter the valid code received via SMS.');
          return;
        }
      } catch (err) {
        setVerifyError('Verification error: ' + err.message);
        return;
      }

      // Direct sign-in: takes user directly into the main platform
      const signedInUser = {
        role: selectedRole,
        name: formState.name || (selectedRole === 'farmer' ? 'Ramesh Kumar' : (selectedRole === 'facility_manager' ? 'Sanjay Singhal' : 'Sunil Verma')),
        phone: formState.phone || '+91 94413 89562',
        district: formState.district || 'Warangal Rural',
        state: formState.state || 'Telangana',
        kccNumber: formState.kccNumber || 'KCC-' + Math.floor(10000 + Math.random() * 90000),
        avatar: selectedRole === 'farmer' ? '👨‍🌾' : (selectedRole === 'facility_manager' ? '🏭' : '📋')
      };

      loginUser(signedInUser);
    } else {
      // Sign up flow: requires submitting land documents to verify first
      const pendingFarmer = {
        role: selectedRole,
        name: formState.name || 'Agri Producer',
        phone: formState.phone || '+91 94413 89562',
        state: formState.state || 'Telangana',
        district: formState.district || 'Warangal Rural',
        mandal: formState.mandal || 'Geesugonda',
        village: formState.village || 'Dharmaram',
        kccNumber: formState.kccNumber || '',
        avatar: selectedRole === 'farmer' ? '👨‍🌾' : (selectedRole === 'facility_manager' ? '🏭' : '📋')
      };

      startSignUp(pendingFarmer);
    }
  };


  const handleQuickLogin = (roleKey) => {
    const user = DEMO_USERS[roleKey];
    loginUser(user);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Main Form Container */}
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
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Agri Identity</span>
            </div>

            <div>
              <h2 className="text-2xl font-black leading-tight">
                {authMode === 'login' ? 'Direct Platform Sign In' : 'New Farmer Registration'}
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {authMode === 'login'
                  ? 'Sign in to access cold storage capacity, live gate tokens, and legal WDRA electronic receipts.'
                  : 'Register your mobile and submit your land documents (Pattadar Passbook / Dharani record) to verify your farm ownership.'
                }
              </p>
            </div>

            {/* Workflow guidance */}
            <div className="bg-white/10 rounded-2xl p-4 text-xs space-y-2.5">
              <p className="font-bold text-emerald-300 uppercase tracking-wider text-[10px]">
                {authMode === 'login' ? '👉 Direct Access Flow' : '👉 Verification Flow'}
              </p>
              {authMode === 'login' ? (
                <div className="space-y-1.5 text-slate-200 text-[11px]">
                  <p>1. Enter mobile number & passcode</p>
                  <p>2. Direct redirection to inside website (Storage Units)</p>
                </div>
              ) : (
                <div className="space-y-1.5 text-slate-200 text-[11px]">
                  <p>1. Fill basic personal & farm contact details</p>
                  <p>2. Submit Dharani / Pattadar Passbook & Survey No.</p>
                  <p>3. Instant verification & automatic access to platform</p>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Instant SMS notifications for gate tokens and bay call-ups.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>WDRA compliant electronic warehouse receipts (.docx).</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-[11px] text-slate-300">
            {isAuthenticated ? (
              <span>Active session: <strong className="text-white">{currentUser.name}</strong></span>
            ) : (
              <span>Visitor Mode • Please Sign In or Register</span>
            )}
          </div>
        </div>

        {/* Right Form */}
        <div className="md:col-span-7 p-8">
          {/* Toggle Login / Signup */}
          <div className="flex items-center justify-center p-1 bg-slate-100 rounded-2xl max-w-xs mx-auto mb-6">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                authMode === 'login' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                authMode === 'signup' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-teal-600" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Subheading Notice */}
          <div className="mb-4 text-center">
            {authMode === 'login' ? (
              <p className="text-xs text-slate-500">
                Already registered? Sign in to enter directly.
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-semibold bg-emerald-50 py-1.5 px-3 rounded-xl border border-emerald-200">
                ℹ️ New users will verify land documents on the next page before entering.
              </p>
            )}
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

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            {authMode === 'signup' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Farmer / Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Mobile Number (For Real OTP & SMS Alerts) *</label>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, phone: '+91 94413 89562' })}
                    className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded cursor-pointer"
                  >
                    📲 +91 94413 89562
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, phone: '+91 98765 43210' })}
                    className="text-[10px] text-slate-500 hover:text-slate-700 bg-slate-100 px-2 py-0.5 rounded cursor-pointer"
                  >
                    Demo
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="tel"
                  required
                  placeholder="+91 94413 89562"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || countdown > 0}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-3 py-2 rounded-xl transition text-xs shrink-0 cursor-pointer flex items-center space-x-1"
                >
                  {isSendingOtp ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : countdown > 0 ? (
                    <span>({countdown}s)</span>
                  ) : (
                    <>
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Send OTP</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* OTP Status Badge */}
            {otpStatus && (
              <div className={`p-2.5 rounded-xl border text-[11px] ${
                otpStatus.method === 'TWILIO_VERIFY'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-teal-50 border-teal-300 text-teal-950'
              }`}>
                <p className="font-bold">
                  {otpStatus.method === 'TWILIO_VERIFY'
                    ? '🟢 Real Cellular SMS Sent via Twilio!'
                    : '🔑 Verification OTP Dispatched'}
                </p>
                <p className="opacity-90 mt-0.5">
                  {otpStatus.method === 'TWILIO_VERIFY'
                    ? `Verification code delivered to your mobile (${formState.phone}). Check your SMS inbox.`
                    : `Verification code generated: ${otpStatus.otp || 'Check SMS'}. Enter the 6-digit code below.`
                  }
                </p>
              </div>
            )}


            {authMode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Warangal Rural"
                      value={formState.district}
                      onChange={(e) => setFormState({ ...formState, district: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Telangana"
                      value={formState.state}
                      onChange={(e) => setFormState({ ...formState, state: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mandal / Tehsil</label>
                    <input
                      type="text"
                      placeholder="e.g. Geesugonda"
                      value={formState.mandal}
                      onChange={(e) => setFormState({ ...formState, mandal: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Village</label>
                    <input
                      type="text"
                      placeholder="e.g. Dharmaram"
                      value={formState.village}
                      onChange={(e) => setFormState({ ...formState, village: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            {authMode === 'login' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">6-Digit SMS Verification OTP *</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="Enter 6-digit SMS OTP"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest text-xs"
                />
                <p className="text-[10px] text-slate-400 mt-1">Must submit the 6-digit SMS OTP code received on your mobile phone</p>
                {verifyError && (
                  <p className="text-[11px] text-red-600 mt-1.5 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{verifyError}</span>
                  </p>
                )}
              </div>
            )}


            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black py-3 rounded-xl shadow-md transition text-xs mt-4 cursor-pointer hover:scale-[1.02]"
            >
              {authMode === 'login' ? (
                <>
                  <span>Sign In & Enter Krishivalaya Directly</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Continue to Land Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
