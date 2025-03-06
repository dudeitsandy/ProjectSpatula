import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled(Link)`
  display: block;
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Name = styled.h3`
  margin: 0 0 0.5rem;
  color: #333;
`;

const Location = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  color: #007bff;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Rating = styled.span`
  color: #ffc107;
  font-weight: bold;
`;

function KitchenCard({ kitchen }) {
  const { id, name, location, price, rating, imageUrl } = kitchen;

  return (
    <Card to={`/kitchen/${id}`}>
      <Image src={imageUrl} alt={name} />
      <Content>
        <Name>{name}</Name>
        <Location>{location}</Location>
        <Price>${price} per hour</Price>
        <Rating>★ {rating}</Rating>
      </Content>
    </Card>
  );
}

export default KitchenCard; 