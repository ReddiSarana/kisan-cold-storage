import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
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
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Live Cold Storage Gate & Weighbridge Board
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Real-Time Yard Queue & Token System
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Eliminating highway tractor lines and harvest gate congestion. Farmers receive an automated digital entry token and live SMS call-out when their unloading bay is ready.
          </p>
        </div>

        {/* Refresh & Operator Switch */}
        <div className="flex items-center space-x-3 bg-slate-800 p-2 rounded-2xl border border-slate-700">
          <button
            onClick={loadQueue}
            className="flex items-center space-x-1.5 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-xl text-xs font-semibold text-white transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Live</span>
          </button>

          <button
            onClick={() => setIsSmsSimulatorOpen(true)}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-xl text-xs font-bold text-white transition"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>SMS Phone</span>
          </button>
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
                className="bg-white rounded-3xl border-2 border-emerald-500 shadow-md p-5 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  {token.assignedBay || 'Gate Bay'}
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black font-mono text-slate-900">{token.tokenId}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      token.status === 'called' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                      token.status === 'weighing' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {token.status === 'called' ? 'Called to Gate' : (token.status === 'weighing' ? 'On Weighbridge' : 'Unloading Cargo')}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600">
                    <p>Farmer: <strong className="text-slate-900">{token.farmerName}</strong></p>
                    <p>Phone: <strong className="font-mono text-emerald-700">{token.farmerPhone}</strong></p>
                    <p>Vehicle: <strong className="text-slate-800">{token.vehicleNumber}</strong></p>
                    <p>Cargo: <strong>{token.quantityQuintals} Qtl {token.cropName}</strong></p>
                  </div>
                </div>

                {/* Operator Actions for this Token */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {token.status === 'called' && (
                    <button
                      onClick={() => handleStatusChange(token.tokenId, 'weighing')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg text-center"
                    >
                      Start Weighment
                    </button>
                  )}
                  {token.status === 'weighing' && (
                    <button
                      onClick={() => handleStatusChange(token.tokenId, 'unloading')}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg text-center"
                    >
                      Dock to Chamber
                    </button>
                  )}
                  <button
                    onClick={() => handleStatusChange(token.tokenId, 'completed')}
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg text-center"
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
