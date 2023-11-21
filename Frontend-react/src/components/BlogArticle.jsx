import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format, formatDistance } from 'date-fns';
import { BsChatRightDots } from 'react-icons/bs';
import { CiClock2 } from 'react-icons/ci';
import { motion } from 'framer-motion';

const BlogArticle = ({
  isSwiper = false,
  styles,
  title,
  description,
  category,
  imageStyles,
  firstName,
  lastName,
  blogImage,
  userImage,
  userId,
  numberOfComments,
  id,
  created,
}) => {
  const navigate = useNavigate();
  return (
    <article
      className={`flex flex-col mx-auto ${styles} cursor-pointer `}
      onClick={() => navigate(`/blog/${id}/${title.replaceAll(' ', '-')}`)}
    >
      <div className='min-h-[200px] md:min-h-[250px] overflow-hidden'>
        <motion.img
          whileHover={{ scale: 1.15 }}
          src={`http://localhost:8080/api/users/${blogImage}`}
          alt=''
          className={` ${imageStyles} object-cover w-full object-center shadow-md min-h-[200px] md:min-h-[250px] `}
        />
      </div>
      <div className=' my-2 flex flex-col mb-10 '>
        <div className='flex items-center justify-between text-[14px] font-semibold text-secondary mb-2'>
          <p>{format(new Date(created), 'dd | MMM | yyyy')}</p>
          <Link
            className={` text-[10px]  font-medium md:text-[14px] uppercase
             ${
               category
                 ? 'cursor-pointer hover:font-bold transition-all duration-300 hover:text-orange-500'
                 : 'cursor-default'
             }
            `}
            to={category ? `/blogs?category=${category}` : '#'}
            onClick={(e) => {
              if (!category) {
                e.preventDefault();
              }
              e.stopPropagation();
            }}
          >
            {category || 'UNCATEGORIZED'}
          </Link>
        </div>
        <h2 className='text-[18px]  md:text-[20px]  mb-5  text-slate-800 leading-7 break-words font-[600] lg:max-w-[400px]'>
          {title}
        </h2>
        <p className='text-slate-600 text-[14px] lg:text-[15px] mb-5 break-words lg:max-w-[400px]'>
          {description}
        </p>
        {isSwiper && (
          <div className='flex items-center whitespace-nowrap text-slate-500 text-[11px] lg:text-[16px]'>
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              to={`/blogs/${userId}/${firstName.replaceAll(
                ' ',
                '-'
              )}-${lastName.replaceAll(' ', '-')}`}
              className='flex items-center gap-1 p-2'
            >
              <div className=' w-[30px] lg:w-[44px] overflow-hidden rounded-full'>
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  src={
                    userImage
                      ? `http://localhost:8080/api/users/${userImage}`
                      : 'imgavatar-1.jpg'
                  }
                  alt='User Avatar'
                  className='rounded-full w-[30px] lg:w-[44px]'
                />
              </div>
              <p className='capitalize'>
                {firstName} {lastName}
              </p>{' '}
              <span className='text-slate-400'>|</span>
            </Link>
            <div className=' flex items-center gap-1  p-2'>
              <CiClock2 className='w-4 h-4 lg:w-5 lg:h-5' />
              <p className=' '>
                {formatDistance(new Date(created), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </p>
              <span className='text-slate-400'>|</span>
            </div>
            <div className='flex items-center gap-2  p-2'>
              <BsChatRightDots className='w-3 h-3 lg:w-5 lg:h-5' />
              <p>{numberOfComments}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogArticle;
