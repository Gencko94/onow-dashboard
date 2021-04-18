import styled from 'styled-components';
import ProductCategory from './ProductCategory';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const GeneralProductInfo = () => {
  return (
    <Container>
      <ProductInfo />
      {/* <hr /> */}
      <ProductCategory />

      {/* <hr /> */}
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
  padding: 0.75rem;
  border-radius: 5px;
  align-self: flex-start;
`;
