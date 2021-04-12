import styled from 'styled-components';

const ProductCardDetails = () => {
  return (
    <Container>
      <ProductName>Product Name</ProductName>
    </Container>
  );
};

export default ProductCardDetails;
const Container = styled.div`
  /* height: 200px; */
  padding: 0.5rem;
  background-color: #fff;
`;
const ProductName = styled.h6`
  text-align: center;
`;
