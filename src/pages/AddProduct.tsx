import { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import AddProductPanel from '../components/AddProduct/AddProductPanel/AddProductPanel';
import AddProductTabs from '../components/AddProduct/AddProductTabs/AddProductTabs';
import { PRODUCT_TYPE } from '../interfaces/products/products';
import Loading from '../utils/Loading';
const GeneralProductInfo = lazy(
  () => import('../components/AddProduct/GeneralProductInfo/GeneralProductInfo')
);
const ProductDetails = lazy(
  () => import('../components/AddProduct/ProductDetails/ProductDetails')
);
const ProductVariations = lazy(
  () => import('../components/AddProduct/ProductVariations/ProductVariations')
);

const AddProduct = () => {
  const [productType, setProductType] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Container>
      {/* <AddProductPanel /> */}
      <Grid>
        <Suspense fallback={<Loading />}>
          {activeTab === 0 && <GeneralProductInfo />}
          {activeTab === 1 && <ProductDetails />}
          {activeTab === 2 && <ProductVariations />}
        </Suspense>
        <AddProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Grid>
    </Container>
  );
};

export default AddProduct;
const Container = styled.div`
  padding: 0.75rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 0.75rem;
`;
