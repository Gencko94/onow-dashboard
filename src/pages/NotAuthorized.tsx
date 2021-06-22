import styled from "styled-components";

const NotAuthorized = () => {
  return <Container>Not Authorized to visit this Page</Container>;
};

export default NotAuthorized;
const Container = styled.div`
  height: calc(100vh - 88px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
