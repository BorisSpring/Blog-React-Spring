import React, { useState } from 'react';
import { format } from 'date-fns';

//components
import { FilterBox, Pagination, LoadingSpinner } from '../components';

//custom hooks
import { useGetAllMessages } from '../hooks/useGetAllMessages';
import { useQueryClient } from '@tanstack/react-query';
import { useGetParams } from '../hooks/useGetParams';
import { getAllMessages } from '../api/actions';
import { useMarkMessageAsRead } from '../hooks/useMarkMessageAsRead';
import { useMarkAsUnread } from '../hooks/useMarkAsUnread';
import { useDeleteMessage } from '../hooks/useDeleteMessage';

const filterBy = [
  { navigate: '/dashboard/messages?page=1', label: 'All' },
  { navigate: '/dashboard/messages?page=1&filterBy=readed', label: 'Readed' },
  { navigate: '/dashboard/messages?page=1&filterBy=unread', label: 'unreaded' },
];

const Messages = () => {
  const [menusOpen, setmenusOpen] = useState();
  const queryClient = useQueryClient();
  const params = useGetParams();
  const { allMessages, isLoading } = useGetAllMessages(params);
  const { markAsRead, isMarking } = useMarkMessageAsRead();
  const { unread, isUnreading } = useMarkAsUnread();
  const { deleteMsg, isDeleting } = useDeleteMessage(
    allMessages?.numberOfElements
  );

  const page = Number(params.get('page')) || 1;

  if (page < allMessages?.totalPages) {
    params.set('page', page + 1);
    queryClient.prefetchQuery({
      queryFn: async () => await getAllMessages(),
      queryKey: [params.toString(), 'messages'],
    });
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className='flex flex-col gap-2  overflow-y-scroll h-[97vh]  overflow-x-hidden '>
      <div className='flex justify-between items-center p-2 bg-gray-600'>
        <h1 className='text-[24px] font-bold text-white lg:text-[34px] mt-8 text-left mb-2'>
          Messages
        </h1>
        <FilterBox filterBy={filterBy} />
      </div>
      {!allMessages?.numberOfElements && (
        <h1 className='text-[24px]  text-center font-bold text-gray-600 lg:text-[100px] mt-16 text-centr md:mt-20 lg:mt-24 '>
          No messages.
        </h1>
      )}
      {allMessages?.content?.map?.(
        ({ id, name, readed, createdAt, message }) => (
          <div
            className='  relative px-2 py-1 flex flex-col text-gray-600 text-xs md:text-[14px] gap-2'
            key={id}
          >
            <div className='flex flex-col max-w-[400px] w-fit '>
              <p>
                {' '}
                <span className='text-[11px]'>Message Id:</span> {id}
              </p>
              <p>
                {' '}
                <span className='text-[11px]'>Sender:</span> {name}
              </p>
            </div>
            <div>
              <p>
                <span className='text-[11px]'>Created: </span>
                {createdAt && format(new Date(createdAt), 'MMM , d yyyy')}
              </p>
              <p className='mt-1'>
                <span className='text-[11px]'>Status:</span>{' '}
                <span
                  className={` ${
                    readed ? ' text-green-700' : ' text-red-600 '
                  } px-2 rounded-md`}
                >
                  {readed ? 'Readed' : 'Unreaded'}
                </span>{' '}
              </p>
            </div>
            <p>
              {' '}
              <span className='text-[11px]'>Message: </span> {message}
            </p>
            <button
              className={` text-[12px] bg-gray-400 hover:bg-gray-500 text-white rounded-sm px-2 w-fit py-1 transition-all duration-500 ${
                menusOpen === id ? 'scale-0 max-h-[0px]' : 'scale-100'
              }`}
              onClick={() => setmenusOpen(id)}
            >
              Actions
            </button>
            <ul
              className={`flex rounded-md gap-1 ${
                menusOpen === id ? 'transition-list' : 'hidden-list'
              }`}
            >
              <li>
                <button
                  disabled={isDeleting}
                  onClick={() => deleteMsg(id)}
                  className='px-3 py-1 w-fit hover:bg-gray-700 hover:text-white rounded-md transition-all duration-500 cursor-pointer  bg-slate-100 border-b-gray-500'
                >
                  Delete
                </button>
              </li>
              {!readed ? (
                <li>
                  <button
                    onClick={() => markAsRead(id)}
                    disabled={isMarking}
                    className='px-3 py-1 w-fit hover:bg-gray-700 hover:text-white   rounded-md transition-all duration-500 cursor-pointer bg-slate-100 border-b-gray-500'
                  >
                    Mark As Read
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => unread(id)}
                    disabled={isUnreading}
                    className='px-3 py-1 w-fit hover:bg-gray-700 hover:text-white   rounded-md transition-all duration-500 cursor-pointer  bg-slate-100 border-b-gray-500'
                  >
                    Unread
                  </button>
                </li>
              )}
            </ul>
          </div>
        )
      )}
      <Pagination totalPages={allMessages?.totalPages} />
    </div>
  );
};

export default Messages;
