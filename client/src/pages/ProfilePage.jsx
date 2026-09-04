import React, { useState } from 'react';
import { useApp, DEMO_USERS } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  CreditCard,
  Edit3,
  CheckCircle,
  Clock,
  Warehouse,
  Sparkles,
  QrCode,
  Download,
  Printer,
  ChevronRight,
  Sprout,
  FileText,
  BadgeCheck,
  X
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateUserProfile, switchRole, setActiveTab, showToast } = useApp();
  const { t } = useLanguage();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
    email: currentUser.email || '',
    village: currentUser.village || '',
    mandal: currentUser.mandal || '',
    district: currentUser.district || '',
    state: currentUser.state || '',
    farmSizeAcres: currentUser.farmSizeAcres || '',
    primaryCrop: currentUser.primaryCrop || '',
    secondaryCrops: currentUser.secondaryCrops || '',
    upiId: currentUser.upiId || '',
    bankName: currentUser.bankName || ''
  });

  const handleOpenEdit = () => {
    setEditFormData({
      name: currentUser.name || '',
      phone: currentUser.phone || '',
      email: currentUser.email || '',
      village: currentUser.village || '',
      mandal: currentUser.mandal || '',
      district: currentUser.district || '',
      state: currentUser.state || '',
      farmSizeAcres: currentUser.farmSizeAcres || '',
      primaryCrop: currentUser.primaryCrop || '',
      secondaryCrops: currentUser.secondaryCrops || '',
      upiId: currentUser.upiId || '',
      bankName: currentUser.bankName || ''
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(editFormData);
    setIsEditModalOpen(false);
  };

  const isFarmer = currentUser.role === 'farmer';
  const isManager = currentUser.role === 'facility_manager';
  const isOfficer = currentUser.role === 'procurement_officer';

  return (
    <div className="space-y-10 py-6 sm:py-8 max-w-6xl mx-auto">
      
      {/* Top Banner & Avatar Profile Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar with KYC Ring */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-5xl sm:text-6xl shadow-xl border-4 border-white/20 group-hover:scale-105 transition-transform">
                {currentUser.avatar || '👨‍🌾'}
              </div>
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900 shadow-sm" title="Aadhaar & WDRA KYC Verified">
                <BadgeCheck className="w-5 h-5 text-white" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-700/80 text-emerald-200 px-3 py-0.5 rounded-full">
                  {currentUser.role.replace('_', ' ')}
                </span>
                <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  KYC Verified
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                {currentUser.name}
              </h1>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-emerald-200/90">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  {currentUser.village ? `${currentUser.village}, ` : ''}{currentUser.district}, {currentUser.state}
                </span>
                <span className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  {currentUser.phone}
                </span>
                {currentUser.email && (
                  <span className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    {currentUser.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleOpenEdit}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition backdrop-blur"
              title="Print Kisan Identity Card"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-300" />
              <span>Print ID Card</span>
            </button>
          </div>
        </div>

        {/* Quick Identity Badges */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Kisan Scheme ID / KCC</span>
            <strong className="text-emerald-300 font-mono text-sm">{currentUser.kccNumber || currentUser.wdraRegNo || currentUser.officerId || 'KCC-TS-44921'}</strong>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">PM-Kisan DBT Status</span>
            <span className="text-teal-300 font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Active (Direct Credit)
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Primary Produce / Role</span>
            <strong className="text-amber-200">{currentUser.primaryCrop || currentUser.facilityName || 'Agricultural Trade'}</strong>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Member Since</span>
            <strong className="text-white">{currentUser.joinedDate || '2024'}</strong>
          </div>
        </div>
      </div>

      {/* Profile Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isFarmer && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cold Deposited</span>
                <Warehouse className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">{currentUser.totalDepositedQtl || 380} <span className="text-sm font-semibold text-slate-500">Quintals</span></p>
              <p className="text-[11px] text-emerald-700 font-semibold">Teja Mirchi & Turmeric</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Gate Tokens</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-slate-900 font-mono">TK-102</p>
              <p className="text-[11px] text-amber-700 font-semibold">Assigned Bay 2 (Warangal)</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">e-NWR Receipts</span>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">2 <span className="text-sm font-semibold text-slate-500">Issued</span></p>
              <p className="text-[11px] text-blue-700 font-semibold">WDRA Bank-Pledgeable</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pledge Credit</span>
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">{currentUser.pledgeLoansActive || '₹3,40,000'}</p>
              <p className="text-[11px] text-purple-700 font-semibold">7% Subsidized Interest</p>
            </div>
          </>
        )}

        {isManager && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Chamber Capacity</span>
              <p className="text-2xl font-black text-slate-900">{currentUser.totalCapacityMT} MT</p>
              <p className="text-[11px] text-emerald-700 font-semibold">8 Independent Chambers</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Capacity</span>
              <p className="text-2xl font-black text-slate-900">{currentUser.availableCapacityMT} MT</p>
              <p className="text-[11px] text-teal-700 font-semibold">Ready for Intake</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">WDRA Reg Status</span>
              <p className="text-2xl font-black text-emerald-700">Class A</p>
              <p className="text-[11px] text-slate-500 font-semibold">Valid till Dec 2028</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Yard Intakes</span>
              <p className="text-2xl font-black text-slate-900">14 Vehicles</p>
              <p className="text-[11px] text-amber-700 font-semibold">Avg Turnaround 42 mins</p>
            </div>
          </>
        )}

        {isOfficer && (
          <>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">APMC Mandi Yard</span>
              <p className="text-xl font-black text-slate-900">Enumamula Spices</p>
              <p className="text-[11px] text-emerald-700 font-semibold">Warangal Market Committee</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assaying Certificate</span>
              <p className="text-xl font-black text-slate-900">Class-1 Senior</p>
              <p className="text-[11px] text-teal-700 font-semibold">AGMARK Certified</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consignments Inspected</span>
              <p className="text-2xl font-black text-slate-900">1,420 MT</p>
              <p className="text-[11px] text-blue-700 font-semibold">Warangal & Nizamabad Zones</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Disbursement Clearance</span>
              <p className="text-2xl font-black text-emerald-700">100%</p>
              <p className="text-[11px] text-slate-500 font-semibold">Zero Pending Payouts</p>
            </div>
          </>
        )}
      </div>

      {/* Two Column Layout: Detailed Info (Left) + Digital Kisan ID Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Comprehensive Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Personal & Contact Profile */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Personal & Geographical Details</h3>
              </div>
              <button
                onClick={handleOpenEdit}
                className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Full Legal Name</span>
                <p className="text-slate-900 font-bold mt-0.5">{currentUser.name}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Mobile Number (SMS Enabled)</span>
                <p className="text-slate-900 font-mono font-bold mt-0.5">{currentUser.phone}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Village / Settlement</span>
                <p className="text-slate-800 font-medium mt-0.5">{currentUser.village || 'Maheshwaram'}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Mandal / Taluka</span>
                <p className="text-slate-800 font-medium mt-0.5">{currentUser.mandal || 'Narsampet'}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">District</span>
                <p className="text-slate-800 font-medium mt-0.5">{currentUser.district}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">State</span>
                <p className="text-slate-800 font-medium mt-0.5">{currentUser.state} (PIN: {currentUser.pincode || '506132'})</p>
              </div>
            </div>
          </div>

          {/* Section 2: Farm & Agronomic Data (or Facility Specs) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isFarmer ? 'Agronomic & Cultivation Profile' : (isManager ? 'Cold Chain Facility Specifications' : 'Inspection & Certification Profile')}
                </h3>
              </div>
            </div>

            {isFarmer && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Total Cultivated Holding</span>
                  <p className="text-slate-900 font-bold mt-0.5">{currentUser.farmSizeAcres || '6.5'} Acres</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Soil Classification</span>
                  <p className="text-slate-800 font-medium mt-0.5">{currentUser.soilType || 'Black Cotton Soil (Regur)'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Primary Harvested Crop</span>
                  <p className="text-emerald-800 font-bold mt-0.5">{currentUser.primaryCrop || 'Dry Red Chilli (Teja Mirchi)'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Secondary Rotation Crops</span>
                  <p className="text-slate-800 font-medium mt-0.5">{currentUser.secondaryCrops || 'Turmeric, Cotton, Maize'}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-semibold block">Irrigation Infrastructure</span>
                  <p className="text-slate-800 font-medium mt-0.5">{currentUser.irrigationType || 'Deep Borewell with Micro Drip Fertigation'}</p>
                </div>
              </div>
            )}

            {isManager && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Facility Legal Name</span>
                  <p className="text-slate-900 font-bold mt-0.5">{currentUser.facilityName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">WDRA Registration Certificate</span>
                  <p className="text-emerald-800 font-mono font-bold mt-0.5">{currentUser.wdraRegNo}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Cold Storage Chambers</span>
                  <p className="text-slate-800 font-medium mt-0.5">{currentUser.chambersCount} High-Humidity Cold Rooms</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Supported Produce</span>
                  <p className="text-slate-800 font-medium mt-0.5">{currentUser.supportedCommodities}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-semibold block">Fire Safety & Multi-Peril Insurance</span>
                  <p className="text-slate-800 font-medium mt-0.5">{currentUser.insurancePolicy || 'National Insurance Multi-Peril Goods Policy #49102'}</p>
                </div>
              </div>
            )}

            {isOfficer && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Authorizing Organization</span>
                  <p className="text-slate-900 font-bold mt-0.5">{currentUser.organization}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Inspector Badge ID</span>
                  <p className="text-emerald-800 font-mono font-bold mt-0.5">{currentUser.officerId}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Assigned APMC Yard</span>
                  <p className="text-slate-800 font-medium mt-0.5">{currentUser.apmcMandi}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Quality Certification Level</span>
                  <p className="text-slate-800 font-medium mt-0.5">{currentUser.gradingCertLevel}</p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Financial & Direct Benefit Transfer (DBT) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Direct Benefit Transfer (DBT) & Banking Profile</h3>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                NABARD & NPCI Linked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Bank Account Holder</span>
                <p className="text-slate-900 font-bold mt-0.5">{currentUser.name}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Designated Agricultural Bank</span>
                <p className="text-slate-800 font-medium mt-0.5">{currentUser.bankName || 'State Bank of India (Warangal Agri Branch)'}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Account Number</span>
                <p className="text-slate-900 font-mono font-bold mt-0.5">{currentUser.accountNumber || '••••••••4819'}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">IFSC Code</span>
                <p className="text-slate-800 font-mono font-medium mt-0.5">{currentUser.ifscCode || 'SBIN0001234'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 font-semibold block">Instant Payout UPI ID (For MSP Procurement)</span>
                <p className="text-emerald-700 font-mono font-bold mt-0.5">{currentUser.upiId || 'mallaiah.kisan@sbi'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Digital Kisan Card & Fast Switcher */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Visual Digital Kisan Identity Card */}
          <div className="relative rounded-3xl p-6 shadow-xl overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-950 text-white border-2 border-emerald-400/30">
            {/* Background Holographic Lines */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Card Top Branding */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🇮🇳</span>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-white">Digital Kisan Identity</h4>
                  <p className="text-[9px] text-emerald-200">Ministry of Agriculture • WDRA Regulated</p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-emerald-300">
                🌾
              </div>
            </div>

            {/* Chip & Contactless Emblem */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-7 rounded-md bg-gradient-to-r from-amber-300 to-yellow-500 shadow-sm border border-amber-200/50 flex items-center justify-center">
                <div className="w-6 h-4 border border-amber-800/40 rounded-sm grid grid-cols-2 gap-0.5 p-0.5 opacity-60"></div>
              </div>
              <span className="font-mono text-xs text-emerald-200/70 tracking-widest">((( RFID LIVE )))</span>
            </div>

            {/* Cardholder Info */}
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-emerald-200 uppercase font-semibold">Cardholder & Beneficiary</p>
                <h3 className="text-lg font-black tracking-tight text-white">{currentUser.name}</h3>
                <p className="text-xs text-emerald-300 font-medium capitalize">{currentUser.role.replace('_', ' ')} • {currentUser.district}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-white/15 font-mono">
                <div>
                  <span className="text-[9px] text-emerald-300/80 block uppercase">Kisan ID / KCC</span>
                  <strong>{currentUser.kccNumber || currentUser.wdraRegNo || 'KCC-TS-44921'}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-emerald-300/80 block uppercase">Aadhaar Verified</span>
                  <strong>XXXX-XXXX-{currentUser.aadhaarLast4 || '7829'}</strong>
                </div>
              </div>
            </div>

            {/* Card Barcode / QR Simulation */}
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] text-emerald-300 uppercase block font-mono">Gate Access Passcode</span>
                <span className="text-xs font-mono font-bold text-amber-200">VALID TILL 12/2028</span>
              </div>
              <div className="w-10 h-10 bg-white p-1 rounded-lg flex items-center justify-center shadow">
                <QrCode className="w-8 h-8 text-slate-900" />
              </div>
            </div>
          </div>

          {/* Role Switching Shortcut Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Quick Profile Switcher (Demo Mode)
            </h4>
            <p className="text-xs text-slate-500">
              Test AgroVault workflows from different user viewpoints in one click:
            </p>
            <div className="space-y-2">
              {Object.entries(DEMO_USERS).map(([key, user]) => (
                <button
                  key={key}
                  onClick={() => switchRole(key)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${
                    currentUser.role === user.role
                      ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                      : 'hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{user.avatar}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                      <p className="text-[10px] text-slate-500 capitalize">{user.role.replace('_', ' ')} • {user.district}</p>
                    </div>
                  </div>
                  {currentUser.role === user.role ? (
                    <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Edit3 className="w-5 h-5 text-emerald-300" />
                <h3 className="text-base font-bold">Edit Profile Details</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Village / Town</label>
                  <input
                    type="text"
                    value={editFormData.village}
                    onChange={(e) => setEditFormData({ ...editFormData, village: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mandal / Taluka</label>
                  <input
                    type="text"
                    value={editFormData.mandal}
                    onChange={(e) => setEditFormData({ ...editFormData, mandal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    value={editFormData.district}
                    onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={editFormData.state}
                    onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {isFarmer && (
                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Farm Land (Acres)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editFormData.farmSizeAcres}
                      onChange={(e) => setEditFormData({ ...editFormData, farmSizeAcres: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Primary Produce</label>
                    <input
                      type="text"
                      value={editFormData.primaryCrop}
                      onChange={(e) => setEditFormData({ ...editFormData, primaryCrop: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              )}

              <div className="pt-1 border-t border-slate-100">
                <label className="block font-semibold text-slate-700 mb-1">Payout UPI ID (For Direct Payouts)</label>
                <input
                  type="text"
                  value={editFormData.upiId}
                  onChange={(e) => setEditFormData({ ...editFormData, upiId: e.target.value })}
                  placeholder="e.g. mobile@upi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
