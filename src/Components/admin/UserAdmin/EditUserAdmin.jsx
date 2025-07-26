import FormUserAdmin from "./FormUserAdmin";
import axiosInstance from "../../../lib/axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const EditUserAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const storedData = localStorage.getItem("auth");
  const auth = storedData ? JSON.parse(storedData) : null;
  useEffect(() => {
    axiosInstance.get(`/users/${id}`, { headers: { Authorization: `Bearer ${auth?.token}` } }).then((res) => setUser(res.data));
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await axiosInstance.put(`/users/${id}`, data, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      alert("Data berhasil diperbarui!");
      navigate("/admin/pengguna");
    } catch (err) {
      console.error("Gagal update:", err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
        <NavLink to="/admin/pengguna">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 shadow mb-4">
                Kembali
            </button>
        </NavLink>
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <FormUserAdmin initialData={user} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditUserAdmin;
