import { BsCheck } from "react-icons/bs";

import { MdClose } from "react-icons/md";
import styled from "styled-components";
import Flex from "../StyledComponents/Flex";
import Button from "./Button";

interface IProps {
  /**
   * Specifies the Modal's head title.
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
}

const ModalTail = ({ btnText, closeFunction, successCb }: IProps) => {
  return (
    <Flex padding="0.5rem 0.5rem" justify="flex-end">
      <Button
        text={btnText}
        bg="green"
        withRipple
        withTransition
        padding="0.25rem 0.25rem"
        Icon={BsCheck}
        margin="0 0.5rem"
        onClick={() => {
          successCb();
          closeFunction();
        }}
        textSize="0.8rem"
        iconSize={20}
      />
      <Button
        text="Cancel"
        iconSize={20}
        bg="danger"
        withRipple
        textSize="0.8rem"
        withTransition
        padding="0.25rem 0.25rem"
        Icon={MdClose}
        onClick={() => closeFunction()}
      />
    </Flex>
  );
};

export default ModalTail;
