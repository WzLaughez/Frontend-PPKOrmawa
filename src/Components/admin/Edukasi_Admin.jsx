import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../lib/axios';
import EdukasiModal from './edukasi/EdukasiModal';

const Edukasi_Admin = () => {
  const [edukasiList, setEdukasiList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const API = import.meta.env.VITE_API_BASE_URL;
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const headers = { Authorization: `Bearer ${auth?.token}` };

  const fetchEdukasi = async () => {
    try {
      const res = await axiosInstance.get('/edukasi', { headers });
      setEdukasiList(res.data);
      console.log('Edukasi List:', res.data);
    } catch (error) {
      console.error('Gagal mengambil data edukasi:', error);
    }
  };

  useEffect(() => {
    fetchEdukasi();
  }, []);
  const handleOpenAdd = () => {
    setEditingData(null);
    setShowModal(true);
  };
  const handleEdit = (data) => {
    setEditingData(data);
    setShowModal(true);
  };
  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);

    if (editingData) {
      await axiosInstance.put(`/edukasi/${editingData.id}`, formData);
    } else {
      await axiosInstance.post("/edukasi", formData);
    }

    setShowModal(false);
    // refresh data
  };
  return (
    <div className="p-6  mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Edukasi</h2>
        <button
        onClick={handleOpenAdd}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Tambah Edukasi
      </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
            <tr>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Gambar</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Judul</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Deskripsi</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
        </thead>
        <tbody>
            {edukasiList.map((item) => (
            <tr key={item.id} className="border-t border-gray-200">
                <td className="px-4 py-3">
                <img
                    src={`${API}${item.image_url}`}
                    alt={item.title}
                    className="w-20 h-14 object-cover rounded"
                />
                </td>
                <td className="px-4 py-3 text-sm font-medium">{item.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600 line-clamp-2 max-w-xs">{item.description}</td>
                <td className="px-4 py-3">
                <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Edit
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>

      <EdukasiModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={editingData}
      />
    </div>
  );
};


export default Edukasi_Admin;
