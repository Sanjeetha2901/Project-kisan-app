// src/components/MandiPrices.jsx
import React, { useEffect, useState, useRef } from 'react';

const API_URL = 'https://voicebot-6l3c2eadjq-uc.a.run.app';

function MandiPrices({ lang }) {
  const [prices, setPrices] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);

      const res = await fetch(`${API_URL}/mandi-prices?lang=${lang}`);
      const data = await res.json();

      const reply = data.reply || 'No data received';
      setPrices(reply);

      // Speak response
      const audioRes = await fetch(
        `${API_URL}/tts?text=${encodeURIComponent(reply)}&lang=${lang}`
      );
      const blob = await audioRes.blob();
      const audioUrl = URL.createObjectURL(blob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();

      setLoading(false);
    };

    fetchPrices();
  }, [lang]);

  return (
    <div className="bg-yellow-50 border border-yellow-400 p-4 rounded">
      {loading ? (
        <div className="text-sm text-yellow-600">
          {lang === 'ta' ? 'விலை விவரங்கள் பெறப்படுகிறது...' : 'Fetching price details...'}
        </div>
      ) : (
        <p className="text-sm text-yellow-800 whitespace-pre-wrap">{prices}</p>
      )}
      <audio ref={audioRef} hidden controls />
    </div>
  );
}

export default MandiPrices;
