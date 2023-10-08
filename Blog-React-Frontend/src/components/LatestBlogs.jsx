import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import { BsChatRightDots } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

//custom hook
import { useFind3NewestBlogs } from '../hooks/useFind3newestBlogs';

const LatestBlogs = () => {
  const { newestThree, isLoading } = useFind3NewestBlogs();

  if (isLoading)
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <TailSpin width='20px' height='20px' color='gray' />
      </div>
    );
  return (
    <aside className='p-5 border-[1px] flex flex-col gap-5'>
      <h3 className='font-semibold text-slate-900 text-[15px] md:text-[17px] '>
        Latest Posts
      </h3>
      {newestThree?.content?.map(
        ({ id, title, numberOfViews, numberOfComments }) => (
          <Link
            key={id}
            to={`/blog/${id}/${title.replaceAll(' ', '-')}`}
            onClick={() => {}}
            className={`  flex gap-5 border-b-2`}
          >
            <img
              src='\img\small-thumbnail-1.jpg'
              alt='about blog posted on the site'
              className='max-h-[64px]  my-auto  max-w-[64px] aspect-square object-cover object-center'
            />
            <div className='flex justify-center flex-col'>
              <p className='font-semibold opacity-80 break-words w-full'>
                {title}
              </p>
              <div className='flex gap-3 items-center text-slate-500'>
                <AiOutlineEye className='w-5 h-5' />{' '}
                <span>{numberOfViews}</span>
                <span className='text-xs'>|</span>
                <BsChatRightDots className='w-3 h-3 ' />{' '}
                <span>{numberOfComments}</span>
              </div>
            </div>
          </Link>
        )
      )}
    </aside>
  );
};

export default LatestBlogs;
