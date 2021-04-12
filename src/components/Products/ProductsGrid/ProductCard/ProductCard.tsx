import styled from 'styled-components';
import ProductCardDetails from './ProductCardDetails';
import ProductCardImage from './ProductCardImage';
import ProductCardOptions from './ProductCardOptions';

const ProductCard = () => {
  return (
    <Container>
      <ProductCardImage src="/images/user.jpg" />
      <ProductCardDetails />
      <ProductCardOptions />
    </Container>
  );
};

export default ProductCard;
const Container = styled.div`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 8px;
`;
