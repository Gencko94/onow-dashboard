import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { RiDeleteBinLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { CUSTOMER } from "../../../../interfaces/customers/customers";
import Checkbox from "../../../reusable/Inputs/Checkbox";
import Popover from "../../../reusable/Popover";
import Button from "../../../reusable/Button";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import { FlexWrapper } from "../../../StyledComponents/Flex";

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
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
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
        <h6>{`${customer.first_name} ${customer.last_name}`}</h6>
      </div>
      <div className="field">
        <h6>{customer.phone}</h6>
      </div>
      <div className="field">
        <h6>{customer.email} </h6>
      </div>
      <div className="field">
        <ActionButtonContainer onClick={() => setActionsMenuOpen(true)}>
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
            <ClickAwayListener onClickAway={() => setActionsMenuOpen(false)}>
              <Popover closeFunction={() => setActionsMenuOpen(false)}>
                <Button
                  text="Delete Customer"
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
                      desc: "Are you sure you want to delete this customer ?",
                      title: "Delete Customer",
                      closeCb: handleCloseConfirmationModal!,
                      successCb: () => handleDeleteCustomer(customer.id),
                    });
                  }}
                />
              </Popover>
            </ClickAwayListener>
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
              history.push(`/customers/${customer.id}`);
            }}
          />
        </ActionButtonContainer>
      </div>
    </Container>
  );
};

export default CustomerItem;
const Container = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: repeat(1, minmax(35px, 50px)) repeat(
      4,
      minmax(100px, 1fr)
    );
  background-color: ${(props) =>
    props.selected ? props.theme.accentColor : "#fff"};
  gap: 1rem;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    text-align: center;
    h6 {
      font-size: 0.9rem;
      font-weight: ${(props) => props.theme.font.regular};
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
