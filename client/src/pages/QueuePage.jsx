import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchQueue, updateTokenStatus, callNextToken } from '../services/api';
import {
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  Bell,
  RefreshCw,
  PlusCircle,
  ShieldAlert,
  Radio,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function QueuePage() {
  const { currentUser, queueRefreshTrigger, showToast, setIsSmsSimulatorOpen } = useApp();
  const { t } = useLanguage();
  const [queueTokens, setQueueTokens] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState('cs-agra-01');
  const [isCallingNext, setIsCallingNext] = useState(false);
  const [isUpdatingToken, setIsUpdatingToken] = useState(false);

  const loadQueue = async () => {
    try {
      const data = await fetchQueue(selectedFacility);
      setQueueTokens(data);
    } catch (e) {
      console.error('Error fetching queue:', e);
    }
  };

  useEffect(() => {
    loadQueue();
  }, [selectedFacility, queueRefreshTrigger]);

  const handleCallNext = async (bay = 'Bay 1') => {
    setIsCallingNext(true);
    try {
      const res = await callNextToken(bay, selectedFacility);
      if (res.success) {
        showToast(`📢 Token ${res.data.tokenId} called to ${bay}! SMS alert dispatched.`);
        setIsSmsSimulatorOpen(true);
        loadQueue();
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert('Error calling next token: ' + err.message);
    } finally {
      setIsCallingNext(false);
    }
  };

  const handleStatusChange = async (tokenId, newStatus, bay = null) => {
    setIsUpdatingToken(true);
    try {
      const res = await updateTokenStatus(tokenId, newStatus, bay);
      if (res.success) {
        showToast(`Token ${tokenId} moved to status: ${newStatus}`);
        loadQueue();
      }
    } catch (err) {
      alert('Error updating token: ' + err.message);
    } finally {
      setIsUpdatingToken(false);
    }
  };

  // Group tokens
  const activeUnloading = queueTokens.filter(t => t.status === 'unloading' || t.status === 'called' || t.status === 'weighing');
  const waitingTokens = queueTokens.filter(t => t.status === 'waiting');
  const completedTokens = queueTokens.filter(t => t.status === 'completed');

  const isOperator = currentUser.role === 'facility_manager' || currentUser.role === 'procurement_officer';

  return (
    <div className="space-y-8 py-6">
      {/* Real-time Status Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-2.5 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1 rounded-full shadow-xs">
              {t('liveQueueTag', "Live Cold Storage Gate & Weighbridge Board")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t('liveQueueTitle', "Real-Time Yard Queue & Token System")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
            {t('liveQueueDesc', "Eliminating highway tractor lines and harvest gate congestion. Farmers receive an automated digital entry token and live SMS call-out when their unloading bay is ready.")}
          </p>
        </div>

        {/* Refresh & Operator Switch */}
        <div className="relative z-10 flex items-center space-x-2.5 bg-slate-800/80 backdrop-blur-md p-2.5 rounded-2xl border border-slate-700/80 shadow-lg">
          <button
            onClick={loadQueue}
            className="flex items-center space-x-1.5 bg-slate-700 hover:bg-slate-600 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sync Live</span>
          </button>

          <button
            onClick={() => setIsSmsSimulatorOpen(true)}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-3.5 py-2 rounded-xl text-xs font-black text-slate-950 transition shadow-md shadow-emerald-500/20"
          >
            <Bell className="w-3.5 h-3.5 text-slate-950" />
            <span>SMS Phone</span>
          </button>
        </div>
      </div>

      {/* Farmer & Tractor Driver Gate Directions */}
      <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/80 border-2 border-amber-300/80 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-amber-200/80">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center font-black text-xl shadow-md">
              🚜
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
                Tractor Driver & Farmer Directions: How Live Gate Entry Works
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Live Yard Entry & Automated Weighbridge Protocol
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-4 py-2 rounded-full text-xs font-black flex items-center space-x-2 shadow-sm self-start sm:self-auto border border-amber-500">
            <span>📞 Gate Marshal:</span>
            <a href="tel:18001801551" className="underline font-mono tracking-wide">1800-180-1551</a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-black flex items-center justify-center text-sm shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                📱 Step 1: Check Your SMS Gate Token
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Check your booking SMS for your unique Gate Token (e.g. <strong>TKN-8821</strong>). You do NOT need to wait in line outside.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-orange-200 shadow-sm flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 font-black flex items-center justify-center text-sm shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                🌳 Step 2: Park & Rest in Kisan Lounge
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Park your tractor in the designated green holding zone or rest in the Kisan Lounge. Watch the live display screen above.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                🔊 Step 3: Advance to Bay on SMS / Call
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                When your token lights up green with <strong>"Bay 1, 2, or 3"</strong>, drive directly onto the electronic weighbridge for automated gross weighment.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-teal-200 shadow-sm flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm shrink-0">
              4
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                🧾 Step 4: Rapid Unloading & Weighment Slip
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Warehouse staff unloads your produce into the cold chamber. You receive an instant SMS weighment pass and e-NWR receipt!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Operator Control Panel (if logged in as manager) */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              ⚙️
            </div>
            <div>
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Gate Officer Command Controls
              </h3>
              <p className="text-[11px] text-emerald-700">
                Logged in as <strong>{currentUser.name}</strong> ({currentUser.role}). Advance vehicles and trigger live SMS alerts.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCallNext('Bay 1')}
              disabled={isCallingNext || waitingTokens.length === 0}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center space-x-1.5"
            >
              <span>Call Next to Bay 1</span>
              <span>&rarr;</span>
            </button>

            <button
              onClick={() => handleCallNext('Bay 2')}
              disabled={isCallingNext || waitingTokens.length === 0}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center space-x-1.5"
            >
              <span>Call Next to Bay 2</span>
              <span>&rarr;</span>
            </button>

            <button
              onClick={() => handleCallNext('Bay 3')}
              disabled={isCallingNext || waitingTokens.length === 0}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center space-x-1.5"
            >
              <span>Call Next to Bay 3</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-emerald-800 mt-2">
          💡 <em>Calling a token immediately dispatches an automated SMS alert to the farmer's registered phone with bay assignment.</em>
        </p>
      </div>

      {/* Live Unloading Bays Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
          <span>Active Unloading & Weighbridge Bays</span>
          <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
            {activeUnloading.length} Vehicles In Gate
          </span>
        </h2>

        {activeUnloading.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-500">
            <p className="text-sm font-semibold">All unloading bays currently idle.</p>
            <p className="text-xs text-slate-400 mt-1">Click "Call Next to Bay" above to summon the next queued tractor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activeUnloading.map((token) => (
              <div
                key={token.tokenId}
                className="bg-white/95 backdrop-blur rounded-3xl border-2 border-emerald-500/80 shadow-md card-hover-lift p-6 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-xs px-3.5 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-xs">
                  {token.assignedBay || 'Gate Bay'}
                </div>

                <div className="space-y-3.5 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black font-mono text-slate-900">{token.tokenId}</span>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      token.status === 'called' ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' :
                      token.status === 'weighing' ? 'bg-blue-100 text-blue-900 border border-blue-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {token.status === 'called' ? 'Called to Gate' : (token.status === 'weighing' ? 'On Weighbridge' : 'Unloading Cargo')}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                    <p className="flex justify-between">
                      <span className="text-slate-400">Farmer:</span>
                      <strong className="text-slate-900 font-bold">{token.farmerName}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <strong className="font-mono text-emerald-700 font-bold">{token.farmerPhone}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Vehicle:</span>
                      <strong className="text-slate-800 font-bold font-mono">{token.vehicleNumber}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Cargo:</span>
                      <strong className="text-emerald-800 font-bold">{token.quantityQuintals} Qtl {token.cropName}</strong>
                    </p>
                  </div>
                </div>

                {/* Operator Actions for this Token */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap gap-2">
                  {token.status === 'called' && (
                    <button
                      onClick={() => handleStatusChange(token.tokenId, 'weighing')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-black py-2 px-2.5 rounded-xl text-center shadow-xs transition"
                    >
                      Start Weighment
                    </button>
                  )}
                  {token.status === 'weighing' && (
                    <button
                      onClick={() => handleStatusChange(token.tokenId, 'unloading')}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-[11px] font-black py-2 px-2.5 rounded-xl text-center shadow-xs transition"
                    >
                      Dock to Chamber
                    </button>
                  )}
                  <button
                    onClick={() => handleStatusChange(token.tokenId, 'completed')}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black py-2 px-2.5 rounded-xl text-center shadow-xs transition"
                  >
                    Finish & Issue Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Holding Yard Waiting Queue */}
      <div className="space-y-3">
        <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
          <span>Holding Yard Waiting Line</span>
          <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
            {waitingTokens.length} In Queue
          </span>
        </h2>

        {waitingTokens.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center text-slate-400 text-xs">
            No waiting vehicles in holding yard.
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <tr>
                    <th className="p-4">Queue Pos</th>
                    <th className="p-4">Token ID</th>
                    <th className="p-4">Farmer Name</th>
                    <th className="p-4">Vehicle Number</th>
                    <th className="p-4">Commodity</th>
                    <th className="p-4">Est. Wait Time</th>
                    <th className="p-4">Call Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {waitingTokens.map((token, index) => (
                    <tr key={token.tokenId} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-bold text-slate-400">#{index + 1}</td>
                      <td className="p-4 font-mono font-black text-emerald-700 text-sm">{token.tokenId}</td>
                      <td className="p-4 font-semibold text-slate-800">{token.farmerName}</td>
                      <td className="p-4 font-mono text-slate-600">{token.vehicleNumber}</td>
                      <td className="p-4">{token.quantityQuintals} Qtl {token.cropName}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center space-x-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>~{token.estimatedWaitMins} mins</span>
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleStatusChange(token.tokenId, 'called', 'Bay 1')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition"
                        >
                          Call to Bay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Completed Departures */}
      {completedTokens.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Completed Today ({completedTokens.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {completedTokens.slice(0, 3).map((token) => (
              <div key={token.tokenId} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-700">{token.tokenId}</span>
                  <p className="text-slate-500 text-[11px]">{token.farmerName} • {token.cropName}</p>
                </div>
                <span className="flex items-center text-emerald-600 font-bold text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Stored
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
