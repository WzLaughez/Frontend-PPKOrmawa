import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FooterQuestionForm from '../TanyaJawab/FooterQuestionForm';
import SimpleQACard from '../TanyaJawab/SimpleQACard';
import { tanyaJawabService } from '../../lib/tanyaJawabService';
import { FaArrowRight } from 'react-icons/fa';

const Comment = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: 'ease-out-cubic',
    });
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await tanyaJawabService.getAllPublic();
      // Filter only answered questions and limit to 2
      const answeredQuestions = data.filter(q => q.status === 'answered' && q.jawaban).slice(0, 2);
      setQuestions(answeredQuestions);
      setError(null);
    } catch (err) {
      setError('Gagal memuat pertanyaan');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    
    <div className="items-center px-6 py-12 md:flex-row md:justify-between bg-white dark:bg-gray-800 max-w-7xl mx-auto rounded-lg shadow-lg gap-8 mb-6" data-aos="fade-down">
        {/* Header Section */}
      <div className="relative z-10 pt-5 pb-8" >
        <div className="w-full px-2 sm:px-6 lg:px-8 text-center">
          <div className="inline-block">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#004D7A] dark:text-blue-400">
              <span className="text-Blue dark:text-blue-400">
                PrimaHealth Menjawab
              </span>
            </h2>
            <p className="text-sm text-gray-800 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Punya pertanyaan seputar kesehatan?
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto items-stretch mb-4">
        <FooterQuestionForm/>
        
        {/* Questions Display */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Memuat pertanyaan...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          ) : questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} data-aos="fade-up">
                  <SimpleQACard question={q} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada pertanyaan yang dijawab</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 md:mt-0 flex items-center justify-center">
        <Link to="/tanya-jawab">
          <button className="bg-sky-800 dark:bg-sky-700 text-white px-6 py-3 rounded-md font-medium shadow-md hover:bg-sky-700 dark:hover:bg-sky-600 transition">
          <div className="flex items-center gap-2"> 
          <span>Lihat Semua Pertanyaan</span>
          <FaArrowRight />
          </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Comment;
