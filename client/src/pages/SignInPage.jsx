import React, { useState } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import {
  LogIn,
  Phone,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Lock,
  UserPlus,
  ArrowLeft
} from 'lucide-react';

export default function SignInPage() {
  const {
    loginUser,
    setActiveTab,
    showToast
  } = useApp();

  const [selectedRole, setSelectedRole] = useState('farmer');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [passcode, setPasscode] = useState('1234');

  const handleSignIn = (e) => {
    e.preventDefault();

    const signedInUser = {
      role: selectedRole,
      name: selectedRole === 'farmer' ? 'Ramesh Kumar' : (selectedRole === 'facility_manager' ? 'Sanjay Singhal' : 'Sunil Verma'),
      phone: phone || '+91 98765 00000',
      district: 'Warangal Rural',
      state: 'Telangana',
      kccNumber: 'KCC-TS-88219',
      avatar: selectedRole === 'farmer' ? '👨‍🌾' : (selectedRole === 'facility_manager' ? '🏭' : '📋')
    };

    loginUser(signedInUser);
  };

  const handleQuickLogin = (roleKey) => {
    const user = DEMO_USERS[roleKey];
    loginUser(user);
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
          <span className="text-slate-400">Need an account?</span>
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

      {/* 1-Click Instant Demo Login Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-200 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Instant Direct Access
              </span>
              <span className="text-xs text-amber-800 font-semibold">1-Click Direct Demo Sign In</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Click any demo profile to enter Krishivalaya inside directly:
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <button
            type="button"
            onClick={() => handleQuickLogin('farmer')}
            className="p-3.5 rounded-2xl border text-left transition flex items-center space-x-3 bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer group hover:scale-[1.02]"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">👨‍🌾</span>
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
            className="p-3.5 rounded-2xl border text-left transition flex items-center space-x-3 bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer group hover:scale-[1.02]"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">🏭</span>
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
            className="p-3.5 rounded-2xl border text-left transition flex items-center space-x-3 bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-500 shadow-xs cursor-pointer group hover:scale-[1.02]"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">📋</span>
            <div>
              <p className="font-bold text-xs group-hover:text-emerald-800">Sunil Verma (APMC Officer)</p>
              <p className="text-[10px] text-slate-500">
                Direct entry to e-NWRs & Quality
              </p>
            </div>
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
                <span className="text-2xl font-black tracking-tight text-white">Krishi<span className="text-emerald-300">valaya</span></span>
                <p className="text-[10px] text-emerald-200 font-medium">Empowering the Annadatha</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs text-emerald-200">
              <LogIn className="w-4 h-4 text-emerald-300" />
              <span>Direct Sign In Page</span>
            </div>

            <div>
              <h2 className="text-2xl font-black leading-tight">
                Direct Sign In to Inside Website
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Sign in with your registered mobile number to immediately access cold storage units, live gate tokens, and legal electronic warehouse receipts.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Direct entrance to Storage Units and Slot Booking.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Live Yard Queue monitoring and weighbridge logs.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Instant SMS notifications on your mobile.</span>
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
            <h3 className="text-lg font-black text-slate-900">Sign In to Your Account</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your mobile and PIN to proceed directly inside Krishivalaya.
            </p>
          </div>

          {/* Role Choice */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 mb-2">Select Your Role</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'farmer', label: 'Farmer', icon: '👨‍🌾' },
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
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Registered Mobile Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Passcode / OTP *</label>
              <input
                type="password"
                required
                placeholder="Enter 4-digit PIN or OTP"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest text-sm"
              />
              <p className="text-[10px] text-slate-400 mt-1">Default demo passcode is <strong>1234</strong></p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black py-3.5 rounded-xl shadow-md transition text-xs mt-4 cursor-pointer hover:scale-[1.02]"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In & Enter Krishivalaya Inside Directly</span>
              <ArrowRight className="w-4 h-4" />
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
