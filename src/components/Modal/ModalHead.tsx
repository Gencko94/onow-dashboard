import { GrClose } from "react-icons/gr";
import styled from "styled-components";
import Button from "../reusable/Button";
import IconWrapper from "../reusable/Icon";
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
      <Heading tag="h5" type="small-title">
        {title}
      </Heading>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          closeFunction();
        }}
      >
        <IconWrapper Icon={GrClose} />
      </Button>
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
