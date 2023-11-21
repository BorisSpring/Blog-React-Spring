import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import BlogArticle from '../BlogArticle';

const BlogSwiper = ({ blogs }) => {
  return (
    <Swiper
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 0 },
        620: { slidesPerView: 2, spaceBetween: 20 },
        970: { slidesPerView: 3, spaceBetween: 35 },
      }}
    >
      {blogs?.map?.((blog) => (
        <SwiperSlide key={blog.id}>
          <BlogArticle
            styles=' max-w-[300px] xl:max-w-[350px]'
            {...blog}
            imageStyles='max-h-[200px] w-full object-top'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BlogSwiper;
