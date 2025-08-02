import React from "react";

const kategoriBMI = [
  {
    label: "Kurus",
    range: "BMI < 18.5",
    bgColor: "bg-blue-300",
    textColor: "text-blue-900",
  },
  {
    label: "Normal",
    range: "18.5 ≤ BMI < 25",
    bgColor: "bg-green-400",
    textColor: "text-green-900",
  },
  {
    label: "Gemuk",
    range: "25 ≤ BMI < 30",
    bgColor: "bg-yellow-300",
    textColor: "text-yellow-900",
  },
  {
    label: "Obesitas",
    range: "BMI ≥ 30",
    bgColor: "bg-red-500",
    textColor: "text-red-600",
  },
];

const KategoriIMT = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-semibold mb-6">Kategori IMT (BMI)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kategoriBMI.map((kategori, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow text-center p-4 space-y-2">
            <div className={`${kategori.bgColor} text-white font-bold py-1 rounded`}>
              {kategori.label}
            </div>
            <div className={`${kategori.textColor} font-medium bg-gray-100 py-2 rounded`}>
              {kategori.range}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KategoriIMT;
