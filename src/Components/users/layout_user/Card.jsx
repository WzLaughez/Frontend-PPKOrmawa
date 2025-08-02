// src/components/CardKesehatan.jsx
import React from "react";

const Card = ({ icon, title, value, unit, status, statusColor,tipe,date_latest, grafik }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full sm:w-auto hover:shadow-md transition-all duration-300 group ">
      <div className="flex flex-col space-y-4">
        
        {/* Header with Icon and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 p-2 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300">
            <img 
              src={icon} 
              alt={title} 
              className="w-8 h-8 object-contain" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-700 leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Value Section */}
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl md:text-3xl font-bold text-gray-900 leading-none">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-gray-500">
              {unit}
            </span>
          )}
        </div>

        {/* Status and Type Badges */}
        <div className="flex flex-wrap gap-2">
          {status && (
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${statusColor?.bg || 'bg-gray-100'} ${statusColor?.text || 'text-gray-700'} transition-colors duration-200`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current mr-2"></div>
              {status}
            </span>
          )}
          
          {tipe && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
              {tipe}
            </span>
          )}
        </div>
        {/* Date Section */}
        <div className="text-xs text-gray-500">
          {date_latest ? (
            <span>Terakhir diperbarui: {date_latest}</span>
          ) : (
            <span>Terakhir diperbarui: -</span>
          )}
        </div>
        {/* Graph Section */}
        {grafik && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-2">
              <img 
                src={grafik} 
                alt="Health trend graph" 
                className="w-full h-auto max-h-20 object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
