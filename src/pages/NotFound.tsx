import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>Oops , We couldn't find what you are looking for :(</Container>
  );
};

export default NotFound;
const Container = styled.div`
  height: calc(100vh - 88px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
