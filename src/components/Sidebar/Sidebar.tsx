import styled, { css } from 'styled-components';
import SidebarOnowLogo from './OnowLogo/SidebarOnowLogo';
import ProjectSwitcher from './ProjectSwitcher/ProjectSwitcher';
import SideNav from './SideNav/SideNav';
import SideUser from './SideUser/SideUser';
import Hr from '../StyledComponents/Hr';

interface IProps {
  // drawerOpen: boolean;
}

const Sidebar = ({}: IProps) => {
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
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  width:300px;
  z-index:3;
  display: flex;
  flex-direction: column;
  @media ${breakpoints.md}{

    z-index:1;
  }

  
  
  
  `
);
