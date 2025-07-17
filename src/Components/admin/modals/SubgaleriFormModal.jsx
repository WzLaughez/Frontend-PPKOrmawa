import { X } from 'lucide-react';

export default function SubgaleriFormModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  handleFileChange,
  loading, // ⬅️ tambahan props untuk loading state
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Overlay Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center rounded-lg">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {formData.id ? 'Edit Subgaleri' : 'Tambah Subgaleri'}
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className={`${loading ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {formData.id ? 'Perbarui' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
