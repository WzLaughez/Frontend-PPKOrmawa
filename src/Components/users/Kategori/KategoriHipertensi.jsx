import React from "react";

const kategoriHipertensi = [
  {
    label: "Normal",
    range: "< 120 / < 80 mmHg",
    bgColor: "bg-green-500",
    textColor: "text-green-900",
  },
  {
    label: "Pra-hipertensi",
    range: "120–139 / 80–89 mmHg",
    bgColor: "bg-yellow-400",
    textColor: "text-yellow-900",
  },
  {
    label: "Hipertensi Tahap 1",
    range: "140–159 / 90–99 mmHg",
    bgColor: "bg-orange-400",
    textColor: "text-orange-900",
  },
  {
    label: "Hipertensi Tahap 2",
    range: "≥ 160 / ≥ 100 mmHg",
    bgColor: "bg-red-500",
    textColor: "text-red-900",
  },
  {
    label: "Hipertensi Sistolik Terisolasi",
    range: "> 180 / > 120 mmHg",
    bgColor: "bg-red-800",
    textColor: "text-red-800",
  },
];

const renderKategori = (kategoriArray) =>
  kategoriArray.map((kategori, idx) => (
    <div key={idx} className="bg-white rounded-xl shadow text-center p-4 space-y-2">
      <div className={`${kategori.bgColor} text-white font-bold py-1 rounded`}>
        {kategori.label}
      </div>
      <div className={`${kategori.textColor} font-medium bg-gray-100 py-2 rounded`}>
        {kategori.range}
      </div>
    </div>
  ));

const KategoriHipertensi = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-center text-xl font-semibold">Kategori Tekanan Darah</h2>

      <div>
        <h3 className="text-lg font-semibold mb-2">💓 Tekanan Darah Dewasa</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {renderKategori(kategoriHipertensi)}
        </div>
      </div>
    </div>
  );
};

export default KategoriHipertensi;
