import styled, { css } from "styled-components";
import SidebarOnowLogo from "./OnowLogo/SidebarOnowLogo";
import ProjectSwitcher from "./ProjectSwitcher/ProjectSwitcher";
import SideNav from "./SideNav/SideNav";
import SideUser from "./SideUser/SideUser";
import Hr from "../StyledComponents/Hr";
import ClickAwayListener from "react-click-away-listener";
import { Dispatch, SetStateAction } from "react";
import { up } from "../../utils/themes";

interface IProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  isDesktop: boolean;
}

const Sidebar = ({ setDrawerOpen, isDesktop }: IProps) => {
  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!isDesktop) {
          setDrawerOpen(false);
        }
      }}
    >
      <Container>
        <SidebarOnowLogo />
        <Hr m="1" />
        <ProjectSwitcher />
        <SideNav />
        <Hr m="1" />
        <SideUser />
      </Container>
    </ClickAwayListener>
  );
};

export default Sidebar;
const Container = styled.aside(
  ({ theme: { breakpoints, shadow, sidebarBackground } }) => `
  background-color:${sidebarBackground};
  
  
  
  box-shadow: ${shadow};
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  width:300px;
  // z-index:3;
  padding:0.5rem;
  display: flex;
  flex-direction: column;
  &:before
   {
     z-index:-1;
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.3;
    
  }
  ${up(breakpoints.md)}{
    // z-index:0;
  }
  `
);
