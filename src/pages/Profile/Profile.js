import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Loader from '../../components/common/Loader/Loader';
import { kitchens } from '../../utils/mockData';
import { mockBookings } from '../../utils/mockBookings';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const SubTitle = styled.h2`
  color: #666;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ProfileInfo = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Field = styled.div`
  label {
    display: block;
    color: #666;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:disabled {
      background: #f8f9fa;
    }
  }
`;

const Button = styled.button`
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const BookingList = styled.div`
  display: grid;
  gap: 1rem;
`;

const BookingItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  align-items: center;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const BookingInfo = styled.div`
  h3 {
    margin: 0 0 0.5rem;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.875rem;
  }
`;

function Profile() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading user data
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      showNotification('Profile updated successfully', 'success');
    } catch (error) {
      showNotification('Failed to update profile', 'error');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Title>Profile</Title>

      <Section>
        <SubTitle>Personal Information</SubTitle>
        <ProfileInfo>
          <Field>
            <label>Name</label>
            <input
              type="text"
              defaultValue={user.name}
              disabled={!isEditing}
            />
          </Field>
          <Field>
            <label>Email</label>
            <input
              type="email"
              defaultValue={user.email}
              disabled={true}
            />
          </Field>
          <Field>
            <label>Phone</label>
            <input
              type="tel"
              defaultValue={user.phone || ''}
              disabled={!isEditing}
            />
          </Field>
        </ProfileInfo>
        
        {isEditing ? (
          <div>
            <Button onClick={handleSave} style={{ marginRight: '1rem' }}>
              Save Changes
            </Button>
            <Button 
              onClick={() => setIsEditing(false)}
              style={{ background: '#6c757d' }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </Section>
    </Container>
  );
}

export default Profile; 