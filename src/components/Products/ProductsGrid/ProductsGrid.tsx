import styled from 'styled-components';
import ProductCard from './ProductCard/ProductCard';

const ProductsGrid = () => {
  return (
    <Container>
      {[0, 1, 2, 3, 4, 5].map(product => {
        return <ProductCard />;
      })}
    </Container>
  );
};

export default ProductsGrid;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;
`;
