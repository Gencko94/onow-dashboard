import styled from 'styled-components';

const SidebarOnowLogo = () => {
  return (
    <Container>
      <Logo src="/images/logo.svg" alt="o-now logo" />
    </Container>
  );
};

export default SidebarOnowLogo;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img``;
