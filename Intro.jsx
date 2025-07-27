// src/components/Intro.jsx
import React from 'react';

function Intro({ lang, onLaunch }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-lime-100 to-white p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full border border-green-300">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          {lang === 'ta' ? 'விவசாயியின் நண்பன்' : "Farmer's Friend"}
        </h1>
        <p className="text-gray-700 text-sm mb-6 leading-relaxed">
          {lang === 'ta'
            ? 'இந்த செயலி உங்கள் அனைத்து விவசாய சந்தேகங்களுக்கும், பயிர் நோய் கண்டறிதலுக்கும், விலை மற்றும் அரசுத் திட்ட தகவல்களுக்கும் ஒரே இடத்தில் பதில் அளிக்கிறது.'
            : 'This app helps you ask any farming questions, diagnose crop diseases, check mandi prices, and explore government schemes — all in one place.'}
        </p>

        <button
          onClick={onLaunch}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-lg shadow-md"
        >
          {lang === 'ta' ? 'தொடங்கவும்' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}

export default Intro;
