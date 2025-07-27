import React, { useState, useRef } from 'react';

const API_URL = 'https://voicebot-6l3c2eadjq-uc.a.run.app';

function CropAdvisor({ lang }) {
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const audioRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async () => {
    if (!query.trim() && !image) return;
    setIsLoading(true);

    const formData = new FormData();
    if (query) formData.append('prompt', query);
    if (image) formData.append('image', image);
    formData.append('lang', lang);

    const res = await fetch(`${API_URL}/imageDiagnosis`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const responseText = data.reply || 'No reply received.';
    setReply(responseText);

    const ttsRes = await fetch(`${API_URL}/tts?text=${encodeURIComponent(responseText)}&lang=${lang}`);
    const audioBlob = await ttsRes.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.current.src = audioUrl;
    audioRef.current.play();

    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">
        🌾 {lang === 'ta' ? 'பயிர் ஆலோசகர் மற்றும் பூச்சி எச்சரிக்கை' : 'Crop Advisor & Pest Warning'}
      </h2>

      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        placeholder={lang === 'ta' ? 'கேள்வியை உள்ளிடவும்' : 'Ask a crop question'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        disabled={isLoading}
      >
        {isLoading
          ? lang === 'ta' ? 'காத்திருக்கிறது...' : 'Processing...'
          : lang === 'ta' ? 'அனுப்பு' : 'Submit'}
      </button>

      {reply && (
        <div className="mt-4 bg-green-100 text-sm p-3 rounded shadow">
          {reply}
        </div>
      )}

      <audio ref={audioRef} hidden controls />
    </div>
  );
}

export default CropAdvisor;
