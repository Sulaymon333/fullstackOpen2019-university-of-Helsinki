import React from 'react';

const FilterForm = ({ handleSearch }) => {
    return <input type="text" onChange={handleSearch} />;
};

export default FilterForm;
