import React, { useState } from 'react';
import { tanyaJawabService } from '../../../lib/tanyaJawabService';
import { sanitizeInput } from '../../../utils/sanitizeInput';

const AnswerModal = ({ question, onClose, onSubmitted, token }) => {
  const [formData, setFormData] = useState({
    jawaban: '',
    is_public: false,
    yangMenjawab: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Only sanitize yangMenjawab field in real-time, allow jawaban to be typed freely

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.jawaban.trim()) {
      setError('Jawaban harus diisi');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Sanitize data before sending to server
      const sanitizedData = {
        jawaban: sanitizeInput.sanitizeAnswer(formData.jawaban),
        is_public: formData.is_public,
        yangMenjawab: sanitizeInput.sanitizeName(formData.yangMenjawab)
      };
      
      await tanyaJawabService.answerQuestion(question.id, sanitizedData, token);
      
      onSubmitted();
      
    } catch (err) {
      setError(err.message || 'Gagal menyimpan jawaban');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Jawab Pertanyaan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Question Display */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-medium text-gray-900 dark:text-white">Pertanyaan:</h4>
          </div>
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {question.pertanyaan}
          </p>
          {question.nama_penanya && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Dari: {question.nama_penanya}
              {question.email_penanya && ` (${question.email_penanya})`}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Answer */}
          <div>
            <label htmlFor="jawaban" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Jawaban <span className="text-red-500">*</span>
            </label>
            <textarea
              id="jawaban"
              name="jawaban"
              rows={6}
              value={formData.jawaban}
              onChange={handleChange}
              placeholder="Tuliskan jawaban Anda di sini..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              required
            />
          </div>

          {/* Yang Menjawab */}
          <div>
            <label htmlFor="yangMenjawab" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Yang Menjawab (Opsional)
            </label>
            <input
              type="text"
              id="yangMenjawab"
              name="yangMenjawab"
              value={formData.yangMenjawab}
              onChange={handleChange}
              placeholder="Masukkan nama yang menjawab (misal: dr. John Doe)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Nama yang akan ditampilkan sebagai penjawab pertanyaan ini
            </p>
          </div>

          {/* Public Toggle */}
          <div className="flex items-center">
            <input
              id="is_public"
              name="is_public"
              type="checkbox"
              checked={formData.is_public}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="is_public" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Tampilkan sebagai Q&A publik
            </label>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Jika dicentang, pertanyaan dan jawaban ini akan ditampilkan di halaman publik Tanya Jawab.
                  Jika tidak dicentang, hanya admin yang dapat melihatnya.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {loading ? 'Menyimpan...' : 'Simpan Jawaban'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerModal;
