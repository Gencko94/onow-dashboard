import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import AddBlockModal from "../../Modal/AddBlockModal";
import Modal from "../../Modal/Modal";

const AddNewBlock = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Container onClick={() => setModalOpen(true)}>
        <BsPlusCircle size={30} />
        <h6>Add New Block</h6>
      </Container>
      <CSSTransition
        in={modalOpen}
        timeout={150}
        classNames="modal"
        unmountOnExit
      >
        <Modal
          isOpen={modalOpen}
          title="Select Block Type"
          closeFunction={() => setModalOpen(false)}
        >
          <AddBlockModal />
        </Modal>
      </CSSTransition>
    </>
  );
};

export default AddNewBlock;
const Container = styled.div`
  border-radius: 12px;
  height: 150px;
  border: ${(props) => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.overlayColor};
  cursor: pointer;
  h6 {
    margin-top: 1rem;
  }
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;
