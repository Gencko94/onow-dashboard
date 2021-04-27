import {
  Control,
  Controller,
  useController,
  useFormContext,
} from 'react-hook-form';
import Select from 'react-select';
import { PRODUCT_GRID_DESIGN } from '../../../../../interfaces/website-layout/designs/product-grid-design';
import Flex from '../../../../StyledComponents/Flex';
import Grid from '../../../../StyledComponents/Grid';
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
  } = useFormContext<any>();

  return (
    <Grid cols="repeat(4,1fr)" gap="0.5rem" items="center">
      <Paragraph size={0.9}>Number of Items per Row</Paragraph>

      <Flex items="center">
        <Paragraph size={0.9}>Medium Screens</Paragraph>
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
          <Controller
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
          />
        </div>
      </Flex>
    </Grid>
  );
};

export default ProductGridItemsPerRowEditor;
