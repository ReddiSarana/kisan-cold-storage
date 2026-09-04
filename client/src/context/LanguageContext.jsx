import React, { createContext, useContext, useState, useEffect } from 'react';
import { INDIAN_LANGUAGES, UI_TRANSLATIONS } from '../data/languages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(() => {
    return localStorage.getItem('kisan_lang') || 'en';
  });
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const currentLanguage = INDIAN_LANGUAGES.find(l => l.code === selectedLanguageCode) || INDIAN_LANGUAGES[0];

  // Initialize Google Translate script in DOM
  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        try {
          if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: INDIAN_LANGUAGES.map(l => l.code).join(','),
                autoDisplay: false,
                layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE
              },
              'google_translate_element'
            );
          }
        } catch (e) {
          console.warn('Google Translate initialization notice:', e);
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Ensure hidden container exists
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
  }, []);

  const changeLanguage = (code) => {
    setSelectedLanguageCode(code);
    localStorage.setItem('kisan_lang', code);

    // Apply Google Translate cookies for auto-translation
    try {
      const hostname = window.location.hostname;
      document.cookie = `googtrans=/auto/${code}; path=/;`;
      if (hostname !== 'localhost' && !hostname.startsWith('127.0.0.1')) {
        document.cookie = `googtrans=/auto/${code}; domain=.${hostname}; path=/;`;
      }

      // Update hidden Google Translate combo if already loaded
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event('change'));
      }
    } catch (err) {
      console.warn('Could not set translate cookie:', err);
    }
  };

  // Translation helper function
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
