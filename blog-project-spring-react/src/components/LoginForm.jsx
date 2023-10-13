import React, { useState } from 'react';
import { useLoginUser } from '../hooks/useLoginUser';
import LoadingSpinner from './LoadingSpinner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, isLogging } = useLoginUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    loginUser({ username: email, password: password });
  };
  if (isLogging) return <LoadingSpinner />;
  return (
    <div className='min-h-[60vh] w-full flex-grow flex justify-center items-center text-gray-600'>
      <form
        className='w-[90%] h-fit m-auto md:w-[45%] lg:w-[25%] xl:w-[20%] border-2 border-gray-600 px-4 py-2 flex flex-col gap-2 mb-10 lg:mb-20'
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className='text-center text-[22px] md:text-[24px] lg:text-[30px] font-[500]'>
          Welcome To Blog
        </h1>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-bold'>
            Email
          </label>
          <input
            type='text'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Adress'
            className='border-2 outline-none first-letter: rounded-md border-gray-600 px-3 py-1 text-gray-600 font-medium'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-bold'>
            Password
          </label>
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Email Adress'
            className='border-2 outline-none first-letter: rounded-md border-gray-600 px-3 py-1 text-gray-600 font-medium'
          />
        </div>
        <button className='bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-gray-400 text-[14px] md:text-[16px] py-1 mt-5'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
