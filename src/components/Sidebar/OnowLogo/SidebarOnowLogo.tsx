import styled from "styled-components";

const SidebarOnowLogo = () => {
  return (
    <Container>
      <img className="logo" src="/images/logo.svg" alt="o-now logo" />
    </Container>
  );
};

export default SidebarOnowLogo;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    min-height: 40px;
    height: 40px;
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    z-index: 1;
    .logo {
      min-height: 50px;
      height: 50px;
    }
  }
`;
