import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";

interface IProps {
  member: STAFF_MEMBER;
}

const StaffItem = ({ member }: IProps) => {
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/staff/${member.id}`)}>
      {/* <div className="field">
          <CheckboxContainer>
            <BsCheck size={15} />
          </CheckboxContainer>
        </div> */}
      <div className="field">
        <h6>{member.name}</h6>
      </div>
      <div className="field">
        <h6>{member.phone}</h6>
      </div>
      <div className="field">
        <h6>{member.email}</h6>
      </div>
      <div className="field">
        <h6>{member.role}</h6>
      </div>

      <div className="field">
        <ButtonsContainer>
          <ActionButtonContainer
            onClick={(e) => {
              e.stopPropagation();
              setActionsMenuOpen(true);
            }}
          >
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

export default StaffItem;
const Container = styled.div(
  ({ theme: { breakpoints, border, font, highlightColor } }) => `
    background-color:#fff;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    border-bottom: ${border};
    &:hover {
      background-color: ${highlightColor};
    }
    
    .field {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
      text-align: center;
    }
    h6 {
      font-size: 0.8rem;
      font-weight: ${font.semibold};
    }
    @media ${breakpoints.xl}{
      h6 {
        font-weight: ${font.regular};
        font-size: 1rem;
      }
  
    }
    `
);
const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  button.icon {
    z-index: 1;
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