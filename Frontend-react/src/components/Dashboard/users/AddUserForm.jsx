import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineFileImage } from 'react-icons/ai';
import { useAddUser } from './useAddUser';
import { useGetLoggedUser } from './useGetLoggedUser';
import LoadingSpinner from '../../LoadingSpinner';
import { useUpdateUserInfo } from './useUpdateUserInfo';
import { useChangePassword } from './useChangePassword';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  number: '',
  password: '',
  repeatedPassword: '',
  image: null,
  url: '',
  errorMessage: '',
};

const AddUserForm = () => {
  const { loggedUser, isLoading } = useGetLoggedUser();
  const isAddUserSession = window.location.pathname === '/dashboard/addUser';
  const [user, setUser] = useState(
    isAddUserSession
      ? initialState
      : {
          firstName: loggedUser?.firstName,
          lastName: loggedUser?.lastName,
          email: loggedUser?.email,
          number: loggedUser?.number,
          id: loggedUser?.id,
          image: loggedUser?.image,
          password: '',
          repeatedPassword: '',
          oldPassword: '',
        }
  );
  const [serverValidation, setServerValidation] = useState('');
  const { addNewUser, isAdding } = useAddUser(setServerValidation);
  const { updateInfo, isUpdateing } = useUpdateUserInfo(setServerValidation);
  const { changePassword, isChaning } = useChangePassword(setServerValidation);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddUserSession) {
      if (user.repeatedPassword !== user.password) {
        setUser((prev) => ({ ...prev, errorMessage: 'Password must match' }));
        return;
      } else {
        setUser(initialState);
        const formData = new FormData();
        user?.image && formData.append('imageFile', user.image);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('number', user.number);
        formData.append('firstName', user.firstName);
        addNewUser(formData);
      }
    } else {
      const { firstName, number, lastName, email } = user;
      updateInfo({ firstName, lastName, number, email });
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <h1 className='px-12 font-semibold text-[24px] text-gray-600 mt-5 lg:mt-10'>
        {isAddUserSession ? 'Add New User' : 'Update Account Info'}
      </h1>
      <div className='w-full h-fit flex flex-col md:flex-row overflow-auto mt-5 px-10 pb-10'>
        <form
          encType='multipart/formdata'
          onSubmit={(e) => handleSubmit(e)}
          className='flex flex-col gap-10 w-full p-2 md:p-5 text-gray-500 text-[16px] md:flex-row'
        >
          <div className='flex flex-col gap-10 w-full'>
            <div className='relative w-full flex flex-col'>
              <p className='text-red-700 text-[14px]'>
                {serverValidation?.firstName}
              </p>
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
              <p className='text-red-700 text-[14px]'>
                {serverValidation?.lastName}
              </p>
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
              <p className='text-red-700 text-[14px]'>
                {serverValidation?.email}
              </p>
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
              <p className='text-red-700 text-[14px]'>
                {serverValidation?.number}
              </p>
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
            {isAddUserSession && (
              <>
                <div className='relative'>
                  <p className='text-red-600 text-[13px]'>
                    {user?.errorMessage || serverValidation?.password}
                  </p>
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
                  <p className='text-red-600 text-[13px]'>
                    {user?.errorMessage || serverValidation?.password}
                  </p>
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
              </>
            )}
            <button
              type='submit'
              disabled={isAdding || isUpdateing}
              className='bg-gray-600 w-full hidden md:block hover:bg-gray-500 text-white transition-all duration-500 px-2 py-1 md:py-2'
            >
              {isAddUserSession ? 'Add New User' : 'Update Account Info'}
            </button>
          </div>
          <label
            htmlFor='image'
            className={`cursor-pointer w-full max-w-[600px]  ${
              isAddUserSession
                ? ' min-h-[200px] max-h-[80vh]'
                : 'min-h-[200px] max-h-[400px]'
            } ml-auto border h-full flex items-center justify-center`}
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
        </form>
      </div>
      {!isAddUserSession && (
        <form
          className='px-10 flex flex-col gap-5 text-[15px] text-primary w-full md:w-[50%] md:ml-5'
          onSubmit={(e) => {
            e.preventDefault();
            const { oldPassword, id, repeatedPassword, password } = user;
            changePassword({
              oldPassword: oldPassword,
              userId: id,
              repeatedNewPassword: repeatedPassword,
              newPassword: password,
            });
          }}
        >
          <div className='relative'>
            <p className='text-red-600 text-[13px]'>
              {serverValidation?.oldPassword}
            </p>
            <input
              type='text'
              className='outline-none w-full border-b px-8'
              placeholder='Old Password'
              required
              name='oldPassword'
              onChange={handleChange}
            />
            <RiLockPasswordLine className='w-5 h-5 absolute bottom-3 text-slate-600 placeholder:text-gray-200' />
          </div>
          <div className='relative'>
            <p className='text-red-600 text-[13px]'>
              {user?.errorMessage || serverValidation?.password}
            </p>
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
            <p className='text-red-600 text-[13px]'>
              {user?.errorMessage || serverValidation?.password}
            </p>
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
            disabled={isChaning}
            className='bg-gray-600 cursor-pointer w-full hidden md:block hover:bg-gray-500 text-white transition-all duration-500 px-2 py-1 md:py-2 '
          >
            Update Account Password
          </button>
        </form>
      )}
    </>
  );
};

export default AddUserForm;
