import React from 'react';

const categories = [
  {
    title: 'Normal',
    tds: 'TDS < 120',
    tdd: 'TDD < 80',
    bgColor: 'bg-green-500',
    textColor: 'text-white',
    borderColor: 'border-green-600',
    valueBg: 'bg-green-600',
  },
  {
    title: 'Pra-Hipertensi',
    tds: 'TDS = 120 - 139',
    tdd: 'TDD = 80 - 89',
    bgColor: 'bg-green-200',
    textColor: 'text-black',
    borderColor: 'border-green-300',
    valueBg: 'bg-green-300',
  },
  {
    title: 'Hipertensi Tingkat 1',
    tds: 'TDS = 140 - 159',
    tdd: 'TDD = 90 - 99',
    bgColor: 'bg-yellow-300',
    textColor: 'text-black',
    borderColor: 'border-yellow-400',
    valueBg: 'bg-yellow-400',
  },
  {
    title: 'Hipertensi Tingkat 2',
    tds: 'TDS > 160',
    tdd: 'TDD > 100',
    bgColor: 'bg-orange-400',
    textColor: 'text-white',
    borderColor: 'border-orange-500',
    valueBg: 'bg-orange-500',
  },
  {
    title: 'Hipertensi Sistolik Terisolasi',
    tds: 'TDS > 140',
    tdd: 'TDD < 90',
    bgColor: 'bg-red-600',
    textColor: 'text-white',
    borderColor: 'border-red-700',
    valueBg: 'bg-red-700',
  },
];

const KategoriHipertensi = () => {
  return (
    <div className="px-4 py-8">
      <h2 className="text-center text-xl md:text-2xl font-bold mb-6">Kategori Hipertensi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg w-full max-w-[180px] overflow-hidden border ${cat.borderColor}`}
          >
            <div className={`text-center py-2 font-semibold ${cat.bgColor} ${cat.textColor}`}>
              {cat.title}
            </div>
            <div className="p-4 space-y-2 text-center">
              <div className={`inline-block px-3 py-1 rounded-md text-sm text-white ${cat.valueBg}`}>
                {cat.tds}
              </div>
              <div className="font-semibold text-sm">/</div>
              <div className={`inline-block px-3 py-1 rounded-md text-sm text-white ${cat.valueBg}`}>
                {cat.tdd}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KategoriHipertensi;
