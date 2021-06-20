import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SetStateAction, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RiDeleteBinLine } from "react-icons/ri";

import { useHistory } from "react-router";
import { PRODUCT } from "../../../interfaces/products/products";
import { useTranslation } from "react-i18next";
import Checkbox from "../../reusable/Inputs/Checkbox";
import Popover from "../../reusable/Popover";
import Button from "../../reusable/Button";
import { Dispatch } from "react";

interface IProps {
  product: PRODUCT;
  handleDeleteCoupon: (id: number) => Promise<void>;
  setModalStatus: Dispatch<
    SetStateAction<{ id: number | null; open: boolean }>
  >;
}

const ProductItem = ({
  product,
  handleDeleteCoupon,
  setModalStatus,
}: IProps) => {
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
    <>
      <Container onClick={() => history.push(`/product/${product.id}`)}>
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
            src={product.images?.[0].url}
            alt={product.name[language]}
          />
        </div>
        <div className="field">
          <h6>{product.name[language]}</h6>
        </div>
        <div className="field">
          <h6>{product.quantity}</h6>
        </div>
        <div className="field">
          <h6>{product.category.name}</h6>
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
                <Popover closeFunction={() => setActionsMenuOpen(false)}>
                  <Button
                    text="Delete Coupon"
                    padding="0.5rem"
                    bg="white"
                    color="#444"
                    hoverColor="#b72b2b"
                    textSize="0.8rem"
                    Icon={RiDeleteBinLine}
                    iconSize={15}
                    onClick={(e) => {
                      e.stopPropagation();

                      setActionsMenuOpen(false);
                      setModalStatus({ open: true, id: product.id });
                    }}
                  />
                </Popover>
              </CSSTransition>
            </ActionButtonContainer>
          </ButtonsContainer>
        </div>
      </Container>
    </>
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
