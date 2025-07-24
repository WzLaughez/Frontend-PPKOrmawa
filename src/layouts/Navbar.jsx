import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClasses = ({ isActive }) =>
    `text-md font-medium transition-colors duration-300 ${isActive ? 'text-Blue font-semibold' : 'text-gray-700 hover:text-Blue'}`

  return (
    <header className={`fixed w-full border-b-2 top-0 z-50 font-sans transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Kiri: Logo dan Burger (mobile) */}
        <div className="flex items-center gap-3">
          {/* Burger icon hanya muncul di mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700 p-2 rounded-md"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
          {/* Logo tampil di semua ukuran layar */}
          <div className="text-2xl font-bold text-Blue">
            PrimaHealth
          </div>
        </div>

        {/* Tengah: Navigasi */}
        <div className="hidden lg:flex space-x-8">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/about" className={linkClasses}>About Us</NavLink>
          <NavLink to="/edukasi" className={linkClasses}>Edukasi</NavLink>
          <NavLink to="/galeri" className={linkClasses}>Galeri</NavLink>
          <NavLink to="/tanya" className={linkClasses}>Tanya</NavLink>
        </div>

        {/* Kanan: Tombol daftar */}
        <div className="">
          <NavLink to="/login" className="hidden lg:inline-block text-sm font-medium text-Blue hover:text-blue-900 transition">
          <button className="bg-Blue text-white px-8 py-2 text-sm font-medium hover:bg-blue-900 transition">
            Login
          </button>
          </NavLink>
        </div>

        {/* Mobile Drawer */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-50 lg:hidden">
          {/* Fade + blur backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" aria-hidden="true" />

          {/* Slide from left */}
          <div className="fixed inset-0 flex">
            <DialogPanel className="w-4/5 max-w-xs bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0">
              <div className="flex flex-col h-full p-6">
                {/* Header: Logo + Close */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-bold text-Blue">PrimaHealth</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-red-500 transition"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col space-y-4">
                  <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="text-base text-gray-700 hover:text-Blue font-medium">
                    Home
                  </NavLink>
                  <NavLink to="/program" onClick={() => setMobileMenuOpen(false)} className="text-base text-gray-700 hover:text-Blue font-medium">
                    Program
                  </NavLink>
                  <NavLink to="/edukasi" onClick={() => setMobileMenuOpen(false)} className="text-base text-gray-700 hover:text-Blue font-medium">
                    Edukasi
                  </NavLink>
                  <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="text-base text-gray-700 hover:text-Blue font-medium">
                    About Us
                  </NavLink>
                  <NavLink to="/galeri" onClick={() => setMobileMenuOpen(false)} className="text-base text-gray-700 hover:text-Blue font-medium">
                    Galeri
                  </NavLink>
                  <NavLink to="/comment" onClick={() => setMobileMenuOpen(false)} className="text-base text-gray-700 hover:text-Blue font-medium">
                    Tanya
                  </NavLink>

                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </nav>
    </header>
  )
}
