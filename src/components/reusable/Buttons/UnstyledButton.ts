import styled from "styled-components";

export default styled.button<{ display?: any }>`
  display: ${(props) => props.display || "block"};
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: spinner 2s infinite linear forwards;
  }
  &:focus {
    outline: 2px auto ${(props) => props.theme.primary};
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;
