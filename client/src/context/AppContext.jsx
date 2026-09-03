import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const DEMO_USERS = {
  farmer: {
    role: 'farmer',
    name: 'Ramesh Kumar',
    phone: '+91 98765 12345',
    district: 'Agra',
    state: 'Uttar Pradesh',
    kccNumber: 'KCC-UP-44921',
    primaryCrop: 'Potato',
    avatar: '👨‍🌾'
  },
  facility_manager: {
    role: 'facility_manager',
    name: 'Sanjay Singhal',
    phone: '+91 98765 43210',
    facilityId: 'cs-agra-01',
    facilityName: 'Shiv Ganga Multi-Chamber Cold Storage',
    district: 'Agra',
    avatar: '🏭'
  },
  procurement_officer: {
    role: 'procurement_officer',
    name: 'Sunil Verma',
    phone: '+91 98230 55112',
    organization: 'Agra APMC & Agri-Procurement Agency',
    avatar: '📋'
  }
};

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(DEMO_USERS.farmer);
  const [activeTab, setActiveTab] = useState('about');
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
      setCurrentUser(DEMO_USERS[roleKey]);
      showToast(`Switched active profile to: ${DEMO_USERS[roleKey].name} (${DEMO_USERS[roleKey].role})`);
    }
  };

  const openBookingFor = (unit, prefilledCrop = '') => {
    setBookingModalUnit({ unit, prefilledCrop });
  };

  const closeBookingModal = () => {
    setBookingModalUnit(null);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      activeTab,
      setActiveTab,
      selectedCropFilter,
      setSelectedCropFilter,
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
