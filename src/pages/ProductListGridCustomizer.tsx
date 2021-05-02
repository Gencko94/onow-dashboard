import { lazy } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ProductGridEditor from '../components/WebsiteLayout/designs/product-grid/editors/ProductGridEditor';
import ProductGridDemo from '../components/WebsiteLayout/designs/product-grid/GridDemo';
import { PRODUCT_GRID_DESIGN } from '../interfaces/website-layout/designs/product-grid-design';
import { getProductGridDesign } from '../utils/test-queries';
// const ProductGridStyleEditor = lazy(
//   () =>
//     import(
//       '../components/WebsiteLayout/designs/product-grid/editors/ProductGridStyleEditor'
//     )
// );

const ProductListGridCustomizer = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<PRODUCT_GRID_DESIGN>(
    `header-design-${id}`,
    () => getProductGridDesign(id),
    { suspense: true }
  );
  const methods = useForm<PRODUCT_GRID_DESIGN>({
    defaultValues: data,
    shouldUnregister: false,
  });
  const onSubmit: SubmitHandler<PRODUCT_GRID_DESIGN> = data => {
    // Submit Style Changes to server
  };
  console.log('hi');
  return (
    <FormProvider {...methods}>
      <Container>
        <div className="title-container">
          <h4>Product Grid Customizer</h4>
          <button onClick={methods.handleSubmit(onSubmit)}>Save Changes</button>
        </div>
        <div className="demo-wrapper">
          <ProductGridDemo data={data!} />
        </div>
        <ProductGridEditor />
      </Container>
    </FormProvider>
  );
};

export default ProductListGridCustomizer;
const Container = styled.div`
  padding: 0.75rem;
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-bottom: ${props => props.theme.border}; */
    padding: 0.5rem 0;
    button {
      border-radius: 6px;
      color: ${props => props.theme.btnText};
      background-color: ${props => props.theme.green};
      padding: 0.5rem;
    }
  }
  .demo-wrapper {
    /* padding: 1rem; */
    border: ${props => props.theme.border};
    margin: 1rem 0;
    /* height: 135px; */
  }
`;
