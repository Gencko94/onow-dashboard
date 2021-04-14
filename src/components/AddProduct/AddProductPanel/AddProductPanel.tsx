import styled from 'styled-components';
import Select, { GroupTypeBase, Styles } from 'react-select';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { PRODUCT_TYPE } from '../../../interfaces/products/products';

export type PRODUCT_TYPES = PRODUCT_TYPE[];

const AddProductPanel = () => {
  return (
    <Container>
      <InputContainer>
        <Label>Product Type :</Label>
        {/* <Select
          styles={customStyles}
          value={productType}
          onChange={value => {
            setProductType(value!);
          }}
          isSearchable={false}
          options={productTypes}
          getOptionLabel={type => type.name}
          getOptionValue={type => type.id.toString()}
        /> */}
      </InputContainer>
    </Container>
  );
};

export default AddProductPanel;
const Container = styled.div`
  padding: 0.75rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.headingColor};
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.semibold};
  display: block;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
