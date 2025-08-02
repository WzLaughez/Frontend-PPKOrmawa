import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './users/layout_user/Side';
import Topbar from './users/layout_user/Top';
import Dashboard_user from './users/Dashboard_user';
import Profil from './users/Profil';
import IMT from './users/IMT_user';
import GulaDarahUser from './users/GulaDarah_user';
import HipertensiUser from './users/Hipertensi_user';

const User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex flex-col flex-1">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 min-h-0 overflow-y-auto  p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<Dashboard_user />} />
            <Route path="/profile" element={<Profil />} />
            <Route path="/gula-darah" element={<GulaDarahUser />} />
            <Route path="/hipertensi" element={<HipertensiUser />} />
            <Route path="/bmi" element={<IMT />} />
            {/* Tambah route lain jika perlu */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default User;
