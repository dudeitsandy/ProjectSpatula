import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 4px;
  animation: ${slideIn} 0.3s ease;
  background-color: ${props => 
    props.type === 'success' ? '#28a745' : 
    props.type === 'error' ? '#dc3545' : '#007bff'};
  color: white;
  z-index: 1000;
`;

function Notification({ message, type }) {
  return (
    <NotificationContainer type={type}>
      {message}
    </NotificationContainer>
  );
}

export default Notification; 