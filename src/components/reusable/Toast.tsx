import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import styled from "styled-components";
import Flex from "../StyledComponents/Flex";
import Button from "./Button";

interface IProps {
  text: string;
  btnText: string;
  closeFunction: () => void;
  type: "success" | "error";
}

const Toast = ({ text, btnText, closeFunction, type }: IProps) => {
  return (
    <Container type={type}>
      {type === "error" ? (
        <RiErrorWarningLine size={40} />
      ) : (
        <IoIosCheckmarkCircleOutline size={40} />
      )}
      <div className="content">
        <h6>{text}</h6>
        <Flex justify="flex-end">
          <Button
            withRipple
            text={btnText}
            onClick={(e) => {
              e.stopPropagation();
              closeFunction();
            }}
            bg="transparent"
            hoverBg="#f8f8f83b"
            padding="0.25rem"
            textSize="0.8rem"
          />
        </Flex>
      </div>
    </Container>
  );
};

export default Toast;
const Container = styled.div<{ type: "error" | "success" }>`
  background-color: ${(props) =>
    props.type === "error"
      ? "rgba(238, 24, 24, 0.95)"
      : "rgba(20, 148, 20, 0.95)"};
  color: #fff;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 6px 0 0 6px;
  position: fixed;
  top: 75px;
  right: 0px;
  align-items: center;
  z-index: 1000;
  min-width: 350px;
  h6 {
    font-size: 0.8rem;
    font-weight: ${(props) => props.theme.font.semibold};
  }
`;
