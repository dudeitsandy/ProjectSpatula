import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { kitchens } from '../../utils/mockData';
import KitchenCard from '../../components/kitchen/KitchenCard/KitchenCard';
import SearchFilters from '../../components/kitchen/SearchFilters/SearchFilters';
import Loader from '../../components/common/Loader/Loader';

const ListingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
`;

const initialFilters = {
  search: '',
  sortBy: '',
  size: '',
  minPrice: '',
  maxPrice: '',
};

function KitchenListing() {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredKitchens = useMemo(() => {
    let results = [...kitchens];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(kitchen => 
        kitchen.name.toLowerCase().includes(searchTerm) ||
        kitchen.location.toLowerCase().includes(searchTerm)
      );
    }

    // Apply size filter
    if (filters.size) {
      results = results.filter(kitchen => {
        const size = kitchen.size || 0;
        switch (filters.size) {
          case 'small':
            return size < 1000;
          case 'medium':
            return size >= 1000 && size <= 2000;
          case 'large':
            return size > 2000;
          default:
            return true;
        }
      });
    }

    // Apply price range filter
    if (filters.minPrice) {
      results = results.filter(kitchen => 
        kitchen.price >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      results = results.filter(kitchen => 
        kitchen.price <= Number(filters.maxPrice)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return results;
  }, [filters]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ListingContainer>
      <Title>Available Kitchens</Title>
      
      <SearchFilters
        filters={filters}
        onFilterChange={setFilters}
      />

      {filteredKitchens.length > 0 ? (
        <Grid>
          {filteredKitchens.map(kitchen => (
            <KitchenCard key={kitchen.id} kitchen={kitchen} />
          ))}
        </Grid>
      ) : (
        <NoResults>
          No kitchens found matching your criteria. Try adjusting your filters.
        </NoResults>
      )}
    </ListingContainer>
  );
}

export default KitchenListing; 