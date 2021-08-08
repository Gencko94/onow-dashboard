import { AiOutlineReload } from "react-icons/ai";
import styled from "styled-components";
import NotFound from "../../pages/NotFound";
import Heading from "../StyledComponents/Heading";
import Button from "./Button";

interface IProps {
  resetErrorBoundary: (...args: unknown[]) => void;
  error: any;
}

const ErrorBoundaryComponent = ({ resetErrorBoundary, error }: IProps) => {
  if (error.response) {
    if (error.response.status === 404) {
      return <NotFound />;
    } else if (error.response.status === 401) {
    }
  }
  return (
    <Container>
      <img className="img" alt="something-went-wrong" src="/images/500.svg" />
      <Heading tag="h4" textAlign="center">
        Something went wrong , please try again
      </Heading>
      <Button
        margin="1rem 0"
        color="green"
        onClick={resetErrorBoundary}
        withTransition
      >
        Try again
      </Button>

      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
    </Container>
  );
};

export default ErrorBoundaryComponent;
const Container = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .img {
    margin-bottom: 1.5rem;
  }
  pre {
    font-family: "Courier New", Courier, monospace;
    font-size: 0.9rem;
  }
`;
