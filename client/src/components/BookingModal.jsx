import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { createBooking, getDocxDownloadUrl } from '../services/api';
import {
  X,
  Warehouse,
  Calendar,
  Truck,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export default function BookingModal() {
  const {
    bookingModalUnit,
    closeBookingModal,
    currentUser,
    setActiveTab,
    setIsSmsSimulatorOpen,
    showToast
  } = useApp();

  const [formData, setFormData] = useState({
    farmerName: '',
    farmerPhone: '',
    cropId: 'red_chilli',
    quantityQuintals: 150,
    expectedDurationMonths: 6,
    arrivalDate: '',
    vehicleNumber: 'TS-03-BK-2026',
    vehicleType: 'Tractor Trolley',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  useEffect(() => {
    if (bookingModalUnit) {
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        farmerName: currentUser.name || '',
        farmerPhone: currentUser.phone || '',
        cropId: bookingModalUnit.prefilledCrop || bookingModalUnit.unit?.supportedCrops?.[0] || 'red_chilli',
        quantityQuintals: 150,
        expectedDurationMonths: 6,
        arrivalDate: today,
        vehicleNumber: 'TS-03-BK-' + Math.floor(1000 + Math.random() * 9000),
        vehicleType: 'Tractor Trolley',
        notes: ''
      });
      setSuccessBooking(null);
    }
  }, [bookingModalUnit, currentUser]);

  if (!bookingModalUnit) return null;

  const unit = bookingModalUnit.unit;
  const ratePerQtlMonth = unit?.baseRatePerQuintalMonth || 40;
  const totalTariff = Number(formData.quantityQuintals) * ratePerQtlMonth * Number(formData.expectedDurationMonths);
  const handlingFee = Number(formData.quantityQuintals) * (unit?.handlingFeePerBag || 5) * 2; // ~2 bags per quintal
  const estimatedTotal = totalTariff + handlingFee;
  const advanceAmount = Math.round(estimatedTotal * 0.25);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        farmerName: formData.farmerName,
        farmerPhone: formData.farmerPhone,
        facilityId: unit.id,
        cropId: formData.cropId,
        quantityQuintals: formData.quantityQuintals,
        bagsCount: formData.quantityQuintals * 2,
        arrivalDate: formData.arrivalDate,
        expectedDurationMonths: formData.expectedDurationMonths,
        vehicleNumber: formData.vehicleNumber,
        vehicleType: formData.vehicleType
      };

      const res = await createBooking(payload);
      if (res.success) {
        setSuccessBooking(res.data);
        showToast(`🎉 Booking confirmed! Gate Token: ${res.token?.tokenId}`);
        setIsSmsSimulatorOpen(true);
      } else {
        alert('Booking failed: ' + res.message);
      }
    } catch (err) {
      alert('Error placing booking: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight">Book Cold Storage Chamber</h3>
              <p className="text-xs text-emerald-200">{unit.name} • {unit.district}, {unit.state}</p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {successBooking ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                Booking Confirmed & Gate Token Generated
              </span>
              <h2 className="text-2xl font-black text-slate-900">Slot Reserved Successfully!</h2>
              <p className="text-sm text-slate-600 mt-1">
                Booking ID: <strong className="font-mono text-emerald-700">{successBooking.id}</strong>
              </p>
            </div>

            {/* Token Badge */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 max-w-md mx-auto text-left shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Yard Entry Token</span>
                  <div className="text-3xl font-black text-amber-900 tracking-tight mt-0.5">
                    {successBooking.tokenNumber}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-amber-200 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded">
                    Status: Yard Queue
                  </span>
                  <p className="text-[10px] text-amber-700 mt-1">Arrival Date: {successBooking.arrivalDate}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-amber-200/80 text-xs text-amber-900 grid grid-cols-2 gap-2">
                <div>Farmer: <strong>{successBooking.farmerName}</strong></div>
                <div>Vehicle: <strong>{successBooking.vehicleNumber}</strong></div>
                <div>Crop: <strong>{successBooking.cropName}</strong></div>
                <div>Deposit: <strong>{successBooking.quantityQuintals} Quintals</strong></div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
              <a
                href={getDocxDownloadUrl('agreement', successBooking.id)}
                download
                className="flex items-center justify-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-sm transition"
              >
                <FileText className="w-4 h-4" />
                <span>Download Agreement (.DOCX)</span>
              </a>

              <button
                onClick={() => {
                  closeBookingModal();
                  setActiveTab('queue');
                }}
                className="flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-sm transition"
              >
                <Clock className="w-4 h-4" />
                <span>View Live Yard Queue</span>
              </button>

              <button
                onClick={() => {
                  closeBookingModal();
                  setActiveTab('tracking');
                }}
                className="flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-sm transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Track Consignment</span>
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Quick Info Bar */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>
                  Chamber Tariff: <strong>₹{ratePerQtlMonth}/Qtl/Month</strong> • Handling: <strong>₹{unit.handlingFeePerBag || 5}/Bag</strong>
                </span>
              </div>
              <span className="font-bold text-emerald-700">Available: {unit.availableCapacityMT} MT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Farmer Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Farmer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Phone (For SMS Alerts) *</label>
                <input
                  type="tel"
                  required
                  value={formData.farmerPhone}
                  onChange={(e) => setFormData({ ...formData, farmerPhone: e.target.value })}
                  placeholder="+91 98765 12345"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 font-mono"
                />
              </div>

              {/* Select Crop */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Crop to Store *</label>
                <select
                  value={formData.cropId}
                  onChange={(e) => setFormData({ ...formData, cropId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 capitalize"
                >
                  {unit.supportedCrops?.map((c) => (
                    <option key={c} value={c}>{c.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              {/* Quantity in Quintals */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quantity (in Quintals) *</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="10"
                    max="5000"
                    required
                    value={formData.quantityQuintals}
                    onChange={(e) => setFormData({ ...formData, quantityQuintals: Number(e.target.value) })}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 font-bold"
                  />
                  <span className="text-slate-500 font-medium text-[11px] whitespace-nowrap">
                    (~{(formData.quantityQuintals / 10).toFixed(1)} MT)
                  </span>
                </div>
              </div>

              {/* Arrival Date */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Planned Arrival Date *</label>
                <input
                  type="date"
                  required
                  value={formData.arrivalDate}
                  onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              {/* Storage Duration */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Storage Duration (Months) *</label>
                <select
                  value={formData.expectedDurationMonths}
                  onChange={(e) => setFormData({ ...formData, expectedDurationMonths: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                >
                  <option value={1}>1 Month (Short-term)</option>
                  <option value={3}>3 Months (Seasonal)</option>
                  <option value={6}>6 Months (Standard Post-Harvest)</option>
                  <option value={9}>9 Months (Extended Preservation)</option>
                </select>
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Vehicle Number</label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  placeholder="e.g. UP-80-AB-1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600 uppercase"
                />
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Vehicle Type</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Tractor Trolley">Tractor Trolley</option>
                  <option value="Mini Truck (Eicher/Tata 407)">Mini Truck (Eicher / Tata 407)</option>
                  <option value="Pickup (Bolero Maxi)">Pickup (Bolero Maxi)</option>
                  <option value="Heavy Truck 10-Wheeler">Heavy Truck 10-Wheeler</option>
                </select>
              </div>
            </div>

            {/* Estimated Cost Breakdown */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 flex items-center justify-between">
                <span>Estimated Cost Calculation</span>
                <span className="text-[11px] font-normal text-slate-500">WDRA Standard Tariff</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                <div>Storage Rent ({formData.quantityQuintals} Qtl × ₹{ratePerQtlMonth} × {formData.expectedDurationMonths} Mo):</div>
                <div className="text-right font-medium">₹{totalTariff.toLocaleString('en-IN')}</div>

                <div>Unloading & Handling (~{formData.quantityQuintals * 2} bags):</div>
                <div className="text-right font-medium">₹{handlingFee.toLocaleString('en-IN')}</div>

                <div className="font-bold text-slate-800 pt-1 border-t border-slate-200">Total Estimated Tariff:</div>
                <div className="text-right font-bold text-slate-900 pt-1 border-t border-slate-200">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </div>

                <div className="font-bold text-emerald-700">Advance Payable at Gate (25%):</div>
                <div className="text-right font-bold text-emerald-700">
                  ₹{advanceAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={closeBookingModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Processing Slot Reservation...</span>
                ) : (
                  <>
                    <span>Confirm Booking & Generate Token</span>
                    <span>&rarr;</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
