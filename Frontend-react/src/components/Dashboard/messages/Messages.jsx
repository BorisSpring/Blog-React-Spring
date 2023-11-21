import React, { useState } from 'react';
import { format } from 'date-fns';

//components
import { Pagination, LoadingSpinner } from '../..';
import FilterBox from '../FilterBox';
//custom hooks
import { useQueryClient } from '@tanstack/react-query';
import { useGetParams } from '../../../hooks/useGetParams';
import { getAllMessages } from '../../../api/actions';
import { useGetAllMessages } from './useGetAllMessages';
import { useMarkMessageAsRead } from './useMarkMessageAsRead';
import { useMarkAsUnread } from './useMarkAsUnread';
import { useDeleteMessage } from './useDeleteMessage';
import { motion } from 'framer-motion';
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
    <div className='flex flex-col gap-2  overflow-y-scroll h-[90vh]  overflow-x-hidden '>
      <div className='flex justify-between items-center  bg-primary p-2'>
        <h1 className='text-[14] font-bold text-white lg:text-[24px]'>
          Messages
        </h1>
        <FilterBox filterBy={filterBy} />
      </div>
      {!allMessages?.numberOfElements && (
        <h1 className='text-[20px]   font-bold text-heading lg:text-[40px] mt-16 text-center md:mt-20 lg:mt-24 '>
          No messages received yet.
        </h1>
      )}
      {allMessages?.content?.map?.(
        ({ id, name, readed, createdDate, message }) => (
          <>
            <div
              className='relative px-2 py-1 flex flex-col text-primary text-xs md:text-[14px] gap-2'
              key={id}
            >
              <div className='flex flex-col max-w-[400px] w-fit  '>
                <p>
                  {' '}
                  <span>Message Id:</span> {id}
                </p>
                <p>
                  {' '}
                  <span>Sender:</span> {name}
                </p>
              </div>
              <div>
                <p>
                  <span>Created: </span>
                  {format(new Date(createdDate), 'MMM , d yyyy')}
                </p>
                <p className='mt-1'>
                  <span>Status:</span>{' '}
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
                <span>Message: </span> {message}
              </p>
              <button
                className={` bg-primary hover:bg-heading text-white rounded-sm px-2 w-fit py-1 transition-all duration-500 ${
                  menusOpen === id ? 'scale-0 h-0' : 'scale-100'
                }`}
                onClick={() => setmenusOpen(id)}
              >
                Actions
              </button>
              <ul
                className={`flex  gap-1 ${
                  menusOpen === id ? 'transition-list' : 'hidden-list'
                }`}
              >
                <li>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    disabled={isDeleting}
                    onClick={() => deleteMsg(id)}
                    className='px-3 py-1  hover:bg-red-600 bg-red-500 text-white  transition-all duration-500 cursor-pointer'
                  >
                    Delete
                  </motion.button>
                </li>

                <li>
                  <button
                    onClick={() => (readed ? unread(id) : markAsRead(id))}
                    disabled={isMarking || isUnreading}
                    className={`px-3 py-1 w-fit   transition-all duration-300 cursor-pointer text-white ${
                      readed
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-green-400 hover:bg-green-500'
                    }`}
                  >
                    Mark As Read
                  </button>
                </li>
              </ul>
            </div>
            <hr />
          </>
        )
      )}
      <Pagination totalPages={allMessages?.totalPages} />
    </div>
  );
};

export default Messages;
