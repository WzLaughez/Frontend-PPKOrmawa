import React from 'react'
import VideoProfil from './Beranda/VideoProfil'
import VisiMisi from './Beranda/VisiMisi'
import HeroSection from './Beranda/HeroSection'
import GaleriHome from './Beranda/GaleriHome'
import ArticleSection from './Beranda/Pengumuman'
import DashboardSection from './Beranda/DashboardHome'
import MonthlyCalendar from './Beranda/MonthlyCalendar'
import Comment from './Beranda/Comment'
import SEO from './SEO'

const images = [
  { src: '/LogoHMIF-removebg-preview.png', title: 'Image 1' },
  { src: '/LogoHMIF-removebg-preview.png', title: 'Image 2' },
  // Add more images
];
const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PrimaHealth",
    "description": "Platform kesehatan terintegrasi untuk mahasiswa Fakultas Kedokteran Universitas Negeri Malang",
    "url": "https://primahealth.my.id",
    "logo": "https://primahealth.my.id/Logo_Hijau.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jalan Semarang 5",
      "addressLocality": "Malang",
      "postalCode": "65145",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-812-1601-6334",
      "contactType": "customer service",
      "email": "bemfkum@gmail.com"
    },
    "sameAs": [
      "https://primahealth.my.id"
    ]
  };

  return (
    <>
      <SEO 
        title="PrimaHealth - Platform Kesehatan Mahasiswa FK UM"
        description="Platform kesehatan terintegrasi untuk mahasiswa Fakultas Kedokteran Universitas Negeri Malang. Edukasi kesehatan, galeri kegiatan, dan tanya jawab kesehatan."
        keywords="kesehatan, mahasiswa, FK UM, PrimaHealth, edukasi kesehatan, galeri kesehatan, tanya jawab kesehatan, Universitas Negeri Malang, BEM FK UM"
        structuredData={structuredData}
      />
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <HeroSection/>
        <VisiMisi/>
        <MonthlyCalendar/>
        <ArticleSection/>
        <DashboardSection/>
        <GaleriHome images={images}/>
        <Comment/>
      </div>
    </>
  )
}

export default Home