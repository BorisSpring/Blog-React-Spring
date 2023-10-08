import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center min-h-[70vh]'>
      <TailSpin width='30px' height='30px' color='gray' />
    </div>
  );
};

export default LoadingSpinner;
