import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchBookings, updateBooking, getDocxDownloadUrl } from '../services/api';
import {
  Activity,
  CheckCircle,
  Clock,
  Truck,
  Scale,
  ShieldCheck,
  CreditCard,
  FileText,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function TrackingPage() {
  const { currentUser, showToast } = useApp();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form for recording procurement updates
  const [weighmentGross, setWeighmentGross] = useState('');
  const [weighmentTare, setWeighmentTare] = useState('');
  const [qualityGrade, setQualityGrade] = useState('Grade A (Moisture 12.5%, Defect <2%)');

  const loadBookings = async () => {
    try {
      const data = await fetchBookings();
      setBookings(data);
      if (data.length > 0) {
        setSelectedBooking(data[0]);
        setWeighmentGross(data[0].weighmentGrossKg || 14850);
        setWeighmentTare(data[0].weighmentTareKg || 5800);
      }
    } catch (e) {
      console.error('Error fetching bookings:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleSelectBooking = (b) => {
    setSelectedBooking(b);
    setWeighmentGross(b.weighmentGrossKg || '');
    setWeighmentTare(b.weighmentTareKg || '');
  };

  const handleAdvanceStage = async (nextStatus) => {
    if (!selectedBooking) return;
    setIsUpdating(true);
    try {
      const updates = { status: nextStatus };
      if (nextStatus === 'stored' && !selectedBooking.eNwrNumber) {
        updates.eNwrNumber = `ENWR-UP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      }
      if (weighmentGross && weighmentTare) {
        updates.weighmentGrossKg = Number(weighmentGross);
        updates.weighmentTareKg = Number(weighmentTare);
      }
      updates.qualityGrade = qualityGrade;

      const res = await updateBooking(selectedBooking.id, updates);
      if (res.success) {
        setSelectedBooking(res.data);
        showToast(`Consignment ${selectedBooking.id} updated to status: ${nextStatus}!`);
        loadBookings();
      }
    } catch (err) {
      alert('Error advancing consignment: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePayRemaining = async () => {
    if (!selectedBooking) return;
    setIsUpdating(true);
    try {
      const updates = {
        advancePaid: selectedBooking.estimatedCostTotal,
        balanceDue: 0,
        status: 'completed'
      };
      const res = await updateBooking(selectedBooking.id, updates);
      if (res.success) {
        setSelectedBooking(res.data);
        showToast(`Payment of ₹${selectedBooking.balanceDue} settled successfully!`);
        loadBookings();
      }
    } catch (err) {
      alert('Error recording payment: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const stages = [
    { key: 'confirmed', label: '1. Booking Reserved', desc: 'Chamber allocated, Gate Token issued' },
    { key: 'in_yard', label: '2. Gate Entry & Weighment', desc: 'Gross vehicle weighment recorded' },
    { key: 'in_progress', label: '3. Quality Inspection', desc: 'Moisture check & defect grading' },
    { key: 'stored', label: '4. Chamber Stacking', desc: 'Stored under 2°C-4°C, e-NWR issued' },
    { key: 'completed', label: '5. Transaction Settlement', desc: 'Storage fees cleared or crop released' }
  ];

  const getStageIndex = (status) => {
    const map = { confirmed: 0, in_yard: 1, in_progress: 2, stored: 3, completed: 4 };
    return map[status] ?? 0;
  };

  const currentStageIdx = selectedBooking ? getStageIndex(selectedBooking.status) : 0;

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full">
            End-to-End Agri-Logistics Audit Trail
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Procurement & Transaction Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Monitor the exact physical movement of your harvested crop from weighbridge gross logging, moisture quality grading, cold room stacking, to bank-pledged payment settlement.
          </p>
        </div>

        {selectedBooking && (
          <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl flex items-center space-x-3">
            <div>
              <p className="text-[10px] text-emerald-300 font-bold uppercase">Active Consignment</p>
              <p className="text-lg font-black font-mono text-white">{selectedBooking.id}</p>
              <p className="text-[11px] text-slate-300">{selectedBooking.cropName}</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Layout: Consignment Selector (Left) + Pipeline & Ledger (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Consignment List */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Tracked Consignments ({bookings.length})
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
              Live DB
            </span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {bookings.map((b) => (
              <div
                key={b.id}
                onClick={() => handleSelectBooking(b)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                  selectedBooking?.id === b.id
                    ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-slate-900">{b.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    b.status === 'stored' ? 'bg-emerald-100 text-emerald-800' :
                    b.status === 'in_yard' || b.status === 'in_progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {b.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800 mt-1">{b.cropName}</p>
                <p className="text-[11px] text-slate-500">
                  {b.quantityQuintals} Qtl • Farmer: {b.farmerName}
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Token: <strong className="text-emerald-700">{b.tokenNumber}</strong></span>
                  <span>Arrival: {b.arrivalDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Lifecycle Pipeline & Financials */}
        {selectedBooking ? (
          <div className="lg:col-span-8 space-y-6">
            {/* Visual Step Pipeline */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Consignment Lifecycle
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {selectedBooking.cropName} • {selectedBooking.quantityQuintals} Quintals
                  </h3>
                  <p className="text-xs text-slate-500">{selectedBooking.facilityName}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">Current Status</span>
                  <p className="text-sm font-black text-emerald-700 uppercase">{selectedBooking.status.replace('_', ' ')}</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                <div className="hidden sm:block absolute top-5 left-6 right-6 h-0.5 bg-slate-200 z-0"></div>
                <div
                  className="hidden sm:block absolute top-5 left-6 h-0.5 bg-emerald-600 transition-all duration-500 z-0"
                  style={{ width: `${(currentStageIdx / (stages.length - 1)) * 90}%` }}
                ></div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                  {stages.map((st, idx) => {
                    const isDone = idx <= currentStageIdx;
                    const isCurrent = idx === currentStageIdx;
                    return (
                      <div key={st.key} className="flex sm:flex-col items-center sm:items-center text-left sm:text-center space-x-3 sm:space-x-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                          isDone
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : 'bg-white border-2 border-slate-200 text-slate-400'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <div className="mt-2 sm:mt-2">
                          <p className={`text-xs font-bold ${isCurrent ? 'text-emerald-700' : 'text-slate-800'}`}>
                            {st.label}
                          </p>
                          <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5 leading-snug">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Operator Procurement Advance Controls */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Advance Inspection & Process:</span>
                  <span className="text-[11px] text-slate-500">Update consignment stage as vehicle clears physical checkpoints</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedBooking.status === 'confirmed' && (
                    <button
                      onClick={() => handleAdvanceStage('in_yard')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      Record Gate Entry & Weighment &rarr;
                    </button>
                  )}
                  {selectedBooking.status === 'in_yard' && (
                    <button
                      onClick={() => handleAdvanceStage('in_progress')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      Verify Quality & Grading &rarr;
                    </button>
                  )}
                  {selectedBooking.status === 'in_progress' && (
                    <button
                      onClick={() => handleAdvanceStage('stored')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      Stack in Chamber & Issue e-NWR &rarr;
                    </button>
                  )}
                  {selectedBooking.status === 'stored' && (
                    <button
                      onClick={() => handleAdvanceStage('completed')}
                      className="bg-slate-900 hover:bg-black text-white font-bold px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      Complete Final Settlement &rarr;
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Weighbridge & Quality Inspection Metrics */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Weighbridge & Quality Assay Readings</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Gross Vehicle Weight</span>
                  <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                    {selectedBooking.weighmentGrossKg ? `${selectedBooking.weighmentGrossKg} Kg` : 'Pending Check'}
                  </div>
                  <span className="text-[10px] text-slate-400">Truck + Produce</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Tare Empty Weight</span>
                  <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                    {selectedBooking.weighmentTareKg ? `${selectedBooking.weighmentTareKg} Kg` : 'Pending Check'}
                  </div>
                  <span className="text-[10px] text-slate-400">Truck Tare</span>
                </div>

                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100">
                  <span className="text-emerald-700 text-[10px] uppercase font-bold block">Certified Net Produce</span>
                  <div className="text-xl font-black text-emerald-900 font-mono mt-0.5">
                    {selectedBooking.weighmentNetKg
                      ? `${selectedBooking.weighmentNetKg} Kg`
                      : `${selectedBooking.quantityQuintals * 50} Kg (Est)`}
                  </div>
                  <span className="text-[10px] text-emerald-700">~{selectedBooking.quantityQuintals} Quintals</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-700">Certified Quality Assay:</span>
                  <p className="text-slate-500 text-[11px]">{selectedBooking.qualityGrade || 'Pending Grading'}</p>
                </div>
                {selectedBooking.eNwrNumber && (
                  <div className="text-right">
                    <span className="font-bold text-emerald-800">e-NWR Instrument:</span>
                    <p className="font-mono text-emerald-700 font-bold text-[11px]">{selectedBooking.eNwrNumber}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Transaction Ledger */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Procurement & Storage Financial Ledger</span>
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedBooking.balanceDue === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedBooking.balanceDue === 0 ? 'Settled in Full' : 'Balance Pending'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Total Estimated Tariff</span>
                  <strong className="text-sm font-black text-slate-900">₹{selectedBooking.estimatedCostTotal.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Advance Paid</span>
                  <strong className="text-sm font-black text-emerald-700">₹{selectedBooking.advancePaid.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Balance Payable</span>
                  <strong className="text-sm font-black text-amber-700">₹{selectedBooking.balanceDue.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Chamber Allocated</span>
                  <strong className="text-xs text-slate-800">{selectedBooking.chamberAllocated}</strong>
                </div>
              </div>

              {selectedBooking.balanceDue > 0 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handlePayRemaining}
                    disabled={isUpdating}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-sm transition flex items-center space-x-1.5"
                  >
                    <span>Settle Remaining Balance (₹{selectedBooking.balanceDue.toLocaleString('en-IN')})</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400">
            No consignment selected.
          </div>
        )}
      </div>
    </div>
  );
}
