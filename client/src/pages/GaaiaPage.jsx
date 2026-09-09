import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { askGaaia, fetchGaaiaTopics } from '../services/api';
import { GAAIA_TOPICS, POPULAR_QUESTIONS } from '../services/gaaiaBrain';
import {
  Bot,
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Wheat,
  Snowflake,
  CreditCard,
  Truck,
  FileText,
  Clock,
  TrendingUp,
  Landmark,
  ShieldAlert,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';

const TOPIC_ICONS = {
  cold_storage: Snowflake,
  enwr_loans: FileText,
  transport_rental: Truck,
  payment_advance: CreditCard,
  queue_tokens: Clock,
  mandi_prices: TrendingUp,
  schemes_subsidies: Landmark,
  pest_crop_health: ShieldAlert
};

export default function GaaiaPage() {
  const { setActiveTab, currentUser } = useApp();
  const { currentLanguage, setLanguage, languages, t } = useLanguage();

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `🌱 **Namaste ${currentUser ? currentUser.name : 'Kisan Friend'}! Welcome to GAAIA (గాయియా / गाइया) - Your 24x7 Agricultural AI Companion.**

I provide authoritative, real-time guidance on:
• ❄️ **Cold Storage Guidelines:** Preserving 77+ commodities (optimal temperature, RH %, shelf life).
• 📄 **e-NWR Receipts & Bank Loans:** Pledging warehouse receipts for 75% low-interest cash loans.
• 🚜 **Farm Transport Fleet:** Booking tractor trolleys or reefer vans with 20% Rythu Bandhu subsidy.
• 💳 **Chamber Booking & Tariffs:** Paying 25% advance to reserve space online.
• 📈 **Mandi Realization:** When to store your harvest vs when to sell for maximum profit.

*Select a suggested topic below, type your question, or tap the microphone to speak!*`,
      actions: [
        { label: '❄️ Red Chilli Temp & Humidity', query: 'What is the optimal temperature and humidity to store Red Chillies?' },
        { label: '📄 75% e-NWR Bank Loan', query: 'How do I pledge an e-NWR receipt to get a 75% bank loan?' },
        { label: '🚜 20% Transport Subsidy', query: 'How to book a tractor trolley with the 20% Rythu Bandhu subsidy?' },
        { label: '💳 25% Advance Booking', query: 'Can I pay only 25% advance to reserve cold storage space?' }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('all');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const speechRecognitionRef = useRef(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage.code === 'te' ? 'te-IN' : currentLanguage.code === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
          handleSend(transcript);
        }
      };

      speechRecognitionRef.current = recognition;
    }
  }, [currentLanguage]);

  const toggleSpeechRecognition = () => {
    if (!speechRecognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    if (isListening) {
      speechRecognitionRef.current.stop();
    } else {
      try {
        speechRecognitionRef.current.start();
      } catch (err) {
        speechRecognitionRef.current.stop();
      }
    }
  };

  // Text-to-Speech
  const handleSpeak = (messageId, text) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#•`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = currentLanguage.code === 'te' ? 'te-IN' : currentLanguage.code === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (queryText = inputQuery) => {
    const textToSend = (queryText || '').trim();
    if (!textToSend || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await askGaaia(textToSend, {
        lang: currentLanguage.code,
        context: {
          userName: currentUser?.name,
          userRole: currentUser?.role,
          district: currentUser?.district
        }
      });

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.answer,
        title: response.title,
        topic: response.topic,
        actions: response.actions || [],
        suggestedQuestions: response.suggestedQuestions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'I apologize, an unexpected error occurred. Please try asking again or contact our Kisan Toll-Free Line at **1800-180-1551**.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.tab) {
      setActiveTab(action.tab);
    } else if (action.query) {
      handleSend(action.query);
    }
  };

  const handleReset = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: '🌱 **Chat thread reset.** Ask me any question about cold storage, bank pledge loans, or farm transport!',
        actions: [
          { label: '❄️ Chilli Storage', query: 'What is the temperature to store Red Chillies?' },
          { label: '📄 e-NWR Loan', query: 'How to get a 75% bank loan on e-NWR?' },
          { label: '🚜 Transport Subsidy', query: 'How to book tractor with 20% subsidy?' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#032e18] via-[#054321] to-[#022413] text-white p-6 sm:p-8 border-2 border-emerald-500/50 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-2xl border-2 border-white/40 shrink-0">
              <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-slate-950" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  GAAIA AI Assistant
                </h1>
                <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2.5 py-0.5 rounded-full text-xs font-bold">
                  గాయియా • गाइया
                </span>
                <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-black shadow-xs">
                  24x7 Live
                </span>
              </div>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium mt-1 max-w-2xl">
                Green Agricultural Artificial Intelligence Assistant: Authoritative guidance on cold storage temperatures, e-NWR pledge loans, farm transport rental & mandi prices.
              </p>
            </div>
          </div>

          {/* Right: Quick Portal Stats */}
          <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-emerald-400/30 text-center min-w-[100px]">
              <div className="text-xl font-black text-amber-300">77+</div>
              <div className="text-[11px] font-semibold text-emerald-200">Crops Stored</div>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-emerald-400/30 text-center min-w-[100px]">
              <div className="text-xl font-black text-emerald-300">12 Hubs</div>
              <div className="text-[11px] font-semibold text-emerald-200">WDRA Vaults</div>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-emerald-400/30 text-center min-w-[100px]">
              <div className="text-xl font-black text-teal-300">20%</div>
              <div className="text-[11px] font-semibold text-emerald-200">Fleet Subsidy</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KNOWLEDGE TOPICS EXPLORER */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Explore Knowledge Areas</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Tap any topic to ask Gaaia
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GAAIA_TOPICS.map((topic) => {
            const Icon = TOPIC_ICONS[topic.id] || HelpCircle;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleSend(`Tell me all details about ${topic.title.replace(/[^a-zA-Z ]/g, '')}`)}
                className="text-left bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/60 transition group cursor-pointer hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 line-clamp-1">
                  {topic.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-tight">
                  {topic.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE CONVERSATION THREAD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border-2 border-emerald-500/30 overflow-hidden flex flex-col h-[650px]">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-[#032e18] via-[#064e29] to-[#022413] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg border border-white/30 shrink-0">
              <Bot className="w-6 h-6 text-slate-950" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#032e18]" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-wide text-white flex items-center space-x-2">
                <span>GAAIA Interactive Console</span>
                <span className="text-[11px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  Voice Enabled
                </span>
              </h3>
              <p className="text-xs text-emerald-200/90 font-medium">
                Ask in English, Telugu (తెలుగు), or Hindi (हिंदी)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center space-x-1 text-xs font-bold bg-white/10 hover:bg-white/20 text-emerald-100 px-3 py-1.5 rounded-xl border border-white/20 transition cursor-pointer"
              title="Reset chat conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50 dark:bg-slate-950/70">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-sm text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-br-none shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-bl-none shadow-lg'
                }`}
              >
                {msg.topic && (
                  <div className="mb-2 pb-1.5 border-b border-emerald-500/20 flex items-center justify-between text-xs font-black text-emerald-700 dark:text-emerald-400">
                    <span>{msg.title || 'Agricultural Advisory'}</span>
                    <span className="text-[11px] font-mono text-slate-400">{msg.timestamp}</span>
                  </div>
                )}

                <div className="space-y-2 whitespace-pre-line text-xs sm:text-sm">
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                      return (
                        <div key={idx} className="flex items-start space-x-2 pl-1">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: line.replace(/^[•-]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }}
                          />
                        </div>
                      );
                    }
                    return (
                      <p
                        key={idx}
                        dangerouslySetInnerHTML={{
                          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }}
                      />
                    );
                  })}
                </div>

                {/* Direct Action Links */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleActionClick(act)}
                        className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 flex items-center space-x-1.5 transition cursor-pointer hover:scale-105"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Utility Row for Bot Response */}
              {msg.sender === 'bot' && (
                <div className="flex items-center space-x-3 mt-1.5 px-2 text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => handleSpeak(msg.id, msg.text)}
                    className={`flex items-center space-x-1 hover:text-emerald-600 transition cursor-pointer ${
                      speakingMessageId === msg.id ? 'text-emerald-600 font-bold animate-pulse' : ''
                    }`}
                    title="Listen to response"
                  >
                    {speakingMessageId === msg.id ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen Aloud</span>
                      </>
                    )}
                  </button>

                  <span>•</span>

                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="flex items-center space-x-1 hover:text-emerald-600 transition cursor-pointer"
                    title="Copy response text"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl rounded-bl-none w-32 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs font-semibold text-slate-400 ml-1">Analyzing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Popular Quick Questions Bar */}
        <div className="p-2.5 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex space-x-2 no-scrollbar shrink-0">
          <span className="text-xs font-black text-slate-600 dark:text-slate-300 flex items-center space-x-1 shrink-0 px-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Suggested:</span>
          </span>
          {POPULAR_QUESTIONS.slice(0, 5).map((qObj, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(qObj.q)}
              className="text-xs whitespace-nowrap bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-300/80 dark:border-slate-700 shadow-xs font-semibold transition cursor-pointer hover:border-emerald-400 shrink-0"
            >
              {qObj.q}
            </button>
          ))}
        </div>

        {/* Chat Input Console */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-3 shrink-0"
        >
          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-3 rounded-2xl transition cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-lg'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Tap to speak your question'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              isListening
                ? 'Listening to your speech... Speak now!'
                : 'Ask Gaaia anything (e.g. storage temperature for chillies, e-NWR 75% loan, tractor rental...)'
            }
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 dark:border-slate-700"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-2xl font-black text-sm shadow-md transition cursor-pointer hover:scale-105 active:scale-95 flex items-center space-x-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Gaaia</span>
          </button>
        </form>
      </div>

      {/* 4. HELPLINE & EMBEDDED SUPPORT BANNER */}
      <div className="bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950/40 p-4 sm:p-5 rounded-3xl border border-amber-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-800 dark:text-amber-300 shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Prefer Telephone Support?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Our rural Kisan Call Centre experts are available 24x7 in all scheduled Indian languages.
            </p>
          </div>
        </div>

        <a
          href="tel:18001801551"
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-md transition flex items-center space-x-2"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Toll-Free: 1800-180-1551</span>
        </a>
      </div>
    </div>
  );
}
