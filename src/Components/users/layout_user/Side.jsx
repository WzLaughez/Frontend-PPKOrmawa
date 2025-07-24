import { NavLink, useNavigate } from "react-router-dom";
import { Home, Droplet, Activity, Calendar, User, Activity as Bmi, X, LogOut } from "lucide-react";
import { useAuth } from "../../../AuthContext";

const navItemClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-700 
   ${isActive ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""}`;

const SidebarAdmin = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               // panggil logout dari context
    navigate("/login");     // arahkan ke halaman login
  };
  return (
    <div className={`fixed md:relative top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-md z-50 w-64
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
      
      {/* Tombol close hanya muncul di mobile */}
      {isOpen && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-gray-700 dark:text-white"
        >
          <X size={24} />
        </button>
      )}

      <div className="p-6 text-2xl font-bold text-blue-700">PrimaHealth</div>
      
      <nav className="flex flex-col gap-2">
        <NavLink to="/user" end className={navItemClass}>
          <Home size={20} /> Overview
        </NavLink>
        <NavLink to="/user/blood-sugar" className={navItemClass}>
          <Droplet size={20} /> Blood Sugar
        </NavLink>
        <NavLink to="/user/hipertensi" className={navItemClass}>
          <Activity size={20} /> Hipertensi
        </NavLink>
        <NavLink to="/user/bmi" className={navItemClass}>
          <Bmi size={20} /> BMI
        </NavLink>
        <NavLink to="/user/profile" className={navItemClass}>
          <User size={20} /> User Profile
        </NavLink>
        <NavLink to="/user/panduan" className={navItemClass}>
          <Calendar size={20} /> Panduan
        </NavLink>
      </nav>
      <div className="px-4 py-2 border-t border-gray-300 dark:border-gray-700">
  <button
    onClick={handleLogout}
    className="flex items-center gap-3 w-full text-left px-2 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
  >
    <LogOut size={20} /> Logout
  </button>
</div>
    </div>
  );
};

export default SidebarAdmin;
