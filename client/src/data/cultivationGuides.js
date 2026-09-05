// Comprehensive Cultivation Guides for Telangana & Regional Crops
// Agronomic benchmarks based on PJTSAU (Professor Jayashankar Telangana State Agricultural University)

export const CROP_CULTIVATION_GUIDES = {
  paddy: {
    cropName: 'Paddy / Rice (Telangana Sona - RNR 15048)',
    season: 'Kharif (Vanakaalam: June - July) & Rabi (Yasangi: November - December)',
    sowingMonths: 'June - July / Nov - Dec',
    durationDays: '120 - 125 days (Short duration, low GI)',
    soil: 'Clayey to clay-loam, alluvial or black cotton soil with good water retention. Optimal pH: 5.5 - 7.0.',
    climate: 'Warm and humid, 22°C - 32°C. Requires abundant sunlight during grain filling and dry weather for harvesting.',
    seedRate: '8 - 10 kg/acre for nursery (transplanting) or 15 - 20 kg/acre for direct seeded rice (DSR).',
    spacing: '20 cm × 15 cm (single or two seedlings per hill).',
    nurseryPrep: 'Prepare raised beds, treat seeds with Carbendazim (2g/kg seed), transplant 20-25 days old seedlings.',
    irrigation: 'Maintain 2 - 3 cm shallow standing water during early vegetative stage, 5 cm at panicle initiation; drain completely 10 days before harvest.',
    fertilizer: 'NPK: 40:20:20 kg/acre. Apply 100% P and 50% K as basal; N in 3 split doses (basal, tillering, panicle initiation). Zinc sulphate @ 10 kg/acre in deficient soils.',
    pestsAndDiseases: 'Stem borer, leaf folder, blast & BPH. Spray Neem oil (5ml/L), Chlorantraniliprole (0.3ml/L) for stem borer, Tricyclazole for blast.',
    harvesting: 'Harvest when 85% grains turn golden yellow and grain moisture is around 18% - 20%.',
    postHarvestHandling: 'Thresh, winnow and sun-dry grains steadily on clean tarpaulins until moisture reaches 12% - 14% before bagging for cold storage.',
    yieldPerAcre: '24 - 28 Quintals/Acre',
    agronomicTip: 'Telangana Sona has low Glycemic Index (GI 51.5); avoid excessive nitrogen application to prevent neck blast and lodging.'
  },

  maize: {
    cropName: 'Maize / Corn (Commercial Grain)',
    season: 'Kharif (June - July) & Rabi (October - November)',
    sowingMonths: 'June - July / Oct - Nov',
    durationDays: '95 - 110 days',
    soil: 'Well-drained deep loamy to silty-loam soil rich in organic matter. Avoid waterlogged or saline soils. Optimal pH: 6.5 - 7.5.',
    climate: 'Warm weather crop, 21°C - 30°C. Highly sensitive to frost and waterlogging during early stages.',
    seedRate: '7 - 8 kg/acre for hybrid grain maize; 10 kg/acre for baby corn.',
    spacing: '60 cm between rows × 20 cm between plants.',
    nurseryPrep: 'Direct field dibbling after 2 deep plowings, 1 harrowing, and application of 4 tonnes well-decomposed FYM/acre.',
    irrigation: 'Critical irrigation stages: Knee-high stage, tasseling, silking, and grain filling. Total 5-6 irrigations in Rabi.',
    fertilizer: 'NPK: 48:24:20 kg/acre. Apply full P, full K, and 1/3rd N at sowing. Top dress remaining N at knee-high and tasseling stages.',
    pestsAndDiseases: 'Fall Armyworm (FAW) is a major pest. Install pheromone traps (4/acre). Spray Emamectin benzoate (0.4g/L) or Spinetoram (0.5ml/L) in whorls.',
    harvesting: 'Harvest when husk leaves turn straw-colored and black layer forms at the grain base (kernel moisture ~22%).',
    postHarvestHandling: 'De-husk, shell cobs with mechanical sheller, and dry kernels to ≤13% moisture to prevent Aspergillus flavus aflatoxin contamination before cold storage.',
    yieldPerAcre: '28 - 35 Quintals/Acre',
    agronomicTip: 'Scout regularly for Fall Armyworm whorl damage in the first 30 days. Maintain uniform plant stand for maximum cob weight.'
  },

  red_gram: {
    cropName: 'Tandur Red Gram / Tur Dal (GI Tagged)',
    season: 'Kharif (June - July with early monsoon showers)',
    sowingMonths: 'June - July',
    durationDays: '150 - 180 days (Medium to long duration)',
    soil: 'Deep black cotton soil (Regur soil) characteristic of Tandur/Vikarabad region. Excellent drainage required. pH: 7.0 - 8.2.',
    climate: 'Semi-arid tropical climate with 25°C - 35°C during vegetative stage and cool dry weather during flowering & pod maturity.',
    seedRate: '4 - 5 kg/acre (sole crop) or 2 kg/acre when intercropped with Soybean/Cotton (1:4 ratio).',
    spacing: '90 - 120 cm row-to-row × 20 - 30 cm plant-to-plant (or 150 cm × 30 cm in heavy black soils).',
    nurseryPrep: 'Direct field sowing. Treat seed with Rhizobium and Trichoderma viride (4g/kg seed) to prevent wilt.',
    irrigation: 'Predominantly rainfed; 1-2 protective irrigations during flower bud initiation and pod filling stage significantly boost yield.',
    fertilizer: 'NPK: 8:20:8 kg/acre basal. Spray 2% DAP or 1% 19:19:19 at peak flowering to reduce flower drop.',
    pestsAndDiseases: 'Helicoverpa pod borer and Fusarium wilt. Install bird perches (15/acre), spray Chlorantraniliprole or Flubendiamide at 50% flowering.',
    harvesting: 'Harvest when 80-85% pods turn brownish-black and seeds rattle inside the pods.',
    postHarvestHandling: 'Sun dry crop bundles for 3-4 days, thresh with pulse thresher, winnow, and dry to 9-10% moisture before cold storage.',
    yieldPerAcre: '7 - 10 Quintals/Acre',
    agronomicTip: 'Terminal nipping (clipping top 5 cm shoots) at 45-50 days promotes prolific secondary and tertiary branching, increasing pod cluster count.'
  },

  dry_red_chilli: {
    cropName: 'Dry Red Chilli (Warangal Teja Mirchi)',
    season: 'Kharif nursery in July; transplanting August - September',
    sowingMonths: 'August - September',
    durationDays: '150 - 180 days (multiple pickings)',
    soil: 'Well-drained black cotton, red loamy, or clay-loam soil. Highly sensitive to water stagnation. Optimal pH: 6.5 - 7.5.',
    climate: 'Warm humid climate during initial growth (20°C - 30°C); dry, warm sunny days during fruit ripening and drying.',
    seedRate: '200 - 250 grams/acre (hybrid varieties) or 400g/acre for open pollinated varieties.',
    spacing: '60 cm × 45 cm or 75 cm × 45 cm on raised beds with drip irrigation and silver-black plastic mulch.',
    nurseryPrep: 'Raise in pro-trays using sterilized coco-peat in shade net. Transplant 30-35 day old sturdy seedlings.',
    irrigation: 'Drip irrigation with fertigation is ideal. Maintain soil moisture without flooding; avoid moisture stress during flowering and fruit set.',
    fertilizer: 'NPK: 60:30:30 kg/acre. Apply full P as basal; N and K in 4 split doses or through weekly fertigation schedules.',
    pestsAndDiseases: 'Black thrips (Thrips parvispinus), mites, and anthracnose fruit rot. Spray Fipronil or spinosad for thrips; Azoxystrobin for anthracnose.',
    harvesting: 'Pick fully ripe, bright red firm pods. Avoid picking partially green chillies for dry spice production.',
    postHarvestHandling: 'Clean sorting, solar shade drying or hot air drying till moisture drops to 10-11%. Cold storage at 0°C - 4°C with 65-70% RH maintains crimson color and capsaicin pungency.',
    yieldPerAcre: '20 - 25 Quintals/Acre (Dry pods)',
    agronomicTip: 'Teja mirchi commands premium export rates when stored in humidity-controlled cold rooms immediately after curing to prevent darkening.'
  },

  nizamabad_turmeric: {
    cropName: 'Nizamabad Turmeric (Armoor / Duggirala)',
    season: 'Kharif planting in June - July (Mrigasira Karthi)',
    sowingMonths: 'June - July',
    durationDays: '240 - 270 days (8 - 9 months)',
    soil: 'Deep well-drained loamy, sandy-loam, or alluvial soil rich in humus. Clay soils hinder rhizome development. pH: 6.0 - 7.5.',
    climate: 'Warm and humid tropical climate, 20°C - 35°C. Requires high rainfall (1200-1500 mm) or assured irrigation.',
    seedRate: '8 - 10 Quintals of mother or finger rhizomes per acre.',
    spacing: 'Broad bed and furrow (BBF): 30 cm × 15 cm or ridges at 45-60 cm apart.',
    nurseryPrep: 'Select disease-free, plump seed rhizomes. Treat with Mancozeb (3g/L) + Chlorpyrifos for 30 minutes before planting.',
    irrigation: 'Light irrigation immediately after planting, subsequent watering at 7-10 day intervals. Critical during rhizome development.',
    fertilizer: 'NPK: 60:25:35 kg/acre + 10 tonnes FYM/acre + 15 kg Zinc sulphate + 10 kg Ferrous sulphate. Mulching with green leaves is essential.',
    pestsAndDiseases: 'Rhizome rot (Pythium) and shoot borer. Drench soil with Metalaxyl (2g/L) for rhizome rot; apply Trichoderma enriched manure.',
    harvesting: 'Maturity is indicated by yellowing and complete withering of all leaves (Jan - March). Dig carefully without bruising rhizomes.',
    postHarvestHandling: 'Boil rhizomes in boiling water for 45-60 mins until white fumes appear with characteristic aroma; sun dry for 10-15 days, polish mechanically, and store in cool dry chambers.',
    yieldPerAcre: '20 - 25 Quintals/Acre (Cured dry turmeric)',
    agronomicTip: 'Organic mulching with 5 tonnes green leaves per acre at planting and at 45 days controls weeds, conserves moisture, and improves curcumin percentage.'
  },

  cotton_seeds: {
    cropName: 'Hybrid Seed Cotton (Telangana White Gold)',
    season: 'Kharif (June - July with monsoon onset)',
    sowingMonths: 'June - July',
    durationDays: '150 - 180 days',
    soil: 'Deep black cotton soil (Vertisols) with good depth (>90 cm) and moisture holding capacity. pH: 6.5 - 8.0.',
    climate: 'Semi-arid, warm tropical climate. Requires minimum 180 frost-free days with temperature 21°C - 35°C.',
    seedRate: '1.5 - 2.0 kg/acre (hybrid Bt cotton packets).',
    spacing: '90 cm × 60 cm or 120 cm × 45 cm for high density planting system (HDPS).',
    nurseryPrep: 'Direct field dibbling of 1-2 seeds per hill at 3-5 cm depth after deep summer plowing.',
    irrigation: 'Drip irrigation ensures high boll retention. 3-4 supplemental irrigations during square formation, flowering, and boll development.',
    fertilizer: 'NPK: 48:24:24 kg/acre. Apply 100% P basal; N & K in 3 split doses at 30, 60, and 90 DAS. Foliar spray 2% Potassium Nitrate (13:0:45) at boll bursting.',
    pestsAndDiseases: 'Pink Bollworm (PBW), whiteflies, jassids. Install pheromone traps (5/acre), spray Neem oil 1500ppm, Proclaim or Profenophos for PBW.',
    harvesting: 'Pick clean, fully opened bolls in the dry morning after dew has evaporated. Keep trash and leaf debris separate.',
    postHarvestHandling: 'Dry raw seed cotton to ≤8% moisture. Store in dry, aerated, fire-protected warehouse chambers with anti-rodent measures.',
    yieldPerAcre: '10 - 14 Quintals/Acre (Kapas)',
    agronomicTip: 'Install pheromone traps 45 days after sowing to monitor Pink Bollworm ETL (8 moths/trap/night for 3 consecutive days).'
  },

  potato: {
    cropName: 'Potato (Kufri Jyoti / Pukhraj)',
    season: 'Rabi season (October - November planting)',
    sowingMonths: 'October - November',
    durationDays: '85 - 100 days',
    soil: 'Well-aerated, loose, sandy-loam or loamy soil rich in organic matter. Free from stones and hardpan. pH: 5.2 - 6.5.',
    climate: 'Cool season crop. Tuberization occurs best at night temperature of 14°C - 20°C. Temperature above 28°C stops tuber formation.',
    seedRate: '10 - 12 Quintals/acre of certified, sprout-activated seed tubers (30-45g weight).',
    spacing: '60 cm ridge-to-ridge × 20 cm tuber-to-tuber.',
    nurseryPrep: 'Remove cold-stored seed tubers 10-15 days prior to planting for chitting (sprout emergence) under diffused sunlight.',
    irrigation: 'Light irrigation immediately after planting; subsequent irrigations at 7-10 days interval. Stop irrigation 10 days before dehaulming.',
    fertilizer: 'NPK: 60:40:40 kg/acre + 10 tonnes FYM. Apply 50% N and 100% P and K at planting; remaining N at earthing up (30 DAS).',
    pestsAndDiseases: 'Late blight (Phytophthora infestans), aphids, tuber moth. Spray Mancozeb (2.5g/L) prophylactic, Metalaxyl (2g/L) for late blight.',
    harvesting: 'Cut vines (dehaulming) 10-12 days before digging to cure and harden tuber skin. Harvest on a dry clear day.',
    postHarvestHandling: 'Cure harvested tubers in a cool, ventilated dark shed for 10-15 days at 15°C - 18°C with 85-90% RH to heal wounds. Cold store at 2°C - 4°C with CIPC sprout suppressant.',
    yieldPerAcre: '100 - 140 Quintals/Acre',
    agronomicTip: 'Earthing up at 30-35 days is critical to prevent tuber exposure to sunlight, which causes greening (toxic solanine production).'
  },

  onion: {
    cropName: 'Onion (Nashik Red / Bhima Super / Pusa Red)',
    season: 'Kharif (June - July), Late Kharif (Sept - Oct) & Rabi (Nov - Dec)',
    sowingMonths: 'June - July / Nov - Dec',
    durationDays: '120 - 140 days',
    soil: 'Deep, friable, well-drained sandy-loam or silty-loam soil. Sensitive to waterlogging and soil acidity. pH: 6.5 - 7.5.',
    climate: 'Cool climate during early vegetative growth (15°C - 22°C) and warm dry weather during bulb development (25°C - 32°C).',
    seedRate: '3 - 4 kg/acre for nursery raising; 40,000 - 45,000 seedlings transplanted.',
    spacing: '15 cm row-to-row × 10 cm plant-to-plant on raised flat beds or broad beds.',
    nurseryPrep: 'Sow seeds in raised nursery beds, cover with thin compost and straw mulch. Transplant 45-50 day old seedlings.',
    irrigation: 'Frequent light irrigations (every 5-7 days). Critical at bulb formation and enlargement. Withhold irrigation 15 days before harvest.',
    fertilizer: 'NPK: 40:20:25 kg/acre + 10 tonnes FYM. Full P, K, and 50% N at transplanting; remaining N in 2 splits at 30 & 45 days.',
    pestsAndDiseases: 'Thrips (Thrips tabaci) and Purple blotch (Alternaria porri). Spray Profenophos (2ml/L) + sticker; Mancozeb (2.5g/L) for purple blotch.',
    harvesting: 'Harvest when 50% of tops fall over naturally (neck fall). Pull bulbs on a dry day.',
    postHarvestHandling: 'Field cure with foliage covering bulbs for 3-5 days, then shade cure for 10-15 days with 2.5 cm neck retained. Cold store in dry chambers at 0°C - 2°C with 65-70% RH.',
    yieldPerAcre: '80 - 120 Quintals/Acre',
    agronomicTip: 'Thorough drying and neck curing is mandatory before cold storage. Proper curing prevents neck rot (Botrytis) and early sprouting.'
  },

  tomato: {
    cropName: 'Tomato (Hybrid Arka Rakshak / Pusa Ruby)',
    season: 'Year-round: Kharif (June - July), Rabi (October - November), Summer (January - February)',
    sowingMonths: 'June - July / Oct - Nov / Jan - Feb',
    durationDays: '120 - 150 days',
    soil: 'Well-drained sandy-loam or red loamy soil rich in organic matter. Avoid poorly drained clay soils. pH: 6.0 - 7.0.',
    climate: 'Warm season crop, 20°C - 28°C. Night temperatures below 13°C or above 27°C inhibit fruit setting.',
    seedRate: '50 - 60 grams/acre for commercial indeterminate F1 hybrids.',
    spacing: '90 cm × 60 cm (staked) or 120 cm × 45 cm on drip raised beds.',
    nurseryPrep: 'Grow in 98-cell pro-trays in net houses. Transplant 25-28 day old seedlings in the late evening.',
    irrigation: 'Drip irrigation with 2-3 liters/plant/day. Avoid alternating extreme dry and wet spells to prevent blossom-end rot and fruit cracking.',
    fertilizer: 'NPK: 60:40:40 kg/acre. Weekly fertigation of 19:19:19 during vegetative phase, potassium nitrate (13:0:45) during fruiting.',
    pestsAndDiseases: 'Tomato Pinworm (Tuta absoluta), Whiteflies (vectors for leaf curl virus), Early & Late Blight. Use yellow sticky traps (10/acre); spray Chlorantraniliprole.',
    harvesting: 'Pick at breaker or turning stage (pink color at blossom end) for distant transportation and cold storage.',
    postHarvestHandling: 'Sort, wash in chlorinated water (100 ppm), dry, and pre-cool to 12°C within 6 hours. Cold store at 10°C - 12°C with 85-90% RH (do NOT store below 10°C to avoid chilling injury).',
    yieldPerAcre: '200 - 300 Quintals/Acre (Hybrid staked)',
    agronomicTip: 'Staking with bamboo poles or trellis wire increases marketable grade-A fruit yield by over 35% and drastically reduces soil-borne rot.'
  },

  banganapalli_mango: {
    cropName: 'Banganapalli Mango (GI Tagged King of Fruits)',
    season: 'Flowering: December - January; Harvest: April - June',
    sowingMonths: 'Planting grafts: July - September',
    durationDays: 'Perennial orchard (Commercial bearing starts from 4th - 5th year)',
    soil: 'Deep well-drained alluvial, red loamy, or medium black soil (depth >2 meters). Water table >2.5m. pH: 6.5 - 7.5.',
    climate: 'Tropical and subtropical climate, 24°C - 35°C. Requires distinct dry weather from October to January for profuse flowering.',
    seedRate: 'Grafts: 40 - 50 plants/acre (conventional 10m × 10m) or 160 plants/acre (Ultra High Density 5m × 5m).',
    spacing: '10m × 10m (normal) or 5m × 5m (UHD with regular pruning).',
    nurseryPrep: 'Use genuine epicotyl or stone grafted plants from accredited government nurseries.',
    irrigation: 'Drip irrigation during fruit development (Feb - April); stop irrigation 2 weeks before harvest to enhance fruit sweetness and shelf life.',
    fertilizer: 'Adult tree (10+ yrs): 1000g N + 500g P2O5 + 1000g K2O + 50 kg FYM per year applied in August-September after harvest.',
    pestsAndDiseases: 'Mango hopper, fruit fly (Bactrocera dorsalis), powdery mildew, anthracnose. Install methyl eugenol pheromone traps (6/acre); spray Hexaconazole for powdery mildew.',
    harvesting: 'Harvest at 80-85% maturity when fruit shoulders are rounded, tapka stage (1-2 tree-ripe fruits drop naturally). Harvest with 1 cm pedicel intact using mechanical pole harvesters.',
    postHarvestHandling: 'De-sapping (placing stem down on racks for 4 hours to drain sap), hot water treatment (48°C for 5 mins) to prevent fruit fly and anthracnose, pre-cool to 12°C, cold store at 10°C - 13°C.',
    yieldPerAcre: '40 - 60 Quintals/Acre (Mature orchard)',
    agronomicTip: 'Never break pedicels by hand. Mango latex sap burns fruit peel, causing black blemishes and rapid post-harvest bacterial decay.'
  },

  sweet_orange: {
    cropName: 'Sweet Orange / Mosambi (Nalgonda Battayi)',
    season: 'Ambe Bahar (Jan-Feb flowering, harvest Aug-Nov) / Hast Bahar (Oct-Nov flowering, harvest Mar-May)',
    sowingMonths: 'Planting: July - August',
    durationDays: 'Perennial tree crop (Bearing starts 4th year, peak at 8-15 years)',
    soil: 'Well-drained light loamy or alluvial soil. Deep water table (>2m) free from high lime/calcium carbonate. pH: 6.5 - 7.5.',
    climate: 'Subtropical dry climate, 20°C - 35°C. Low humidity during ripening promotes high TSS (sweetness) and juice recovery.',
    seedRate: 'Budded plants: 110 plants/acre (6m × 6m spacing).',
    spacing: '6 meters × 6 meters square system.',
    nurseryPrep: 'Use T-budded plants on Rangpur lime rootstock for drought and Phytophthora resistance.',
    irrigation: 'Drip irrigation essential. Critical water stages: Flowering to fruit set and rapid fruit expansion. Avoid standing water near trunk.',
    fertilizer: 'Adult tree: 600g N, 200g P, 400g K + 25 kg FYM + micronutrient spray (Zinc 0.5% + Ferrous 0.5% + Boron 0.2%) in 2 splits (June & Jan).',
    pestsAndDiseases: 'Citrus psylla (greening vector), leaf miner, Phytophthora gummosis. Paint tree trunk with Bordeaux paste (1:1:10) up to 1 meter twice a year.',
    harvesting: 'Harvest when skin color changes from dark green to light green or yellow break stage with TSS ≥ 10° Brix.',
    postHarvestHandling: 'Clip with citrus shears, wash, fungicide wax dip, pack in ventilated corrugated boxes, and cold store at 5°C - 7°C with 85-90% RH.',
    yieldPerAcre: '50 - 70 Quintals/Acre (12-15 tonnes/ha)',
    agronomicTip: 'Water stress of 30-40 days before Bahar treatment triggers uniform and profuse flower flush across the canopy.'
  },

  soybean: {
    cropName: 'Soybean (JS 335 / NRC 37)',
    season: 'Kharif (June - July with monsoon onset)',
    sowingMonths: 'June - July',
    durationDays: '90 - 100 days',
    soil: 'Well-drained deep black cotton soil or clay-loam soil with good organic content. pH: 6.5 - 7.5.',
    climate: 'Warm and moist climate, 22°C - 30°C. Susceptible to waterlogging during germination and pod filling.',
    seedRate: '25 - 30 kg/acre (germination percentage must be ≥ 70%).',
    spacing: '45 cm row-to-row × 5-7 cm plant-to-plant.',
    nurseryPrep: 'Direct field sowing. Inoculate with Bradyrhizobium japonicum and PSB culture (5g/kg seed).',
    irrigation: 'Usually rainfed in Kharif; 1 protective irrigation during pod development in case of monsoon dry spells.',
    fertilizer: 'NPK: 12:24:16 kg/acre + 8 kg Sulphur/acre (Sulphur increases oil and protein content).',
    pestsAndDiseases: 'Girdle beetle, semilooper, and yellow mosaic virus. Spray Thiamethoxam for whiteflies; Chlorantraniliprole for defoliators.',
    harvesting: 'Harvest when 90% leaves turn yellow and drop off, and pods turn greyish-brown with rattling sound.',
    postHarvestHandling: 'Thresh at optimal drum speed (350-400 rpm) to prevent seed coat cracking. Dry seeds to 9-10% moisture before cold storage.',
    yieldPerAcre: '8 - 12 Quintals/Acre',
    agronomicTip: 'Handle soybean seeds gently during harvesting and bagging; seed embryo is delicate and rough handling destroys germination vigor.'
  },

  groundnut: {
    cropName: 'Groundnut / Peanut (TAG 24 / K6 / Kadiri 9)',
    season: 'Kharif (June - July) & Rabi (October - November)',
    sowingMonths: 'June - July / Oct - Nov',
    durationDays: '105 - 115 days',
    soil: 'Well-drained light sandy-loam or red sandy soil with loose texture for easy pod penetration (pegging). pH: 6.0 - 7.0.',
    climate: 'Warm climate, 24°C - 32°C. Requires dry warm sunny days during harvesting and pod curing.',
    seedRate: '40 - 50 kg kernels/acre for Spanish bunch varieties.',
    spacing: '30 cm row-to-row × 10 cm plant-to-plant.',
    nurseryPrep: 'Treat sound kernels with Trichoderma viride (4g/kg) and Imidacloprid (2ml/kg) to protect against collar rot and white grubs.',
    irrigation: 'Critical stages: Flowering (25-30 DAS), pegging (40-45 DAS), and pod development (65-75 DAS). Total 4-6 irrigations.',
    fertilizer: 'NPK: 8:16:16 kg/acre + Gypsum @ 200 kg/acre at 40-45 DAS (pegging stage). Calcium is critical for pod filling and avoiding blind pods.',
    pestsAndDiseases: 'Tikka leaf spot, Spodoptera, and collar rot. Spray Mancozeb + Carbendazim (Saaf @ 2g/L) for Tikka leaf spot.',
    harvesting: 'Harvest when inside shell turns dark blackish-brown and kernels show true seed coat color with oil content.',
    postHarvestHandling: 'Strip pods, sun-dry pods continuously for 5-7 days until kernel moisture reaches ≤7-8%. Cold store pods at 5°C - 8°C with 60% RH to prevent Aflatoxin.',
    yieldPerAcre: '10 - 14 Quintals/Acre (Rabi irrigated)',
    agronomicTip: 'Gypsum application at pegging stage supplies calcium directly to developing pods, eliminating "pop" (empty) pods and increasing pod density.'
  }
};

// Generic Intelligent Fallback Cultivation Guide Generator for remaining crops
export function getCultivationGuide(crop) {
  if (!crop) return null;

  // Direct specific match
  if (CROP_CULTIVATION_GUIDES[crop.id]) {
    return CROP_CULTIVATION_GUIDES[crop.id];
  }

  // Fallback based on agronomic category
  const cat = crop.category || '';
  const name = crop.name || 'Crop';
  const districts = crop.growingDistricts || 'Telangana Agricultural Zones';

  if (cat.includes('Vegetable')) {
    return {
      cropName: name,
      season: 'Kharif (June - July) & Rabi (October - November)',
      sowingMonths: 'June - July / Oct - Nov',
      durationDays: '75 - 110 days',
      soil: 'Deep, fertile, well-drained sandy-loam or loamy soil rich in organic matter. pH range: 6.0 - 7.5.',
      climate: 'Moderate temperature range 18°C - 30°C. Protect from heavy monsoon waterlogging and excessive heat.',
      seedRate: '150 - 300g/acre for hybrids or 1.5 - 2 kg/acre for direct sown vegetables.',
      spacing: '45 - 60 cm between rows × 30 - 45 cm between plants on raised beds.',
      nurseryPrep: 'Raise seedlings in pro-trays under 50% shade net or raised nursery beds. Transplant after 25-30 days.',
      irrigation: 'Drip irrigation with 2-3 day intervals. Critical stages: Flowering, fruit setting, and enlargement.',
      fertilizer: 'NPK: 40:30:30 kg/acre + 8 tonnes FYM. Apply 50% N and full P, K as basal; balance N in 2 top dressings.',
      pestsAndDiseases: 'Sucking pests (thrips, aphids, whiteflies) and damping off / fungal blight. Use yellow sticky traps and spray Neem oil (5ml/L).',
      harvesting: 'Harvest in the early morning or evening at proper market maturity stage (firm, uniform color, crisp texture).',
      postHarvestHandling: 'Sort, wash, remove field heat (pre-cool to 10°C - 12°C within 4 hours), pack in ventilated crates, and transfer to cold chamber.',
      yieldPerAcre: '60 - 150 Quintals/Acre (Depending on crop variety)',
      agronomicTip: 'Harvesting in early morning prevents rapid moisture transpiration and preserves crispness in cold storage.'
    };
  }

  if (cat.includes('Fruit')) {
    return {
      cropName: name,
      season: 'Planting during monsoon (July - September); Flowering according to Bahar cycle',
      sowingMonths: 'July - September',
      durationDays: 'Perennial orchard crop (Economic harvest from year 3 to 25)',
      soil: 'Deep, well-drained loamy, alluvial, or red gravelly soil with depth >1.5m. Water table must be below 2 meters. pH: 6.5 - 7.5.',
      climate: 'Subtropical to tropical climate, 22°C - 35°C. Ample sunlight required for fruit coloration and sugar accumulation (Brix).',
      seedRate: 'Grafts/Layers: 100 - 200 saplings/acre depending on tree canopy spacing.',
      spacing: '5m × 5m or 6m × 6m square planting system with drip fertigation lines.',
      nurseryPrep: 'Procure certified disease-free grafted saplings from government-accredited horticulture nurseries.',
      irrigation: 'Drip irrigation at 20-30 liters/tree/day during fruit swelling; taper off water 10-14 days before harvest.',
      fertilizer: 'Balanced organic manure (25-50 kg FYM/tree/year) + NPK 500:250:500 g/tree/year in split doses after annual pruning.',
      pestsAndDiseases: 'Fruit flies, mealybugs, powdery mildew, and anthracnose. Install pheromone traps and bag individual fruits if viable.',
      harvesting: 'Clip fruits with intact stalks at physiological maturity (color break stage). Never shake branches or drop fruits.',
      postHarvestHandling: 'Grade by size and weight, hot water or fungicide dip, shade cool, pack in foam-net lined CFB boxes, and cold store at calibrated temperature.',
      yieldPerAcre: '40 - 80 Quintals/Acre (Mature commercial orchard)',
      agronomicTip: 'Pre-cooling immediately after harvest removes respiration field heat, tripling storage shelf life in cold chambers.'
    };
  }

  if (cat.includes('Pulse') || cat.includes('Legume')) {
    return {
      cropName: name,
      season: 'Kharif (June - July) or Rabi (October - November)',
      sowingMonths: 'June - July / Oct - Nov',
      durationDays: '90 - 130 days',
      soil: 'Well-drained red loamy or medium black cotton soil. Sensitive to water stagnation. pH: 6.5 - 7.5.',
      climate: 'Warm weather crop, 20°C - 32°C. Requires dry sunny weather during pod maturity and harvesting.',
      seedRate: '6 - 12 kg/acre depending on grain size.',
      spacing: '30 - 45 cm between rows × 10 cm between plants.',
      nurseryPrep: 'Direct field sowing. Treat seed with Rhizobium leguminosarum and Trichoderma (4g/kg seed).',
      irrigation: 'Predominantly rainfed; 1-2 irrigations at flower initiation and pod filling stage.',
      fertilizer: 'NPK: 10:20:10 kg/acre basal + 2% DAP foliar spray at peak flowering.',
      pestsAndDiseases: 'Pod borers (Helicoverpa) and Fusarium wilt. Install pheromone traps (5/acre); spray Chlorantraniliprole at flowering.',
      harvesting: 'Harvest when 80-85% pods dry up and turn brown. Cut plants near ground level.',
      postHarvestHandling: 'Sun dry bundles for 3-4 days, thresh mechanically, winnow, and dry grains to 9-10% moisture before cold storage.',
      yieldPerAcre: '6 - 10 Quintals/Acre',
      agronomicTip: 'Legume root nodules fix atmospheric nitrogen naturally, reducing chemical fertilizer cost for subsequent crops.'
    };
  }

  if (cat.includes('Spice') || cat.includes('Commercial')) {
    return {
      cropName: name,
      season: 'Kharif / Rabi planting (June - August or October - November)',
      sowingMonths: 'June - August / Oct - Nov',
      durationDays: '120 - 180 days',
      soil: 'Deep, rich, well-drained loamy or black soil with good humus content. pH: 6.5 - 7.5.',
      climate: 'Warm and humid growing phase (20°C - 32°C), followed by dry, clear sunshine for spice curing.',
      seedRate: '2 - 8 kg/acre (or rhizome sets: 6-8 Qtl/acre).',
      spacing: '30 - 45 cm row spacing × 15 - 20 cm plant spacing.',
      nurseryPrep: 'Select high-quality certified seed or mother rhizomes. Treat with bio-fungicide (Trichoderma) before planting.',
      irrigation: 'Light regular irrigations. Drip irrigation is highly recommended to prevent soil-borne rhizome and root rot.',
      fertilizer: 'NPK: 40:25:30 kg/acre + 6 tonnes FYM + micronutrient blend (Zinc, Boron).',
      pestsAndDiseases: 'Thrips, mites, root rot, and leaf spot. Spray bio-pesticides or copper oxychloride for fungal blights.',
      harvesting: 'Harvest when pods/rhizomes/capsules reach full maturity and characteristic aroma is developed.',
      postHarvestHandling: 'Cure, shade-dry, clean, and grade properly. Store in humidity-controlled cold chambers (50-60% RH) to preserve essential oils and aroma.',
      yieldPerAcre: '15 - 25 Quintals/Acre',
      agronomicTip: 'Controlled atmosphere cold storage prevents color fading and volatile oil loss in high-value commercial spices.'
    };
  }

  if (cat.includes('Oilseed')) {
    return {
      cropName: name,
      season: 'Kharif (June - July) & Rabi (October - November)',
      sowingMonths: 'June - July / Oct - Nov',
      durationDays: '95 - 125 days',
      soil: 'Well-drained sandy-loam or medium black soil. Adequate soil sulphur is necessary for high oil yield. pH: 6.2 - 7.5.',
      climate: 'Warm climate, 22°C - 32°C. Dry weather required during flowering and harvesting.',
      seedRate: '3 - 8 kg/acre (or 40-50 kg/acre for in-shell groundnut).',
      spacing: '30 - 45 cm between rows × 10 - 15 cm between plants.',
      nurseryPrep: 'Direct field sowing into finely prepared seedbed with 4 tonnes FYM/acre.',
      irrigation: 'Critical stages: Flowering, pegging/pod formation, and seed development. 3-4 irrigations.',
      fertilizer: 'NPK: 16:32:16 kg/acre + 10 kg Sulphur/acre (Sulphur increases oil percentage by up to 3%).',
      pestsAndDiseases: 'Sucking pests, caterpillars, and leaf spots. Spray Neem oil (5ml/L) and Carbendazim for leaf spots.',
      harvesting: 'Harvest when pods/heads turn brown and seeds mature with low moisture content.',
      postHarvestHandling: 'Thresh, clean, and dry seeds to ≤8% moisture to prevent mold and rancidity in cold storage.',
      yieldPerAcre: '8 - 14 Quintals/Acre',
      agronomicTip: 'Maintain grain moisture below 8% before bagging to prevent rancidity and fungal toxins (aflatoxin).'
    };
  }

  if (cat.includes('Seed')) {
    return {
      cropName: name,
      season: 'Rabi / Kharif synchronized foundation and hybrid seed production',
      sowingMonths: 'June - July / Nov - Dec',
      durationDays: '110 - 135 days',
      soil: 'High fertility, level, uniform field with dedicated isolation distance from other varieties. pH: 6.5 - 7.5.',
      climate: 'Favorable temperature, low disease incidence, sunny weather during pollination and seed set.',
      seedRate: '4 - 6 kg/acre (Female lines) + 1.5 kg/acre (Male lines).',
      spacing: 'Staggered planting of parental lines for synchronized nicking (flowering).',
      nurseryPrep: 'Maintain mandatory isolation distance (minimum 200 - 400 meters) to avoid cross-pollination.',
      irrigation: 'Controlled precision irrigation. Do not stress crops during pollination.',
      fertilizer: 'NPK: 48:24:24 kg/acre. Enhanced phosphorus and potassium for robust seed coat development.',
      pestsAndDiseases: 'Zero tolerance for seed-borne pathogens. Spray systemic fungicides and inspect weekly.',
      harvesting: 'Rogue out off-types before harvest. Harvest only genetically pure seed plants.',
      postHarvestHandling: 'Seed conditioning, air-screen cleaning, moisture reduction to ≤10%, polymer seed coating, cold store in hermetic bags.',
      yieldPerAcre: '10 - 18 Quintals/Acre of certified seed',
      agronomicTip: 'Seed quality and germination viability drop exponentially above 18°C; precision cold storage at 10°C - 12°C guarantees >90% germination after 18 months.'
    };
  }

  // Default Universal Agronomic Guide for any other crop
  return {
    cropName: name,
    season: 'Kharif (June - July) & Rabi (October - November)',
    sowingMonths: 'June - July / Oct - Nov',
    durationDays: '90 - 120 days',
    soil: 'Well-drained fertile loamy soil rich in organic matter. Optimal pH range: 6.0 - 7.5.',
    climate: 'Adaptable to Telangana tropical climate with temperatures 20°C - 32°C and moderate rainfall.',
    seedRate: 'Standard recommended certified seed rate per acre as per PJTSAU university guidelines.',
    spacing: '30 - 60 cm between rows × 15 - 30 cm between plants.',
    nurseryPrep: 'Deep summer plowing, fine tilth preparation, and basal FYM incorporation.',
    irrigation: 'Irrigate at critical growth, flowering, and maturity stages. Avoid water stagnation.',
    fertilizer: 'NPK: 30:20:20 kg/acre + 5 tonnes FYM/acre. Soil test based nutrient management.',
    pestsAndDiseases: 'Integrated Pest Management (IPM): Bird perches, pheromone traps, and bio-pesticides.',
    harvesting: 'Harvest at physiological maturity during dry sunny weather to preserve post-harvest quality.',
    postHarvestHandling: 'Clean, grade, and pre-cool before loading into calibrated Krishivalaya cold storage chambers.',
    yieldPerAcre: '15 - 25 Quintals/Acre',
    agronomicTip: 'Soil test based application of organic manure and bio-fertilizers cuts input costs by 20% while maintaining soil health.'
  };
}
