import { SubmitHandler, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { PRODUCT } from "../../../interfaces/products/products";
import SaveButton from "../../reusable/SaveButton";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Hr from "../../StyledComponents/Hr";
import ProductCategories from "./ProductCategories";

import ProductImage from "./ProductImage";
import ProductNameAndDescription from "./ProductNameAndDescription";

const ProductGeneralInformation = () => {
  const { handleSubmit } = useFormContext<PRODUCT>();
  const onSubmit: SubmitHandler<PRODUCT> = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Flex justify="flex-end">
        <SaveButton title="Save Changes" onClick={handleSubmit(onSubmit)} />
      </Flex>
      <Grid cols="1fr 1fr" gap="1rem">
        <ProductNameAndDescription />

        <ProductCategories />
      </Grid>

      <Hr />
      <ProductImage />
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
