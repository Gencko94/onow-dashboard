import { Controller, useFormContext } from 'react-hook-form';
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
const smallOptions = [{ num: '1' }, { num: 2 }, { num: '3' }];
const mediumOptions = [{ num: '3' }, { num: '4' }, { num: '5' }];
const largeOptions = [{ num: '5' }, { num: '6' }, { num: '7' }, { num: '8' }];

const ProductGridStyleEditor = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<PRODUCT_GRID_DESIGN>();
  return (
    <Container>
      {/* <Grid cols={2} gap="1rem"></Grid> */}
      <Heading tag="h5" mb={1}>
        Appearance
      </Heading>
      <div className="wrapper">
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
