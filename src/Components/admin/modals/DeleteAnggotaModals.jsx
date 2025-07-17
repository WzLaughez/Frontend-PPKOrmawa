import React from "react";

export default function DeleteAnggotaModal({ isOpen, onClose, onDelete, anggota }) {
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

        <h2 className="text-xl font-semibold mb-4">Hapus Anggota</h2>
        <p className="mb-6 text-gray-700">
          Anda yakin ingin menghapus <strong>{anggota?.nama}</strong> dari divisi ini?
          <br /> Tindakan ini tidak bisa dibatalkan.
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => onDelete(anggota.id)}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
