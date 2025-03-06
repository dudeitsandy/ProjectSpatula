import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { kitchens } from '../../utils/mockData';
import { useNotification } from '../../context/NotificationContext';
import Loader from '../../components/common/Loader/Loader';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const KitchenList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const KitchenItem = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const KitchenImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

const KitchenInfo = styled.div`
  h2 {
    margin: 0 0 0.5rem;
    color: #333;
  }

  p {
    margin: 0 0 0.5rem;
    color: #666;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &.edit {
    background-color: #28a745;
    color: white;
    &:hover {
      background-color: #218838;
    }
  }

  &.delete {
    background-color: #dc3545;
    color: white;
    &:hover {
      background-color: #c82333;
    }
  }
`;

function MyKitchens() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();

  // Filter kitchens by owner
  const myKitchens = kitchens.filter(kitchen => kitchen.ownerId === user.id);

  const handleEdit = (id) => {
    navigate(`/kitchen/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this kitchen?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        showNotification('Kitchen deleted successfully', 'success');
        // TODO: Update kitchen list after deletion
      } catch (error) {
        showNotification('Failed to delete kitchen', 'error');
      }
    }
  };

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header>
        <Title>My Kitchens</Title>
        <AddButton onClick={() => navigate('/kitchen/create')}>
          Add New Kitchen
        </AddButton>
      </Header>

      <KitchenList>
        {myKitchens.map(kitchen => (
          <KitchenItem key={kitchen.id}>
            <KitchenImage src={kitchen.imageUrl} alt={kitchen.name} />
            <KitchenInfo>
              <h2>{kitchen.name}</h2>
              <p>{kitchen.location}</p>
              <p>${kitchen.price}/hour</p>
            </KitchenInfo>
            <ActionButtons>
              <Button
                className="edit"
                onClick={() => handleEdit(kitchen.id)}
              >
                Edit
              </Button>
              <Button
                className="delete"
                onClick={() => handleDelete(kitchen.id)}
              >
                Delete
              </Button>
            </ActionButtons>
          </KitchenItem>
        ))}

        {myKitchens.length === 0 && (
          <p>You haven't listed any kitchens yet.</p>
        )}
      </KitchenList>
    </Container>
  );
}

export default MyKitchens; 