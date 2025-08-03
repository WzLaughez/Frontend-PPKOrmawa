// components/MonthlyCalendar.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axiosInstance from "../../lib/axios";


const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthlyCalendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
// useEffect(() => {
//     AOS.init({
//       duration: 1200,
//       once: false,
//     });
//   }, []);
  // 📅 Events with title and description
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get("/kegiatan");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
      AOS.init({
        duration: 1200,
        once: false,
        easing: 'ease-out-cubic',
      });
    }, []);

  // Date utilities
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getCurrentMonthName = (date) => {
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCells = () => {
    const cells = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    
    // Previous month's trailing days
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div
          key={`prev-${i}`}
          className="p-3 min-h-[100px] text-gray-300 bg-gray-50/50 rounded-xl"
        >
          <div className="text-sm opacity-50">
            {new Date(currentDate.getFullYear(), currentDate.getMonth(), -(firstDay - i - 1)).getDate()}
          </div>
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = formatDate(cellDate);
      const dayEvents = events.filter((event) => event.date === dateStr);
      const isToday = cellDate.toDateString() === today.toDateString();
      const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;

      cells.push(
        <div
          key={day}
          className={`relative p-1 min-h-[100px] rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer
            ${isWeekend ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-white'}
            ${isToday ? 'ring-2 ring-orange-400 shadow-lg' : 'border border-gray-100'}
          `}
        >
          {/* Date Number */}
          <div
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm mb-2
              ${isToday 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                : isWeekend 
                  ? 'text-blue-600' 
                  : 'text-gray-700'
              }
            `}
          >
            {day}
          </div>

          {/* Events */}
          <div className="space-y-1">
            {dayEvents.map((ev, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(ev);
                }}
                className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-2 py-1 rounded-lg cursor-pointer truncate transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  <span className="font-medium">{ev.title}</span>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap shadow-lg">
                    {ev.description}
                    <div className="absolute top-full left-3 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Day Decorations */}
          {dayEvents.length > 0 && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
          )}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12 px-4" data-aos="fade-up">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Calendar Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
            <defs>
              <pattern id="calendarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                <circle cx="10" cy="10" r="1" fill="#06b6d4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#calendarGrid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto" >
        {/* Header Section */}
        <div className="text-center mb-12" >
          <div className="relative inline-block">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 border-l-4 border-t-4 border-blue-400/30 rounded-tl-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-4 border-b-4 border-cyan-400/30 rounded-br-2xl"></div>
            
            <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                  Jadwal Kegiatan di PRIMA HEALTH
                </span>
              </h2>
              
              {/* Animated Underline */}
              <div className="relative mx-auto w-48 h-2 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              
              <p className="text-lg text-gray-600">
                Pantau jadwal kegiatan kesehatan terbaru di desa Anda
              </p>
            </div>
          </div>
        </div>

        {/* Calendar Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8" data-aos="fade-up">
          
          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={prevMonth} 
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                {getCurrentMonthName(currentDate)}
              </h2>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Klik tanggal untuk melihat detail</span>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            <button 
              onClick={nextMonth}
              className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {days.map((day, index) => (
              <div 
                key={day}
                className={`text-center font-bold py-3 rounded-xl text-sm
                  ${index === 0 || index === 6 
                    ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700'
                  }
                `}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {renderCells()}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              <span className="text-gray-600">Hari Ini</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              <span className="text-gray-600">Ada Kegiatan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 rounded-full"></div>
              <span className="text-gray-600">Weekend</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="relative bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/30 transform animate-in slide-in-from-bottom-4 duration-300">
            
            {/* Modal Decorations */}
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-ping"></div>
            <div className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="space-y-6">
              {/* Event Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
                </svg>
              </div>
              
              {/* Event Title */}
              <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                {selectedEvent.title}
              </h3>
              
              {/* Event Date */}
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                </svg>
                <span className="font-semibold">
                  {new Date(selectedEvent.date).toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              {/* Event Description */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-gray-700 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
              
              {/* Action Button */}
              <button 
                onClick={() => setSelectedEvent(null)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyCalendar;