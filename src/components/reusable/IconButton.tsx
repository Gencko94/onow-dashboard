import React from "react";
import styled from "styled-components";

const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>((props, ref) => {
  return (
    <BaseIconButton ref={ref} {...props}>
      {props.children}
    </BaseIconButton>
  );
});

export default IconButton;

const BaseIconButton = styled.button`
  opacity: 0.7;
  transition: opacity 250ms;
  position: relative;
  color: ${(props) => props.theme.text};

  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 1;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    filter: hue-rotate(4deg) saturate(120%) brightness(120%);
  }
  &:not(:disabled):active {
    transform: scale(0.95);
    transition: transform 32ms;
  }
  &:focus {
    outline: 2px auto ${(props) => props.theme.primary};
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;
