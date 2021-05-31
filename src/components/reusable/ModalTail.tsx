import { BsCheck } from "react-icons/bs";

import { MdClose } from "react-icons/md";
import styled from "styled-components";

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
    <Container>
      <button className="success" type="button" onClick={() => successCb()}>
        <BsCheck size={25} />
        <p className="btn-text">{btnText}</p>
      </button>
      <button className="close" type="button" onClick={() => closeFunction()}>
        <MdClose size={25} />
        <p className="btn-text">Cancel</p>
      </button>
    </Container>
  );
};

export default ModalTail;
const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  background-color: ${(props) => props.theme.overlayColor};
  button {
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    position: relative;
    padding: 0.5rem 0.5rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 75ms ease;
    &:hover {
      transform: translateY(-2px);
    }
    p.btn-text {
      font-weight: ${(props) => props.theme.font.regular};
      margin: 0 0.5rem;
    }
  }
  .close {
    background-color: ${(props) => props.theme.accentColor};
  }
  .success {
    margin: 0 1rem;
    background-color: ${(props) => props.theme.green};
  }
`;
