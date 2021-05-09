import { useMemo } from 'react';
import {
  Control,
  Controller,
  useController,
  useFormContext,
} from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';
import { PRODUCT_GRID_DESIGN } from '../../../../../interfaces/website-layout/designs/product-grid-design';
import Flex from '../../../../StyledComponents/Flex';
import Grid, {
  Wrapper as GridWrapper,
} from '../../../../StyledComponents/Grid';
import Heading from '../../../../StyledComponents/Heading';
import Paragraph from '../../../../StyledComponents/Paragraph';
const smallOptions = [{ num: '1' }, { num: '2' }, { num: '3' }];
const mediumOptions = [{ num: '3' }, { num: '4' }, { num: '5' }];
const largeOptions = [{ num: '5' }, { num: '6' }, { num: '7' }, { num: '8' }];

const ProductGridItemsPerRowEditor = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PRODUCT_GRID_DESIGN>();
  const selectStyles = useMemo(() => {
    return {
      control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: '#ececec',
        fontSize: '0.9rem',
        minHeight: '35px',
        border: state.isFocused ? 'none' : '1px solid rgba(0,0,0,0.1)',
      }),
      indicatorContainer: (provided: any, state: any) => ({
        ...provided,
        padding: state.isFocused ? '0.4rem' : '0.4rem',
      }),
      option: (provided: any) => ({
        ...provided,
        fontSize: '0.9rem',
      }),
    };
  }, []);
  return (
    <Container>
      <Heading tag="h6" mb={0.5}>
        Number of Items per row :
      </Heading>
      <Grid cols="repeat(3,1fr)" gap="0.5rem" items="center">
        <Flex items="center">
          <Paragraph size={0.9}>Small Screens</Paragraph>
          <div className="select-container">
            <Controller
              name="gridOptions.itemsPerRow.small"
              control={control}
              render={({ field: { ref, onChange } }) => (
                <Select
                  styles={selectStyles}
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
                  styles={selectStyles}
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
            <Controller
              name="gridOptions.itemsPerRow.large"
              control={control}
              render={({ field: { ref, onChange } }) => (
                <Select
                  ref={ref}
                  styles={selectStyles}
                  options={largeOptions}
                  onChange={val => onChange(val!.num)}
                  getOptionLabel={option => option.num.toString()}
                  getOptionValue={option => option.num.toString()}
                />
              )}
            />
          </div>
        </Flex>
      </Grid>
    </Container>
  );
};

export default ProductGridItemsPerRowEditor;
const Container = styled.div`
  ${GridWrapper} {
    border-radius: 8px;
    background-color: ${props => props.theme.overlayColor};
    border: ${props => props.theme.border};
    padding: 0.5rem;
  }
  .select-container {
    flex: 1;
  }
`;
