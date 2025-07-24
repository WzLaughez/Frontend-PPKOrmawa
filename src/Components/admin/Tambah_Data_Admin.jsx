import { useEffect, useState } from "react";
import Select from "react-select";
import axiosInstance from "../../lib/axios";
import { NavLink } from "react-router";
import { useLocation } from "react-router-dom";

export default function TambahDataKesehatan({ initialData = null, mode = "create" }) {
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const location = useLocation();
   const existingData = location.state?.editData;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(initialData || {
    tanggal_pemeriksaan: "",
    tinggi_badan: "",
    berat_badan: "",
    lingkar_lengan: "",
    lingkar_pinggang: "",
    gula_darah: "",
    tipe_gula_darah: "",
    tekanan_sistolik: "",
    tekanan_diastolik: "",
    catatan: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (initialData) {
      const user = users.find((u) => u.id === initialData.user_id);
      if (user) {
        setSelectedUser({
          value: user.id,
          label: user.nama,
          nik: user.nik,
          ttl: `${user.tempat_lahir}, ${user.tanggal_lahir}`,
        });
      }
    }
  }, [users, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return alert("Pilih user terlebih dahulu");
    try {
        if (mode === "edit") {
        await axiosInstance.put(
          `/kesehatan/${initialData.id}`,
          { user_id: selectedUser.value, ...formData },
          { headers: { Authorization: `Bearer ${auth?.token}` } }
        );
        alert("Data berhasil diperbarui");
    } else {
      const res = await axiosInstance.post(
        "/kesehatan",
        {
          user_id: selectedUser.value,
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      alert("Data berhasil ditambahkan");
    }
    } catch (error) {
      console.error("Gagal menambah data:", error);
    }
  };

  const options = users.map((user) => ({
    value: user.id,
    label: user.nama,
    nik: user.nik,
    ttl: user.tempat_lahir + ", " + user.tanggal_lahir, // sesuaikan nama field
  }));

  return (
    <div className=" ">
<form onSubmit={handleSubmit} className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 h-screen overflow-hidden">
  {/* Header - Compact */}
  <div className="border-b border-gray-200 pb-3 mb-4">
    <NavLink to="/admin/data">
    <button
        type="button"
        className="mb-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded shadow"
    >
        Kembali
    </button>
    </NavLink>

    <h2 className="text-xl font-bold text-gray-900">{mode === "edit" ? "Edit" : "Tambah"} Data Formulir Pemeriksaan Kesehatan</h2>
    {/* Button kembali */}
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
    
    {/* Column 1: Patient Selection & Examination Info */}
    <div className="space-y-4">
      {/* Pilih User */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-2">1</span>
          Pilih Pasien
        </label>
        <Select
          options={options}
          onChange={setSelectedUser}
          value={selectedUser}
          placeholder="Pilih nama pasien..."
          className="mb-2"
        />
        {selectedUser && (
          <div className="bg-white border border-blue-200 rounded p-2 text-xs space-y-1">
            <p><span className="font-medium">NIK:</span> {selectedUser.nik}</p>
            <p><span className="font-medium">TTL:</span> {selectedUser.ttl}</p>
          </div>
        )}
      </div>

      {/* Informasi Pemeriksaan */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs mr-2">2</span>
          Info Pemeriksaan
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Tanggal Pemeriksaan *
            </label>
            <input 
              type="date" 
              name="tanggal_pemeriksaan" 
              value={formData.tanggal_pemeriksaan} 
              onChange={handleChange} 
              className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-200" 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Catatan
            </label>
            <textarea 
              name="catatan" 
              value={formData.catatan} 
              onChange={handleChange} 
              className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-200 resize-none" 
              placeholder="Catatan pemeriksaan..."
              rows="3"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Column 2: Body Measurements & Blood Sugar */}
    <div className="space-y-4">
      {/* Ukuran Tubuh */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs mr-2">3</span>
          Ukuran Tubuh
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Tinggi *
            </label>
            <div className="relative">
              <input 
                type="number" 
                name="tinggi_badan" 
                value={formData.tinggi_badan} 
                onChange={handleChange} 
                className="w-full px-3 py-2 pr-8 text-sm border-2 border-gray-300 rounded focus:border-purple-500 focus:ring-1 focus:ring-purple-200" 
                required 
                placeholder="170"
              />
              <span className="absolute right-2 top-2 text-xs text-gray-500">cm</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Berat *
            </label>
            <div className="relative">
              <input 
                type="number" 
                name="berat_badan" 
                value={formData.berat_badan} 
                onChange={handleChange} 
                className="w-full px-3 py-2 pr-8 text-sm border-2 border-gray-300 rounded focus:border-purple-500 focus:ring-1 focus:ring-purple-200" 
                required 
                placeholder="65"
              />
              <span className="absolute right-2 top-2 text-xs text-gray-500">kg</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              L. Lengan
            </label>
            <div className="relative">
              <input 
                type="number" 
                name="lingkar_lengan" 
                value={formData.lingkar_lengan} 
                onChange={handleChange} 
                className="w-full px-3 py-2 pr-8 text-sm border-2 border-gray-300 rounded focus:border-purple-500 focus:ring-1 focus:ring-purple-200" 
                placeholder="28"
              />
              <span className="absolute right-2 top-2 text-xs text-gray-500">cm</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              L. Pinggang
            </label>
            <div className="relative">
              <input 
                type="number" 
                name="lingkar_pinggang" 
                value={formData.lingkar_pinggang} 
                onChange={handleChange} 
                className="w-full px-3 py-2 pr-8 text-sm border-2 border-gray-300 rounded focus:border-purple-500 focus:ring-1 focus:ring-purple-200" 
                placeholder="80"
              />
              <span className="absolute right-2 top-2 text-xs text-gray-500">cm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gula Darah */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          <span className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs mr-2">4</span>
          Gula Darah
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Kadar Gula Darah
            </label>
            <div className="relative">
              <input 
                type="number" 
                name="gula_darah" 
                value={formData.gula_darah} 
                onChange={handleChange} 
                className="w-full px-3 py-2 pr-12 text-sm border-2 border-gray-300 rounded focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200" 
                placeholder="120"
              />
              <span className="absolute right-2 top-2 text-xs text-gray-500">mg/dL</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Tipe Pemeriksaan
            </label>
            <select 
              name="tipe_gula_darah" 
              value={formData.tipe_gula_darah} 
              onChange={handleChange} 
              className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 bg-white"
            >
              <option value="">Pilih Tipe</option>
              <option value="puasa">Puasa</option>
              <option value="2_jam_pp">2 Jam PP</option>
              <option value="sewaktu">Sewaktu</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* Column 3: Blood Pressure & Submit */}
    <div className="space-y-4">
      {/* Tekanan Darah */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs mr-2">5</span>
          Tekanan Darah
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Sistolik
            </label>
            <div className="relative">
              <input 
                type="number" 
                name="tekanan_sistolik" 
                value={formData.tekanan_sistolik} 
                onChange={handleChange} 
                className="w-full px-3 py-2 pr-12 text-sm border-2 border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200" 
                placeholder="120"
              />
              <span className="absolute right-2 top-2 text-xs text-gray-500">mmHg</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Diastolik
            </label>
            <div className="relative">
              <input 
                type="number" 
                name="tekanan_diastolik" 
                value={formData.tekanan_diastolik} 
                onChange={handleChange} 
                className="w-full px-3 py-2 pr-12 text-sm border-2 border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200" 
                placeholder="80"
              />
              <span className="absolute right-2 top-2 text-xs text-gray-500">mmHg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Display */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-xs font-semibold text-gray-600 mb-2">Preview Data</h4>
        <div className="space-y-1 text-xs text-gray-600">
          {formData.tinggi_badan && formData.berat_badan && (
            <p>BMI: {(formData.berat_badan / Math.pow(formData.tinggi_badan/100, 2)).toFixed(1)}</p>
          )}
          {formData.tekanan_sistolik && formData.tekanan_diastolik && (
            <p>TD: {formData.tekanan_sistolik}/{formData.tekanan_diastolik} mmHg</p>
          )}
          {formData.gula_darah && (
            <p>GD: {formData.gula_darah} mg/dL ({formData.tipe_gula_darah})</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>{mode === "edit" ? "Simpan Perubahan" : "Tambah Data"}</span>
        </button>
      </div>
    </div>
  </div>
</form>
    </div>
  );
}
