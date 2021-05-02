import { lazy } from 'react';
import styled from 'styled-components';
import { PRODUCT_GRID_DESIGN } from '../../../../interfaces/website-layout/designs/product-grid-design';

const ProductGridTitle = lazy(() => import('./components/ProductGridTitle'));
interface IProps {
  data: PRODUCT_GRID_DESIGN;
}

const GridDemoReadOnly = ({ data }: IProps) => {
  return (
    <Container>
      <div className="title-wrapper">
        <h5 className="title">{data.title}</h5>
        {data.ctaOptions.enabled && (
          <Button
            bg={data.ctaOptions.styles.backgroundColor}
            textColor={data.ctaOptions.styles.textColor}
            className="btn"
          >
            {data.ctaOptions.text}
          </Button>
        )}
      </div>
      <div className="grid">
        <GridItem>
          <img src="/images/product.webp" alt="product" />
        </GridItem>
        <GridItem>
          <img src="/images/product.webp" alt="product" />
        </GridItem>
        <GridItem>
          <img src="/images/product.webp" alt="product" />
        </GridItem>
      </div>
    </Container>
  );
};

export default GridDemoReadOnly;
const Container = styled.div`
  padding: 1rem;
  h5.title {
  }
  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
`;
const GridItem = styled.div`
  /* border: ${props => props.theme.border}; */
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
`;
const Button = styled.button<{ bg: string; textColor: string }>`
  padding: 0.25rem 0.65rem;
  font-size: 0.9rem;

  background-color: ${props => props.bg};
  color: ${props => props.textColor};
  border-radius: 5px;
`;
