import React, { useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import AOS from 'aos';
import 'aos/dist/aos.css';

const TitlePengumuman = (props) => {

  return (
    <div className="relative min-h-[10vh] w-full font-poppins" >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-customBlue1" />
      </div>

    </div>
  )
}

export default TitlePengumuman