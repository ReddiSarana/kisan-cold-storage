import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Navigation,
  Warehouse,
  Truck,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Compass,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Scale,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

// Telangana 33 Districts Map Coordinates (SVG 800x650 viewport)
const DISTRICT_COORDS = {
  'Adilabad': { x: 310, y: 70, lat: '19.6641° N', lng: '78.5320° E', highway: 'NH-44' },
  'Kumuram Bheem Asifabad': { x: 430, y: 90, lat: '19.3644° N', lng: '79.2934° E', highway: 'SH-1' },
  'Mancherial': { x: 470, y: 155, lat: '18.8679° N', lng: '79.4639° E', highway: 'SH-1' },
  'Nirmal': { x: 270, y: 125, lat: '19.0964° N', lng: '78.3434° E', highway: 'NH-44' },
  'Nizamabad': { x: 220, y: 195, lat: '18.6725° N', lng: '78.0941° E', highway: 'NH-44 / NH-63' },
  'Jagtial': { x: 345, y: 175, lat: '18.7937° N', lng: '78.9128° E', highway: 'NH-63' },
  'Peddapalli': { x: 450, y: 200, lat: '18.6164° N', lng: '79.3824° E', highway: 'SH-1' },
  'Rajanna Sircilla': { x: 330, y: 245, lat: '18.3846° N', lng: '78.8354° E', highway: 'SH-11' },
  'Karimnagar': { x: 390, y: 230, lat: '18.4386° N', lng: '79.1288° E', highway: 'SH-1 Rajiv Rahadari' },
  'Kamareddy': { x: 250, y: 260, lat: '18.3228° N', lng: '78.3417° E', highway: 'NH-44' },
  'Medak': { x: 245, y: 320, lat: '18.0465° N', lng: '78.2612° E', highway: 'NH-765D' },
  'Siddipet': { x: 345, y: 305, lat: '18.1018° N', lng: '78.8521° E', highway: 'SH-1' },
  'Jangaon': { x: 415, y: 355, lat: '17.7231° N', lng: '79.1601° E', highway: 'NH-163' },
  'Hanamkonda': { x: 495, y: 305, lat: '18.0120° N', lng: '79.5510° E', highway: 'NH-163' },
  'Warangal': { x: 510, y: 320, lat: '17.9689° N', lng: '79.5941° E', highway: 'NH-163 / NH-563' },
  'Jayashankar Bhupalpally': { x: 560, y: 225, lat: '18.4358° N', lng: '79.8656° E', highway: 'NH-353C' },
  'Mulugu': { x: 580, y: 275, lat: '18.1925° N', lng: '79.9427° E', highway: 'NH-163' },
  'Bhadradri Kothagudem': { x: 690, y: 390, lat: '17.5552° N', lng: '80.6200° E', highway: 'NH-30' },
  'Khammam': { x: 615, y: 445, lat: '17.2473° N', lng: '80.1514° E', highway: 'NH-365A' },
  'Mahabubabad': { x: 585, y: 375, lat: '17.5986° N', lng: '80.0038° E', highway: 'SH-9' },
  'Suryapet': { x: 515, y: 465, lat: '17.1439° N', lng: '79.6239° E', highway: 'NH-65' },
  'Nalgonda': { x: 445, y: 475, lat: '17.0577° N', lng: '79.2684° E', highway: 'SH-2' },
  'Yadadri Bhuvanagiri': { x: 360, y: 395, lat: '17.5108° N', lng: '78.8812° E', highway: 'NH-163' },
  'Medchal-Malkajgiri': { x: 285, y: 380, lat: '17.6297° N', lng: '78.4815° E', highway: 'ORR / NH-44' },
  'Hyderabad': { x: 275, y: 415, lat: '17.3850° N', lng: '78.4867° E', highway: 'ORR / NH-65' },
  'Rangareddy': { x: 265, y: 450, lat: '17.2000° N', lng: '78.4000° E', highway: 'NH-44' },
  'Sangareddy': { x: 205, y: 385, lat: '17.6190° N', lng: '78.0815° E', highway: 'NH-65' },
  'Vikarabad': { x: 175, y: 435, lat: '17.3364° N', lng: '77.9048° E', highway: 'SH-4' },
  'Mahabubnagar': { x: 195, y: 535, lat: '16.7488° N', lng: '77.9856° E', highway: 'NH-44' },
  'Narayanpet': { x: 105, y: 545, lat: '16.7356° N', lng: '77.4984° E', highway: 'SH-15' },
  'Jogulamba Gadwal': { x: 165, y: 625, lat: '16.2333° N', lng: '77.8000° E', highway: 'NH-44' },
  'Wanaparthy': { x: 215, y: 605, lat: '16.3622° N', lng: '78.0628° E', highway: 'NH-44 Spur' },
  'Nagarkurnool': { x: 265, y: 585, lat: '16.4856° N', lng: '78.3323° E', highway: 'SH-18' }
};

// Major Road Network Lines connecting hubs in Telangana
const MAJOR_HIGHWAYS = [
  { id: 'nh44-n', name: 'NH-44 North', d: 'M 310 70 L 270 125 L 220 195 L 250 260 L 285 380 L 275 415' },
  { id: 'nh44-s', name: 'NH-44 South', d: 'M 275 415 L 265 450 L 195 535 L 215 605 L 165 625' },
  { id: 'sh1-rajiv', name: 'SH-1 Rajiv Rahadari', d: 'M 275 415 L 285 380 L 345 305 L 390 230 L 450 200 L 470 155 L 430 90' },
  { id: 'nh163', name: 'NH-163', d: 'M 275 415 L 360 395 L 415 355 L 495 305 L 510 320 L 580 275' },
  { id: 'nh65', name: 'NH-65', d: 'M 205 385 L 275 415 L 360 395 L 445 475 L 515 465' },
  { id: 'nh563', name: 'NH-563', d: 'M 345 175 L 390 230 L 495 305 L 510 320 L 585 375 L 615 445' },
  { id: 'nh365', name: 'SH-9', d: 'M 515 465 L 585 375 L 510 320' },
  { id: 'godavari-corridor', name: 'Godavari Link', d: 'M 220 195 L 345 175 L 450 200 L 470 155' }
];

export default function FarmToStorageRouteMap({
  originVillage = 'Maheshwaram',
  originMandal = 'Narsampet',
  originDistrict = 'Warangal',
  originLandmark = 'Survey No. 48/B, Near Rythu Vedika',
  originPincode = '506132',
  originSourceType = 'Own Cultivated Land / Farm Gate',
  facility = null,
  vehicleType = 'Tractor Trolley',
  vehicleNumber = 'TS-03-BK-2026',
  distanceKm = 48,
  compact = false
}) {
  const [mapMode, setMapMode] = useState('corridor'); // 'corridor' | 'topo' | 'satellite'
  const [isAnimating, setIsAnimating] = useState(true);
  const [transitProgress, setTransitProgress] = useState(0.35); // 0.0 to 1.0 along route
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null); // 'origin' | 'destination' | 'checkpoint' | null
  const [showCoordinatesHud, setShowCoordinatesHud] = useState(true);

  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Fallback facility if null or empty
  const defaultFac = {
    name: 'Karimnagar DCCB Cold Chain Hub',
    district: 'Karimnagar',
    state: 'Telangana',
    capacityTons: 6500,
    tempMin: -2,
    tempMax: 4
  };
  const activeFac = (facility && facility.name) ? facility : defaultFac;

  // Get Origin & Destination Coordinates
  const originCoord = DISTRICT_COORDS[originDistrict] || DISTRICT_COORDS['Warangal'] || { x: 510, y: 320, lat: '17.9689° N', lng: '79.5941° E', highway: 'Rural SH' };
  
  // Destination facility district lookup
  const facilityDistrict = activeFac.district || 'Karimnagar';
  const destCoord = DISTRICT_COORDS[facilityDistrict] || DISTRICT_COORDS['Karimnagar'] || { x: 390, y: 230, lat: '18.4386° N', lng: '79.1288° E', highway: 'Industrial Ring' };

  // Calculate Midpoint and Smooth Curved Bezier Path
  const x1 = originCoord.x;
  const y1 = originCoord.y;
  const x2 = destCoord.x;
  const y2 = destCoord.y;

  // Bezier control point with slight geographical curve
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx1 = x1 + dx * 0.45 - dy * 0.25;
  const cy1 = y1 + dy * 0.45 + dx * 0.25;

  const routePathD = `M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2}`;

  // Checkpoints at 35% and 72% along curve
  const t1 = 0.35;
  const cp1X = (1 - t1) * (1 - t1) * x1 + 2 * (1 - t1) * t1 * cx1 + t1 * t1 * x2;
  const cp1Y = (1 - t1) * (1 - t1) * y1 + 2 * (1 - t1) * t1 * cy1 + t1 * t1 * y2;

  const t2 = 0.72;
  const cp2X = (1 - t2) * (1 - t2) * x1 + 2 * (1 - t2) * t2 * cx1 + t2 * t2 * x2;
  const cp2Y = (1 - t2) * (1 - t2) * y1 + 2 * (1 - t2) * t2 * cy1 + t2 * t2 * y2;

  // Current transit vehicle position along quadratic bezier
  const tVal = transitProgress;
  const vehX = (1 - tVal) * (1 - tVal) * x1 + 2 * (1 - tVal) * tVal * cx1 + tVal * tVal * x2;
  const vehY = (1 - tVal) * (1 - tVal) * y1 + 2 * (1 - tVal) * tVal * cy1 + tVal * tVal * y2;

  // Vehicle tangent angle for realistic rotation
  const tangentX = 2 * (1 - tVal) * (cx1 - x1) + 2 * tVal * (x2 - cx1);
  const tangentY = 2 * (1 - tVal) * (cy1 - y1) + 2 * tVal * (y2 - cy1);
  const angleDeg = (Math.atan2(tangentY, tangentX) * 180) / Math.PI;

  // Animated loop for vehicle movement
  useEffect(() => {
    if (!isAnimating) return;
    let start = null;
    const duration = 12000; // 12 seconds per full journey loop

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % duration;
      setTransitProgress(elapsed / duration);
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isAnimating]);

  // Estimated Travel Time
  const speedKmh = (vehicleType && vehicleType.toLowerCase().includes('tractor')) ? 35 : 55;
  const transitHours = Math.floor(distanceKm / speedKmh);
  const transitMins = Math.round(((distanceKm / speedKmh) - transitHours) * 60);

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.2));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  const resetZoom = () => setZoomLevel(1);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none bg-slate-950 border-0 flex flex-col'
          : 'border-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl shadow-emerald-950/40'
      }`}
    >
      {/* Top Header & Telemetry Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-3 sm:px-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs sm:text-sm font-black text-white tracking-wide uppercase flex items-center space-x-1.5">
                <span>Interactive Farm-to-Chamber Transit Map</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h3>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Geotagged
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Origin: <strong className="text-emerald-300">{originVillage}, {originDistrict}</strong> ➔ Hub: <strong className="text-amber-300">{activeFac.name}</strong>
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setMapMode('corridor')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 ${
              mapMode === 'corridor'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🛣️ Highway</span>
          </button>

          <button
            type="button"
            onClick={() => setMapMode('topo')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 ${
              mapMode === 'topo'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🌾 Agri Topo</span>
          </button>

          <button
            type="button"
            onClick={() => setMapMode('satellite')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 ${
              mapMode === 'satellite'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🛰️ Satellite</span>
          </button>
        </div>

        {/* Action / Map Tools */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setIsAnimating(!isAnimating)}
            title={isAnimating ? 'Pause Transit Animation' : 'Resume Transit Animation'}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
          >
            {isAnimating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            type="button"
            onClick={zoomIn}
            title="Zoom In"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={zoomOut}
            title="Zoom Out"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={resetZoom}
            title="Reset Zoom"
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold transition"
          >
            100%
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen Map'}
            className="p-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs transition"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className={`relative overflow-hidden w-full ${isFullscreen ? 'flex-1' : compact ? 'h-80' : 'h-[440px]'}`}>
        {/* SVG Interactive Canvas */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          <svg
            viewBox="50 30 700 600"
            className="w-full h-full select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Grid Background Pattern */}
              <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(16, 185, 129, 0.07)" strokeWidth="0.8" />
              </pattern>

              {/* Satellite Grid Pattern */}
              <pattern id="sat-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="none" />
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.6" />
                <circle cx="30" cy="30" r="1" fill="rgba(56, 189, 248, 0.2)" />
              </pattern>

              {/* Transit Route Glow Filter */}
              <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Farm Pulse Filter */}
              <filter id="origin-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Gradient for Transit Highway Line */}
              <linearGradient id="transit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              {/* Satellite Terrain Gradient */}
              <radialGradient id="satellite-glow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="60%" stopColor="#090d16" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>
            </defs>

            {/* Background Canvas Layer */}
            <rect
              x="0"
              y="0"
              width="800"
              height="650"
              fill={mapMode === 'satellite' ? 'url(#satellite-glow)' : mapMode === 'topo' ? '#061712' : '#090f1d'}
            />

            {/* Grid Mesh */}
            <rect
              x="0"
              y="0"
              width="800"
              height="650"
              fill={mapMode === 'satellite' ? 'url(#sat-grid)' : 'url(#map-grid)'}
            />

            {/* Topographic Contours / River Corridors in Topo mode */}
            {mapMode === 'topo' && (
              <g opacity="0.4">
                {/* Godavari River Basin Flow */}
                <path
                  d="M 200 120 C 310 130, 420 180, 520 230 C 600 270, 680 340, 750 420"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="6"
                  strokeDasharray="8,4"
                  opacity="0.6"
                />
                <text x="530" y="225" fill="#38bdf8" fontSize="10" fontWeight="bold" opacity="0.8">
                  ~ Godavari Agri Water Basin
                </text>

                {/* Krishna River Basin Flow */}
                <path
                  d="M 120 570 C 220 580, 340 590, 450 560 C 540 540, 620 510, 710 490"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="5"
                  strokeDasharray="6,4"
                  opacity="0.5"
                />
                <text x="320" y="605" fill="#38bdf8" fontSize="9" fontWeight="bold" opacity="0.7">
                  ~ Krishna River Corridor
                </text>

                {/* Topographic elevation contours */}
                <ellipse cx="380" cy="300" rx="260" ry="180" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="3,6" opacity="0.25" />
                <ellipse cx="400" cy="280" rx="180" ry="120" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4,8" opacity="0.3" />
                <ellipse cx="410" cy="270" rx="110" ry="70" fill="none" stroke="#34d399" strokeWidth="1.2" opacity="0.35" />
              </g>
            )}

            {/* Satellite Crop Canopy Overlay */}
            {mapMode === 'satellite' && (
              <g opacity="0.3">
                <circle cx="390" cy="230" r="90" fill="#047857" filter="blur(25px)" />
                <circle cx="510" cy="320" r="110" fill="#065f46" filter="blur(30px)" />
                <circle cx="280" cy="380" r="80" fill="#1e293b" filter="blur(20px)" />
                <circle cx="615" cy="445" r="90" fill="#047857" filter="blur(25px)" />
              </g>
            )}

            {/* Telangana State Boundary Outline */}
            <path
              d="M 280 50 C 360 45, 460 70, 480 130 C 510 160, 590 190, 620 240 C 670 290, 730 350, 720 420 C 700 480, 630 490, 560 495 C 500 520, 460 560, 400 580 C 320 620, 210 650, 150 630 C 110 590, 80 540, 110 500 C 130 460, 170 440, 180 390 C 190 320, 220 220, 225 170 C 230 110, 250 60, 280 50 Z"
              fill="rgba(16, 185, 129, 0.03)"
              stroke="#10b981"
              strokeWidth="1.8"
              strokeDasharray="6,4"
              opacity="0.5"
            />
            <text x="90" y="70" fill="#10b981" fontSize="11" fontWeight="bold" opacity="0.5" letterSpacing="2">
              TELANGANA AGRI LOGISTICS REGION
            </text>

            {/* Major Highways Mesh */}
            <g opacity={mapMode === 'satellite' ? '0.35' : '0.5'}>
              {MAJOR_HIGHWAYS.map((hw) => (
                <path
                  key={hw.id}
                  d={hw.d}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </g>

            {/* Telangana District Hub Nodes (Light Dots) */}
            <g>
              {Object.entries(DISTRICT_COORDS).map(([name, pt]) => {
                const isOrigin = name.toLowerCase() === originDistrict.toLowerCase();
                const isDest = name.toLowerCase() === facilityDistrict.toLowerCase();
                if (isOrigin || isDest) return null; // Rendered prominently separately

                return (
                  <g key={name} className="group cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="3.5"
                      fill="#475569"
                      className="group-hover:fill-emerald-400 group-hover:r-5 transition-all"
                    />
                    <text
                      x={pt.x + 6}
                      y={pt.y + 3}
                      fill="#64748b"
                      fontSize="9"
                      fontWeight="600"
                      className="group-hover:fill-slate-200 transition-colors pointer-events-none"
                    >
                      {name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* ACTIVE TRANSIT CORRIDOR: Glow underlay */}
            <path
              d={routePathD}
              fill="none"
              stroke="url(#transit-gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.3"
              filter="url(#route-glow)"
            />

            {/* ACTIVE TRANSIT CORRIDOR: Main Route Line */}
            <path
              d={routePathD}
              fill="none"
              stroke="url(#transit-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8,6"
            />

            {/* Transit Route Waypoints */}
            {/* Checkpoint 1: Weighbridge / Dharma Kanta */}
            <g
              transform={`translate(${cp1X}, ${cp1Y})`}
              onClick={() => setSelectedPoint('checkpoint1')}
              className="cursor-pointer group"
            >
              <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fontSize="11">⚖️</text>
              <rect x="-45" y="-32" width="90" height="18" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.9" />
              <text x="0" y="-20" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">
                Weighbridge Hub
              </text>
            </g>

            {/* Checkpoint 2: Agro Inspection & Cold Chamber Inward */}
            <g
              transform={`translate(${cp2X}, ${cp2Y})`}
              onClick={() => setSelectedPoint('checkpoint2')}
              className="cursor-pointer group"
            >
              <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fontSize="11">🛡️</text>
              <rect x="-55" y="-32" width="110" height="18" rx="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" opacity="0.9" />
              <text x="0" y="-20" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">
                Quality & Moisture Gate
              </text>
            </g>

            {/* POINT A: FARM ORIGIN MARKER */}
            <g
              transform={`translate(${x1}, ${y1})`}
              onClick={() => setSelectedPoint('origin')}
              className="cursor-pointer"
            >
              {/* Radar Pulse Animation */}
              <circle cx="0" cy="0" r="28" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.4">
                <animate attributeName="r" values="12;38;12" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="18" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" filter="url(#origin-glow)" />
              <text x="0" y="5" textAnchor="middle" fontSize="13">🌱</text>

              {/* Point A Flag & Label */}
              <g transform="translate(0, -28)">
                <rect x="-65" y="-24" width="130" height="26" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
                <text x="0" y="-12" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="900" letterSpacing="0.5">
                  POINT A: FARM ORIGIN
                </text>
                <text x="0" y="-2" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                  {originVillage} ({originDistrict})
                </text>
              </g>
            </g>

            {/* POINT B: COLD STORAGE DESTINATION MARKER */}
            <g
              transform={`translate(${x2}, ${y2})`}
              onClick={() => setSelectedPoint('destination')}
              className="cursor-pointer"
            >
              {/* Pulse Ring */}
              <circle cx="0" cy="0" r="32" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.4">
                <animate attributeName="r" values="14;42;14" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="20" fill="#451a03" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="0" y="5" textAnchor="middle" fontSize="14">❄️</text>

              {/* Point B Flag & Label */}
              <g transform="translate(0, -32)">
                <rect x="-85" y="-26" width="170" height="28" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="0" y="-13" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="900" letterSpacing="0.5">
                  POINT B: COLD STORAGE HUB
                </text>
                <text x="0" y="-2" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                  {(activeFac?.name || 'Cold Storage Hub').length > 24 ? (activeFac?.name || 'Cold Storage Hub').substring(0, 22) + '...' : (activeFac?.name || 'Cold Storage Hub')}
                </text>
              </g>
            </g>

            {/* ANIMATED VEHICLE IN MOTION ALONG ROUTE */}
            <g transform={`translate(${vehX}, ${vehY}) rotate(${angleDeg})`}>
              {/* Vehicle Glow */}
              <circle cx="0" cy="0" r="14" fill="#38bdf8" opacity="0.3" filter="url(#route-glow)" />
              
              {/* Vehicle Body Box */}
              <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              
              {/* Wheels */}
              <rect x="-12" y="-11" width="7" height="3" rx="1" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />
              <rect x="5" y="-11" width="7" height="3" rx="1" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />
              <rect x="-12" y="8" width="7" height="3" rx="1" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />
              <rect x="5" y="8" width="7" height="3" rx="1" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />
              
              {/* Vehicle Emoji / Icon */}
              <text x="0" y="4" textAnchor="middle" fontSize="10">
                {vehicleType && vehicleType.toLowerCase().includes('tractor') ? '🚜' : '🚚'}
              </text>

              {/* Headlight beams */}
              <polygon points="14,-4 32,-9 32,9 14,4" fill="rgba(254, 240, 138, 0.35)" />
            </g>

            {/* Vehicle Floating Reg Tag (non-rotating) */}
            <g transform={`translate(${vehX}, ${vehY - 24})`}>
              <rect x="-42" y="-10" width="84" height="18" rx="5" fill="#090f1d" stroke="#38bdf8" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontWeight="bold">
                {vehicleNumber || 'IN TRANSIT'}
              </text>
            </g>
          </svg>
        </div>

        {/* Floating HUD: Transit Telemetry Card */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md z-10 bg-slate-900/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-700/80 shadow-2xl">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                📍
              </span>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  Verified Transit Route Telemetry
                </h4>
                <p className="text-[10px] text-slate-400">
                  WDRA Standard Farm-to-Chamber Logistics Pass
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ~{distanceKm} KM
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase font-bold">Transit Time</span>
              <span className="font-mono font-bold text-white text-xs">
                {transitHours > 0 ? `${transitHours}h ${transitMins}m` : `${transitMins} mins`}
              </span>
              <span className="text-[9px] text-slate-500 block">via {originCoord.highway}</span>
            </div>

            <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase font-bold">Assigned Vehicle</span>
              <span className="font-bold text-emerald-300 text-xs truncate block">
                {vehicleType}
              </span>
              <span className="text-[9px] font-mono text-slate-400 block">{vehicleNumber}</span>
            </div>

            <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase font-bold">Chamber Temp</span>
              <span className="font-mono font-bold text-amber-300 text-xs">
                {activeFac.tempMin !== undefined ? `${activeFac.tempMin}°C to ${activeFac.tempMax}°C` : '0°C to 4°C'}
              </span>
              <span className="text-[9px] text-emerald-400 block">✓ Pre-Cooled</span>
            </div>
          </div>
        </div>

        {/* Floating Coordinates & Geotag Badge */}
        {showCoordinatesHud && (
          <div className="absolute top-3 left-3 hidden sm:flex flex-col space-y-1 z-10">
            <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 text-[10px] font-mono text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Farm Geotag: {originCoord.lat}, {originCoord.lng}</span>
            </div>
            <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 text-[10px] font-mono text-slate-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Hub Geotag: {destCoord.lat}, {destCoord.lng}</span>
            </div>
          </div>
        )}

        {/* Live Legend */}
        <div className="absolute top-3 right-3 z-10 hidden md:flex flex-col space-y-1.5 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-[10px]">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Map Legend</span>
          <div className="flex items-center space-x-2 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Point A: Farm Gate</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Point B: Cold Storage</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            <span>Enroute Checkpoints</span>
          </div>
        </div>
      </div>

      {/* Detail Modal / Drawer when user clicks a marker */}
      {selectedPoint && (
        <div className="bg-slate-900 border-t border-slate-800 p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          {selectedPoint === 'origin' && (
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">🌱 POINT A (Farm Origin):</span>
                <span className="font-bold text-white">{originVillage}, {originMandal} Mandal, {originDistrict} Dist</span>
              </div>
              <p className="text-slate-400 mt-0.5">
                Landmark / Survey No: <strong>{originLandmark}</strong> • PIN: {originPincode} • Type: {originSourceType}
              </p>
            </div>
          )}

          {selectedPoint === 'destination' && (
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">❄️ POINT B (Cold Storage Facility):</span>
                <span className="font-bold text-white">{activeFac.name}</span>
              </div>
              <p className="text-slate-400 mt-0.5">
                District: {activeFac.district}, Telangana • Capacity: {activeFac.capacityTons?.toLocaleString() || '5,000'} MT • WDRA Certified Chambers
              </p>
            </div>
          )}

          {selectedPoint === 'checkpoint1' && (
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sky-400 font-bold">⚖️ CHECKPOINT 1: Regional Weighbridge (Dharma Kanta)</span>
              </div>
              <p className="text-slate-400 mt-0.5">
                Official gross vehicle weighment before bay unloading • Certified tare weight printed on inward slip.
              </p>
            </div>
          )}

          {selectedPoint === 'checkpoint2' && (
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">🛡️ CHECKPOINT 2: Pre-Storage Moisture & Quality Inspection</span>
              </div>
              <p className="text-slate-400 mt-0.5">
                Lab grade digital moisture verification and grading test • Pre-cooling chamber staging bay.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setSelectedPoint(null)}
            className="self-end sm:self-auto px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
          >
            ✕ Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
