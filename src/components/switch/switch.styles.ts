import styled from "styled-components"

export const SwitchContainer = styled.div<{
  isActive: boolean
  isEnabled: boolean
  label: string
}>`
  pointer-events: ${p => (p.isEnabled ? "inherit" : "none")};
  position: relative;

  > label {
    background: ${p =>
      p.isEnabled ? (p.isActive ? "#4caf50" : "#FF8E8E") : "#cccccc"};
    width: 90px;
    height: 42px;
    border-radius: 34px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.2s;

    &:after {
      left: ${p => (p.isActive ? "50px" : "7px")};
      background-color: white;
      border-radius: 50%;
      position: absolute;
      transition: 0.2s;
      height: 33px;
      content: "";
      width: 33px;
      top: 5px;
    }
    &:before {
      content: "${p => p.label}";
      position: absolute;
      font-size: 8px;
      color: white;
      text-transform: uppercase;
      top: ${p => (p.isActive ? "15px" : "15px")};
      left: ${p => (p.isActive ? "12px" : "43px")};
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

  // &:before {
  //   content: "";
  //   position: absolute;
  //   width: 18px;
  //   height: 18px;
  //   border-radius: 50%;
  //   background: white;
  //   top: 1px;
  //   left: ${props => (props.checked ? "20px" : "1px")};
  //   transition: left 0.3s;
  // }
`
