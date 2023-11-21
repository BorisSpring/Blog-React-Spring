import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BiSearchAlt2, BiX } from 'react-icons/bi';
import { motion } from 'framer-motion';
const navigationMenu = ['blogs', 'contact', ''];

const Navigation = () => {
  const [isNavOpen, setisNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  return (
    <>
      <nav className='flex flex-col md:flex-row justify-between items-center px-5 py-2 container mx-auto md:py-5 relative border-b-2 border-primary mb-5 bg-white '>
        <div className='flex justify-between w-full items-center'>
          <img
            src='https://media.istockphoto.com/id/1427050530/photo/wooden-blocks-with-blog-text-of-concept-on-the-wooden-floor.webp?b=1&s=612x612&w=0&k=20&c=pF3Jq9ZE-IUilL-_Fjr5lMFL2pnhmysSkhMaizvFqW0='
            alt='Blog Logo'
            className='w-[150px] h-[40px] object-cover object-bottom'
          />
          <div
            className={`md:hidden transition-all duration-300 ${
              isNavOpen ? 'transform -rotate-180' : ''
            }`}
            onClick={() => setisNavOpen((prev) => !prev)}
          >
            {!isNavOpen ? (
              <AiOutlineMenu className='w-8 h-8 text-slate-600 transform rotate-0 transition-transform duration-300' />
            ) : (
              <AiOutlineClose className='w-8 h-8 text-slate-600 transform rotate-0 transition-transform duration-300' />
            )}
          </div>
        </div>
        <div
          className={`mt-5   flex-col w-full  gap-3 ${
            isNavOpen ? 'flex ' : 'hidden  '
          }`}
        >
          {navigationMenu.map((path, index) => (
            <NavLink
              key={index}
              to='/contact'
              className={({ isActive }) =>
                isActive
                  ? 'capitalize mr-2 text-red-700 scale-110 transition-all duration-100'
                  : 'text-heading mr-2 capitalize hover:scale-110 '
              }
            >
              {path?.length > 0 ? path : 'Home'}
            </NavLink>
          ))}
          <BiSearchAlt2 className='text-heading w-5 h-5 ' />
        </div>
        <div className='hidden md:flex md:gap-2'>
          {navigationMenu.map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? 'capitalize mr-2 text-red-700 scale-110 transition-all duration-100'
                  : 'text-heading mr-2 capitalize hover:scale-110 '
              }
            >
              {path?.length > 0 ? path : 'Home'}
            </NavLink>
          ))}
          <div className=' border-l-[2px] border-secondary w-[2px]' />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='flex items-center cursor-pointer'
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <BiSearchAlt2 className='text-heading w-5 h-5 ml-3' />
          </motion.div>
        </div>
      </nav>
      <div
        className={`${
          isSearchOpen
            ? 'w-screen h-screen bg-gray-50 scale-100 z-10'
            : 'h-0 w-0 scale-0'
        } transition-all duration-700 bg-white fixed flex items-center justify-center`}
      >
        <BiX
          className={`w-7 h-7 text-gray-700 absolute top-0 right-2 lg:w-14 lg:h-14 md:w-10 md:h-10 cursor-pointer ${
            !isSearchOpen && 'hidden'
          }`}
          onClick={() => setIsSearchOpen((prev) => !prev)}
        />
        <div
          className='relative w-[90%] md:w-[40%] lg:w-[25%] text-gray-600 text-[14px] md:text-[17px] lg:[text-20px] bg-slate-200'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (query?.trim().length > 0) {
                navigate(`/blogs?query=${query}`);
                setIsSearchOpen(false);
              }
              setQuery('');
            }
          }}
        >
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Write search query...'
            className='w-full outline-none border-b-[3px] border-gray-600 py-2 '
          />
          <BiSearchAlt2
            className='text-slate-600 w-5 h-5 md:w-7 md:h-7 absolute top-2 cursor-pointer right-0'
            onClick={() => {
              if (query?.trim().length > 0) {
                navigate(`/blogs?query=${query}`);
                setIsSearchOpen(false);
              }
              setQuery('');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Navigation;
