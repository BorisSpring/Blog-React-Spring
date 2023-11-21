import { format } from 'date-fns';
import React from 'react';

const Comments = ({ createdDate, content, name }) => {
  return (
    <div className='flex gap-2 md:gap-4 border-b border-primary pb-4'>
      <div className='max-w-[30px] mt-1'>
        <img
          src='/img/user.svg'
          alt='User Avatar'
          className='rounded-full  max-w-[30px] mx-auto '
        />
      </div>
      <div className='flex flex-col text-secondary'>
        <p>{name}</p>
        <p className=' text-[10px] md:text-[12px]'>
          {format(new Date(createdDate), 'MMM dd , yyyy')}
        </p>
        <p className='text-heading text-[13px] md:text-[15px] mt-1'>
          {content}
        </p>
      </div>
    </div>
  );
};

export default Comments;
