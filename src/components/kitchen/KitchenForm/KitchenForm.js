import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const FieldGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const validationSchema = Yup.object({
  name: Yup.string().required('Kitchen name is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be positive'),
  size: Yup.number()
    .required('Size is required')
    .min(0, 'Size must be positive'),
  equipment: Yup.string().required('Equipment list is required'),
  amenities: Yup.string().required('Amenities are required'),
  rules: Yup.string().required('Rules are required'),
});

function KitchenForm({ initialValues, onSubmit }) {
  const defaultValues = {
    name: '',
    description: '',
    location: '',
    price: '',
    size: '',
    equipment: '',
    amenities: '',
    rules: '',
    ...initialValues,
  };

  return (
    <FormContainer>
      <Title>{initialValues ? 'Edit Kitchen' : 'List Your Kitchen'}</Title>
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormSection>
              <FieldGroup>
                <Label htmlFor="name">Kitchen Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  error={touched.name && errors.name}
                />
                {touched.name && errors.name && (
                  <ErrorMessage>{errors.name}</ErrorMessage>
                )}
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="description">Description</Label>
                <Field
                  as={TextArea}
                  id="description"
                  name="description"
                  error={touched.description && errors.description}
                />
                {touched.description && errors.description && (
                  <ErrorMessage>{errors.description}</ErrorMessage>
                )}
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="location">Location</Label>
                <Field
                  as={Input}
                  id="location"
                  name="location"
                  error={touched.location && errors.location}
                />
                {touched.location && errors.location && (
                  <ErrorMessage>{errors.location}</ErrorMessage>
                )}
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="price">Hourly Rate ($)</Label>
                <Field
                  as={Input}
                  type="number"
                  id="price"
                  name="price"
                  error={touched.price && errors.price}
                />
                {touched.price && errors.price && (
                  <ErrorMessage>{errors.price}</ErrorMessage>
                )}
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="size">Size (sq ft)</Label>
                <Field
                  as={Input}
                  type="number"
                  id="size"
                  name="size"
                  error={touched.size && errors.size}
                />
                {touched.size && errors.size && (
                  <ErrorMessage>{errors.size}</ErrorMessage>
                )}
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="equipment">Equipment</Label>
                <Field
                  as={TextArea}
                  id="equipment"
                  name="equipment"
                  placeholder="List major equipment available"
                  error={touched.equipment && errors.equipment}
                />
                {touched.equipment && errors.equipment && (
                  <ErrorMessage>{errors.equipment}</ErrorMessage>
                )}
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="amenities">Amenities</Label>
                <Field
                  as={TextArea}
                  id="amenities"
                  name="amenities"
                  placeholder="List available amenities"
                  error={touched.amenities && errors.amenities}
                />
                {touched.amenities && errors.amenities && (
                  <ErrorMessage>{errors.amenities}</ErrorMessage>
                )}
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="rules">Rules and Requirements</Label>
                <Field
                  as={TextArea}
                  id="rules"
                  name="rules"
                  placeholder="List rules and requirements for kitchen use"
                  error={touched.rules && errors.rules}
                />
                {touched.rules && errors.rules && (
                  <ErrorMessage>{errors.rules}</ErrorMessage>
                )}
              </FieldGroup>
            </FormSection>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Kitchen'}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}

export default KitchenForm; 