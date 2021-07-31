import styled from "styled-components";
import { BiDotsVerticalRounded, BiLogOut } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { FiPower } from "react-icons/fi";
import Popover from "../../reusable/Popover";
import Button from "../../reusable/Button";
const SideUser = () => {
  const { user, logOut } = useContext(AuthProvider);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <div className="user">
        <img className="img" src="/images/user.jpg" alt="user" />
        <p className="name">{`${user?.first_name} ${user?.last_name}`}</p>
      </div>
      <button onClick={() => setMenuOpen(true)} className="menu-toggle">
        <BiDotsVerticalRounded size={22} />
        <CSSTransition
          in={menuOpen}
          classNames="menu"
          timeout={250}
          unmountOnExit
        >
          <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <Popover closeFunction={() => setMenuOpen(false)}>
              <Button
                padding="0.5rem"
                bg="transparent"
                textSize="0.8rem"
                Icon={FiPower}
                iconSize={15}
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
      </button>
    </Container>
  );
};

export default SideUser;
const Container = styled.div`
  /* box-shadow: ${(props) => props.theme.shadow}; */
  padding: 0.5rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #333;
  color: ${(props) => props.theme.textPrimaryContrast};

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
    color: ${(props) => props.theme.textPrimaryContrast};
  }
  /* .menu {
    position: absolute;
    top: -10px;
    right: 10px;
    z-index: 10;

    background-color: #fff;
    transform-origin: right;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 5px;
  }
  .menu-item {
    color: ${(props) => props.theme.textPrimaryContrast};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    &:hover {
      background-color: ${(props) => props.theme.accentColor};
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    p {
      margin: 0 0.25rem;
    }
  } */
`;
