import styled from "styled-components";

import AddCategoryModalBody from "../../Modal/AddCategoryModalBody";

import { useFormContext } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { firstTabInfo } from "./CreateProductGeneralInfo";
import Heading from "../../StyledComponents/Heading";
import Box from "../../reusable/Box/Box";

const CreateProductCategories = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<firstTabInfo>();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Box type="titled" boxTitle="Product Category">
      <CategoriesList error={Boolean(errors?.category_id)}>
        <AddCategoryModalBody
          control={control}
          errors={Boolean(errors?.category_id)}
        />
      </CategoriesList>
    </Box>
  );
};

export default CreateProductCategories;

const CategoriesList = styled.div<{ error: boolean }>`
  overflow-y: auto;
  position: relative;
  background-color: #fff;
  box-shadow: ${(props) => props.error && props.theme.errorShadow};
  border: ${(props) => props.theme.border};
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
