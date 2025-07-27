// src/components/Dashboard.jsx
import React from 'react';
import ChatBar from './ChatBar';
import ImageUploader from './ImageUploader';
import MandiPrices from './MandiPrices';
import SchemeAssistant from './SchemeAssistant';
import AlertsSection from './AlertsSection';

function Dashboard({ lang }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white text-gray-800">
      {/* Header */}
      <div className="p-4 bg-green-700 text-white text-center text-2xl font-bold shadow-md">
        🌾 {lang === 'ta' ? 'விவசாயியின் நண்பன்' : "Farmer's Friend"} 🌾
      </div>

      {/* Content Sections */}
      <div className="p-4 space-y-8 max-w-5xl mx-auto">
        {/* Section 1: Ask by Voice or Text */}
        <section className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
          <h2 className="text-lg font-semibold mb-2">
            🎤 {lang === 'ta' ? 'ஏதேனும் கேளுங்கள் (குரல் அல்லது உரை)' : 'Ask Anything (Voice or Text)'}
          </h2>
          <ChatBar lang={lang} />
        </section>

        {/* Section 2: Crop Disease Diagnosis */}
        <section className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500">
          <h2 className="text-lg font-semibold mb-2">
            🌿 {lang === 'ta' ? 'பயிர் நோய் கண்டறிதல்' : 'Crop Disease Diagnosis'}
          </h2>
          <ImageUploader lang={lang} />
        </section>

        {/* Section 3: Mandi Prices */}
        <section className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold mb-2">
            📈 {lang === 'ta' ? 'மார்க்கெட் விலைகள்' : 'Mandi Prices'}
          </h2>
          <MandiPrices lang={lang} />
        </section>

        {/* Section 4: Government Schemes */}
        <section className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold mb-2">
            🏛️ {lang === 'ta' ? 'அரசுத் திட்டங்கள்' : 'Government Schemes'}
          </h2>
          <SchemeAssistant lang={lang} />
        </section>

        {/* Section 5: Real-Time Alerts */}
        <section className="bg-white p-4 rounded-xl shadow-md border-l-4 border-purple-500">
          <h2 className="text-lg font-semibold mb-2">
            🚨 {lang === 'ta' ? 'உடனடி அறிவிப்புகள்' : 'Real-Time Alerts'}
          </h2>
          <AlertsSection lang={lang} />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
