import styled from 'styled-components';
import ProductDimentions from './ProductDimensions';

const ProductDetails = () => {
  return (
    <Container>
      <ProductDimentions />
    </Container>
  );
};

export default ProductDetails;
const Container = styled.div`
  background-color: #fff;
  box-shadow: ${props => props.theme.shadow};
  padding: 0.5rem;
  border-radius: 5px;
  align-self: flex-start;
`;
