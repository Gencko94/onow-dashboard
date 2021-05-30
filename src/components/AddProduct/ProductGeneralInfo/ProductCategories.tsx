import styled from "styled-components";

import { useState } from "react";
import Modal from "../../Modal/Modal";
import AddCategoryModalBody from "../../Modal/AddCategoryModalBody";

import { useFormContext, useWatch } from "react-hook-form";
import AddButton from "../../reusable/AddButton";
import { useTranslation } from "react-i18next";
import { RiDeleteBinLine } from "react-icons/ri";
const modalStyles = {
  content: {
    inset: "178px",
    border: "none",
    boxShadow: "0px 4px 7px 2px rgb(213,213,213)",
  },
};

const ProductCategories = () => {
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext<any>();
  const {
    i18n: { language },
  } = useTranslation();
  const [open, setOpen] = useState(false);
  const categories = useWatch({
    control,
    name: "category_id",
  });
  const handleRemoveCategory = (id: number) => {
    const newCategories = categories.filter((i: any) => i.id !== id);
    setValue("category_id", newCategories);
  };
  return (
    <Container>
      <div className="title-container">
        <h5>Product Categories</h5>
        {categories.length > 0 && (
          <AddButton
            title="Add Categories"
            cb={() => {
              setOpen(true);
            }}
          />
        )}
      </div>

      <CategoriesList>
        {categories.length === 0 && (
          <div className="empty">
            <p className="text">No Categories added</p>
            <AddButton
              title="Add Categories"
              cb={() => {
                setOpen(true);
              }}
            />
          </div>
        )}
        {categories.length > 0 && (
          <CategoriesTable>
            {categories.map((category: any) => {
              return (
                <div className="item">
                  <div className="title">
                    <img src={category.image} alt={category.name[language]} />
                    <p>{category.name[language]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category.id)}
                    className="icon"
                  >
                    <RiDeleteBinLine size={22} />
                  </button>
                </div>
              );
            })}
          </CategoriesTable>
        )}
      </CategoriesList>

      <Modal
        isOpen={open}
        title="Add Categories to the product"
        closeFunction={() => setOpen(false)}
        styles={modalStyles}
      >
        <AddCategoryModalBody
          setValue={setValue}
          control={control}
          closeFunction={() => setOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default ProductCategories;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  display:flex;
  flex-direction:column;
  
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
 
  @media ${breakpoints.md} {
    
  }
  `
);
const CategoriesList = styled.div`
  overflow-y: auto;
  position: relative;
  background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  flex: 1;

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .text {
      margin-bottom: 0.5rem;
    }
  }
`;
const CategoriesTable = styled.div`
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  .item {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: ${(props) => props.theme.border};
    .title {
      display: flex;
      align-items: center;
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border: ${(props) => props.theme.border};
      }
      p {
        font-size: 0.9rem;
        margin: 0 0.5rem;
      }
    }
    .icon {
      transition: transform 75ms ease;
      color: ${(props) => props.theme.dangerRed};
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
`;
