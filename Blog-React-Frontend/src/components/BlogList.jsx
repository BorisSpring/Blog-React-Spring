import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

//components
import { FilterBox, Pagination, LoadingSpinner } from '../components';

//custom hooks
import { useGetAllBlogs } from '../hooks/useGetAllBlogs';
import { useGetParams } from '../hooks/useGetParams';
import { getAllBlogs } from '../api/actions';
import { useNavigate } from 'react-router';
import { useDeleteBlog } from '../hooks/useDeleteBlog';
import { useDisableBlog } from '../hooks/useDisableBlog';
import { useEnableBlog } from '../hooks/useEnableBlog';
import { useMakeImportant } from '../hooks/useMakeImportant';
import { useMakeUnImportant } from '../hooks/useMakeUnimortant';

// import FilterBox from './FilterBox';
// import LoadingSpinner from './LoadingSpinner';
// import Pagination from './Pagination';

const filterBy = [
  { navigate: '?page=1', label: 'All' },
  { navigate: '?page=1&filterBy=enabled', label: 'Enabled' },
  { navigate: '?page=1&filterBy=disabled', label: 'Disabled' },
  { navigate: '?page=1&filterBy=important', label: 'Important' },
  { navigate: '?page=1&filterBy=unimportant', label: 'Not Important' },
];

const BlogList = () => {
  const { allBlogs, isLoading } = useGetAllBlogs();
  const [activeBlog, setActiveBlog] = useState();
  const params = useGetParams();
  let currentPage = Number(params.get('page'));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deleteBlog, IsDeleting } = useDeleteBlog(
    currentPage,
    allBlogs?.numberOfElements,
    params
  );
  const { disableBlog, isDisabling } = useDisableBlog();
  const { enableBlog, isEnabling } = useEnableBlog();
  const { makeImportant, isMakeingImportant } = useMakeImportant();
  const { unMarkBlog, isUnMarkingBlog } = useMakeUnImportant();

  if (isLoading) <LoadingSpinner />;

  if (allBlogs?.totalPages > currentPage) {
    params.set('page', currentPage + 1);
    queryClient.prefetchQuery({
      queryFn: () => getAllBlogs(params),
      queryKey: ['blogs', params.toString()],
    });
  }

  return (
    <div className='flex flex-col gap-5 h-[97vh] overflow-y-auto'>
      <div className='flex flex-col items-center justify-center md:flex-row md:justify-between px-3 md:px-5 lg:px-10 bg-gray-600 py-1 md:py-2'>
        <h1 className='text-[24px] text-white md:text-[40px] font-[500]'>
          All Blogs
        </h1>
        <FilterBox filterBy={filterBy} />
      </div>
      <div className='flex flex-col gap-2 mg:gap-4 lg:gap-8 p-1 md:px-5'>
        {allBlogs?.content?.map(
          ({ id, enabled, important, title, categoryName }) => (
            <div
              className='flex flex-col text-[16px] text-gray-700 font-[400] border-[2px] p-1  md:p-2 lg:px-4'
              key={id}
            >
              <p>
                {' '}
                <span className='font-[500]'>Id:</span> {id}
              </p>
              <p className='leading-5'>
                {' '}
                <span className='font-[500]'>Important Status:</span>{' '}
                <span
                  className={`${
                    important > 0 ? 'text-blue-700 ]' : ' text-purple-800 '
                  } font-[500]`}
                >
                  {important > 0
                    ? `Important (Number: ${important})`
                    : 'Not Marked'}
                </span>
              </p>
              <p>
                {' '}
                <span className='font-[500]'>Enabled:</span>{' '}
                <span
                  className={`font-[500] ${
                    enabled ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {enabled ? 'Enabled' : 'Disabled'}
                </span>
              </p>
              <p>
                <span className='text-gray-800 font-[600]'>
                  Category: {categoryName ? categoryName : 'Uncategorized'}
                </span>{' '}
              </p>
              <p className=' break-words leading-5 md:eading-8'>
                {' '}
                <span className='font-[500]'>Title:</span> {title}
              </p>

              <div className='mt-2'>
                <button
                  disabled={IsDeleting}
                  onClick={() => setActiveBlog(() => id)}
                  className={`h-6 md:h-7 p-1 outline-non text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-gray-400 flex items-center justify-center text-[12px] md:text-[14px] ${
                    activeBlog === id && 'hidden'
                  }`}
                >
                  Active
                </button>
              </div>
              <div
                className={`flex gap-1 mt-2 lg:mt-5 ${
                  activeBlog === id ? 'scale-100 ' : 'scale-0 max-w-0 max-h-0 '
                } transition-all duration-300`}
              >
                <button
                  disabled={IsDeleting}
                  onClick={() => deleteBlog(id)}
                  className='h-6 md:h-7 p-1 outline-none text-white bg-red-500 hover:bg-red-600 rounded-md transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-red-400 flex items-center justify-center text-[12px] md:text-[14px]'
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('lastUrl', window.location.search);
                    navigate(`/dashboard/addBlog/${id}`);
                  }}
                  className='h-6 md:h-7 p-1 outline-none text-white bg-green-500 hover:bg-green-600 rounded-md transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-green-400 flex items-center justify-center text-[12px] md:text-[14px]'
                >
                  Update
                </button>
                {!enabled ? (
                  <button
                    onClick={() => enableBlog(id)}
                    disabled={isEnabling}
                    className='h-6 md:h-7 p-1 outline-none text-white bg-yellow-500 hover:bg-yellow-600 rounded-md transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-yellow-400 flex items-center justify-center text-[12px] md:text-[14px]'
                  >
                    Enable
                  </button>
                ) : (
                  <button
                    onClick={() => disableBlog(id)}
                    disabled={isDisabling}
                    className='h-6 md:h-7 p-1 outline-none text-white bg-yellow-500 hover:bg-yellow-600 rounded-md transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-yellow-400 flex items-center justify-center text-[12px] md:text-[14px]'
                  >
                    Disable
                  </button>
                )}
                {!important > 0 ? (
                  <button
                    onClick={() => makeImportant(id)}
                    disabled={isMakeingImportant}
                    className='h-6 md:h-7 p-1 outline-none text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-blue-400 flex items-center justify-center text-[12px] md:text-[14px]'
                  >
                    Make important
                  </button>
                ) : (
                  <button
                    onClick={() => unMarkBlog(id)}
                    disabled={isUnMarkingBlog}
                    className='h-6 md:h-7 p-1 outline-none text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-blue-400 flex items-center justify-center text-[12px] md:text-[14px]'
                  >
                    Make Unmportant
                  </button>
                )}
              </div>
            </div>
          )
        )}
        <Pagination totalPages={allBlogs?.totalPages} />
      </div>
    </div>
  );
};

export default BlogList;
