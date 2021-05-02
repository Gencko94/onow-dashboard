import styled from 'styled-components';
import SidebarOnowLogo from './OnowLogo/SidebarOnowLogo';
import ProjectSwitcher from './ProjectSwitcher/ProjectSwitcher';
import SideNav from './SideNav/SideNav';
import SideUser from './SideUser/SideUser';
import Hr from '../StyledComponents/Hr';
const Sidebar = () => {
  return (
    <Container>
      <SidebarOnowLogo />
      <Hr m="1" />
      <ProjectSwitcher />
      <SideNav />
      <Hr m="1" />
      <SideUser />
    </Container>
  );
};

export default Sidebar;
const Container = styled.aside(
  ({ theme: { breakpoints, shadow } }) => `
  background-color: #fff;
  box-shadow: ${shadow};
  padding: 1rem;
  height: 90vh;
  border-radius:12px;
  
  min-width: 300px;
  flex-direction: column;
  @media ${breakpoints.md}{
    border-radius:0px;
    display: flex;
    align-self: flex-start;
    min-height: 100vh;
    position: sticky;
    min-width: 300px;
    top: 0;

  }
  `
);
