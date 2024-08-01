// src/components/ui/Button/Button.styles.ts
import styled from 'styled-components';

export const StyledButton = styled.button`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) -40%,
    rgba(249, 174, 54, 1) 0%,
    rgba(245, 134, 52, 1) 100%
  );
  outline: none;
  border: none;
  color: white;
  height: 50px;
  border-radius: 10px;
  box-shadow: 5px 5px 30px 2px rgba(245, 134, 52, 0.5);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;
