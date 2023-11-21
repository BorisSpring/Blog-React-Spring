import React from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';

//custom hook
import { useGetParams } from '../hooks/useGetParams';

const Pagination = ({ totalPages }) => {
  const navigate = useNavigate();
  const params = useGetParams();
  const handlePageClick = (e) => {
    params.set('page', e.selected + 1);
    navigate(`?${decodeURIComponent(params.toString())}`);
  };

  if (!totalPages || totalPages < 2) return null;
  return (
    <ReactPaginate
      className='w-fit max-auto flex gap-1 text-[17px] lg:text-[22px] mb-10  text-gray-900  mx-auto mt-2 font font-[500]'
      breakLabel='...'
      nextLabel='>'
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
