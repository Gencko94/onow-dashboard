import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";

import { BsThreeDotsVertical } from "react-icons/bs";

import { useHistory } from "react-router";

import styled from "styled-components";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import Button from "../reusable/Button";

import IconButton from "../reusable/IconButton";
import Spacer from "../reusable/Spacer";
import Flex from "../StyledComponents/Flex";

import Heading from "../StyledComponents/Heading";
import Paragraph from "../StyledComponents/Paragraph";

interface IProps {
  member: STAFF_MEMBER;
  handleDeleteStaffMember: (id: number) => void;
}

const StaffItem = ({ member, handleDeleteStaffMember }: IProps) => {
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();

  const history = useHistory();
  return (
    <Container>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {member.first_name} {member.last_name}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {member.phone}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {member.email}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {member.role}
        </Paragraph>
      </div>

      <div className="field">
        <Flex>
          <Menu>
            <MenuButton>
              <IconButton>
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
                    desc: "Are you sure you want to delete this Staff member ? He will no longer have access to this Dashboard",
                    title: "Delete Staff Member",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => handleDeleteStaffMember(member.id),
                  });
                }}
              >
                Delete staff
              </MenuItem>
            </MenuPopover>
          </Menu>
          <Spacer size={10} />
          <Button
            color="primary"
            size="sm"
            withTransition
            onClick={() => {
              history.push(`/settings/staff/${member.id}`);
            }}
          >
            Edit
          </Button>
        </Flex>
      </div>
    </Container>
  );
};

export default StaffItem;
const Container = styled.div(
  ({
    theme: { breakpoints, border, font, subtleFloating, subtleBackground },
  }) => `
    background-color:${subtleBackground};
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    border-bottom: ${border};
    &:hover {
      background-color: ${subtleFloating};
    }
    
    .field {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
      text-align: center;
    }
   
    `
);
