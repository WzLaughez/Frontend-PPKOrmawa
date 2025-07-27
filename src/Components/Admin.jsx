import React, { useEffect, useState } from 'react';

import { Routes, Route, useLocation  } from 'react-router';
import AdminPengurus from './admin/AdminPengurus';
import SidebarAdmin from './admin/layout_admin/SideAdmin';
import TopbarAdmin from './admin/layout_admin/TopAdmin';
import Dashboard_Admin from './admin/Dashboard_Admin';
import Data_Admin from './admin/Data_Admin';
import Tambah_Data_Admin from './admin/Tambah_Data_Admin';
import Data_User_Admin from './admin/Data_User_Admin';
import TambahUserAdmin from './admin/UserAdmin/TambahUserAdmin';
import EditUserAdmin from './admin/UserAdmin/EditUserAdmin';
import Edukasi_Admin from './admin/Edukasi_Admin';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Galeri_Admin from './admin/Galeri_Admin';
import GaleriAdminDetail from './admin/galeri/GaleriAdminDetail';

function EditWrapper() {
  const location = useLocation();
  const data = location.state;
  return <Tambah_Data_Admin initialData={data} mode="edit" />;
}
const Admin = () => {
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    <div className="flex h-screen overflow-hidden">
          <SidebarAdmin isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {/* Overlay untuk mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="flex flex-col flex-1 w-0 ">
            <TopbarAdmin toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-900">

            <Routes>
              <Route path="/" element={<Dashboard_Admin />} />
              <Route path="/data" element={<Data_Admin />} />
              <Route path="/data/tambah" element={<Tambah_Data_Admin />} />
              <Route path="/data/edit" element={<EditWrapper />} />
              <Route path="/pengguna/tambah" element={<TambahUserAdmin />} />
              <Route path="/pengguna/edit/:id" element={<EditUserAdmin />} />
              <Route path="/pengguna" element={<Data_User_Admin />} />
              <Route path="/edukasi" element={<Edukasi_Admin />} />
              <Route path="/galeri" element={<Galeri_Admin />} />
              <Route path="/galeri/:id" element={<GaleriAdminDetail />} />
              <Route path="/pengurus" element={<AdminPengurus />} />
            </Routes>
              </main>
          </div>
        </div>
    </>
  );
};

export default Admin;
