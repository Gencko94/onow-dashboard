import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { MINI_CATEGORY } from "../../../interfaces/categories/categories";
import { PRODUCT } from "../../../interfaces/products/products";

import SaveButton from "../../reusable/SaveButton";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Hr from "../../StyledComponents/Hr";
import ProductCategories from "./ProductCategories";

import ProductImage from "./ProductImage";
import ProductNameAndDescription from "./ProductNameAndDescription";

interface IProps {
  data: PRODUCT;
}
export interface FORM_PROPS {
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  slug: string;
  category: MINI_CATEGORY[];
}
const ProductGeneralInformation = ({ data }: IProps) => {
  const methods = useForm<FORM_PROPS>({
    defaultValues: {
      name: data.name,
      description: data.description,
      slug: data.slug,

      category: data.category,
    },
  });
  console.log(methods.watch().category);
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
      <Grid cols="1fr 1fr" gap="1rem">
        <FormProvider {...methods}>
          <ProductNameAndDescription />

          <ProductCategories />
        </FormProvider>
      </Grid>

      <Hr />
      <ProductImage data={data} />
    </Container>
  );
};

export default ProductGeneralInformation;
const Container = styled.div`
  /* background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  padding: 0.75rem;
  border-radius: 5px;
  align-self: flex-start; */
`;
