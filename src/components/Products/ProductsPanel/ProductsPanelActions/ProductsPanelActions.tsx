import styled from 'styled-components';
import { VscFilter } from 'react-icons/vsc';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsGrid } from 'react-icons/bs';
import { useContext } from 'react';
import { ProductsProvider } from '../../../../pages/Products';
const ProductsPanelActions = () => {
  const { view, handleViewChange } = useContext(ProductsProvider);
  return (
    <Container>
      <Button>
        <Icon>
          <VscFilter size={20} />
        </Icon>
        <ButtonText>Filter</ButtonText>
      </Button>
      <Hr />
      <ViewOptionsContainer>
        <ViewButton
          onClick={() => handleViewChange?.('grid')}
          isActive={view === 'grid'}
        >
          <BsGrid size={20} />
        </ViewButton>
        <ViewButton
          onClick={() => handleViewChange?.('list')}
          isActive={view === 'list'}
        >
          <AiOutlineUnorderedList size={20} />
        </ViewButton>
      </ViewOptionsContainer>
    </Container>
  );
};

export default ProductsPanelActions;
const Container = styled.div`
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  border-radius: 7px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.p`
  font-size: 0.8rem;
  font-weight: ${props => props.theme.font.semibold};
  margin: 0 0.5rem;
`;
const ViewOptionsContainer = styled.div`
  display: flex;
`;
const ViewButton = styled.button<{ isActive: boolean }>`
  border-radius: 7px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props =>
    props.isActive && 'linear-gradient(90deg, #fe0488, #f78f21)'};
  color: ${props => props.isActive && '#fff'};
`;
const Hr = styled.hr`
  margin: 1rem 0;
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.5),
    transparent
  );
  transform: rotate(90deg);
  background-color: transparent;
  border: none;
  height: 0.7px;
  width: 40px;
  opacity: 0.5;
`;
