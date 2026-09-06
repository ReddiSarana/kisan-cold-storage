import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  FileCheck2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Building2,
  FileText,
  MapPin,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

export default function LandVerificationPage() {
  const {
    pendingSignUpData,
    completeLandVerification,
    setActiveTab,
    showToast
  } = useApp();

  const [form, setForm] = useState({
    farmerName: pendingSignUpData?.name || 'Ramesh Kumar',
    phone: pendingSignUpData?.phone || '+91 98765 43210',
    state: pendingSignUpData?.state || 'Telangana',
    district: pendingSignUpData?.district || 'Warangal Rural',
    mandal: pendingSignUpData?.mandal || 'Geesugonda',
    village: pendingSignUpData?.village || 'Dharmaram',
    passbookNumber: '',
    khataNumber: '',
    surveyNumber: '',
    extentAcres: '4.5',
    ownershipType: 'Pattadar (Owner)',
    documentType: 'Dharani Pattadar Passbook (RoR-1B)'
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0); // 0: idle, 1: connecting, 2: validating, 3: success
  const [verificationError, setVerificationError] = useState('');

  // Demo auto-fill helper for instant evaluation
  const handleAutoFillDemo = () => {
    setForm({
      farmerName: pendingSignUpData?.name || 'Ramesh Kumar',
      phone: pendingSignUpData?.phone || '+91 98765 43210',
      state: 'Telangana',
      district: 'Warangal Rural',
      mandal: 'Geesugonda',
      village: 'Dharmaram',
      passbookNumber: 'PPB-TS-2024-88421',
      khataNumber: 'KH-819',
      surveyNumber: '48/A, 49/1',
      extentAcres: '5.25',
      ownershipType: 'Pattadar (Owner)',
      documentType: 'Dharani Pattadar Passbook (RoR-1B)'
    });
    setUploadedFile({
      name: 'Dharani_E-Passbook_RoR_Verified.pdf',
      size: '1.4 MB',
      verified: true
    });
    showToast('⚡ Pre-filled verified Telangana Dharani Passbook data for demo!');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        verified: true
      });
      showToast(`Uploaded: ${file.name}`);
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (!form.passbookNumber || !form.surveyNumber) {
      setVerificationError('Please enter Passbook / Khata Number and Survey Number.');
      return;
    }

    setVerificationError('');
    setIsVerifying(true);
    setVerificationStep(1);

    // Simulated 3-step real-time land registry clearance
    setTimeout(() => {
      setVerificationStep(2);
    }, 1200);

    setTimeout(() => {
      setVerificationStep(3);
    }, 2400);

    setTimeout(() => {
      setIsVerifying(false);
      completeLandVerification({
        ...form,
        documentName: uploadedFile?.name || 'Verified_E_Passbook.pdf',
        verifiedAt: new Date().toISOString(),
        status: 'VERIFIED_TITLE'
      });
    }, 3600);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header & Breadcrumbs */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs text-emerald-800 font-semibold mb-1">
            <span className="cursor-pointer hover:underline" onClick={() => setActiveTab('about')}>Home</span>
            <span>&rarr;</span>
            <span className="cursor-pointer hover:underline" onClick={() => setActiveTab('auth')}>Registration</span>
            <span>&rarr;</span>
            <span className="text-emerald-950 font-bold">Land Document Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>🌾 Farmer Land Ownership Verification</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Submit your Dharani / Pattadar Passbook or RoR records to unlock cold storage space and bank credit receipts.
          </p>
        </div>

        {/* Quick Demo Fill Button */}
        <button
          type="button"
          onClick={handleAutoFillDemo}
          className="self-start sm:self-center flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition hover:scale-105 cursor-pointer"
          title="Auto-fill with sample Telangana Dharani passbook"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-100" />
          <span>⚡ Auto-Fill Demo Passbook</span>
        </button>
      </div>

      {/* 3-Step Verification Pipeline Indicator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              ✓
            </div>
            <div>
              <p className="text-[11px] font-bold text-emerald-950">Step 1: Sign Up Details</p>
              <p className="text-[10px] text-emerald-700">{form.farmerName} • {form.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border-2 border-emerald-500 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 animate-pulse">
              2
            </div>
            <div>
              <p className="text-[11px] font-black text-emerald-950">Step 2: Land Records</p>
              <p className="text-[10px] text-emerald-700">Dharani / PPB Passbook</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-400">
            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
              3
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-700">Step 3: Krishivalaya Clearance</p>
              <p className="text-[10px] text-slate-500">Instant Access to Main Portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Verification Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] text-emerald-200 font-bold mb-1">
                <Lock className="w-3 h-3 text-emerald-300" />
                <span>State Land Records Portal Integration</span>
              </div>
              <h2 className="text-xl font-black text-white">Government Land Title Verification</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                As per WDRA cold storage norms, agricultural capacity is reserved for verified cultivators. Enter your Pattadar Passbook / Dharani record to confirm land ownership.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerificationSubmit} className="p-6 sm:p-8 space-y-6">
          {verificationError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{verificationError}</span>
            </div>
          )}

          {/* Farmer & Location Details (Pre-filled from Registration) */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>1. Cultivator & Farm Location</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Pattadar / Farmer Name</label>
                <input
                  type="text"
                  required
                  value={form.farmerName}
                  onChange={(e) => setForm({ ...form, farmerName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Registered Mobile</label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  required
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mandal / Tehsil</label>
                <input
                  type="text"
                  required
                  value={form.mandal}
                  onChange={(e) => setForm({ ...form, mandal: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Village</label>
                <input
                  type="text"
                  required
                  value={form.village}
                  onChange={(e) => setForm({ ...form, village: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 my-4"></div>

          {/* Dharani / Land Record Numbers */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
              <span>2. Dharani Passbook & Survey Identifiers</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Pattadar Passbook No. (PPB) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PPB-TS-2024-88421"
                  value={form.passbookNumber}
                  onChange={(e) => setForm({ ...form, passbookNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Printed on your green Passbook cover</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Khata Number / Account No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KH-819"
                  value={form.khataNumber}
                  onChange={(e) => setForm({ ...form, khataNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Khata number as in Dharani portal</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Survey Number(s) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 48/A, 49/1"
                  value={form.surveyNumber}
                  onChange={(e) => setForm({ ...form, surveyNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Comma separated if multiple parcels</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Cultivable Land Extent (Acres)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5.25"
                  value={form.extentAcres}
                  onChange={(e) => setForm({ ...form, extentAcres: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ownership Classification
                </label>
                <select
                  value={form.ownershipType}
                  onChange={(e) => setForm({ ...form, ownershipType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Pattadar (Owner)">Pattadar (Title Owner)</option>
                  <option value="Registered Tenant Cultivator">Registered Tenant Cultivator (CCRC)</option>
                  <option value="FPO / Farmer Group Collective">FPO / Farmer Group Collective</option>
                  <option value="Legal Heir / Inherted Land">Legal Heir / Inherited Land</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Document Proof Type
                </label>
                <select
                  value={form.documentType}
                  onChange={(e) => setForm({ ...form, documentType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Dharani Pattadar Passbook (RoR-1B)">Dharani Pattadar Passbook (RoR-1B)</option>
                  <option value="Rythu Bandhu Registered Card">Rythu Bandhu Registered Title</option>
                  <option value="Registered Lease Agreement">Registered Lease Agreement</option>
                  <option value="PM-Kisan Land Seeding Certificate">PM-Kisan Land Seeding Certificate</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 my-4"></div>

          {/* Document Upload Zone */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
              <span>3. Upload Scanned Passbook or Dharani RoR Copy</span>
            </h3>

            <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 bg-slate-50/60 hover:bg-emerald-50/30 rounded-2xl p-6 text-center transition cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-emerald-600">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drag & drop document scan
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supported formats: PDF, JPG, PNG (Max 15MB)
                  </p>
                </div>
              </div>
            </div>

            {uploadedFile && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{uploadedFile.name}</p>
                    <p className="text-[10px] text-emerald-700">Size: {uploadedFile.size} • Ready for verification</p>
                  </div>
                </div>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Attached
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('auth')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              &larr; Back to Registration
            </button>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              <span>Verify Land Documents & Enter Krishivalaya</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>
        </form>
      </div>

      {/* Real-time Simulated Verification Modal */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-300 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                Verifying Land Ownership Record
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Authenticating with Telangana Dharani Land Registry & WDRA Repository
              </p>
            </div>

            {/* Checklist progression */}
            <div className="space-y-2.5 text-left text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center space-x-2.5">
                {verificationStep >= 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                )}
                <span className={verificationStep >= 1 ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                  Querying Dharani Database for Khata {form.khataNumber || '819'}...
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                {verificationStep >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                )}
                <span className={verificationStep >= 2 ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                  Matching Survey No. {form.surveyNumber || '48/A'} with Pattadar Title...
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                {verificationStep >= 3 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                )}
                <span className={verificationStep >= 3 ? 'text-slate-900 font-bold' : 'text-slate-400'}>
                  Approved! Generating Verified Krishivalaya Kisan Seal...
                </span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-700 font-semibold animate-pulse">
              Almost done! Redirecting you directly to Krishivalaya Storage Units...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
