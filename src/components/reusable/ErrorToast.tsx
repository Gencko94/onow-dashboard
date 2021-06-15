import { RiErrorWarningLine } from "react-icons/ri";
import styled from "styled-components";
import Flex from "../StyledComponents/Flex";
import Button from "./Button";

interface IProps {
  text: string;
  btnText: string;
  closeFunction: () => void;
}

const ErrorToast = ({ text, btnText, closeFunction }: IProps) => {
  return (
    <Container>
      <RiErrorWarningLine size={40} />
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
            hoverBg="#b72b2b"
            padding="0.25rem"
            textSize="0.8rem"
          />
        </Flex>
      </div>
    </Container>
  );
};

export default ErrorToast;
const Container = styled.div`
  background-color: rgba(238, 24, 24, 0.95);
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
  min-width: 350px;
  h6 {
    font-size: 0.8rem;
    font-weight: ${(props) => props.theme.font.semibold};
  }
`;
