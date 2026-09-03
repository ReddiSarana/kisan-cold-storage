import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchSmsLogs, sendSms } from '../services/api';
import {
  MessageSquare,
  Send,
  CheckCheck,
  Search,
  RefreshCw,
  Bell,
  Smartphone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function SmsLogsPage() {
  const { currentUser, smsNotificationList, setIsSmsSimulatorOpen, showToast } = useApp();
  const [logs, setLogs] = useState([]);
  const [filterPhone, setFilterPhone] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Manual SMS Form state
  const [smsForm, setSmsForm] = useState({
    recipientPhone: currentUser.phone || '+91 98765 12345',
    recipientName: currentUser.name || 'Farmer',
    message: '',
    type: 'MANUAL_DISPATCH'
  });

  const loadLogs = async () => {
    try {
      const data = await fetchSmsLogs(filterPhone);
      setLogs(data);
    } catch (e) {
      console.error('Error fetching SMS logs:', e);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [filterPhone, smsNotificationList]);

  const handleSendManualSms = async (e) => {
    e.preventDefault();
    if (!smsForm.message.trim() || !smsForm.recipientPhone.trim()) return;

    setIsSending(true);
    try {
      const res = await sendSms(smsForm);
      if (res.success) {
        showToast(`📲 SMS sent to ${smsForm.recipientName}!`);
        setSmsForm(prev => ({ ...prev, message: '' }));
        setIsSmsSimulatorOpen(true);
        loadLogs();
      } else {
        alert('Failed to send SMS: ' + res.message);
      }
    } catch (err) {
      alert('Error sending SMS: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-900/70 px-3 py-1 rounded-full">
            AgroVault SMS Gateway & Notification Dispatcher
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Automated Farmer SMS Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Most Indian farmers rely on standard cellular SMS rather than mobile apps in remote field conditions. AgroVault triggers instant SMS alerts on slot reservations, bay calling, weighment validation, and payment receipts.
          </p>
        </div>

        <button
          onClick={() => setIsSmsSimulatorOpen(true)}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-5 rounded-2xl shadow-lg transition hover:scale-105 flex-shrink-0"
        >
          <Smartphone className="w-4 h-4" />
          <span>Open Interactive Phone</span>
        </button>
      </div>

      {/* Grid: Manual Dispatcher (Left) + SMS Audit Log (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Dispatch Custom SMS */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Send Manual SMS Broadcast</h3>
              <p className="text-[11px] text-slate-500">Dispatch immediate alert to any farmer</p>
            </div>
          </div>

          <form onSubmit={handleSendManualSms} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Farmer Name *</label>
              <input
                type="text"
                required
                value={smsForm.recipientName}
                onChange={(e) => setSmsForm({ ...smsForm, recipientName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Phone Number *</label>
              <input
                type="tel"
                required
                value={smsForm.recipientPhone}
                onChange={(e) => setSmsForm({ ...smsForm, recipientPhone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Alert Category</label>
              <select
                value={smsForm.type}
                onChange={(e) => setSmsForm({ ...smsForm, type: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              >
                <option value="MANUAL_DISPATCH">General Cold Chain Alert</option>
                <option value="QUEUE_CALL">Priority Yard Gate Call</option>
                <option value="WEATHER_WARNING">Frost & Temperature Advisory</option>
                <option value="PAYMENT_NOTICE">Procurement Payment Notification</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">SMS Text Body *</label>
              <textarea
                required
                rows="4"
                placeholder="Type SMS alert text (e.g. Namaste! Your potato consignment is safely unloaded into Chamber 2...)"
                value={smsForm.message}
                onChange={(e) => setSmsForm({ ...smsForm, message: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-600"
              ></textarea>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Standard GSM 160 char limit</span>
                <span>{smsForm.message.length} chars</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending || !smsForm.message.trim()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'Sending SMS...' : 'Dispatch SMS Alert'}</span>
            </button>
          </form>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <p className="font-bold text-slate-800 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Gateway Integration Ready</span>
            </p>
            <p>
              Configured with standard fallback: In-app live smartphone simulation + plug-and-play Fast2SMS / Twilio API keys in <code className="bg-slate-200 px-1 rounded">.env</code>.
            </p>
          </div>
        </div>

        {/* Right: SMS Audit Trail */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Dispatched SMS Audit History</h3>
              <p className="text-xs text-slate-500">Chronological cellular delivery logs</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by phone number..."
                  value={filterPhone}
                  onChange={(e) => setFilterPhone(e.target.value)}
                  className="bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 rounded-xl text-xs text-slate-800 w-48 font-mono focus:bg-white"
                />
              </div>

              <button
                onClick={loadLogs}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition"
                title="Refresh Logs"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              No SMS records found matching your query.
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-sm transition space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded font-mono text-[10px]">
                        {log.senderId || 'AGROVAULT'}
                      </span>
                      <span className="font-bold text-slate-800">{log.recipientName}</span>
                      <span className="text-slate-500 font-mono text-[11px]">({log.recipientPhone})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="flex items-center text-emerald-600 font-bold text-[10px]">
                        <CheckCheck className="w-3.5 h-3.5 mr-1" /> {log.status}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-100 font-mono text-[11px] leading-relaxed">
                    {log.message}
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                    <span>Event Tag: <code className="text-slate-600 font-bold">{log.type}</code></span>
                    <span>Carrier: AIRTEL / JIO Agri Gateway</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
