import styled from "styled-components";
import Hr from "../../StyledComponents/Hr";
import ProductOptions from "./ProductOptions";
import ProductPricing from "./ProductPricing";
const ProductPricingAndOptions = () => {
  return (
    <Container>
      <ProductPricing />
      <Hr />
      <ProductOptions />
    </Container>
  );
};

export default ProductPricingAndOptions;

const Container = styled.div`
  background-color: #fff;
`;
