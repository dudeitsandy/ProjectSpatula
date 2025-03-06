import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { mockBookings } from '../../utils/mockBookings';
import { kitchens } from '../../utils/mockData';
import Loader from '../../components/common/Loader/Loader';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const BookingFilters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#0056b3' : '#f8f9fa'};
  }
`;

const BookingList = styled.div`
  display: grid;
  gap: 1rem;
`;

const BookingCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const KitchenImage = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
`;

const BookingInfo = styled.div`
  h3 {
    margin: 0 0 0.5rem;
    color: #333;
  }

  p {
    margin: 0 0 0.25rem;
    color: #666;
    font-size: 0.875rem;
  }
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background: ${props => props.status === 'upcoming' ? '#28a745' : '#6c757d'};
  color: white;
`;

function Bookings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  React.useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const filteredBookings = React.useMemo(() => {
    return mockBookings.filter(booking => {
      if (booking.userId !== user.id) return false;
      if (filter === 'upcoming') return booking.status === 'upcoming';
      if (filter === 'completed') return booking.status === 'completed';
      return true;
    });
  }, [filter, user.id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Title>My Bookings</Title>

      <BookingFilters>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          All Bookings
        </FilterButton>
        <FilterButton 
          active={filter === 'upcoming'} 
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </FilterButton>
        <FilterButton 
          active={filter === 'completed'} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </FilterButton>
      </BookingFilters>

      <BookingList>
        {filteredBookings.map(booking => {
          const kitchen = kitchens.find(k => k.id === booking.kitchenId);
          return (
            <BookingCard key={booking.id}>
              <KitchenImage src={kitchen.imageUrl} alt={kitchen.name} />
              <BookingInfo>
                <h3>{kitchen.name}</h3>
                <p>{kitchen.location}</p>
                <p>
                  {new Date(booking.startTime).toLocaleDateString()} {' '}
                  {new Date(booking.startTime).toLocaleTimeString()} - {' '}
                  {new Date(booking.endTime).toLocaleTimeString()}
                </p>
                <p>Total: ${booking.totalPrice}</p>
              </BookingInfo>
              <StatusBadge status={booking.status}>
                {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              </StatusBadge>
            </BookingCard>
          );
        })}
        {filteredBookings.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No {filter} bookings found.
          </p>
        )}
      </BookingList>
    </Container>
  );
}

export default Bookings; 