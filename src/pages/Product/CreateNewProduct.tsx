import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";

import styled from "styled-components";

import CreateProductGeneralInfo from "../../components/AddProduct/CreateProductGeneralInfo/CreateProductGeneralInfo";
import CreateProductOrderingAndBranchAvailability from "../../components/AddProduct/CreateProductOrderingAndBranch/CreateProductOrderingAndBranchAvailability";
import CreateProductTabs from "../../components/AddProduct/CreateProductTabs/CreateProductTabs";
import CreateProductPricingAndOptions from "../../components/AddProduct/ProductVariations/CreateProductPricingAndOptions";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { NEW_PRODUCT } from "../../interfaces/products/create-new-product";
import { createProduct } from "../../utils/queries";

type ContextProps = {
  activeTab: 0 | 1 | 2;
  setActiveTab: Dispatch<SetStateAction<0 | 1 | 2>>;
  updateData: (data: any) => void;
  formValues: Partial<NEW_PRODUCT>;
};

export const NewProductContext = createContext<Partial<ContextProps>>({});

const CreateNewProduct = () => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const { mutateAsync: createProductMutation } = useMutation(createProduct);
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
    prep_time: {
      time: 0,
      unit: "minutes",
    },
  });

  const updateData = (data: any) => {
    setFormValues({
      ...formValues,
      ...data,
    });
  };
  const submitForm = async (data: any) => {
    console.log(data);
    try {
      await createProductMutation({
        active: 1,
        quantity: 1,
        allow_attachments: data.allow_attachments,
        allow_side_notes: data.allow_side_notes,
        branch_availability: data.branch_availability,
        product_category_id: data.category_id[0].id,
        description_ar: data.description.ar,
        description_en: data.description.en,
        images: data.images,
        max_qty_per_user: data.max_qty_per_user,
        name_en: data.name.en,
        name_ar: data.name.ar,
        options: data.options,
        prep_time: data.prep_time,
        price: data.price,
        price_by_options: data.price_by_options,
        sku: data.sku,
        slug: data.slug,
      } as any);
    } catch (error) {
      console.log(error);
    }
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
        {activeTab === 2 && (
          <CreateProductOrderingAndBranchAvailability submitForm={submitForm} />
        )}
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
