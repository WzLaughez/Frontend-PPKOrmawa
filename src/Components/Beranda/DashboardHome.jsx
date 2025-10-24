import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';
const data = [
    { x: 0, y: 55 },
    { x: 1, y: 40 },
    { x: 2, y: 65 },
    { x: 3, y: 10 },
    { x: 4, y: 60 },
    { x: 5, y: 90 },
];

export default function DashboardSection() {
    useEffect(() => {
      AOS.init({ duration: 1200
, once: false, easing: 'ease-out-cubic' });
    }, []);
  return (
    <div className="relative flex flex-col items-center justify-center py-10 font-dmsans w-full px-4 sm:px-6 lg:px-8 bg-WhitePPK dark:bg-gray-800 shadow-lg rounded-lg font-dmsans" data-aos="fade-up">
        {/* Decorative + Symbols */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute top-10 left-5 text-blue-100 text-4xl font-bold">+</div>
    <div className="absolute bottom-20 right-10 text-blue-100 text-5xl font-bold">+</div>
    <div className="absolute top-1/2 left-1/3 text-blue-50 text-3xl font-bold rotate-12">+</div>
    <div className="absolute bottom-10 left-1/4 text-purple-100 text-4xl font-bold">+</div>
  </div>
      {/* Enhanced Header */}
        <div className="text-center mb-10" data-aos="fade-down">
          <div className="relative inline-block" data-aos="fade-down">
            {/* Decorative Elements */}
            
            <div className="relative bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/20 dark:border-gray-600/20">
              <h2 className="text-xl md:text-3xl font-bold leading-tight mb-2">
                <span className="bg-gradient-to-r from-blue-700 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Pantau Tekanan Darah dan Gula Darah
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Secara Mandiri
                </span>
              </h2>
              
              {/* Animated Underline */}
              <div className="relative mx-auto w-48 h-2 mb-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Monitor kesehatan Anda dengan teknologi terdepan untuk hidup yang lebih sehat
              </p>
            </div>
          </div>
        </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10 mt-5" data-aos="fade-down">
        {/* Grafik */}
        <div className="w-full md:w-[300px] h-[200px]" data-aos="fade-down">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#F44336" dot={{ fill: '#F44336' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
  {/* ➕ Tambahkan dua div pemisah / info tambahan */}
  <div className="hidden md:block w-[2px] h-[150px] bg-gray-200 mx-2" data-aos="zoom-in"></div>
  <div className="hidden md:block w-[2px] h-[150px] bg-gray-200 mx-2" data-aos="zoom-in"></div>
    
    <div className='flex  flex-col md:flex-row items-stretch gap-4' data-aos="fade-down">
        {/* Card Gula Darah */}
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-5 w-[180px]">
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-between items-center w-full">

            <img src="/Group 31.svg" alt="Graph" className="w-12 h-12 " />
            <div className="text-sm text-gray-600 dark:text-gray-300">Gula Darah</div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">80 <span className="text-sm font-normal">mg / dL</span></div>
            <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded">Normal</div>
            <img src="/Group 11.svg" alt="Graph" className="w-full h-auto mt-2" />
          </div>
        </div>

        {/* Card Tekanan Darah */}
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-5 w-[180px]">
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-center items-center w-full">

            <img src="/Group 35.svg" alt="Graph" className="w-12 h-12 mr-4" />
            <div className="text-sm text-gray-600 dark:text-gray-300">Tekanan Darah</div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">102 <span className="text-sm font-normal">/ 72 mmHg</span></div>
            <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">Normal</div>
            <img src="/Group 30.svg" alt="Graph" className="w-full h-auto mt-2" />
          </div>
        </div>
        {/* Card BMI */}
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-5 w-[180px]">
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-between items-center w-full">

            <img src="/BMI.png" alt="Graph" className="w-12 h-12 " />
            <div className="text-sm text-gray-600 dark:text-gray-300">Indeks Masa Tubuh</div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">102 <span className="text-sm font-normal">IMT</span></div>
            <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">Normal</div>
            <img src="/Group 29.svg" alt="Graph" className="w-full h-auto mt-2" />
          </div>
        </div>
    </div>
      </div>
{/* Additional Info */}
          <div className="flex justify-center items-center space-x-6 mb-6 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Data Tersinkron</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Laporan Otomatis</span>
            </div>
          </div>
      {/* Tombol CTA */}
      <Link to="/login">
      <button className="px-6 py-2 bg-[#004D7A] hover:bg-[#003B5C] text-white rounded-full text-sm shadow transition">
        PANTAU SEKARANG →
      </button>
      </Link>
    </div>
  );
}
