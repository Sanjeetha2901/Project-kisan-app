
import React, { useState } from "react";
import { FaMicrophone, FaCheckCircle, FaCamera } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";

const schemes = {
  ta: "பிரதம மந்திரி-Kisan (PM-Kisan) என்பது சிறு விவசாயக் குடும்பங்களுக்கு ரூ. ச. 6,000 நிதி உதவியை ஆண்டுக்கு உத்தேசிக்கும் ஒரு மத்திய அரசுத் திட்டம்.",
  en: "Pradhan Mantri Kisan (PM-Kisan) is a central government scheme providing ₹6,000 annual financial support to small farmer families.",
};

const weather = {
  ta: "சென்னையில் இப்போது வழிமான நிலைமையா உள்ளது.",
  en: "Chennai is currently experiencing cloudy weather.",
};

const mandi = {
  ta: "அரிசி – ₹3050/வெளி, முறைக்கழி – ₹4200/வெளி",
  en: "Rice – ₹3050/qtl, Groundnut – ₹4200/qtl",
};

export default function App() {
  const [lang, setLang] = useState("ta");
  const [query, setQuery] = useState("");

  const toggleLang = () => {
    setLang((prev) => (prev === "ta" ? "en" : "ta"));
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-green-900">Project Kisan</h1>
        <button
          onClick={toggleLang}
          className="border px-3 py-1 rounded bg-white hover:bg-gray-100"
        >
          {lang === "ta" ? "English" : "தமிழ்"}
        </button>
      </div>

      <input
        className="w-full p-3 rounded border border-green-300 mb-3 text-lg"
        type="text"
        placeholder={
          lang === "ta"
            ? "ஒரு விவசாயத் திட்டத்தைப் பற்றிக் கேளுங்கள்"
            : "Ask about a farming scheme"
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <button className="flex-1 bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2">
          <FaMicrophone /> {lang === "ta" ? "பேசவும்" : "Speak"}
        </button>
        <button className="flex-1 bg-yellow-500 text-white py-2 rounded flex items-center justify-center gap-2">
          <FaCheckCircle /> {lang === "ta" ? "சமர்ப்பிக்கவும்" : "Submit"}
        </button>
        <button className="flex-1 bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2">
          <FaCamera /> {lang === "ta" ? "பதிவேற்று" : "Upload"}
        </button>
      </div>

      <div className="bg-white rounded p-4 shadow mb-4 text-lg">
        {schemes[lang]}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="bg-white p-3 rounded shadow">
          <p>🌥️ {lang === "ta" ? "மேகம், 30°C" : "Cloudy, 30°C"}</p>
          <p>{weather[lang]}</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p>📈 {lang === "ta" ? "மண்பு விலை" : "Mandi Prices"}</p>
          <p>{mandi[lang]}</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p>🏛️ {lang === "ta" ? "அரசு திட்டங்கள்" : "Govt Schemes"}</p>
          <p>{mandi[lang]}</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <p>🏛️ {lang === "ta" ? "அரகு திட்டங்கள்" : "Govt Details"}</p>
          <p>{schemes[lang]}</p>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-500 mt-6">
        🌾 Project Kisan - Powered by Gemini + Firebase
      </footer>
    </div>
  );
}
