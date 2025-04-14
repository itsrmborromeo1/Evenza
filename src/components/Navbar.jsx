import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Analytics from './Analytics';
import Cards from './Cards';
import Hero from './Hero';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setNav(false); 
  };

  return (
    <div className='w-full fixed top-0 left-0 z-50 bg-[#000300] text-white'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
        <h1
          className='text-3xl font-bold text-[#00df9a] cursor-pointer'
          onClick={() => handleNavigate('/')}
        >
          Evenza
        </h1>

        {/* Desktop Menu */}
        <ul className='hidden md:flex'>
          <li className='p-4 cursor-pointer hover:text-[#00df9a]' onClick={() => handleNavigate('/')}>Home</li>
          <li className='p-4 cursor-pointer hover:text-[#00df9a]' onClick={() => handleNavigate('/company')}>Events</li>
          <li className='p-4 cursor-pointer hover:text-[#00df9a]' onClick={() => handleNavigate('/login')}>Login</li>
          <li className='p-4 cursor-pointer hover:text-[#00df9a]' onClick={() => handleNavigate('/about')}>About</li>
          <li className='p-4 cursor-pointer hover:text-[#00df9a]' onClick={() => handleNavigate('/contact')}>Contact</li>
        </ul>

        {/* Mobile Menu Button */}
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
