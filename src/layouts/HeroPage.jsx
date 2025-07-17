import React, { useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroPage = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);

  return (
    <div className="relative min-h-[30vh] w-full font-serif" data-aos="">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-Sage" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[30vh] text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-5xl  max-w-4xl">
          <Typewriter
            words={[`${props.teks}`]}
            cursor={false}
            cursorStyle="_"
            typeSpeed={70}
          />
        </h1>
      </div>
    </div>
  )
}

export default HeroPage