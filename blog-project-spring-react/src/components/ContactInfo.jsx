import React from 'react';
import { BiSolidLocationPlus } from 'react-icons/bi';
import { AiFillPhone } from 'react-icons/ai';
import { RiMessage2Fill } from 'react-icons/ri';

const ContactInfo = () => {
  return (
    <aside className='p-5 border-[1px] flex flex-col gap-5'>
      <h3 className='font-semibold text-slate-900 text-[15px] md:text-[17px] '>
        Contact Info
      </h3>
      <div>
        <div className='opacity-70 font-semibold text-slate-700 bg-slate-100 p-3 flex  justify-between items-center'>
          Bistricka 4, Belgrade, Serbia{' '}
          <BiSolidLocationPlus className='w-5 h-5' />
        </div>
        <div className='opacity-70 font-semibold text-slate-700  p-3 flex  justify-between items-center'>
          +381-62-9256-229 <AiFillPhone className='w-5 h-5' />
        </div>
        <div className='opacity-70 font-semibold text-slate-700 bg-slate-100 p-3 flex  justify-between items-center'>
          borisdimitrijevicit@gmail.com
          <RiMessage2Fill className='w-5 h-5' />
        </div>
      </div>
    </aside>
  );
};

export default ContactInfo;
