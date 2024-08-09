import styled from "styled-components";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import { Edit } from "@styled-icons/fluentui-system-filled/Edit";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { Circle } from "@styled-icons/boxicons-solid/Circle";
import { SearchAlt2 } from "@styled-icons/boxicons-regular/SearchAlt2";
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight";
import { Check2 } from "@styled-icons/bootstrap/Check2";


export const EditIcon = styled(Edit)`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-bottom:2px;
`;

// Define el botón circular estilizado
export const EditButtonWithIcon = styled.button`
  background-color: #FFFFF; /* Color de fondo del botón */
  border-radius: 50%; /* Hace el botón circular */
  color: #F9AE36; /* Color del texto o icono */
  width: 40px; /* Ancho del botón */
  height: 40px; /* Altura del botón */
  display: flex;
  align-items: center;
  cursor: pointer;
border:1px solid #F9AE36;
  &:hover {
    background-color: #F9AE36;
    color: white; /* Color del texto o icono */
  }
`;




export const DeleteIcon = styled(Delete)`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-bottom:2px;
`;
export const DeleteButtonWithIcon = styled.button`
  background-color: #FFFFF; /* Color de fondo del botón */
  border-radius: 50%; /* Hace el botón circular */
  color: #FF4949; /* Color del texto o icono */
  width: 40px; /* Ancho del botón */
  height: 40px; /* Altura del botón */
  display: flex;
  align-items: center;
  cursor: pointer;
border:1px solid #FF4949;
  &:hover {
    background-color: #FF4949;
    color: white; /* Color del texto o icono */
  }
`;
export const Check2Icon = styled(Check2)`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-bottom:2px;
`;
export const ArrowRightIcon = styled(ArrowRight)`
  width: 15px;
  height: 15px;
  margin-left: 10px;
    margin-right: 10px;

  margin-bottom:2px;
`;

export const SearchIcon = styled(SearchAlt2)`
  position: absolute;
  top: 50%;
  left: 10px; /* Espacio desde el borde izquierdo */
  transform: translateY(-50%);
  width: 24px; /* Tamaño del ícono */
  height: 24px; /* Tamaño del ícono */
  color: #aaa; /* Color del ícono */
`;

export const CircleGreen = styled(Circle)`
  width: 15px;
  height: 15px;
  color: #3FA85C;
  margin-top: 15px;
`;
export const CircleOrange = styled(Circle)`
  width: 15px;
  height: 15px;
  color: #F9A933;
    margin-top: 3px;
    
`;
export const Back = styled(ArrowIosBackOutline)`
  width: 20px;
  height: 20px;
  padding-left: -1px;
`;

export const StyledDeleteIcon = styled(Delete)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;

export const StyledEditIcon = styled(Edit)`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;

export const DetailsContainer = styled.div`
  width: 100%;
  display: block;
  padding-top:0.2%;
  padding-bottom:0.2%;

  @media (max-width: 768px) {
    height: auto; /* Ajusta la altura en pantallas pequeñas */
    padding: 10px; /* Agrega padding en pantallas pequeñas */
  }
`;

export const DataBlock = styled.div`
  width: 100%;
  height: 25%;

  @media (max-width: 768px) {
    height: auto; /* Ajusta la altura en pantallas pequeñas */
  }
`;

export const BackButtonBlock = styled.div`
  width: 100%;
  display: flex;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 3%;

  @media (max-width: 768px) {
    padding-left: 2%; /* Reduce el padding en pantallas pequeñas */
  }
`;

export const BackButton = styled.button`
  font-size: 14px;
  width: 6%;
  height: 30px;
  border-radius: 25px;
  border: 0;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  @media (max-width: 768px) {
    width: 10%; /* Ajusta el ancho en pantallas pequeñas */
    font-size: 12px; /* Reduce el tamaño de la fuente */
  }

  &:hover {
    background: black;
    color: white;
  }
`;

export const InfoAndButtons = styled.div`
  width: 100%;
  display: flex;
  padding-top: 1%;
  padding-bottom: 3%;
  padding-left: 3%;

  @media (max-width: 768px) {
    flex-direction: column; /* Cambia la dirección del flex en pantallas pequeñas */
    padding-left: 2%;
  }
`;

export const Info = styled.div`
  width: 69%;
  display: flex;

  @media (max-width: 768px) {
    width: 100%; /* Ajusta el ancho en pantallas pequeñas */
    flex-direction: column; /* Cambia la dirección del flex en pantallas pequeñas */
    align-items: center;
  }
`;

export const NameProject = styled.h1`
  color: #F58634;
  margin-left: 2%;

  @media (max-width: 768px) {
    font-size: 20px; /* Ajusta el tamaño de la fuente en pantallas pequeñas */
    margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
    text-align: center; /* Centra el texto en pantallas pequeñas */
  }
`;

export const Buttons = styled.div`
  width: 29%;
  display: flex;
  padding-left: 13%;
  padding-right: 8%;

  @media (max-width: 768px) {
    width: 100%; /* Ajusta el ancho en pantallas pequeñas */
    justify-content: center; /* Centra los botones en pantallas pequeñas */
    padding-left: 0;
    padding-right: 0;
    margin-top: 10px; /* Añade margen superior en pantallas pequeñas */
  }
`;

export const EditButton = styled.button`
  background: white;
  border: 2px solid #F9AE36;
  color: #F9AE36; 
  padding: 5px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 25px; 
  font-size: 16px;
  transition: background 0.3s, border-color 0.3s, color 0.3s;
  width: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 14px; /* Ajusta el tamaño de la fuente en pantallas pequeñas */
    padding: 5px 15px; /* Ajusta el padding en pantallas pequeñas */
  }

  &:hover {
    background: #F9AE36;
    border-color: #F9AE36;
    color: white;
  }
`;

export const DeleteButton = styled.button`
  background: white;
  border: 2px solid red;
  color: red; 
  padding: 5px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 25px; 
  font-size: 16px;
  transition: background 0.3s, border-color 0.3s, color 0.3s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 14px; /* Ajusta el tamaño de la fuente en pantallas pequeñas */
    padding: 5px 15px; /* Ajusta el padding en pantallas pequeñas */
  }

  &:hover {
    background: red;
    border-color: red;
    color: white;
  }
`;

export const DateandSwitch = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; /* Alinea los elementos con espacio entre ellos */
  gap: 10px; /* Espacio entre los elementos */

  @media (max-width: 768px) {
    flex-direction: column; /* Cambia la dirección a columna en pantallas pequeñas */
    padding: 0 5%; /* Ajusta el padding en pantallas pequeñas */
  }
`;

export const DateSpace = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; /* Alinea las fechas en columna */
  padding-left: 5.4%;

  @media (max-width: 768px) {
    padding-left: 2%; /* Ajusta el padding en pantallas pequeñas */
  }
`;

export const Date = styled.div`
  width: 90%; /* Asegura que cada fecha ocupe el 100% del ancho en pantallas pequeñas */
  margin-bottom: 10px;
  /* Añade margen inferior en pantallas pequeñas */
`;

export const SwitchContainer = styled.div`
  display: flex;
  cursor: pointer;
  width: 50%;
  padding-left:38%;
  @media (max-width: 768px) {
    width: 100%; /* Ajusta el ancho en pantallas pequeñas */
    padding: 0; /* Elimina el padding en pantallas pequeñas */
    justify-content: center; /* Centra el switch en pantallas pequeñas */
    }
`;

// Contenedor del interruptor
export const Switch = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 60px;
  height: 30px;
  background: ${({ isActive }) => (isActive ? '#4CD964' : 'grey')};
  border-radius: 15px;
  transition: background 0.3s;

  @media (max-width: 768px) {
    width: 50px; /* Ajusta el tamaño en pantallas pequeñas */
    height: 25px; /* Ajusta el tamaño en pantallas pequeñas */
  }
`; 

// Botón del interruptor
export const SwitchButton = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 3px;
  left: ${({ isActive }) => (isActive ? 'calc(100% - 27px)' : '3px')};
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: left 0.3s;

  @media (max-width: 768px) {
    width: 20px; /* Ajusta el tamaño en pantallas pequeñas */
    height: 20px; /* Ajusta el tamaño en pantallas pequeñas */
  }
`;


export const TaskBlock = styled.div`
margin-top:5%;
  width: 100%;
  height:12%;
  display: flex;
  flex-direction: column; /* Alinea las fechas en columna */
  padding-left: 2.9%;
`;

export const Title = styled.p`
  width: 100%;
  margin: 0;
  padding: 10px 0; /* Espacio superior e inferior para el texto */
  font-size: 18px;
  font-weight: bold; 
`;

export const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between; /* Espacia el campo de búsqueda y el botón a los extremos */
  align-items: center;
  width: 100%;
  margin-top: 10px; /* Ajusta el espacio entre el título y el campo de búsqueda */
`;

export const InputWrapper = styled.div`
  position: relative;
  width:65%; /* Ajusta el ancho del campo de búsqueda según sea necesario */
`;

export const InputSearch = styled.input`
  width: 38.6%;
  padding: 10px 10px 10px 40px; /* Espacio para el ícono en el inicio */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;



export const AddNewTaskButtonWrapper = styled.div`
  width: 35%; /* Ajusta el ancho del contenedor del botón */
  display: flex;
  justify-content: flex-end; /* Alinea el botón al extremo derecho */
    padding-right:2%;
  `;

export const AddNewTaskButton = styled.button`
  background: #F9A936; /* Color de fondo del botón */
  border: none;
  color: white; /* Color del texto */
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  width:40%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  &:hover {
    background: #F9A933; /* Color de fondo al pasar el ratón */
    box-shadow: 0 6px 12px rgba(249, 169, 51, 0.3); /* Sombra más grande al pasar el ratón */
  }
`;

export const TaskList = styled.div`
  margin-top: 20px;
  padding-left:3%;
`;

export const ItemTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border:1px solid #CCCCCC;
  border-radius:8px;
  margin-top: 0.9%;
  gap: 1%;
  height:60px;
`;

export const ItemTaskName = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin-left:4%;
  width:100%;
`;

export const ItemTaskDate = styled.div`
  font-size: 14px;
  color: #666;
    width:18%;

`;

export const ItemTaskButtons = styled.div`
  display: flex;
  gap: 10px;
      width:40%;

`;


export const ItemTaskNameCircle = styled.div`
display:flex;
width:80%;
`;

export const CompletedButton = styled.button`
 background: #FFFFFF; /* Color de fondo del botón */
  color: #76E0F7; /* Color del texto */
  padding: 3px 0px 2px 10px;
  border-radius: 25px;
  border:1px solid #76E0F7;
  cursor: pointer;
  font-size: 16px;
  width: 60%; /* Ajusta el ancho según sea necesario */
  text-align: center; /* Alinea el texto en el centro */
  white-space: nowrap; /* Evita que el texto se rompa en varias líneas */
  display: inline-flex; /* Usa flexbox para alinear contenido en una línea */
  align-items: center; /* Alinea el texto verticalmente */
  justify-content: center; /* Centra el texto horizontalmente */

  &:hover {
    background: #76E0F7;
    color:white; /* Color de fondo al pasar el ratón */
    border: 1px solid white;
  }
`;
