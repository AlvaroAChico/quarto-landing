import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0;
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 80px;
  font-size: 0.9rem;
  color: #333;
  margin-right: 0.5rem;
`;

const Toggle = styled.input`
  appearance: none;
  width: 40px;
  height: 20px;
  background: ${props => (props.checked ? '#4caf50' : '#f44336')};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background 0.3s;
  
  &:before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    top: 1px;
    left: ${props => (props.checked ? '20px' : '1px')};
    transition: left 0.3s;
  }
`;

interface SwitchProps {
  isActive: boolean;
  onToggle: () => void;
  label: string;
}

const Switch: React.FC<SwitchProps> = ({ isActive, onToggle, label }) => {
  return (
    <SwitchContainer>
      <SwitchLabel>{label}</SwitchLabel>
      <Toggle type="checkbox" checked={isActive} onChange={onToggle} />
    </SwitchContainer>
  );
};

export default Switch;


