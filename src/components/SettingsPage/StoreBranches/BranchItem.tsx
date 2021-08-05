import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RiDeleteBinLine } from "react-icons/ri";

import { useHistory } from "react-router";
import { BRANCH } from "../../../interfaces/settings/branches/branches";
import Button from "../../reusable/Button";
import Popover from "../../reusable/Popover";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { FlexWrapper } from "../../StyledComponents/Flex";
import { useTranslation } from "react-i18next";
import Paragraph from "../../StyledComponents/Paragraph";

interface IProps {
  branch: BRANCH;
  handleDeleteBranch: (id: number) => void;
}
const BranchItem = ({ handleDeleteBranch, branch }: IProps) => {
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const {
    i18n: { language },
  } = useTranslation();
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const history = useHistory();
  const renderStatus = (status: boolean) => {
    switch (status) {
      case true:
        return (
          <Status color="green">
            <span className="dot" />
            <h6>Active</h6>
          </Status>
        );
      case false:
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
    <Container>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {branch.id}
        </Paragraph>
      </div>
      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {branch.name[language]}
        </Paragraph>
      </div>

      <div className="field">
        <Paragraph fontSize="0.9rem" weight="semibold">
          {branch.contact_info.mobile}
        </Paragraph>
      </div>
      <div className="field">{renderStatus(branch.active)}</div>
      <div className="field">
        <Button
          bg="primary"
          padding="0.5rem"
          textSize="0.7rem"
          margin="0 0.5rem"
          withRipple
          withTransition
          onClick={() => {
            history.push(`/settings/branches/branch/${branch.id}`);
          }}
        >
          Edit
        </Button>
        <Button
          bg="blue"
          padding="0.5rem"
          textSize="0.7rem"
          margin="0 0.5rem"
          withRipple
          withTransition
          onClick={() => {
            history.push(`/settings/branches/branch/${branch.id}`);
          }}
        >
          Delivery locations
        </Button>
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
                padding="0.5rem"
                bg="transparent"
                textSize="0.8rem"
                Icon={RiDeleteBinLine}
                iconSize={15}
                onClick={(e) => {
                  setActionsMenuOpen(false);
                  e.stopPropagation();
                  setConfirmationModalStatus?.({
                    open: true,
                    desc: "Are you sure you want to delete this branch ?",
                    title: "Delete Branch",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => handleDeleteBranch(branch.id),
                  });
                }}
              >
                Delete branch
              </Button>
            </Popover>
          </CSSTransition>
        </ActionButtonContainer>
      </div>
    </Container>
  );
};

export default BranchItem;
const Container = styled.div`
  display: grid;

  grid-template-columns: minmax(70px, 100px) repeat(3, minmax(100px, 1fr)) minmax(
      210px,
      1.5fr
    );

  gap: 0;
  width: 100%;

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
    border-bottom: ${(props) => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
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
