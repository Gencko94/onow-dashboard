import styled from "styled-components";
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
const Container = styled.aside`
  background-color: ${(props) => props.theme.sidebarBackground};

  box-shadow: ${(props) => props.theme.shadow};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  z-index: 1;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  &:before {
    z-index: -1;
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    z-index: 0;
  }
`;
