import styled from "styled-components";

interface IProps {
  msg?: string;
}

const InputErrorMessage = ({ msg }: IProps) => {
  return <Container>{msg}</Container>;
};

export default InputErrorMessage;

const Container = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  height: 22px;
  color: ${(props) => props.theme.dangerRed};
`;
