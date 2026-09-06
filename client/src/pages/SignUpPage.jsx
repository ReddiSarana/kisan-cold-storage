import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserPlus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  FileText,
  MapPin,
  Sparkles,
  LogIn
} from 'lucide-react';

export default function SignUpPage() {
  const {
    startSignUp,
    setActiveTab,
    showToast
  } = useApp();

  const [farmerData, setFarmerData] = useState({
    name: '',
    phone: '',
    state: 'Telangana',
    district: 'Warangal Rural',
    mandal: 'Geesugonda',
    village: 'Dharmaram',
    primaryCrop: 'Chilli',
    expectedYieldQuintals: '120'
  });

  const handleQuickDemoFill = () => {
    setFarmerData({
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      state: 'Telangana',
      district: 'Warangal Rural',
      mandal: 'Geesugonda',
      village: 'Dharmaram',
      primaryCrop: 'Chilli',
      expectedYieldQuintals: '150'
    });
    showToast('⚡ Pre-filled demo farmer details!');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (!farmerData.name || !farmerData.phone) {
      showToast('Please enter your Name and Mobile Number.');
      return;
    }

    startSignUp({
      ...farmerData,
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
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={farmerData.name}
                onChange={(e) => setFarmerData({ ...farmerData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Number (For SMS Tokens & Alerts) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 12345"
                value={farmerData.phone}
                onChange={(e) => setFarmerData({ ...farmerData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">State *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Telangana"
                  value={farmerData.state}
                  onChange={(e) => setFarmerData({ ...farmerData, state: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">District *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Warangal Rural"
                  value={farmerData.district}
                  onChange={(e) => setFarmerData({ ...farmerData, district: e.target.value })}
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
                  value={farmerData.mandal}
                  onChange={(e) => setFarmerData({ ...farmerData, mandal: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Village</label>
                <input
                  type="text"
                  placeholder="e.g. Dharmaram"
                  value={farmerData.village}
                  onChange={(e) => setFarmerData({ ...farmerData, village: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Crop</label>
                <select
                  value={farmerData.primaryCrop}
                  onChange={(e) => setFarmerData({ ...farmerData, primaryCrop: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Chilli">Chilli (మిర్చి / लाल मिर्च)</option>
                  <option value="Potato">Potato (आलू)</option>
                  <option value="Turmeric">Turmeric (పసుపు / हल्दी)</option>
                  <option value="Onion">Onion (उल्ली / प्याज)</option>
                  <option value="Paddy">Paddy / Rice (వరి / धान)</option>
                  <option value="Cotton">Cotton (ప్రత్తి / कपास)</option>
                  <option value="Apple">Apple (सेब)</option>
                  <option value="Tomato">Tomato (టమాట / टमाटर)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Seasonal Yield (Quintals)</label>
                <input
                  type="number"
                  placeholder="120"
                  value={farmerData.expectedYieldQuintals}
                  onChange={(e) => setFarmerData({ ...farmerData, expectedYieldQuintals: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono"
                />
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
