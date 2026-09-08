import React from 'react';
import { useVoice } from '../context/VoiceContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Gauge,
  HelpCircle,
  Radio
} from 'lucide-react';

export default function KisanVoiceReaderBar() {
  const {
    isSpeaking,
    currentText,
    tapToReadEnabled,
    setTapToReadEnabled,
    rate,
    setRate,
    isBarMinimized,
    setIsBarMinimized,
    readFullPage,
    stop
  } = useVoice();

  const { currentLanguage } = useLanguage();

  const isTelugu = currentLanguage.code === 'te';
  const isHindi = currentLanguage.code === 'hi';

  if (isBarMinimized) {
    return (
      <aside
        id="voice-controller-bar"
        aria-label="Kisan Voice Reader Bar"
        className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200"
      >
        <button
          type="button"
          onClick={() => setIsBarMinimized(false)}
          className={`flex items-center space-x-2 px-3 py-2.5 rounded-full shadow-2xl border-2 transition-all cursor-pointer ${
            isSpeaking
              ? 'bg-emerald-500 text-slate-950 border-white ring-4 ring-emerald-400/50 animate-pulse font-black'
              : 'bg-slate-950/90 hover:bg-slate-900 text-emerald-300 border-emerald-400/70 font-bold'
          }`}
          title="Open Kisan Audio Reader / వాయిస్ రీడర్ తెరవండి"
        >
          <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce text-slate-950' : 'text-emerald-400'}`} />
          <span className="text-xs font-black">
            {isSpeaking ? (isTelugu ? 'వాయిస్ చదువుతోంది...' : 'Reading aloud...') : (isTelugu ? '🔊 వాయిస్ రీడర్' : '🔊 Voice Reader')}
          </span>
          <ChevronUp className="w-4 h-4 text-emerald-300" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      id="voice-controller-bar"
      aria-label="Kisan Voice Reader Bar"
      className="fixed bottom-18 md:bottom-5 left-2 right-2 sm:left-auto sm:right-6 z-50 max-w-xl bg-slate-950/95 backdrop-blur-xl border-2 border-emerald-400/80 text-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.7)] p-3 sm:p-3.5 transition-all animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Top Strip: Status & Ticker */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="relative shrink-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isSpeaking ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-emerald-300'
            }`}>
              {isSpeaking ? (
                <Volume2 className="w-5 h-5 animate-bounce" />
              ) : (
                <Radio className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-black text-emerald-300 tracking-wide">
                {isTelugu ? 'రైతు ఆడియో రీడర్' : isHindi ? 'किसान वॉयस रीडर' : 'Kisan Voice Reader'}
              </span>
              <span className="text-[10px] font-bold text-slate-950 bg-emerald-400 px-1.5 py-0.2 rounded">
                {isTelugu ? 'ఆన్-డిమాండ్ వాయిస్' : 'On-Demand Voice'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium truncate max-w-[240px] sm:max-w-[340px]">
              {isSpeaking
                ? `🗣️ "${currentText}"`
                : (isTelugu ? 'వినడానికి "పేజీ మొత్తం చదవండి" పై క్లిక్ చేయండి' : 'Click "Read Full Page" to hear narration')}
            </p>
          </div>
        </div>

        {/* Minimize Button */}
        <button
          type="button"
          onClick={() => setIsBarMinimized(true)}
          className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
          title="Minimize / చిన్నది చేయండి"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Action Controls */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Play Whole Page / Stop Buttons */}
        <div className="flex items-center space-x-1.5">
          {isSpeaking ? (
            <button
              type="button"
              onClick={stop}
              className="flex items-center space-x-1 bg-rose-600 hover:bg-rose-500 text-white font-black px-3 py-1.5 rounded-xl shadow-md transition cursor-pointer hover:scale-105 active:scale-95"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>{isTelugu ? 'ఆపండి (Stop)' : 'Stop'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={readFullPage}
              className="flex items-center space-x-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3 py-1.5 rounded-xl shadow-md transition cursor-pointer hover:scale-105 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>{isTelugu ? 'పేజీ మొత్తం చదవండి' : isHindi ? 'पूरा पेज पढ़ें' : 'Read Full Page'}</span>
            </button>
          )}

          {/* Tap-to-Read Toggle */}
          <button
            type="button"
            onClick={() => setTapToReadEnabled(!tapToReadEnabled)}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl font-black transition border cursor-pointer ${
              tapToReadEnabled
                ? 'bg-emerald-950 text-emerald-200 border-emerald-400/60 ring-2 ring-emerald-500/30'
                : 'bg-white/10 text-slate-400 border-white/15 hover:text-white'
            }`}
            title={tapToReadEnabled ? "Tap to Read is ON" : "Tap to Read is OFF. Normal screen clicks will not speak."}
          >
            <span className={`w-2 h-2 rounded-full ${tapToReadEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>{tapToReadEnabled ? (isTelugu ? 'టచ్ వాయిస్: ఆన్' : 'Tap Voice: ON') : (isTelugu ? 'టచ్ వాయిస్: ఆఫ్' : 'Tap Voice: OFF')}</span>
          </button>
        </div>

        {/* Speed Selector (0.8x / 1.0x / 1.2x) */}
        <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-xl border border-white/15">
          <Gauge className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[10px] text-slate-300 font-bold hidden sm:inline">Speed:</span>
          {[
            { val: 0.8, label: '0.8x' },
            { val: 0.95, label: '1.0x' },
            { val: 1.2, label: '1.2x' }
          ].map((sp) => (
            <button
              key={sp.val}
              type="button"
              onClick={() => setRate(sp.val)}
              className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition cursor-pointer ${
                rate === sp.val
                  ? 'bg-emerald-400 text-slate-950 font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
