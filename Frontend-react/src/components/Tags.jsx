import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useGetAllTags } from './Dashboard/tags/useGetAllTags';

const Tags = () => {
  const { allTags, isLoading } = useGetAllTags();

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-[200px] w-full'>
        <TailSpin width='20px' height='20px' color='gray' />
      </div>
    );

  if (allTags?.length < 1) return null;
  return (
    <aside className='p-5 border-2 border-gray-400 flex flex-col gap-5'>
      <h3 className='font-semibold text-heading text-[15px] md:text-[17px]  '>
        Tags
      </h3>
      <div className='flex flex-wrap gap-5'>
        {allTags.map(({ name }) => (
          <Link
            to={`/blogs?tag=${name}`}
            className='uppercase text-heading border rounded-full opacity-80 px-2 py-1 hover:bg-primary hover:text-white transition-all duration-300  border-gray-600'
            key={name}
          >
            <p className='font-semibold text-[12px]'> #{name}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
};
export default Tags;
