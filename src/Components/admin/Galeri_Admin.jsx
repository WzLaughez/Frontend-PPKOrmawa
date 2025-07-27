import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import GaleriModal from "./galeri/GaleriModal";

const Galeri_Admin = () => {
  const [galeriList, setGaleriList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const API = import.meta.env.VITE_API_BASE_URL;

  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const headers = { Authorization: `Bearer ${auth?.token}` };

  const fetchGaleri = async () => {
    try {
      const res = await axiosInstance.get("/galeri", { headers });
      setGaleriList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const handleOpenAdd = () => {
    setEditingData(null);
    setShowModal(true);
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axiosInstance.delete(`/galeri/${id}`, { headers });
      fetchGaleri();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tanggal_kegiatan", data.tanggal_kegiatan);
    if (data.image) formData.append("image", data.image);

    if (editingData) {
      await axiosInstance.put(`/galeri/${editingData.id}`, formData, { headers });
    } else {
      await axiosInstance.post("/galeri", formData, { headers });
    }

    setShowModal(false);
    fetchGaleri();
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Galeri</h2>
        <button
          onClick={handleOpenAdd}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Tambah Galeri
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-sm font-semibold text-gray-700">Gambar</th>
            <th className="p-2 text-sm font-semibold text-gray-700">Judul</th>
            <th className="p-2 text-sm font-semibold text-gray-700">Tanggal</th>
            <th className="p-2 text-sm font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {galeriList.map((item) => (
            <tr key={item.id} className="border-t border-gray-200 items-center">
              <td className="p-2">
                <img
                  src={`${API}${item.image_url}`}
                  alt={item.title}
                  className="w-20 h-14 object-cover rounded"
                />
              </td>
              <td className="p-2 text-sm font-medium">
                <Link to={`/admin/galeri/${item.id}`} className="text-blue-600 hover:underline">
                  {item.title}
                </Link>
              </td>
              <td className="p-2 text-sm text-gray-600">{item.tanggal_kegiatan}</td>
              <td className="p-2">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <GaleriModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={editingData}
      />
    </div>
  );
};

export default Galeri_Admin;
