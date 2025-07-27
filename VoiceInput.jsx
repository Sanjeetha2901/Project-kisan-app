// src/components/VoiceInput.jsx
import React from 'react';

const VoiceInput = ({ onVoiceInput }) => {
  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <button
        onClick={onVoiceInput}
        className="bg-orange-500 text-white px-6 py-2 rounded-full shadow hover:bg-orange-600"
      >
        🎤 Tap to Ask
      </button>
    </div>
  );
};

export default VoiceInput;
