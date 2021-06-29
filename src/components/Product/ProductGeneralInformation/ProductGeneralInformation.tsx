import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdSave } from "react-icons/md";
import styled from "styled-components";
import { PRODUCT } from "../../../interfaces/products/products";
import Button from "../../reusable/Button";

import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import ProductCategories from "./ProductCategories";

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
  category: { id: number; name: { [key: string]: string } };
  sku: string;
  quantity: number | "unlimited";
  image: string | File;
}
const ProductGeneralInformation = ({ data }: IProps) => {
  const methods = useForm<FORM_PROPS>({
    defaultValues: {
      name: data.name,
      description: data.description,
      slug: data.slug,
      quantity: data.quantity,
      category: data.category,
      sku: data.sku,
      image: data.image,
    },
  });
  const onSubmit: SubmitHandler<FORM_PROPS> = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Flex justify="flex-end">
        <Button
          text="Save Changes"
          textSize="0.9rem"
          iconSize={25}
          Icon={MdSave}
          bg="green"
          padding="0.5rem"
          onClick={methods.handleSubmit(onSubmit)}
        />
      </Flex>
      <Grid cols="repeat(auto-fit,minmax(350px,1fr))" gap="1rem">
        <FormProvider {...methods}>
          <ProductNameAndDescription />

          <ProductCategories />
        </FormProvider>
      </Grid>
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
