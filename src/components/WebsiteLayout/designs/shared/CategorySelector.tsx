import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import Select from 'react-select';
import styled from 'styled-components';
import { PRODUCT_GRID_DESIGN } from '../../../../interfaces/website-layout/designs/product-grid-design';
// import { CATEGORY } from '../../../../interfaces/categories/categories';
import { getCategories } from '../../../../utils/test-queries';
import Label from '../../../StyledComponents/Label';
interface IProps {
  control: Control<PRODUCT_GRID_DESIGN>;
  watch: UseFormWatch<PRODUCT_GRID_DESIGN>;
}
const CategorySelector = ({ control, watch }: IProps) => {
  const { i18n } = useTranslation();
  const { data, isLoading } = useQuery<any>('categories', getCategories);
  const category = watch('category');
  return (
    <Container>
      <Label>Select The Category</Label>
      <Controller
        name="category"
        control={control}
        render={({ field: { ref, onChange, value } }) => (
          <Select
            ref={ref}
            isLoading={isLoading}
            options={data}
            defaultValue={data?.find((i: any) => i.id === category)}
            onChange={val => onChange(val)}
            getOptionLabel={option => option.name[i18n.language]}
            getOptionValue={option => option.id.toString()}
          />
        )}
      />
    </Container>
  );
};

export default CategorySelector;
const Container = styled.div``;
