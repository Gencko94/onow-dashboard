import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RiDeleteBinLine } from "react-icons/ri";

import { useHistory } from "react-router";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import SubCategoriesList from "./SubCategoriesList";
import Checkbox from "../../reusable/Inputs/Checkbox";
import { CATEGORY } from "../../../interfaces/categories/categories";
import { useTranslation } from "react-i18next";
import Button from "../../reusable/Button";
import Popover from "../../reusable/Popover";
import { FlexWrapper } from "../../StyledComponents/Flex";
import DefaultImage from "../../reusable/DefaultImage";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import CheckToggle from "../../reusable/CheckToggle";
import Heading from "../../StyledComponents/Heading";
import IconButton from "../../reusable/IconButton";
interface IProps {
  category: CATEGORY;
  handleDeleteCategory: (id: number) => void;
  selectedRows: number[];
  handleToggleRows: (rowId: number) => void;
  handleActivateCategory: (id: number, status: number) => void;
}
const CategoryItem = ({
  handleToggleRows,
  category,
  selectedRows,
  handleDeleteCategory,
  handleActivateCategory,
}: IProps) => {
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const {
    i18n: { language },
  } = useTranslation();
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const history = useHistory();

  return (
    <>
      <Container selected={selectedRows.includes(category.id)}>
        <div className="btns-container field">
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
          <Heading tag="h6">{category.id}</Heading>
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
        <div className="field">
          <h6>{category.name[language]}</h6>
        </div>
        <div className="field">
          <CheckToggle
            checked={category.active}
            onChange={() => {
              if (category.active) {
                handleActivateCategory(category.id, 0);
              } else {
                handleActivateCategory(category.id, 1);
              }
            }}
          />
        </div>

        <div className="field">
          <ButtonsContainer>
            <ActionButtonContainer
              onClick={(e) => {
                e.stopPropagation();
                setActionsMenuOpen(true);
              }}
            >
              <IconButton>
                <BsThreeDotsVertical size={20} />
              </IconButton>
              <CSSTransition
                in={actionsMenuOpen}
                classNames="menu"
                unmountOnExit
                timeout={100}
              >
                <Popover closeFunction={() => setActionsMenuOpen(false)}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionsMenuOpen(false);
                      setConfirmationModalStatus?.({
                        open: true,
                        desc: "Are you sure you want to delete this Category ?",
                        title: "Delete Category",
                        successCb: () => handleDeleteCategory(category.id),
                        closeCb: handleCloseConfirmationModal!,
                      });
                    }}
                  >
                    Delete Category
                  </Button>
                </Popover>
              </CSSTransition>
              <Button
                color="primary"
                withTransition
                size="sm"
                margin="0 0.25rem"
                onClick={() => {
                  history.push(`/categories/${category.id}`);
                }}
              >
                Edit
              </Button>
            </ActionButtonContainer>
          </ButtonsContainer>
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

export default CategoryItem;
const Container = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 85px) repeat(4, minmax(100px, 1fr));
  background-color: ${(props) =>
    props.selected ? props.theme.subtleFloating : props.theme.subtleBackground};

  &:hover {
    background-color: ${(props) => props.theme.subtleFloating};
  }

  .field {
    /* border-bottom: ${(props) => props.theme.border}; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      font-weight: ${(props) => props.theme.font.semibold};
    }
    .img {
      height: 50px;
      width: 50px;
      border-radius: 50px;
      object-fit: cover;
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

const ButtonsContainer = styled.div``;
const ActionButtonContainer = styled(FlexWrapper)`
  position: relative;
  align-items: center;
`;
