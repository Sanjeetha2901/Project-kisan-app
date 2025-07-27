// src/components/Header.jsx
import React from 'react';

function Header({ lang, onLangToggle }) {
  return (
    <div className="bg-green-700 text-white p-4 flex items-center justify-between rounded-b-xl shadow-md">
      <div>
        <h1 className="text-lg font-bold">
          {lang === 'ta' ? '👨🏽‍🌾 விவசாயியின் நண்பன்' : '👨🏽‍🌾 Farmer’s Friend'}
        </h1>
        <p className="text-xs text-green-100">
          {lang === 'ta'
            ? 'உங்கள் அத்தியாவசிய தேவை அனைத்திற்கும் ஒரு தோழன்'
            : 'Your trusted friend for all farming needs'}
        </p>
      </div>

      <button
        onClick={onLangToggle}
        className="bg-white text-green-800 px-3 py-1 rounded shadow text-xs font-semibold hover:bg-gray-100"
      >
        {lang === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாற்று'}
      </button>
    </div>
  );
}

export default Header;
