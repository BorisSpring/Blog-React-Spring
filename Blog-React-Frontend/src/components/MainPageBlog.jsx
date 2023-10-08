import React from 'react';
import { CiClock2 } from 'react-icons/ci';
import { BsChatRightDots } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns';

const MainPageBlog = ({
  index,
  isDesktopMode,
  title,
  image,
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
    <article
      className='flex flex-col lg:flex-row lg:max-h-[300px]  cursor-pointer'
      onClick={() => navigate(`/blog/${id}/${title.replaceAll(' ', '-')}`)}
    >
      {(index % 2 === 0 || !isDesktopMode) && (
        <img
          src={`http://localhost:8080/api/users/${image}`}
          alt=''
          className='lg:w-[40%]  max-h-[300px]  object-cover  aspect-square  object-center w-full h-auto'
        />
      )}
      <div className='p-8 bg-gray-100  flex flex-col justify-evenly lg:max-w-[570px] xl:max-w-none xl:w-full  max-h-[300px] lg:max-h-[400px] '>
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
          } text-[12px]  font-bold text-slate-800`}
        >
          {category ? category : 'UNCATEGORIZED'}
        </Link>
        <h2 className='text-[16px] md:text-[17px] lg:text-[18px]  text-slate-700 leading-7 font-[600]   max-h-[80px] break-words '>
          {title}
        </h2>
        <p className='text-slate-600 text-[14px] md:text-[16px]  text-ellipsis overflow-hidden break-words'>
          {description}
        </p>
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
            <img
              src={
                userImage
                  ? `http://localhost:8080/api/users/${userImage}`
                  : '/img/user.svg'
              }
              alt='User Avatar'
              className='rounded-full w-[30px] lg:w-[40px]'
            />
            <p className='capitalize'>
              {' '}
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
            <BsChatRightDots className='w-3 h-3 lg:w-4 lg:h-4' />
            <p className=' '>{numberOfComments}</p>
          </div>
        </div>
      </div>
      {index % 2 === 1 && isDesktopMode && (
        <img
          src={`http://localhost:8080/api/users/${image}`}
          alt=''
          className='lg:w-[40%] mr-0  max-h-[300px] aspect-square  object-cover object-center w-full '
        />
      )}
    </article>
  );
};

export default MainPageBlog;
