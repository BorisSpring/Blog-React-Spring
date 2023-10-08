import React, { useState } from 'react';

//components
import { FilterBox, LoadingSpinner, Pagination } from '../components';

//custom hooks
import { useFindAllUser } from '../hooks/useFindAllUser';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useBanUser } from '../hooks/useBanUser.js';
import { useUnbanUser } from '../hooks/useUnbanUser';
import { useGetParams } from '../hooks/useGetParams';
import { useQueryClient } from '@tanstack/react-query';
import { findAllUsers } from '../api/actions';

const filterBy = [
  { navigate: '/dashboard/userList?page=1', label: 'All' },
  { navigate: '/dashboard/userList?page=1&filterBy=enabled', label: 'Enabled' },
  {
    navigate: '/dashboard/userList?page=1&filterBy=disabled',
    label: 'Disabled',
  },
];

const UserList = () => {
  const { allUsers, isLoading } = useFindAllUser();
  const [selectedUser, setSelectedUser] = useState();
  const { deleteUser, isDeleting } = useDeleteUser(allUsers);
  const { banUser, isBanning } = useBanUser();
  const { unbanUser, isUnbanning } = useUnbanUser();
  const params = useGetParams();
  const queryClient = useQueryClient();

  const currentPage = Number(params.get('page'));

  if (allUsers?.totalPages > currentPage) {
    params.set('page', currentPage + 1);
    queryClient.prefetchQuery({
      queryFn: async () => await findAllUsers(params),
      queryKey: ['users', params.toString()],
    });
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='lg:pr-5 font-medium h-screen overflow-y-auto pb-10'>
      <div className=' flex justify-between items-center bg-gray-600 p-2 md:p-3'>
        <h2 className='font-medium text[20px] lg:text-[24px] text-white'>
          List Of Users
        </h2>
        <FilterBox filterBy={filterBy} />
      </div>
      <div className='px-2 md:px-5 w-full'>
        <table className='w-full mt-5 space-x-2  overflow-scroll '>
          <thead>
            <tr className='text-[15px] text-left font-medium lg:text-[18px] text-gray-600 border-b-2 border-b-gray-300'>
              <th>Id</th>
              <th>Image</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Status</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {allUsers?.content?.map(
              (
                { id, firstName, lastName, email, number, image, enabled },
                index
              ) => (
                <tr
                  key={id}
                  className={`font-[400] p-1 transition-all duration-300  text-left text-[14px]  ${
                    index % 2 !== 0 ? 'bg-gray-200 hover' : 'bg-white'
                  } hover:bg-gray-300`}
                >
                  <td className=' font-[500] py-2'>{id}.</td>
                  <td className='py-2'>
                    <img
                      src={
                        image
                          ? 'assets/avatar-1.png'
                          : `http://localhost:8080/api/users/${image}`
                      }
                      alt='User Avatar'
                      className='w-8 h-8 rounded-full   object-cover object-center'
                    />
                  </td>
                  <td className='py-2'>
                    {firstName} {lastName}
                  </td>
                  <td className='py-2'>{email}</td>
                  <td className='py-2'>{number}</td>
                  <td
                    className={`py-2 ${
                      enabled ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {enabled ? 'Enabled' : 'Disabled'}
                  </td>
                  <td className='text-right py-2'>
                    <button
                      onClick={() => setSelectedUser(() => id)}
                      className={`bg-gray-500 ${
                        selectedUser === id
                          ? 'scale-0 max-w-0 hidden'
                          : 'scale-100 '
                      }  hover:bg-gray-600 transition-all duration-500 text-white px-2  rounded-sm border-none focus:ring focus:ring-opacity-80 focus:ring-gray-400  outline-none`}
                    >
                      Action
                    </button>
                    <div
                      className={`text-[10px]  flex flex-row gap-1 transition-all duration-300 justify-end m-auto ${
                        selectedUser === id ? 'scale-100' : 'scale-0 max-h-0'
                      } `}
                    >
                      {!enabled ? (
                        <button
                          disabled={isUnbanning}
                          onClick={() => unbanUser(id)}
                          className={`bg-green-500 hover:bg-green-600 transition-all duration-500 text-white px-1 md:px-2   focus:ring focus:ring-opacity-80 focus:ring-green-400  rounded-md border-none`}
                        >
                          Enable
                        </button>
                      ) : (
                        <button
                          disabled={isBanning}
                          onClick={() => banUser(id)}
                          className={`bg-yellow-500   hover:bg-yellow-600 transition-all duration-500 text-white px-1 md:px-2  focus:ring focus:ring-opacity-80 focus:ring-yellow-400  rounded-md border-none`}
                        >
                          Disable
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(id)}
                        disabled={isDeleting}
                        className={`bg-red-500  rounded-md  hover:bg-red-600 transition-all duration-500 text-white px-1 md:px-2 focus:ring focus:ring-opacity-80 focus:ring-red-400   border-none`}
                      >
                        Delete{' '}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={allUsers?.totalPages} />
    </div>
  );
};

export default UserList;
