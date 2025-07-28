import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "./layout_admin/Card_admin";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard_Admin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil auth dari localStorage
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setData(res.data);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) return <div className="p-4">Loading...</div>;

  const barChartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ],
    datasets: [
      {
        label: "Jumlah Pemeriksaan",
        backgroundColor: "#005689",
        borderRadius: 0,
        data: data.historyPeriksa
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { stepSize: 1, precision: 0 }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  const pieChart = (dataset) => ({
    labels: Object.keys(dataset),
    datasets: [
      {
        data: Object.values(dataset),
        backgroundColor: [
          "#026878ff", "#006e12ff", "#f6fa15ff", "#d35105ff", "#ff0e0eff"
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="bg-WhitePPK p-6 min-h-screen w-full space-y-4 shadow-md">

      <h1 className="text-2xl font-semibold mb-4">Dashboard Admin Kesehatan</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Users" value={data.totalUsers} />
        <Card title="Total Periksa" value={data.totalPeriksa} />
        <Card title="Belum Periksa" value={data.totalBelumPeriksa} />
        <Card title="Risiko Tinggi" value={data.jumlahRisikoTinggi} />
      </div>

      {/* Grid for Bar + Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Box */}
        <div className="bg-white p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Riwayat Pemeriksaan per Bulan Tahun {data.currentYear}</h2>
          <div className="h-48">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <h2 className="text-lg font-semibold mb-2">Riwayat Pemeriksaan per Bulan Tahun {data.currentYear}</h2>
          <div className="h-48">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Pie Charts Box */}
        <div className="bg-white p-4 shadow">
          <h2 className="text-lg font-semibold mb-4 text-center">Status Kesehatan Bulan Ini</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-1/2 sm:w-1/3 flex justify-center">
              <SmallPie title="Distribusi IMT" chartData={pieChart(data.statusBMI)} />
            </div>
            <div className="w-1/2 sm:w-1/3 flex justify-center">
              <SmallPie title="Distribusi Gula Darah" chartData={pieChart(data.statusGula)} />
            </div>
            <div className="w-full sm:w-1/3 flex justify-center">
              <SmallPie title="Distribusi Tekanan Darah" chartData={pieChart(data.statusTekanan)} />
            </div>
          </div>
        </div>

      </div>

      {/* <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Detail Risiko Tinggi</h2>
        <ul className="list-disc ml-5">
          {Object.entries(data.risikoTinggiDetail).map(([key, val]) => (
            <li key={key}>
              {key}: {val}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

const SmallPie = ({ title, chartData }) => (
  <div className="flex flex-col items-center text-center">
    <p className="text-sm font-dmsans mb-1">{title}</p>
    <div className="w-32 h-32">
      <Doughnut data={chartData} options={{ plugins: { legend: { display: false }}}} />
    </div>
    <div className="flex flex-wrap justify-center gap-1 mt-2 text-xs">
      {chartData.labels.map((label, i) => (
        <span key={i} className="flex items-center gap-1 text-gray-600 font-dmsans ml-1">
          <span 
            className="w-3 h-3 inline-block rounded-full" 
            style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}
          ></span>
          {label}
        </span>
      ))}
    </div>
  </div>
);



export default Dashboard_Admin;
