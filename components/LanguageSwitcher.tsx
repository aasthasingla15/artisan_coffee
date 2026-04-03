'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          i18n.language === 'en'
            ? 'bg-[#4F9C8F] text-white'
            : 'bg-[#2D1810] text-[#C9B8A0] hover:bg-[#3D2820]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          i18n.language === 'es'
            ? 'bg-[#4F9C8F] text-white'
            : 'bg-[#2D1810] text-[#C9B8A0] hover:bg-[#3D2820]'
        }`}
      >
        ES
      </button>
    </div>
  );
}