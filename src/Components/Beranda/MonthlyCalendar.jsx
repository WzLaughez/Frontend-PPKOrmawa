// components/MonthlyCalendar.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import AOS from 'aos';
import 'aos/dist/aos.css';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthlyCalendar = () => {

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);
useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);
  // 📅 Events with title and description
  const events = [
    {
      title: "Posyandu Desa A",
      description: "Pemeriksaan balita dan ibu hamil.",
      date: "2025-06-30"
    },
    {
      title: "Posyandu Desa B",
      description: "Skrining kesehatan lansia.",
      date: "2025-07-02"
    },
    {
      title: "Posyandu Desa C",
      description: "Pemberian vitamin A untuk anak.",
      date: "2025-07-17"
    },
    {
      title: "Posyandu Desa D",
      description: "Vaksinasi dan penyuluhan gizi.",
      date: "2025-07-24"
    },
  ];

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const renderCells = () => {
    const cells = [];
    const totalDays = startDay + daysInMonth;
    const firstDate = startOfMonth.subtract(startDay, "day");
    const lastDate = endOfMonth.add(6 - endOfMonth.day(), "day");

    for (let date = firstDate; date.isBefore(lastDate); date = date.add(1, "day")) {
      const isCurrentMonth = date.month() === currentDate.month();
      const dateStr = date.format("YYYY-MM-DD");
      const dayEvents = events.filter((event) => event.date === dateStr);

      cells.push(
        <div
          key={dateStr}
          className={`border p-2 min-h-[80px] text-sm rounded ${
            !isCurrentMonth ? "text-gray-400 bg-gray-50" : ""
          }`}
        >
          <div className="font-bold">{date.date()}</div>
          {dayEvents.map((ev, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedEvent(ev)}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded mt-1 cursor-pointer truncate"
            >
              {ev.title}
            </div>
          ))}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow mt-8" data-aos="fade-up">
      <div className="relative z-10 pt-5 pb-8" data-aos="fade-down">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          <div className="inline-block">
            <h2 className="text-1xl sm:text-2xl md:text-3xl font-bold text-Sage">
              <span className="text-Blue">
                Jadwal Kegiatan di PRIMA HEALTH
              </span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-Sage to-Sage mx-auto rounded-full m-3"></div>
            
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-lg px-2">
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={nextMonth} className="text-lg px-2">
          &gt;
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">{renderCells()}</div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
            <p className="text-sm text-gray-700">{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyCalendar;
