import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ebebeb; // Color del borde
  border-radius: 10px; // Radio del borde
  padding: 4px 14px;
  width: 100%;
  max-width: 400px;

  &:focus-within {
    border-color: #f59e36; // Color del borde cuando está enfocado
    box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
  }
`;
export const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 8px;
  font-size: 15px;
  
`;
export const IconContainer = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;



// // src/components/dashboard-layout/common/input.ts
// import styled from 'styled-components';
// import { User } from '@styled-icons/boxicons-solid/User';

// export const StyledInput = styled.input`
//   outline: none;
//   border: 1px solid #ebebeb;
//   background: white;
//   padding: 10px 10px 10px 50px; // Padding modificado para dar espacio al ícono
//   border-radius: 10px;
//   width: 100%;

//   &::placeholder {
//     color: #ccc;
//     padding-left: 30px; // Desplaza el placeholder hacia la derecha
//   }

//   &:focus {
//     border-color: #f59e36;
//     box-shadow: 0 0 8px rgba(245, 158, 54, 0.5);
//   }
// `;

// export const InputContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
// `;

// export const Icon = styled(User)`
//   position: absolute;
//   left: 10px;
//   top: 50%;
//   transform: translateY(-50%);
//   color: black;
//   width: 20px;
//   margin-right: 20px;
// `;
