import React, { useState, useRef } from 'react';

const API_URL = 'https://voicebot-6l3c2eadjq-uc.a.run.app';

function FarmerAppUI({ lang }) {
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  const handleTextSubmit = async () => {
    if (!query.trim()) return;
    setIsLoading(true);

    const response = await fetch(`${API_URL}/voiceBot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: query, lang }),
    });

    const data = await response.json();
    setReply(data.reply || 'No reply received');

    // Text-to-Speech
    const audioRes = await fetch(`${API_URL}/tts?text=${encodeURIComponent(data.reply)}&lang=${lang}`);
    const blob = await audioRes.blob();
    const url = URL.createObjectURL(blob);
    audioRef.current.src = url;
    audioRef.current.play();

    setIsLoading(false);
  };

  const handleVoiceInput = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('lang', lang);

      setIsLoading(true);

      const res = await fetch(`${API_URL}/voiceBot`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setReply(data.reply || 'No reply received');

      const audioRes = await fetch(`${API_URL}/tts?text=${encodeURIComponent(data.reply)}&lang=${lang}`);
      const blob = await audioRes.blob();
      const url = URL.createObjectURL(blob);
      audioRef.current.src = url;
      audioRef.current.play();

      setIsLoading(false);
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 5000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-lg font-bold mb-2">
        {lang === 'ta' ? '🤖 உங்கள் கேள்விகளை கேளுங்கள்' : '🤖 Ask Anything - Your AI Agent'}
      </h2>
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder={lang === 'ta' ? 'உங்கள் கேள்வியை உள்ளிடவும்' : 'Type your question'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleTextSubmit}>
          {lang === 'ta' ? 'அனுப்பு' : 'Send'}
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleVoiceInput}>
          🎤
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">{lang === 'ta' ? 'பதிலை ஏற்றுகிறது...' : 'Loading reply...'}</p>
      ) : (
        reply && (
          <div className="bg-green-100 text-green-800 p-3 rounded text-sm whitespace-pre-wrap">
            {reply}
          </div>
        )
      )}

      <audio ref={audioRef} hidden controls />
    </div>
  );
}

export default FarmerAppUI;
