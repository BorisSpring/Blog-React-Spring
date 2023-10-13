import React from 'react';
import { useNavigate } from 'react-router';

const FilterBox = ({ filterBy }) => {
  const nav = useNavigate();

  function handleChange(e) {
    const selectedOption = filterBy.find(
      (item) => item.label === e.target.value
    );
    nav(`${selectedOption?.navigate}`);
  }

  return (
    <div className='select-container'>
      <select onChange={handleChange}>
        {filterBy?.map(({ label }) => (
          <option value={label} key={label}>
            {label}
          </option>
        ))}
      </select>
      <div className='select-arrow'></div>
    </div>
  );
};

export default FilterBox;
