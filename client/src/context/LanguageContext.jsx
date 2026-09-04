import React, { createContext, useContext, useState, useEffect } from 'react';
import { INDIAN_LANGUAGES, UI_TRANSLATIONS } from '../data/languages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(() => {
    return localStorage.getItem('kisan_lang') || 'en';
  });
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const currentLanguage = INDIAN_LANGUAGES.find(l => l.code === selectedLanguageCode) || INDIAN_LANGUAGES[0];

  // Sync Google Translate on mount or whenever selected language code changes
  useEffect(() => {
    const code = selectedLanguageCode;
    const domain = window.location.hostname;

    if (code === 'en') {
      // Clear translate cookies for English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
    } else {
      // Set /en/code format cookie for Google Translate
      document.cookie = `googtrans=/en/${code}; path=/;`;
      document.cookie = `googtrans=/en/${code}; path=/; domain=${domain};`;
      if (domain !== 'localhost' && !domain.startsWith('127.0.0.1')) {
        document.cookie = `googtrans=/en/${code}; path=/; domain=.${domain};`;
      }
    }

    // Trigger Google Translate dropdown if available in DOM
    const combo = document.querySelector('select.goog-te-combo');
    if (combo && combo.value !== code) {
      combo.value = code;
      combo.dispatchEvent(new Event('change'));
    }
  }, [selectedLanguageCode]);

  const changeLanguage = (code) => {
    setSelectedLanguageCode(code);
    localStorage.setItem('kisan_lang', code);

    const domain = window.location.hostname;
    if (code === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
    } else {
      document.cookie = `googtrans=/en/${code}; path=/;`;
      document.cookie = `googtrans=/en/${code}; path=/; domain=${domain};`;
      if (domain !== 'localhost' && !domain.startsWith('127.0.0.1')) {
        document.cookie = `googtrans=/en/${code}; path=/; domain=.${domain};`;
      }
    }

    // Try triggering Google translate combo in DOM
    const combo = document.querySelector('select.goog-te-combo');
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event('change'));
    }

    // Reload the page smoothly so that Google Translate immediately parses and translates the ENTIRE website DOM
    setTimeout(() => {
      window.location.reload();
    }, 180);
  };

  // Translation lookup helper
  const t = (key, fallback = '') => {
    if (!key) return '';
    const langDict = UI_TRANSLATIONS[selectedLanguageCode];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const englishDict = UI_TRANSLATIONS['en'];
    if (englishDict && englishDict[key]) {
      return englishDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        languages: INDIAN_LANGUAGES,
        currentLanguage,
        selectedLanguageCode,
        changeLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
