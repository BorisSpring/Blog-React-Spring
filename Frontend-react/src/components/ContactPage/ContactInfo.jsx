import React from 'react';
import { BiSolidLocationPlus } from 'react-icons/bi';
import { AiFillPhone } from 'react-icons/ai';
import { RiMessage2Fill } from 'react-icons/ri';

const ContactInfo = () => {
  return (
    <aside className='p-5 border-2 border-gray-400 flex flex-col gap-5'>
      <h3 className='font-semibold text-heading  md:text-[17px] '>
        Contact Info
      </h3>
      <div className='font-bold text-secondary  whitespace-nowrap '>
        <div className=' opacity-90 bg-slate-100 p-3 flex  justify-between items-center'>
          Bistricka 4, Belgrade, Serbia{' '}
          <BiSolidLocationPlus className='w-5 h-5' />
        </div>
        <div className=' opacity-90  p-3 flex  justify-between items-center'>
          +381-62-9256-229 <AiFillPhone className='w-5 h-5' />
        </div>
        <div className=' opacity-90 bg-slate-100 p-3 flex  justify-between items-center'>
          borisdimitrijevicit@gmail.com
          <RiMessage2Fill className='w-5 h-5' />
        </div>
      </div>
    </aside>
  );
};

export default ContactInfo;
