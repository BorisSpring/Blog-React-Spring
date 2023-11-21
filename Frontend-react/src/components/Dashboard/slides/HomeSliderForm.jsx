import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineFileImage } from 'react-icons/ai';

//custom hook
import { useParams } from 'react-router';
import { useAddHomeSlider } from './useAddHomeSlider';
import { useFindHomeSlideById } from './useFindHomeSlideById';
import LoadingSpinner from '../../LoadingSpinner';

const HomeSliderForm = () => {
  const { handleSubmit, register } = useForm();
  const [sliderServerValidation, setSliderServerValidation] = useState({});
  const { addHomeSlider, isAddingSlider } = useAddHomeSlider(
    setSliderServerValidation
  );
  const [image, setImage] = useState();
  const { slideId } = useParams();
  const { slideById, isLoading } = useFindHomeSlideById();
  const [imageMessage, setImageMessage] = useState('');

  const onSubmit = (data) => {
    if (!slideId && !image) {
      setImageMessage('Please provide image!');
      return;
    }
    const formD = new FormData();
    slideId && formD.append('slideId', slideId);
    image && formD.append('image', image);
    formD.append('buttonUrl', data.buttonUrl);
    formD.append('title', data.title);
    formD.append('buttonTitle', data.buttonTitle);

    addHomeSlider(formD);
  };

  if (isLoading && slideId) return <LoadingSpinner />;

  return (
    <>
      <h1 className='text-center text-gray-600 text-[26px] md:text-[46px] my-3 md:my-5'>
        Slider Form
      </h1>
      <form
        encType='multipart/form-data'
        className='flex flex-col gap-5 text-gray-600  text-[15px] md:-text-[17px] px-3 lg:px-10 '
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-center text-red-600 font-[18px]'>{imageMessage}</h1>
        <div className='flex w-full flex-col md:flex-row gap-5 md:gap-8'>
          <div className='flex flex-col w-full md:w-[50%]  gap-5 md:gap-8'>
            <p className='text-red-700'>{sliderServerValidation?.buttonUrl}</p>
            <input
              type='text'
              name='buttonUrl'
              defaultValue={slideById?.buttonUrl}
              {...register('buttonUrl', { required: true })}
              className='w-full outline-none px-2 py-1 border-b-2 border-gray-500 focus:shadow-md'
              placeholder='Button Url'
            />
            <p className='text-red-700'>
              {sliderServerValidation?.buttonTitle}
            </p>
            <input
              type='text'
              name='buttonTitle'
              defaultValue={slideById?.buttonTitle}
              {...register('buttonTitle', { required: true })}
              className='w-full outline-none px-2 py-1 border-b-2 border-gray-500 focus:shadow-md'
              placeholder='Button Title'
            />
            <p className='text-red-700'>{sliderServerValidation?.title}</p>
            <textarea
              rows={3}
              placeholder='Slider Title'
              defaultValue={slideById?.title}
              type='text'
              name='title'
              {...register('title', { required: true })}
              className='w-full outline-none px-2 py-1 border-b-2 border-gray-500 focus:shadow-md'
            />
          </div>
          <input
            type='file'
            id='image'
            className='hidden'
            name='image'
            value={''}
            onChange={(e) => setImage(() => e.target.files[0])}
            title='Choose an image'
            aria-label='Image upload'
          />
          <label
            htmlFor='image'
            className='cursor-pointer w-full max-w-[600px] min-h-[200px] md:min-h-[380px] ml-auto border-2 border-gray-500 h-full flex items-center justify-center'
          >
            {!image && slideById?.image && (
              <img
                className='w-full h-full object-cover object-center m-auto'
                src={`http://localhost:8080/api/users/${slideById.image}`}
                alt={slideById?.title}
              />
            )}
            {image && (
              <img
                src={`${URL.createObjectURL(image)}`}
                alt='Slider Avatar'
                className='w-full h-full object-cover object-center m-auto'
              />
            )}
            {!image && !slideById?.image && (
              <AiOutlineFileImage className='w-10 h-10 text-gray-700' />
            )}
          </label>
        </div>
        <button
          type='submit'
          disabled={isAddingSlider}
          className='bg-primary mt-5 lg:mt-10 hover:bg-heding transition-all duration-300 outline-none focus:ring focus:ring-opacity-80 focus:ring-secondary focus:shadow-md text-white py-1 md:py-2 md:text-[18px]'
        >
          Submit New Slide
        </button>
      </form>
    </>
  );
};

export default HomeSliderForm;
