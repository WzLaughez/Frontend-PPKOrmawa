import React, { useEffect, useState } from 'react';

import AdminPengumuman from './admin/AdminPengumuman';
import { Routes, Route } from 'react-router';
import AdminGaleri from './admin/AdminGaleri';
import AdminPengurus from './admin/AdminPengurus';
import GaleriDetail from './admin/AdminGaleriDetail';
import AdminKarya from './admin/AdminKarya';

const Admin = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<AdminPengumuman />} />
      <Route path="/galeri" element={<AdminGaleri />} />
      <Route path="/galeri/:galeriDivisiId" element={<GaleriDetail />} />
      <Route path="/pengurus" element={<AdminPengurus />} />
      <Route path="/karya" element={<AdminKarya />} />
    </Routes>
    </>
  );
};

export default Admin;
