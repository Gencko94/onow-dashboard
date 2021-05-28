import { GrClose } from "react-icons/gr";
import styled from "styled-components";

interface IProps {
  /**
   * Specifies the Modal's head title.
   */
  title: string;
  /**
   * Callback function to execute when the close button is pressed.
   */
  closeFunction: () => void;
}

const ModalHead = ({ closeFunction, title }: IProps) => {
  return (
    <Container>
      <h5>Create New Customer</h5>
      <button className="close" type="button" onClick={() => closeFunction()}>
        <GrClose size={20} />
      </button>
    </Container>
  );
};

export default ModalHead;
const Container = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.overlayColor};
  border-bottom: ${(props) => props.theme.border};
  .close {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
