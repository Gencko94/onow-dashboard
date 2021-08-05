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
import CheckToggle from "../../reusable/CheckToggle";
import Heading from "../../StyledComponents/Heading";
import Paragraph from "../../StyledComponents/Paragraph";

interface IProps {
  product: PRODUCT;
  handleDeleteProduct: (id: number) => void;
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
  handleActivateProduct: (id: number, active: number) => Promise<void>;
}

const ProductItem = ({
  product,
  handleDeleteProduct,
  handleToggleRows,
  selectedRows,
  handleActivateProduct,
}: IProps) => {
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const history = useHistory();
  const {
    i18n: { language },
  } = useTranslation();

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
        <Paragraph fontSize="0.9rem" weight="semibold">
          {product.name[language]}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {product.quantity === "unlimited" ? "-" : product.quantity}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {product.price}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {product.category ? product.category?.name[language] : "-"}
        </Paragraph>
      </div>

      <div className="field">
        <CheckToggle
          checked={product.active}
          onChange={() => {
            if (product.active) {
              handleActivateProduct(product.id, 0);
            } else {
              handleActivateProduct(product.id, 1);
            }
          }}
        />
      </div>
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
                // text="Delete Product"
                padding="0.5rem"
                bg="transparent"
                textSize="0.8rem"
                hoverBg="#B72b2b"
                Icon={RiDeleteBinLine}
                iconSize={15}
                onClick={(e) => {
                  setActionsMenuOpen(false);
                  e.stopPropagation();
                  setConfirmationModalStatus?.({
                    open: true,
                    desc: "Are you sure you want to delete this Product ?",
                    title: "Delete Product",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => handleDeleteProduct(product.id),
                  });
                }}
              >
                Delete Product
              </Button>
            </Popover>
          </CSSTransition>

          <Button
            bg="primary"
            padding="0.5rem"
            textSize="0.7rem"
            margin="0 0.5rem"
            withRipple
            withTransition
            onClick={() => {
              history.push(`/products/${product.id}`);
            }}
          >
            Edit
          </Button>
        </ActionButtonContainer>
      </div>
    </Container>
  );
};

export default ProductItem;
const Container = styled.div<{ selected: boolean }>`
  display: grid;

  grid-template-columns: repeat(2, minmax(35px, 50px)) repeat(
      7,
      minmax(140px, 1fr)
    );
  background-color: ${(props) =>
    props.selected ? props.theme.accent2 : props.theme.accent1};

  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.accent2};
  }
  .img {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    font-size: 0.6rem;
    object-fit: cover;
  }
  .field {
    border-bottom: ${(props) => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    text-align: center;
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
