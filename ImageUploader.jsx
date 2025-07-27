import React, { useState, useRef } from 'react';

const API_URL = 'https://us-central1-kisan-app-prod.cloudfunctions.net/api';

function ImageUploader({ lang }) {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1]; // Remove data:image/... prefix

      setLoading(true);
      setResponse('');

      try {
        const res = await fetch(`${API_URL}/crop-diagnosis`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageBase64: base64Image,
            cropType: 'நெல்', // You can replace with user input if needed
          }),
        });

        const data = await res.json();

        const replyText = `${data.disease}\n${data.solution}`;
        setResponse(replyText);

        // 🔊 Optional: Play audio if your backend later supports /tts
        // const audioRes = await fetch(
        //   `${API_URL}/tts?text=${encodeURIComponent(replyText)}&lang=${lang}`
        // );
        // const ttsBlob = await audioRes.blob();
        // const audioUrl = URL.createObjectURL(ttsBlob);
        // audioRef.current.src = audioUrl;
        // audioRef.current.play();

      } catch (error) {
        console.error('Error during diagnosis:', error);
        setResponse(lang === 'ta' ? 'பிழை ஏற்பட்டது' : 'Something went wrong');
      }

      setLoading(false);
    };

    reader.readAsDataURL(image);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded shadow-md">
      <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
      
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {lang === 'ta' ? 'படத்தை அனுப்புக' : 'Submit Photo'}
      </button>

      {loading && (
        <div className="text-sm text-gray-500">
          {lang === 'ta' ? 'பயிர் நோய்களை ஆராய்கிறது...' : 'Analyzing crop disease...'}
        </div>
      )}

      {response && !loading && (
        <div className="bg-green-100 text-green-800 p-3 rounded border border-green-400 text-sm whitespace-pre-wrap">
          {response}
        </div>
      )}

      <audio ref={audioRef} hidden controls />
    </div>
  );
}

export default ImageUploader;
