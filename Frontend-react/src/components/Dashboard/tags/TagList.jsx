import React, { useState } from 'react';

//custom hooks
import { useUpdateTag } from './useUpdateTag';
import { useDeleteTag } from './useDeleteTag';
import { useCreateTag } from './useCreateTag';
import { useGetAllTags } from './useGetAllTags';
import LoadingSpinner from '../../LoadingSpinner';
import { format } from 'date-fns';

const TagList = () => {
  const [activeTag, setActiveTag] = useState({ id: '', isUpdate: false });
  const [message, setMessage] = useState({
    message: '',
    tagName: '',
  });
  const [addTag, setAddTag] = useState(false);

  const { updateTag, isUpdating } = useUpdateTag();
  const { deleteTag, isDeleting } = useDeleteTag();
  const { createTag, isCreating } = useCreateTag();
  const { allTags, isLoading } = useGetAllTags();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className=' flex flex-col justify-center items-center md:flex-row md:justify-between px-2 bg-primary'>
        <h2 className='text-white p-2'>Tag List</h2>
        <button
          onClick={() => setAddTag((prev) => !prev)}
          className={`${
            !addTag ? 'scale-100' : 'scale-0'
          } flex items-center justify-center  h-8 text-[17px] bg-blue-600  p-1 px-3 text-white hover:bg-blue-700 transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-blue-400`}
        >
          Add New Tag
        </button>{' '}
      </div>
      <div
        className={`w-fit transition-all duration-300  mx-auto my-10 ${
          !addTag && 'hidden w-0 h-0 p-0'
        }`}
      >
        <p className='text-center text-red-600  text-[15px]'>
          {message?.message}
        </p>
        <input
          type='text'
          required
          value={message?.tagName}
          onChange={(e) => {
            setMessage((prev) => ({ ...prev, tagName: e.target.value }));
          }}
          placeholder='Write Tag Name'
          className=' outline-none border-b-4 px-2 py-1 border-gray-600 text-primary'
        />
        <div className='flex justify-between mt-5'>
          <button
            disabled={isCreating}
            onClick={(e) => {
              setMessage((prev) => ({ ...prev, message: '' }));
              if (message?.tagName?.trim().length > 4) {
                createTag({ name: message.tagName });
                setAddTag(() => false);
                setMessage({ message: '', tagName: '' });
              } else {
                setMessage((prev) => ({
                  ...prev,
                  message: 'Tag name must be over 4 chars',
                }));
              }
            }}
            className={`flex items-center justify-center h-8 text-[17px] bg-gray-600  p-1 px-3 text-white hover:bg-gray-700 transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-blue-400`}
          >
            Add New Tag
          </button>{' '}
          <button
            onClick={() => {
              setAddTag((prev) => !prev);
              setMessage({ message: '', tagName: '' });
            }}
            className={`flex items-center justify-center h-8 text-[17px] bg-yellow-600  p-1 px-3 text-white hover:bg-yellow-700 transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-yellow-400`}
          >
            Close
          </button>{' '}
        </div>
      </div>
      <div className='p-2 md:p-3 lg:px-6 overflow-y-auto flex flex-col gap-2 md:gap-5 '>
        {allTags?.map(({ createdDate, id, name }) => (
          <div className='text-primary text-[16px] p-1 border-2 ' key={id}>
            <p>
              Id: <span className='font-[500]'>{id}</span>
            </p>
            <p>
              Created:{' '}
              <span className='font-[500]'>
                {format(new Date(createdDate), 'MMM , dd yyyy')}
              </span>
            </p>
            <p>
              Name: <span className='font-[500]'>{name}</span>
            </p>
            <button
              onClick={() => setActiveTag((prev) => ({ ...prev, id: id }))}
              className={`${
                activeTag.id === id && 'hidden'
              } flex items-center justify-center h-6 text-[14px] bg-gray-600  p-1 text-white hover:bg-gray-700 transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-gray-400`}
            >
              Action
            </button>
            <div
              className={`flex gap-1 ${
                activeTag.id === id ? 'scale-100' : 'scale-0 w-0 h-0 p-0'
              }`}
            >
              <button
                disabled={isDeleting}
                onClick={() => deleteTag(id)}
                className={`flex items-center justify-center h-6 text-[14px] bg-red-600  p-1 text-white hover:bg-red-700 transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-red-400`}
              >
                Delete
              </button>{' '}
              <button
                onClick={() =>
                  setActiveTag((prev) => ({
                    ...prev,
                    isUpdate: !activeTag.isUpdate,
                  }))
                }
                className={`flex items-center justify-center h-6 text-[14px] bg-yellow-600  p-1 text-white hover:bg-yellow-700 transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-yellow-400`}
              >
                {activeTag?.isUpdate ? 'Close Form' : 'Update'}
              </button>
            </div>
            <div
              className={`relative w-fit ${
                activeTag?.id === id && activeTag.isUpdate
                  ? 'scale-100'
                  : 'scale-0 w-0 h-0 p-0'
              } transition-all duration-300`}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (e.target.tagName.value?.trim()?.length > 4)
                    updateTag({ tagId: id, name: e.target.tagName.value });
                  setActiveTag((prev) => ({ ...prev, isUpdate: false }));
                }}
              >
                <input
                  type='text'
                  name='tagName'
                  className='outline-none px-2 w-[200px] rounded-full border-2 text-[14px]  h-[26px] border-gray-600'
                />
                <button
                  disabled={isUpdating}
                  type='submit'
                  className='bg-gray-600 text-white rounde-full hover:bg-gray-700 transition-all duration-300 top-[5px] right-0 px-2 focus:ring focus:ring-opacity-80  focus:ring-gray-400 outline-none rounded-full flex items-center justify-center h-6 absolute'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagList;
