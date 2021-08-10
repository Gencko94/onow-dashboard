import styled from "styled-components";
import { BiDotsVerticalRounded, BiLogOut } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { FiPower } from "react-icons/fi";
import Popover from "../../reusable/Popover";
import Button from "../../reusable/Button";
import IconButton from "../../reusable/IconButton";
const SideUser = () => {
  const { user, logOut } = useContext(AuthProvider);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <div className="user">
        <img className="img" src="/images/user.jpg" alt="user" />
        <p className="name">{`${user?.first_name} ${user?.last_name}`}</p>
      </div>
      <div className="menu">
        <IconButton
          textColor="primaryContrast"
          circle
          noRipple
          onClick={() => setMenuOpen(true)}
          Icon={BiDotsVerticalRounded}
        ></IconButton>
        <CSSTransition
          in={menuOpen}
          classNames="menu"
          timeout={250}
          unmountOnExit
        >
          <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <Popover closeFunction={() => setMenuOpen(false)}>
              <Button
                onClick={(e) => {
                  logOut?.();
                }}
              >
                Logout
              </Button>
            </Popover>
            {/* <ul className="menu">
              <button onClick={() => logOut?.()} className="menu-item">
              <FiPower />
              <p>Logout</p>
              </button>
            </ul> */}
          </ClickAwayListener>
        </CSSTransition>
      </div>
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
