import styled from "styled-components";

import ModalHead from "../../Modal/ModalHead";
import ModalTail from "../../Modal/ModalTail";

import Paragraph from "../../StyledComponents/Paragraph";
import { up } from "../../../utils/themes";
import { animated, useTransition } from "@react-spring/web";
import { DialogContent, DialogOverlay } from "@reach/dialog";

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
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });
  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <AnimatedDialogOverlay
              onDismiss={closeFunction}
              style={{ opacity: styles.opacity }}
            >
              <AnimatedDialogContent
                data-testid="confirmation-modal"
                aria-labelledby="dialog-title"
                style={{
                  transform: styles.y.to(
                    (value) => `translate3d(0px, ${value}px, 0px)`
                  ),
                }}
              >
                <ModalHead closeFunction={closeFunction} title={title} />

                <div className="description">
                  <Paragraph data-testid="confirmation-modal-description">
                    {desc}
                  </Paragraph>
                </div>
                <ModalTail
                  btnText={successButtonText}
                  successCb={successFunction}
                  closeFunction={closeFunction}
                  isLoading={isLoading}
                />
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </>
  );
};

export default ConfirmationModal;
const AnimatedDialogContent = styled(animated(DialogContent))(
  ({ theme: { breakpoints, subtleBackground } }) => `
  min-width:300px;
  width:300px;  
  background-color:${subtleBackground};
//   box-shadow: inset 0 0 1px 1px hsla(0, 0%, 100%, 0.9),
//   0 20px 27px 0 rgba(0, 0, 0, 0.05);
// backdrop-filter: saturate(200%) blur(30px);
  .description {
    padding:1rem;
  }
  ${up(breakpoints.md)}{
    min-width:400px;
   
  }

`
);

const AnimatedDialogOverlay = animated(DialogOverlay);
