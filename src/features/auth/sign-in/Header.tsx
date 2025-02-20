import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #fff;
  position: absolute;
  z-index: 10;
  display: flex;
  min-height: 79px;
  width: 100%;
  align-items: center;
  gap: 24px;
  color: #000;
  justify-content: start;
  flex-wrap: wrap;
  right: 0;
  top: 0;
  height: 79px;
  padding: 18px 160px;
  font: 400 14px/1 DM Sans, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const NavigationList = styled.nav`
  align-self: stretch;
  z-index: 0;
  display: flex;
  min-width: 240px;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
  justify-content: end;
  flex-wrap: wrap;
  flex: 1;
  flex-basis: 48px;
  margin: auto 0;

  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`;

const NavigationItem = styled.a`
  align-self: stretch;
  min-height: 40px;
  gap: 8px;
  margin: auto 0;
  padding: 13px 8px;
  text-decoration: none;
  color: inherit;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const RegisterButton = styled.button`
  align-self: stretch;
  border-radius: 9999px;
  background-color: #f6f6f6;
  gap: 8px;
  overflow: hidden;
  font-weight: 500;
  white-space: nowrap;
  margin: auto 0;
  padding: 12px 24px;
  border: 1px solid #e1e1e1;
  cursor: pointer;

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <NavigationList>
        <NavigationItem href="#">Inicio</NavigationItem>
        <NavigationItem href="#">Alquilar</NavigationItem>
        <NavigationItem href="#">Comprar</NavigationItem>
        <NavigationItem href="#">Propietarios/Corredores</NavigationItem>
      </NavigationList>
      <RegisterButton>Regístrate</RegisterButton>
    </HeaderWrapper>
  );
};

export default Header;