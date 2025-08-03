import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { User, Mail, Phone, Calendar, MapPin, Heart, CreditCard } from "lucide-react";

export default function Profil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("auth");
    const auth = storedData ? JSON.parse(storedData) : null;

    if (auth && auth.user && auth.token) {
      const userId = auth.user.id;

      axiosInstance.get(`users/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Gagal mengambil data user:", err);
          setLoading(false);
        });
    } else {
      console.warn("Data auth tidak lengkap di localStorage.");
      setLoading(false);
    }
  }, []);
const profileFields = [
    { icon: CreditCard, label: "NIK", value: userData?.nik, color: "text-blue-600" },
    { icon: User, label: "Nama", value: userData?.nama, color: "text-green-600" },
    { icon: MapPin, label: "Tempat Lahir", value: userData?.tempat_lahir, color: "text-red-600" },
    { icon: Calendar, label: "Tanggal Lahir", value: userData?.tanggal_lahir, color: "text-purple-600" },
    { icon: Heart, label: "Agama", value: userData?.agama, color: "text-pink-600" },
    { icon: Phone, label: "No HP", value: userData?.no_hp, color: "text-orange-600" },
    { icon: Mail, label: "Email", value: userData?.email, color: "text-indigo-600" }
  ];
   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="p-6 flex-1">

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-300">Memuat data...</p>
          </div>
        ) : userData ? (
          <div className="max-w-4xl mx-auto">
            {/* Profile Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {userData.nama}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {userData.tempat_lahir} • {userData.tanggal_lahir}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileFields.map((field, index) => {
                const IconComponent = field.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                        <IconComponent className={`w-6 h-6 ${field.color} dark:text-gray-300`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          {field.label}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {field.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-red-600 dark:text-red-400 text-lg font-semibold">
              Data pengguna tidak ditemukan.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Silakan coba lagi atau hubungi administrator.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}