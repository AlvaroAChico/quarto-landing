import styled from 'styled-components';

export const ContainerRoles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const FormGroup = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2.5rem; /* Added padding for icon */
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #ff9800;
`;

export const PermissionsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  background-color: white;
`;

export const PermissionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CreateButton = styled.button`
  display: block;
  width: 100%;
  max-width: 600px;
  padding: 0.5rem 1rem;
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  border: 2px solid #ff9800;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: #fb8c00;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

export const PermissionItem = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #333;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff5e1;
`;

export const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff9800;
  margin-right: 0.5rem;
`;

export const PermissionName = styled.span`
  margin-right: 0.5rem;
`;
