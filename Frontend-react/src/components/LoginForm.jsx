import React, { useState } from 'react';
import { useLoginUser } from '../hooks/useLoginUser';
import LoadingSpinner from './LoadingSpinner';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, isLogging } = useLoginUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    loginUser({ username: email, password: password });
  };

  if (isLogging) return <LoadingSpinner />;

  return (
    <div className='w-full flex-grow flex justify-center items-center text-white bg-cover min-h-[400px] bg-opacity-100 background-image-login-form'>
      <form
        className='w-[95%] bg-[rgba(255,255,255,0.2)] h-fit m-auto md:w-[45%] lg:w-[30%] xl:w-[25%] px-4 py-2 flex flex-col gap-2 mb-10 lg:mb-20 shadow-md'
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className='text-center text-[20px] md:text-[22px] lg:text-[26px] font-bold'>
          Login Form
        </h1>
        <div className='flex flex-col gap-1 font-medium relative mb-2'>
          <input
            autoComplete='off'
            type='text'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className=' outline-none  pl-7 pr-2 py-1  text-secondary text-opacity-90 bg-[rgba(255,255,255,0.6)] focus:shadow-lg'
          />
          <MdEmail className='absolute translate-x-1/2 translate-y-1/2 text-secondary' />
        </div>
        <div className='flex flex-col gap-1 font-medium relative mb-2'>
          <input
            autoComplete='off'
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className=' outline-none   pl-7 pr-2 py-1  text-secondary text-opacity-90 bg-[rgba(255,255,255,0.6)] focus:shadow-lg'
          />
          <RiLockPasswordFill className='absolute text-secondary bottom-[50%] translate-x-1/2 translate-y-1/2' />
        </div>
        <p
          className='font-medium text-opacity-80 cursor-pointer text-[14px]'
          onClick={() => navigate('/resetPassword')}
        >
          Forgot Password ?
        </p>
        <button className='hover:bg-primary bg-heading text-white transition-all duration-300 focus:ring focus:ring-opacity-80 focus:ring-primary  text-[14px] md:text-[16px] py-1 r  mb-2'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
