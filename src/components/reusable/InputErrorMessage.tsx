import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";

interface IProps {
  errors: any;
  name?: string;
}

const InputErrorMessage = ({ errors, name }: IProps) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name!}
      render={({ message }) => (
        <Container role="alert" data-testid="input-error-message">
          {message}
        </Container>
      )}
    />
  );
};

export default InputErrorMessage;

const Container = styled.span`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  height: 22px;
  color: ${(props) => props.theme.dangerRed};
`;
