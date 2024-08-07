import styled from 'styled-components';

export const ToggleContainer = styled.div<{ isActive: boolean }>`
  width: 80px;
  height: 32px;
  border-radius: 15px;
  background: ${props => (props.isActive ? '#4caf50' : '#FF8E8E;')};
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;

  span {
    position: absolute;
    left: ${props => (props.isActive ? '5px' : 'auto')};
    right: ${props => (props.isActive ? 'auto' : '5px')};
    color: ${props => (props.isActive ? '#fff' : '#fff')};
    font-size: 12px;
    transition: 0.2s;
  }
`;

export const ToggleCircle = styled.div<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: white;
  position: absolute;
  left: ${props => (props.isActive ? 'calc(100% - 24px)' : '2px')};
  transition: left 0.2s;
  box-shadow: 0 0 2px #999;
`;
