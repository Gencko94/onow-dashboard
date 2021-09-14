import { GrClose } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import Button from "../reusable/Button";
import IconWrapper from "../reusable/Icon";
import IconButton from "../reusable/IconButton";
import Heading from "../StyledComponents/Heading";

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
      <Heading
        data-testid="confirmation-modal-title"
        tag="h5"
        type="medium-title"
      >
        {title}
      </Heading>
      <IconButton
        data-testid="confirmation-modal-close-btn"
        onClick={() => {
          closeFunction();
        }}
      >
        <IoMdClose size={30} />
      </IconButton>
    </Container>
  );
};

export default ModalHead;
const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.subtleBackground};
  border-bottom: ${(props) => props.theme.border};
`;
