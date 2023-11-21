import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

const MainCarousel = ({ slides }) => {
  const items = slides?.map(({ id, title, buttonTitle, buttonUrl, image }) => (
    <div key={id} className='text-heading font-bold'>
      <img
        style={{ filter: 'brightness(0.9)' }}
        src={`http://localhost:8080/api/users/${image}`}
        alt='Hero Section'
        className=' w-full h-full object-cover object-center aspect-auto relative '
      />
      <h1 className=' absolute top-[10%] left-[10%]  md:max-w-[400px] md:text-[23px] lg:text-[30px] lg:max-w-[650px]'>
        {title}
      </h1>
      <Link
        to={buttonUrl}
        className=' absolute bottom-[10%] left-[10%]  z-10 text-[22px] underline tracking-wider'
      >
        {buttonTitle}
      </Link>
    </div>
  ));
  return (
    <div className='h-[50vh] '>
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={5000}
        animationDuration={1000}
        infinite
        disableDotsControls
        disableButtonsControls
      />
    </div>
  );
};

export default MainCarousel;
