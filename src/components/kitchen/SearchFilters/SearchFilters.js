import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-width: 200px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const PriceInput = styled.input`
  width: 100px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResetButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    border-color: #007bff;
    color: #007bff;
  }
`;

const initialFilters = {
  search: '',
  sortBy: '',
  size: '',
  minPrice: '',
  maxPrice: '',
};

function SearchFilters({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleReset = () => {
    onFilterChange(initialFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <FilterContainer>
      <FilterHeader>
        <h2>Search & Filters</h2>
        {hasActiveFilters && (
          <ResetButton onClick={handleReset}>
            Reset Filters
          </ResetButton>
        )}
      </FilterHeader>

      <SearchInput
        type="text"
        name="search"
        placeholder="Search by kitchen name or location"
        value={filters.search}
        onChange={handleChange}
      />
      <FilterRow>
        <Select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </Select>

        <Select
          name="size"
          value={filters.size}
          onChange={handleChange}
        >
          <option value="">All Sizes</option>
          <option value="small">Small (&lt;1000 sq ft)</option>
          <option value="medium">Medium (1000-2000 sq ft)</option>
          <option value="large">Large (&gt;2000 sq ft)</option>
        </Select>

        <PriceRange>
          <PriceInput
            type="number"
            name="minPrice"
            placeholder="Min $"
            value={filters.minPrice}
            onChange={handleChange}
            min="0"
          />
          <span>to</span>
          <PriceInput
            type="number"
            name="maxPrice"
            placeholder="Max $"
            value={filters.maxPrice}
            onChange={handleChange}
            min="0"
          />
        </PriceRange>
      </FilterRow>
    </FilterContainer>
  );
}

export default SearchFilters; 