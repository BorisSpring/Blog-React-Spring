import React from 'react';
import { CiClock2 } from 'react-icons/ci';
import { BsChatRightDots } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/variants';

const MainPageBlog = ({
  index,
  isDesktopMode,
  title,
  blogImage,
  description,
  category,
  created,
  numberOfComments,
  firstName,
  userId,
  lastName,
  userImage,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <motion.article
      variants={fadeIn(
        index * 0.5,
        2,
        index % 2 === 0 ? 'left' : 'right',
        'tween'
      )}
      whileInView='show'
      initial='hidden'
      viewport={{ once: true, amount: 0.25 }}
      className='flex flex-col lg:flex-row lg:max-h-[300px]  cursor-pointer'
      onClick={() => navigate(`/blog/${id}/${title.replaceAll(' ', '-')}`)}
    >
      {(index % 2 === 0 || !isDesktopMode) && (
        <div className='lg:w-[40%]  max-h-[300px]  w-full h-auto overflow-hidden '>
          <motion.img
            whileHover={{ scale: 1.15 }}
            src={blogImage && `http://localhost:8080/api/users/${blogImage}`}
            alt=''
            className='  object-cover  aspect-square  object-center w-full h-auto'
          />
        </div>
      )}
      <div className='p-8 bg-gray-100  flex flex-col justify-evenly lg:max-w-[570px] lg:w-[570px] xl:max-w-none xl:w-full  max-h-[300px] lg:max-h-[400px] '>
        <Link
          onClick={(e) => {
            if (!category) {
              e.preventDefault();
            }
            e.stopPropagation();
          }}
          to={category ? `/blogs?category=${category}` : '#'}
          className={`uppercase  ${
            !category ? 'cursor-default' : 'cursor-pointer'
          } text-[12px]  font-bold text-secondary`}
        >
          {category ? category : 'UNCATEGORIZED'}
        </Link>
        <h2 className='text-[16px] md:text-[17px] lg:text-[18px]  text-heading leading-7 font-[600]   max-h-[80px] break-words '>
          {title}
        </h2>
        <p className='text-primary  md:text-[16px]  text-ellipsis overflow-hidden break-words'>
          {description}
        </p>
        <div className='flex items-center whitespace-nowrap text-secondary text-[11px] lg:text-[16px]'>
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
            <div className='rounded-full w-[30px] lg:w-[40px] overflow-hidden'>
              <motion.img
                whileHover={{ scale: 1.15 }}
                src={
                  userImage
                    ? `http://localhost:8080/api/users/${userImage}`
                    : '/img/user.svg'
                }
                alt='User Avatar'
                className='rounded-full w-[30px] lg:w-[40px]'
              />
            </div>
            <p className='capitalize'> </p> <span>|</span>
          </Link>
          <div className=' flex items-center gap-1  p-2'>
            <CiClock2 className='w-4 h-4 lg:w-5 lg:h-5' />
            <p className=' '>
              {formatDistance(new Date(created), new Date(), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </p>
            <span>|</span>
          </div>
          <div className='flex items-center gap-2  p-2 '>
            <BsChatRightDots className='w-3 h-3 lg:w-4 lg:h-4' />
            <p>{numberOfComments}</p>
          </div>
        </div>
      </div>
      {index % 2 === 1 && isDesktopMode && (
        <div className='lg:w-[40%]  max-h-[300px]  w-full h-auto overflow-hidden'>
          <motion.img
            whileHover={{ scale: 1.15 }}
            src={blogImage && `http://localhost:8080/api/users/${blogImage}`}
            alt={blogImage}
            className='  object-cover  aspect-square  object-center w-full h-auto'
          />
        </div>
      )}
    </motion.article>
  );
};

export default MainPageBlog;
