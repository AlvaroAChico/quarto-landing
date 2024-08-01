import styled from "styled-components"
import { breakpoints } from "../../../constants/breakpoints"

export const ContainerSignIn = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LeftContainer = styled.div<{ imgHeader: string }>`
   background-image: url("${p => p.imgHeader}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  height: 100%;
  width: 100%; // Asumimos full-width en móviles

  &::before {
    content: "";
    position: absolute;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) -40%,
      rgb(245 134 52 / 60%) 0%,
      rgb(13 6 1 / 100%) 100%
    );
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 1;
  }

  ${breakpoints.tabletS} {
    width: 30%;
  }
  ${breakpoints.phoneL} {
    width: 100%; // Volver a 100% en dispositivos muy pequeños
  }
`;

export const ContentLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: white;
  position: absolute;
  padding: 20px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0;
  z-index: 2;

  > div:nth-child(1) {
    height: 20%;

    > img {
      max-width: 80px;
    }
  }
  > div:nth-child(2) {
    height: 75%;
  }
  > div:nth-child(3) {
    height: 5%;
  }
`

export const RightContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 100%; // Full width en móviles

  ${breakpoints.tabletS} {
    width: 70%;
  }
  ${breakpoints.phoneL} {
    width: 100%; // Volver a 100% para teléfonos
  }
`;

export const FormContainer = styled.div`
  width: fit-content;
  height: fit-content;
  min-width: 350px;
  max-width: 90%; // Limitar el ancho máximo para evitar que sea demasiado grande en desktops
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: auto; // Centrar automáticamente dentro de 
  margin-top: 20vh; // Añadir margen superior para bajar el formulario



  ${breakpoints.phoneL} {
    padding: 20px; // Añadir más padding en dispositivos pequeños
  }
  > div > div {
    display: flex;
    flex-direction: column;
  }
  > div > .div-with-margin {
    margin-bottom: 23px;
  }
  > div > .div-sin-margen {
    margin-bottom: 0;
  }
  .label {
    margin-bottom: 9px;
  }
`;
export const SignInButton = styled.button`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) -40%,
    rgba(249, 174, 54, 1) 0%,
    rgba(245, 134, 52, 1) 100%
  );
  outline: none;
  border: none;
  color: white;
  padding: 10px 30px;
  border-radius: 10px;
  box-shadow: 5px 5px 30px 2px rgba(245, 134, 52, 0.5);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`