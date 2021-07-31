import { BsCheck } from "react-icons/bs";

import { MdClose } from "react-icons/md";
import Flex from "../StyledComponents/Flex";
import Button from "./Button";

interface IProps {
  /**
   * Success button callback function.
   */
  successCb: () => void;
  /**
   * Callback function to execute when the close button is pressed.
   */
  closeFunction: () => void;
  /**
   * Success Button Text.
   */
  btnText: string;
  /**
   * Success button loading state
   */
  isLoading?: boolean;
  /**
   * Success Button Type
   */
  btnType?: "submit" | "button";
}

const ModalTail = ({
  btnText,
  closeFunction,
  successCb,
  isLoading,
  btnType,
}: IProps) => {
  return (
    <Flex padding="0.5rem 0.5rem" justify="flex-end">
      <Button
        bg="green"
        withRipple
        withTransition
        padding="0.5rem 0.25rem"
        Icon={BsCheck}
        margin="0 0.5rem"
        type={btnType}
        onClick={() => {
          successCb();
        }}
        textSize="0.9rem"
        iconSize={22}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {btnText}
      </Button>
      <Button
        iconSize={22}
        bg="danger"
        withRipple
        textSize="0.9rem"
        withTransition
        padding="0.5rem 0.25rem"
        Icon={MdClose}
        onClick={() => closeFunction()}
      >
        Cancel
      </Button>
    </Flex>
  );
};

export default ModalTail;
