import styled from "styled-components";

import UnstyledButton from "./Buttons/UnstyledButton";

type DefaultButtonProps = Omit<JSX.IntrinsicElements["button"], "ref">;

const IconButton: React.FC<DefaultButtonProps> = ({ children, ...props }) => {
  return <BaseIconButton {...props}>{children}</BaseIconButton>;
};

export default IconButton;

const BaseIconButton = styled(UnstyledButton)`
  opacity: 0.7;
  transition: opacity 250ms;
  position: relative;
  color: ${(props) => props.theme.text};

  width: 40px;
  height: 32px;
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
`;
