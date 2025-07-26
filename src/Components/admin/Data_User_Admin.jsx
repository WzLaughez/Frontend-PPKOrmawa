import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useNavigate, NavLink } from "react-router-dom";
const Data_User_Admin = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [tahun, setTahun] = useState(currentYear);
  const [bulan, setBulan] = useState(null);

  // Ambil auth dari localStorage
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const fetchData = async () => {
    try {
       const res = await axiosInstance.get("/users", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setDataUser(res.data);
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataUser.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataUser.length / itemsPerPage);


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
    <NavLink to="/admin/pengguna/tambah">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 shadow">
        + Tambah User
        </button>
    </NavLink>
    </div>


      <div className="overflow-x-auto">
       <table className="min-w-full border font-dmsans text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">No</th>
            <th className="p-2">NIK</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Tempat, Tgl Lahir</th>
            <th className="p-2">Agama</th>
            <th className="p-2">Jenis Kelamin</th>
            <th className="p-2">RW</th>
            <th className="p-2">RT</th>
            <th className="p-2">No HP</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{user.nik}</td>
              <td className="p-2">{user.nama}</td>
              <td className="p-2">
                {user.tempat_lahir}, {user.tanggal_lahir}
              </td>
              <td className="p-2 text-center">
                {user.agama || "-"}
              </td>
              <td className="p-2 text-center">
                {user.jenis_kelamin || "-"}
              </td>
              <td className="p-2">{user.rw}</td>
              <td className="p-2">{user.rt}</td>
              <td className="p-2">{user.no_hp}</td>
              <td className="p-2 text-center">
                    <div className="flex gap-2">
                      <NavLink to={`/admin/pengguna/edit/${user.id}`}>
                        <button
                        className="text-blue-600 hover:underline"
                        >
                        Edit
                        </button>
                      </NavLink>
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
        <div className="flex justify-center items-center mt-4">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    className="px-3 py-1 bg-gray-200 disabled:opacity-50"
  >
    Prev
  </button>

  <div className="space-x-1">
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        {i + 1}
      </button>
    ))}
  </div>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    className="px-3 py-1 bg-gray-200 disabled:opacity-50"
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
};

export default Data_User_Admin;
