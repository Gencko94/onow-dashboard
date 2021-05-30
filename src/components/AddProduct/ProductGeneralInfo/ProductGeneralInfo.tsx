import styled from "styled-components";
import Grid from "../../StyledComponents/Grid";
import Hr from "../../StyledComponents/Hr";
import ProductCategories from "./ProductCategories";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";
import ProductNameAndDescription from "./ProductNameAndDescription";

const ProductGeneralInfo = () => {
  return (
    <Container>
      <Grid cols="1fr 1fr" gap="1rem" rows="350px">
        <ProductNameAndDescription />

        <ProductCategories />
      </Grid>

      <Hr />
      <ProductImage />
      {/* <ProductDescription /> */}
    </Container>
  );
};

export default ProductGeneralInfo;
const Container = styled.div`
  /* background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  padding: 0.75rem;
  border-radius: 5px;
  align-self: flex-start; */
`;
