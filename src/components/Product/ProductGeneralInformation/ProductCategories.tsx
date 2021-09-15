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
    <Container error={Boolean(errors?.category)}>
      <div className="head">
        <Heading type="section-title" tag="h5">
          Product Category
        </Heading>
      </div>

      <CategoriesList>
        <ProductCategoryList control={control} errors={errors.category} />
      </CategoriesList>
    </Container>
  );
};

export default ProductCategories;
const Container = styled.div<{ error: boolean }>`
  display: flex;
  flex-direction: column;
  border: ${(props) =>
    props.error ? `1px solid ${props.theme.dangerRed}` : props.theme.border};
  border-radius: 6px;
  background-color: ${(props) => props.theme.subtleFloating};
  .head {
    border-bottom: ${(props) => props.theme.border};
    padding: 0.5rem;
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    .head {
      padding: 1rem;
    }
  }
`;

const CategoriesList = styled.div`
  overflow-y: auto;
  position: relative;

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
