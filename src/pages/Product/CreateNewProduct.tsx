import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import styled from "styled-components";

import ProductGeneralInfo from "../../components/AddProduct/ProductGeneralInfo/ProductGeneralInfo";
import ProductTabs from "../../components/AddProduct/ProductTabs/ProductTabs";
import ProductVariationsAndPricing from "../../components/AddProduct/ProductVariations/ProductVariationsAndPricing";
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
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  return (
    <form>
      <Breadcrumbs
        childLabel="Create New Product"
        parentLabel="Products"
        parentTarget="/products"
      />
      <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <FormProvider {...methods}>
        <Wrapper>
          {activeTab === 0 && <ProductGeneralInfo />}
          {activeTab === 1 && <ProductVariationsAndPricing />}
        </Wrapper>
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
const Wrapper = styled.div`
  /* box-shadow: ${(props) => props.theme.shadow}; */
  box-shadow: 0px 4px 7px 2px rgb(213, 213, 213);
  border-radius: 0 6px 6px 6px;
  padding: 1rem;
  background-color: #fff;
`;
