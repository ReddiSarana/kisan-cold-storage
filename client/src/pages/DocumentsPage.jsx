import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchBookings, getDocxDownloadUrl } from '../services/api';
import {
  FileText,
  Download,
  CheckCircle,
  FileCheck,
  ShieldCheck,
  Building,
  User,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function DocumentsPage() {
  const { currentUser, showToast } = useApp();
  const [docType, setDocType] = useState('agreement'); // 'agreement', 'enwr', 'gate_pass'
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Customizer fields for generating docx
  const [docForm, setDocForm] = useState({
    farmerName: currentUser.name || 'Ramesh Kumar',
    farmerPhone: currentUser.phone || '+91 98765 12345',
    aadhaarOrKcc: currentUser.kccNumber || 'KCC-UP-44921',
    facilityName: 'Shiv Ganga Multi-Chamber Cold Storage',
    facilityLocation: 'Agra, Uttar Pradesh',
    cropName: 'Potato (Kufri Jyoti)',
    quantityQuintals: 180,
    bagsCount: 360,
    monthlyTariffPerQuintal: 38,
    durationMonths: 6,
    chamberNumber: 'Chamber 2 - Rack B-14',
    bookingId: 'BK-2026-901',
    weighmentGrossKg: 14850,
    weighmentTareKg: 5800,
    weighmentNetKg: 9050,
    eNwrNumber: 'ENWR-UP-2026-88412'
  });

  useEffect(() => {
    async function load() {
      try {
        const list = await fetchBookings();
        setBookings(list);
        if (list.length > 0) {
          setSelectedBookingId(list[0].id);
          populateFromBooking(list[0]);
        }
      } catch (e) {
        console.error('Error fetching bookings:', e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const populateFromBooking = (b) => {
    setDocForm(prev => ({
      ...prev,
      farmerName: b.farmerName || prev.farmerName,
      farmerPhone: b.farmerPhone || prev.farmerPhone,
      cropName: b.cropName || prev.cropName,
      quantityQuintals: b.quantityQuintals || prev.quantityQuintals,
      bagsCount: b.bagsCount || (b.quantityQuintals * 2),
      facilityName: b.facilityName || prev.facilityName,
      bookingId: b.id,
      chamberNumber: b.chamberAllocated || 'Chamber 2 - Bay 1',
      weighmentGrossKg: b.weighmentGrossKg || 14850,
      weighmentTareKg: b.weighmentTareKg || 5800,
      weighmentNetKg: b.weighmentNetKg || 9050,
      eNwrNumber: b.eNwrNumber || 'ENWR-UP-2026-88412'
    }));
  };

  const handleBookingChange = (e) => {
    const id = e.target.value;
    setSelectedBookingId(id);
    const found = bookings.find(b => b.id === id);
    if (found) populateFromBooking(found);
  };

  const downloadUrl = getDocxDownloadUrl(docType, selectedBookingId);

  const documentTypes = [
    {
      id: 'agreement',
      title: 'Cold Storage Bailment Agreement',
      subtitle: 'Legally binding agricultural custody contract with temperature guarantees & liability',
      icon: FileText,
      tag: 'Bailment Contract'
    },
    {
      id: 'enwr',
      title: 'Electronic Negotiable Warehouse Receipt (e-NWR)',
      subtitle: 'WDRA-compliant receipt recognized by NABARD & commercial banks for pledge loans',
      icon: ShieldCheck,
      tag: 'Bank Pledgeable'
    },
    {
      id: 'gate_pass',
      title: 'Gate Entry & Inward Weighbridge Pass',
      subtitle: 'Official weighment slip with gross, tare, net produce weight and bay clearance',
      icon: FileCheck,
      tag: 'Security & Weighbridge'
    }
  ];

  const { t } = useLanguage();
  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-800/60 px-3 py-1 rounded-full">
            {t('docsTag', "Official Legal Documentation Center")}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t('docsTitle', "DOCX Request & Generation Portal")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('docsDesc', "Generate and download certified Microsoft Word (.docx) contracts, e-NWR negotiable warehouse receipts, and inward weighbridge slips for bank loan applications and official records.")}
          </p>
        </div>

        <a
          href={downloadUrl}
          download
          onClick={() => showToast(`📥 Generating & downloading ${docType.toUpperCase()}.docx...`)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs py-3.5 px-6 rounded-2xl shadow-xl transition hover:scale-105 flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Native .DOCX File</span>
        </a>
      </div>

      {/* Document Type Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documentTypes.map((dt) => {
          const Icon = dt.icon;
          const isSelected = docType === dt.id;
          return (
            <div
              key={dt.id}
              onClick={() => setDocType(dt.id)}
              className={`p-5 rounded-3xl border-2 transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-600 shadow-md ring-1 ring-blue-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {dt.tag}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">{dt.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{dt.subtitle}</p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-blue-700 font-bold' : 'text-slate-400'}>
                  {isSelected ? '✓ Selected for Output' : 'Click to select'}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Format: .DOCX</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Form Customizer (Left) + Document Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input parameters */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">Document Parameters</h3>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Auto-filled
            </span>
          </div>

          {/* Select from existing bookings */}
          {bookings.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Load Data from Active Consignment:
              </label>
              <select
                value={selectedBookingId}
                onChange={handleBookingChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-600"
              >
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.id} — {b.cropName} ({b.quantityQuintals} Qtl) • {b.farmerName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Editable fields */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Farmer / Depositor Name</label>
              <input
                type="text"
                value={docForm.farmerName}
                onChange={(e) => setDocForm({ ...docForm, farmerName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Phone</label>
                <input
                  type="text"
                  value={docForm.farmerPhone}
                  onChange={(e) => setDocForm({ ...docForm, farmerPhone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">KCC / Aadhaar No</label>
                <input
                  type="text"
                  value={docForm.aadhaarOrKcc}
                  onChange={(e) => setDocForm({ ...docForm, aadhaarOrKcc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cold Storage Facility</label>
              <input
                type="text"
                value={docForm.facilityName}
                onChange={(e) => setDocForm({ ...docForm, facilityName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Crop Variety</label>
                <input
                  type="text"
                  value={docForm.cropName}
                  onChange={(e) => setDocForm({ ...docForm, cropName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quantity (Quintals)</label>
                <input
                  type="number"
                  value={docForm.quantityQuintals}
                  onChange={(e) => setDocForm({ ...docForm, quantityQuintals: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Monthly Tariff (₹/Qtl)</label>
                <input
                  type="number"
                  value={docForm.monthlyTariffPerQuintal}
                  onChange={(e) => setDocForm({ ...docForm, monthlyTariffPerQuintal: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contract Duration (Mo)</label>
                <input
                  type="number"
                  value={docForm.durationMonths}
                  onChange={(e) => setDocForm({ ...docForm, durationMonths: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>
          </div>

          <a
            href={downloadUrl}
            download
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download .DOCX</span>
          </a>
        </div>

        {/* Right: Interactive Document Preview */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-lg text-slate-800 relative space-y-6">
          {/* Watermark Tag */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full uppercase">
              Docx Engine Preview
            </span>
          </div>

          {/* Letterhead Header */}
          <div className="text-center pb-4 border-b-2 border-blue-900 space-y-1">
            <h2 className="text-xl font-black tracking-tight text-blue-950 uppercase">
              {docType === 'enwr' ? 'Warehousing Development and Regulatory Authority' : 'AgroVault Cold Storage Preservation Network'}
            </h2>
            <h3 className="text-sm font-bold text-emerald-800">
              {docType === 'agreement' && 'STANDARD AGRICULTURAL COLD STORAGE BAILMENT CONTRACT'}
              {docType === 'enwr' && 'ELECTRONIC NEGOTIABLE WAREHOUSE RECEIPT (e-NWR)'}
              {docType === 'gate_pass' && 'OFFICIAL GATE ENTRY & WEIGHBRIDGE PASS'}
            </h3>
            <p className="text-[11px] text-slate-500 font-mono">
              Ref: {docType.toUpperCase()}-{docForm.bookingId} • Date: {new Date().toLocaleDateString('en-IN')}
            </p>
          </div>

          {/* Document Content Sample Table */}
          <div className="space-y-4 text-xs">
            <p className="leading-relaxed text-slate-700">
              {docType === 'agreement' && (
                <span>
                  This bailment agreement is entered between the Depositor/Farmer <strong>{docForm.farmerName}</strong> (Contact: {docForm.farmerPhone}, KCC: {docForm.aadhaarOrKcc}), and the Cold Storage Facility <strong>{docForm.facilityName}</strong>.
                </span>
              )}
              {docType === 'enwr' && (
                <span className="text-rose-700 font-semibold">
                  WDRA Statutory Notice: This electronic instrument certifies safe custody of perishable agricultural assets and is legally negotiable for pledge financing under Section 11 of the Warehousing Act.
                </span>
              )}
              {docType === 'gate_pass' && (
                <span>
                  Authorized Entry Verification: The vehicle below has completed security clearance and weighbridge tare checks.
                </span>
              )}
            </p>

            <table className="w-full border-collapse border border-slate-300 text-xs">
              <tbody>
                <tr className="bg-blue-50 border-b border-slate-300">
                  <td className="p-2.5 font-bold text-blue-950 w-1/3 border-r border-slate-300">Facility / Warehouse:</td>
                  <td className="p-2.5">{docForm.facilityName} ({docForm.facilityLocation})</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2.5 font-bold text-slate-700 border-r border-slate-300">Farmer / Depositor:</td>
                  <td className="p-2.5 font-semibold">{docForm.farmerName} ({docForm.farmerPhone})</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2.5 font-bold text-slate-700 border-r border-slate-300">Commodity & Variety:</td>
                  <td className="p-2.5">{docForm.cropName}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2.5 font-bold text-slate-700 border-r border-slate-300">Quantity Stored:</td>
                  <td className="p-2.5 font-bold text-emerald-800">{docForm.quantityQuintals} Quintals ({docForm.bagsCount} Bags)</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2.5 font-bold text-slate-700 border-r border-slate-300">Designated Chamber:</td>
                  <td className="p-2.5 font-mono">{docForm.chamberNumber}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2.5 font-bold text-slate-700 border-r border-slate-300">Monthly Tariff:</td>
                  <td className="p-2.5">₹{docForm.monthlyTariffPerQuintal} / Quintal / Month ({docForm.durationMonths} Months)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-900 border-r border-slate-300">Total Contract Value:</td>
                  <td className="p-2.5 font-black text-slate-900">
                    ₹{(docForm.quantityQuintals * docForm.monthlyTariffPerQuintal * docForm.durationMonths).toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Legal Clauses */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <p><strong>1. Temperature Assurance:</strong> Continuous refrigeration maintained between 2°C to 4°C with dual generator failsafes.</p>
              <p><strong>2. Standard Peril Insurance:</strong> Fully covered against fire, electrical failure, and ammonia leakage under WDRA norms.</p>
              <p><strong>3. Outward Delivery:</strong> Release upon presentation of authorized token and payment of remaining balance.</p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs">
              <div className="space-y-1">
                <div className="border-b border-slate-400 pb-4">
                  <span className="font-script text-slate-700 text-lg italic">{docForm.farmerName}</span>
                </div>
                <p className="font-bold text-slate-800">Signature of Depositor</p>
                <p className="text-[10px] text-slate-400">Farmer / FPO Representative</p>
              </div>

              <div className="space-y-1">
                <div className="border-b border-slate-400 pb-4">
                  <span className="font-script text-blue-900 text-lg italic">Sanjay Singhal</span>
                </div>
                <p className="font-bold text-slate-800">Authorized Signatory & Seal</p>
                <p className="text-[10px] text-slate-400">{docForm.facilityName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
