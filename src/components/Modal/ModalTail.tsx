import styled from "styled-components";

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
const Container = styled.div`
  display: flex;
  padding: 0.75rem;
  justify-content: flex-end;
  align-items: center;
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    padding: 1rem;
  }
`;
