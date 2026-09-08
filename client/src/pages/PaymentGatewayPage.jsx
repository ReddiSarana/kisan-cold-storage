import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { processPayment, fetchBookings } from '../services/api';
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Printer,
  Download,
  Building2,
  Phone,
  User,
  Sparkles,
  HelpCircle,
  Lock,
  Wallet,
  Landmark,
  BadgePercent,
  Check,
  CalendarCheck,
  AlertCircle,
  Truck,
  FileText,
  Copy,
  ChevronRight,
  ExternalLink,
  Smartphone
} from 'lucide-react';

export default function PaymentGatewayPage() {
  const {
    currentUser,
    activePaymentBooking,
    setActivePaymentBooking,
    setActiveTab,
    showToast,
    navigateToTransport
  } = useApp();

  const { t } = useLanguage();

  // All recent bookings for switching
  const [allBookings, setAllBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(activePaymentBooking?.id || '');

  // Payment Options & Calculation State
  const [paymentOption, setPaymentOption] = useState('advance_25'); // 'advance_25' or 'full_100'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'kcc', 'netbanking', 'gate_cash', 'escrow_pledge'

  // Input States for UPI
  const [upiVpa, setUpiVpa] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [upiErrors, setUpiErrors] = useState('');

  // Input States for Kisan Credit Card (KCC)
  const [kccNumber, setKccNumber] = useState(currentUser?.kccNumber || 'KCC-TS-88219');
  const [kccBank, setKccBank] = useState('Telangana Grameena Bank (TGGB)');
  const [kccHolderName, setKccHolderName] = useState(currentUser?.name || 'Mallaiah Goud');
  const [kccExpiry, setKccExpiry] = useState('08/28');
  const [kccCvv, setKccCvv] = useState('419');
  const [kccErrors, setKccErrors] = useState({});

  // Input States for NetBanking
  const [selectedBank, setSelectedBank] = useState('State Bank of India (Agri Banking)');

  // Input States for Escrow Pledge
  const [pacsSociety, setPacsSociety] = useState('Maheshwaram Primary Agricultural Co-op Society (PACS)');
  const [pacsLoanAcc, setPacsLoanAcc] = useState('PACS-WAR-9901-LOAN');

  // Interactive Payment Processing Simulation
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(1);
  const [completedPayment, setCompletedPayment] = useState(null);

  // Load existing bookings
  useEffect(() => {
    async function loadBookings() {
      try {
        const list = await fetchBookings({ phone: currentUser?.phone || '' });
        setAllBookings(list || []);
        if (!selectedBookingId && list && list.length > 0) {
          setSelectedBookingId(list[0].id);
        }
      } catch (err) {
        console.warn('Error loading bookings:', err);
      }
    }
    loadBookings();
  }, [currentUser?.phone, selectedBookingId]);

  // Determine current active booking details
  const activeBooking =
    (activePaymentBooking && activePaymentBooking.id === selectedBookingId ? activePaymentBooking : null) ||
    allBookings.find(b => b.id === selectedBookingId) ||
    activePaymentBooking || {
      id: 'BK-2026-902',
      farmerName: currentUser?.name || 'Mallaiah Goud',
      farmerPhone: currentUser?.phone || '+91 98765 12345',
      facilityName: 'Kakatiya Mega Cold Chain Hub',
      facilityDistrict: 'Warangal',
      cropName: 'Dry Red Chilli (Teja Variety)',
      quantityQuintals: 100,
      bagsCount: 200,
      ratePerQtlMonth: 45,
      expectedDurationMonths: 6,
      storageTariff: 27000,
      handlingCharges: 1000,
      totalEstimatedCost: 28000,
      advanceAmount: 7000,
      balanceDue: 21000,
      tokenNumber: 'TK-108',
      arrivalDate: new Date().toISOString().split('T')[0]
    };

  // Financial Calculations
  const ratePerQtlMonth = activeBooking.ratePerQtlMonth || 45;
  const quantityQuintals = Number(activeBooking.quantityQuintals) || 100;
  const bagsCount = Number(activeBooking.bagsCount) || quantityQuintals * 2;
  const durationMonths = Number(activeBooking.expectedDurationMonths) || 6;
  const storageTariff = activeBooking.storageTariff || (quantityQuintals * ratePerQtlMonth * durationMonths);
  const handlingCharges = activeBooking.handlingCharges || (bagsCount * 5);
  const totalCost = storageTariff + handlingCharges;
  const advanceAmount = Math.round(totalCost * 0.25);
  const fullDiscount = Math.round(totalCost * 0.05); // 5% green prompt payment discount
  const fullPayAmount = totalCost - fullDiscount;

  // Selected Amount to Pay Now
  const payableAmount = paymentOption === 'advance_25' ? advanceAmount : fullPayAmount;
  const remainingDue = paymentOption === 'advance_25' ? (totalCost - advanceAmount) : 0;

  // Handle Payment Method Execution
  const handleInitiatePayment = async (e) => {
    if (e) e.preventDefault();

    // Validation checks
    if (paymentMethod === 'upi') {
      if (selectedUpiApp === 'custom_vpa' && (!upiVpa || !upiVpa.includes('@'))) {
        setUpiErrors('Please enter a valid UPI ID (e.g. name@bank or 9876543210@ybl)');
        return;
      }
      setUpiErrors('');
    } else if (paymentMethod === 'kcc') {
      const errs = {};
      if (!kccNumber || kccNumber.trim().length < 8) errs.kccNumber = 'Valid KCC card number required';
      if (!kccHolderName || kccHolderName.trim().length < 3) errs.kccHolderName = 'Cardholder name required';
      if (!kccExpiry || !kccExpiry.includes('/')) errs.kccExpiry = 'MM/YY required';
      if (!kccCvv || kccCvv.trim().length < 3) errs.kccCvv = '3-digit CVV required';
      if (Object.keys(errs).length > 0) {
        setKccErrors(errs);
        return;
      }
      setKccErrors({});
    }

    setIsProcessing(true);
    setProcessingStage(1);

    // Stage 1 -> Stage 2
    setTimeout(() => {
      setProcessingStage(2);
    }, 900);

    // Stage 2 -> Stage 3
    setTimeout(() => {
      setProcessingStage(3);
    }, 1800);

    // Stage 3 -> Complete
    setTimeout(async () => {
      try {
        const payload = {
          bookingId: activeBooking.id,
          farmerName: activeBooking.farmerName || currentUser?.name || 'Valued Farmer',
          farmerPhone: activeBooking.farmerPhone || currentUser?.phone || '+91 98765 12345',
          amount: payableAmount,
          paymentMode: paymentMethod,
          paymentType: paymentOption,
          facilityName: activeBooking.facilityName || 'Kakatiya Mega Cold Chain Hub',
          referenceDetails: {
            tokenNumber: activeBooking.tokenNumber || 'TK-108',
            kccBank: paymentMethod === 'kcc' ? kccBank : null,
            upiVpa: paymentMethod === 'upi' ? (upiVpa || `${selectedUpiApp}@upi`) : null,
            pacsSociety: paymentMethod === 'escrow_pledge' ? pacsSociety : null
          }
        };

        const res = await processPayment(payload);
        if (res.success) {
          setCompletedPayment({
            ...res.transaction,
            totalCost,
            advanceAmount,
            remainingDue,
            cropName: activeBooking.cropName,
            quantityQuintals,
            bagsCount,
            tokenNumber: activeBooking.tokenNumber || 'TK-108',
            facilityName: activeBooking.facilityName || 'Kakatiya Mega Cold Chain Hub'
          });
          showToast(`🎉 Payment of ₹${payableAmount.toLocaleString()} completed successfully! Voucher generated.`);
        }
      } catch (err) {
        showToast('⚠️ Payment simulation failed: ' + err.message);
      } finally {
        setIsProcessing(false);
      }
    }, 2600);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-800/70 border border-emerald-600/40 px-3.5 py-1 rounded-full shadow-xs">
              Official WDRA & RBI Regulated Agri-Checkout
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Payment Gateway & Tariff Settlement
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
            Securely settle your 25% cold chamber reservation advance, Kisan Credit Card (KCC) subvention, or gate arrival weighbridge payment. Official digital voucher with instant SMS confirmation generated.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center space-x-3.5 shrink-0 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            🔒
          </div>
          <div>
            <p className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wide">Agricultural Payment Desk</p>
            <a href="tel:18001801551" className="text-base font-black text-white hover:text-emerald-200 hover:underline font-mono block">
              1800-180-1551
            </a>
            <p className="text-[10px] text-slate-300">256-Bit SSL Encrypted • Toll-Free</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb / 3-Step Process Stepper */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 sm:p-4 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              ✓
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Step 1 (Completed)</span>
              <p className="text-xs sm:text-sm font-black text-slate-900 truncate">Chamber Slot Reserved</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-3 sm:p-4 flex items-center space-x-3 shadow-md border-2 border-emerald-400">
            <div className="w-9 h-9 rounded-xl bg-white text-emerald-800 flex items-center justify-center font-black text-sm shrink-0 shadow-xs animate-pulse">
              2
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase text-emerald-200 block">Step 2 (Active Now)</span>
              <p className="text-xs sm:text-sm font-black text-white truncate">Secure Payment Gateway</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 flex items-center space-x-3 opacity-80">
            <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Step 3 (Next Step)</span>
              <p className="text-xs sm:text-sm font-bold text-slate-700 truncate">Gate Queue & Inward Bay</p>
            </div>
          </div>
        </div>
      </div>

      {completedPayment ? (
        /* ================= SUCCESS PAYMENT VOUCHER SCREEN ================= */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-400 shadow-2xl space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center shadow-inner shrink-0">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                  Payment Successfully Settled
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Official Payment Voucher & Receipt
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Krishivalaya Digital Agri-Escrow Settlement • WDRA Bailment Record Active
                </p>
              </div>
            </div>

            {/* Transaction ID Badge */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-4 sm:p-5 rounded-2xl text-center shadow-lg w-full sm:w-auto shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 block">
                Transaction Reference ID
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono tracking-wider block">
                {completedPayment.txnId}
              </span>
              <span className="text-[11px] text-emerald-100 mt-0.5 block">
                Status: PAID &amp; CONFIRMED
              </span>
            </div>
          </div>

          {/* Official Printable Voucher Content */}
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 p-6 sm:p-8 rounded-3xl border-2 border-emerald-200 shadow-inner space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-200/80 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  🌾
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">
                    Krishivalaya Cold Storage Deposit Receipt
                  </h3>
                  <p className="text-xs text-slate-600">
                    Bailment Deposit Slip • Ministry of Consumer Affairs, Food &amp; Public Distribution
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Settlement Date &amp; Time</span>
                <span className="text-xs font-mono font-bold text-slate-900">
                  {new Date(completedPayment.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Farmer Name</p>
                <p className="font-bold text-sm text-slate-900 mt-0.5">{completedPayment.farmerName}</p>
                <p className="text-[11px] text-slate-500 font-mono">{completedPayment.farmerPhone}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Storage Facility</p>
                <p className="font-bold text-sm text-emerald-800 mt-0.5 truncate">{completedPayment.facilityName}</p>
                <p className="text-[11px] text-slate-500">WDRA Accredited Vault</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Booking ID &amp; Token</p>
                <p className="font-bold text-sm text-slate-900 mt-0.5 font-mono">{completedPayment.bookingId}</p>
                <p className="text-[11px] text-emerald-600 font-bold">Gate Pass Token: {completedPayment.tokenNumber}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Amount Settled</p>
                <p className="font-black text-lg text-emerald-700 mt-0.5 font-mono">
                  ₹{completedPayment.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">
                  Mode: {completedPayment.paymentMode.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Financial Ledger Table */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Detailed Tariff Ledger Breakdown</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  100% Tax Exempt (GST HSN 9986)
                </span>
              </h4>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2 flex items-center justify-between text-slate-700">
                  <span>Reserved Produce: {completedPayment.cropName}</span>
                  <span className="font-mono font-bold text-slate-900">{completedPayment.quantityQuintals} Quintals ({completedPayment.bagsCount} Bags)</span>
                </div>
                <div className="py-2 flex items-center justify-between text-slate-700">
                  <span>Total Season Chamber Tariff (Gross)</span>
                  <span className="font-mono font-bold text-slate-900">₹{completedPayment.totalCost.toLocaleString()}</span>
                </div>
                <div className="py-2 flex items-center justify-between text-emerald-800 font-bold bg-emerald-50/50 px-2 rounded-lg">
                  <span>Payment Settled ({completedPayment.paymentType === 'advance_25' ? '25% Advance Booking Deposit' : '100% Full Season Advance'})</span>
                  <span className="font-mono text-sm">₹{completedPayment.amount.toLocaleString()}</span>
                </div>
                {completedPayment.remainingDue > 0 && (
                  <div className="py-2 flex items-center justify-between text-amber-900 font-medium">
                    <span>Balance Settled upon Produce Discharge or e-NWR Loan</span>
                    <span className="font-mono font-bold">₹{completedPayment.remainingDue.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* SMS Dispatch Verification Banner */}
            <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 flex items-start space-x-3">
              <span className="text-2xl shrink-0">📲</span>
              <div className="text-xs text-amber-950">
                <strong className="block font-bold">Real-time SMS Dispatched to {completedPayment.farmerPhone}</strong>
                "Krishivalaya: Namaste {completedPayment.farmerName}! Payment of ₹{completedPayment.amount.toLocaleString()} received via {completedPayment.paymentMode.toUpperCase()} for Booking {completedPayment.bookingId}. Txn ID: {completedPayment.txnId}. Cold chamber reservation deposit confirmed. Gate Token: {completedPayment.tokenNumber}."
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('queue')}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition transform hover:scale-[1.02] cursor-pointer"
            >
              <span>🚜 Proceed to Live Gate Queue (Token: {completedPayment.tokenNumber})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigateToTransport(completedPayment)}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs sm:text-sm font-black px-5 py-3.5 rounded-2xl shadow-md transition transform hover:scale-[1.02] cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>🚜 Book Farm-Gate Transport Fleet &rarr;</span>
            </button>

            <button
              type="button"
              onClick={handlePrintReceipt}
              className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-3.5 rounded-2xl shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Voucher (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className="flex items-center space-x-2 bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 text-xs sm:text-sm font-bold px-5 py-3.5 rounded-2xl transition cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>View e-NWR Documents</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCompletedPayment(null);
              }}
              className="ml-auto text-xs font-bold text-slate-500 hover:text-emerald-700 px-3 py-2 cursor-pointer"
            >
              🔄 Settle Another Booking
            </button>
          </div>
        </div>
      ) : (
        /* ================= ACTIVE CHECKOUT & GATEWAY FORM ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Payment Options & Method Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Booking Selector Card */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                    📋
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      Select Cold Storage Booking to Pay
                    </h3>
                    <p className="text-xs text-slate-500">
                      Linking with verified WDRA warehouse booking
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                  Token: {activeBooking.tokenNumber || 'TK-108'}
                </span>
              </div>

              {allBookings.length > 1 && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Switch Active Booking:
                  </label>
                  <select
                    value={selectedBookingId}
                    onChange={(e) => setSelectedBookingId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {allBookings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.id} — {b.cropName || b.cropId} ({b.quantityQuintals} Qtl at {b.facilityName || 'Facility'})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Active Booking Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Facility</span>
                  <strong className="text-slate-900 truncate block text-[11px]">{activeBooking.facilityName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Produce Weight</span>
                  <strong className="text-slate-900 block text-[11px]">{quantityQuintals} Qtl ({bagsCount} Bags)</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Arrival Date</span>
                  <strong className="text-slate-900 block text-[11px]">{activeBooking.arrivalDate || 'Today'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Gross Tariff</span>
                  <strong className="text-emerald-700 font-mono block text-[11px]">₹{totalCost.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Tariff Choice: 25% Advance vs 100% Full Payment */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center space-x-2">
                <BadgePercent className="w-5 h-5 text-emerald-600" />
                <span>Choose Payment Settlement Plan</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 25% Advance Option */}
                <label
                  onClick={() => setPaymentOption('advance_25')}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    paymentOption === 'advance_25'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-md ring-2 ring-emerald-400/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md mb-1.5">
                        Recommended for Farmers
                      </span>
                      <h4 className="font-black text-slate-900 text-sm">25% Advance Booking Deposit</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Locks chamber slot and gives immediate gate entry clearance. Remaining 75% settled upon produce discharge or e-NWR bank loan.
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === 'advance_25'}
                      onChange={() => setPaymentOption('advance_25')}
                      className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Payable Now:</span>
                    <span className="text-lg font-black font-mono text-emerald-700">₹{advanceAmount.toLocaleString()}</span>
                  </div>
                </label>

                {/* 100% Full Payment Option */}
                <label
                  onClick={() => setPaymentOption('full_100')}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    paymentOption === 'full_100'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-md ring-2 ring-emerald-400/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md mb-1.5">
                        5% Green Prepayment Discount
                      </span>
                      <h4 className="font-black text-slate-900 text-sm">Full Season Pre-Payment</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Zero balance due at unloading. Full solar cold storage discount voucher applied instantly.
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === 'full_100'}
                      onChange={() => setPaymentOption('full_100')}
                      className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 line-through mr-1.5">₹{totalCost.toLocaleString()}</span>
                      <span className="text-xs text-slate-500">Payable Now:</span>
                    </div>
                    <span className="text-lg font-black font-mono text-emerald-700">₹{fullPayAmount.toLocaleString()}</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Methods Selection Box */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <span>Select Payment Method (చెల్లింపు విధానం)</span>
                </h3>
                <span className="text-[11px] font-bold text-slate-500">
                  5 Agricultural Options
                </span>
              </div>

              {/* Navigation Tabs for the 5 Payment Modes */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl text-center transition flex flex-col items-center justify-center space-y-1 cursor-pointer border ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 text-xs font-semibold'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-[11px]">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('kcc')}
                  className={`p-3 rounded-2xl text-center transition flex flex-col items-center justify-center space-y-1 cursor-pointer border ${
                    paymentMethod === 'kcc'
                      ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 text-xs font-semibold'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-[11px]">Kisan Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl text-center transition flex flex-col items-center justify-center space-y-1 cursor-pointer border ${
                    paymentMethod === 'netbanking'
                      ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 text-xs font-semibold'
                  }`}
                >
                  <Landmark className="w-5 h-5" />
                  <span className="text-[11px]">NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('gate_cash')}
                  className={`p-3 rounded-2xl text-center transition flex flex-col items-center justify-center space-y-1 cursor-pointer border ${
                    paymentMethod === 'gate_cash'
                      ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 text-xs font-semibold'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span className="text-[11px]">Pay at Gate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('escrow_pledge')}
                  className={`p-3 rounded-2xl text-center transition flex flex-col items-center justify-center space-y-1 cursor-pointer border col-span-2 sm:col-span-1 ${
                    paymentMethod === 'escrow_pledge'
                      ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 text-xs font-semibold'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[11px]">PACS Escrow</span>
                </button>
              </div>

              {/* TAB 1: UPI & Dynamic QR Code */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 pt-2 animate-fadeIn">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
                    {/* Simulated SVG QR Code */}
                    <div className="bg-white p-3 rounded-2xl shrink-0 shadow-lg text-center">
                      <div className="w-32 h-32 bg-slate-950 p-2 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                        {/* QR Matrix Representation */}
                        <div className="grid grid-cols-4 gap-1.5 w-full h-full p-1 bg-white rounded-lg">
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-slate-200 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-emerald-600 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-slate-200 rounded-xs" />
                          <div className="bg-slate-200 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-emerald-600 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-slate-200 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                          <div className="bg-slate-900 rounded-xs" />
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-slate-900 mt-1.5 block">
                        ₹{payableAmount.toLocaleString()} • SCAN &amp; PAY
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                        Instant NPCI UPI Switch
                      </span>
                      <h4 className="text-white font-bold text-sm">Scan Dynamic QR Code</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Open PhonePe, Google Pay, BHIM, or Paytm on your mobile to scan. Real-time webhook will automatically verify receipt.
                      </p>
                      <p className="text-[11px] font-mono text-emerald-300">
                        VPA: krishivalaya.coldchain@sbi
                      </p>
                    </div>
                  </div>

                  {/* UPI App Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Or Select UPI App &amp; Request Payment:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                        { id: 'gpay', name: 'Google Pay', icon: '🔵' },
                        { id: 'paytm', name: 'Paytm', icon: '🔷' },
                        { id: 'bhim', name: 'BHIM UPI', icon: '🇮🇳' }
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUpiApp(app.id)}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center space-x-2 transition cursor-pointer ${
                            selectedUpiApp === app.id
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="text-base">{app.icon}</span>
                          <span>{app.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* VPA Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Enter UPI ID / Mobile Number (VPA):
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        placeholder="e.g. 9876512345@ybl or open@okhdfc"
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    {upiErrors && <p className="text-[11px] text-rose-600 font-bold">{upiErrors}</p>}
                  </div>
                </div>
              )}

              {/* TAB 2: Kisan Credit Card (KCC) / RuPay Debit */}
              {paymentMethod === 'kcc' && (
                <div className="space-y-4 pt-2 animate-fadeIn text-xs">
                  <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-3.5 flex items-start space-x-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-emerald-950 leading-relaxed">
                      <strong>NABARD 4% Subsidized Crop Loan subvention eligible:</strong> Cold storage advance paid via Kisan Credit Card automatically qualifies for interest subvention with zero processing surcharge.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Issuing Bank / Primary Agricultural Society:
                      </label>
                      <select
                        value={kccBank}
                        onChange={(e) => setKccBank(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option>Telangana Grameena Bank (TGGB)</option>
                        <option>State Bank of India (Agri Division)</option>
                        <option>Andhra Pradesh Grameena Vikas Bank (APGVB)</option>
                        <option>Warangal District Co-operative Central Bank (DCCB)</option>
                        <option>Union Bank of India (Kisan Shakti)</option>
                        <option>Canara Bank (Agri Banking)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Kisan Credit Card (KCC) / RuPay Number:
                      </label>
                      <input
                        type="text"
                        value={kccNumber}
                        onChange={(e) => setKccNumber(e.target.value)}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      {kccErrors.kccNumber && <p className="text-[11px] text-rose-600 font-bold mt-1">{kccErrors.kccNumber}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Cardholder Name:
                        </label>
                        <input
                          type="text"
                          value={kccHolderName}
                          onChange={(e) => setKccHolderName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        {kccErrors.kccHolderName && <p className="text-[11px] text-rose-600 font-bold mt-1">{kccErrors.kccHolderName}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Expiry (MM/YY):
                        </label>
                        <input
                          type="text"
                          value={kccExpiry}
                          onChange={(e) => setKccExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        {kccErrors.kccExpiry && <p className="text-[11px] text-rose-600 font-bold mt-1">{kccErrors.kccExpiry}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          CVV:
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={kccCvv}
                          onChange={(e) => setKccCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        {kccErrors.kccCvv && <p className="text-[11px] text-rose-600 font-bold mt-1">{kccErrors.kccCvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NetBanking */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-4 pt-2 animate-fadeIn text-xs">
                  <p className="text-slate-600 leading-relaxed">
                    Select your bank to redirect to secure institutional NetBanking portal:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      'State Bank of India (Agri Banking)',
                      'Telangana Grameena Bank (TGGB)',
                      'Andhra Pradesh Grameena Vikas (APGVB)',
                      'Union Bank of India',
                      'Canara Bank',
                      'Punjab National Bank'
                    ].map((bankName) => (
                      <button
                        key={bankName}
                        type="button"
                        onClick={() => setSelectedBank(bankName)}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition cursor-pointer ${
                          selectedBank === bankName
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Landmark className="w-4 h-4 mb-1 text-emerald-700" />
                        <span className="line-clamp-1">{bankName}</span>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Or Choose from All Indian Banks:
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option>State Bank of India (Agri Banking)</option>
                      <option>Telangana Grameena Bank (TGGB)</option>
                      <option>Andhra Pradesh Grameena Vikas Bank (APGVB)</option>
                      <option>Union Bank of India</option>
                      <option>Canara Bank</option>
                      <option>HDFC Bank (Kisan Dhan)</option>
                      <option>ICICI Bank (Rural)</option>
                      <option>Bank of Baroda</option>
                      <option>Telangana State Apex Co-op Bank (TSCAB)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB 4: Pay at Gate Cash / Spot Weighbridge Settlement */}
              {paymentMethod === 'gate_cash' && (
                <div className="space-y-4 pt-2 animate-fadeIn text-xs">
                  <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 flex items-start space-x-3">
                    <span className="text-2xl shrink-0">🚜</span>
                    <div className="space-y-1 text-amber-950">
                      <strong className="block font-black text-sm">Pay Advance in Cash at Cold Storage Security Cabin</strong>
                      <p className="text-[11px] leading-relaxed">
                        For farmers without digital banking. Your slot reservation will be provisionally locked now. You can hand over the 25% cash advance (₹{advanceAmount.toLocaleString()}) to the weighbridge gate cashier upon tractor arrival.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-800">Gate Settlement Conditions:</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px]">
                      <li>Present Gate Token <strong>{activeBooking.tokenNumber || 'TK-108'}</strong> at inbound weighbridge cabin.</li>
                      <li>Payment accepted in cash, Mandi commission agent voucher, or local bank bearer cheque.</li>
                      <li>Printed official receipt issued immediately on weighbridge scale slip.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 5: NABARD / PACS Warehouse Pledge Escrow */}
              {paymentMethod === 'escrow_pledge' && (
                <div className="space-y-4 pt-2 animate-fadeIn text-xs">
                  <div className="bg-teal-50/90 border border-teal-300 rounded-2xl p-3.5 flex items-start space-x-2.5">
                    <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-teal-950 leading-relaxed">
                      <strong>PACS e-NWR Lien Pre-Credit:</strong> Cold storage advance is settled directly against your PACS / DCCB post-harvest credit sanction limit under the Warehousing (Development and Regulation) Act 2007.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Primary Agricultural Co-operative Society (PACS):
                      </label>
                      <input
                        type="text"
                        value={pacsSociety}
                        onChange={(e) => setPacsSociety(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        PACS Credit Line / Loan Sanction ID:
                      </label>
                      <input
                        type="text"
                        value={pacsLoanAcc}
                        onChange={(e) => setPacsLoanAcc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Transparent Tariff Ledger & Checkout Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Tariff Calculator Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-emerald-900/60 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                  Transparent Tariff Ledger
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 rounded-full font-mono font-bold">
                  Official WDRA Rates
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Chamber Rent ({quantityQuintals} Qtl × ₹{ratePerQtlMonth} × {durationMonths} mo)</span>
                  <span className="font-mono font-bold text-white">₹{storageTariff.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Stacking &amp; Weighbridge Handling ({bagsCount} Bags × ₹5)</span>
                  <span className="font-mono font-bold text-white">₹{handlingCharges.toLocaleString()}</span>
                </div>

                {paymentOption === 'full_100' && (
                  <div className="flex items-center justify-between text-amber-300 bg-amber-900/30 p-2 rounded-xl border border-amber-500/30">
                    <span className="font-bold">5% Green Prompt Payment Discount</span>
                    <span className="font-mono font-bold">-₹{fullDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs text-slate-300">
                  <span>Government Cold Chain Exemption (GST)</span>
                  <span className="text-emerald-300 font-bold">₹0.00 (Exempt)</span>
                </div>

                <div className="border-t border-white/10 pt-3.5 flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Total Chamber Charges:</span>
                  <span className="text-2xl font-black font-mono text-emerald-300">
                    ₹{totalCost.toLocaleString()}
                  </span>
                </div>

                {/* Amount Payable Now Callout */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-emerald-200 text-xs sm:text-sm">
                        Net Amount Payable Now
                      </p>
                      <p className="text-[10px] text-slate-300">
                        {paymentOption === 'advance_25' ? '25% Advance Booking Deposit' : '100% Full Pre-Payment'}
                      </p>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
                      ₹{payableAmount.toLocaleString()}
                    </span>
                  </div>

                  {paymentOption === 'advance_25' && (
                    <p className="text-[10px] text-slate-400 pt-2 border-t border-white/10">
                      Balance Due at Release: <strong className="text-white font-mono">₹{remainingDue.toLocaleString()}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Safety & Subsidy badge */}
              <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-2xl p-3.5 flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-100 leading-relaxed">
                  <strong>75% NABARD Pledge Loan Eligible:</strong> Deposited commodities immediately qualify for 75% market value credit pledge loan at any nationalized bank using your e-NWR receipt.
                </p>
              </div>

              {/* Submit Payment CTA Button */}
              <button
                type="button"
                onClick={handleInitiatePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-102 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessing
                    ? 'Processing Payment with Bank...'
                    : paymentMethod === 'gate_cash'
                    ? `Confirm Cash at Gate Slip (₹${payableAmount.toLocaleString()})`
                    : `Pay Securely Now: ₹${payableAmount.toLocaleString()}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Support Desk Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  📞
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Kisan Payment Grievance Desk
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    24x7 Immediate Resolution for Cold Storage Payments
                  </p>
                </div>
              </div>
              <div className="text-xs text-slate-600 divide-y divide-slate-100 pt-1">
                <div className="py-2 flex items-center justify-between">
                  <span>Toll-Free Helpline</span>
                  <strong className="font-mono text-emerald-700">1800-180-1551</strong>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <span>NABARD Agri-Escrow</span>
                  <strong className="text-slate-800">WDRA-REG-0992</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Realistic Multi-Step Bank Handshake Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-emerald-500 shadow-2xl space-y-6 text-center animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto text-2xl animate-spin">
              ⚡
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight text-white">
                Connecting to Secure Gateway
              </h3>
              <p className="text-xs text-slate-300">
                Please do not refresh or close the page while transaction is being verified with the bank.
              </p>
            </div>

            {/* Stages indicator */}
            <div className="space-y-3 text-left bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center space-x-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  processingStage >= 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-400'
                }`}>
                  {processingStage > 1 ? '✓' : '1'}
                </span>
                <span className={processingStage === 1 ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                  Initiating 256-bit encrypted NPCI handshake...
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  processingStage >= 2 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-400'
                }`}>
                  {processingStage > 2 ? '✓' : '2'}
                </span>
                <span className={processingStage === 2 ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                  Verifying Kisan Credit limits &amp; UPI authorization...
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  processingStage >= 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-400'
                }`}>
                  {processingStage >= 3 ? '✓' : '3'}
                </span>
                <span className={processingStage === 3 ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                  Depositing to Cold Chain Escrow &amp; dispatching SMS...
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 font-mono">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>RBI &amp; WDRA Regulated Agricultural Clearing</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
