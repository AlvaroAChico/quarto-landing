import styled from "styled-components"

export const ContainerPermissions = styled.div`
  > h2 {
    margin: 20px 0;
  }
`

export const ItemSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const TitlePermissions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 40px;
  padding-right: 20px;
  margin: 30px 0 10px;
`

export const MainPermission = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ebebeb;
  padding: 10px;
  border-radius: 10px;
`

export const ListPermissions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`

export const ItemPermission = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 5px;
`

export const ToggleContainer = styled.div<{ isActive: boolean }>`
  width: 60px;
  height: 34px;
  border-radius: 34px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;

  ${p =>
    p.isActive
      ? "background-color: #4cd964; /* Color del switch cuando está activado */"
      : ""}
`

export const ToggleCircle = styled.div<{ isActive: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  transition: transform 0.2s;
  ${p =>
    p.isActive
      ? "transform: translateX(28px); /* Mueve el switch a la derecha */"
      : "transform: translateX(5px); /* Mantiene el switch a la izquierda */"}
`
