import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useHistory } from "react-router";
import { PRODUCT } from "../../../interfaces/products/products";
import { useTranslation } from "react-i18next";
import Checkbox from "../../reusable/Inputs/Checkbox";

import Button from "../../reusable/Button";

import Flex from "../../StyledComponents/Flex";

import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import DefaultImage from "../../reusable/DefaultImage";
import CheckToggle from "../../reusable/CheckToggle";

import Paragraph from "../../StyledComponents/Paragraph";
import IconButton from "../../reusable/IconButton";

import Spacer from "../../reusable/Spacer";
import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";

import { useActivateProduct } from "../../../hooks/data-hooks/products/useActivateProduct";
import { useDeleteProduct } from "../../../hooks/data-hooks/products/useDeleteProduct";
interface IProps {
  product: PRODUCT;
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
}

const ProductItem = ({
  product,

  handleToggleRows,
  selectedRows,
}: IProps) => {
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();

  const history = useHistory();
  const {
    i18n: { language },
  } = useTranslation();
  const { handleActivateProduct } = useActivateProduct();
  const { handleDeleteProduct } = useDeleteProduct();
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
        <Paragraph data-testid="product-id" fontSize="0.9rem" weight="semibold">
          {product.id}
        </Paragraph>
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
        <Paragraph
          data-testid="product-name"
          fontSize="0.9rem"
          weight="semibold"
        >
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
        <Flex>
          <Menu>
            <MenuButton>
              <IconButton data-testid="menu-toggle" onClick={() => {}}>
                <BsThreeDotsVertical size={20} />
              </IconButton>
            </MenuButton>
            <MenuPopover
              className="slide-down"
              position={(button, popover) => {
                return {
                  top: button!.bottom,
                  left: button!.left - button!.width,
                };
              }}
            >
              <MenuItem
                onSelect={() => {
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
              </MenuItem>
            </MenuPopover>
          </Menu>
          <Spacer size={10} />
          <Button
            color="primary"
            size="sm"
            withTransition
            onClick={() => {
              history.push(`/products/${product.id}`);
            }}
          >
            Edit
          </Button>
        </Flex>
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
    props.selected ? props.theme.subtleFloating : props.theme.subtleBackground};

  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.subtleFloating};
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
