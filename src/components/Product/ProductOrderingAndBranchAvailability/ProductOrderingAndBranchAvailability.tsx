import styled from "styled-components";
import Hr from "../../StyledComponents/Hr";
import ProductBranches from "./ProductBranches";
import ProductOrdering from "./ProductOrdering";

const ProductOrderingAndBranchAvailability = () => {
  return (
    <Container>
      <ProductOrdering />
      <Hr />
      <ProductBranches />
    </Container>
  );
};

export default ProductOrderingAndBranchAvailability;
const Container = styled.div`
  background-color: #fff;
`;
