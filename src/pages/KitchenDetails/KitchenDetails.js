import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { kitchens } from '../../utils/mockData';
import BookingForm from '../../components/booking/BookingForm/BookingForm';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/common/Loader/Loader';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const KitchenDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  color: #333;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const AmenitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;

  li {
    margin-bottom: 0.5rem;
    color: #666;
    &:before {
      content: "✓";
      color: #28a745;
      margin-right: 0.5rem;
    }
  }
`;

function KitchenDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const kitchen = kitchens.find(k => k.id === parseInt(id));

  if (!kitchen) {
    return <Loader />;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate('/kitchens')}>
        ← Back to listings
      </BackButton>

      <Image src={kitchen.imageUrl} alt={kitchen.name} />
      
      <KitchenDetails>
        <MainContent>
          <Title>{kitchen.name}</Title>
          <Description>{kitchen.description}</Description>
          
          <h3>Location</h3>
          <p>{kitchen.location}</p>
          
          <h3>Amenities</h3>
          <AmenitiesList>
            {kitchen.amenities.map(amenity => (
              <li key={amenity}>{amenity}</li>
            ))}
          </AmenitiesList>

          <h3>Equipment</h3>
          <p>{kitchen.equipment}</p>

          <h3>Rules</h3>
          <p>{kitchen.rules}</p>
        </MainContent>

        <div>
          {user ? (
            user.id !== kitchen.ownerId ? (
              <BookingForm kitchen={kitchen} />
            ) : (
              <p>This is your kitchen listing.</p>
            )
          ) : (
            <p>Please <a href="/signin">sign in</a> to book this kitchen.</p>
          )}
        </div>
      </KitchenDetails>
    </Container>
  );
}

export default KitchenDetailsPage; 