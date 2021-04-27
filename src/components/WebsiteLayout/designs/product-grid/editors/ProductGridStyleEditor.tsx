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
<<<<<<< HEAD
const smallOptions = [{ num: '1' }, { num: 2 }, { num: '3' }];
const mediumOptions = [{ num: '3' }, { num: '4' }, { num: '5' }];
const largeOptions = [{ num: '5' }, { num: '6' }, { num: '7' }, { num: '8' }];
=======
import TypeSelector from '../../shared/TypeSelector';
import CategorySelector from '../../shared/CategorySelector';
import ProductSelector from '../../shared/ProductSelector';
import ProductGridItemsPerRowEditor from './ProductGridItemsPerRowEditor';
>>>>>>> tester

const ProductGridStyleEditor = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
<<<<<<< HEAD
  } = useFormContext<PRODUCT_GRID_DESIGN>();
  return (
    <Container>
      {/* <Grid cols={2} gap="1rem"></Grid> */}
=======
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
>>>>>>> tester
      <Heading tag="h5" mb={1}>
        Appearance
      </Heading>
      <div className="wrapper">
<<<<<<< HEAD
        <Grid cols={4} gap="0.5rem" items="center">
          <Paragraph size={0.9}>Number of Items per Row</Paragraph>

          <Flex items="center">
            <Paragraph size={0.9}>Small Screens</Paragraph>
            <div className="select-container">
              <Controller
                name="gridOptions.itemsPerRow.small"
                control={control}
                render={({ field: { ref, onChange } }) => (
                  <Select
                    ref={ref}
                    options={smallOptions}
                    onChange={val => onChange(val!.num)}
                    getOptionLabel={option => option.num.toString()}
                    getOptionValue={option => option.num.toString()}
                  />
                )}
              />
            </div>
          </Flex>
          <Flex items="center">
            <Paragraph size={0.9}>Medium Screens</Paragraph>
            <div className="select-container">
              <Controller
                name="gridOptions.itemsPerRow.medium"
                control={control}
                render={({ field: { ref, onChange } }) => (
                  <Select
                    ref={ref}
                    options={mediumOptions}
                    onChange={val => onChange(val!.num)}
                    getOptionLabel={option => option.num.toString()}
                    getOptionValue={option => option.num.toString()}
                  />
                )}
              />
            </div>
          </Flex>
          <Flex items="center">
            <Paragraph size={0.9}>Large Screens</Paragraph>
            <div className="select-container">
              {/* <Controller
                name="gridOptions.itemsPerRow.large"
                control={control}
                render={({ field: { ref, onChange } }) => (
                  <Select
                    ref={ref}
                    options={largeOptions}
                    onChange={val => onChange(val!.num)}
                    getOptionLabel={option => option.num.toString()}
                    getOptionValue={option => option.num.toString()}
                  />
                )}
              /> */}
            </div>
          </Flex>
        </Grid>
=======
        <ProductGridItemsPerRowEditor />
>>>>>>> tester
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
