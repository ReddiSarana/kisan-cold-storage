import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { askGaaia, fetchGaaiaTopics } from '../services/api';
import { POPULAR_QUESTIONS } from '../services/gaaiaBrain';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
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
  FileText
} from 'lucide-react';

export default function GaaiaBotWidget() {
  const {
    isGaaiaOpen,
    openGaaia,
    closeGaaia,
    toggleGaaia,
    gaaiaInitialQuery,
    setGaaiaInitialQuery,
    setActiveTab,
    currentUser
  } = useApp();

  const { currentLanguage, t } = useLanguage();

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `🌱 **Namaste! I am Gaaia (గాయియా / गाइया), your Agricultural AI Companion.**

Ask me anything about:
• ❄️ **Cold Storage:** Ideal temperatures, humidity & storage durations for 77+ crops.
• 📄 **e-NWR Bank Loans:** Getting 75% low-interest loans without distress sale.
• 🚜 **Transport Rental:** Booking tractors & trucks with 20% Rythu Bandhu subsidy.
• 💳 **Payment:** Paying 25% advance online via UPI, KCC or NetBanking.

*How can I assist your farming today?*`,
      actions: [
        { label: '❄️ Red Chilli Temp', query: 'What is the temperature to store Red Chillies?' },
        { label: '📄 75% e-NWR Loan', query: 'How to get a 75% bank loan on e-NWR?' },
        { label: '🚜 20% Transport Subsidy', query: 'How to book tractor with 20% subsidy?' },
        { label: '💳 25% Advance Booking', query: 'Can I pay only 25% advance for cold storage?' }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const speechRecognitionRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isGaaiaOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isGaaiaOpen]);

  // If opened with an initial query from another component
  useEffect(() => {
    if (gaaiaInitialQuery && isGaaiaOpen) {
      handleSend(gaaiaInitialQuery);
      setGaaiaInitialQuery('');
    }
  }, [gaaiaInitialQuery, isGaaiaOpen]);

  // Initialize Speech Recognition (Web Speech API)
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

  // Toggle Voice Input
  const toggleSpeechRecognition = () => {
    if (!speechRecognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
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

  // Text-To-Speech Synthesis
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

  // Copy message text
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Send Query to Gaaia
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
          text: 'I apologize, an error occurred while connecting to the knowledge base. Please try asking again or call the Kisan Toll-Free Helpline at **1800-180-1551**.',
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

  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: `🌱 **Chat reset! I am ready for your next question.**

Feel free to ask about crop cold storage temperatures, bank loans on warehouse receipts, or transport rental.`,
        actions: [
          { label: '❄️ Red Chilli Temp', query: 'What is the temperature to store Red Chillies?' },
          { label: '📄 75% e-NWR Loan', query: 'How to get a 75% bank loan on e-NWR?' },
          { label: '🚜 20% Transport Subsidy', query: 'How to book tractor with 20% subsidy?' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Don't render inside mobile preview iframe if query param is set
  const isInsideIframe = typeof window !== 'undefined' && window.location.search.includes('mobile_preview=1');

  return (
    <>
      {/* 1. FLOATING LAUNCHER BUTTON (Bottom-Right) */}
      {!isGaaiaOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex items-center group">
          {/* Tooltip hint pill */}
          <div className="hidden sm:flex items-center space-x-1.5 mr-2 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl border border-emerald-500/40 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Ask Gaaia AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Glowing Circular Orb Button */}
          <button
            type="button"
            onClick={openGaaia}
            aria-label="Open Gaaia AI Assistant"
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 text-white shadow-[0_8px_30px_rgba(5,150,105,0.45)] border-2 border-emerald-300/80 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {/* Pulsing ring */}
            <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
            <div className="relative flex flex-col items-center justify-center">
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md" />
              <span className="text-[9px] font-black tracking-tighter uppercase text-emerald-200">GAAIA</span>
            </div>
            {/* Status dot */}
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-sm" />
          </button>
        </div>
      )}

      {/* 2. EXPANDED FLOATING CHAT CARD */}
      {isGaaiaOpen && (
        <div
          role="dialog"
          aria-label="Gaaia AI Agricultural Chat"
          className="fixed bottom-2 md:bottom-6 right-2 sm:right-6 z-50 w-[calc(100vw-16px)] sm:w-[420px] md:w-[460px] h-[600px] max-h-[calc(100vh-80px)] bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] border-2 border-emerald-500/50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header Bar */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#032e18] via-[#064e29] to-[#022413] text-white flex items-center justify-between border-b border-emerald-600/40 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg border border-white/30 shrink-0">
                <Bot className="w-6 h-6 text-slate-950" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#032e18]" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-base font-black tracking-wide text-white flex items-center space-x-1">
                    <span>GAAIA AI</span>
                    <span className="text-xs text-amber-300 font-mono">24x7</span>
                  </h3>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-1.5 py-0.2 rounded-md font-bold">
                    Kisan Bot
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/90 font-medium truncate max-w-[200px]">
                  {currentUser ? `Serving: ${currentUser.name}` : 'Agricultural & Cold Chain Assistant'}
                </p>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center space-x-1 text-emerald-100">
              {/* Reset chat */}
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 hover:bg-white/15 rounded-xl transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Maximize to dedicated dashboard page */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('gaaia');
                  closeGaaia();
                }}
                title="Open in Full Dashboard View"
                className="p-1.5 hover:bg-white/15 rounded-xl transition cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={closeGaaia}
                title="Close chat window"
                className="p-1.5 hover:bg-white/15 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Viewport */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 bg-slate-50 dark:bg-slate-950/80 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] rounded-2xl p-3 sm:p-3.5 shadow-sm text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-bl-none shadow-md'
                  }`}
                >
                  {/* Topic badge if available */}
                  {msg.topic && (
                    <div className="mb-1.5 pb-1 border-b border-emerald-500/20 flex items-center justify-between text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                      <span>{msg.title || 'Agricultural Advisory'}</span>
                      <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Message body with basic markdown line formatting */}
                  <div className="space-y-1.5 whitespace-pre-line">
                    {msg.text.split('\n').map((line, idx) => {
                      // Highlight bullet points
                      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                        return (
                          <div key={idx} className="flex items-start space-x-1.5 pl-1 text-[12px] sm:text-xs">
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

                  {/* Interactive CTA buttons in bot message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 flex items-center space-x-1 transition cursor-pointer hover:scale-105"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-600" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer utility row for bot messages (Audio speak + Copy) */}
                {msg.sender === 'bot' && (
                  <div className="flex items-center space-x-2 mt-1 px-1 text-[11px] text-slate-400">
                    <button
                      type="button"
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className={`flex items-center space-x-1 hover:text-emerald-600 transition cursor-pointer ${
                        speakingMessageId === msg.id ? 'text-emerald-600 font-bold animate-pulse' : ''
                      }`}
                      title="Read aloud in your language"
                    >
                      {speakingMessageId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
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

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl rounded-bl-none w-28 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs font-semibold text-slate-400 ml-1">Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex space-x-1.5 no-scrollbar shrink-0">
            {[
              { label: '🌶️ Red Chilli Temp', q: 'What is the temperature to store Red Chillies?' },
              { label: '🌿 Turmeric Storage', q: 'How to store Turmeric in cold storage?' },
              { label: '🧅 Onion Storage', q: 'What temperature for storing onions without sprouting?' },
              { label: '📄 75% e-NWR Loan', q: 'How to pledge e-NWR for a bank loan?' },
              { label: '🚜 20% Transport Subsidy', q: 'How to book a tractor with 20% subsidy?' },
              { label: '💳 25% Advance Payment', q: 'Can I pay only 25% advance for cold storage?' }
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip.q)}
                className="text-[11px] whitespace-nowrap bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-full border border-slate-300/80 dark:border-slate-700 shadow-xs font-semibold transition cursor-pointer hover:border-emerald-400 shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Control Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 sm:p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2 shrink-0"
          >
            {/* Voice input mic button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-2xl transition cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Tap to speak your question'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Query Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                isListening
                  ? 'Listening to your voice...'
                  : 'Ask Gaaia: storage temp, loans, transport...'
              }
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 dark:border-slate-700"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-2xl shadow-md transition cursor-pointer hover:scale-105 active:scale-95"
              title="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
