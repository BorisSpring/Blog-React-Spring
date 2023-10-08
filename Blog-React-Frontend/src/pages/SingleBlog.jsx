import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { CiClock2 } from 'react-icons/ci';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { BsChatRightDots, BsEye } from 'react-icons/bs';

//compoenets
import {
  SearchBlog,
  LatestBlogs,
  Categories,
  Comments,
  CommentForm,
  LoadingSpinner,
} from '../components';

//custom hooks
import { findBlogById } from '../api/actions';
import { useFindBlogById } from '../hooks/useFindBlogById';

const SingleBlog = () => {
  const isDesktopMode = useMediaQuery({ query: '(min-width:1300px)' });
  const { blogById, isLoadingBlog } = useFindBlogById();
  const queryClient = useQueryClient();
  if (isLoadingBlog) return <LoadingSpinner />;

  const {
    comments,
    title,
    description,
    contentBody,
    image,
    userImage,
    userId,
    views,
    firstName,
    lastName,
    prev,
    next,
    created,
    category,
    tags,
  } = blogById || {};

  if (prev) {
    queryClient.prefetchQuery({
      queryFn: () => findBlogById(prev.id),
      queryKey: ['blog', String(prev.id)],
    });
  }
  if (next) {
    queryClient.prefetchQuery({
      queryFn: () => findBlogById(next.id),
      queryKey: ['blog', String(next.id)],
    });
  }

  return (
    <section className='flex flex-col container mx-auto px-5 gap-5  justify-between   xl:grid xl:grid-cols-3 '>
      <div className='min-h-[100px] col-span-2 row-span-3'>
        <img
          src={`http://localhost:8080/api/users/${image}`}
          alt='About blog informations'
          className='w-full  xl:max-h-[500px] object-cover object-center  '
        />
        {/* blog title and category */}
        <Link
          to={`/blogs?category=${category.replaceAll(' ', '-')}`}
          className='uppercase font-bold opacity-60 text-slate-70 text-[12px] md:text-[14px] my-2 md:my-3 lg:my-5'
        >
          {category || 'UNCATEGORIZED'}
        </Link>
        <h2 className='text-[20px] font-bold text-slate-900 opacity-90  leading-7 md:leading-9 md:text-[32px] my-5 md:my-8 lg:my-10'>
          {title}
        </h2>
        {/* user info about blog */}
        <div className='flex items-center whitespace-nowrap text-slate-500 text-[11px] lg:text-[16px]'>
          <Link
            to={`/blogs/${userId}/${firstName.replaceAll(
              ' ',
              '- '
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
              className='rounded-full w-[36px] lg:w-[50px]'
            />
            <p className='capitalize'>
              {firstName} {lastName}
            </p>{' '}
            <span>|</span>
          </Link>
          <div className=' flex items-center gap-1  p-2'>
            <CiClock2 className='w-4 h-4 lg:w-5 lg:h-5' />
            <p className=' '>{formatDistance(new Date(created), new Date())}</p>
          </div>
          <span>|</span>
          <div className='flex items-center gap-2  p-2 ml-1'>
            <BsChatRightDots className='w-3 h-3 lg:w-4 lg:h-4' />
            <p className=' '>{comments?.length}</p>
          </div>
          <div className='flex items-center gap-2  p-2 ml-1'>
            <BsEye className='w-3 h-3 lg:w-4 lg:h-4' />
            <p className=' '>{views}</p>
          </div>
        </div>
        {/* blog description and text */}
        <p className='my-5 md:my-8 lg:my-10  text-[18px] md:text-[22px]  text-gray-700'>
          {description}
        </p>
        <p className='my-5 md:my-8 lg:my-10  text-[15px] md:text-[18px]  text-gray-700'>
          {contentBody}
        </p>
        {/* blog tags */}
        {tags?.length > 0 && (
          <div className='flex flex-wrap gap-5 border p-2 my-5 md:my-8 lg:my-10 '>
            {tags?.map(({ name }) => (
              <Link
                key={name}
                to={`/blogs?tag=${name}`}
                href='tag'
                className='uppercase text-slate-700 border rounded-full opacity-80 px-2 py-1 bg-white hover:text-white transition-all duration-300  border-slate-400 hover:bg-slate-600 '
              >
                <p className='font-semibold text-[12px]'> {name}</p>
              </Link>
            ))}
          </div>
        )}
        {/* blog next prex */}
        <div className=' flex flex-col md:grid md:grid-cols-2 gap-5 my-5 md:my-8 lg:my-10'>
          {prev && (
            <Link
              to={`/blog/${prev.id}/${prev.title.replaceAll(' ', '-')}`}
              className='find-container border py-2 px-5 gap-3  hover:border-gray-400 transition-all duration-300 flex items-center w-full'
            >
              <div className='icon-container border rounded-full flex items-center hover:bg-gray-400 transition-all duration-300 justify-center border-slate-400'>
                <BiChevronLeft className='w-7 h-7 text-gray-700 icon' />
              </div>
              <div className='flex items-center flex-col'>
                <p className='text-gray-500 font-bold text-[10px]'>
                  Previous Post
                </p>
                <p className='text-gray-500 font-bold text-[14px]'>
                  Blog Title
                </p>
              </div>
            </Link>
          )}
          {next && (
            <Link
              to={`/blog/${next.id}/${next.title.replaceAll(' ', '-')}`}
              className='find-container border py-2 px-5 gap-3  hover:border-gray-400 transition-all duration-300 flex items-center w-full justify-end'
            >
              <div className='flex items-center flex-col'>
                <p className='text-gray-500 font-bold text-[10px]'>Next Post</p>
                <p className='text-gray-500 font-bold text-[14px]'>
                  Blog Title
                </p>
              </div>
              <div className='icon-container border rounded-full flex items-center hover:bg-gray-400 transition-all duration-300 justify-center border-slate-400'>
                <BiChevronRight className='w-7 h-7 text-gray-700 icon' />
              </div>
            </Link>
          )}
        </div>

        {/* comment section */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-[18px] opacity-70 md:text-[20px] font-bold my-5 md:my-8 lg:my-10 '>
            Comments ({comments?.length})
          </h3>
          <div className='flex flex-col gap-2 md:gap-5 max-h-[500px] overflow-y-auto'>
            {comments?.map((comment) => (
              <Comments {...comment} key={comment.id} />
            ))}
          </div>
          <h2 className='text-bold text-gray-700 md:text-xl font-semibold mt-5 lg:mt-10'>
            Leave a reply
          </h2>
          <CommentForm />
        </div>
      </div>

      {isDesktopMode ? (
        <div className=' ml-auto'>
          <div className='xl:col-span-1   ml-5 xl:col-start-3 max-w-[350px] xl:mx-0 flex flex-col gap-10'>
            <SearchBlog />
            <LatestBlogs />
            <Categories />
          </div>
        </div>
      ) : (
        <div className='container mx-auto flex gap-5 flex-col my-10'>
          <SearchBlog />
          <LatestBlogs />
          <Categories />
        </div>
      )}
    </section>
  );
};

export default SingleBlog;
