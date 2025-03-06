import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../../context/AuthContext';
import { useClickOutside } from '../../../hooks/useClickOutside';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    color: #007bff;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-size: 1rem;

  &:hover {
    color: #007bff;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  min-width: 200px;
  z-index: 1000;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: #333;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #f8f9fa;
    color: #007bff;
  }
`;

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useClickOutside(menuRef, () => setIsMenuOpen(false));

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">KitchenShare</Logo>
        <NavLinks>
          <NavLink to="/kitchens">Find Kitchens</NavLink>
          {user ? (
            <UserMenu ref={menuRef}>
              <UserButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {user.name}
                <span>▼</span>
              </UserButton>
              <Dropdown isOpen={isMenuOpen}>
                <DropdownItem as={Link} to="/my-kitchens">
                  My Kitchens
                </DropdownItem>
                <DropdownItem as={Link} to="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem as={Link} to="/bookings">
                  My Bookings
                </DropdownItem>
                <DropdownItem onClick={handleSignOut}>
                  Sign Out
                </DropdownItem>
              </Dropdown>
            </UserMenu>
          ) : (
            <>
              <NavLink to="/signin">Sign In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header; 