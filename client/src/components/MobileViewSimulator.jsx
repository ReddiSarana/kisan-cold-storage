import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Smartphone,
  Tablet,
  RotateCw,
  X,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';

const DEVICE_PRESETS = [
  { id: 'iphone', name: 'iPhone 15 Pro', width: 393, height: 852, type: 'phone', os: 'ios' },
  { id: 'samsung', name: 'Galaxy S24', width: 360, height: 780, type: 'phone', os: 'android' },
  { id: 'pixel', name: 'Google Pixel 8', width: 412, height: 892, type: 'phone', os: 'android' },
  { id: 'tablet', name: 'iPad Mini (Tablet)', width: 768, height: 1024, type: 'tablet', os: 'ios' }
];

export default function MobileViewSimulator() {
  const { isMobileSimulatorOpen, closeMobileSimulator } = useApp();
  const [selectedDevice, setSelectedDevice] = useState('iphone');
  const [isLandscape, setIsLandscape] = useState(false);
  const [scale, setScale] = useState(0.85); // Default 85% so fits all laptops
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [iframeKey, setIframeKey] = useState(1);
  const iframeRef = useRef(null);

  const device = DEVICE_PRESETS.find(d => d.id === selectedDevice) || DEVICE_PRESETS[0];

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Listen for escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showQrModal) {
          setShowQrModal(false);
        } else if (isMobileSimulatorOpen) {
          closeMobileSimulator();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQrModal, isMobileSimulatorOpen, closeMobileSimulator]);

  if (!isMobileSimulatorOpen) return null;

  const width = isLandscape ? device.height : device.width;
  const height = isLandscape ? device.width : device.height;

  // Iframe URL with preview parameter to avoid recursive simulator
  const liveUrl = window.location.origin + window.location.pathname + '?mobile_preview=1';
  const productionUrl = 'https://kisan-cold-storage.vercel.app';

  const handleCopyUrl = (urlToCopy) => {
    navigator.clipboard.writeText(urlToCopy);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleReloadIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-xl flex flex-col items-center justify-between p-2 sm:p-4 overflow-hidden animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
      aria-label="Mobile View Display Simulator"
    >
      {/* 1. TOP SIMULATOR CONTROLLER BAR */}
      <header className="w-full max-w-5xl bg-slate-900/90 border border-emerald-500/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-2xl flex flex-wrap items-center justify-between gap-2.5 text-white z-20">
        {/* Left: Branding & Model Indicator */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg border border-emerald-300/40 shrink-0">
            <Smartphone className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                Mobile View Display
              </span>
              <span className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Live Simulator
              </span>
            </div>
            <p className="text-[10px] text-emerald-300/80 font-medium hidden sm:block">
              Exact touch viewport ({width} × {height}px) with native bottom navigation
            </p>
          </div>
        </div>

        {/* Center: Device Picker, Orientation & Zoom Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
          {/* Device Model Picker */}
          <div className="flex items-center bg-slate-950/80 border border-slate-700 p-1 rounded-xl">
            {DEVICE_PRESETS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDevice(d.id)}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDevice === d.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {d.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Orientation Rotate */}
          <button
            type="button"
            onClick={() => setIsLandscape(!isLandscape)}
            title={`Switch to ${isLandscape ? 'Portrait' : 'Landscape'}`}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-1 text-xs font-bold ${
              isLandscape
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md font-black'
                : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLandscape ? 'rotate-90' : ''} transition-transform`} />
            <span className="hidden md:inline">{isLandscape ? 'Landscape' : 'Portrait'}</span>
          </button>

          {/* Scale Zoom Controls */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-950/80 border border-slate-700 p-1 rounded-xl">
            {[0.75, 0.85, 1.0].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScale(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition cursor-pointer ${
                  scale === s
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>

          {/* Reload Iframe */}
          <button
            type="button"
            onClick={handleReloadIframe}
            title="Reload phone preview"
            className="p-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: QR Code Trigger & Exit Button */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold shadow-md transition cursor-pointer hover:scale-105 active:scale-95"
            title="Scan QR to open on your actual mobile phone"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open on Real Phone</span>
            <span className="sm:hidden">QR</span>
          </button>

          <button
            type="button"
            onClick={closeMobileSimulator}
            className="flex items-center space-x-1 bg-rose-600/90 hover:bg-rose-600 text-white px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black shadow-md transition cursor-pointer hover:scale-105 active:scale-95"
            title="Exit Mobile View and return to full desktop display"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit to Desktop</span>
          </button>
        </div>
      </header>

      {/* 2. CENTERED SMARTPHONE HARDWARE MOCKUP */}
      <div className="flex-1 w-full flex items-center justify-center overflow-auto p-1 sm:p-4 min-h-0">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.25s ease-out'
          }}
          className="relative transition-all duration-300"
        >
          {/* External Hardware Buttons (Volume Rockers on Left, Power on Right) */}
          {!isLandscape && (
            <>
              {/* Left volume buttons */}
              <div className="absolute -left-[14px] top-[115px] w-[5px] h-[32px] bg-slate-700 rounded-l-md" />
              <div className="absolute -left-[14px] top-[160px] w-[5px] h-[55px] bg-slate-700 rounded-l-md" />
              <div className="absolute -left-[14px] top-[225px] w-[5px] h-[55px] bg-slate-700 rounded-l-md" />
              {/* Right power button */}
              <div className="absolute -right-[14px] top-[170px] w-[5px] h-[75px] bg-slate-700 rounded-r-md" />
            </>
          )}

          {/* Outer Phone Bezel with Titanium Finish */}
          <div
            style={{ width: `${width + 24}px`, height: `${height + 24}px` }}
            className={`relative bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[12px] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)] ${
              device.type === 'tablet' ? 'rounded-[38px]' : 'rounded-[52px]'
            } border-2 border-slate-600/80 flex flex-col overflow-hidden select-none`}
          >
            {/* Screen Glass Area */}
            <div
              style={{ width: `${width}px`, height: `${height}px` }}
              className={`relative bg-slate-950 overflow-hidden flex flex-col shadow-inner ${
                device.type === 'tablet' ? 'rounded-[28px]' : 'rounded-[42px]'
              }`}
            >
              {/* Phone Status Bar (Time, Dynamic Island / Camera Punch-Hole, Battery) */}
              <div className="relative z-30 h-10 px-5 pt-2 flex items-center justify-between text-white bg-black/85 backdrop-blur-md shrink-0 border-b border-white/5">
                {/* Time */}
                <span className="text-[12px] font-black tracking-tight font-mono text-white/90">
                  {currentTime || '09:41'}
                </span>

                {/* Dynamic Island / Punch Hole */}
                {device.type !== 'tablet' && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-24 h-6 bg-black rounded-full flex items-center justify-end px-2 border border-white/10 shadow-lg">
                    {/* Camera lens reflection */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a1525] border border-blue-900/60 relative overflow-hidden flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-400/40" />
                    </div>
                  </div>
                )}

                {/* Status Icons (5G, Wifi, Battery) */}
                <div className="flex items-center space-x-1.5 text-white/90">
                  <span className="text-[10px] font-black tracking-tighter">5G</span>
                  <Wifi className="w-3 h-3" />
                  <div className="flex items-center space-x-0.5">
                    <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-0.5 flex items-center">
                      <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
                    </div>
                    <div className="w-0.5 h-1 bg-white/80 rounded-r-xs" />
                  </div>
                </div>
              </div>

              {/* Responsive Live Screen Iframe */}
              <div className="flex-1 w-full h-full relative bg-slate-50 overflow-hidden">
                <iframe
                  key={iframeKey}
                  ref={iframeRef}
                  src={liveUrl}
                  title="Krishivalaya Mobile View"
                  className="w-full h-full border-0"
                  style={{ width: `${width}px`, height: `${height - 40}px` }}
                />
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-1 left-0 right-0 z-30 h-4 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-1 bg-white/50 rounded-full backdrop-blur-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM HELPER BANNER */}
      <footer className="w-full max-w-5xl bg-slate-900/80 border border-slate-800 text-slate-300 rounded-2xl px-4 py-2 text-center text-xs flex flex-wrap items-center justify-between gap-2 z-20">
        <div className="flex items-center space-x-2 text-left">
          <span className="text-emerald-400 font-bold">✨ Tip:</span>
          <span>
            This simulates the real smartphone touch experience. Click tabs, book chambers, test payment, and view e-NWRs inside the phone screen!
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <span className="text-slate-400">Production URL:</span>
          <a
            href={productionUrl}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-300 hover:text-emerald-200 underline font-bold flex items-center space-x-1"
          >
            <span>kisan-cold-storage.vercel.app</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>

      {/* 4. REAL PHONE QR CODE MODAL OVERLAY */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-150"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-slate-900 shadow-2xl border-2 border-emerald-500 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              Open on Your Smartphone
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Open your phone camera and scan this code to load the live production website directly on your device.
            </p>

            {/* QR Code Image */}
            <div className="my-5 p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-emerald-300 inline-block shadow-inner">
              <img
                src="/images/mobile-qr.png"
                alt="Krishivalaya Mobile QR Code"
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain mx-auto rounded-xl"
              />
            </div>

            {/* Link Copy Box */}
            <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-2 text-xs font-mono">
              <span className="truncate text-slate-700 font-bold">
                {productionUrl}
              </span>
              <button
                type="button"
                onClick={() => handleCopyUrl(productionUrl)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 shrink-0 cursor-pointer shadow-xs"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Back to Simulator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
