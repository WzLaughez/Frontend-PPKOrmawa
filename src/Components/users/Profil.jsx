import { useEffect, useState } from "react";
import axios from "axios";
import KategoriHipertensi from "./Kategori/KategoriHipertensi";

export default function Profil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("auth");
    const auth = storedData ? JSON.parse(storedData) : null;

    if (auth && auth.user && auth.token) {
      const userId = auth.user.id;

      axios.get(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Gagal mengambil data user:", err);
          setLoading(false);
        });
    } else {
      console.warn("Data auth tidak lengkap di localStorage.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="p-6 bg-gray-50 dark:bg-gray-800 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Dashboard Pengguna</h1>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Memuat data...</p>
        ) : userData ? (
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-2">Informasi Pengguna</h2>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>NIK:</strong> {userData.nik}</p>
              <p><strong>Nama:</strong> {userData.nama}</p>
              <p><strong>Tempat Lahir:</strong> {userData.tempat_lahir}</p>
              <p><strong>Tanggal Lahir:</strong> {userData.tanggal_lahir}</p>
              <p><strong>Agama:</strong> {userData.agama}</p>
              <p><strong>No HP:</strong> {userData.no_hp}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Data pengguna tidak ditemukan.</p>
        )}

        <KategoriHipertensi />
      </main>
    </div>
  );
}
