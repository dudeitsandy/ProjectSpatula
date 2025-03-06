import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import KitchenForm from '../../components/kitchen/KitchenForm/KitchenForm';

function CreateKitchen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // TODO: Replace with actual API call
      const newKitchen = {
        ...values,
        id: Date.now(), // Temporary ID generation
        ownerId: user.id,
        rating: 0,
        imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800", // Default image
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showNotification('Kitchen created successfully!', 'success');
      navigate('/my-kitchens');
    } catch (error) {
      showNotification('Failed to create kitchen', 'error');
      console.error('Failed to create kitchen:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return <KitchenForm onSubmit={handleSubmit} />;
}

export default CreateKitchen; 