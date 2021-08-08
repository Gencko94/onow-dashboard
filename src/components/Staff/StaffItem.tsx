import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import { up } from "../../utils/themes";
import Button from "../reusable/Button";
import Popover from "../reusable/Popover";
import Heading from "../StyledComponents/Heading";

interface IProps {
  member: STAFF_MEMBER;
  handleDeleteStaffMember: (id: number) => void;
}

const StaffItem = ({ member, handleDeleteStaffMember }: IProps) => {
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/settings/staff/${member.id}`)}>
      {/* <div className="field">
          <CheckboxContainer>
            <BsCheck size={15} />
          </CheckboxContainer>
        </div> */}
      <div className="field">
        <Heading tag="h6">
          {member.first_name} {member.last_name}
        </Heading>
      </div>
      <div className="field">
        <Heading tag="h6">{member.phone}</Heading>
      </div>
      <div className="field">
        <Heading tag="h6">{member.email}</Heading>
      </div>
      <div className="field">
        <Heading tag="h6">{member.role}</Heading>
      </div>

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
                  hoverBg="#b72b2b"
                  onClick={(e) => {
                    e.stopPropagation();

                    setActionsMenuOpen(false);
                    setConfirmationModalStatus?.({
                      open: true,
                      desc: "Are you sure you want to delete this Staff member ? He will no longer have access to this Dashboard",
                      title: "Delete Staff Member",
                      closeCb: handleCloseConfirmationModal!,
                      successCb: () => handleDeleteStaffMember(member.id),
                    });
                  }}
                >
                  Delete Member
                </Button>
              </Popover>
            </CSSTransition>
          </ActionButtonContainer>
        </ButtonsContainer>
      </div>
    </Container>
  );
};

export default StaffItem;
const Container = styled.div(
  ({ theme: { breakpoints, border, font, highlightColor } }) => `
    background-color:#fff;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    border-bottom: ${border};
    &:hover {
      background-color: ${highlightColor};
    }
    
    .field {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
      text-align: center;
    }
    h6 {
      font-size: 0.8rem;
      font-weight: ${font.semibold};
    }
    
  
    }
    `
);
const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  button.icon {
    z-index: 1;
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
