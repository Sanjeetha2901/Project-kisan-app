import React from 'react';
import { Mic, Image, Landmark, BellRing, BarChart4 } from 'lucide-react';

function BottomNav({ lang }) {
  const labels = {
    ask: lang === 'ta' ? 'கேள்' : 'Ask',
    crop: lang === 'ta' ? 'பயிர்' : 'Crop',
    market: lang === 'ta' ? 'விலை' : 'Prices',
    scheme: lang === 'ta' ? 'திட்டம்' : 'Schemes',
    alerts: lang === 'ta' ? 'அறிவிப்பு' : 'Alerts',
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around p-2 shadow-inner text-xs">
      <div className="flex flex-col items-center text-green-700">
        <Mic size={20} />
        <span>{labels.ask}</span>
      </div>
      <div className="flex flex-col items-center text-red-500">
        <Image size={20} />
        <span>{labels.crop}</span>
      </div>
      <div className="flex flex-col items-center text-yellow-500">
        <BarChart4 size={20} />
        <span>{labels.market}</span>
      </div>
      <div className="flex flex-col items-center text-blue-500">
        <Landmark size={20} />
        <span>{labels.scheme}</span>
      </div>
      <div className="flex flex-col items-center text-purple-500">
        <BellRing size={20} />
        <span>{labels.alerts}</span>
      </div>
    </nav>
  );
}

export default BottomNav;
