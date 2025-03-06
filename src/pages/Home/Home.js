import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const Hero = styled.div`
  height: 600px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 2rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.background || 'white'};
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const KitchenImage = styled.div`
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const features = [
  {
    icon: '🏪',
    title: 'Find Perfect Kitchens',
    description: 'Browse through our curated selection of professional kitchens in your area.'
  },
  {
    icon: '📅',
    title: 'Easy Booking',
    description: 'Book your desired kitchen space with just a few clicks.'
  },
  {
    icon: '💰',
    title: 'List Your Kitchen',
    description: 'Own a kitchen? List it on our platform and start earning.'
  }
];

const kitchenImages = [
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
  'https://images.unsplash.com/photo-1556909190-10e7a09a6f1c?w=800',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'
];

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Hero>
        <HeroContent>
          <Title>Find Your Perfect Kitchen Space</Title>
          <Subtitle>
            Discover and book professional kitchen spaces for your culinary needs.
            Whether you're a chef, caterer, or food entrepreneur, we've got the
            perfect kitchen for you.
          </Subtitle>
          <Button onClick={() => navigate('/kitchens')}>
            Browse Kitchens
          </Button>
        </HeroContent>
      </Hero>

      <Section>
        <SectionContent>
          <SectionTitle>How It Works</SectionTitle>
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <div style={{ fontSize: '3rem' }}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </SectionContent>
      </Section>

      <Section background="#f8f9fa">
        <SectionContent>
          <SectionTitle>Featured Kitchens</SectionTitle>
          <ImageGrid>
            {kitchenImages.map((image, index) => (
              <KitchenImage 
                key={index} 
                src={image}
                onClick={() => navigate('/kitchens')}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </ImageGrid>
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionTitle>Why Choose Us</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <div style={{ fontSize: '3rem' }}>⭐</div>
              <h3>Quality Spaces</h3>
              <p>All our kitchens are vetted for quality and compliance.</p>
            </FeatureCard>
            <FeatureCard>
              <div style={{ fontSize: '3rem' }}>🔒</div>
              <h3>Secure Booking</h3>
              <p>Safe and secure booking process with instant confirmation.</p>
            </FeatureCard>
            <FeatureCard>
              <div style={{ fontSize: '3rem' }}>💬</div>
              <h3>24/7 Support</h3>
              <p>Our support team is always here to help you.</p>
            </FeatureCard>
          </FeatureGrid>
        </SectionContent>
      </Section>

      <Section background="#007bff">
        <SectionContent>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Join thousands of food entrepreneurs who have found their perfect kitchen space.
            </p>
            <Button 
              onClick={() => navigate('/signup')}
              style={{ 
                background: 'white', 
                color: '#007bff',
                fontSize: '1.2rem',
                padding: '1rem 3rem'
              }}
            >
              Sign Up Now
            </Button>
          </div>
        </SectionContent>
      </Section>
    </Container>
  );
}

export default Home; 