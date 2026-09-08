import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const { selectedLanguageCode } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [tapToReadEnabled, setTapToReadEnabledState] = useState(() => {
    return localStorage.getItem('kisan_tap_to_read') === 'true'; // Default is false
  });
  const [rate, setRate] = useState(0.95);
  const [voices, setVoices] = useState([]);
  const [isBarMinimized, setIsBarMinimizedState] = useState(() => {
    return localStorage.getItem('kisan_voice_bar_minimized') !== 'false'; // Default is minimized
  });

  const setTapToReadEnabled = (val) => {
    setTapToReadEnabledState(val);
    try {
      localStorage.setItem('kisan_tap_to_read', String(val));
    } catch {}
    if (!val) stop();
  };

  const setIsBarMinimized = (val) => {
    setIsBarMinimizedState(val);
    try {
      localStorage.setItem('kisan_voice_bar_minimized', String(val));
    } catch {}
  };

  const queueRef = useRef([]);
  const isQueueProcessingRef = useRef(false);
  const highlightedElRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // Initialize audio player
  useEffect(() => {
    audioPlayerRef.current = new Audio();
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
    };
  }, []);

  // Populate browser speech synthesis voices if available
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setVoices(v);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Check if text contains Indian non-Latin script characters (Telugu, Hindi, Tamil, etc.)
  const hasIndianScript = (text) => {
    if (!text) return false;
    return /[\u0900-\u0D7F]/.test(text);
  };

  // Find best matching voice in browser
  const getBestVoice = (langCode) => {
    if (!voices || voices.length === 0) return null;
    const targetLang = (langCode || selectedLanguageCode || 'en').toLowerCase();

    // Exact match
    let match = voices.find(v => v.lang.toLowerCase().startsWith(targetLang));
    if (match) return match;

    if (targetLang === 'te') {
      match = voices.find(v => v.name.toLowerCase().includes('telugu') || v.lang.includes('te'));
      if (match) return match;
    }
    if (targetLang === 'hi') {
      match = voices.find(v => v.name.toLowerCase().includes('hindi') || v.lang.includes('hi'));
      if (match) return match;
    }

    match = voices.find(v => v.lang === 'en-IN' || v.name.includes('India'));
    if (match) return match;

    return voices.find(v => v.default) || voices[0];
  };

  // Clean raw text
  const sanitizeText = (text) => {
    if (!text) return '';
    return text
      .replace(/[•\t\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Stop current speech and clear any queued utterances
  const stop = () => {
    queueRef.current = [];
    isQueueProcessingRef.current = false;

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
    setCurrentText('');

    if (highlightedElRef.current) {
      highlightedElRef.current.classList.remove('voice-reading-active');
      highlightedElRef.current = null;
    }
  };

  // Fallback to browser SpeechSynthesis
  const speakWithSynthesis = (clean, voice, item) => {
    if (!('speechSynthesis' in window)) {
      processNextInQueue();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = selectedLanguageCode === 'te' ? 'te-IN' : (selectedLanguageCode === 'hi' ? 'hi-IN' : 'en-IN');
    }

    utterance.rate = rate;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentText(clean);
      if (item.element) {
        if (highlightedElRef.current) {
          highlightedElRef.current.classList.remove('voice-reading-active');
        }
        highlightedElRef.current = item.element;
        item.element.classList.add('voice-reading-active');
      }
    };

    utterance.onend = () => {
      if (item.element) {
        item.element.classList.remove('voice-reading-active');
      }
      setTimeout(() => {
        processNextInQueue();
      }, 120);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (item.element) {
        item.element.classList.remove('voice-reading-active');
      }
      processNextInQueue();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Process sequential sentence queue
  const processNextInQueue = () => {
    if (queueRef.current.length === 0) {
      isQueueProcessingRef.current = false;
      setIsSpeaking(false);
      setCurrentText('');
      if (highlightedElRef.current) {
        highlightedElRef.current.classList.remove('voice-reading-active');
        highlightedElRef.current = null;
      }
      return;
    }

    isQueueProcessingRef.current = true;
    const item = queueRef.current.shift();
    const clean = sanitizeText(item.text);

    if (!clean) {
      processNextInQueue();
      return;
    }

    const targetLang = (item.lang || selectedLanguageCode || 'te').toLowerCase();
    const containsRegional = hasIndianScript(clean) || targetLang !== 'en';
    const voice = getBestVoice(targetLang);

    // Has true browser voice for regional language?
    const hasTrueBrowserVoice = voice && (
      voice.lang.toLowerCase().startsWith(targetLang) ||
      (targetLang === 'te' && voice.name.toLowerCase().includes('telugu')) ||
      (targetLang === 'hi' && voice.name.toLowerCase().includes('hindi'))
    );

    // If regional language text and no dedicated browser voice, OR anytime regional script is present:
    // Use the native /api/tts high-definition audio stream so it reads ALL Telugu/Hindi words properly!
    if (containsRegional || !hasTrueBrowserVoice) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      // Encode first 200 chars for streaming TTS
      const encoded = encodeURIComponent(clean.slice(0, 200));
      const ttsUrl = `/api/tts?text=${encoded}&lang=${targetLang}`;

      const audio = audioPlayerRef.current || new Audio();
      audioPlayerRef.current = audio;
      audio.src = ttsUrl;
      audio.playbackRate = rate;

      audio.onplay = () => {
        setIsSpeaking(true);
        setCurrentText(clean);
        if (item.element) {
          if (highlightedElRef.current) {
            highlightedElRef.current.classList.remove('voice-reading-active');
          }
          highlightedElRef.current = item.element;
          item.element.classList.add('voice-reading-active');
        }
      };

      audio.onended = () => {
        if (item.element) {
          item.element.classList.remove('voice-reading-active');
        }
        setTimeout(() => {
          processNextInQueue();
        }, 120);
      };

      audio.onerror = (e) => {
        console.warn('Native TTS audio stream error, falling back to synthesis:', e);
        speakWithSynthesis(clean, voice, item);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play prevented, attempting synthesis fallback:', err);
          speakWithSynthesis(clean, voice, item);
        });
      }
    } else {
      // Pure English with native English voice
      speakWithSynthesis(clean, voice, item);
    }
  };

  // Speak a single phrase or sentence immediately
  const speak = (text, lang = null, element = null) => {
    stop();
    const clean = sanitizeText(text);
    if (!clean) return;

    queueRef.current = [{ text: clean, lang, element }];
    processNextInQueue();
  };

  // Read entire visible page from top to bottom
  const readFullPage = () => {
    stop();

    const mainContainer = document.querySelector('#dashboard-main-content') || document.querySelector('main') || document.body;
    if (!mainContainer) return;

    const selectors = 'h1, h2, h3, h4, h5, p, label, li, th, td, [data-voice-text]';
    const rawElements = Array.from(mainContainer.querySelectorAll(selectors));

    const itemsToRead = [];
    rawElements.forEach((el) => {
      if (el.offsetParent === null) return;
      if (el.closest('[aria-hidden="true"]') || el.closest('#voice-controller-bar') || el.closest('button.no-voice')) return;

      const text = el.getAttribute('data-voice-text') || el.innerText || el.textContent;
      const clean = sanitizeText(text);

      if (clean && clean.length > 2 && !clean.match(/^[\d\s.,:;!?+-]+$/)) {
        const isDuplicate = itemsToRead.some(item => item.text.includes(clean) || clean.includes(item.text));
        if (!isDuplicate) {
          itemsToRead.push({ text: clean, element: el });
        }
      }
    });

    if (itemsToRead.length === 0) {
      speak('పేజీలో చదవడానికి ఏమీ లేదు');
      return;
    }

    queueRef.current = itemsToRead;
    processNextInQueue();
  };

  // Global "Tap to Read Any Line" click handler
  useEffect(() => {
    if (!tapToReadEnabled) return;

    const handlePointerUp = (event) => {
      if (event.target.closest('#voice-controller-bar')) return;
      if (event.target.closest('input') || event.target.closest('select') || event.target.closest('textarea')) return;

      const target = event.target.closest('h1, h2, h3, h4, h5, p, label, button, li, th, td, a, span, [data-voice-text]');
      if (!target) return;

      const text = target.getAttribute('data-voice-text') || target.innerText || target.textContent;
      const clean = sanitizeText(text);

      if (clean && clean.length > 1) {
        speak(clean, null, target);
      }
    };

    document.addEventListener('pointerup', handlePointerUp, { passive: true });
    return () => {
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [tapToReadEnabled, selectedLanguageCode, rate, voices]);

  return (
    <VoiceContext.Provider
      value={{
        isSpeaking,
        currentText,
        tapToReadEnabled,
        setTapToReadEnabled,
        rate,
        setRate,
        isBarMinimized,
        setIsBarMinimized,
        speak,
        stop,
        readFullPage,
        voices
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}
