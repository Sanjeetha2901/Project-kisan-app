import React from 'react';

function AppHeader({ lang }) {
  return (
    <header className="bg-green-700 text-white text-center py-3 shadow-lg text-xl font-bold tracking-wide">
      🌾 {lang === 'ta' ? 'விவசாயியின் நண்பன்' : "Farmer's Friend"} 🌾
    </header>
  );
}

export default AppHeader;
