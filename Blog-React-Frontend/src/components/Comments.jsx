import { format } from 'date-fns';
import React from 'react';

const Comments = ({ createdAt, content, name }) => {
  return (
    <div className='flex gap-2 md:gap-4 border-b pb-4'>
      <div className='max-w-[30px] mt-1'>
        <img
          src='/img/user.svg'
          alt=''
          className='rounded-full  max-w-[30px] mx-auto '
        />
      </div>
      <div className='flex flex-col'>
        {/* <div className='flex items-start flex-col'> */}
        <p className='text-[14px] font-bold opacity-80 text-slate-900'>
          {name}
        </p>
        <p className='text-gray-600 text-[11px] font-[500]'>
          {format(new Date(createdAt), 'MMM, yyyy')}
        </p>
        {/* </div> */}
        <p className='text-gray-700 text-[13px] md:text-[15px] mt-1'>
          {content}
        </p>
      </div>
    </div>
  );
};

export default Comments;
