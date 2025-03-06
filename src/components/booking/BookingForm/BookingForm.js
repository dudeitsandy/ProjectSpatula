import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import { bookingService } from '../../../utils/mockBookings';
import { useNavigate } from 'react-router-dom';

const BookingContainer = styled.div`
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const DateTimeInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 4px;
`;

const BookButton = styled.button`
  width: 100%;
  padding: 0.75rem;
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

const PriceCalculation = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ErrorText = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const validationSchema = Yup.object({
  startTime: Yup.date()
    .required('Start time is required')
    .min(new Date(), 'Start time must be in the future'),
  endTime: Yup.date()
    .required('End time is required')
    .min(Yup.ref('startTime'), 'End time must be after start time'),
});

function BookingForm({ kitchen }) {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const calculatePrice = (start, end) => {
    if (!start || !end) return 0;
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hours = (endTime - startTime) / (1000 * 60 * 60);
    return hours * kitchen.price;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!kitchen || !kitchen.id || !user || !user.id) {
        throw new Error('Missing required data');
      }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const booking = {
        kitchenId: kitchen.id,
        userId: user.id,
        startTime: values.startTime,
        endTime: values.endTime,
        totalPrice,
      };

      // Create booking in mock service
      await bookingService.createBooking(booking);
      showNotification('Booking successful!', 'success');
      navigate('/bookings');
    } catch (error) {
      showNotification(error.message || 'Failed to create booking', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BookingContainer>
      <h3>Book This Kitchen</h3>
      <Formik
        initialValues={{
          startTime: '',
          endTime: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onChange={(values) => {
          const price = calculatePrice(values.startTime, values.endTime);
          setTotalPrice(price);
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <DateTimeInput
                type="datetime-local"
                id="startTime"
                name="startTime"
                onChange={(e) => {
                  handleChange(e);
                  const price = calculatePrice(e.target.value, values.endTime);
                  setTotalPrice(price);
                }}
                value={values.startTime}
                error={touched.startTime && errors.startTime}
                min={new Date().toISOString().slice(0, 16)}
              />
              {touched.startTime && errors.startTime && (
                <ErrorText>{errors.startTime}</ErrorText>
              )}
            </div>

            <div>
              <Label htmlFor="endTime">End Time</Label>
              <DateTimeInput
                type="datetime-local"
                id="endTime"
                name="endTime"
                onChange={(e) => {
                  handleChange(e);
                  const price = calculatePrice(values.startTime, e.target.value);
                  setTotalPrice(price);
                }}
                value={values.endTime}
                error={touched.endTime && errors.endTime}
                min={values.startTime}
              />
              {touched.endTime && errors.endTime && (
                <ErrorText>{errors.endTime}</ErrorText>
              )}
            </div>

            {totalPrice > 0 && (
              <PriceCalculation>
                <p>Rate: ${kitchen.price}/hour</p>
                <p>Total: ${totalPrice.toFixed(2)}</p>
              </PriceCalculation>
            )}

            <BookButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Book Now'}
            </BookButton>
          </Form>
        )}
      </Formik>
    </BookingContainer>
  );
}

export default BookingForm; 