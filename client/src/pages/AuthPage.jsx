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
  ArrowRight
} from 'lucide-react';

export default function AuthPage() {
  const { currentUser, setCurrentUser, switchRole, setActiveTab, showToast, setIsSmsSimulatorOpen } = useApp();
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [selectedRole, setSelectedRole] = useState('farmer');

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    district: '',
    state: 'Uttar Pradesh',
    kccNumber: '',
    facilityName: '',
    primaryCrop: 'Potato'
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      role: selectedRole,
      name: formState.name || 'Agri Producer',
      phone: formState.phone || '+91 98765 00000',
      district: formState.district || 'Agra',
      state: formState.state || 'Uttar Pradesh',
      kccNumber: formState.kccNumber || 'KCC-' + Math.floor(10000 + Math.random() * 90000),
      avatar: selectedRole === 'farmer' ? '👨‍🌾' : (selectedRole === 'facility_manager' ? '🏭' : '📋')
    };

    setCurrentUser(newUser);
    showToast(`Welcome ${newUser.name}! Signed in as ${selectedRole.replace('_', ' ')}.`);

    // If farmer, take them to units; if operator, take to queue
    if (selectedRole === 'facility_manager') {
      setActiveTab('queue');
    } else if (selectedRole === 'procurement_officer') {
      setActiveTab('tracking');
    } else {
      setActiveTab('units');
    }
  };

  const handleQuickLogin = (roleKey) => {
    switchRole(roleKey);
    const user = DEMO_USERS[roleKey];
    showToast(`Quick logged in as ${user.name}`);
    if (roleKey === 'facility_manager') {
      setActiveTab('queue');
    } else if (roleKey === 'procurement_officer') {
      setActiveTab('tracking');
    } else {
      setActiveTab('units');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* 1-Click Instant Demo Login Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-200 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Instant Demo Access
              </span>
              <span className="text-xs text-amber-800 font-semibold">No password needed for evaluation</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Select a pre-configured role to test all features instantly:
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <button
            type="button"
            onClick={() => handleQuickLogin('farmer')}
            className={`p-3 rounded-2xl border text-left transition flex items-center space-x-3 ${
              currentUser.role === 'farmer'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200'
            }`}
          >
            <span className="text-2xl">👨‍🌾</span>
            <div>
              <p className="font-bold text-xs">Ramesh Kumar (Farmer)</p>
              <p className={`text-[10px] ${currentUser.role === 'farmer' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Book storage, track token & SMS
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('facility_manager')}
            className={`p-3 rounded-2xl border text-left transition flex items-center space-x-3 ${
              currentUser.role === 'facility_manager'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200'
            }`}
          >
            <span className="text-2xl">🏭</span>
            <div>
              <p className="font-bold text-xs">Sanjay Singhal (Store Operator)</p>
              <p className={`text-[10px] ${currentUser.role === 'facility_manager' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Manage yard queue, call bays
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('procurement_officer')}
            className={`p-3 rounded-2xl border text-left transition flex items-center space-x-3 ${
              currentUser.role === 'procurement_officer'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200'
            }`}
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-bold text-xs">Sunil Verma (APMC Officer)</p>
              <p className={`text-[10px] ${currentUser.role === 'procurement_officer' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Grade quality & issue e-NWRs
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
              <span className="text-2xl font-black tracking-tight text-white">Krishi<span className="text-emerald-300">valaya</span></span>
            </div>
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Agri Identity</span>
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight">
                Single Sign-On for Farmers & Cold Chains
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Connect your Kisan Credit Card or Mobile Number to access cold storage rates across India, skip gate queues, and generate instant legal bailment contracts.
              </p>
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
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>Zero middlemen tariffs and live capacity verification.</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-[11px] text-slate-300">
            Current active session: <br />
            <strong className="text-white">{currentUser.name}</strong> ({currentUser.role.replace('_', ' ')})
          </div>
        </div>

        {/* Right Form */}
        <div className="md:col-span-7 p-8">
          {/* Toggle Login / Signup */}
          <div className="flex items-center justify-center p-1 bg-slate-100 rounded-xl max-w-xs mx-auto mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                authMode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                authMode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
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
                  className={`p-2.5 rounded-xl border text-center transition ${
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
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 font-mono"
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
                      placeholder="e.g. Agra"
                      value={formState.district}
                      onChange={(e) => setFormState({ ...formState, district: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Uttar Pradesh"
                      value={formState.state}
                      onChange={(e) => setFormState({ ...formState, state: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                {selectedRole === 'farmer' && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kisan Credit Card (KCC) or Aadhaar (Optional)</label>
                    <input
                      type="text"
                      placeholder="KCC-UP-XXXXX"
                      value={formState.kccNumber}
                      onChange={(e) => setFormState({ ...formState, kccNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 uppercase"
                    />
                  </div>
                )}
              </>
            )}

            {authMode === 'login' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Passcode / OTP</label>
                <input
                  type="password"
                  placeholder="Enter 4-digit PIN or OTP"
                  defaultValue="1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 font-mono tracking-widest"
                />
                <p className="text-[10px] text-slate-400 mt-1">Default demo passcode is <strong>1234</strong></p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md transition text-xs mt-2"
            >
              {authMode === 'login' ? 'Sign In to Account' : 'Register & Get Started'} &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
