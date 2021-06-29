import styled, { css } from "styled-components";
import SidebarOnowLogo from "./OnowLogo/SidebarOnowLogo";
import ProjectSwitcher from "./ProjectSwitcher/ProjectSwitcher";
import SideNav from "./SideNav/SideNav";
import SideUser from "./SideUser/SideUser";
import Hr from "../StyledComponents/Hr";
import ClickAwayListener from "react-click-away-listener";
import { Dispatch, SetStateAction } from "react";

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
  ({ theme: { breakpoints, shadow } }) => `
  background-color: #fff;
  box-shadow: ${shadow};
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  width:300px;
  z-index:3;
  padding:0.5rem;
  display: flex;
  flex-direction: column;
  @media ${breakpoints.md}{
    z-index:1;
  }
  `
);
