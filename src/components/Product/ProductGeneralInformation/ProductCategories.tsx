import styled from "styled-components";

import { useFormContext } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { EDIT_PRODUCT_GENERAL_INFO } from "../../../interfaces/products/update-product";
import ProductCategoryList from "./ProductCategoryList";
import { FORM_PROPS } from "./ProductGeneralInformation";
import Heading from "../../StyledComponents/Heading";

const ProductCategories = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext<FORM_PROPS>();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Container>
      <Heading color="primary" tag="h5" weight="semibold" mb="1rem ">
        Product Category
      </Heading>

      <CategoriesList error={Boolean(errors?.category)}>
        <ProductCategoryList control={control} errors={errors.category} />
      </CategoriesList>
    </Container>
  );
};

export default ProductCategories;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  display:flex;
  flex-direction:column;
 
  @media ${breakpoints.md} {
    
  }
  `
);
const CategoriesList = styled.div<{ error: boolean }>`
  overflow-y: auto;
  position: relative;
  background-color: #fff;
  border: ${(props) =>
    props.error ? `1px solid ${props.theme.dangerRed}` : props.theme.border};
  /* box-shadow: ${(props) =>
    props.error ? props.theme.errorShadow : props.theme.shadow}; */
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
