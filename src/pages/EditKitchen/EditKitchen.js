import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import KitchenForm from '../../components/kitchen/KitchenForm/KitchenForm';
import { kitchens } from '../../utils/mockData';
import Loader from '../../components/common/Loader/Loader';

function EditKitchen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  
  const kitchen = kitchens.find(k => k.id === parseInt(id));

  // Verify ownership
  if (kitchen && kitchen.ownerId !== user.id) {
    navigate('/my-kitchens');
    showNotification('Unauthorized access', 'error');
    return null;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showNotification('Kitchen updated successfully', 'success');
      navigate('/my-kitchens');
    } catch (error) {
      showNotification('Failed to update kitchen', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!kitchen) {
    return <Loader />;
  }

  return <KitchenForm initialValues={kitchen} onSubmit={handleSubmit} />;
}

export default EditKitchen; 