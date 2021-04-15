import styled from 'styled-components';
import ProductCategory from './ProductCategory';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';
import ProductInfoAndPricing from './ProductInfoAndPricing';

const GeneralProductInfo = () => {
  return (
    <Container>
      <ProductInfoAndPricing />
      <hr />
      <ProductCategory />

      <hr />
      <ProductImage />
      <hr />
      <ProductDescription />
    </Container>
  );
};

export default GeneralProductInfo;
const Container = styled.div`
  background-color: #fff;
  box-shadow: ${props => props.theme.shadow};
  padding: 0.5rem;
  border-radius: 5px;
  align-self: flex-start;
`;
