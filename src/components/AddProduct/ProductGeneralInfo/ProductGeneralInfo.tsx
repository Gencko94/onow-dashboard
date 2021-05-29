import styled from "styled-components";
import ProductCategories from "./ProductCategories";
import ProductDescription from "./ProductDescription";
import ProductImage from "./ProductImage";
import ProductNameAndDescription from "./ProductNameAndDescription";

const ProductGeneralInfo = () => {
  return (
    <Container>
      <ProductNameAndDescription />

      <ProductCategories />

      <ProductImage />
      <hr />
      <ProductDescription />
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
