import React from "react";

const kategoriGulaDarah = {
  puasa: [
    {
      label: "Hipoglikemia",
      range: "< 70 mg/dL",
      bgColor: "bg-blue-200",
      textColor: "text-blue-900",
    },
    {
      label: "Normal",
      range: "70 - 99 mg/dL",
      bgColor: "bg-green-500",
      textColor: "text-green-900",
    },
    {
      label: "Pra-diabetes",
      range: "100 - 125 mg/dL",
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-900",
    },
    {
      label: "Diabetes",
      range: "≥ 126 mg/dL",
      bgColor: "bg-red-800",
      textColor: "text-red-800",
    },
  ],
  duaJamPP: [
    {
      label: "Normal",
      range: "< 140 mg/dL",
      bgColor: "bg-green-500",
      textColor: "text-green-900",
    },
    {
      label: "Pra-diabetes",
      range: "140 - 199 mg/dL",
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-900",
    },
    {
      label: "Diabetes",
      range: "≥ 200 mg/dL",
      bgColor: "bg-red-800",
      textColor: "text-red-800",
    },
  ],
  sewaktu: [
    {
      label: "Normal",
      range: "< 200 mg/dL",
      bgColor: "bg-green-500",
      textColor: "text-green-900",
    },
    {
      label: "Diabetes",
      range: "≥ 200 mg/dL",
      bgColor: "bg-red-800",
      textColor: "text-red-800",
    },
  ],
};

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

const KategoriGulaDarah = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-center text-xl font-semibold">Kategori Gula Darah</h2>

      <div>
        <h3 className="text-lg font-semibold mb-2">🩸 Gula Darah Puasa</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {renderKategori(kategoriGulaDarah.puasa)}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">🍚 Gula Darah 2 Jam Setelah Makan</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {renderKategori(kategoriGulaDarah.duaJamPP)}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">⏱️ Gula Darah Sewaktu</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {renderKategori(kategoriGulaDarah.sewaktu)}
        </div>
      </div>
    </div>
  );
};

export default KategoriGulaDarah;
