import { useState } from "react";

export default function TambahAnggotaModal({ isOpen, onClose, onAdd, divisiList }) {
  const [nama, setNama] = useState("");
  const [selectedDivisi, setSelectedDivisi] = useState("");
  const [selectedJabatan, setSelectedJabatan] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd({ nama, divisi_id: selectedDivisi, jabatan: selectedJabatan, file: selectedFile }); 
    setLoading(false);
    onClose();
    setNama("");
    setSelectedFile(null);
    setSelectedDivisi("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Tambah Anggota</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Pilih Divisi */}
          <div>
            <label className="block text-sm font-medium mb-1">Divisi</label>
            <select
              className="w-full border rounded p-2"
              value={selectedDivisi}
              onChange={(e) => setSelectedDivisi(e.target.value)}
              required
            >
              <option value="" disabled>Pilih divisi</option>
              {divisiList.map((divisi) => (
                <option key={divisi.id} value={divisi.id}>{divisi.nama}</option>
              ))}
            </select>
          </div>
          {/* Pilih Jabatan */}
          <div>
            <label className="block text-sm font-medium mb-1">Jabatan</label>
            <select
              className="w-full border rounded p-2"
              value={selectedJabatan}
              onChange={(e) => setSelectedJabatan(e.target.value)}
              required
            >
              <option value="" disabled>Pilih jabatan</option>
              <option value="Ketua">Ketua</option>
              <option value="Anggota">Anggota</option>
            </select>
          </div>
          {/* Nama Anggota */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama Anggota</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-medium mb-1">Foto</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded p-2"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Tambah"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
