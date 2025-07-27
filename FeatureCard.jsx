// components/FeatureCard.jsx
import React from 'react';

export default function FeatureCard({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg hover:scale-105 transition cursor-pointer"
    >
      <h2 className="text-xl font-bold text-green-700 mb-1">{title}</h2>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
