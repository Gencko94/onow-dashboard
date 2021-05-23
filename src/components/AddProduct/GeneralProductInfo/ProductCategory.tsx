import styled from "styled-components";
import Select from "react-select";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import AddCategoryModalBody from "../../Modal/AddCategoryModalBody";
import { CSSTransition } from "react-transition-group";

import { NEW_PRODUCT } from "../../../interfaces/products/products";
import { Controller, useFormContext } from "react-hook-form";
const options = [
  { id: 1, name: "Clothing" },
  { id: 2, name: "Food" },
  { id: 3, name: "Foodd" },
  { id: 4, name: "Foode2" },
  { id: 5, name: "Food3" },
  { id: 6, name: "Food33" },
  { id: 7, name: "Food43" },
];
const ProductCategory = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext<NEW_PRODUCT>();
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <h5 className="title">Product Category</h5>
      <Controller
        name="productCategories"
        control={control}
        rules={{ required: "Required" }}
        render={({ field: { ref, onChange } }) => (
          <>
            <Select
              isMulti
              ref={ref}
              options={options}
              onChange={(val) => onChange(val.map((i) => i.id))}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id.toString()}
            />
            <ErrorMessage>
              {errors?.productCategories! && "Required Field"}
            </ErrorMessage>
          </>
        )}
      />

      <ButtonsContainer>
        <AddButton type="button" onClick={() => setOpen(true)}>
          <Icon>
            <BiPlus size={30} />
          </Icon>
          <BtnText>Quick Add New Category</BtnText>
        </AddButton>
      </ButtonsContainer>
      <CSSTransition in={open} timeout={100} classNames="modal" unmountOnExit>
        <Modal title="Add Category" closeFunction={() => setOpen(false)}>
          <AddCategoryModalBody />
        </Modal>
      </CSSTransition>
    </Container>
  );
};

export default ProductCategory;
const Container = styled.div`
  margin-bottom: 2rem;
  .title {
    margin-bottom: 1rem;
    font-weight: ${(props) => props.theme.font.bold};
    border-bottom: ${(props) => props.theme.border};
    padding-bottom: 0.5rem;
  }
`;

const ButtonsContainer = styled.div`
  padding: 0.5rem 0;
`;
const AddButton = styled.button`
  background-color: ${(props) => props.theme.green};
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 7px;
  position: relative;
  padding: 0.25rem 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
`;
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
