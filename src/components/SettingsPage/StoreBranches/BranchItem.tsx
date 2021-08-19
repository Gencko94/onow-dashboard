import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useHistory } from "react-router";
import { BRANCH } from "../../../interfaces/settings/branches/branches";
import Button from "../../reusable/Button";

import useConfirmationModal from "../../../hooks/useConfirmationModal";
import Flex from "../../StyledComponents/Flex";
import { useTranslation } from "react-i18next";
import Paragraph from "../../StyledComponents/Paragraph";
import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";
import IconButton from "../../reusable/IconButton";
import Spacer from "../../reusable/Spacer";

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

  const history = useHistory();
  const renderStatus = (status: boolean) => {
    switch (status) {
      case true:
        return (
          <Status color="green">
            <span className="dot" />
            <Spacer size={10} />
            <Paragraph fontSize="0.9rem" weight="semibold">
              Active
            </Paragraph>
          </Status>
        );
      case false:
        return (
          <Status color="#b72b2b">
            <span className="dot" />
            <Spacer size={10} />
            <Paragraph fontSize="0.9rem" weight="semibold">
              Disabled
            </Paragraph>
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
        <Flex items="center">
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
                    desc: "Are you sure you want to delete this branch ?",
                    title: "Delete Branch",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => handleDeleteBranch(branch.id),
                  });
                }}
              >
                Delete branch
              </MenuItem>
            </MenuPopover>
          </Menu>
          <Spacer size={10} />
          <Button
            size="sm"
            color="primary"
            withTransition
            onClick={() => {
              history.push(`/settings/branches/branch/${branch.id}`);
            }}
          >
            Edit
          </Button>
          <Spacer size={10} />
          <Button
            size="sm"
            color="blue"
            withTransition
            onClick={() => {
              history.push(`/settings/branches/branch/${branch.id}`);
            }}
          >
            Delivery locations
          </Button>
        </Flex>
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
    background-color: ${(props) => props.theme.subtleFloating};
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
