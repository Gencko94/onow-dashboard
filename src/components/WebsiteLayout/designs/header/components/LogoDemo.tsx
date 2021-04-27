import styled from 'styled-components';

const LogoDemo = () => {
  return (
    <Container>
      <img src="/images/logo.svg" alt="logo" />
    </Container>
  );
};

export default LogoDemo;
const Container = styled.div`
  max-height: 150px;
  .img {
  }
`;
