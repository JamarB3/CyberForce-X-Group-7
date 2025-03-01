import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AccountBridgePage = () => {
  const navigate = useNavigate();

  const handleBusinessOwnerClick = () => {
    navigate('/business-profile-creation');
  };

  const handleUserClick = () => {
    navigate('/user-creation');
  };

  return (
    <Container>
      <SideButton isBusinessOwner onClick={handleBusinessOwnerClick}>
        <IconImage
          src="https://www.svgrepo.com/show/3870/managers.svg"
          alt="Business Owner Icon"
        />
        Are you a Business Owner?
      </SideButton>
      <SideButton onClick={handleUserClick}>
        <IconImage
          src="https://img.icons8.com/?size=100&id=98957&format=png&color=000000"
          alt="User Icon"
        />
        Are you a User?
      </SideButton>
    </Container>
  );
};

export default AccountBridgePage;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const SideButton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; /* Stack icon and text vertically */
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${({ isBusinessOwner }) =>
    isBusinessOwner ? 'transparent' : 'transparent'};

  &:hover {
    background-color: ${({ isBusinessOwner }) =>
      isBusinessOwner ? 'magenta' : 'lightblue'};
  }
`;

const IconImage = styled.img`
  width: 50px; /* Adjust size as needed */
  height: 50px; /* Adjust size as needed */
  margin-bottom: 1rem;
`;
