// Coordinates for all 33 Telangana Districts
export const TELANGANA_DISTRICT_COORDS = {
  'Adilabad': { lat: 19.6641, lng: 78.5320, highway: 'NH-44 North Corridor' },
  'Kumuram Bheem Asifabad': { lat: 19.3644, lng: 79.2934, highway: 'SH-1 Coal Belt Link' },
  'Mancherial': { lat: 18.8679, lng: 79.4639, highway: 'SH-1 Godavari Basin' },
  'Nirmal': { lat: 19.0964, lng: 78.3434, highway: 'NH-44 North' },
  'Nizamabad': { lat: 18.6725, lng: 78.0941, highway: 'NH-44 / NH-63 Agri Hub' },
  'Jagtial': { lat: 18.7937, lng: 78.9128, highway: 'NH-63 Mango Corridor' },
  'Peddapalli': { lat: 18.6164, lng: 79.3824, highway: 'SH-1 Rajiv Rahadari' },
  'Rajanna Sircilla': { lat: 18.3846, lng: 78.8354, highway: 'SH-11 Handloom & Agri Route' },
  'Karimnagar': { lat: 18.4386, lng: 79.1288, highway: 'SH-1 Rajiv Rahadari Express' },
  'Kamareddy': { lat: 18.3228, lng: 78.3417, highway: 'NH-44 Central' },
  'Medak': { lat: 18.0465, lng: 78.2612, highway: 'NH-765D Agri Link' },
  'Siddipet': { lat: 18.1018, lng: 78.8521, highway: 'SH-1 Rajiv Rahadari' },
  'Jangaon': { lat: 17.7231, lng: 79.1601, highway: 'NH-163 Warangal Highway' },
  'Hanamkonda': { lat: 18.0120, lng: 79.5510, highway: 'NH-163 Cotton & Chilli Hub' },
  'Warangal': { lat: 17.9689, lng: 79.5941, highway: 'NH-163 / NH-563 Mega APMC Corridor' },
  'Jayashankar Bhupalpally': { lat: 18.4358, lng: 79.8656, highway: 'NH-353C Forest Link' },
  'Mulugu': { lat: 18.1925, lng: 79.9427, highway: 'NH-163 Eastern Agri Link' },
  'Bhadradri Kothagudem': { lat: 17.5552, lng: 80.6200, highway: 'NH-30 Agency Link' },
  'Khammam': { lat: 17.2473, lng: 80.1514, highway: 'NH-365A Chilli & Mango Corridor' },
  'Mahabubabad': { lat: 17.5986, lng: 80.0038, highway: 'SH-9 Transit Way' },
  'Suryapet': { lat: 17.1439, lng: 79.6239, highway: 'NH-65 Vijayawada Highway' },
  'Nalgonda': { lat: 17.0577, lng: 79.2684, highway: 'SH-2 Miryalaguda Rice Corridor' },
  'Yadadri Bhuvanagiri': { lat: 17.5108, lng: 78.8812, highway: 'NH-163 Hyderabad Outer' },
  'Medchal-Malkajgiri': { lat: 17.6297, lng: 78.4815, highway: 'ORR / NH-44 Logistics Belt' },
  'Hyderabad': { lat: 17.3850, lng: 78.4867, highway: 'ORR / Regional Hub' },
  'Rangareddy': { lat: 17.2000, lng: 78.4000, highway: 'NH-44 Airport Corridor' },
  'Sangareddy': { lat: 17.6190, lng: 78.0815, highway: 'NH-65 Mumbai Highway' },
  'Vikarabad': { lat: 17.3364, lng: 77.9048, highway: 'SH-4 Tandur Red Gram Route' },
  'Mahabubnagar': { lat: 16.7488, lng: 77.9856, highway: 'NH-44 Bangalore Highway' },
  'Narayanpet': { lat: 16.7356, lng: 77.4984, highway: 'SH-15 Interstate Link' },
  'Jogulamba Gadwal': { lat: 16.2333, lng: 77.8000, highway: 'NH-44 Tungabhadra Basin' },
  'Wanaparthy': { lat: 16.3622, lng: 78.0628, highway: 'NH-44 Spur Road' },
  'Nagarkurnool': { lat: 16.4856, lng: 78.3323, highway: 'SH-18 Nallamala Link' }
};

/**
 * Calculates road distance in kilometers between two GPS coordinates
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 25; // fallback average
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const aerialKm = R * c;

  // Road distance is typically ~1.25x - 1.35x aerial distance across Telangana terrain
  const roadDistance = Math.round(aerialKm * 1.28);
  return Math.max(6, roadDistance);
}

/**
 * Formats transit time by Tractor (~28 km/h) and Agri Mini Truck (~45 km/h)
 */
export function formatTransitTime(distanceKm) {
  const safeDist = Math.max(1, distanceKm || 10);
  const tractorMins = Math.round((safeDist / 28) * 60);
  const truckMins = Math.round((safeDist / 45) * 60);

  const formatMins = (mins) => {
    if (mins < 60) return `${mins} mins`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return remMins === 0 ? `${hrs} hr` : `${hrs} hr ${remMins} mins`;
  };

  return {
    tractorTime: formatMins(tractorMins),
    truckTime: formatMins(truckMins),
    tractorMins,
    truckMins
  };
}

/**
 * Filters and enriches facilities providing space for a specific crop with real-time distance and transit time
 */
export function getCropFacilitiesWithDistance({
  facilities = [],
  cropId = '',
  originDistrict = 'Warangal',
  cropName = ''
}) {
  const originCoord = TELANGANA_DISTRICT_COORDS[originDistrict] || TELANGANA_DISTRICT_COORDS['Warangal'];
  const normalizedCropId = (cropId || '').toLowerCase().trim();
  const normalizedCropName = (cropName || '').toLowerCase().trim();

  // Normalize mapping for aliases
  const CROP_ALIASES = {
    'chilli': ['dry_red_chilli', 'green_chilli'],
    'red_chilli': ['dry_red_chilli'],
    'teja_chilli': ['dry_red_chilli'],
    'turmeric': ['nizamabad_turmeric'],
    'cotton': ['cotton_seeds'],
    'paddy_seed': ['paddy'],
    'rice': ['paddy'],
    'sweet_orange': ['sweet_orange', 'acid_lime'],
    'mosambi': ['sweet_orange'],
    'red_gram': ['red_gram', 'bengal_gram', 'black_gram', 'green_gram']
  };

  const targetKeywords = [
    normalizedCropId,
    normalizedCropName,
    ...(CROP_ALIASES[normalizedCropId] || [])
  ].filter(Boolean);

  const enriched = facilities.map(fac => {
    // Determine distance
    let facLat = fac.latitude;
    let facLng = fac.longitude;

    if (!facLat || !facLng) {
      const distCoord = TELANGANA_DISTRICT_COORDS[fac.district] || TELANGANA_DISTRICT_COORDS['Karimnagar'];
      facLat = distCoord.lat;
      facLng = distCoord.lng;
    }

    const distanceKm = calculateDistanceKm(originCoord.lat, originCoord.lng, facLat, facLng);
    const transit = formatTransitTime(distanceKm);

    // Check crop compatibility
    const supported = Array.isArray(fac.supportedCrops) ? fac.supportedCrops : [];
    
    // Exact or alias match
    const isDirectMatch = supported.some(sc => {
      const scLower = sc.toLowerCase();
      return targetKeywords.some(kw => scLower === kw || scLower.includes(kw) || kw.includes(scLower));
    });

    // Multi-commodity fallback if general cold storage
    const isMultiCommodity = fac.chamberTypes?.some(ct => ct.toLowerCase().includes('multi') || ct.toLowerCase().includes('general')) ||
      (fac.temperatureRange && fac.temperatureRange.includes('-'));

    const isCompatible = isDirectMatch || isMultiCommodity || supported.length === 0;

    const isSameDistrict = (fac.district || '').toLowerCase() === originDistrict.toLowerCase();
    const highwayRoute = TELANGANA_DISTRICT_COORDS[fac.district]?.highway || 'Regional Highway';

    return {
      ...fac,
      distanceKm,
      transit,
      isDirectMatch,
      isCompatible,
      isSameDistrict,
      highwayRoute
    };
  });

  // Filter to matching facilities: direct matches first, or compatible
  let matched = enriched.filter(f => f.isDirectMatch);

  // If few direct matches, include compatible multi-chamber facilities
  if (matched.length < 5) {
    const additional = enriched.filter(f => !f.isDirectMatch && f.isCompatible);
    matched = [...matched, ...additional];
  }

  // Sort by: 1) Same district first, 2) Direct match, 3) Closest distance km
  matched.sort((a, b) => {
    if (a.isSameDistrict && !b.isSameDistrict) return -1;
    if (!a.isSameDistrict && b.isSameDistrict) return 1;
    if (a.isDirectMatch && !b.isDirectMatch) return -1;
    if (!a.isDirectMatch && b.isDirectMatch) return 1;
    return a.distanceKm - b.distanceKm;
  });

  return matched;
}
