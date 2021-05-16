import styled from "styled-components";
import { BsCheck, BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { useHistory } from "react-router";
const CustomerItem = () => {
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const history = useHistory();
  return (
    <Container>
      <div className="field">
        <CheckboxContainer>
          <BsCheck size={15} />
        </CheckboxContainer>
      </div>
      <div className="field">
        <h6>Ahmad Zaaza</h6>
      </div>
      <div className="field">
        <h6>+9659874621</h6>
      </div>
      <div className="field">
        <h6>gfox.piano@hotmail.com</h6>
      </div>
      <div className="field">
        <ButtonsContainer>
          <button
            onClick={() => history.push("/customers/1")}
            className="icon"
            title="Visit Profile"
          >
            <ImProfile size={18} />
          </button>
          <ActionButtonContainer onClick={() => setActionsMenuOpen(true)}>
            <button className="icon">
              <BsThreeDotsVertical size={18} />
            </button>
            <CSSTransition
              in={actionsMenuOpen}
              classNames="menu"
              unmountOnExit
              timeout={100}
            >
              <ClickAwayListener onClickAway={() => setActionsMenuOpen(false)}>
                <ul>
                  <li>
                    <button>
                      <span className="icon">
                        <RiDeleteBinLine size={15} />
                      </span>
                      <p>Delete</p>
                    </button>
                  </li>
                </ul>
              </ClickAwayListener>
            </CSSTransition>
          </ActionButtonContainer>
        </ButtonsContainer>
      </div>
    </Container>
  );
};

export default CustomerItem;
const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 0.5fr;
  background-color: #fff;
  gap: 1rem;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    text-align: center;
    h6 {
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.regular};
    }
  }
`;
const CheckboxContainer = styled.button`
  border: ${(props) => props.theme.border};
  border-radius: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;
const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  button.icon {
    display: inline-block;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    transition: all 75ms ease;
    &:hover {
      background-color: #e6e6e6;
    }
  }
`;
const ActionButtonContainer = styled.div`
  position: relative;

  ul {
    position: absolute;
    bottom: -3px;
    right: 8px;
    z-index: 10;
    background-color: #fff;
    transform-origin: right;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 5px;
  }
  ul li button {
    padding: 0.5rem;
    display: block;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    color: ${(props) => props.color};
    transition: all 75ms ease;
    &:hover {
      color: ${(props) => props.theme.headingColor};
      background-color: ${(props) => props.theme.highlightColor};
    }
    p {
      margin: 0 0.5rem;
    }
  }
  span.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
  }
`;
