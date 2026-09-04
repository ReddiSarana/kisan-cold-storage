import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const DEMO_USERS = {
  farmer: {
    role: 'farmer',
    name: 'Mallaiah Goud',
    phone: '+91 98765 12345',
    email: 'mallaiah.goud@telangana.agri.in',
    district: 'Warangal',
    mandal: 'Narsampet',
    village: 'Maheshwaram',
    state: 'Telangana',
    pincode: '506132',
    kccNumber: 'KCC-TS-44921',
    pmKisanId: 'PMK-TS-884912',
    aadhaarLast4: '7829',
    farmSizeAcres: '6.5',
    soilType: 'Black Cotton Soil (Regur)',
    irrigationType: 'Borewell & Drip Irrigation',
    primaryCrop: 'Dry Red Chilli (Teja Mirchi)',
    secondaryCrops: 'Nizamabad Turmeric, Hybrid Cotton, Maize',
    bankName: 'State Bank of India (Warangal Agri Branch)',
    accountNumber: '••••••••4819',
    ifscCode: 'SBIN0001234',
    upiId: 'mallaiah.kisan@sbi',
    kycVerified: true,
    avatar: '👨‍🌾',
    totalDepositedQtl: 380,
    activeTokens: ['TK-102'],
    pledgeLoansActive: '₹3,40,000',
    joinedDate: 'February 2024'
  },
  facility_manager: {
    role: 'facility_manager',
    name: 'Srinivas Rao',
    phone: '+91 94401 23456',
    email: 'srinivas@kakatiyacoldchain.com',
    facilityId: 'cs-warangal-01',
    facilityName: 'Kakatiya Mega Cold Chain & Spices Yard',
    wdraRegNo: 'WDRA-TS-2022-8491',
    district: 'Warangal',
    mandal: 'Geesugonda',
    village: 'Dharmaram',
    state: 'Telangana',
    pincode: '506330',
    totalCapacityMT: 6000,
    availableCapacityMT: 2450,
    chambersCount: 8,
    supportedCommodities: 'Dry Red Chilli, Nizamabad Turmeric, Paddy Seeds, Maize',
    licenseValidTill: '31 Dec 2028',
    fireSafetyCert: 'TS-FIRE-2024-88',
    insurancePolicy: 'National Insurance Multi-Peril Goods Policy #49102',
    kycVerified: true,
    avatar: '🏭',
    joinedDate: 'January 2023'
  },
  procurement_officer: {
    role: 'procurement_officer',
    name: 'K. Venkateshwar Rao',
    phone: '+91 98230 55112',
    email: 'venkat.tsmarkfed@gov.in',
    organization: 'Telangana State Co-operative Marketing Federation (TS-MARKFED)',
    officerId: 'TSMF-INSP-0442',
    apmcMandi: 'Enumamula Spices APMC Yard, Warangal',
    district: 'Warangal',
    state: 'Telangana',
    jurisdiction: 'Warangal, Karimnagar & Nizamabad Commodity Zones',
    gradingCertLevel: 'Class-1 Senior Quality Assayer (AGMARK & WDRA Certified)',
    badgeNumber: 'TS-AGRI-INSP-99',
    kycVerified: true,
    avatar: '📋',
    joinedDate: 'November 2022'
  }
};

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('kisan_custom_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Error parsing stored user:', e);
      }
    }
    return DEMO_USERS.farmer;
  });

  const [activeTab, setActiveTabState] = useState(() => {
    return localStorage.getItem('kisan_active_tab') || 'about';
  });

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    localStorage.setItem('kisan_active_tab', tab);
  };

  // Re-trigger Google Translate when active tab changes so newly rendered view is translated
  useEffect(() => {
    const timer = setTimeout(() => {
      const combo = document.querySelector('select.goog-te-combo');
      const lang = localStorage.getItem('kisan_lang');
      if (combo && lang && lang !== 'en') {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const [selectedCropFilter, setSelectedCropFilter] = useState('');
  const [bookingModalUnit, setBookingModalUnit] = useState(null);
  const [isSmsSimulatorOpen, setIsSmsSimulatorOpen] = useState(false);
  const [smsNotificationList, setSmsNotificationList] = useState([]);
  const [unreadSmsCount, setUnreadSmsCount] = useState(0);
  const [latestToast, setLatestToast] = useState(null);
  const [queueRefreshTrigger, setQueueRefreshTrigger] = useState(0);

  // Subscribe to Server-Sent Events for real-time queue & SMS notifications
  useEffect(() => {
    let eventSource;
    try {
      eventSource = new EventSource('/api/events');

      eventSource.onmessage = (event) => {
        try {
          const packet = JSON.parse(event.data);
          if (packet.type === 'NEW_SMS') {
            setSmsNotificationList(prev => [packet.payload, ...prev]);
            setUnreadSmsCount(prev => prev + 1);
            showToast(`📩 New SMS: ${packet.payload.recipientName} - ${packet.payload.message.slice(0, 50)}...`);
          } else if (packet.type === 'QUEUE_UPDATED') {
            setQueueRefreshTrigger(prev => prev + 1);
            showToast('🔄 Real-time Queue Board updated!');
          }
        } catch (e) {
          // ignore heartbeat
        }
      };

      eventSource.onerror = () => {
        // Will auto reconnect
      };
    } catch (err) {
      console.warn('SSE connection error:', err);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  const showToast = (message) => {
    setLatestToast(message);
    setTimeout(() => {
      setLatestToast(null);
    }, 4500);
  };

  const switchRole = (roleKey) => {
    if (DEMO_USERS[roleKey]) {
      const user = DEMO_USERS[roleKey];
      setCurrentUser(user);
      localStorage.setItem('kisan_custom_user', JSON.stringify(user));
      showToast(`Switched active profile to: ${user.name} (${user.role})`);
    }
  };

  const updateUserProfile = (updates) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('kisan_custom_user', JSON.stringify(updated));
      return updated;
    });
    showToast('✅ Profile details updated successfully!');
  };

  const [selectedBookingFacility, setSelectedBookingFacility] = useState(null);
  const [selectedBookingCrop, setSelectedBookingCrop] = useState('');

  const navigateToSlotBooking = (facility = null, crop = '') => {
    if (facility) setSelectedBookingFacility(facility);
    if (crop) setSelectedBookingCrop(crop);
    setActiveTab('booking');
    if (facility) {
      showToast(`📍 Opening Slot Booking for ${facility.name}`);
    }
  };

  const openBookingFor = (unit, prefilledCrop = '') => {
    // Directs to the separate Slot Booking window instead of opening modal in storage units window
    navigateToSlotBooking(unit, prefilledCrop);
  };

  const closeBookingModal = () => {
    setBookingModalUnit(null);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      updateUserProfile,
      activeTab,
      setActiveTab,
      selectedCropFilter,
      setSelectedCropFilter,
      selectedBookingFacility,
      setSelectedBookingFacility,
      selectedBookingCrop,
      setSelectedBookingCrop,
      navigateToSlotBooking,
      bookingModalUnit,
      openBookingFor,
      closeBookingModal,
      isSmsSimulatorOpen,
      setIsSmsSimulatorOpen,
      smsNotificationList,
      unreadSmsCount,
      setUnreadSmsCount,
      latestToast,
      showToast,
      queueRefreshTrigger
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
