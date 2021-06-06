import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import styled from "styled-components";

import ProductGeneralInfo from "../../components/AddProduct/ProductGeneralInfo/ProductGeneralInfo";
import ProductOrderingAndBranchAvailability from "../../components/AddProduct/ProductOrderingAndBranch/ProductOrderingAndBranchAvailability";
import ProductPromotions from "../../components/AddProduct/ProductPromotions/ProductPromotions";
import ProductTabs from "../../components/AddProduct/ProductTabs/ProductTabs";
import ProductPricingAndOptions from "../../components/AddProduct/ProductVariations/ProductPricingAndOptions";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { NEW_PRODUCT_FORM_PROPS } from "../../interfaces/products/create-new-product";

const CreateNewProduct = () => {
  const methods = useForm<NEW_PRODUCT_FORM_PROPS>({
    defaultValues: {
      max_qty_per_user: 5,
      category_id: [],
      branch_availability: {
        all: true,
        branches: [],
      },
      promotions: {
        values_skus: [],
      },
    },
  });
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0);
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
          {activeTab === 1 && <ProductPricingAndOptions />}
          {activeTab === 2 && <ProductOrderingAndBranchAvailability />}
          {activeTab === 3 && <ProductPromotions />}
        </Wrapper>
      </FormProvider>
    </form>
  );
};

export default CreateNewProduct;

const Wrapper = styled.div`
  box-shadow: 0px 4px 7px 2px rgb(213, 213, 213);
  border-radius: 0 6px 6px 6px;
  padding: 1rem;
  background-color: #fff;
`;
