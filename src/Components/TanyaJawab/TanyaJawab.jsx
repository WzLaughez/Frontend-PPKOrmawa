import React, { useState, useEffect } from 'react';
import { tanyaJawabService } from '../../lib/tanyaJawabService';
import { sanitizeInput } from '../../utils/sanitizeInput';
import AskQuestion from './AskQuestion';
import QACard from './QACard';
import SEO from '../SEO';

const TanyaJawab = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAskForm, setShowAskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await tanyaJawabService.getAllPublic();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat pertanyaan dan jawaban');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmitted = () => {
    setShowAskForm(false);
    // Optionally refresh the list or show success message
  };

  const filteredQuestions = questions.filter(q => {
    const sanitizedSearchTerm = sanitizeInput.sanitizeSearch(searchTerm);
    return q.pertanyaan.toLowerCase().includes(sanitizedSearchTerm.toLowerCase()) ||
           (q.jawaban && q.jawaban.toLowerCase().includes(sanitizedSearchTerm.toLowerCase()));
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.pertanyaan,
      "acceptedAnswer": q.jawaban ? {
        "@type": "Answer",
        "text": q.jawaban
      } : null
    })).filter(q => q.acceptedAnswer)
  };

  return (
    <>
      <SEO 
        title="Tanya Jawab Kesehatan"
        description="Temukan jawaban untuk pertanyaan kesehatan yang sering diajukan atau ajukan pertanyaan baru kepada tim kesehatan PrimaHealth FK UM."
        keywords="tanya jawab kesehatan, FAQ kesehatan, konsultasi kesehatan, mahasiswa FK UM, PrimaHealth"
        url="/tanya-jawab"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tanya Jawab
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering diajukan atau ajukan pertanyaan baru
          </p>
        </div>

        {/* Search and Ask Question */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari pertanyaan atau jawaban..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(sanitizeInput.sanitizeSearch(e.target.value))}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ask Question Form Modal */}
        {showAskForm && (
          <AskQuestion 
            onClose={() => setShowAskForm(false)}
            onSubmitted={handleQuestionSubmitted}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Memuat pertanyaan...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
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

        {/* Questions List */}
        {!loading && !error && (
          <div className="space-y-6">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Tidak ada pertanyaan</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Tidak ada pertanyaan yang sesuai dengan pencarian Anda.' : 'Belum ada pertanyaan yang diajukan.'}
                </p>
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <QACard key={question.id} question={question} />
              ))
            )}
          </div>
        )}

        {/* Stats */}
        {!loading && !error && questions.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Menampilkan {filteredQuestions.length} dari {questions.length} pertanyaan
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default TanyaJawab;
