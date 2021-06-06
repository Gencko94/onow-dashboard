import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { RiDeleteBinLine } from "react-icons/ri";

import { useHistory } from "react-router";
import { PRODUCT } from "../../../interfaces/products/products";
import { useTranslation } from "react-i18next";
import { FiCopy } from "react-icons/fi";
import Checkbox from "../../reusable/Inputs/Checkbox";

interface IProps {
  product: PRODUCT;
}

const ProductItem = ({ product }: IProps) => {
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const history = useHistory();
  const {
    i18n: { language },
  } = useTranslation();
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
    <Container onClick={() => history.push(`/product/1`)}>
      <div className="field">
        <Checkbox
          checked={true}
          onChange={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
      <div className="field">
        <img
          className="img"
          src={product.images.find((i) => i.is_default === true)?.url}
          alt={product.name[language]}
        />
      </div>
      <div className="field">
        <h6>{product.name[language]}</h6>
      </div>
      <div className="field">
        <h6>6</h6>
      </div>
      <div className="field">
        <h6>Men</h6>
      </div>
      {/* <div className="field">
        <EnabledButton enabled={false} type="button">
          Enable
        </EnabledButton>
      </div> */}
      <div className="field">{renderStatus(2)}</div>
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
                      <p>Delete Product</p>
                    </button>
                  </li>
                  <li>
                    <button>
                      <span className="icon">
                        <FiCopy size={15} />
                      </span>
                      <p>Copy Product</p>
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

export default ProductItem;
const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr 1fr 1fr;
  background-color: #fff;
  gap: 1rem;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
  }
  .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: ${(props) => props.theme.border};
  }
  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      font-weight: ${(props) => props.theme.font.bold};
    }
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
    p {
      margin: 0 0.5rem;
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.25rem;
      transition: color 75ms ease;
    }
    &:hover {
      .icon {
        color: ${(props) => props.theme.mainColor};
      }
      background-color: ${(props) => props.theme.highlightColor};
    }
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