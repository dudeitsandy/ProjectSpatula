import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Copyright = styled.p`
  color: #666;
  margin: 0;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} KitchenShare. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 