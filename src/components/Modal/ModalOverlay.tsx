import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ModalOverlay: React.FC<Props> = ({ open, handleClose, children }) => {
  return (
    <CSSTransition
      classNames="modal-overlay"
      timeout={200}
      unmountOnExit
      in={open}
    >
      <Container
        onClickCapture={(e) => {
          if (e.target !== e.currentTarget) {
            e.stopPropagation();
          }
        }}
        onClick={() => handleClose()}
      >
        {children}
      </Container>
    </CSSTransition>
  );
};

export default ModalOverlay;
const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;
