// src/components/AlertsSection.jsx
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://voicebot-6l3c2eadjq-uc.a.run.app';

function AlertsSection({ lang }) {
  const [alerts, setAlerts] = useState([]);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let storedId = localStorage.getItem('sessionId');
    if (!storedId) {
      storedId = `session_${uuidv4()}`;
      localStorage.setItem('sessionId', storedId);
    }
    setSessionId(storedId);
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    const fetchAlerts = async () => {
      try {
        const res = await fetch(`${API_URL}/alerts?sessionId=${sessionId}&lang=${lang}`);
        const data = await res.json();
        setAlerts(data.alerts || []);
      } catch (err) {
        console.error('Failed to load alerts', err);
      }
    };
    fetchAlerts();
  }, [sessionId, lang]);

  const colorMap = {
    market: 'border-green-500 bg-green-50',
    weather: 'border-blue-500 bg-blue-50',
    pest: 'border-red-500 bg-red-50',
    general: 'border-yellow-500 bg-yellow-50',
  };

  return (
    <div className="grid gap-4">
      {alerts.map((alert, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-xl border-l-4 shadow ${colorMap[alert.type] || colorMap.general}`}
        >
          <h3 className="font-bold text-sm">{alert.title}</h3>
          <p className="text-sm mt-1 whitespace-pre-wrap">{alert.message}</p>
        </div>
      ))}
      {alerts.length === 0 && (
        <div className="text-sm text-gray-500">
          {lang === 'ta' ? 'இன்றைய அறிவிப்புகள் ஏதும் இல்லை' : 'No alerts for today.'}
        </div>
      )}
    </div>
  );
}

export default AlertsSection;
