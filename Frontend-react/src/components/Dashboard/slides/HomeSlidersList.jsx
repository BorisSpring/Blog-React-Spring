import React, { useState } from 'react';

//components
import { Pagination, LoadingSpinner } from '../..';

//custom hooks

import { useQueryClient } from '@tanstack/react-query';
import { useGetParams } from '../../../hooks/useGetParams';
import { getAllHomeSliders } from '../../../api/actions';
import { useNavigate } from 'react-router';
import { useGetAllHomeSliders } from './useGetAllHomeSliders';
import { useEnableHomeSlide } from './useEnableHomeSlide';
import { useDisableHomeSlide } from './useDisableHomeSlide';
import { useAddHomeSlideOrder } from './useAddHomeSlideOrder';
import { useDeleteHomeSlide } from './useDeleteHomeSlide';
import FilterBox from '../FilterBox';

const filterBy = [
  { navigate: '?page=1', label: 'All' },
  {
    navigate: '?page=1&filterBy=orderNumber',
    label: 'With Order Number',
  },
  { navigate: '?page=1&filterBy=enabled', label: 'Enabled' },
  {
    navigate: '?page=1&filterBy=disabled',
    label: 'Disabled',
  },
];

const HomeSlidersList = () => {
  const params = useGetParams();
  const [activeSlider, setActiveSlider] = useState();
  const [number, setNumber] = useState();
  const [newOrderNumber, setNewOrderNumber] = useState(false);
  const { allHomeSliders, isLoading } = useGetAllHomeSliders();
  const { enableSlide, isEnabling } = useEnableHomeSlide();
  const { disableSlide, isDisabling } = useDisableHomeSlide();
  const { addSlideOrder, isAddingOrder } = useAddHomeSlideOrder();
  const { deleteSlide, isDeleting } = useDeleteHomeSlide(allHomeSliders);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentPage = Number(params.get('page'));

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = Number(number);
    if (order < 1) return;
    addSlideOrder({ id: activeSlider, order });
    setNewOrderNumber(false);
    setNewOrderNumber('');
  };

  if (allHomeSliders?.totalPages > currentPage) {
    params.set('page', currentPage + 1);
    queryClient.prefetchQuery({
      queryFn: () => getAllHomeSliders(params),
      queryKey: ['sliders', params.toString()],
    });
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className=' overflow-y-auto h-[94vh]'>
      <div className='flex w-full  bg-primary flex-col md:flex-row gap-2 justify-between  items-center pb-2 px-2'>
        <h2 className='text-white font-bold text-[15px] lg:text-[24px]'>
          Home Slider List
        </h2>
        <FilterBox filterBy={filterBy} />
      </div>
      {!allHomeSliders && (
        <h1 className='text-center text-primary text-[24px] md:text-[32px] lg:text-[40px] mt-10 lg:mt-20 md:mt-16'>
          You havent added any slides yet.
        </h1>
      )}
      {allHomeSliders?.content?.map(
        ({
          buttonTitle,
          buttonUrl,
          image,
          title,
          id,
          enabled,
          orderNumber,
        }) => (
          <div
            className={`p-2 md:text-[18px] text-primary transition-all duration-300 hover:bg-slate-200 border-b pb-2 ${
              activeSlider === id && 'bg-gray-200'
            }`}
            key={id}
          >
            <div className='font-medium text-heading'>
              <div className='flex justify-between'>
                <p>Id: {id}</p>
                <p
                  className={`opacity-80 text-[12px] lg:text-[15px] font-semibold ${
                    orderNumber ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {orderNumber ? (
                    <>order Number: {orderNumber}</>
                  ) : (
                    'Not ordered'
                  )}
                </p>
                <p
                  className={`font-bold ${
                    enabled ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <p>Button Title: {buttonTitle}</p>
              <p>Title: {title}</p>
              <p>Button Url: {buttonUrl}</p>
              <img
                src={`http://localhost:8080/api/users/${image}`}
                alt={image}
                className='max-w-[100px] object-cover object-top aspect-video '
              />
            </div>
            <button
              onClick={() => setActiveSlider(() => id)}
              className={`transition-all duration-300 justify-center p-1  md:h-7 text-white px-2  mt-1 bg-primary hover:bg-secondary text-[12px]  h-6 flex items-center ${
                activeSlider === id ? 'scale-0 h-0' : 'scale-100 h-7'
              }`}
            >
              Action
            </button>
            <div
              className={`flex gap-1  ${
                activeSlider === id ? 'scale-100' : 'scale-0 h-0'
              }`}
            >
              <button
                disabled={isDeleting}
                onClick={() => deleteSlide(id)}
                className={`bg-red-600 h-6 md:h-7 p-1 flex items-center hover:bg-red-700 outline-none focus:ring focus:ring-opacity-80 focus:ring-red-400 transition-all duration-300 text-white px-2 rounded-sm text-[12px] mt-1 hover:shadow-md `}
              >
                Delete
              </button>
              <button
                disabled={isEnabling || isDisabling}
                onClick={() => (!enabled ? enableSlide(id) : disableSlide(id))}
                className={`bg-green-600 h-6 md:h-7 p-1 flex items-center hover:bg-green-700 outline-none focus:ring focus:ring-opacity-80 focus:ring-green-400 transition-all duration-300 text-white px-2 rounded-sm text-[12px] mt-1 hover:shadow-md `}
              >
                {!enabled ? 'Enable' : 'Disable'}
              </button>
              <button
                disabled={isAddingOrder}
                onClick={() => setNewOrderNumber(true)}
                className={`bg-blue-600 h-6 md:h-7 p-1 flex items-center outline-none focus:ring focus:ring-opacity-80 focus:ring-blue-400 hover:bg-blue-700 transition-all duration-300 text-white px-2 rounded-sm text-[12px] mt-1 hover:shadow-md `}
              >
                Set Order
              </button>
              <button
                onClick={() => navigate(`/dashboard/addSlider/${id}`)}
                className={`bg-yellow-600 h-6 md:h-7 p-1 flex items-center outline-none focus:ring focus:ring-opacity-80 focus:ring-yellow-400 hover:bg-yellow-700 transition-all duration-300 text-white px-2 rounded-sm text-[12px] mt-1 hover:shadow-md `}
              >
                Update
              </button>
            </div>
            {newOrderNumber && activeSlider === id && (
              <form
                onSubmit={(e) => handleSubmit(e)}
                className={`mr-2 relative focus:ring focus:ring-opacity-0 mt-2 focus:ring-gray-400 px-2 max-w-[150px] placeholder:text-[10px] transition-all duration-300 ${
                  setNewOrderNumber
                    ? 'scale-100 w-auto h-auto'
                    : 'scale-0 w-0 h-0'
                }`}
              >
                <input
                  type='number'
                  required
                  name='number'
                  value={number}
                  onChange={(e) => setNumber(() => e.target.value)}
                  placeholder='Number must be over 0'
                  className={`mr-2 rounded-full outline-none h-5 focus:ring focus:ring-opacity-0 focus:ring-gray-400 px-2 max-w-[200px] placeholder:text-[10px] transition-all duration-300 ${
                    setNewOrderNumber
                      ? 'scale-100 w-auto h-auto'
                      : 'scale-0 w-0 h-0'
                  }`}
                />
                <button
                  type='submit'
                  className='absolute top-[1.5px] -right-[53px] bg-gray-500 hover:bg-gray-600 transition-all duration-300 text-white rounded-full h-7 flex items-center text-[10px] px-2 '
                >
                  Add order
                </button>
              </form>
            )}
          </div>
        )
      )}
      <Pagination totalPages={allHomeSliders?.totalPages} />
    </div>
  );
};

export default HomeSlidersList;
