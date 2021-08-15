import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import CreateProductGeneralInfo from "../../components/AddProduct/CreateProductGeneralInfo/CreateProductGeneralInfo";
import CreateProductImage from "../../components/AddProduct/CreateProductGeneralInfo/CreateProductImage";
import CreateProductOrderingAndBranchAvailability from "../../components/AddProduct/CreateProductOrderingAndBranch/CreateProductOrderingAndBranchAvailability";
import CreateProductTabs from "../../components/AddProduct/CreateProductTabs/CreateProductTabs";
import CreateProductPricingAndOptions from "../../components/AddProduct/ProductVariations/CreateProductPricingAndOptions";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import Heading from "../../components/StyledComponents/Heading";
import useToast from "../../hooks/useToast";
import extractError from "../../utils/extractError";
import { createProduct } from "../../utils/queries";
import { up } from "../../utils/themes";

type ContextProps = {
  activeTab: 0 | 1 | 2 | 3;
  setActiveTab: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
  updateData: (data: any) => void;
  formValues: any;
};

export const NewProductContext = createContext<Partial<ContextProps>>({});

const CreateNewProduct = () => {
  const { setToastStatus, handleCloseToast } = useToast();
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0);
  const {
    mutateAsync: createProductMutation,
    isLoading,
    reset,
  } = useMutation(createProduct);
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    allow_attachments: false,
    allow_side_notes: true,
    price_by_options: false,
    branch_availability: {
      all: true,
      branches: [] as number[],
    },
    thumbnail: undefined,
    options: [],
    images: [],
    max_qty_per_user: "0",
    active: 1,
    quantity: "unlimited",
  });

  const updateData = (data: any) => {
    console.log(formValues, "old");
    setFormValues((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const submitForm = async (data: any) => {
    console.log(data);

    try {
      const regex = /^0+(?!$)/;
      await createProductMutation({
        active: data.active,
        quantity:
          data.quantity === "unlimited"
            ? null
            : data.quantity.replace(regex, ""),
        allow_attachments: data.allow_attachments,
        allow_side_notes: data.allow_side_notes,
        branch_availability: data.branch_availability,
        product_category_id: data.category_id,
        description: data.description,
        images: data.images,
        max_qty_per_user: data.max_qty_per_user,
        name: data.name,
        thumbnail: data.thumbnail!,
        options: data.options,
        prep_time: parseInt(data.prep_time),
        price: data.price ?? null,
        price_by_options: data.price_by_options,
        sku: data.sku,
        slug: data.slug,
      } as any);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Created Successfully",
        type: "success",
      });
      history.push("/products");
    } catch (error) {
      console.log(error);
      const { responseError } = extractError(error);
      if (responseError) {
        console.log(responseError);
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  return (
    <NewProductContext.Provider
      value={{ activeTab, setActiveTab, updateData, formValues }}
    >
      <Heading tag="h5" type="large-title">
        Create New Product
      </Heading>
      <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "المنتجات", en: "Products" },
            target: "/products",
          },
          {
            name: { ar: "إضافة منتج جديد", en: "Create New Product" },
            target: "",
          },
        ]}
      />

      <CreateProductTabs />

      <Wrapper>
        {activeTab === 0 && <CreateProductGeneralInfo />}
        {activeTab === 1 && <CreateProductImage />}
        {activeTab === 2 && <CreateProductPricingAndOptions />}
        {activeTab === 3 && (
          <CreateProductOrderingAndBranchAvailability
            formLoading={isLoading}
            submitForm={submitForm}
          />
        )}
      </Wrapper>
    </NewProductContext.Provider>
  );
};

export default CreateNewProduct;

const Wrapper = styled.div(
  ({ theme: { breakpoints, shadow } }) => `

  // box-shadow: ${shadow};
  // border-radius: 0 6px 6px 6px;
  // padding: 0.5rem;
  // background-color: #fff;
  ${up(breakpoints.md)}{
    
    // padding: 1rem;
  }
  `
);
