import styled, { css } from "styled-components";
import { CustomCheckboxContainer, CustomCheckboxInput } from "@reach/checkbox";
import "@reach/checkbox/styles.css";
interface IProps {
  /**
   * 	```onChange``` callback function.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 	Boolean indicated whether the input is checked.
   */
  checked: boolean;
  small?: boolean;
  id?: string;
}

const Checkbox = ({ checked, onChange, small, id }: IProps) => {
  return (
    <CustomCheckboxContainer
      checked={checked}
      onChange={onChange}
      style={getContainerStyle()}
    >
      <CustomCheckboxInput id="id" />
      <Checkmark aria-hidden checked={checked} />
    </CustomCheckboxContainer>
  );
};

export default Checkbox;
function getContainerStyle() {
  return {
    background: "rgba(240, 240, 250, 0.8)",
    border: "2px solid rgba(0, 0, 0, 0.8)",
    borderRadius: "3px",
    height: 26,
    width: 26,
  };
}
const Checkmark = styled.span<{ checked: boolean }>`
  display: block;
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  border-radius: 2px;
  transition: transform 200ms ease-out, background 200ms ease-out;
  z-index: 1;
  background: ${(props) =>
    props.checked ? props.theme.primary : "transparent"};
  transform: ${(props) => `translate(-50%, -50%) scaleX(${
    props.checked ? 1 : 0
  }) scaleY(
      ${props.checked ? "1" : "0"})`};
`;

// const Container = styled.span<{ checked: boolean; small?: boolean }>`
//   display: inline-block;
//   position: relative;
//   color: ${(props) => props.theme.primary};
//   padding: 7px;

//   cursor: pointer;
//   font-size: 0.9rem;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
//   transition: all 75ms ease;
//   &:hover {
//     font-weight: ${(props) => props.theme.font.semibold};
//   }
//   .check {
//     width: 100%;
//     display: flex;
//     align-items: inherit;
//     justify-content: inherit;
//   }
//   input {
//     top: 0;
//     left: 0;
//     width: 100%;
//     cursor: inherit;
//     height: 100%;
//     margin: 0;
//     opacity: 0;
//     padding: 0;
//     z-index: 10;
//     position: absolute;
//   }

//   .svg {
//     fill: currentColor;
//     width: 1em;
//     height: 1em;
//     display: inline-block;
//     font-size: 1.5rem;
//     transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//     flex-shrink: 0;
//     user-select: none;
//   }
//   ${(props) =>
//     props.small &&
//     css`
//       padding: 5px 3px;
//       .svg {
//         width: 0.75em;
//         height: 0.75em;
//       }
//     `}
// `;
