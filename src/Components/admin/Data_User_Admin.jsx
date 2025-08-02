import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useNavigate, NavLink } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaDownload, FaPlus, FaRegCreditCard } from "react-icons/fa";
import { toast } from "react-toastify";
const Data_User_Admin = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };
    const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${selectedId}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      toast.success("Data berhasil dihapus");
      setDataUser((prev) => prev.filter((item) => item.id !== selectedId));
    } catch (error) {
      toast.error("Gagal menghapus data");
      console.error("Gagal menghapus data:", error);
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };
  
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

const handleDownloadUserExcel = () => {
  if (dataUser.length === 0) {
    toast.warn("Data pengguna kosong.");
    return;
  }

  const dataToExport = dataUser.map((user, index) => ({
    No: index + 1,
    NIK: user.nik || "-",
    Nama: user.nama || "-",
    "Tempat Lahir": user.tempat_lahir || "-",
    "Tanggal Lahir": user.tanggal_lahir || "-",
    "Jenis Kelamin": user.jenis_kelamin || "-",
    Agama: user.agama || "-",
    "No HP": user.no_hp || "-",
    RT: user.rt || "-",
    RW: user.rw || "-",
    Alamat: user.alamat || "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data User");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  saveAs(file, "data_pengguna.xlsx");
};
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

    <div className="flex gap-2">
    
          <button
            onClick={handleDownloadUserExcel}
            className="px-4 py-2 bg-green-700 text-white text-sm hover:bg-green-600 shadow"
          >
            <FaDownload className="inline mr-2" />
            Download Data
          </button>
    
        {/* Tombol Tambah Data */}
          <NavLink to="/admin/pengguna/tambah">
              <button className="flex items-center px-4 py-2 bg-Blue text-white text-sm hover:bg-Aqua shadow">
                <FaPlus className="inline mr-2" />
              Tambah Pengguna
              </button>
          </NavLink>
          </div>
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
            <th className="p-2">Alamat</th>
            <th className="p-2">Jenis Kelamin</th>
            <th className="p-2">RW</th>
            <th className="p-2">RT</th>
            <th className="p-2">No HP</th>
            <th className="p-2">Email</th>
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
                {user.alamat || "-"}
              </td>
              <td className="p-2 text-center">
                {user.jenis_kelamin || "-"}
              </td>
              <td className="p-2">{user.rw}</td>
              <td className="p-2">{user.rt}</td>
              <td className="p-2">{user.no_hp}</td>
              <td className="p-2">{user.email}</td>
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
                        onClick={() => handleDeleteClick(user.id)}
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
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi Hapus</h2>
      <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus data ini?</p>
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Batal
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Data_User_Admin;
