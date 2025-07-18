import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const questions = [
  {
    id: 1,
    avatar: 'M',
    avatarColor: 'bg-purple-700',
    question: 'Obat Apa untuk mengatasi badan lemas dan pusing?',
    user: 'M**at',
    doctor: 'dr. Septiana Nurhaliza',
    answer: 'Dok, belakangan ini saya sering merasa badan lemas dan pusing, terutama setelah beraktivitas atau di tengah hari. saya ......',
  },
  {
    id: 2,
    avatar: 'h',
    avatarColor: 'bg-pink-500',
    question: 'Apa yang menyebabkan dada sakit?',
    user: 'Ha**a',
    doctor: 'dr. Angelica',
    answer: 'Jadi gini dok, saya mulai merasa sakit di dada sebelah kanan bawah, tepatnya di area sekitar tulang rusuk. Rasa sakitnya...',
  },
];

const Comment = () => {
    useEffect(() => {
        AOS.init({
        duration: 1200,
        once: false,
        easing: 'ease-out-cubic',
        });
    }, []);
  return (
    
    <div className="items-center px-6 py-12 md:flex-row md:justify-between bg-white max-w-6xl mx-auto rounded-lg shadow-lg gap-8 mb-6" data-aos="fade-down">
        {/* Header Section */}
      <div className="relative z-10 pt-5 pb-8" >
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          <div className="inline-block">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#004D7A] ">
              <span className="text-Blue">
                PrimaHealth Menjawab
              </span>
            </h2>
            <p className="text-sm text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Punya pertanyaan seputar kesehatan?
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto items-stretch mb-4">
  {questions.map((q) => (
    <div key={q.id} className="max-w-sm w-full bg-white shadow rounded-lg p-4 h-full flex flex-col">
      <div className="flex gap-4 items-start">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase ${q.avatarColor}`}
        >
          {q.avatar}
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold">{q.question}</h3>
          <p className="text-sm text-gray-500">Oleh : {q.user}</p>
          <p className="text-sm text-sky-700 mt-1">Dijawab oleh {q.doctor}</p>
          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{q.answer}</p>
          <div className="mt-auto pt-2">
            <a href="#" className="text-sm text-sky-700 font-semibold inline-block">
              Selengkapnya →
            </a>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      <div className="mt-10 md:mt-0 flex items-center justify-center">
        <button className="bg-sky-800 text-white px-6 py-3 rounded-md font-medium shadow-md hover:bg-sky-700 transition">
          TANYA SEKARANG!
        </button>
      </div>
    </div>
  );
};

export default Comment;
