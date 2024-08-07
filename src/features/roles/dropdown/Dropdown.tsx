import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from '@styled-icons/boxicons-regular';

const DropdownContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  background-color: #fff;
  font-weight: bold;
`;

const DropdownContent = styled.div`
  margin-top: 1rem;
`;

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        <span>{title}</span>
        {isOpen ? <ChevronUp size="24" /> : <ChevronDown size="24" />}
      </DropdownHeader>
      {isOpen && <DropdownContent>{children}</DropdownContent>}
    </DropdownContainer>
  );
};

export default Dropdown;


