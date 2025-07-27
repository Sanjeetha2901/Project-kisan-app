// src/components/ChatBar.jsx
import React, { useState, useRef } from 'react';

const API_URL = 'https://us-central1-kisan-app-prod.cloudfunctions.net/api';

function ChatBar({ lang = "ta" }) {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [listening, setListening] = useState(false);
  const audioRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const res = await fetch(`${API_URL}/voiceBot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: input,
        sessionId: 'session_jury_live'
      })
    });

    const data = await res.json();
    setReply(data.text || 'No response');

    // Optional: fetch TTS audio if needed
    // const audioRes = await fetch(`${API_URL}/tts?text=${encodeURIComponent(data.text)}&lang=${lang}`);
    // const audioBlob = await audioRes.blob();
    // const audioUrl = URL.createObjectURL(audioBlob);
    // audioRef.current.src = audioUrl;
    // audioRef.current.play();

    setInput('');
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl w-full max-w-xl mx-auto">
      <div className="flex gap-2 items-center">
        <input
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg"
          type="text"
          placeholder={lang === 'ta' ? "உங்கள் கேள்வியை உள்ளிடவும்..." : "Ask your question..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleVoiceInput}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          🎤
        </button>
        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          {lang === 'ta' ? "அனுப்பு" : "Send"}
        </button>
      </div>

      {reply && (
        <div className="mt-4 bg-green-100 border border-green-300 text-sm p-3 rounded">
          {reply}
        </div>
      )}

      <audio ref={audioRef} hidden controls />
    </div>
  );
}

export default ChatBar;
