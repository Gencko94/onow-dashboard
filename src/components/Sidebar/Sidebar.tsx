import styled from 'styled-components';
import SidebarOnowLogo from './OnowLogo/SidebarOnowLogo';
import ProjectSwitcher from './ProjectSwitcher/ProjectSwitcher';
import SideNav from './SideNav/SideNav';
import SideUser from './SideUser/SideUser';

const Sidebar = () => {
  return (
    <Container>
      <SidebarOnowLogo />
      <hr />
      <ProjectSwitcher />
      <SideNav />
      <hr />
      <SideUser />
    </Container>
  );
};

export default Sidebar;
const Container = styled.aside`
  background-color: #fff;
  position: sticky;
  top: 0;
  box-shadow: ${props => props.theme.shadow};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-self: flex-start;
`;
