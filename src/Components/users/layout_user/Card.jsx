// src/components/CardKesehatan.jsx
import React from "react";

const Card = ({ icon, title, value, unit, status, statusColor, grafik }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 w-full sm:w-[180px]">
      <div className="flex flex-col items-start gap-2">
        <div className="flex justify-center items-center w-full">
          <img src={icon} alt={title} className="w-12 h-12 mr-4" />
          <div className="text-sm text-gray-600">{title}</div>
        </div>
        <div className="text-xl font-normal font-sans text-gray-900">
          {value} <span className="text-sm font-normal">{unit}</span>
        </div>
        <div className={`text-xs ${statusColor.bg} ${statusColor.text} px-2 py-0.5 rounded`}>
          {status}
        </div>
        <img src={grafik} alt="Grafik" className="w-full h-auto mt-2" />
      </div>
    </div>
  );
};

export default Card;
