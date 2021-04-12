import { createContext, useState } from 'react';
import styled from 'styled-components';
import ProductsGrid from '../components/Products/ProductsGrid/ProductsGrid';
import ProductsPanel from '../components/Products/ProductsPanel/ProductsPanel';
import { PRODUCTS_VIEW } from '../interfaces/products/products';
type PRODUCTS_CONTEXT_PROPS = {
  view: PRODUCTS_VIEW;
  handleViewChange: (view: PRODUCTS_VIEW) => void;
};
export const ProductsProvider = createContext<Partial<PRODUCTS_CONTEXT_PROPS>>({
  view: 'list',
});
const Products = () => {
  const [view, setView] = useState<PRODUCTS_VIEW>('list');
  const handleViewChange = (view: PRODUCTS_VIEW) => {
    setView(view);
  };
  return (
    <ProductsProvider.Provider value={{ view, handleViewChange }}>
      <Container>
        <ProductsPanel />
        <ProductsGrid />
      </Container>
    </ProductsProvider.Provider>
  );
};

export default Products;
const Container = styled.div`
  padding: 0.75rem;
`;
