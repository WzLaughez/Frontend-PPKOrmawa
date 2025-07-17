import React , { useState } from 'react';
import { X } from 'lucide-react';

const GaleriFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  handleFileChange,
  currentGaleri,
  divisiList 
}) => {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {currentGaleri ? 'Edit Galeri' : 'Tambah Galeri Baru'}
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        try {
                          await onSubmit(e); // pastikan fungsi ini menangani async
                          setLoading(false);
                        } catch (err) {
                          console.error("Submit gagal", err);
                          setLoading(false);
                        }
                      }}>
          <div className="mb-4">
            {/* Form untuk memilih divisi */}
            <label className="block text-gray-700 text-sm font-medium mb-2">Pilih Divisi</label>
            <select
              name="divisi_id"
              value={formData.divisi_id || ""}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Pilih divisi</option>
              {divisiList.map((divisi) => (
                <option key={divisi.id} value={divisi.id}>
                  {divisi.kode_divisi}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Judul</label>
            <input
              type="text"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Upload Gambar</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} 
                    className="w-full p-2 border rounded"
                    />
                </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Batal
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : currentGaleri ? 'Perbarui' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GaleriFormModal;
