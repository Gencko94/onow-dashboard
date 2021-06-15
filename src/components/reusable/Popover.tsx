import ClickAwayListener from "react-click-away-listener";
import styled from "styled-components";

interface IProps {
  /**
   * Transform Origin
   */
  origin?: string;
  /**
   * Close function
   */
  closeFunction: () => void;
}

const Popover: React.FC<IProps> = ({
  children,
  origin = "right",
  closeFunction,
}) => {
  return (
    <ClickAwayListener onClickAway={() => closeFunction()}>
      <Container origin={origin}>{children}</Container>
    </ClickAwayListener>
  );
};

export default Popover;

const Container = styled.div<{ origin: string }>`
  position: absolute;
  bottom: -3px;
  right: 8px;
  z-index: 10;
  background-color: #fff;
  transform-origin: ${(props) => props.origin};
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
`;
