import styled from 'styled-components';
import { BiPlus } from 'react-icons/bi';
import ProductsPanelActions from './ProductsPanelActions/ProductPanelActions';
const ProductsPanel = () => {
  return (
    <Container>
      <AddProductButton>
        <Icon>
          <BiPlus size={30} />
        </Icon>
        <AddText>Add New Product</AddText>
      </AddProductButton>
      <ProductsPanelActions />
    </Container>
  );
};

export default ProductsPanel;
const Container = styled.div`
  /* box-shadow: ${props => props.theme.shadow}; */
  border-radius: 8px;
  /* background-color: ${props => props.theme.boxColor}; */
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AddProductButton = styled.button`
  background: linear-gradient(90deg, #fe0488, #f78f21);
  border-radius: 7px;
  padding: 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
`;
const AddText = styled.p`
  font-size: 0.8rem;
  font-weight: ${props => props.theme.font.semibold};
  margin: 0 0.5rem;
`;
