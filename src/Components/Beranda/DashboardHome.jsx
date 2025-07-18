import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
      AOS.init({ duration: 1200});
    }, []);
  return (
    <div className="relative flex flex-col items-center justify-center py-10 font-dmsans max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 bg-WhitePPK shadow-lg rounded-lg" data-aos="fade-up">
        {/* Decorative + Symbols */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute top-10 left-5 text-blue-100 text-4xl font-bold">+</div>
    <div className="absolute bottom-20 right-10 text-blue-100 text-5xl font-bold">+</div>
    <div className="absolute top-1/2 left-1/3 text-blue-50 text-3xl font-bold rotate-12">+</div>
    <div className="absolute bottom-10 left-1/4 text-purple-100 text-4xl font-bold">+</div>
  </div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#004D7A] mb-8">
        Pantau Tekanan Darah dan Gula darah <br />
        <span className="text-[#004D7A]">Secara Mandiri</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10 mt-5">
        {/* Grafik */}
        <div className="w-full md:w-[300px] h-[200px]">
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
    
    <div className='flex  flex-col md:flex-row items-stretch gap-4'>
        {/* Card Gula Darah */}
        <div className="bg-white rounded-xl shadow p-5 w-[180px]">
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-between items-center w-full">

            <img src="/Group 31.svg" alt="Graph" className="w-12 h-12 " />
            <div className="text-sm text-gray-600">Gula Darah</div>
            </div>
            <div className="text-2xl font-semibold text-gray-900">80 <span className="text-sm font-normal">mg / dL</span></div>
            <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Normal</div>
            <img src="/Group 11.svg" alt="Graph" className="w-full h-auto mt-2" />
          </div>
        </div>

        {/* Card Tekanan Darah */}
        <div className="bg-white rounded-xl shadow p-5 w-[180px]">
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-center items-center w-full">

            <img src="/Group 35.svg" alt="Graph" className="w-12 h-12 mr-4" />
            <div className="text-sm text-gray-600">Tekanan Darah</div>
            </div>
            <div className="text-2xl font-semibold text-gray-900">102 <span className="text-sm font-normal">/ 72 mmHg</span></div>
            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Normal</div>
            <img src="/Group 30.svg" alt="Graph" className="w-full h-auto mt-2" />
          </div>
        </div>
        {/* Card BMI */}
        <div className="bg-white rounded-xl shadow p-5 w-[180px]">
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-between items-center w-full">

            <img src="/BMI.png" alt="Graph" className="w-12 h-12 " />
            <div className="text-sm text-gray-600">Indeks Masa Tubuh</div>
            </div>
            <div className="text-2xl font-semibold text-gray-900">102 <span className="text-sm font-normal">/ 72 mmHg</span></div>
            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Normal</div>
            <img src="/blood-pressure-graph.png" alt="Graph" className="w-full h-auto mt-2" />
          </div>
        </div>
    </div>
      </div>

      {/* Tombol CTA */}
      <button className="px-6 py-2 bg-[#004D7A] hover:bg-[#003B5C] text-white rounded-full text-sm shadow transition">
        PANTAU SEKARANG →
      </button>
    </div>
  );
}
