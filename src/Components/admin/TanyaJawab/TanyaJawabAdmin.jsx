import React, { useState, useEffect } from 'react';
import { tanyaJawabService } from '../../../lib/tanyaJawabService';
import { sanitizeInput } from '../../../utils/sanitizeInput';
import AnswerModal from './AnswerModal';
import DeleteModal from './DeleteModal';

const TanyaJawabAdmin = () => {
  const [questions, setQuestions] = useState([]);
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, answered, closed
  const [searchTerm, setSearchTerm] = useState('');

  // Get auth token
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;

  useEffect(() => {
    if (auth?.token) {
      fetchQuestions();
    }
  }, [auth?.token]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const [allQuestions, pending] = await Promise.all([
        tanyaJawabService.getAllForAdmin(auth.token),
        tanyaJawabService.getPending(auth.token)
      ]);
      setQuestions(allQuestions);
      setPendingQuestions(pending);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data pertanyaan');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerQuestion = (question) => {
    setSelectedQuestion(question);
    setShowAnswerModal(true);
  };

  const handleDeleteQuestion = (question) => {
    setSelectedQuestion(question);
    setShowDeleteModal(true);
  };

  const handleAnswerSubmitted = () => {
    setShowAnswerModal(false);
    setSelectedQuestion(null);
    fetchQuestions();
  };

  const handleQuestionDeleted = () => {
    setShowDeleteModal(false);
    setSelectedQuestion(null);
    fetchQuestions();
  };

  const filteredQuestions = questions.filter(question => {
    const matchesFilter = filter === 'all' || question.status === filter;
    const matchesSearch = question.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (question.nama_penanya && question.nama_penanya.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'answered':
        return 'Terjawab';
      case 'pending':
        return 'Menunggu Jawaban';
      case 'closed':
        return 'Ditutup';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Manajemen Tanya Jawab
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Kelola pertanyaan dan jawaban dari pengguna
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Pertanyaan</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{questions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Menunggu Jawaban</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingQuestions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Terjawab</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {questions.filter(q => q.status === 'answered').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Publik</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {questions.filter(q => q.is_public).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Menunggu
            </button>
            <button
              onClick={() => setFilter('answered')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'answered'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Terjawab
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'closed'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Ditutup
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pertanyaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Error Message */}
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
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
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(question.status)}`}>
                        {getStatusText(question.status)}
                      </span>
                      {question.is_public && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          Publik
                        </span>
                      )}
                      {question.nama_penanya && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          oleh {question.nama_penanya}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {question.pertanyaan}
                    </h3>
                    {question.jawaban && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Jawaban:</p>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                            {question.jawaban}
                          </p>
                        </div>
                        <div className="mt-2">
                          {question.yangMenjawab ? (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Dijawab oleh {sanitizeInput.escapeHtml(question.yangMenjawab)} pada {formatDate(question.answered_at)}
                            </p>
                          ) : question.admin ? (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Dijawab oleh {sanitizeInput.escapeHtml(question.admin.nama)} pada {formatDate(question.answered_at)}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Dijawab pada {formatDate(question.answered_at)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-3">
                      <span>Dibuat: {formatDate(question.createdAt)}</span>
                      {question.email_penanya && (
                        <span>Email: {question.email_penanya}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {question.status === 'pending' && (
                      <button
                        onClick={() => handleAnswerQuestion(question)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        Jawab
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteQuestion(question)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAnswerModal && selectedQuestion && (
        <AnswerModal
          question={selectedQuestion}
          onClose={() => {
            setShowAnswerModal(false);
            setSelectedQuestion(null);
          }}
          onSubmitted={handleAnswerSubmitted}
          token={auth?.token}
        />
      )}

      {showDeleteModal && selectedQuestion && (
        <DeleteModal
          question={selectedQuestion}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedQuestion(null);
          }}
          onDeleted={handleQuestionDeleted}
          token={auth?.token}
        />
      )}
    </div>
  );
};

export default TanyaJawabAdmin;
