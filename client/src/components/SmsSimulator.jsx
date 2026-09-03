import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchSmsLogs, sendSms } from '../services/api';
import {
  Smartphone,
  X,
  Minimize2,
  Maximize2,
  Send,
  Bell,
  CheckCheck,
  Signal,
  Wifi,
  Battery,
  ChevronLeft
} from 'lucide-react';

export default function SmsSimulator() {
  const {
    isSmsSimulatorOpen,
    setIsSmsSimulatorOpen,
    currentUser,
    smsNotificationList,
    setUnreadSmsCount
  } = useApp();

  const [allSms, setAllSms] = useState([]);
  const [testMessage, setTestMessage] = useState('');
  const [testPhone, setTestPhone] = useState(currentUser.phone || '+91 98765 12345');
  const [activeTab, setActiveTab] = useState('phone'); // 'phone' or 'compose'
  const [isMinimized, setIsMinimized] = useState(false);

  // Sync with current user phone
  useEffect(() => {
    if (currentUser?.phone) {
      setTestPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Load SMS logs from backend
  const loadLogs = async () => {
    try {
      const logs = await fetchSmsLogs();
      setAllSms(logs);
    } catch (e) {
      console.error('Error fetching SMS logs:', e);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [smsNotificationList]);

  // When opening simulator, reset unread badge
  useEffect(() => {
    if (isSmsSimulatorOpen) {
      setUnreadSmsCount(0);
    }
  }, [isSmsSimulatorOpen]);

  const handleSendTest = async (e) => {
    e.preventDefault();
    if (!testMessage.trim()) return;

    try {
      await sendSms({
        recipientPhone: testPhone,
        recipientName: currentUser.name,
        message: testMessage,
        type: 'CUSTOM_TEST'
      });
      setTestMessage('');
      loadLogs();
    } catch (err) {
      alert('Error sending SMS: ' + err.message);
    }
  };

  if (!isSmsSimulatorOpen) {
    return (
      <button
        onClick={() => setIsSmsSimulatorOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl transition hover:scale-105 group border-2 border-white"
        title="Open Live Farmer SMS Simulator"
      >
        <Smartphone className="w-5 h-5 animate-bounce" />
        <span className="font-bold text-xs">Live SMS Phone</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping"></span>
      </button>
    );
  }

  // Filter messages for current user's phone or show all
  const filteredMessages = allSms.filter(s => {
    const p1 = s.recipientPhone.replace(/\D/g, '');
    const p2 = testPhone.replace(/\D/g, '');
    return p1.includes(p2) || p2.includes(p1) || true; // show all for demo ease
  });

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMinimized
        ? 'bottom-4 right-4 w-72 h-14'
        : 'bottom-4 right-4 w-88 sm:w-96 h-[580px]'
    }`}>
      {/* Phone Body */}
      <div className="w-full h-full bg-slate-900 rounded-[36px] shadow-2xl border-4 border-slate-800 flex flex-col overflow-hidden text-slate-900">
        {/* Top Bezel & Speaker */}
        <div className="bg-slate-900 px-6 pt-2.5 pb-1 flex justify-between items-center text-[10px] text-slate-400 select-none">
          <span className="font-semibold text-white">09:41</span>
          {/* Dynamic Island / Notch */}
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800 mr-1"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          </div>
          <div className="flex items-center space-x-1.5 text-white">
            <Signal className="w-2.5 h-2.5" />
            <Wifi className="w-2.5 h-2.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Minimized Bar */}
        {isMinimized ? (
          <div className="flex-1 bg-slate-800 text-white px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold">Farmer Mobile (Active)</span>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => setIsMinimized(false)} className="p-1 hover:text-emerald-300">
                <Maximize2 className="w-4 h-4" />
              </button>
              <button onClick={() => setIsSmsSimulatorOpen(false)} className="p-1 hover:text-rose-400">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Phone Screen Inner */
          <div className="flex-1 bg-slate-100 flex flex-col overflow-hidden">
            {/* SMS Header */}
            <div className="bg-emerald-700 text-white px-4 py-2.5 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-800/80 flex items-center justify-center text-xs font-bold">
                  KC
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight flex items-center">
                    KISAN-COLD
                    <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  </h4>
                  <p className="text-[10px] text-emerald-100">SMS Gateway • Verified AGRI</p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-emerald-100">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-emerald-600 rounded transition"
                  title="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsSmsSimulatorOpen(false)}
                  className="p-1 hover:bg-emerald-600 rounded transition"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Recipient Bar */}
            <div className="bg-emerald-50 border-b border-emerald-100 px-3 py-1.5 flex items-center justify-between text-[11px]">
              <span className="text-slate-600">Simulating: <strong>{currentUser.name}</strong></span>
              <span className="text-emerald-700 font-mono font-medium text-[10px] bg-emerald-100/60 px-1.5 py-0.5 rounded">
                {currentUser.phone}
              </span>
            </div>

            {/* Messages Thread Container */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-100/70">
              <div className="text-center my-1">
                <span className="text-[10px] bg-slate-200/80 text-slate-500 font-medium px-2 py-0.5 rounded-full">
                  Today • Official Cold Chain Alerts
                </span>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-medium">No SMS messages yet.</p>
                  <p className="text-[10px]">Book a cold room or advance the queue to trigger instant SMS alerts.</p>
                </div>
              ) : (
                filteredMessages.map((msg, idx) => (
                  <div key={msg.id || idx} className="flex flex-col items-start max-w-[88%]">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm border border-slate-200/80 text-xs text-slate-800 leading-relaxed">
                      <div className="flex items-center justify-between mb-1 pb-1 border-b border-slate-100">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tight">
                          {msg.senderId || 'KISAN-COLD'}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="whitespace-pre-line">{msg.message}</p>
                      <div className="mt-1 flex items-center justify-between text-[9px] text-slate-400">
                        <span>To: {msg.recipientName || 'Farmer'}</span>
                        <span className="flex items-center text-emerald-600 font-medium">
                          <CheckCheck className="w-3 h-3 mr-0.5" /> Delivered
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Test Message Dispatcher */}
            <form onSubmit={handleSendTest} className="p-2.5 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Test send SMS alert..."
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="flex-1 bg-slate-100 border border-slate-200 text-xs rounded-full px-3.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!testMessage.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2 rounded-full shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Bottom Home Indicator */}
            <div className="bg-slate-900 py-1 flex justify-center">
              <div className="w-28 h-1 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
