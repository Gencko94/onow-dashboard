import styled from 'styled-components';
import SidebarOnowLogo from './OnowLogo/SidebarOnowLogo';
import ProjectSwitcher from './ProjectSwitcher/ProjectSwitcher';
import SideNav from './SideNav/SideNav';
import SideUser from './SideUser/SideUser';

const Sidebar = () => {
  return (
    <Container>
      <SidebarOnowLogo />
      <Hr />
      <ProjectSwitcher />
      <SideNav />
      <Hr />
      <SideUser />
    </Container>
  );
};

export default Sidebar;
const Container = styled.aside`
  background-color: #fff;
  box-shadow: ${props => props.theme.shadow};
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const Hr = styled.hr`
  margin: 1rem 0;
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.4),
    transparent
  );
  background-color: transparent;
  border: none;
  height: 1px;
  opacity: 0.5;
`;
