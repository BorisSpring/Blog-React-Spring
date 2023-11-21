import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

//components
import { Pagination, LoadingSpinner } from '../..';

//custom hooks
import { useGetAllBlogs } from './useGetAllBlogs';
import { useGetParams } from '../../../hooks/useGetParams';
import { getAllBlogs } from '../../../api/actions';
import { useNavigate } from 'react-router';
import { useDeleteBlog } from './useDeleteBlog';
import { useDisableBlog } from './useDisableBlog';
import { useEnableBlog } from './useEnableBlog';
import { useMakeImportant } from './useMakeImportant';
import { useMakeUnImportant } from './useMakeUnimortant';
import FilterBox from '../FilterBox';

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
              className='flex flex-col text-[16px] text-primary  border-2 p-1  md:p-2 lg:px-4'
              key={id}
            >
              <p>
                {' '}
                <span className='font-bold'>Id:</span> {id}
              </p>
              <p className='leading-5'>
                {' '}
                <span className='font-bold'>Important Status:</span>{' '}
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
                  className={`font-bold ${
                    enabled ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {enabled ? 'Enabled' : 'Disabled'}
                </span>
              </p>
              <p>
                <span className='font-bold'>
                  Category: {categoryName ? categoryName : 'Uncategorized'}
                </span>{' '}
              </p>
              <p className=' break-words leading-5 md:eading-8'>
                {' '}
                <span className='font-bold'>Title:</span> {title}
              </p>

              <div className='mt-2'>
                <button
                  disabled={IsDeleting}
                  onClick={() => setActiveBlog(() => id)}
                  className={`h-6 md:h-7 p-1 outline-non text-white bg-gray-500 hover:bg-gray-600  transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-gray-400 flex items-center justify-center text-[12px] md:text-[14px] ${
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
                  className='h-6 md:h-7 p-1 outline-none text-white bg-red-500 hover:bg-red-600  transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-red-400 flex items-center justify-center text-[12px] md:text-[14px]'
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('lastUrl', window.location.search);
                    navigate(`/dashboard/addBlog/${id}`);
                  }}
                  className='h-6 md:h-7 p-1 outline-none text-white bg-green-500 hover:bg-green-600  transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-green-400 flex items-center justify-center text-[12px] md:text-[14px]'
                >
                  Update
                </button>
                <button
                  onClick={() => (!enabled ? enableBlog(id) : disableBlog(id))}
                  disabled={isEnabling || isDisabling}
                  className='h-6 md:h-7 p-1 outline-none text-white bg-yellow-500 hover:bg-yellow-600  transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-yellow-400 flex items-center justify-center text-[12px] md:text-[14px]'
                >
                  {enabled ? 'Disable' : 'Enable'}
                </button>

                <button
                  onClick={() =>
                    !important > 0 ? makeImportant(id) : unMarkBlog(id)
                  }
                  disabled={isMakeingImportant || isUnMarkingBlog}
                  className='h-6 md:h-7 p-1 outline-none text-white bg-blue-500 hover:bg-blue-600  transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-blue-400 flex items-center justify-center text-[12px] md:text-[14px]'
                >
                  Make important
                </button>
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
