import styled from "styled-components";

import ModalHead from "../Modal/ModalHead";
import ModalTail from "./ModalTail";

import Paragraph from "../StyledComponents/Paragraph";
import { up } from "../../utils/themes";
import { ModalWrapper } from "../Modal/ModalWrapper";

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
   * Success button loading state
   */
  isLoading?: boolean;
}
const ConfirmationModal = ({
  closeFunction,
  isOpen,
  title,
  successFunction,
  successButtonText,
  desc,
  isLoading,
}: ModalProps) => {
  return (
    <Modal>
      <ModalHead closeFunction={closeFunction} title={title} />
      <Body>
        <div className="description">
          <Paragraph>{desc}</Paragraph>
        </div>
        <ModalTail
          btnText={successButtonText}
          successCb={successFunction}
          closeFunction={closeFunction}
          isLoading={isLoading}
        />
      </Body>
    </Modal>
  );
};

export default ConfirmationModal;
const Modal = styled(ModalWrapper)(
  ({ theme: { breakpoints, shadow, accent1 } }) => `
  position: fixed;
  z-index: 20;
  inset:370px 20px;
  position:fixed;
  min-width:300px;
  border:none;
  outline:none;
  z-index:20;
  background-color:${accent1};
  ${up(breakpoints.md)}{
    inset:360px 190px;
  }
  ${up(breakpoints.lg)}{
    inset:360px 325px;
  }
  ${up(breakpoints.xl)}{
    inset:360px 490px;
  }
  `
);
const Body = styled.div(
  ({ theme: { breakpoints, border } }) => `

  width: 100%;
  height: 100%;
  display: grid;
  padding: 0.75rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  ${up(breakpoints.md)}{
   padding:1rem;
  }
  
  `
);
