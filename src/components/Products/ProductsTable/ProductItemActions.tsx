import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useHistory } from "react-router";
import { useDeleteProduct } from "../../../hooks/data-hooks/products/useDeleteProduct";
import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import Button from "../../reusable/Button";

import Spacer from "../../reusable/Spacer";
import Flex from "../../StyledComponents/Flex";

interface IProps {
  id: number;
}

const ProductItemActions = ({ id }: IProps) => {
  const history = useHistory();

  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const { handleDeleteProduct } = useDeleteProduct();
  return (
    <Flex justify="center">
      <Menu>
        <MenuButton data-testid="menu-toggle">
          {/* <IconButton onClick={() => {}}> */}
          <BsThreeDotsVertical size={20} />
          {/* </IconButton> */}
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
            as="button"
            data-testid="product-delete-button"
            onClick={() => {
              setConfirmationModalStatus?.({
                open: true,
                desc: "Are you sure you want to delete this Product ?",
                title: "Delete Product",
                closeCb: handleCloseConfirmationModal!,
                successCb: () => handleDeleteProduct(id),
              });
            }}
            onSelect={() => {
              setConfirmationModalStatus?.({
                open: true,
                desc: "Are you sure you want to delete this Product ?",
                title: "Delete Product",
                closeCb: handleCloseConfirmationModal!,
                successCb: () => handleDeleteProduct(id),
              });
            }}
          >
            Delete Product
          </MenuItem>
        </MenuPopover>
      </Menu>
      <Spacer size={10} />
      <Button
        data-testid="product-edit-button"
        color="primary"
        size="sm"
        withTransition
        onClick={() => {
          history.push(`/products/${id}`);
        }}
      >
        Edit
      </Button>
    </Flex>
  );
};

export default ProductItemActions;
