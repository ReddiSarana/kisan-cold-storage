import React, { useState } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
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
  UserPlus
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
    phone: '',
    district: 'Warangal Rural',
    state: 'Telangana',
    mandal: 'Geesugonda',
    village: 'Dharmaram',
    kccNumber: '',
    primaryCrop: 'Chilli'
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'login') {
      // Direct sign-in: takes user directly into the main platform
      const signedInUser = {
        role: selectedRole,
        name: formState.name || (selectedRole === 'farmer' ? 'Ramesh Kumar' : (selectedRole === 'facility_manager' ? 'Sanjay Singhal' : 'Sunil Verma')),
        phone: formState.phone || '+91 98765 00000',
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
        phone: formState.phone || '+91 98765 00000',
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
      {/* 1-Click Instant Demo Login Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-200 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Instant Direct Access
              </span>
              <span className="text-xs text-amber-800 font-semibold">Click any demo profile to enter directly</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Select a pre-configured role to enter Krishivalaya immediately:
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <button
            type="button"
            onClick={() => handleQuickLogin('farmer')}
            className="p-3 rounded-2xl border text-left transition flex items-center space-x-3 bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">👨‍🌾</span>
            <div>
              <p className="font-bold text-xs group-hover:text-emerald-800">Ramesh Kumar (Farmer)</p>
              <p className="text-[10px] text-slate-500">
                Direct entry to Storage Units & Booking
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('facility_manager')}
            className="p-3 rounded-2xl border text-left transition flex items-center space-x-3 bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🏭</span>
            <div>
              <p className="font-bold text-xs group-hover:text-emerald-800">Sanjay Singhal (Store Operator)</p>
              <p className="text-[10px] text-slate-500">
                Direct entry to Yard Queue & Bays
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('procurement_officer')}
            className="p-3 rounded-2xl border text-left transition flex items-center space-x-3 bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">📋</span>
            <div>
              <p className="font-bold text-xs group-hover:text-emerald-800">Sunil Verma (APMC Officer)</p>
              <p className="text-[10px] text-slate-500">
                Direct entry to e-NWRs & Quality
              </p>
            </div>
          </button>
        </div>
      </div>

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
              <label className="block font-semibold text-slate-700 mb-1">Mobile Number (For OTP & SMS Alerts) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 12345"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

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
                <label className="block font-semibold text-slate-700 mb-1">Passcode / OTP</label>
                <input
                  type="password"
                  placeholder="Enter 4-digit PIN or OTP"
                  defaultValue="1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest"
                />
                <p className="text-[10px] text-slate-400 mt-1">Default demo passcode is <strong>1234</strong></p>
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
