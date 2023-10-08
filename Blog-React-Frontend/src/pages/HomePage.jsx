import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';

//components
import {
  MainCarousel,
  MainPageBlog,
  LoadingSpinner,
  BlogSwiper,
} from '../components';

//custom hooks
import { useFindLastThreeImportant } from '../hooks/useFindLastThreeImportant';
import { useFindNewestBlogs } from '../hooks/useFindNewestBlogs';

const HomePage = () => {
  const isDesktopMode = useMediaQuery({ query: '(min-width:1030px)' });
  const { lastThreeImportant, isLoadingImportant } =
    useFindLastThreeImportant();
  const { newestBlogs, isLoadingNewest } = useFindNewestBlogs();

  if (isLoadingImportant && isLoadingNewest) return <LoadingSpinner />;
  return (
    <>
      <header>
        <MainCarousel />
        <div className='container mx-auto  px-5 my-[48px] lg:px-10'>
          <h1 className='text-[32px] md:text-[44px] lg:text[60px] font-bold text-slate-900 mb-3 leading-8 md:leading-10'>
            Some great into here
          </h1>
          <p className='text-[24px] spacing'>
            Place a nice <span className='font-bold'>introduction</span> here to{' '}
            <span className='font-semibold'> to catch reader's attention.</span>
          </p>
        </div>
        <section className='container mx-auto px-5 lg:px-10 mb-[24px] md:mb-[48px] lg:mb-[96px] '>
          {lastThreeImportant?.map?.((blog, index) => (
            <MainPageBlog
              {...blog}
              isDesktopMode={isDesktopMode}
              index={index}
              key={index}
            />
          ))}
        </section>

        <section className='relative  mb-[24px] md:mb-[48px] lg:mb-[96px]'>
          <img
            src='img/divider-bg.jpg'
            alt='Divider'
            className='w-full max-h-[300px] md:max-h-[350px] object-cover object-center'
          />
          <h3 className='font-bold text-white absolute top-[10%] max-w-[300px] md:max-w-[50%] z-10  text-[26px] lg:max-w-[45%] xl:max-w-[35%] md:text-[36px] leading-7 md:top-[15%] left-[10%] md:leading-9 lg:leading-[38px]'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </h3>
          <Link
            to='/contact'
            className='text-white border-b-2 text-[20px] absolute bottom-[10%] md:bottom-[10%] left-[10%]'
          >
            Contact us
          </Link>
        </section>
        <section className='container mx-auto px-5 lg:px-10  mb-[24px] md:mb-[48px] lg:mb-[96px]'>
          <h3 className='text-slate-900 font-bold text-[26px] md:text-[32px] lg:text-[36px]'>
            Latest from the blog
          </h3>
          <p className='text-slate-500 text-[16px] md:text-[18px] lg:text-[21px] mb-5 md:mb-10 lg:mb-24'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
          <BlogSwiper blogs={newestBlogs} />
        </section>
      </header>
      <figure className='flex flex-col sm:grid sm:grid-cols-2 sm:mx-auto lg:mx-0 lg:flex md:flex-row  '>
        <div className='relative max-h-[170px] w-full image-container'>
          <img
            src='\img\gallery-1.jpg'
            alt='Galerys '
            className='max-h-[170px]  w-full object-cover object-center relative'
          />
          <div className='overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <BiSearchAlt2 className=' w-10 h-10 text-white' />
          </div>
        </div>
        <div className='relative max-h-[170px] w-full image-container'>
          <img
            src='\img\gallery-2.jpg'
            alt='Galerys '
            className='max-h-[170px]  w-full object-cover object-center relative'
          />
          <div className='overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <BiSearchAlt2 className=' w-10 h-10 text-white' />
          </div>
        </div>
        <div className='relative max-h-[170px] w-full image-container'>
          <img
            src='\img\gallery-3.jpg'
            alt='Galerys '
            className='max-h-[170px]  w-full object-cover object-center relative'
          />
          <div className='overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <BiSearchAlt2 className=' w-10 h-10 text-white' />
          </div>
        </div>
        <div className='relative max-h-[170px] w-full image-container'>
          <img
            src='\img\gallery-1.jpg'
            alt='Galerys '
            className='max-h-[170px]  w-full object-cover object-center relative'
          />
          <div className='overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <BiSearchAlt2 className=' w-10 h-10 text-white' />
          </div>
        </div>
      </figure>
    </>
  );
};

export default HomePage;
