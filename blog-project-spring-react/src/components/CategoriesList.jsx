import React, { useState } from 'react';
import { LoadingSpinner } from './';

import { useGeAllCategories } from '../hooks/useGetAllCategories';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { useCreateCategory } from '../hooks/useCreateCategory';
import { useUpdateCategoryOrder } from '../hooks/useUpdateCategoryOrder';

const CategoriesList = () => {
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const { createCategory, isCreating } = useCreateCategory();
  const { updateCategory, isUpdateing } = useUpdateCategory();
  const { allCategories, isLoading } = useGeAllCategories();
  const { updateCategoryOrder, isUpdatingOrder } = useUpdateCategoryOrder();

  const [isUpdate, setIsUpdate] = useState(false);
  const [activeCategory, setActiveCategory] = useState();
  const [isAddCategory, setisAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (categoryName?.length > 4) {
      createCategory(categoryName);
      setCategoryName();
      setisAddCategory(false);
    }
  };

  if (isLoading) <LoadingSpinner />;

  return (
    <div className='h-screen overflow-y-auto px-2'>
      <div className='flex flex-col justify-center md:flex-row md:justify-between items-center'>
        <h1 className='font-[400] text-gray-600 text-[24px] lg:text-[32px] text-center mx-5 lg:mx-10'>
          Categories List
        </h1>
        <div
          className={` ${
            !isAddCategory ? 'scale-100' : 'scale-0'
          } flex w-full md:w-fit justify-between my-5 transition-all duration-300 items-center`}
        >
          <button
            onClick={() => setisAddCategory((prev) => !prev)}
            className='bg-gray-600 hover:bg-gray-700 text-white h-7 text-[15px] m-auto md:m-0 md:h-8  md:text-[20px] flex items-center justify-center
             transition-all duration-300 focus:ring  focus:ring-gray-400 px-2 lg:px-4 py-1 rounded-md  focus:ring-opacity-80 outline-none '
          >
            Add new Category
          </button>
        </div>
      </div>
      <div>
        {isAddCategory && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                type='text'
                required
                placeholder='Category name must be over 4 chars'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className='outline-none border-b-2 border-b-gray-500 text-[15px] md:text-[18px] text-gray-700 placeholder:text-[10px] '
              />
            </div>
            <button
              disabled={isCreating}
              type='submit'
              className='bg-gray-600 hover:bg-gray-700 text-white h-8 mt-2 flex items-center justify-center
             transition-all duration-300 focus:ring  focus:ring-gray-400 px-2 lg:px-4 py-1 rounded-md  focus:ring-opacity-80 text-[15px] outline-none'
            >
              Add new Category
            </button>
          </form>
        )}
      </div>
      <div className='flex flex-col gap-5  justify-center '>
        {allCategories?.map?.(({ id, name, order, blogsCount }) => (
          <div
            className='flex flex-col md:flex-row border-b p-1 md:p-3 md:justify-between md:items-center'
            key={id}
          >
            <div className='flex flex-col '>
              <p className='text-[14px] font-[400] md:text-[19px]'>
                Id: <span className='font-[500]'>{id}</span>
              </p>
              <p className='text-[14px] font-[400] md:text-[19px]'>
                Name: <span className='font-[500]'>{name}</span>
              </p>
              <p className='text-[14px] font-[400] md:text-[19px]'>
                Order Number:{' '}
                <span className='font-[500]'>
                  {order ? order : 'Unordered'}
                </span>
              </p>
              <p className='text-[14px] font-[400] md:text-[19px]'>
                Blogs counts:
                <span className='font-[500] text-gray-800'>
                  {' '}
                  {blogsCount} blogs in category
                </span>
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  setActiveCategory(() => id);
                  setIsUpdate(() => false);
                }}
                className={`bg-gray-500 ${
                  activeCategory === id ? 'scale-0 hidden ' : 'scale-100 '
                }    hover:bg-gray-600 transition-all duration-500 text-white px-2 rounded-md text-center p-1  flex items-center justify-center h-6 md:h-7 text-[12px] md:text-[17px] border-none focus:ring focus:ring-opacity-80 focus:ring-gray-400  outline-none`}
              >
                Action
              </button>
              <div
                className={` flex gap-1 ${
                  !isUpdate && activeCategory === id
                    ? 'scale-100'
                    : 'scale-0 h-0 w-0'
                } transition-all duration-300`}
              >
                <button
                  onClick={() => {
                    setIsUpdate(() => 'name');
                  }}
                  className={`bg-yellow-500  hover:bg-yellow-600 outline-none transition-all duration-500  h-6 md:h-7 flex items-center justify-center text-[12px] text-white px-1 md:px-2   focus:ring focus:ring-opacity-80 focus:ring-green-400  rounded-md border-none`}
                >
                  Update Name
                </button>
                <button
                  onClick={() => {
                    setIsUpdate(() => 'order');
                  }}
                  className={`bg-blue-500  hover:bg-blue-600 transition-all  outline-none duration-500  h-6 md:h-7 flex items-center justify-center text-[12px] text-white px-1 md:px-2   focus:ring focus:ring-opacity-80 focus:ring-green-400  rounded-md border-none`}
                >
                  Update order
                </button>
                <button
                  onClick={() => deleteCategory(activeCategory)}
                  disabled={isDeleting}
                  className={`bg-red-500  hover:bg-red-600 transition-all  outline-none duration-500 text-white px-1 md:px-2 h-6 md:h-7 flex items-center justify-center text-[12px]  focus:ring focus:ring-opacity-80 focus:ring-green-400  rounded-md border-none`}
                >
                  Delete
                </button>
              </div>
              {isUpdate && activeCategory === id && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    isUpdate === 'name'
                      ? updateCategory({ categoryId: id, categoryName })
                      : updateCategoryOrder({
                          categoryId: id,
                          orderNumber: categoryName,
                        });
                    setCategoryName('');
                    setIsUpdate('');
                  }}
                >
                  <div className='relative w-fit'>
                    <input
                      type='text'
                      value={categoryName}
                      placeholder='Write here..'
                      onChange={(e) => setCategoryName(() => e.target.value)}
                      className='outline-none rounded-full  text-gray-600 text-[15px] border-2 h-7 border-gray-500 px-3 max-w-[200px] maxw-[350px]'
                    />
                    <button
                      disabled={isUpdateing || isUpdatingOrder}
                      type='submit'
                      className='bg-gray-600 hover:bg-gray-700 text-white h-7 mt-2 flex items-center justify-center 
                    transition-all duration-300 focus:ring  focus:ring-gray-400 px-2 lg:px-4 py-1 rounded-full  focus:ring-opacity-80 text-[15px] outline-none absolute -top-[2px] right-0'
                    >
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
