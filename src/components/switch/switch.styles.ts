import styled from "styled-components"

export const ContainerAllSwitch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > span {
    font-size: 0.8rem;
    font-weight: 600;
  }
`

export const SwitchContainer = styled.div<{
  isActive: boolean
  isEnabled: boolean
  label: string
}>`
  pointer-events: ${p => (p.isEnabled ? "inherit" : "none")};
  align-items: center;
  position: relative;
  display: flex;
  gap: 10px;

  > label {
    background: ${p =>
      p.isEnabled ? (p.isActive ? "#00C49A" : "#FF7C98") : "#cccccc"};
    width: 60px;
    height: 35px;
    border-radius: 34px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.2s;

    &:after {
      left: ${p => (p.isActive ? "28px" : "6px")};
      background-color: white;
      border-radius: 50%;
      position: absolute;
      transition: 0.2s;
      height: 25px;
      width: 25px;
      content: "";
      top: 5px;
    }
  }
`

export const ToggleStyles = styled.input`
  display: none;
  appearance: none;
  width: 40px;
  height: 20px;
  background: ${props => (props.checked ? "#4caf50" : "#f44336")};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background 0.3s;
`
