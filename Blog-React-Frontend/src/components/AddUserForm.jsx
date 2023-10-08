import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineFileImage } from 'react-icons/ai';
import { useAddUser } from '../hooks/useAddUser';
import { useGetLoggedUser } from '../hooks/useGetLoggedUser';
import LoadingSpinner from './LoadingSpinner';
import { useParams } from 'react-router';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  number: '',
  password: '',
  repeatedPassword: '',
  image: '',
  url: '',
  errorMessage: '',
};

const AddUserForm = () => {
  const [user, setUser] = useState(initialState);
  const { addNewUser, isAdding } = useAddUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.repeatedPassword !== user.password) {
      setUser((prev) => ({ ...prev, errorMessage: 'Password must match' }));
      return;
    } else {
      setUser(initialState);
      const formData = new FormData();
      formData.append('image', user.image);
      formData.append('lastName', user.lastName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('number', user.number);
      formData.append('firstName', user.firstName);
      addNewUser(formData);
    }
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setUser((prev) =>
      e.target?.files?.[0]
        ? {
            ...prev,
            image: e.target.files?.[0],
            url: URL.createObjectURL(e.target.files[0]),
          }
        : { ...prev, [name]: e.target.value }
    );
  };

  return (
    <>
      <h1 className='px-12 font-semibold text-[24px] text-gray-600 mt-5 lg:mt-10'>
        Add New User
      </h1>
      <div className='w-full h-full flex flex-col md:flex-row overflow-auto mt-5 px-10 pb-10'>
        <form
          encType='multipart/formdata'
          onSubmit={(e) => handleSubmit(e)}
          className='flex flex-col gap-10 w-full p-2 md:p-5 text-gray-500 text-[16px] md:flex-row'
        >
          <div className='flex flex-col gap-10 w-full'>
            <div className='relative w-full '>
              <input
                type='text'
                name='firstName'
                value={user.firstName}
                onChange={handleChange}
                required
                className='outline-none w-full border-b px-8'
                placeholder='First Name'
              />
              <BiUser className='w-5 h-5 absolute top-0 text-slate-600 placeholder:text-gray-200' />
            </div>
            <div className='relative'>
              <input
                type='text'
                required
                className='outline-none w-full border-b px-8'
                placeholder='Last Name'
                name='lastName'
                value={user.lastName}
                onChange={handleChange}
              />
              <BiUser className='w-5 h-5 absolute top-0 text-slate-600 placeholder:text-gray-200' />
            </div>
            <div className='relative'>
              <input
                type='email '
                required
                className='outline-none w-full border-b px-8'
                placeholder='Email Adress'
                name='email'
                value={user.email}
                onChange={handleChange}
              />
              <AiOutlineMail className='w-5 h-5 absolute top-[6px] text-slate-600 placeholder:text-gray-200' />
            </div>
            <div className='relative'>
              <input
                type='text'
                required
                className='outline-none w-full border-b px-8'
                placeholder='Phone Number'
                name='number'
                value={user.number}
                onChange={handleChange}
              />
              <BiUser className='w-5 h-5 absolute top-0 text-slate-600 placeholder:text-gray-200' />
            </div>
            <div className='relative'>
              {user.errorMessage && (
                <p className='text-red-600 text-[13px]'>{user.errorMessage}</p>
              )}
              <input
                type='text'
                className='outline-none w-full border-b px-8'
                placeholder='Password'
                required
                name='password'
                value={user.password}
                onChange={handleChange}
              />
              <RiLockPasswordLine className='w-5 h-5 absolute bottom-3 text-slate-600 placeholder:text-gray-200' />
            </div>

            <div className='relative'>
              {user.errorMessage && (
                <p className='text-red-600 text-[13px]'>{user.errorMessage}</p>
              )}
              <input
                type='text'
                className='outline-none w-full border-b px-8'
                placeholder='Repeat Password'
                required
                value={user.repeatedPassword}
                name='repeatedPassword'
                onChange={handleChange}
              />
              <RiLockPasswordLine className='w-5 h-5 absolute bottom-3 text-slate-600 placeholder:text-gray-200' />
            </div>
            <button
              type='submit'
              disabled={isAdding}
              className='bg-gray-600 w-full hidden md:block hover:bg-gray-500 text-white transition-all duration-500 px-2 py-1 md:py-2'
            >
              Submit New User
            </button>
          </div>
          <label
            htmlFor='image'
            className='cursor-pointer w-full max-w-[600px] min-h-[200px] ml-auto border h-full flex items-center justify-center'
          >
            {user.url && (
              <img
                src={user?.url}
                alt='User Avatar'
                className='w-full h-full object-cover object-center'
              />
            )}
            {!user.url && (
              <AiOutlineFileImage className='w-10 h-10 text-gray-700' />
            )}
          </label>
          <input
            type='file'
            className='hidden'
            id='image'
            name='image'
            value={''}
            onChange={handleChange}
          />
          <button
            type='submit'
            disabled={isAdding}
            className='bg-gray-600 w-full block md:hidden  hover:bg-gray-500 text-white transition-all duration-500 px-2 py-1 md:py-2 mb-[80px]'
          >
            Submit New User
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUserForm;
