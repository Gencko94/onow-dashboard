import { Controller, useFormContext, useWatch } from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';
import { PRODUCT_GRID_DESIGN } from '../../../../../interfaces/website-layout/designs/product-grid-design';
import Grid from '../../../../StyledComponents/Grid';
import Flex, {
  Wrapper as FlexWrapper,
} from '../../../../StyledComponents/Flex';
import Heading from '../../../../StyledComponents/Heading';
import Paragraph from '../../../../StyledComponents/Paragraph';
import Label from '../../../../StyledComponents/Label';
import TypeSelector from '../../shared/TypeSelector';
import CategorySelector from '../../shared/CategorySelector';
import ProductSelector from '../../shared/ProductSelector';
import ProductGridItemsPerRowEditor from './ProductGridItemsPerRowEditor';

const ProductGridStyleEditor = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const type = useWatch({
    control,
    name: 'type',
  });
  // console.log(type);
  return (
    <Container>
      <Grid cols="1fr 1fr" gap="1rem">
        <TypeSelector control={control} />
        {type === 'category' && (
          <CategorySelector control={control} watch={watch} />
        )}
        {type === 'products' && (
          <ProductSelector control={control} watch={watch} />
        )}
      </Grid>
      <Heading tag="h5" mb={1}>
        Appearance
      </Heading>
      <div className="wrapper">
        <ProductGridItemsPerRowEditor />
      </div>
    </Container>
  );
};

export default ProductGridStyleEditor;
const Container = styled.div`
  padding: 0.5rem;

  .wrapper {
    display: flex;
    border-radius: 8px;
    background-color: ${props => props.theme.overlayColor};
    border: ${props => props.theme.border};
  }

  .select-container {
    margin: 0 0.25rem;
  }
`;
