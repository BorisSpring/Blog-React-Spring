import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useGetAllTags } from '../hooks/useGetAllTags';

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
    <aside className='p-5 border-[1px] flex flex-col gap-5'>
      <h3 className='font-semibold text-slate-900 text-[15px] md:text-[17px]  '>
        Tags
      </h3>
      <div className='flex flex-wrap gap-5'>
        {allTags.map(({ name }) => (
          <Link
            to={`/blogs?tag=${name}`}
            className='uppercase text-slate-600 border rounded-full opacity-80 px-2 py-1 hover:bg-gray-600 hover:text-white transition-all duration-300 bg-white  border-slate-400'
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
