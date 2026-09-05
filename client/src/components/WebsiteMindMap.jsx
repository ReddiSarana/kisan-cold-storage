import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  CheckCircle,
  XCircle,
  ExternalLink,
  Sparkles,
  PhoneCall
} from 'lucide-react';

// 6 Ultra-Simple Steps that any farmer can understand in 5 seconds
const SIMPLE_STEPS = [
  {
    step: '1',
    icon: '🥦',
    color: '#10b981',
    bg: 'bg-emerald-500',
    border: 'border-emerald-400',
    lightBg: 'bg-emerald-50',
    title: '1. Check Crop Guide',
    teluguTitle: '1. పంట చల్లదనం తెలుసుకోండి',
    simpleQuestion: 'How cold should my crop be kept?',
    simpleAnswer: 'See the exact temperature for Chillies, Potatoes, Onions, or Mangoes so your crop never rots or spoils.',
    teluguAnswer: 'మిర్చి, ఆలుగడ్డ, ఉల్లిపాయ లేదా మామిడి ఏ ఉష్ణోగ్రత వద్ద ఉంచితే పాడవకుండా ఉంటుందో చూడండి.',
    actionTab: 'crops',
    actionText: 'See 77 Crop Guides →',
    speechText: 'మొదటి దశ: పంట చల్లదనం తెలుసుకోండి. మిర్చి, ఆలుగడ్డ, ఉల్లిపాయ పాడవకుండా ఏ ఉష్ణోగ్రత వద్ద ఉంచాలో చూడండి.'
  },
  {
    step: '2',
    icon: '🏢',
    color: '#06b6d4',
    bg: 'bg-cyan-500',
    border: 'border-cyan-400',
    lightBg: 'bg-cyan-50',
    title: '2. Pick Nearest Cold Room',
    teluguTitle: '2. దగ్గర్లోని కోల్డ్ స్టోరేజ్ ఎంచుకోండి',
    simpleQuestion: 'Where is the nearest warehouse?',
    simpleAnswer: 'Find an approved cold storage unit near your village in your district with available space and transparent rents.',
    teluguAnswer: 'మీ జిల్లాలో మీ గ్రామానికి దగ్గర్లోని ఖాళీ ఉన్న కోల్డ్ స్టోరేజ్ గోదామును సులభంగా ఎంచుకోండి.',
    actionTab: 'units',
    actionText: 'Find Nearby Storage →',
    speechText: 'రెండవ దశ: మీ జిల్లాలో మీ ఊరికి దగ్గర్లోని కోల్డ్ స్టోరేజ్ ఎంచుకోండి.'
  },
  {
    step: '3',
    icon: '📱',
    color: '#8b5cf6',
    bg: 'bg-purple-500',
    border: 'border-purple-400',
    lightBg: 'bg-purple-50',
    title: '3. Book from Your Phone',
    teluguTitle: '3. ఫోన్ లో స్లాట్ బుక్ చేసుకోండి',
    simpleQuestion: 'How do I reserve space?',
    simpleAnswer: 'Enter your village name and how many bags you have. Choose your arrival date and get an instant SMS token.',
    teluguAnswer: 'మీ గ్రామం పేరు, ఎన్ని బస్తాల పంట తెస్తున్నారో ఎంటర్ చేసి, ఫోన్ లో ఎస్ఎంఎస్ టోకెన్ పొందండి.',
    actionTab: 'booking',
    actionText: 'Book Slot Now →',
    speechText: 'మూడవ దశ: ఎన్ని బస్తాలు తెస్తున్నారో చెప్పి, ఫోన్ ద్వారా మీ స్లాట్ బుక్ చేసుకోండి.'
  },
  {
    step: '4',
    icon: '🚜',
    color: '#f59e0b',
    bg: 'bg-amber-500',
    border: 'border-amber-400',
    lightBg: 'bg-amber-50',
    title: '4. Drive In & Unload',
    teluguTitle: '4. ట్రాక్టర్ తో నేరుగా గేటుకి రండి',
    simpleQuestion: 'What happens when I arrive?',
    simpleAnswer: 'Show your SMS token at the gate. Drive onto the weighbridge, weigh your bags, and unload without waiting in line.',
    teluguAnswer: 'గేటు వద్ద ఎస్ఎంఎస్ టోకెన్ చూపించండి. బస్తాల బరువు తూకం వేసి, వెంటనే అన్‌లోడ్ చేసుకోండి.',
    actionTab: 'queue',
    actionText: 'View Live Gate Queue →',
    speechText: 'నాల్గవ దశ: గేటు వద్ద టోకెన్ చూపించి ధర్మకాటా బరువు తూకం వేసి అన్‌లోడ్ చేసుకోండి.'
  },
  {
    step: '5',
    icon: '💵',
    color: '#ef4444',
    bg: 'bg-rose-500',
    border: 'border-rose-400',
    lightBg: 'bg-rose-50',
    title: '5. Take 75% Bank Loan',
    teluguTitle: '5. బ్యాంకు నుండి 75% లోన్ తీసుకోండి',
    simpleQuestion: 'Need cash for next harvest?',
    simpleAnswer: 'Show your official digital receipt at SBI or Grameena Bank to get 75% instant cash loan at cheap 7% government interest.',
    teluguAnswer: 'మీ పంట రసీదును బ్యాంకులో పెట్టి, 75% నగదును 7% తక్కువ వడ్డీతో వెంటనే లోన్ గా పొందండి.',
    actionTab: 'documents',
    actionText: 'Download Bank Receipt →',
    speechText: 'ఐదవ దశ: పంట రసీదుపై బ్యాంకు నుండి 75 శాతం తక్కువ వడ్డీ లోన్ తీసుకోండి.'
  },
  {
    step: '6',
    icon: '💰',
    color: '#eab308',
    bg: 'bg-yellow-500',
    border: 'border-yellow-400',
    lightBg: 'bg-yellow-50',
    title: '6. Sell at Double Profit',
    teluguTitle: '6. ధర పెరిగాక ఎక్కువ లాభానికి అమ్మండి',
    simpleQuestion: 'When do I sell my crop?',
    simpleAnswer: 'Wait until market rates jump after 4 to 8 months. Sell at peak mandi prices and take home 2x to 3x higher profits.',
    teluguAnswer: 'మార్కెట్లో పంట ధర రెట్టింపు అయ్యేంత వరకు ఆగి, మంచి రేటుకు అమ్మి రెండింతల లాభం పొందండి.',
    actionTab: 'units',
    actionText: 'Check Market Rates →',
    speechText: 'ఆరవ దశ: మార్కెట్లో ధర పెరిగాక పంటను అమ్మి 2 రెట్లు ఎక్కువ లాభం పొందండి.'
  }
];

export default function WebsiteMindMap() {
  const { setActiveTab } = useApp();
  const { t } = useLanguage();

  const [activeStep, setActiveStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Audio speech narration for illiterate or elderly farmers
  const handleSpeak = (text, teluguText) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }

      // Try Telugu voice if available, otherwise default voice
      const utterance = new SpeechSynthesisUtterance(teluguText || text);
      utterance.rate = 0.85; // slightly slower for easy understanding
      
      const voices = window.speechSynthesis.getVoices();
      const teluguVoice = voices.find(v => v.lang.includes('te') || v.name.toLowerCase().includes('telugu'));
      if (teluguVoice) {
        utterance.voice = teluguVoice;
      }

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const current = SIMPLE_STEPS[activeStep];

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-5 sm:p-9 border-2 border-emerald-400/80 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Header: Extremely friendly & clear */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 shadow-md">
            <span>🧠 SIMPLE FARMER MIND MAP</span>
            <span>•</span>
            <span>రైతు సులభ మైండ్ మ్యాప్</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            How Krishivalaya Works in 6 Easy Steps
          </h2>
          <p className="text-sm sm:text-base text-emerald-300 font-semibold mt-1">
            ఈ వెబ్‌సైట్ ద్వారా రైతు పంటను దాచి ఎక్కువ లాభం పొందే విధానం
          </p>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Save your harvest from rotting, get an immediate 75% bank loan, and sell when mandi rates double. Even a child can understand this simple map.
          </p>
        </div>

        {/* Audio Speaker Button: Reads out loud for uneducated farmers */}
        <button
          type="button"
          onClick={() =>
            handleSpeak(
              `Krishivalaya summary: ${current.title}. ${current.simpleAnswer}`,
              current.speechText
            )
          }
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black px-4 py-3 rounded-2xl shadow-xl transition-all hover:scale-105 text-xs sm:text-sm shrink-0"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-5 h-5 text-red-600 animate-pulse" />
              <span>ఆపండి (Stop Audio)</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 text-slate-950 animate-bounce" />
              <span>🔊 వాయిస్ వినండి (Listen Out Loud)</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Central Mind Map Diagram with Big Step Cards */}
      <div className="relative z-10 space-y-6">
        {/* Step 1 to 6 Big Number Buttons Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SIMPLE_STEPS.map((s, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => {
                  setActiveStep(idx);
                  if (isSpeaking && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 text-left flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white text-slate-950 border-white shadow-2xl scale-105 ring-4 ring-emerald-400/40 font-bold'
                    : 'bg-white/10 hover:bg-white/15 border-white/15 text-white hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                      isSelected
                        ? 'bg-slate-950 text-white'
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <div>
                  <h4 className="font-black text-xs sm:text-sm leading-tight">
                    {s.title.replace(/^\d+\.\s*/, '')}
                  </h4>
                  <p
                    className={`text-[10px] mt-0.5 leading-tight ${
                      isSelected ? 'text-emerald-700 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {s.teluguTitle.replace(/^\d+\.\s*/, '')}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Big Step Showcase Card */}
        <div className="bg-slate-900/90 border-2 border-emerald-400/70 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Big Icon & Step Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-slate-950/80 rounded-2xl border border-white/10 space-y-3">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-5xl shadow-2xl shadow-emerald-500/30">
                {current.icon}
              </div>
              <div>
                <span className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Step {current.step} of 6
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {current.title}
                </h3>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">
                  {current.teluguTitle}
                </p>
              </div>
            </div>

            {/* Explanation & Action */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                  ❓ Common Farmer Question:
                </span>
                <p className="text-base sm:text-lg font-black text-white">
                  "{current.simpleQuestion}"
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  ✅ Simple Solution:
                </span>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                  {current.simpleAnswer}
                </p>
                <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed font-semibold bg-emerald-950/50 p-3 rounded-xl border border-emerald-500/30">
                  👉 {current.teluguAnswer}
                </p>
              </div>

              {/* Direct Navigation Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab(current.actionTab)}
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 text-sm flex items-center space-x-2"
                >
                  <span>{current.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSpeak(
                      `${current.title}. ${current.simpleAnswer}`,
                      current.speechText
                    )
                  }
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3.5 rounded-2xl border border-white/20 transition text-sm flex items-center space-x-2"
                >
                  <span>🔊 వినండి (Listen Step)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Big Contrast: WITHOUT Cold Storage vs WITH Krishivalaya */}
        <div className="bg-slate-950/90 rounded-3xl p-5 sm:p-7 border border-white/15 space-y-4">
          <h4 className="text-center text-sm sm:text-base font-black text-white uppercase tracking-wider">
            Why Every Farmer Needs This (ఎందుకు ప్రతి రైతుకు ఇది అవసరం?)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* Bad Way: Normal Market */}
            <div className="bg-red-950/40 border-2 border-red-500/50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-red-400 font-black text-sm uppercase">
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>Without Cold Storage (సాధారణంగా జరిగే నష్టం)</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>Crops rot or shrivel in 3-5 days under summer heat.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>Forced to sell tomatoes/potatoes for ₹3/kg during harvest glut.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>Borrowing from private moneylenders at 24% to 36% interest.</span>
                </li>
              </ul>
            </div>

            {/* Good Way: Krishivalaya */}
            <div className="bg-emerald-950/40 border-2 border-emerald-500/60 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-black text-sm uppercase">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>With Krishivalaya (కృషివలయ ద్వారా రైతుకు లాభం)</span>
              </div>
              <ul className="space-y-2 text-slate-200 font-medium">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>Produce stays fresh & crisp up to 10 months in cold chambers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>Sell 5 months later when market rates rise to ₹30 - ₹50/kg.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>Get 75% bank loan at cheap 7% government subsidized interest.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quick Help Phone Banner */}
      <div className="relative z-10 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 font-bold text-xs sm:text-sm">
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center text-xl shrink-0">
            📞
          </div>
          <div>
            <span className="block font-black text-sm text-slate-950">
              Need Help? Call Kisan Call Centre Toll-Free (సహాయం కోసం ఫోన్ చేయండి):
            </span>
            <span className="font-mono text-base font-black text-slate-900">
              1800-180-1551 (Free 24x7 Government Helpline)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('booking')}
          className="bg-slate-950 hover:bg-slate-800 text-white font-black px-5 py-2.5 rounded-xl shadow-md transition shrink-0"
        >
          Book Storage Now →
        </button>
      </div>
    </div>
  );
}
