import { BsCheck } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import ReactModal from "react-modal";
import styled from "styled-components";
import ModalHead from "../reusable/ModalHead";
import ModalTail from "../reusable/ModalTail";
ReactModal.setAppElement("#root");
const modalStyles = {
  content: {
    inset: "240px",
    border: "none",
    boxShadow: "0px 4px 7px 2px rgb(213,213,213)",
  },
};
interface ModalProps {
  closeFunction: () => void;
  title: string;
  isOpen: boolean;
  styles?: ReactModal.Styles;
}

const Modal: React.FC<ModalProps> = ({
  children,
  closeFunction,
  title,
  isOpen,
  styles = modalStyles,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeFunction}
      style={styles}
      closeTimeoutMS={200}
    >
      <Body>
        <ModalHead closeFunction={closeFunction} title={title} />
        {children}
        <ModalTail
          btnText="Confirm"
          successCb={() => {}}
          closeFunction={closeFunction}
        />
      </Body>
    </ReactModal>
  );
};

export default Modal;
const Body = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  width: 100%;
`;
