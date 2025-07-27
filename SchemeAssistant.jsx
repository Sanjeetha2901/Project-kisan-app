// src/components/SchemeAssistant.jsx
import React, { useState, useRef } from 'react';

const API_URL = 'https://voicebot-6l3c2eadjq-uc.a.run.app';

function SchemeAssistant({ lang }) {
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const handleQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(`${API_URL}/scheme?lang=${lang}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    const answer = data.reply || 'No info received.';
    setReply(answer);

    // Speak the reply
    const audioRes = await fetch(`${API_URL}/tts?text=${encodeURIComponent(answer)}&lang=${lang}`);
    const blob = await audioRes.blob();
    const url = URL.createObjectURL(blob);
    audioRef.current.src = url;
    audioRef.current.play();

    setLoading(false);
  };

  return (
    <div className="bg-blue-50 border border-blue-400 p-4 rounded">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder={lang === 'ta' ? 'அரசுத் திட்டம் கேள்வி' : 'Ask about a scheme'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleQuery}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {lang === 'ta' ? 'அனுப்பு' : 'Send'}
        </button>
      </div>

      {loading ? (
        <div className="text-sm mt-2 text-blue-600">
          {lang === 'ta' ? 'தகவல் பெறப்படுகிறது...' : 'Fetching details...'}
        </div>
      ) : reply ? (
        <div className="mt-3 text-sm text-blue-900 whitespace-pre-wrap">
          {reply}
        </div>
      ) : null}

      <audio ref={audioRef} hidden controls />
    </div>
  );
}

export default SchemeAssistant;
