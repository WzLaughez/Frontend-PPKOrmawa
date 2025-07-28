import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosInstance from "../../../lib/axios";
import { toast } from "react-toastify";

const GaleriAdminDetail = () => {
  const { id } = useParams();
  const [galeri, setGaleri] = useState(null);
  const [subgaleriList, setSubgaleriList] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: null,
  });

  const API = import.meta.env.VITE_API_BASE_URL;
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const headers = { Authorization: `Bearer ${auth?.token}` };

  useEffect(() => {
    fetchGaleri();
    fetchSubgaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await axiosInstance.get(`/galeri/${id}`, { headers });
      setGaleri(res.data);
    } catch (err) {
      toast.error("Gagal mengambil detail galeri.");
    }
  };

  const fetchSubgaleri = async () => {
    try {
      const res = await axiosInstance.get(`/subgaleri/${id}`, { headers });
      setSubgaleriList(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data subgaleri.");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("galeri_id", id);
      if (form.image) fd.append("image", form.image);

      await axiosInstance.post("/subgaleri", fd, { headers });
      toast.success("Subgaleri berhasil ditambahkan!");
      setForm({ title: "", image: null });
      fetchSubgaleri();
    } catch (err) {
      toast.error("Gagal menambahkan subgaleri.");
    }
  };

  return (
    <div className="p-6">
      <NavLink to="/admin/galeri">
    <button
        type="button"
        className="mb-2 px-4 py-2  text-sm text-white bg-Blue hover:bg-Aqua  shadow"
    >
        Kembali
    </button>
    </NavLink>
      {galeri && (
        <div className="mb-6 mt-4">
          <h2 className="text-2xl font-bold">{galeri.title}</h2>
          <p className="text-gray-600">{galeri.description}</p>
          <p className="text-sm text-black">Tanggal Kegiatan: {galeri.tanggal_kegiatan}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4  shadow">
        <h3 className="text-lg font-semibold mb-4">Tambah Subgaleri</h3>
        <div className="mb-2">
          <label className="block text-sm font-medium">Judul Subgaleri</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2  mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Gambar</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2  hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Daftar Subgaleri</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subgaleriList.map((item) => (
          <div
            key={item.id}
            className="border  shadow p-2 bg-white"
          >
            <img
              src={`${API}${item.image_url}`}
              alt={item.title}
              className="w-full h-32 object-cover "
            />
            <p className="mt-2 text-sm font-medium text-center">{item.title}</p>
          {/* // Icon edit dan delete */}
          
            <div className="flex justify-center mt-2">
              <button
                className="text-red-600 hover:underline"
                onClick={async () => {
                  try {
                    await axiosInstance.delete(`/subgaleri/${item.id}`, { headers });
                    toast.success("Subgaleri berhasil dihapus!");
                    fetchSubgaleri();
                  } catch (err) {
                    toast.error("Gagal menghapus subgaleri.");
                  }
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriAdminDetail;
