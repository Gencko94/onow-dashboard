import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useContext } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";

import Paragraph from "../../StyledComponents/Paragraph";

import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";

const SideUser = () => {
  const { user, logOut } = useContext(AuthProvider);

  return (
    <Container>
      <div className="user">
        <img className="img" src="/images/user.jpg" alt="user" />
        <Paragraph color="textAltContrast" fontSize="0.9rem" margin="0 0.5rem">
          {user?.first_name} {user?.last_name}
        </Paragraph>
      </div>

      <Menu>
        <MenuButton>
          {/* <IconButton> */}
          <BiDotsVerticalRounded size={22} color="#fff" />
          {/* </IconButton> */}
        </MenuButton>
        <MenuPopover
          className="slide-down"
          // position={(button, popover) => {
          //   return { top: button!.top - 15, left: button!.left - 50 };
          // }}
        >
          <MenuItem
            onSelect={() => {
              logOut?.();
            }}
          >
            Logout
          </MenuItem>
        </MenuPopover>
      </Menu>
    </Container>
  );
};

export default SideUser;

const Container = styled.div`
  padding: 0.5rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.sidebarSubtleBackground};
  color: #fff;

  border-radius: 8px;
  .user {
    display: flex;
    align-items: center;
    .name {
      margin: 0 0.5rem;
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.regular};
    }
    .img {
      border-radius: 50%;
      height: 40px;
      width: 40px;
      object-fit: cover;
    }
  }
  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: ${(props) => props.theme.textContrast};
  }
  .menu {
    position: relative;
  }
`;
