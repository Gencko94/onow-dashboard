import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import ProductGeneralInfo from "../../components/AddProduct/ProductGeneralInfo/ProductGeneralInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { MINI_CATEGORY } from "../../interfaces/categories/categories";
import { NEW_PRODUCT } from "../../interfaces/products/products";

interface NEW_PRODUCT_FORM_PROPS {
  category_id: MINI_CATEGORY[];
  name: {
    ar: string;
    en: string;
  };

  images: File[];
  short_description: {
    ar: string;
    en: string;
  };
  long_description: {
    ar: string;
    en: string;
  };
  maxQtyPerUser: number;
  price: number;
  price_by_variations: boolean;
  variations_enabled: boolean;
}

const CreateNewProduct = () => {
  const methods = useForm<NEW_PRODUCT_FORM_PROPS>({
    defaultValues: {
      maxQtyPerUser: 5,
      category_id: [],
    },
  });
  return (
    <form>
      <FormProvider {...methods}>
        <Breadcrumbs
          childLabel="Create New Product"
          parentLabel="Products"
          parentTarget="/products"
        />
        <ProductGeneralInfo />
      </FormProvider>
      <div>d</div>
    </form>
  );
};

export default CreateNewProduct;
const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 0.75rem;
`;
