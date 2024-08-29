import styled from "styled-components"

export const ContainerActivity = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 20px;
`

export const Header = styled.div`
  width: 100%;
  padding: 10px;
`

export const ActivityStreamText = styled.p`
  font-weight: bold;
  color: black;
  margin: 0;
  font-size: 20px;
`

export const ContainerActivitiesStream = styled.div`
  width: 100%;
  height: 500px; /* Ajusta esta altura según sea necesario */
  overflow-y: auto; /* Permite el scroll cuando el contenido excede la altura */
  padding: 10px;
  box-sizing: border-box;
`

export const ActivityItem = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  height: 70px;
  margin-bottom: 10px;
  box-sizing: border-box;
`

export const ImageContainer = styled.div`
  width: 50px;
  height: 67%;
  border-radius: 17px;
  background-color: #e0e0e0; /* Fondo gris claro como placeholder */
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`

export const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const UserName = styled.div`
  font-weight: bold;
  color: black;
`

export const ActivityDescription = styled.div`
  color: #7a86a1;
`

export const RightSideContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 5px;
  box-sizing: border-box;
`

export const SmallBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  margin: 0 2px;
`
