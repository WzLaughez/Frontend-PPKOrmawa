import { useEffect, useState } from "react";
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
import axiosInstance from "../../lib/axios";
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
      axiosInstance.get(`kesehatan/byyear?year=${year}&user_id=${userId}`, { headers }),
      axiosInstance.get(`users/${userId}`, { headers }),
    ])
      .then(([kesehatanRes, userRes]) => {
        setData(kesehatanRes.data);   // Data kesehatan tahunan
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
  // Ambil tanggal dan ubah formatnya bentuk dd/Month/yyyy
  const formattedDate = latest.tanggal_pemeriksaan
    ? new Date(latest?.tanggal_pemeriksaan).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';
  const extractData = (key) => data.map((item) => ({
    x: item.tanggal_pemeriksaan ,
    y: item[key],
  }));

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };
const getStatusColor = (status, category) => {
  const key = status?.toLowerCase();

  const colorMap = {
    gula_darah: {
      normal: { bg: "bg-green-200", text: "text-green-800" },
      pradiabetes: { bg: "bg-yellow-500", text: "text-yellow-800" },
      diabetes: { bg: "bg-red-500", text: "text-red-200" },
    },
    tekanan_darah: {
      normal: { bg: "bg-green-100", text: "text-green-700" },
      "pra-hipertensi": { bg: "bg-yellow-100", text: "text-yellow-700" },
      "hipertensi tahap 1": { bg: "bg-orange-100", text: "text-orange-700" },
      "hipertensi tahap 2": { bg: "bg-red-100", text: "text-red-700" },
      "krisis hipertensi": { bg: "bg-red-200", text: "text-red-800" },
    },
    bmi: {
      normal: { bg: "bg-green-200", text: "text-green-800" },
      gemuk: { bg: "bg-yellow-500", text: "text-yellow-800" },
      obesitas: { bg: "bg-red-200", text: "text-red-800" },
    },
  };

  return colorMap[category]?.[key] || { bg: "bg-gray-200", text: "text-gray-800" };
};

  return (
  <div className="p-4 bg-WhitePPK  shadow max-w-screen-xl mx-auto">
    

    {loading ? (
      <p>Memuat data...</p>
    ) : data.length === 0 ? (
      <p className="text-gray-500">Belum ada data pemeriksaan.</p>
    ) : (
      <>
        {/* Summary Cards & Welcome Section */}
        <div className="flex flex-col justify-between md:flex-row gap-4 mb-6">
          {/* Welcome Section */}
            <div className="flex flex-col space-y-6">
    
    {/* Header with Avatar and Name */}
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full  flex items-center justify-center shadow-lg flex-shrink-0">
        <span className="text-xl font-bold text-white">
          {userData?.nama?.charAt(0) || 'U'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
          {userData?.nama || 'Pengguna'}
        </h3>
      </div>
    </div>

    {/* Patient Information */}
    <div className="space-y-2">
      <div className="flex items-center justify-between py-1 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700">NIK</span>
        <span className="text-sm text-gray-900 font-mono">
          {userData?.nik || '-'}
        </span>
      </div>

      <div className="flex items-center justify-between py-1 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700">Jenis Kelamin</span>
        <span className="text-sm text-gray-900">
          {userData?.jenis_kelamin || '-'}
        </span>
      </div>

      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-medium text-gray-700">Umur</span>
        <span className="text-sm text-gray-900">
          {userData?.umur || '-'}
        </span>
      </div>
    </div>

  </div>
          {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-1 sm:col-span-2 lg:col-span-3 justify-between">
        {/* Tanggal Terakhir */}

        <Card
          icon="/Group 35.svg"
          title="Gula Darah"
          value={latest?.gula_darah || '-'}
          unit="mg/dL"
          status={latest?.status_gula_darah || '-'}
          tipe={latest?.tipe_gula_darah || '-'}       
          date_latest={formattedDate || '-'}
          statusColor={getStatusColor(latest?.status_gula_darah, "gula_darah")}
          grafik="/Group 30.svg"
        />
        <Card
          icon="/Group 31.svg"
          title="Tekanan Darah"
          value={`${latest?.tekanan_sistolik || '-'} / ${latest?.tekanan_diastolik || '-'}`}
          unit="mmHg"
          status={latest?.status_tekanan_darah || '-'}
          date_latest={formattedDate || '-'}
          statusColor={getStatusColor(latest?.status_tekanan_darah, "tekanan_darah")}
          grafik="/Group 11.svg"
        />
        <Card
          icon="/BMI.png"
          title="Indeks Masa Tubuh"
          value={latest?.bmi || '-'}
          unit=""
          status={latest?.status_bmi || '-'}
          date_latest={formattedDate || '-'}
          statusColor={getStatusColor(latest?.status_bmi, "bmi")}
          grafik="/Group 29.svg"
          />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tekanan Darah Chart */}
          <div className="bg-white -xl shadow p-5 overflow-x-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Riwayat Tekanan Darah</h4>
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
          <div className="bg-white -xl shadow p-5 overflow-x-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Riwayat Gula Darah</h4>
            <Line
              data={{
                labels: data.map(item => item.tanggal_pemeriksaan),
                datasets: [
                  {
                    label: 'Gula Darah',
                    data: extractData('gula_darah'),
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
          <div className="bg-white -xl shadow p-5 overflow-x-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Riwayat Indeks Masa Tubuh</h4>
            <Line
              data={{
                labels: data.map(item => item.tanggal_pemeriksaan),
                datasets: [
                  {
                    label: 'Indeks Masa Tubuh',
                    data: extractData('bmi'),
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