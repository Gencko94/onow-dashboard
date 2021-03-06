import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useMutation } from "react-query";
import styled from "styled-components";
import useToast from "../../../hooks/useToast";
import { PRODUCT, PRODUCT_OPTION } from "../../../interfaces/products/products";
import extractError from "../../../utils/extractError";
import { editProductPriceAndOptions } from "../../../utils/queries/productQueries";
import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";

import Hr from "../../StyledComponents/Hr";
import ProductOptions from "./ProductOptions";
import ProductPricing from "./ProductPricing";

interface IProps {
  data: PRODUCT;
}
export interface FORM_PROPS {
  price: number;
  price_by_options: boolean;
  options: PRODUCT_OPTION[];
  options_enabled: boolean;
}
const ProductPricingAndOptions = ({ data }: IProps) => {
  const methods = useForm<FORM_PROPS>({
    defaultValues: {
      // options: data.options,
      price_by_options: data.price_by_options,
      price: data.price,
      options_enabled: data.options.length > 0 ? true : false,
    },
  });
  const { setToastStatus, handleCloseToast } = useToast();
  // Edit Mutation
  const { mutateAsync, reset, isLoading } = useMutation(
    editProductPriceAndOptions
  );
  const onSubmit: SubmitHandler<FORM_PROPS> = async (formData: FORM_PROPS) => {
    try {
      await mutateAsync({
        price: formData.price,
        price_by_options: formData.price_by_options,
        options: formData.options_enabled ? formData.options : [],
        id: data.id,
      });
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Saved Successfully",
        type: "success",
      });
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
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
    <Container>
      <Flex margin="1rem 0" justify="flex-end" items="center">
        <Button
          color="green"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={methods.handleSubmit(onSubmit)}
        >
          Save Changes
        </Button>
      </Flex>
      <FormProvider {...methods}>
        <ProductPricing />
        <Hr />
        <ProductOptions productId={data!.id} options={data.options} />
      </FormProvider>
    </Container>
  );
};

export default ProductPricingAndOptions;

const Container = styled.div`
  /* background-color: #fff; */
`;
