import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ClickAwayListener from "react-click-away-listener";
import { RiDeleteBinLine } from "react-icons/ri";

import { useHistory } from "react-router";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import SubCategoriesList from "./SubCategoriesList";
import Checkbox from "../../reusable/Inputs/Checkbox";
import { CATEGORY } from "../../../interfaces/categories/categories";
import Button from "../../reusable/Button";

import useConfirmationModal from "../../../hooks/useConfirmationModal";
import DefaultImage from "../../reusable/DefaultImage";
import { useTranslation } from "react-i18next";
import Flex from "../../StyledComponents/Flex";
import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";
import IconButton from "../../reusable/IconButton";
interface IProps {
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
  category: CATEGORY;
  handleDeleteCategory: (id: number) => void;
}
const SubCategoryItem = ({
  handleToggleRows,
  selectedRows,
  category,
  handleDeleteCategory,
}: IProps) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const history = useHistory();
  const {
    i18n: { language },
  } = useTranslation();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const renderStatus = (active: boolean) => {
    switch (active) {
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
    <>
      <Container>
        <div className="btns-container">
          {category.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSubmenuOpen(!submenuOpen);
              }}
              className="menu-toggler"
            >
              {submenuOpen ? (
                <BiChevronUp size={25} />
              ) : (
                <BiChevronDown size={25} />
              )}
            </button>
          )}
          <Checkbox
            checked={selectedRows.includes(category.id)}
            onChange={(e) => {
              handleToggleRows(category.id);
              e.stopPropagation();
            }}
          />
        </div>
        <div className="field">
          <h6>{category.id}</h6>
        </div>
        <div className="field">
          <h6>{category.name[language]}</h6>
        </div>
        <div className="field">
          {category.image ? (
            <img
              className="img"
              src={category.image}
              alt={category.name[language]}
            />
          ) : (
            <DefaultImage circular border height="50px" width="50px" />
          )}
        </div>
        <div className="field">{renderStatus(category.active)}</div>
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
                      desc: "Are you sure you want to delete this Category ?",
                      title: "Delete Category",
                      successCb: () => handleDeleteCategory(category.id),
                      closeCb: handleCloseConfirmationModal!,
                    });
                  }}
                >
                  Delete category
                </MenuItem>
              </MenuPopover>
            </Menu>

            <Button
              color="primary"
              withTransition
              margin="0 0.25rem"
              onClick={() => {
                history.push(`/categories/${category.id}`);
              }}
            >
              Edit
            </Button>
          </Flex>
        </div>
      </Container>
      {category.children.length > 0 && (
        <CSSTransition
          in={submenuOpen}
          classNames="sub-categories"
          timeout={250}
          unmountOnExit
        >
          <SubCategoriesList
            handleToggleRows={handleToggleRows}
            selectedRows={selectedRows}
            categories={category.children}
            handleDeleteCategory={handleDeleteCategory}
          />
        </CSSTransition>
      )}
    </>
  );
};

export default SubCategoryItem;
const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr 1fr 1fr;
  background-color: #fff;
  gap: 1rem;
  cursor: pointer;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.accent1};
  }
  .img {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    object-fit: cover;
  }
  .field {
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
  .btns-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-toggler {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem;
    box-shadow: ${(props) => props.theme.shadow};
    width: 25px;
    height: 25px;
    border-radius: 50%;
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
