import styled from "styled-components";
import { BiDotsVerticalRounded, BiLogOut } from "react-icons/bi";
import { useContext, useState } from "react";
import { AuthProvider } from "../../../contexts/AuthContext";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { FiPower } from "react-icons/fi";
const SideUser = () => {
  const { user, logOut } = useContext(AuthProvider);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <div className="user">
        <img className="img" src="/images/user.jpg" alt="user" />
        <p className="name">{`${user?.firstName} ${user?.lastName}`}</p>
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
            <ul className="menu">
              <button onClick={() => logOut?.()} className="menu-item">
                <FiPower />
                <p>Logout</p>
              </button>
            </ul>
          </ClickAwayListener>
        </CSSTransition>
      </button>
    </Container>
  );
};

export default SideUser;
const Container = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  padding: 0.5rem;
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  }
  .menu {
    position: absolute;
    top: -10px;
    right: 10px;
    z-index: 10;

    background-color: #fff;
    transform-origin: right;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 5px;

    color: ${(props) => props.theme.headingColor};
  }
  .menu-item {
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
  }
`;
