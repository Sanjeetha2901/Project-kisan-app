import React, { useState, useRef } from 'react';

const API_URL = 'https://voicebot-6l3c2eadjq-uc.a.run.app';

function CropDiagnosisCard({ lang }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async () => {
    if (!image) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('lang', lang);

    const res = await fetch(`${API_URL}/imageDiagnosis`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    const reply = data.reply || 'No diagnosis result';
    setResult(reply);

    const audioRes = await fetch(`${API_URL}/tts?text=${encodeURIComponent(reply)}&lang=${lang}`);
    const audioBlob = await audioRes.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.current.src = audioUrl;
    audioRef.current.play();

    setIsLoading(false);
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white mt-4">
      <h2 className="text-lg font-semibold mb-2">
        🌿 {lang === 'ta' ? 'விவசாயம் நோய் கண்டறிதல்' : 'Crop Disease Diagnosis'}
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded mb-2"
      >
        {lang === 'ta' ? 'படத்தை அனுப்பவும்' : 'Submit Image'}
      </button>

      {isLoading && (
        <p className="text-sm text-gray-500">
          {lang === 'ta' ? 'பதிலை பெறுகிறது...' : 'Diagnosing...'}
        </p>
      )}

      {result && (
        <div className="bg-lime-100 p-3 rounded text-sm text-green-800 whitespace-pre-wrap">
          {result}
        </div>
      )}

      <audio ref={audioRef} hidden controls />
    </div>
  );
}

export default CropDiagnosisCard;
