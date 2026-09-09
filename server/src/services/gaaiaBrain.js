// GAAIA - Green Agricultural Artificial Intelligence Assistant
// Domain Knowledge Base & Query Resolver for Krishivalaya

export const GAAIA_TOPICS = [
  {
    id: 'cold_storage',
    title: '❄️ Cold Storage & Climate Control',
    icon: 'Snowflake',
    description: 'Chamber temperatures, humidity, shelf-life & multi-commodity storage guidelines.'
  },
  {
    id: 'enwr_loans',
    title: '📄 e-NWR Warehouse Receipts & Loans',
    icon: 'FileText',
    description: 'Pledging WDRA electronic receipts for instant 75% bank loans without distress sale.'
  },
  {
    id: 'transport_rental',
    title: '🚜 Farm Transport & 20% Subsidy',
    icon: 'Truck',
    description: 'Tractor trolleys, mini pickups & reefer vans with Rythu Bandhu subvention.'
  },
  {
    id: 'payment_advance',
    title: '💳 Payment Gateway & Tariffs',
    icon: 'CreditCard',
    description: '25% advance booking, UPI/QR, Kisan Credit Card (KCC), NetBanking & gate cash.'
  },
  {
    id: 'queue_tokens',
    title: '⏰ Gate Queue Tokens & Unloading',
    icon: 'Clock',
    description: 'Live token tracking (e.g. TK-108), weighbridge entry & quality inspection docks.'
  },
  {
    id: 'mandi_prices',
    title: '📈 Mandi Rates & Storage Profitability',
    icon: 'TrendingUp',
    description: 'APMC mandi arrivals, price realization, and when to store vs when to sell.'
  },
  {
    id: 'schemes_subsidies',
    title: '🏛️ Government Schemes & Subsidies',
    icon: 'Landmark',
    description: 'PM-KISAN, Rythu Bandhu, MIDH 35-50% cold chain grants & KCC 3% interest rebate.'
  },
  {
    id: 'pest_crop_health',
    title: '🌱 Pest Management & Crop Preservation',
    icon: 'ShieldAlert',
    description: 'Controlling thrips, rhizome rot, purple blotch & post-harvest ethylene damage.'
  }
];

export const POPULAR_QUESTIONS = [
  {
    q: 'What is the optimal temperature and humidity to store Red Chillies?',
    topic: 'cold_storage',
    lang: 'en'
  },
  {
    q: 'How do I pledge an e-NWR receipt to get a 75% bank loan?',
    topic: 'enwr_loans',
    lang: 'en'
  },
  {
    q: 'How to book a tractor trolley with the 20% Rythu Bandhu subsidy?',
    topic: 'transport_rental',
    lang: 'en'
  },
  {
    q: 'Can I pay only 25% advance to reserve cold storage space?',
    topic: 'payment_advance',
    lang: 'en'
  },
  {
    q: 'ఎర్ర మిరపకాయలను కోల్డ్ స్టోరేజీలో ఎలా భద్రపరచాలి?',
    topic: 'cold_storage',
    lang: 'te'
  },
  {
    q: 'e-NWR రసీదుతో బ్యాంకులో 75% రుణం ఎలా పొందాలి?',
    topic: 'enwr_loans',
    lang: 'te'
  },
  {
    q: 'कोल्ड स्टोरेज के लिए 25% एडवांस पेमेंट कैसे करें?',
    topic: 'payment_advance',
    lang: 'hi'
  },
  {
    q: 'How do I track my active live queue token at the warehouse gate?',
    topic: 'queue_tokens',
    lang: 'en'
  }
];

export const KNOWLEDGE_BASE = [
  // 1. Red Chilli
  {
    patterns: ['chilli', 'mirchi', 'red chilli', 'chilli temp', 'మిరప', 'మిర్చి', 'मिर्च'],
    topic: 'cold_storage',
    title: 'Red Chilli Storage Parameters',
    answer: {
      en: `🌶️ **Red Chilli (Guntur / Warangal Teja) Cold Storage Guidelines:**

• **Temperature Range:** **0°C to 2°C** (Ideal: 1°C).
• **Relative Humidity (RH):** **65% to 70%** (Low humidity prevents moisture absorption and mold).
• **Storage Duration:** **8 to 10 months** without color loss.
• **Capsaicin & Color Retention:** Storing at 0–2°C preserves ASTA color value (above 100) and pungent capsaicin levels, fetching up to **30–40% premium** during off-season mandi sales.
• **Packaging:** Double-layered breathable gunny bags (40 kg each).
• **Pre-storage Check:** Ensure moisture content is below **10%** before loading into chambers.

👉 *You can book space right now in our Warangal Multi-Commodity Vault or Khammam Chilli Logistics Hub!*`,
      te: `🌶️ **ఎర్ర మిరపకాయల (గుంటూరు / వరంగల్ తేజ) కోల్డ్ స్టోరేజ్ మార్గదర్శకాలు:**

• **ఉష్ణోగ్రత:** **0°C నుండి 2°C** (అత్యుత్తమమైనది: 1°C).
• **తేమ శాతం (RH):** **65% నుండి 70%** (తక్కువ తేమ వల్ల బూజు పట్టదు).
• **నిల్వ కాలం:** రంగు తగ్గకుండా **8 నుండి 10 నెలలు**.
• **నాణ్యత & ధర:** ఈ ఉష్ణోగ్రతలో నిల్వ చేస్తే రంగు (ASTA విలువ) మరియు ఘాటు అలాగే ఉండి, మార్కెట్లో క్వింటాలుకు **₹3,000 - ₹5,000 అదనపు ధర** లభిస్తుంది.
• **సంచులు:** 40 కిలోల జనపనార సంచులు, నిల్వకు ముందు తేమ **10% లోపు** ఉండాలి.`,
      hi: `🌶️ **लाल मिर्च (गुंटूर / वारंगल तेजा) कोल्ड स्टोरेज गाइड:**

• **तापमान:** **0°C से 2°C** (आदर्श: 1°C)।
• **आर्द्रता (RH):** **65% से 70%**।
• **भंडारण अवधि:** रंग और तीखापन सुरक्षित रखते हुए **8 से 10 महीने**।
• **अतिरिक्त लाभ:** ऑफ-सीजन में बेचने पर **30-40% अधिक मूल्य** मिलता है।`
    },
    actions: [
      { label: '❄️ View Chilli Storage Units', tab: 'units' },
      { label: '📅 Book Chilli Chamber', tab: 'booking' }
    ]
  },

  // 2. Turmeric
  {
    patterns: ['turmeric', 'pasupu', 'haldi', 'curcumin', 'పసుపు', 'हल्दी', 'nizamabad turmeric'],
    topic: 'cold_storage',
    title: 'Turmeric Storage Protocol',
    answer: {
      en: `🌿 **Turmeric (Nizamabad / Salem Bulb & Finger) Storage Parameters:**

• **Temperature Range:** **10°C to 12°C**.
• **Relative Humidity (RH):** **70% to 75%**.
• **Storage Duration:** **12 to 18 months**.
• **Curcumin Preservation:** Regulated atmosphere prevents curcumin breakdown and protects against cigarette beetle (*Lasioderma serricorne*) infestation.
• **Pre-treatment:** Ensure proper boiling and sun-drying to **9% moisture** before fumigation and storage.

👉 *Recommended facility:* **Nizamabad Turmeric & Agri-Logistics Terminal (Unit TZ-01)**.`,
      te: `🌿 **పసుపు (నిజామాబాద్ కొమ్ము & దుంప) నిల్వ వివరాలు:**

• **ఉష్ణోగ్రత:** **10°C నుండి 12°C**.
• **తేమ శాతం (RH):** **70% నుండి 75%**.
• **నిల్వ కాలం:** **12 నుండి 18 నెలలు**.
• **కర్క్యుమిన్ రక్షణ:** ఈ వాతావరణంలో పురుగు (లసియోడెర్మా) పట్టదు, కర్క్యుమిన్ శాతం తగ్గదు.
• **తేమ:** నిల్వ చేయడానికి ముందు పసుపులో తేమ **9% కంటే తక్కువ** ఉండాలి.`,
      hi: `🌿 **हल्दी (निज़ामाबाद / सेलम) कोल्ड स्टोरेज गाइड:**

• **तापमान:** **10°C से 12°C**।
• **आर्द्रता (RH):** **70% से 75%**।
• **भंडारण समय:** **12 से 18 महीने**।`
    },
    actions: [
      { label: '🏬 View Nizamabad Terminal', tab: 'units' },
      { label: '📅 Book Turmeric Chamber', tab: 'booking' }
    ]
  },

  // 3. Onion & Garlic
  {
    patterns: ['onion', 'garlic', 'ullipaya', 'pyaz', 'ఉల్లి', 'ఉల్లిపాయ', 'प्याज', 'लहसुन'],
    topic: 'cold_storage',
    title: 'Onion & Garlic Dehumidified Storage',
    answer: {
      en: `🧅 **Onion & Garlic Cold Storage Parameters:**

• **Temperature Range:** **0°C to 2°C** (Strictly avoid 5°C to 15°C to prevent rooting and sprouting!).
• **Relative Humidity (RH):** **65% to 70%** in active **Dehumidified Vaults**. High humidity causes immediate black mold (*Aspergillus niger*).
• **Storage Duration:** **6 to 8 months** (Rabi crop stores best).
• **Ventilation:** High airflow rate (25-30 CFM/ton) to dissipate natural heat and moisture.

👉 *Recommended Facility:* **Medak Dehumidified Onion & Shallot Vault (Unit TZ-04)**.`,
      te: `🧅 **ఉల్లిపాయలు & వెల్లుల్లి నిల్వ పద్ధతి:**

• **ఉష్ణోగ్రత:** **0°C నుండి 2°C** (5°C నుండి 15°C ఉంటే మొలకలు వస్తాయి, కాబట్టి 0°C వద్దే ఉంచాలి).
• **తేమ (RH):** **65% నుండి 70%** (డీహ్యూమిడిఫైడ్ ఛాంబర్లలో బూజు పట్టకుండా ఉంటుంది).
• **నిల్వ కాలం:** **6 నుండి 8 నెలలు** (రబీ ఉల్లి ఎక్కువ కాలం నిల్వ ఉంటుంది).`,
      hi: `🧅 **प्याज और लहसुन भंडारण:**

• **तापमान:** **0°C से 2°C** (अंकुरण रोकने के लिए)।
• **आर्द्रता (RH):** **65% से 70%** (डीह्यूमिडिफाइड चैंबर)।
• **भंडारण:** **6 से 8 महीने** तक सुरक्षित।`
    },
    actions: [
      { label: '🏬 Medak Onion Vault', tab: 'units' },
      { label: '📅 Book Onion Chamber', tab: 'booking' }
    ]
  },

  // 4. e-NWR & Warehouse Pledge Bank Loans
  {
    patterns: ['enwr', 'e-nwr', 'loan', 'pledge', 'bank loan', 'receipt', 'wdra', 'రసీదు', 'రుణం', 'లోన్', 'लोन', 'रसीद', 'ऋण'],
    topic: 'enwr_loans',
    title: 'e-NWR Electronic Warehouse Receipt & 75% Bank Loans',
    answer: {
      en: `📄 **How to Get a 75% Bank Loan on e-NWR (Without Selling Your Crops):**

1. **Deposit & Inspection:** When your crop is deposited in any WDRA-accredited Krishivalaya warehouse, our automated quality lab generates an official **electronic Negotiable Warehouse Receipt (e-NWR)**.
2. **Instant Loan Eligibility:**
   • Nationalized banks (SBI, Union Bank, Andhra Pragathi Grameena Bank, Telangana Grameena Bank, NABARD) grant **70% to 75%** of the commodity's current mandi value as an immediate pledge loan.
   • **Subsidized Agri Interest Rate:** Only **7% p.a.** (effectively **4%** with prompt 3% government interest subvention).
3. **No Distress Sale:** You don't have to sell your harvest during the post-harvest glut at low prices. Take the cash loan for family/farming needs, and sell months later when prices rise!
4. **Digital Release:** Once you settle the loan or sell via e-NAM, the bank releases the lien online instantly.

👉 *Generate your e-NWR document under the **Docx Request** tab!*`,
      te: `📄 **e-NWR రసీదుతో బ్యాంకులో 75% రుణం పొందే విధానం (పంట అమ్మకుండానే):**

1. **డిపాజిట్:** మీ పంటను వేర్‌హౌస్‌లో నిల్వ చేసిన వెంటనే ఆన్‌లైన్ **e-NWR (ఎలక్ట్రానిక్ రసీదు)** జారీ చేయబడుతుంది.
2. **75% తక్షణ రుణం:**
   • ఎస్బీఐ (SBI), గ్రామీణ బ్యాంకులు, నాబార్డ్ ద్వారా పంట మార్కెట్ విలువలో **70% నుండి 75% వరకు** రుణం పొందవచ్చు.
   • **రాయితీ వడ్డీ:** సంవత్సరానికి కేవలం **7%** మాత్రమే (సమయానికి చెల్లిస్తే 3% సబ్సిడీతో నికరంగా **4%** మాత్రమే).
3. **అగ్గువకు అమ్మాల్సిన పనిలేదు:** ధర తక్కువగా ఉన్నప్పుడు పంట అమ్మనక్కర్లేదు. మార్కెట్లో రేటు పెరిగే వరకు నిల్వ చేసి, అప్పుడు అమ్ముకోవచ్చు!`,
      hi: `📄 **e-NWR रसीद पर 75% बैंक लोन कैसे पाएं:**

1. फसल को कोल्ड स्टोरेज में जमा करने पर ऑनलाइन **e-NWR रसीद** मिलती है।
2. बैंक (SBI, PNB, ग्रामीण बैंक) फसल के मूल्य का **70% से 75% तक लोन** तुरंत स्वीकृत करते हैं।
3. ब्याज दर मात्र **7%** (सब्सिडी के बाद मात्र **4%**)।
4. फसल को कम दाम में बेचने की मजबूरी खत्म हो जाती है!`
    },
    actions: [
      { label: '📄 Open Docx / e-NWR Request', tab: 'documents' },
      { label: '👤 Check Farmer Profile', tab: 'profile' }
    ]
  },

  // 5. Transport Rental & 20% Subsidy
  {
    patterns: ['transport', 'rental', 'truck', 'tractor', 'vehicle', 'bolero', 'freight', 'reefer', 'రవాణా', 'ట్రాక్టర్', 'ట్రక్', 'కిరాయి', 'కిరాణా', 'किराया', 'गाड़ी', 'ट्रक'],
    topic: 'transport_rental',
    title: 'Farm Transport Fleet & 20% Subsidy Booking',
    answer: {
      en: `🚜 **Farm-to-Storage Transport Rental & 20% Rythu Bandhu Subsidy:**

• **Available Fleet:**
  1. **Agri Tractor Trolley (4.5 Tons):** ₹28/km | Ideal for farm tracks & village unpaved roads.
  2. **Bolero Maxi Truck / Tata Ace (2.2 Tons):** ₹32/km | Rapid transit for perishables.
  3. **Eicher Pro 6-Wheeler (7.5 Tons):** ₹42/km | Bulk mandi transfers.
  4. **Cold-Chain Reefer Van (5.0 Tons):** ₹52/km | Active 2°C–8°C cooling for tomatoes, fruits & dairy.
  5. **10-Wheeler Taurus (16 Tons):** ₹64/km | Commercial inter-district transit.
• **Rythu Bandhu 20% Freight Subsidy:**
  • Automatically calculated and deducted from the total fare for all verified farmers.
• **Electronic LR Waybill:**
  • Generates compliant Motor Vehicle Lorry Receipt (\`LR-TS-2026-XXXXX\`) linked directly with your gate arrival token!

👉 *Go to the **Transport Rental** tab to select your vehicle and calculate your subsidized route fare.*`,
      te: `🚜 **పొలం నుండి కోల్డ్ స్టోరేజ్‌కి రవాణా సౌకర్యం & 20% రైతు బంధు సబ్సిడీ:**

• **అందుబాటులో ఉన్న వాహనాలు:**
  1. **ట్రాక్టర్ ట్రాలీ (4.5 టన్నులు):** కి.మీ.కు ₹28 (పొలాల మట్టి రోడ్లకు అనుకూలం).
  2. **బొలెరో పిక్-అప్ / టాటా ఏస్ (2.2 టన్నులు):** కి.మీ.కు ₹32.
  3. **ఐషర్ 6-వీలర్ (7.5 టన్నులు):** కి.మీ.కు ₹42.
  4. **ఏసీ రీఫర్ వ్యాన్ (5 టన్నులు):** కి.మీ.కు ₹52 (పండ్లు, పాల ఉత్పత్తులకు 2°C చల్లదనం).
• **20% ప్రభుత్వ రాయితీ:** బిల్లులో ఆటోమేటిక్‌గా 20% రైతు బంధు రాయితీ తీసివేయబడుతుంది.
• **ఎలక్ట్రానిక్ LR బిల్లు:** గేట్ టోకెన్‌తో అనుసంధానించిన లారీ రశీదు వెంటనే వస్తుంది.`,
      hi: `🚜 **खेत से कोल्ड स्टोरेज ट्रांसपोर्ट व 20% सब्सिडी:**

• **उपलब्ध वाहन:** ट्रैक्टर ट्रॉली (₹28/किमी), बोलेरो पिकअप (₹32/किमी), आयशर 6-व्हीलर (₹42/किमी), रेफ़र वैन (₹52/किमी)।
• **20% सरकारी सब्सिडी:** सीधे किराए में छूट।
• **ऑनलाइन LR रसीद:** तुरंत जनरेट होती है।`
    },
    actions: [
      { label: '🚜 Book Transport Vehicle', tab: 'transport' },
      { label: '⏰ Check Gate Queue', tab: 'queue' }
    ]
  },

  // 6. Payment & Advance Options
  {
    patterns: ['payment', 'advance', 'pay', 'upi', 'kcc', 'tariff', 'charges', '25%', 'చెల్లింపు', 'ఫీజు', 'అడ్వాన్స్', 'డబ్బులు', 'పేమెంట్', 'पेमेंट', 'एडवांस', 'शुल्क'],
    topic: 'payment_advance',
    title: 'Chamber Booking Tariffs & Payment Modes',
    answer: {
      en: `💳 **Cold Storage Booking Payment & Tariffs:**

• **Flexible Payment Options:**
  1. **Pay 25% Advance Online:** Reserve your chamber slot immediately with only 25% advance. Settle the remaining 75% upon harvest unloading or final checkout!
  2. **Pay 100% Full Payment:** Complete clearance with zero hassle at checkout.
• **Supported Payment Modes:**
  • **UPI & Dynamic QR:** PhonePe, Google Pay, Paytm, BHIM.
  • **Kisan Credit Card (KCC) / RuPay Agri:** Zero transaction surcharge for certified cultivators.
  • **NetBanking:** Over 45 nationalized & cooperative banks.
  • **PACS / Rythu Bharosa Kendra Escrow:** Direct society ledger adjustment.
  • **Pay Cash at Gate:** Pay on spot after physical weighbridge verification.

👉 *Click **Payment Gateway** in the dashboard to check pending dues or complete your slot reservation.*`,
      te: `💳 **కోల్డ్ స్టోరేజ్ చెల్లింపు విధానాలు & చార్జీలు:**

• **చెల్లింపు సౌలభ్యాలు:**
  1. **25% అడ్వాన్స్ మాత్రమే చెల్లించండి:** మీ స్లాట్‌ను ఖరారు చేసుకోవడానికి 25% కడితే చాలు, మిగతా 75% సరుకు దించిన తర్వాత లేదా స్టోరేజ్ ముగింపులో కట్టవచ్చు.
  2. **100% పూర్తి చెల్లింపు:** ఒకేసారి పూర్తిగా చెల్లించవచ్చు.
• **చెల్లింపు మార్గాలు:**
  • **UPI / QR కోడ్:** ఫోన్‌పే, గూగుల్‌పే, పేటీఎం.
  • **కిసాన్ క్రెడిట్ కార్డ్ (KCC):** ఎటువంటి అదనపు ఛార్జీలు లేవు.
  • **గేట్ వద్ద నగదు:** సరుకు కాటా వేసిన తర్వాత గేట్ వద్ద నగదుగా చెల్లించవచ్చు.`,
      hi: `💳 **कोल्ड स्टोरेज किराया व भुगतान विकल्प:**

• **25% एडवांस बुकिंग:** मात्र 25% देकर चेंबर बुक करें, बाकी 75% डिलीवरी के समय दें।
• **भुगतान के साधन:** UPI (PhonePe, GPay), किसान क्रेडिट कार्ड (KCC), नेट बैंकिंग, गेट पर नकद।`
    },
    actions: [
      { label: '💳 Go to Payment Gateway', tab: 'payment' },
      { label: '📅 Book a Slot', tab: 'booking' }
    ]
  },

  // 7. Queue Tokens & Gate Entry
  {
    patterns: ['queue', 'token', 'gate', 'entry', 'weighbridge', 'dock', 'టోకెన్', 'గేట్', 'టోకెన్స్', 'క్యూ', 'కాటా', 'टोकन', 'गेट', 'कतार'],
    topic: 'queue_tokens',
    title: 'Live Gate Queue & Token Tracking',
    answer: {
      en: `⏰ **Real-Time Warehouse Gate Queue & Token Tracking:**

• **How Gate Tokens Work:**
  1. When your booking or transport is confirmed, you receive an automated token (e.g. **TK-108**).
  2. **Sequence Flow:**
     • **Stage 1 (Security Gate):** Token QR scan & RFID vehicle tag verify.
     • **Stage 2 (Electronic Weighbridge):** Gross vehicle weight measurement.
     • **Stage 3 (Quality Inspection Dock):** Moisture probe and grade sampling.
     • **Stage 4 (Unloading Bay):** Stacking into designated temperature-controlled chamber.
     • **Stage 5 (Tare Weight):** Empty vehicle weighment to calculate exact net crop weight.
• **Live ETA & Delay Avoidance:** Check current queue length in the dashboard so you never wait under the hot sun!

👉 *Visit the **Real-Time Queue** tab to see current waiting vehicles and your token status.*`,
      te: `⏰ **లైవ్ గేట్ క్యూ & టోకెన్ వివరాలు:**

• **టోకెన్ పనితీరు:**
  1. బుకింగ్ పూర్తవగానే మీకు గేట్ టోకెన్ (ఉదా: **TK-108**) వస్తుంది.
  2. **దశలు:** సెక్యూరిటీ చెక్ ➔ ఎలక్ట్రానిక్ కాటా (తూకం) ➔ నాణ్యతా తనిఖీ ➔ ఛాంబర్ అన్‌లోడింగ్ ➔ ఖాళీ వాహనం తూకం.
  3. వేచి ఉండే సమయం లైవ్‌గా కనిపిస్తుంది, ఎండలో ఆగాల్సిన అవసరం లేదు!`,
      hi: `⏰ **गेट टोकन व वजन प्रक्रिया:**

• बुकिंग के बाद **TK-108** जैसा टोकन मिलता है।
• गेट एंट्री ➔ इलेक्ट्रॉनिक वे-ब्रिज ➔ क्वालिटी चेक ➔ चेंबर लोडिंग।
• डैशबोर्ड पर लाइव वेटिंग टाइम देख सकते हैं।`
    },
    actions: [
      { label: '⏰ View Live Gate Queue', tab: 'queue' },
      { label: '🚜 Check Transport Status', tab: 'transport' }
    ]
  },

  // 8. Government Subsidies & Schemes
  {
    patterns: ['scheme', 'subsidy', 'pm kisan', 'rythu bandhu', 'midh', 'pmksy', 'సబ్సిడీ', 'పథకాలు', 'రైతు బంధు', 'రైతు భరోసా', 'सब्सिडी', 'योजना', 'सरकारी'],
    topic: 'schemes_subsidies',
    title: 'Government Agricultural Subsidies & Schemes',
    answer: {
      en: `🏛️ **Government Subsidies & Cold Storage Schemes for Farmers:**

1. **MIDH (Mission for Integrated Development of Horticulture):**
   • Capital subsidy of **35% to 50%** for constructing and modernizing farm-gate multi-commodity cold rooms and packhouses.
2. **PMKSY (Pradhan Mantri Kisan Sampada Yojana):**
   • Up to **50% grant-in-aid** for specialized cold chains, Reefer transport vehicles, and irradiation facilities.
3. **Rythu Bandhu / Rythu Bharosa:**
   • Annual financial assistance for land-holding farmers, plus **20% direct subvention on farm freight transit** through Krishivalaya.
4. **Interest Subvention Scheme on KCC:**
   • Standard 7% crop loan interest is reduced to **4% net** when repaid on schedule (3% central rebate).
5. **e-NWR Concession:**
   • Micro-warehouse storage charges are subsidized up to ₹1.5 per bag for small & marginal farmers.`,
      te: `🏛️ **రైతులకు ప్రభుత్వ సబ్సిడీలు & పథకాలు:**

1. **MIDH పథకం:** కోల్డ్ స్టోరేజ్, ప్యాక్ హౌస్ నిర్మాణానికి **35% నుండి 50% వరకు రాయితీ**.
2. **రైతు బంధు / రైతు భరోసా:** పెట్టుబడి సాయంతో పాటు, కృషివలయ ద్వారా వాహన రవాణాపై **20% రాయితీ**.
3. **కిసాన్ క్రెడిట్ కార్డ్ (KCC) వడ్డీ సబ్సిడీ:** సకాలంలో చెల్లిస్తే కేవలం **4% వడ్డీ** మాత్రమే.
4. **e-NWR రాయితీ:** చిన్న రైతులకు బస్తాకు ₹1.50 వరకు ప్రభుత్వం భరిస్తుంది.`,
      hi: `🏛️ **सरकारी कृषि योजनाएं व सब्सिडी:**

1. **MIDH योजना:** कोल्ड स्टोरेज निर्माण पर **35% से 50% सब्सिडी**।
2. **PMKSY योजना:** कोल्ड चेन व रेफ़र वैन पर **50% अनुदान**।
3. **KCC ब्याज छूट:** समय पर भुगतान करने पर ब्याज मात्र **4%**।`
    },
    actions: [
      { label: '📄 Apply for e-NWR Support', tab: 'documents' },
      { label: '👤 View Land & Subsidy Profile', tab: 'profile' }
    ]
  },

  // 9. Mandi Rates & Storage Profitability (Sell vs Store)
  {
    patterns: ['mandi', 'price', 'rate', 'msp', 'sell or store', 'profit', 'ధర', 'మార్కెట్', 'మండి', 'మద్దతు ధర', 'లాభం', 'మండీ', 'भाव', 'दाम', 'बिक्री'],
    topic: 'mandi_prices',
    title: 'Mandi Price Realization & Storage Economics',
    answer: {
      en: `📈 **Storage vs. Immediate Sale Economics (Mandi Intelligence):**

• **The Harvest Glut Trap:** During peak harvest season (Feb–April for Chilli, Jan–March for Turmeric), mandi arrivals spike, depressing spot prices by **25% to 45% below annual peak**.
• **Economics Example (Red Chilli):**
  • *Harvest Spot Price (March):* ₹14,500 / quintal.
  • *Cold Storage Cost for 6 Months:* ~₹650 / quintal.
  • *Off-Season Spot Price (August–October):* ₹21,500 to ₹23,000 / quintal.
  • **Net Profit Gain:** **+₹6,350 to +₹7,850 per quintal!**
• **Recommendation:** Check your local mandi prices under **Procurement Tracker** before taking crops to the yard. If prices are below MSP or historical averages, store for 4-6 months and pledge your e-NWR for cash!`,
      te: `📈 **పంటను ఇప్పుడే అమ్మాలా? లేక కోల్డ్ స్టోరేజీలో పెట్టాలా?:**

• **కోతల సమయంలో నష్టం:** పంట కోతల సమయంలో మార్కెట్లో సరుకు ఎక్కువై ధర **25% నుండి 40% వరకు పడిపోతుంది**.
• **మిర్చి ఉదాహరణ:**
  • *మార్చిలో ధర:* క్వింటాలు ₹14,500.
  • *6 నెలల కోల్డ్ స్టోరేజ్ ఖర్చు:* క్వింటాలుకు దాదాపు ₹650.
  • *ఆగస్టు/సెప్టెంబర్‌లో ఆఫ్-సీజన్ ధర:* ₹21,500 నుండి ₹23,000.
  • **నికర లాభం:** క్వింటాలుకు **₹6,300 కంటే ఎక్కువ అదనపు లాభం!**
• కాబట్టి ధర తక్కువగా ఉన్నప్పుడు e-NWR రసీదుతో లోన్ తీసుకుని, రేటు పెరిగాక అమ్మడం ఉత్తమం!`,
      hi: `📈 **फसल अभी बेचें या कोल्ड स्टोरेज में रखें?:**

• फसल कटाई के समय अधिक आवक से मंडियों में भाव 30-40% गिर जाता है।
• कोल्ड स्टोरेज में 6 महीने रखने का खर्च लगभग ₹650/क्विंटल आता है, जबकि ऑफ-सीजन में भाव ₹6,000 से ₹8,000 प्रति क्विंटल तक बढ़ जाता है।
• इसलिए e-NWR पर लोन लेकर सही समय पर बेचना अधिक लाभकारी है।`
    },
    actions: [
      { label: '📈 Check Mandi Tracker', tab: 'tracking' },
      { label: '❄️ Explore Storage Chambers', tab: 'units' }
    ]
  },

  // 10. Potato Storage
  {
    patterns: ['potato', 'aloo', 'potatoes', 'బంగాళాదుంప', 'ఆలూ', 'ఆలు', 'आलू'],
    topic: 'cold_storage',
    title: 'Potato Cold Storage & Sprout Suppression',
    answer: {
      en: `🥔 **Potato (Kufri Jyoti / Pukhraj / Chipsona) Storage Parameters:**

• **Temperature Range:**
  • Table Potatoes: **8°C to 10°C** (Storing below 8°C causes cold-induced sweetening / starch turning to sugar).
  • Seed Potatoes: **2°C to 4°C**.
  • Processing / Chipsona: **10°C to 12°C**.
• **Relative Humidity (RH):** **90% to 95%** (High RH prevents shrinkage and weight loss).
• **Sprout Management:** CIPC (Chlorpropham) fogging at 60-day intervals.
• **Storage Duration:** **8 to 10 months**.

👉 *Check available potato multi-chamber units in the Storage Units tab!*`,
      te: `🥔 **బంగాళాదుంప (ఆలూ) నిల్వ పద్ధతులు:**

• **ఉష్ణోగ్రత:**
  • కూర బంగాళాదుంపలు: **8°C నుండి 10°C** (8°C కంటే తక్కువ ఉంచితే తీపి వస్తుంది).
  • విత్తన బంగాళాదుంపలు: **2°C నుండి 4°C**.
  • **తేమ (RH):** **90% నుండి 95%** (బరువు తగ్గకుండా ఉండటానికి ఎక్కువ తేమ అవసరం).
  • **నిల్వ కాలం:** **8 నుండి 10 నెలలు**।`,
      hi: `🥔 **आलू कोल्ड स्टोरेज गाइड:**

• **तापमान:** खाने वाले आलू **8°C से 10°C**, बीज आलू **2°C से 4°C**।
• **आर्द्रता (RH):** **90% से 95%**।
• **अवधि:** **8 से 10 महीने**।`
    },
    actions: [
      { label: '🏬 View Storage Units', tab: 'units' },
      { label: '📅 Book Potato Space', tab: 'booking' }
    ]
  },

  // 11. General Greetings & Help
  {
    patterns: ['hello', 'hi', 'hey', 'gaaia', 'who are you', 'help', 'bot', 'నమస్కారం', 'హలో', 'నమస్తే', 'ఎవరు', 'नमस्ते', 'प्रणाम', 'कौन हो'],
    topic: 'general',
    title: 'Greetings from Gaaia AI',
    answer: {
      en: `🌱 **Namaste! I am Gaaia (గాయియా / गाइया), your 24x7 Agricultural AI Companion.**

I'm here to assist you with:
1. ❄️ **Cold Storage Climate Controls:** Ideal temp & humidity for 77+ commodities (Chillies, Turmeric, Onions, Potatoes, Mangoes).
2. 📅 **Chamber Booking:** Checking space, calculating tariffs & 25% advance booking.
3. 📄 **e-NWR Bank Loans:** Pledging electronic warehouse receipts for 75% low-interest loans.
4. 🚜 **Transport Rental:** Booking farm pickup with 20% Rythu Bandhu freight subsidy.
5. ⏰ **Live Queue:** Tracking gate token sequence & weighbridge status.
6. 📈 **Mandi Intelligence:** When to store vs when to sell for peak profit.

*What question can I answer for you today? You can type below or tap the microphone to speak!*`,
      te: `🌱 **నమస్కారం! నేను గాయియా (GAAIA) - మీ 24x7 రైతు AI సహాయకుడిని.**

నేను మీకు ఈ విషయాలలో సాయపడగలను:
1. ❄️ **కోల్డ్ స్టోరేజ్ ఉష్ణోగ్రతలు:** మిర్చి, పసుపు, ఉల్లి, ఆలు మొదలైన పంటల నిల్వ పద్ధతులు.
2. 📅 **ఛాంబర్ బుకింగ్:** 25% అడ్వాన్స్‌తో స్పేస్ రిజర్వ్ చేయడం.
3. 📄 **e-NWR బ్యాంకు రుణాలు:** పంట అమ్మకుండా 75% తక్కువ వడ్డీ రుణం పొందడం.
4. 🚜 **రవాణా వాహనాల అద్దె:** 20% ప్రభుత్వ రాయితీతో ట్రాక్టర్, ట్రక్కులు బుక్ చేయడం.
5. ⏰ **లైవ్ గేట్ టోకెన్:** కాటా & తనిఖీ క్యూ స్టేటస్.

*మీకు ఏ విషయం గురించి సమాచారం కావాలి? క్రింద టైప్ చేయండి లేదా మైక్ నొక్కి మాట్లాడండి!*`,
      hi: `🌱 **नमस्ते! मैं गाइया (GAAIA) हूँ - आपका 24x7 किसान AI साथी।**

मैं आपकी सहायता कर सकता हूँ:
1. ❄️ **कोल्ड स्टोरेज तापमान व आर्द्रता** (मिर्च, हल्दी, प्याज, आलू, आम)।
2. 📅 **चेंबर बुकिंग** (मात्र 25% एडवांस में)।
3. 📄 **e-NWR रसीद पर 75% बैंक लोन**।
4. 🚜 **20% सरकारी सब्सिडी के साथ ट्रांसपोर्ट बुकिंग**।
5. ⏰ **लाइव गेट टोकन व वजन ट्रैकिंग**।

*आप क्या जानना चाहते हैं? नीचे लिखें या माइक से बोलें!*`
    },
    actions: [
      { label: '❄️ Cold Storage Guidelines', tab: 'crops' },
      { label: '📅 Book Storage Slot', tab: 'booking' },
      { label: '🚜 Rent Farm Transport', tab: 'transport' }
    ]
  }
];

const DEFAULT_RESPONSE = {
  en: `🌱 **Hello! I am Gaaia, your Agri AI Assistant.**

Regarding your inquiry: Our digital warehouse portal connects you with 12 government-accredited cold storage terminals across Telangana and Andhra Pradesh, verified transport fleets, and WDRA e-NWR financing.

Here are quick actions you can take right now:
• **Crops Catalog:** Review recommended storage temperatures and preservation limits for 77 produce items.
• **Chamber Booking:** Check real-time room capacity and reserve with 25% advance.
• **Transport Fleet:** Book tractor trolleys or reefer vans with 20% freight subsidy.
• **e-NWR Loans:** Pledge warehouse receipts for 75% bank loans at 4-7% interest.
• **Kisan Helpline:** Call **1800-180-1551** toll-free for personalized telephone assistance.

*Try asking me: "What temperature for Red Chilli?", "How do e-NWR loans work?", or "How to book transport?"*`,
  te: `🌱 **నమస్కారం! నేను గాయియా - మీ రైతు AI సహాయకుడిని.**

కృషివలయ పోర్టల్ ద్వారా మీరు:
• 77 పంటల కోల్డ్ స్టోరేజ్ ఉష్ణోగ్రతలు తెలుసుకోవచ్చు.
• 25% అడ్వాన్స్‌తో కోల్డ్ రూమ్ బుక్ చేసుకోవచ్చు.
• 20% ప్రభుత్వ రాయితీతో రవాణా వాహనాలు బుక్ చేసుకోవచ్చు.
• e-NWR రసీదుతో బ్యాంకులో 75% రుణం పొందవచ్చు.
• ఉచిత కిసాన్ కాల్ సెంటర్: **1800-180-1551**.

*నన్ను అడగండి: "మిరపకాయల నిల్వ ఉష్ణోగ్రత ఎంత?", "e-NWR లోన్ ఎలా వస్తుంది?", లేదా "ట్రాక్టర్ ఎలా బుక్ చేయాలి?"*`,
  hi: `🌱 **नमस्ते! मैं गाइया हूँ - आपका कृषि AI साथी।**

कृषिवलय पोर्टल के माध्यम से आप:
• 77 फसलों के लिए उपयुक्त कोल्ड स्टोरेज तापमान जान सकते हैं।
• 25% एडवांस देकर चेंबर बुक कर सकते हैं।
• 20% सब्सिडी के साथ वाहन किराए पर ले सकते हैं।
• e-NWR रसीद पर 75% बैंक लोन प्राप्त कर सकते हैं।
• किसान टोल-फ्री हेल्पलाइन: **1800-180-1551**।`
};

export function resolveGaaiaQuery(query = '', lang = 'en', context = {}) {
  const clean = (query || '').trim().toLowerCase();

  let detectedLang = lang || 'en';
  if (/[\u0C00-\u0C7F]/.test(clean)) {
    detectedLang = 'te';
  } else if (/[\u0900-\u097F]/.test(clean)) {
    detectedLang = 'hi';
  }

  if (!clean) {
    return {
      answer: DEFAULT_RESPONSE[detectedLang] || DEFAULT_RESPONSE.en,
      topic: 'general',
      title: 'Gaaia AI Assistant',
      actions: [
        { label: '❄️ Crops Catalog', tab: 'crops' },
        { label: '📅 Book Slot', tab: 'booking' }
      ],
      suggestedQuestions: POPULAR_QUESTIONS.slice(0, 4).map(p => p.q)
    };
  }

  let matchedEntry = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const pattern of entry.patterns) {
      if (clean.includes(pattern)) {
        score += pattern.length;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      matchedEntry = entry;
    }
  }

  if (matchedEntry && highestScore > 0) {
    const localizedAnswer = matchedEntry.answer[detectedLang] || matchedEntry.answer.en;
    return {
      answer: localizedAnswer,
      topic: matchedEntry.topic,
      title: matchedEntry.title,
      actions: matchedEntry.actions || [],
      confidence: Math.min(1, 0.7 + (highestScore / 20)),
      suggestedQuestions: POPULAR_QUESTIONS.filter(p => p.topic !== matchedEntry.topic).slice(0, 3).map(p => p.q)
    };
  }

  return {
    answer: DEFAULT_RESPONSE[detectedLang] || DEFAULT_RESPONSE.en,
    topic: 'general',
    title: 'Gaaia Agricultural Advisor',
    actions: [
      { label: '❄️ Browse 77 Crops', tab: 'crops' },
      { label: '🏬 View Storage Units', tab: 'units' },
      { label: '🚜 Book Transport', tab: 'transport' }
    ],
    confidence: 0.5,
    suggestedQuestions: POPULAR_QUESTIONS.slice(0, 4).map(p => p.q)
  };
}
