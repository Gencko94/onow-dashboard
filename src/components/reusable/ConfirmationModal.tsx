import styled from "styled-components";
import ReactModal from "react-modal";
import { Suspense } from "react";
import Loading from "../../utils/Loading";
import ModalHead from "./ModalHead";
import ModalTail from "./ModalTail";
import { FlexWrapper } from "../StyledComponents/Flex";
const modalStyles = {
  content: {
    inset: "240px",
    border: "none",
    boxShadow: "0px 4px 7px 2px rgb(213,213,213)",
  },
};
interface ModalProps {
  /**
   * Function to execute when the confirm button is clicked
   */
  closeFunction: () => void;
  /**
   * The Close Function
   */
  successFunction: () => void;
  /**
   * Modal Head title
   */
  title: string;
  /**
   * Confirmation modal description text
   */
  desc: string;
  /**
   * Success button text
   */
  successButtonText: string;
  /**
   * Boolean controlling the modal state
   */
  isOpen: boolean;
  /**
   * Custom styles for the modal
   */
  styles?: ReactModal.Styles;
  /**
   * Success button loading state
   */
  isLoading?: boolean;
}
const ConfirmationModal = ({
  closeFunction,
  isOpen,
  title,
  styles,
  successFunction,
  successButtonText,
  desc,
  isLoading,
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeFunction}
      style={styles}
      closeTimeoutMS={200}
    >
      <Body>
        <ModalHead closeFunction={closeFunction} title={title} />

        <div className="description">
          <p>{desc}</p>
        </div>
        <ModalTail
          btnText={successButtonText}
          successCb={successFunction}
          closeFunction={closeFunction}
          isLoading={isLoading}
        />
      </Body>
    </ReactModal>
  );
};

export default ConfirmationModal;

const Body = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  .description {
    padding: 1.5rem 1rem;
    font-size: 0.9rem;
    color: ${(props) => props.theme.subHeading};
  }
  ${FlexWrapper} {
    border-top: ${(props) => props.theme.border};
  }
`;
