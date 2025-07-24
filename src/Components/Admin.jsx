import React, { useEffect, useState } from 'react';

import AdminPengumuman from './admin/AdminPengumuman';
import { Routes, Route } from 'react-router';
import AdminGaleri from './admin/AdminGaleri';
import AdminPengurus from './admin/AdminPengurus';
import GaleriDetail from './admin/AdminGaleriDetail';
import AdminKarya from './admin/AdminKarya';
import SidebarAdmin from './users/layout_user/Side';
import TopbarAdmin from './users/layout_user/Top';

const Admin = () => {
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
    <div className="flex h-screen overflow-hidden">
          <SidebarAdmin isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {/* Overlay untuk mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="flex flex-col flex-1">
            <TopbarAdmin toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<AdminPengumuman />} />
              <Route path="/pengumuman" element={<AdminPengumuman />} />
              <Route path="/galeri" element={<AdminGaleri />} />
              <Route path="/galeri/:galeriDivisiId" element={<GaleriDetail />} />
              <Route path="/pengurus" element={<AdminPengurus />} />
              <Route path="/karya" element={<AdminKarya />} />
            </Routes>
              </main>
          </div>
        </div>
    </>
  );
};

export default Admin;
