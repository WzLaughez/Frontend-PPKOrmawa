import React, { useState, useEffect } from 'react';
import { Youtube, Instagram, Twitter, Mail, Link, Music, ArrowUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const SocialFooter = () => {
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false,
        });
      }, []);
  const socialLinks = [
  {
    icon: Youtube,
    link: "https://www.youtube.com/@bemfkum",
    color: "bg-gradient-to-br from-[#FF0000] to-[#CC0000]",
    hoverColor: "hover:from-[#e52d27] hover:to-[#b31217]",
    name: "YouTube"
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/bemfkum?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    color: "bg-gradient-to-br from-pink-500 via-red-500 to-pink-500",
    hoverColor: "hover:from-[#fdc468] hover:via-[#fa7e1e] hover:to-[#d62976]",
    name: "Instagram"
  },
  {
    icon: () => (
      <img
        src="/tiktok.svg"
        alt="TikTok"
        className="w-6 h-6 filter drop-shadow-[0_0_1.5px_white]"
      />
    ),
    link: "https://www.tiktok.com/@bemfkum?is_from_webapp=1&sender_device=pc",
    color: "bg-gradient-to-br from-[#25F4EE] via-[#000000] to-[#FE2C55]",
    hoverColor: "hover:from-[#1AD6D6] hover:via-gray-900 hover:to-[#FF4F7D]",
    name: "TikTok"
  },
  {
    icon: Twitter,
    link: "https://twitter.com/bemfkum",
    color: "bg-gradient-to-br from-[#1DA1F2] to-[#0D8BDB]",
    hoverColor: "hover:from-[#3ABFF8] hover:to-[#0CA5E9]",
    name: "Twitter"
  },
  {
    icon: Link,
    link: "https://linktr.ee/bemfkum",
    color: "bg-gradient-to-br from-[#32CD32] to-[#228B22]",
    hoverColor: "hover:from-[#7CFC00] hover:to-[#32CD32]",
    name: "Linktree"
  },
  {
    icon: Mail,
    link: "mailto:bemfkum@gmail.com",
    color: "bg-gradient-to-br from-[#10B981] to-[#047857]",
    hoverColor: "hover:from-[#34D399] hover:to-[#059669]",
    name: "Email"
  }
];


  return (
    <div data-aos="fade-up" className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-Sage to-Sage">
        
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Title with enhanced styling */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-Peach via-purple-300 to-Peach text-transparent bg-clip-text leading-tight">
            Connect With Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 text-lg">
            Follow BEM FK Universitas Negeri Malang official social media
          </p>
        </div>

        {/* Social Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {socialLinks.map(({ icon: Icon, link, color, hoverColor, name }, idx) => (
            <div key={idx} className="group flex flex-col items-center">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-white ${color} ${hoverColor} 
                  shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2
                  before:absolute before:inset-0 before:rounded-2xl before:bg-white before:opacity-0 hover:before:opacity-10 before:transition-opacity`}
              >
                <Icon className="w-7 h-7 relative z-10" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
              </a>
              <span className="text-gray-300 text-sm mt-3 group-hover:text-white transition-colors duration-300">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative wave */}
        <div className="flex justify-center">
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const SocialMedia = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
    
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SocialFooter />
    </>
  );
};

export default SocialMedia;