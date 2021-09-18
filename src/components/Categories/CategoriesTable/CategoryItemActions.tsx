import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useHistory } from "react-router";
import { useDeleteCategory } from "../../../hooks/data-hooks/categories/useDeleteCategory";
import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import Button from "../../reusable/Button";
import Spacer from "../../reusable/Spacer";
import Flex from "../../StyledComponents/Flex";

interface IProps {
  id: number;
}

const CategoryItemActions = ({ id }: IProps) => {
  const history = useHistory();

  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const { handleDeleteCategory } = useDeleteCategory();
  return (
    <Flex justify="center">
      <Menu>
        <MenuButton data-testid="menu-toggle">
          <BsThreeDotsVertical size={20} />
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
            data-testid="category-delete-button"
            onClick={() => {
              setConfirmationModalStatus?.({
                open: true,
                desc: "Are you sure you want to delete this Category ?",
                title: "Delete category",
                closeCb: handleCloseConfirmationModal!,
                successCb: () => handleDeleteCategory(id),
              });
            }}
            onSelect={() => {
              setConfirmationModalStatus?.({
                open: true,
                desc: "Are you sure you want to delete this Category ?",
                title: "Delete category",
                closeCb: handleCloseConfirmationModal!,
                successCb: () => handleDeleteCategory(id),
              });
            }}
          >
            Delete Category
          </MenuItem>
        </MenuPopover>
      </Menu>
      <Spacer size={10} />
      <Button
        data-testid="category-edit-button"
        color="primary"
        size="sm"
        withTransition
        onClick={() => {
          history.push(`/categories/${id}`);
        }}
      >
        Edit
      </Button>
    </Flex>
  );
};

export default CategoryItemActions;
