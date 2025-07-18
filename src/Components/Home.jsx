import React from 'react'
import VideoProfil from './Beranda/VideoProfil'
import VisiMisi from './Beranda/VisiMisi'
import HeroSection from './Beranda/HeroSection'
import GaleriHome from './Beranda/GaleriHome'
import ArticleSection from './Beranda/Pengumuman'
import DashboardSection from './Beranda/DashboardHome'
import MonthlyCalendar from './Beranda/MonthlyCalendar'
import Comment from './Beranda/Comment'

const images = [
  { src: '/LogoHMIF-removebg-preview.png', title: 'Image 1' },
  { src: '/LogoHMIF-removebg-preview.png', title: 'Image 2' },
  // Add more images
];
const Home = () => {
  return (
    <>
    <HeroSection/>
    <VisiMisi/>
    <MonthlyCalendar/>
    <ArticleSection/>
    <DashboardSection/>
    <GaleriHome images={images}/>
    <Comment/>
    </>
  )
}

export default Home