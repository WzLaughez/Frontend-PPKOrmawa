import { FaUserMd, FaUserInjured, FaNotesMedical, FaClinicMedical } from "react-icons/fa"; // Contoh ikon

const iconMap = {
  "Total Users": { icon: <FaUserInjured />, bg: "bg-blue-100", text: "text-blue-500" },
  "Total Periksa": { icon: <FaNotesMedical />, bg: "bg-orange-100", text: "text-orange-500" },
  "Belum Periksa": { icon: <FaUserMd />, bg: "bg-pink-100", text: "text-pink-500" },
  "Risiko Tinggi": { icon: <FaClinicMedical />, bg: "bg-cyan-100", text: "text-cyan-500" },
};

const Card = ({ title, value }) => {
  const { icon, bg, text } = iconMap[title] || {};

  return (
    <div className="bg-white shadow p-4 flex items-center space-x-4">
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bg} ${text} text-xl`}>
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default Card;
