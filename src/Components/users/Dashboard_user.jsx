import { useEffect, useState } from "react";
import axios from "axios";
// import { Card, CardContent } from '@/components/ui/card';
// import { Card, CardContent } from '../../components/Card';
import Card from './layout_user/Card'; // Pastikan path ini sesuai dengan struktur folder Anda
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
export default function Dashboard_user() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;

  if (auth && auth.user && auth.token) {
    const userId = auth.user.id;
    const year = new Date().getFullYear();

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    Promise.all([
      axios.get(`http://localhost:3001/api/kesehatan/byyear?year=${year}&user_id=${userId}`, { headers }),
      axios.get(`http://localhost:3001/api/users/${userId}`, { headers }),
    ])
      .then(([kesehatanRes, userRes]) => {
        setData(kesehatanRes.data);   // Data kesehatan tahunan
        console.log(kesehatanRes.data);
        
        setUserData(userRes.data);        // Tambahkan useState untuk user
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  } else {
    console.warn("Auth tidak ditemukan di localStorage.");
    setLoading(false);
  }
}, []);


  const latest = data.length > 0 ? data[data.length - 1] : {};

  const extractData = (key) => data.map((item) => ({
    x: item.tanggal_pemeriksaan,
    y: item[key],
  }));

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
  <div className="p-4 bg-white rounded-lg shadow max-w-screen-xl mx-auto">
    <h2 className="text-lg md:text-xl font-semibold mb-4">
      Riwayat Pemeriksaan Kesehatan
    </h2>

    {loading ? (
      <p>Memuat data...</p>
    ) : data.length === 0 ? (
      <p className="text-gray-500">Belum ada data pemeriksaan.</p>
    ) : (
      <>
        {/* Summary Cards & Welcome Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Welcome Section */}
          <div>

          <div className="bg-white rounded-lg shadow p-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-2">
              Selamat Datang, {userData ? userData.nama : 'Pengguna'}
            </h3>
            <p className="text-sm text-gray-600">NIK: {userData?.nik || '-'}</p>
            <p className="text-sm text-gray-600">Email: {userData?.email || '-'}</p>
          </div>
          </div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-1 sm:col-span-2 lg:col-span-3 justify-between">

          <Card
            icon="/Group 31.svg"
            title="Tekanan Darah"
            value={`${latest?.tekanan_sistolik || '-'} / ${latest?.tekanan_diastolik || '-'}`}
            unit="mmHg"
            status={latest?.status_tekanan_darah || '-'}
            statusColor={{ bg: "bg-blue-100", text: "text-blue-700" }}
            grafik="/Group 11.svg"
          />

          <Card
            icon="/Group 35.svg"
            title="Gula Darah"
            value={latest?.gula_darah || '-'}
            unit="mg/dL"
            status={latest?.status_gula_darah || '-'}
            statusColor={{ bg: "bg-yellow-100", text: "text-yellow-700" }}
            grafik="/Group 30.svg"
          />

          <Card
            icon="/icon-bmi.svg"
            title="BMI"
            value={latest?.bmi || '-'}
            unit=""
            status="Sehat"
            statusColor={{ bg: "bg-purple-100", text: "text-purple-700" }}
            grafik="/grafik-bmi.svg"
            />
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tekanan Darah Chart */}
          <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tren Tekanan Darah</h4>
            <Line
              data={{
                labels: data.map(item => item.tanggal_pemeriksaan),
                datasets: [
                  {
                    label: 'Sistolik',
                    data: extractData('tekanan_sistolik'),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: false,
                    tension: 0.3,
                  },
                  {
                    label: 'Diastolik',
                    data: extractData('tekanan_diastolik'),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: false,
                    tension: 0.3,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>

          {/* Gula Darah Chart */}
          <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tren Gula Darah</h4>
            <Line
              data={{
                labels: data.map(item => item.tanggal_pemeriksaan),
                datasets: [
                  {
                    label: 'Gula Darah',
                    data: extractData('gd_puasa'),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: false,
                    tension: 0.3,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>

          {/* BMI Chart */}
          <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tren BMI</h4>
            <Line
              data={{
                labels: data.map(item => item.tanggal_pemeriksaan),
                datasets: [
                  {
                    label: 'BMI',
                    data: extractData('tinggi_badan'),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: false,
                    tension: 0.3,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </>
    )}
  </div>
);

}