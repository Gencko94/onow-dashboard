import { Suspense } from "react";

import Loading from "../../utils/Loading";

import ModalOverlay from "./ModalOverlay";

interface ModalProps {
  closeFunction: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ closeFunction, isOpen, children }) => {
  return (
    <>
      <ModalOverlay open={isOpen} handleClose={closeFunction} />

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default Modal;
