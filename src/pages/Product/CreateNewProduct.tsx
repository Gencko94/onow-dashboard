import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import styled from "styled-components";

import ProductGeneralInfo from "../../components/AddProduct/ProductGeneralInfo/ProductGeneralInfo";
import ProductOrdering from "../../components/AddProduct/ProductOrderingAndBranch/ProductOrdering";
import ProductOrderingAndBranchAvailability from "../../components/AddProduct/ProductOrderingAndBranch/ProductOrderingAndBranchAvailability";
import ProductTabs from "../../components/AddProduct/ProductTabs/ProductTabs";
import ProductOptions from "../../components/AddProduct/ProductVariations/ProductOptions";
import ProductPricingAndOptions from "../../components/AddProduct/ProductVariations/ProductPricingAndOptions";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { MINI_CATEGORY } from "../../interfaces/categories/categories";

export interface NEW_PRODUCT_FORM_PROPS {
  category_id: MINI_CATEGORY[];
  name: {
    ar: string;
    en: string;
  };

  images: File[];
  description: {
    ar: string;
    en: string;
  };
  slug: string;
  max_qty_per_user: number;
  prep_time: {
    time: number;
    unit: string;
  };
  maxQtyPerUser: number;
  price: number;
  price_by_variations: boolean;
  variations_enabled: boolean;
  availability: {
    all: boolean;
    branches: number[];
  };
}

const CreateNewProduct = () => {
  const methods = useForm<NEW_PRODUCT_FORM_PROPS>({
    defaultValues: {
      maxQtyPerUser: 5,
      category_id: [],
      availability: {
        all: true,
        branches: [],
      },
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
          {activeTab === 1 && <ProductPricingAndOptions />}
          {activeTab === 2 && <ProductOrderingAndBranchAvailability />}
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
