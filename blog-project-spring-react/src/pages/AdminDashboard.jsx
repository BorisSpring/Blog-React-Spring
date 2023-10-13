import React, { useState } from 'react';
import { BiChevronDown, BiMenu } from 'react-icons/bi';
import { useMediaQuery } from 'react-responsive';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const menu = [
  { label: 'Home', nav: '/' },
  { label: 'Categories', nav: 'categories' },
  { label: 'Comments', nav: 'comments?page=1' },
  { label: 'Messages', nav: 'messages?page=1' },
  { label: 'Tags', nav: 'tags' },
];

const menus = [
  {
    name: 'Users',
    labels: [
      { name: 'List All Users', nav: 'userList?page=1' },
      { name: 'Add New User', nav: 'addUser' },
    ],
  },
  {
    name: 'Home Sliders',
    labels: [
      { name: 'Add New Slider', nav: 'addSlider' },
      { name: 'All Sliders', nav: 'sliders?page=1' },
    ],
  },
  {
    name: 'Blogs',
    labels: [
      { name: 'Add new Blog', nav: 'addBlog' },
      { name: 'List All Blogs', nav: 'blogs?page=1' },
    ],
  },
];

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const isDesktopMode = useMediaQuery({ query: '(min-width:1300px)' });
  const [selectedMenus, setSelectedMenus] = useState();
  return (
    <div className='min-h-screen flex overflow-hidden'>
      <div
        className={`h-screen  bg-gray-600 relative ${
          open ? 'w-48' : isDesktopMode ? 'w-20' : 'w-8'
        } transition-all duration-300`}
      >
        <BiMenu
          className={`w-5 h-5 lg:w-10 lg:h-10 absolute cursor-pointer top-0 right-[50%] transition-transform translate-x-1/2 translate-y-1/2 text-white   black ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen((prev) => !prev)}
        />

        <ul className='mt-16 lg:mt-20  '>
          {menu.map(({ label, nav }) => (
            <li
              key={label}
              className={`text-white origin-center lg:py-2 h-fit text-[12px] lg:text-[17px] cursor-pointer text-center transition-all duration-300 flex items-center  w-full justify-between px-4 p-1 hover:bg-gray-400 m-auto gap-1 ${
                !open && 'scale-0'
              }`}
            >
              <Link to={`${nav}`}>{label}</Link>
            </li>
          ))}
        </ul>
        <ul className='flex flex-col gap-1 '>
          {menus.map(({ name, labels }) => (
            <li
              key={name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMenus((prev) => (prev === name ? '' : name));
              }}
              className={`text-white origin-center  h-fit text-[12px] lg:text-[17px] cursor-pointer text-center transition-all duration-300 flex flex-col items-center  w-full justify-between px-4 p-1  m-auto ${
                !open && 'scale-0'
              }`}
            >
              <div className='w-full flex items-center justify-between '>
                {name}
                <BiChevronDown
                  className={`w-5  transition-all duration-500 lg:w-7 h-5 lg:h-7 ${
                    selectedMenus === name && 'rotate-180'
                  }`}
                />
              </div>
              <ul
                className={`w-full transition-all duration-300  ${
                  selectedMenus === name
                    ? 'scale-y-100  h-auto'
                    : 'scale-0 p-0 max-h-0 max-w-0  '
                }`}
              >
                {labels.map(({ name: name2, nav }, index) => (
                  <li
                    key={name2}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={`text-left overflow-hidden   transform hover:bg-gray-400 transition-all duration-300 p-1  ${
                      selectedMenus === name
                        ? 'scale-y-100  h-auto'
                        : 'scale-0 p-0 max-h-0 max-w-0  '
                    }`}
                  >
                    <Link to={`${nav}`}>{name2}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li
            onClick={() => localStorage.removeItem('jwt')}
            className={`text-white origin-center lg:py-2 h-fit text-[12px] lg:text-[17px] cursor-pointer text-center transition-all duration-300 flex items-center  w-full justify-between px-4 p-1 hover:bg-gray-400 m-auto gap-1 ${
              !open && 'scale-0'
            }`}
          >
            <Link to='/'>Logout</Link>
          </li>
        </ul>
      </div>
      <div className='   lg:pb-7 pr-1 text-2xl font-semibold flex-1 h-screen  overflow-y-auto'>
        <h1 className='p-2 bg-gray-600 lg:pt-5 text-white text-center md:text-[28px] lg:text-[44px]'>
          Admin Dashboard
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
