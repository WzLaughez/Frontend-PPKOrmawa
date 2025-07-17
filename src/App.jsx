import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Footer from './layouts/Footer'
import Navbar from './layouts/Navbar'
import Home from './Components/Home'
import Plan from './Components/Plan'
import Galeri from './Components/Galeri'
import Pengumuman from './Components/Pengumuman'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTopButton from './layouts/ScrollToTopButton'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import PengumumanDetail from './Components/Pengumuman/PengumumanDetail'
import About from './Components/About'
import SubGaleri from './Components/Galeri/SubGaleri'
import Foto from './Components/Galeri/Foto'
import KaryaDetail from './Components/Karya/KaryaDetail'
AOS.init({
  once: false,
});

function ScrollToTop() {
  
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
function AppRoutes() {
  const location = useLocation()

  return (
    <Routes>
      <Route path="/" element={<Home key={location.pathname} />} />
      <Route path="/about" element={<About key={location.pathname} />} />
      <Route path="/galeri" element={<Galeri key={location.pathname} />} />
      <Route path="/galeri/:divisi_id" element={<SubGaleri key={location.pathname} />} />
      <Route path="/galeri/:divisi_id/:galeri_id" element={<Foto key={location.pathname} />} />
      <Route path="/karya" element={<Plan key={location.pathname} />} />
      <Route path="/karya/:id" element={<KaryaDetail key={location.pathname} />} />
      <Route path="/pengumuman" element={<Pengumuman key={location.pathname} />} />
      <Route path="/pengumuman/:id" element={<PengumumanDetail key={location.pathname} />} />
    </Routes>
  )
}
function App() {

  return (
    <>
      <div className="App">
      <ScrollToTop/>
        <Navbar/>
        <AppRoutes/>
        <Footer/>
        <ScrollToTopButton/>
      </div>
    </>
  )
}

export default App
