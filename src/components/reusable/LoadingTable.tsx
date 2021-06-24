import styled from "styled-components";
import Spinner from "react-loader-spinner";
const LoadingTable = () => {
  return (
    <Container>
      <Spinner type="TailSpin" />
    </Container>
  );
};

export default LoadingTable;
const Container = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;
