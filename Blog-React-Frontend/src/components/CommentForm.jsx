import React from 'react';
import { useAddComment } from '../hooks/useAddComment';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addComment, isAdding } = useAddComment(reset);
  const { blogId } = useParams();

  const onSubmit = (comment) => {
    addComment({ blogId, comment: comment });
  };

  return (
    <form
      className='flex flex-col gap-10  text-gray-600 md:grid md:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        {errors?.name?.message && (
          <p className='text-red-700 text-[13px]'>{errors?.name?.message}</p>
        )}
        <input
          type='text'
          className='outline-none border-b-2 w-full'
          placeholder='Name'
          {...register('name', {
            validate: (value) =>
              value?.trim().length > 2 || 'Name must be over 2 chars',
          })}
        />
      </div>
      <div>
        <input
          type='email'
          required
          className='outline-none border-b-2 w-full'
          placeholder='Email Adress (will not be published)'
          {...register('email')}
        />
      </div>
      <div className='md:col-span-2 w-full '>
        {errors?.content?.message && (
          <p className='text-red-700 text-[13px]'>{errors?.content?.message}</p>
        )}
        <textarea
          type='text'
          rows={4}
          name='content'
          className='outline-none border-b-2 w-full '
          placeholder='Type your comment'
          {...register('content', {
            validate: (value) =>
              value.trim().length > 5 || 'Comment must be over 5 chars',
          })}
        />
      </div>
      <button
        disabled={isAdding}
        type='submit'
        className='bg-gray-500 px-2 py-1 text-white hover:bg-gray-600 transition-all duration-300 mb-5 lg:mb-10'
      >
        Submit comment
      </button>
    </form>
  );
};

export default CommentForm;
