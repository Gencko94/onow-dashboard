import styled from "styled-components";

import AddCategoryModalBody from "../../Modal/AddCategoryModalBody";

import { Control, DeepMap, FieldError, useFormContext } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { firstTabInfo } from "./CreateProductGeneralInfo";
interface IProps {
  control: Control<firstTabInfo>;
  errors: DeepMap<firstTabInfo, FieldError>;
}
const CreateProductCategories = ({ control, errors }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Container>
      <div className="title-container">
        <h5>Product Categories</h5>
      </div>

      <CategoriesList error={Boolean(errors?.category_id)}>
        <AddCategoryModalBody
          control={control}
          errors={Boolean(errors?.category_id)}
        />
      </CategoriesList>
    </Container>
  );
};

export default CreateProductCategories;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
 
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
const CategoriesList = styled.div<{ error: boolean }>`
  overflow-y: auto;
  position: relative;
  background-color: #fff;
  box-shadow: ${(props) =>
    props.error ? props.theme.errorShadow : props.theme.shadow};
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