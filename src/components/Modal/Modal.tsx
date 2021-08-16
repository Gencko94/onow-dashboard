import { Suspense } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import Loading from "../../utils/Loading";
import Portal from "../Portal/Portal";

import ModalOverlay from "./ModalOverlay";

interface ModalProps {
  closeFunction: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ closeFunction, isOpen, children }) => {
  return (
    <>
      <Portal>
        <ModalOverlay handleClose={closeFunction} open={isOpen}>
          <CSSTransition
            classNames="product-option-modal"
            timeout={200}
            unmountOnExit
            in={isOpen}
          >
            {children}
          </CSSTransition>
        </ModalOverlay>
        {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
      </Portal>
    </>
  );
};

export default Modal;
const ModalWrapper = styled.div``;
