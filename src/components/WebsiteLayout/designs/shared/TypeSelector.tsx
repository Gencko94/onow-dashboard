import { Control, Controller, UseFormWatch } from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';
import Grid from '../../../StyledComponents/Grid';
import Label from '../../../StyledComponents/Label';

interface IProps {
  control: Control<any>;
}
const options = [
  {
    type: 'category',
    label: 'Products from a Category',
  },
  {
    type: 'products',
    label: 'Specific Products',
  },
];
const TypeSelector = ({ control }: IProps) => {
  return (
    <Container>
      <div>
        <Label>What would you like to show ?</Label>
        <Controller
          name="type"
          control={control}
          render={({ field: { ref, onChange, value } }) => (
            <Select
              ref={ref}
              options={options}
              defaultValue={options.find(i => i.type === value)}
              onChange={val => onChange(val!.type)}
              getOptionLabel={option => option.label}
              getOptionValue={option => option.type}
            />
          )}
        />
      </div>
    </Container>
  );
};

export default TypeSelector;
const Container = styled.div``;
