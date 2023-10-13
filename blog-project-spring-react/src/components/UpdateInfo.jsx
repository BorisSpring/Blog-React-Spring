import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiLockPasswordLine } from 'react-icons/ri';
import LoadingSpinner from '../components/LoadingSpinner';

//custom hooks
import { useChangePassword } from '../hooks/useChangePassword';
import { useGetLoggedUser } from '../hooks/useGetLoggedUser';
import { AiOutlineFileImage } from 'react-icons/ai';
import { useDeleteImage } from '../hooks/useDeleteImage';
import { useUpdateImage } from '../hooks/useUpdateImage';

const UpdateInfo = () => {
  const [image, setImage] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const { changePassword, isChaning } = useChangePassword(reset);
  const { loggedUser, isLoading } = useGetLoggedUser();
  const { deleteImage, isDeleting } = useDeleteImage();
  const { updateImage, isUpdateingImage } = useUpdateImage();

  const onSubmit = (data) => {
    const updatePasswordRequest = { ...data, userId: loggedUser?.id };
    changePassword(updatePasswordRequest);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <h1 className='text-center md:text-left text-white bg-gray-600 pb-2'>
        Update Account Information
      </h1>
      <div className='flex flex-col md:flex-row md:justify-evenly mt-5 md:mt-10'>
        <form
          className='flex flex-col border p-5 text-gray-600 max-w-[300px] m-auto mt-5 md:mt-10 text-[15px] gap-5 w-fit'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='relative'>
            <label htmlFor='repeatedPassword'>Old Password</label>
            {errors?.oldPassword?.message && (
              <p className='text-red-600 text-[13px]'>
                {errors?.oldPassword?.message}
              </p>
            )}
            <input
              type='text'
              className='outline-none w-full border-b px-8'
              placeholder='Old Password'
              required
              name='oldPassword'
              {...register('oldPassword', {
                validate: (value) =>
                  value?.trim().length > 5 ||
                  'Old password shoud be above 5 chars',
              })}
            />
            <RiLockPasswordLine className='w-5 h-5 absolute bottom-2 placeholder:text-gray-200' />
          </div>
          <div className='relative'>
            <label htmlFor='repeatedPassword'>New Password</label>
            {(errors?.repeatedNewPassword?.message ||
              errors?.newPassword?.message) && (
              <>
                <p className='text-red-600 text-[13px]'>
                  {errors?.repeatedNewPassword?.message}
                </p>
                <p>{errors?.newPassword?.message}</p>
              </>
            )}
            <input
              type='text'
              className='outline-none w-full border-b px-8'
              placeholder='New password'
              required
              name='newPassword'
              {...register('newPassword', {
                validate: (value) =>
                  value?.trim()?.length > 5 || 'Password must be over 5 chars',
              })}
            />
            <RiLockPasswordLine className='w-5 h-5 absolute bottom-2 placeholder:text-gray-200' />
          </div>
          <div className='relative'>
            <label htmlFor='repeatedNewPassword'>Repeat Password</label>
            {errors?.repeatedNewPassword && (
              <p className='text-red-600 text-[13px]'>
                {errors?.repeatedNewPassword?.message}
              </p>
            )}
            <input
              type='text'
              className='outline-none w-full border-b px-8'
              placeholder='Repeat new password'
              required
              id='repeatedNewPassword'
              name='repeatedNewPassword'
              {...register('repeatedNewPassword', {
                validate: (value) =>
                  getValues('newPassword') === value ||
                  'New password must match',
              })}
            />
            <RiLockPasswordLine className='w-5 h-5 absolute bottom-2 placeholder:text-gray-200' />
          </div>
          <button
            disabled={isChaning}
            type='submit'
            className='bg-gray-600 outline-none hover:bg-gray-700 transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-gray-400 text-white w-full'
          >
            Change Password
          </button>
        </form>
        <div className='w-fit mx-auto'>
          {(loggedUser?.image || image?.image) && (
            <button
              disabled={isDeleting}
              onClick={() => {
                deleteImage(loggedUser?.id);
                setImage({ image: null, imageUrl: '' });
              }}
              className='w-full bg-blue-600 text-white outline-none focus:ring focus:ring-opacity-80 focus:ring-blue-400 rounded-md hover:bg-gray-700 h-6 flex items-center justify-center text-[15px] md:h-8 md:text-[17px]'
            >
              Delete Image From Profile
            </button>
          )}
          <form
            encType='multipart/form-data'
            onSubmit={(e) => {
              e.preventDefault();
              if (!image?.image) {
                return;
              }
              const formData = new FormData();
              formData.append('image', image.image);
              updateImage({
                image: formData,
                userId: loggedUser?.id,
              });
            }}
          >
            <label
              className='mt-10 flex items-center justify-center h-[330px] w-[300px] border cursor-pointer'
              htmlFor='image'
            >
              <input
                type='file'
                accept='image/*'
                id='image'
                name='image'
                className='hidden'
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImage(() => ({
                      image: e.target.files[0],
                      url: URL.createObjectURL(e.target.files[0]),
                    }));
                  }
                }}
              />
              {!image?.url && (
                <AiOutlineFileImage className='w-10 h-10 text-gray-700' />
              )}
              {image?.url && (
                <img
                  className='w-[300px] h-[330px] border-2 mx-auto'
                  alt={image?.url}
                  src={image?.url}
                />
              )}
            </label>
            <button
              disabled={isUpdateingImage}
              type='submit'
              className='w-full mt-5 bg-gray-600 text-white outline-none focus:ring focus:ring-opacity-80 focus:ring-gray-400 rounded-md hover:bg-gray-700 h-6 flex items-center justify-center text-[15px] md:h-8 md:text-[17px]'
            >
              Add Image
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateInfo;
