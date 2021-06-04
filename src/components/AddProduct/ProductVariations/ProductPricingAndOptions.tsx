import styled from "styled-components";
import ProductPricing from "./ProductPricing";
import Hr from "../../StyledComponents/Hr";
import ProductOptions from "./ProductOptions";
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
