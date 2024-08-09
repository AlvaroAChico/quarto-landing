import styled from "styled-components"

export const ContainerRoles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
export const Title = styled.h2`
  color: orange;
  margin-bottom: 1.5rem;
  align-self: flex-start;
`

export const FormGroup = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  position: relative;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
`

export const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 70%;
  transform: translateY(-50%);
  color: black;
`

export const PermissionsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;

  border-radius: 10px;
  padding: 1rem;
  background-color: white;
  box-sizing: border-box;
`

export const PermissionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;

  &:last-child {
    margin-bottom: 0;
  }
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`

export const PermissionItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 200px;
  font-weight: bold;
  color: #333;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 8px;

  &:hover {
    background-color: #f7f7f7;
  }
`

export const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff9800;
  margin-right: 0.5rem;
`

export const PermissionName = styled.span`
  margin-left: 0.5rem;
`

export const ContainerAccordion = styled.div`
  max-width: 800px;
  width: 100%;

  > .accordion > .panel > .panel__head {
    width: 100%;
    display: flex;
    justify-content: left;
    text-align: left;
    outline: none;
  }
`

export const ContainerTitle = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  font-weight: bold;
`

export const ItemPermission = styled.div``
