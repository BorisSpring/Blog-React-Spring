import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineFileImage } from 'react-icons/ai';
import { MdOutlineTitle, MdOutlineWbIncandescent } from 'react-icons/md';
import { BiBookContent } from 'react-icons/bi';
import LoadingSpinner from '../../LoadingSpinner';
import { useParams } from 'react-router';
import { useGetLoggedUser } from '../users/useGetLoggedUser';
import { useGeAllCategories } from '../categories/useGetAllCategories';
import { useFindBlogById } from '../../SingleBlogPage/useFindBlogById';
import { useCreateBlog } from './useCreateBlog';
import { useGetAllTags } from '../tags/useGetAllTags';

const BlogForm = () => {
  const [message, setMessage] = useState('');
  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
    isSubmitting,
  } = useForm();
  const { blogId } = useParams();
  const [image, setImage] = useState();
  const [serverValidation, setServerValidation] = useState();
  const { loggedUser, isLoading: isLoadingUser } = useGetLoggedUser();
  const { allCategories, isLoading } = useGeAllCategories();
  const { blogById, isLoadingBlog } = useFindBlogById();
  const { createBlog, isCreating } = useCreateBlog(
    reset,
    setImage,
    blogById?.id,
    setServerValidation
  );
  const { allTags, isLoading: isLoadingsTags } = useGetAllTags();
  const [tags, setTags] = useState(() => blogById?.tags?.map((tag) => tag.id));

  const onSubmit = (data) => {
    if (!image && !blogId) {
      setMessage('Image required');
      return;
    }

    const formData = new FormData();
    const { categoryId, contentBody, description, title } = data;
    categoryId && formData.append('categoryId', categoryId);
    blogById?.id && formData.append('blogId', blogById.id);
    image && formData.append('image', image);
    formData.append('userId', loggedUser?.id);
    formData.append('tagsId', tags);
    formData.append('description', description);
    formData.append('title', title);
    formData.append('contentBody', contentBody);
    createBlog(formData);
  };
  if (
    isLoading ||
    isLoadingUser ||
    isLoadingsTags ||
    (isLoadingBlog && blogById?.id)
  )
    return <LoadingSpinner />;

  return (
    <>
      <h1 className='px-12 font-semibold text-[24px] text-gray-600 mt-5'>
        Add new Blog
      </h1>
      <h1 className='text-center text-red-700 text-[16px] md:-text-[20px] font-[500]'>
        {message}
      </h1>
      <div className='w-full   flex flex-col md:flex-row overflow-y-auto mt-5 px-10 pb-10 relative'>
        <form
          encType='multipart/formdata'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-10 w-full p-2 md:p-5 text-gray-500 text-[16px] md:flex-row '
        >
          <div className='flex flex-col gap-10 w-full'>
            <p className='text-red-700 text-[12px] leading-4'>
              {errors?.title?.message || serverValidation?.title}
            </p>

            <div className='relative w-full '>
              <textarea
                type='text'
                rows={5}
                name='title'
                defaultValue={blogById?.title}
                {...register('title', {
                  required: 'Field Required',
                  validate: (value) =>
                    (value?.length > 45 && value?.length < 250) ||
                    'Title Must be over 45 and less then 250 chars',
                })}
                required
                className='outline-none w-full border-b px-8'
                placeholder='Blog title must be minimum 45 char and maximum 250 char'
              />
              <MdOutlineTitle className='w-5 h-5   absolute top-0 text-slate-600 placeholder:text-gray-200' />
            </div>

            <p className='text-red-700 text-[12px] leading-4'>
              {errors?.description?.message || serverValidation?.description}
            </p>

            <div className='relative'>
              <textarea
                rows={5}
                type='text'
                defaultValue={blogById?.description}
                className='outline-none w-full border-b px-8'
                placeholder='Description about blog artice , must be over 50 and les then 500 chars....'
                name='description'
                {...register('description', {
                  required: 'Description Required',
                  validate: (value) =>
                    (value?.trim()?.length > 50 &&
                      value?.trim()?.length < 500) ||
                    'Description must be over 50 and less then 500 chars',
                })}
              />
              <MdOutlineWbIncandescent className='w-5 h-5 absolute top-0 text-slate-600 placeholder:text-gray-200' />
            </div>
            {errors?.contentBody && (
              <p className='text-red-700 text-[12px]'>
                {errors?.contentBody?.message || serverValidation?.contentBody}
              </p>
            )}
            <div className='relative'>
              <textarea
                rows={8}
                type='text'
                required
                defaultValue={blogById?.contentBody}
                name='contentBody'
                className='outline-none w-full border-b px-8'
                placeholder='Blog content body must be over 50 chars'
                {...register('contentBody', {
                  required: 'Content Body Required',
                  validate: (value) =>
                    value?.trim()?.length > 50 || 'Body must be over 50 chars',
                })}
              />
              <BiBookContent className='w-5 h-5 absolute top-[6px] text-slate-600 placeholder:text-gray-200' />
            </div>
            {allCategories?.length > 0 && (
              <select
                className='w-full bg-white text-gray-600 text-[15px]'
                {...register('categoryId')}
              >
                {allCategories?.map(({ id, name }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            )}
            <div>
              <p>Select Tags for Blog</p>
              <div className='flex gap-2 flex-wrap leading-4 mt-2 md:leading-5'>
                Selected Tags:{' '}
                {tags?.map((tagId) => (
                  <span key={tagId}>
                    {allTags?.find((item) => item.id === tagId)?.name} ,
                  </span>
                ))}
              </div>
            </div>
            <select
              className='w-full text-[15px] text-primary'
              onChange={(e) => {
                const exists = tags?.some((item) => item === e.target.value);
                !exists &&
                  setTags((prev) =>
                    prev?.length > 0
                      ? [...prev, e.target.value]
                      : [e.target.value]
                  );
              }}
            >
              {allTags?.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            <button
              disabled={isCreating || isSubmitting}
              type='submit'
              className='bg-gray-600 w-full hidden md:block hover:bg-gray-500 text-white transition-all duration-500 px-2 py-1 md:py-2'
            >
              Submit New Blog
            </button>
          </div>
          <label
            htmlFor='image'
            className='cursor-pointer w-full max-w-[600px] min-h-[200px] ml-auto border h-full flex items-center justify-center'
          >
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt='Blog Avatar'
                className='w-full h-full object-cover object-center'
              />
            )}
            {!image && blogById?.image && (
              <img
                src={`http://localhost:8080/api/users/${blogById?.image}`}
                alt='Blog Avatar'
                className='w-full h-full object-cover object-center'
              />
            )}
            {!image && (
              <AiOutlineFileImage className='w-10 h-10 text-primary' />
            )}
          </label>
          <input
            type='file'
            capture='camera'
            className='hidden'
            accept='image/**'
            id='image'
            name='image'
            value={''}
            onChange={(e) => setImage(() => e.target.files[0])}
          />
          <button
            disabled={isCreating || isSubmitting}
            type='submit'
            className='bg-gray-600 w-full block md:hidden  hover:bg-gray-500 text-white transition-all duration-500 px-2 py-1 md:py-2 mb-[80px]'
          >
            Submit New Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
