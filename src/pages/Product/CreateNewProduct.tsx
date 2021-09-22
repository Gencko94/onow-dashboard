import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import CreateProductGeneralInfo from "../../components/AddProduct/CreateProductGeneralInfo/CreateProductGeneralInfo";
import CreateProductImage from "../../components/AddProduct/CreateProductGeneralInfo/CreateProductImage";
import CreateProductOrderingAndBranchAvailability from "../../components/AddProduct/CreateProductOrderingAndBranch/CreateProductOrderingAndBranchAvailability";
import CreateProductTabs from "../../components/AddProduct/CreateProductTabs/CreateProductTabs";
import CreateProductPricingAndOptions from "../../components/AddProduct/ProductVariations/CreateProductPricingAndOptions";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";

import Heading from "../../components/StyledComponents/Heading";
import NewProductProvider, {
  NewProductContext,
} from "../../contexts/Product/NewProductContext";
import useToast from "../../hooks/useToast";
import extractError from "../../utils/extractError";
import { createProduct } from "../../utils/queries/productQueries";

const CreateNewProduct = () => {
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    mutateAsync: createProductMutation,
    isLoading,
    reset,
  } = useMutation(createProduct);
  const history = useHistory();

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
        product_category_id: data.category_id[0],
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
    <NewProductProvider>
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
      <NewProductContext.Consumer>
        {({ activeTab }) => (
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
        )}
      </NewProductContext.Consumer>
    </NewProductProvider>
  );
};

export default CreateNewProduct;

const Wrapper = styled.div`
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
  }
`;
