import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ModalOverlay: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <CSSTransition
      classNames="modal-overlay"
      timeout={200}
      unmountOnExit
      in={open}
    >
      <Container onClick={() => handleClose()}></Container>
    </CSSTransition>
  );
};

export default ModalOverlay;
const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 19;
  background-color: rgba(0, 0, 0, 0.4);
`;
