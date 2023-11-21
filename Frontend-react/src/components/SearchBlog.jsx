import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useNavigate } from 'react-router';

const SearchBlog = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <aside
      className='p-5 border-2 border-gray-400 flex-grow w-full max-h-[130px]'
      onKeyDown={(e) => {
        if (e.key === 'Enter' && query?.trim()?.length > 0) {
          navigate(`/blogs?query=${query}`);
          setQuery('');
        }
      }}
    >
      <h3 className='font-semibold text-primary md:text-[17px] mb-5 '>
        Search the blog
      </h3>
      <div className='flex items-center w-full relative'>
        <input
          type='text'
          placeholder='What are you looking for?'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='outline-none border-b-2 w-full placeholder:text-gray-500  py-1 border-primary'
        />
        <BiSearchAlt2
          className='w-5 h-5 text-primary right-1 absolute cursor-pointer'
          onClick={() => {
            if (query?.trim()?.length > 0) {
              navigate(`/blogs?query=${query}`);
              setQuery('');
            }
          }}
        />
      </div>
    </aside>
  );
};

export default SearchBlog;
