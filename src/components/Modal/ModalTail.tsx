import { BsCheck } from "react-icons/bs";

import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { up } from "../../utils/themes";
import Flex from "../StyledComponents/Flex";
import Button from "../reusable/Button";
import Spacer from "../reusable/Spacer";

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
        data-testid="confirmation-modal-confirm-btn"
        color="green"
        withTransition
        type={btnType}
        onClick={() => {
          successCb();
        }}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {btnText}
      </Button>
      <Spacer size={10} />
      <Button
        data-testid="confirmation-modal-cancel-btn"
        color="danger"
        withTransition
        onClick={() => closeFunction()}
      >
        Cancel
      </Button>
    </Container>
  );
};

export default ModalTail;
const Container = styled.div(
  ({ theme: { breakpoints, border } }) => `
  display: flex;
  padding: 0.75rem;
  justify-content:flex-end;
  align-items:center;  
  ${up(breakpoints.md)}{
   padding:1rem;
  }
  `
);
