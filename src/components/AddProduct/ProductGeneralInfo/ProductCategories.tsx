import styled from "styled-components";
import Select from "react-select";

import { useState } from "react";
import Modal from "../../Modal/Modal";
import AddCategoryModalBody from "../../Modal/AddCategoryModalBody";

import { NEW_PRODUCT } from "../../../interfaces/products/products";
import { Controller, useFormContext } from "react-hook-form";
import AddButton from "../../reusable/AddButton";
const modalStyles = {
  content: {
    inset: "209px",
    border: "none",
    boxShadow: "0px 4px 7px 2px rgb(213,213,213)",
  },
};
const options = [
  { id: 1, name: "Clothing" },
  { id: 2, name: "Food" },
  { id: 3, name: "Foodd" },
  { id: 4, name: "Foode2" },
  { id: 5, name: "Food3" },
  { id: 6, name: "Food33" },
  { id: 7, name: "Food43" },
];
const ProductCategories = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext<NEW_PRODUCT>();
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <div className="title-container">
        <h5>Product Categories</h5>
      </div>
      <div className="box">
        <Controller
          name="productCategories"
          control={control}
          rules={{ required: "Required" }}
          render={({ field: { ref, onChange } }) => (
            <CategoriesList>
              <div className="empty">
                <p className="text">No Categories added</p>
                <AddButton
                  title="Add Categories"
                  cb={() => {
                    setOpen(true);
                  }}
                />
              </div>
            </CategoriesList>
            // <>
            //   <Select
            //     isMulti
            //     ref={ref}
            //     options={options}
            //     onChange={(val) => onChange(val.map((i) => i.id))}
            //     getOptionLabel={(option) => option.name}
            //     getOptionValue={(option) => option.id.toString()}
            //   />
            //   <ErrorMessage>
            //     {errors?.productCategories! && "Required Field"}
            //   </ErrorMessage>
            // </>
          )}
        />
      </div>

      {/* <ButtonsContainer>
        <AddButton type="button" onClick={() => setOpen(true)}>
          <Icon>
            <BiPlus size={30} />
          </Icon>
          <BtnText>Quick Add New Category</BtnText>
        </AddButton>
      </ButtonsContainer> */}

      <Modal
        isOpen={open}
        title="Add Category"
        closeFunction={() => setOpen(false)}
        styles={modalStyles}
      >
        <AddCategoryModalBody />
      </Modal>
    </Container>
  );
};

export default ProductCategories;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
  .box {
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
    padding: 1rem;
    // display: grid;
    // grid-template-columns: 1fr;
    // gap: 1rem;
  }
  @media ${breakpoints.md} {
    .box {
      // grid-template-columns: 1fr 1fr 1fr;

    }
  }
  `
);
const CategoriesList = styled.div`
  height: 250px;
  overflow-y: auto;
  position: relative;

  .empty {
    background-color: ${(props) => props.theme.accentColor};
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
const ButtonsContainer = styled.div`
  padding: 0.5rem 0;
`;
// const AddButton = styled.button`
//   background-color: ${(props) => props.theme.green};
//   box-shadow: ${(props) => props.theme.shadow};
//   border-radius: 7px;
//   position: relative;
//   padding: 0.25rem 0.5rem;
//   color: #fff;
//   display: flex;
//   align-items: center;
// `;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;

const BtnText = styled.p`
  font-size: 0.9rem;
  font-weight: ${(props) => props.theme.font.regular};
  margin: 0 0.5rem;
`;
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${(props) => props.theme.dangerRed};
`;
