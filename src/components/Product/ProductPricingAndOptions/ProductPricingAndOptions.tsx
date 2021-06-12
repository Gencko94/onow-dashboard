import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { PRODUCT_OPTION } from "../../../interfaces/products/create-new-product";
import { PRODUCT } from "../../../interfaces/products/products";
import SaveButton from "../../reusable/SaveButton";
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
      options: data.options,
      price_by_options: data.price_by_options,
      price: data.price,
      options_enabled: data.options.length > 0 ? true : false,
    },
  });
  const onSubmit: SubmitHandler<FORM_PROPS> = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Flex justify="flex-end">
        <SaveButton
          title="Save Changes"
          onClick={methods.handleSubmit(onSubmit)}
        />
      </Flex>
      <FormProvider {...methods}>
        <ProductPricing />
        <Hr />
        <ProductOptions />
      </FormProvider>
    </Container>
  );
};

export default ProductPricingAndOptions;

const Container = styled.div`
  background-color: #fff;
`;
