import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useHistory } from "react-router";
import { CUSTOMER } from "../../../../interfaces/customers/customers";
import Checkbox from "../../../reusable/Inputs/Checkbox";

import Button from "../../../reusable/Button";
import useConfirmationModal from "../../../../hooks/useConfirmationModal/useConfirmationModal";
import Flex from "../../../StyledComponents/Flex";
import IconButton from "../../../reusable/IconButton";
import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";
import Paragraph from "../../../StyledComponents/Paragraph";
import Spacer from "../../../reusable/Spacer";

interface IProps {
  customer: CUSTOMER;
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
  handleDeleteCustomer: (id: number) => void;
}

const CustomerItem = ({
  customer,
  handleDeleteCustomer,
  handleToggleRows,
  selectedRows,
}: IProps) => {
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const history = useHistory();
  return (
    <Container selected={selectedRows.includes(customer.id)}>
      <div className="field">
        <Checkbox
          checked={selectedRows.includes(customer.id)}
          onChange={(e) => {
            handleToggleRows(customer.id);
            e.stopPropagation();
          }}
        />
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {`${customer.first_name} ${customer.last_name}`}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {customer.phone}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          -
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          -
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          -
        </Paragraph>
      </div>
      <div className="field">
        <Flex>
          <Menu>
            <MenuButton>
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
                onSelect={() => {
                  setConfirmationModalStatus?.({
                    open: true,
                    desc: "Are you sure you want to delete this customer ?",
                    title: "Delete Customer",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => handleDeleteCustomer(customer.id),
                  });
                }}
              >
                Delete customer
              </MenuItem>
            </MenuPopover>
          </Menu>
          <Spacer size={10} />
          <Button
            size="sm"
            color="primary"
            withTransition
            onClick={() => {
              history.push(`/customers/${customer.id}`);
            }}
          >
            Edit
          </Button>
        </Flex>
      </div>
    </Container>
  );
};

export default CustomerItem;
const Container = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: repeat(1, minmax(35px, 50px)) repeat(
      6,
      minmax(100px, 1fr)
    );
  background-color: ${(props) =>
    props.selected ? props.theme.subtleFloating : ""};
  gap: 1rem;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.subtleFloating};
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    text-align: center;
  }
`;
