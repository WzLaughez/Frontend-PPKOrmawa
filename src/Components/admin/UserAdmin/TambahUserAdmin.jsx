import FormUserAdmin from "./FormUserAdmin";
import axiosInstance from "../../../lib/axios";
import { useNavigate, NavLink } from "react-router-dom";

const TambahUserAdmin = () => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  const handleAdd = async (data) => {
    try {
      await axiosInstance.post("/users", data,{
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      alert("Berhasil menambahkan user!");
      navigate("/admin/pengguna");
    } catch (err) {
      console.error("Gagal tambah user:", err);
    }
  };

  return (
    <div className="p-6">
        
    <NavLink to="/admin/pengguna">
      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 shadow mb-4">
        Kembali
      </button>
    </NavLink>
      <h1 className="text-2xl font-bold mb-4">Tambah User</h1>
      <FormUserAdmin onSubmit={handleAdd} />
    </div>
  );
};

export default TambahUserAdmin;
