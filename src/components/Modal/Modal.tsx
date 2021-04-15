import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
interface ModalProps {
  closeFunction: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ children, closeFunction, title }) => {
  return (
    <>
      <Backdrop onClick={() => closeFunction()} />
      <ModalContainer>
        <ModalHead>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton type="button" onClick={() => closeFunction()}>
            <GrClose size={20} />
          </CloseButton>
        </ModalHead>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </>
  );
};

export default Modal;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  /* min-width: 300px; */
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadow};
  z-index: 999;
  /* max-height: calc(100vh- 250px); */
  /* overflow-y: auto; */
`;
const ModalHead = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.theme.border};
`;
const ModalBody = styled.div`
  padding: 1rem;
`;
const ModalTitle = styled.h5``;
const Backdrop = styled.span`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
`;
const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
