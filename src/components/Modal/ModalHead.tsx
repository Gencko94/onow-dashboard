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
      <Heading weight="bold" tag="h5" color="heading">
        {title}
      </Heading>
      <Button onClick={() => closeFunction()}>
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
  background-color: ${(props) => props.theme.accent1};
  border-bottom: ${(props) => props.theme.border};
`;
