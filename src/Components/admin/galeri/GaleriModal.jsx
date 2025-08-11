import { useState, useEffect } from "react";

const GaleriModal = ({ isOpen, onClose, onSubmit, initialData, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    tanggal_kegiatan: "",
    image: null,
  });

  useEffect(() => {
  if (initialData) {
    setFormData({
      title: initialData.title || "",
      tanggal_kegiatan: initialData.tanggal_kegiatan || "",
      image: null, // hanya ketika upload baru
    });
  } else {
    setFormData({
      title: "",
      tanggal_kegiatan: "",
      image: null,
    });
  }
}, [initialData]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Galeri" : "Tambah Galeri"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Judul</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Tanggal Kegiatan</label>
            <input
              type="date"
              name="tanggal_kegiatan"
              value={formData.tanggal_kegiatan}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gambar (opsional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading}
              >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GaleriModal;
