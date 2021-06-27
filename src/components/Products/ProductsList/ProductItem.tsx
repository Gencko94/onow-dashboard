import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RiDeleteBinLine } from "react-icons/ri";

import { useHistory } from "react-router";
import { PRODUCT } from "../../../interfaces/products/products";
import { useTranslation } from "react-i18next";
import Checkbox from "../../reusable/Inputs/Checkbox";
import Popover from "../../reusable/Popover";
import Button from "../../reusable/Button";

import { FlexWrapper } from "../../StyledComponents/Flex";

import useConfirmationModal from "../../../hooks/useConfirmationModal";
import DefaultImage from "../../reusable/DefaultImage";

interface IProps {
  product: PRODUCT;
  handleDeleteProduct: (id: number) => void;
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
}

const ProductItem = ({
  product,
  handleDeleteProduct,
  handleToggleRows,
  selectedRows,
}: IProps) => {
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
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
    <Container selected={selectedRows.includes(product.id)}>
      <div className="field">
        <Checkbox
          checked={selectedRows.includes(product.id)}
          onChange={(e) => {
            handleToggleRows(product.id);
            e.stopPropagation();
          }}
        />
      </div>
      <div className="field">
        <h6>{product.id}</h6>
      </div>
      <div className="field">
        {product.image ? (
          <img
            className="img"
            src={product.image}
            alt={product.name[language]}
          />
        ) : (
          <DefaultImage circular border height="50px" width="50px" />
        )}
      </div>
      <div className="field">
        <h6>{product.name[language]}</h6>
      </div>
      <div className="field">
        <h6>{product.quantity === "unlimited" ? "-" : product.quantity}</h6>
      </div>
      <div className="field">
        <h6>{product.price}</h6>
      </div>
      <div className="field">
        <h6>{product.category?.name[language]}</h6>
      </div>

      <div className="field">{renderStatus(2)}</div>
      <div className="field">
        <ActionButtonContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            onClick={() => {
              setActionsMenuOpen(!actionsMenuOpen);
            }}
            className="icon"
          >
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
                text="Delete Product"
                padding="0.5rem"
                bg="white"
                color="#444"
                hoverColor="#b72b2b"
                textSize="0.8rem"
                Icon={RiDeleteBinLine}
                iconSize={15}
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmationModalStatus?.({
                    open: true,
                    desc: "Are you sure you want to delete this Product ?",
                    title: "Delete Product",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => handleDeleteProduct(product.id),
                  });
                }}
              />
            </Popover>
          </CSSTransition>

          <Button
            bg="primary"
            padding="0.5rem"
            text="Edit"
            textSize="0.7rem"
            margin="0 0.5rem"
            withRipple
            withTransition
            onClick={() => {
              history.push(`/products/${product.id}`);
            }}
          />
        </ActionButtonContainer>
      </div>
    </Container>
  );
};

export default ProductItem;
const Container = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: 50px 50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  background-color: ${(props) =>
    props.selected ? props.theme.accentColor : "#fff"};
  gap: 1rem;

  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
  .img {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    object-fit: cover;
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

const ActionButtonContainer = styled(FlexWrapper)`
  position: relative;
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
