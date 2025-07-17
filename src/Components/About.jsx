import React, { useState } from 'react'
import HeroPage from '../layouts/HeroPage'
import OrganizationalDevelopmentPlan from './plan/OrganizationalDevelopmentPlan '
import Kepengurusan from './about/Kepengurusan'
import LogoPhilosophy from './about/LogoPhilosophy'
const About = () => {

  const [activeComponent, setActiveComponent] = useState('organizational');

  return (
    <>
    
    <div className="flex items-center justify-center gap-4 my-4 mt-24">
    <button 
  onClick={() => setActiveComponent('organizational')} 
  className="px-4 py-2 bg-Peach text-black rounded transition-transform duration-300 ease-in-out hover:bg-green-700 hover:text-white hover:scale-105"
>
  Kepengurusan
</button>
<button 
  onClick={() => setActiveComponent('logoPhilosophy')} 
  className="px-4 py-2 bg-Peach text-black rounded transition-transform duration-300 ease-in-out hover:bg-green-700 hover:text-white hover:scale-105"
>
  Filosofi Logo
</button>
<button 
  onClick={() => setActiveComponent('plan')} 
  className="px-4 py-2 bg-Peach text-black rounded transition-transform duration-300 ease-in-out hover:bg-green-700 hover:text-white hover:scale-105"
>
  Rencana Kerja
</button>

      </div>
      {activeComponent === 'organizational' ? (
  <Kepengurusan />
) : activeComponent === 'logoPhilosophy' ? (
  <LogoPhilosophy />
) : activeComponent === 'plan' ? (
  <OrganizationalDevelopmentPlan />
) : null}
   
    </>
  )
}

export default About