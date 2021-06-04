import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { RiDeleteBinLine } from "react-icons/ri";

import { useHistory } from "react-router";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import SubCategoriesList from "./SubCategoriesList";
import Checkbox from "../../reusable/Inputs/Checkbox";

const SubCategoryItem = () => {
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const history = useHistory();
  const renderStatus = (id: number) => {
    switch (id) {
      case 1:
        return (
          <Status color="green">
            <span className="dot" />
            <h6>Active</h6>
          </Status>
        );
      case 2:
        return (
          <Status color="#b72b2b">
            <span className="dot" />
            <h6>Disabled</h6>
          </Status>
        );
      default:
        break;
    }
  };
  return (
    <>
      <Container onClick={() => history.push(`/categories/category/1`)}>
        <div className="btns-container">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSubmenuOpen(!submenuOpen);
            }}
            className="menu-toggler"
          >
            {submenuOpen ? (
              <BiChevronUp size={25} />
            ) : (
              <BiChevronDown size={25} />
            )}
          </button>
          <Checkbox
            checked={true}
            onChange={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        <div className="field">
          <h6>Name</h6>
        </div>
        <div className="field">image</div>
        <div className="field">{renderStatus(2)}</div>
        <div className="field">
          <EnabledButton enabled={false} type="button">
            Enable
          </EnabledButton>
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
                <ClickAwayListener
                  onClickAway={() => setActionsMenuOpen(false)}
                >
                  <ul>
                    <li>
                      <button>
                        <span className="icon">
                          <RiDeleteBinLine size={15} />
                        </span>
                        <p>Delete Coupon</p>
                      </button>
                    </li>
                  </ul>
                </ClickAwayListener>
              </CSSTransition>
            </ActionButtonContainer>
          </ButtonsContainer>
        </div>
      </Container>
      <CSSTransition
        in={submenuOpen}
        classNames="orders-filter"
        timeout={250}
        unmountOnExit
      >
        <SubCategoriesList />
      </CSSTransition>
    </>
  );
};

export default SubCategoryItem;
const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr 1fr 1fr;
  background-color: #fff;
  gap: 1rem;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      font-weight: ${(props) => props.theme.font.bold};
    }
  }
  .btns-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-toggler {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem;
    box-shadow: ${(props) => props.theme.shadow};
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;

const ButtonsContainer = styled.div`
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
const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .dot {
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
  }
  h6 {
    /* font-size: 0.8rem; */
    color: ${(props) => props.color};

    margin: 0 0.25rem;
  }
`;
const EnabledButton = styled.button<{ enabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  background-color: ${(props) =>
    props.enabled ? props.theme.dangerRed : props.theme.green};
  color: ${(props) => props.theme.btnText};
  border: ${(props) => props.theme.border};
  border-radius: 5px;
`;
