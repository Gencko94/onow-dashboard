import { createContext, Dispatch, SetStateAction, useState } from "react";

import styled from "styled-components";

import CreateProductGeneralInfo from "../../components/AddProduct/CreateProductGeneralInfo/CreateProductGeneralInfo";
import CreateProductOrderingAndBranchAvailability from "../../components/AddProduct/CreateProductOrderingAndBranch/CreateProductOrderingAndBranchAvailability";
import CreateProductTabs from "../../components/AddProduct/CreateProductTabs/CreateProductTabs";
import CreateProductPricingAndOptions from "../../components/AddProduct/ProductVariations/CreateProductPricingAndOptions";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { NEW_PRODUCT } from "../../interfaces/products/create-new-product";

type ContextProps = {
  activeTab: 0 | 1 | 2;
  setActiveTab: Dispatch<SetStateAction<0 | 1 | 2>>;
  updateData: (data: any) => void;
  formValues: Partial<NEW_PRODUCT>;
};

export const NewProductContext = createContext<Partial<ContextProps>>({});

const CreateNewProduct = () => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [formValues, setFormValues] = useState<Partial<NEW_PRODUCT>>({
    category_id: [],
    allow_attachments: false,
    allow_side_notes: true,
    branch_availability: {
      all: true,
      branches: [],
    },
    options: [],
    images: [],
    max_qty_per_user: 0,
  });

  const updateData = (data: any) => {
    setFormValues({
      ...formValues,
      ...data,
    });
  };

  return (
    <NewProductContext.Provider
      value={{ activeTab, setActiveTab, updateData, formValues }}
    >
      <Breadcrumbs
        childLabel="Create New Product"
        parentLabel="Products"
        parentTarget="/products"
      />
      <CreateProductTabs />

      <Wrapper>
        {activeTab === 0 && <CreateProductGeneralInfo />}
        {activeTab === 1 && <CreateProductPricingAndOptions />}
        {activeTab === 2 && <CreateProductOrderingAndBranchAvailability />}
      </Wrapper>
    </NewProductContext.Provider>
  );
};

export default CreateNewProduct;

const Wrapper = styled.div`
  box-shadow: 0px 4px 7px 2px rgb(213, 213, 213);
  border-radius: 0 6px 6px 6px;
  padding: 1rem;
  background-color: #fff;
`;
