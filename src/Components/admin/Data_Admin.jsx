import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useNavigate, NavLink } from "react-router-dom";
const Data_Admin = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const navigate = useNavigate();
  const [dataKesehatan, setDataKesehatan] = useState([]);
  const [tahun, setTahun] = useState(currentYear);
  const [bulan, setBulan] = useState(null);

  const fetchData = async () => {
    try {
      const endpoint = bulan === null
        ? `/kesehatan/bymonth?year=${tahun}`
        : `/kesehatan/bymonth?year=${tahun}&month=${bulan}`;
      const response = await axiosInstance.get(endpoint);
      setDataKesehatan(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    if (tahun) {
      fetchData();
    }
  }, [tahun, bulan]);

  const daftarTahun = [currentYear, currentYear - 1, currentYear - 2];
  const daftarBulan = [
    { label: "Semua Bulan", value: null },
    { label: "Januari", value: 1 },
    { label: "Februari", value: 2 },
    { label: "Maret", value: 3 },
    { label: "April", value: 4 },
    { label: "Mei", value: 5 },
    { label: "Juni", value: 6 },
    { label: "Juli", value: 7 },
    { label: "Agustus", value: 8 },
    { label: "September", value: 9 },
    { label: "Oktober", value: 10 },
    { label: "November", value: 11 },
    { label: "Desember", value: 12 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Data Pemeriksaan Kesehatan</h1>

      <div className="flex justify-between items-end mb-6">
  {/* Filter Tahun & Bulan */}
  <div className="flex gap-4">
    <div>
      <label className="block text-sm font-medium">Tahun</label>
      <select
        className="border rounded px-3 py-2"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
      >
        <option disabled value="">
          Pilih Tahun
        </option>
        {daftarTahun.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium">Bulan</label>
      <select
        className="border rounded px-3 py-2"
        value={bulan === null ? "" : bulan}
        onChange={(e) => {
          const val = e.target.value;
          setBulan(val === "" ? null : parseInt(val));
        }}
      >
        {daftarBulan.map((b) => (
          <option key={b.label} value={b.value === null ? "" : b.value}>
            {b.label}
          </option>
        ))}
      </select>
    </div>
    </div>

    {/* Tombol Tambah Data */}
    <NavLink to="/admin/data/tambah">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 shadow">
        + Tambah Data
        </button>
    </NavLink>
    </div>


      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Tanggal</th>
              <th className="border px-4 py-2">Tinggi Badan</th>
              <th className="border px-4 py-2">Berat Badan</th>
              <th className="border px-4 py-2">BMI</th>
              <th className="border px-4 py-2">Gula Darah (mg/dL)</th>
              <th className="border px-4 py-2">Tipe Gula Darah</th>
              <th className="border px-4 py-2">Status Gula</th>
              <th className="border px-4 py-2">Tekanan Darah</th>
              <th className="border px-4 py-2">Status Tekanan</th>
              <th className="border px-4 py-2">Catatan</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataKesehatan.map((item,index) => (
              <tr key={item.id}>
                <td className="border text-center px-4 py-2">{index+1}</td>
                <td className="border px-4 py-2">{item.user?.nama || "-"}</td>
                <td className="border px-4 py-2">{item.tanggal_pemeriksaan}</td>
                <td className="border px-4 py-2">{item.tinggi_badan} cm</td>
                <td className="border px-4 py-2">{item.berat_badan} kg</td>
                <td className="border px-4 py-2">{item.status_bmi || "-"}</td>
                <td className="border px-4 py-2">{`${item.gula_darah}` || "-"}</td>
                <td className="border px-4 py-2">{item.tipe_gula_darah || "-"}</td>
                <td className="border px-4 py-2">{item.status_gula_darah || "-"}</td>
                <td className="border px-4 py-2">
                  {item.tekanan_sistolik}/{item.tekanan_diastolik} mmhg
                </td>
                <td className="border px-4 py-2">{item.status_tekanan_darah || "-"}</td>
                <td className="border px-4 py-2">{item.catatan || "-"}</td>
                <td className="border px-4 py-2">
                    <div className="flex gap-2">
                        <button
                        onClick={() => navigate("/admin/data/edit", { state: item })}
                        className="text-blue-600 hover:underline"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:underline ml-2"
                        >
                        Hapus
                        </button>
                    </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Data_Admin;
