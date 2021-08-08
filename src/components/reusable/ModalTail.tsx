import { BsCheck } from "react-icons/bs";

import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { up } from "../../utils/themes";
import Flex from "../StyledComponents/Flex";
import Button from "./Button";

interface IProps {
  /**
   * Success button callback function.
   */
  successCb: () => void;
  /**
   * Callback function to execute when the close button is pressed.
   */
  closeFunction: () => void;
  /**
   * Success Button Text.
   */
  btnText: string;
  /**
   * Success button loading state
   */
  isLoading?: boolean;
  /**
   * Success Button Type
   */
  btnType?: "submit" | "button";
}

const ModalTail = ({
  btnText,
  closeFunction,
  successCb,
  isLoading,
  btnType,
}: IProps) => {
  return (
    <Container>
      <Button
        color="green"
        withTransition
        margin="0 0.5rem"
        type={btnType}
        onClick={() => {
          successCb();
        }}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {btnText}
      </Button>
      <Button color="danger" withTransition onClick={() => closeFunction()}>
        Cancel
      </Button>
    </Container>
  );
};

export default ModalTail;
const Container = styled.div(
  ({ theme: { breakpoints, border } }) => `
  display: flex;
  padding: 0.75rem 0;
  justify-content:flex-end;
  align-items:center;  
  ${up(breakpoints.md)}{
   padding:1rem 0;
  }
  `
);
