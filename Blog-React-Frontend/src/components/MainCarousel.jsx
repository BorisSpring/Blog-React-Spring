import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const MainCarousel = () => {
  const items = [
    <img
      src='public/img/hero-bg.jpg'
      alt='Hero Section'
      className='w-full h-full object-cover object-center'
    />,
  ];

  return (
    <div className='h-[50vh]'>
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
