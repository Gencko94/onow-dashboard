import { BsCheck } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';
import Select from 'react-select';
import { useState } from 'react';
import NewVariationField from '../AddVariationModalBody/NewVariationField';
const options = [
  { id: 1, name: 'Color' },
  { id: 2, name: 'Text' },
  { id: 3, name: 'Photo' },
];
const AddVariationModalBody = () => {
  const [newVariations, setNewVariations] = useState<JSX.Element[] | []>([]);
  const [variationType, setVariationType] = useState<any>(null);
  return (
    <Container>
      <InputsContainer>
        <div>
          <Label>Variation Title English</Label>
          <Input placeholder="Size/Color..." />
        </div>
        <div>
          <Label>Variation Title Arabic</Label>
          <Input placeholder="Size/Color..." />
        </div>
        <div>
          <Label>Variation Type</Label>
          <Select
            placeholder="Select Variation Type..."
            options={options}
            value={variationType}
            isSearchable={false}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id.toString()}
            onChange={value => {
              setVariationType(value);
              setNewVariations(prev => {
                return [...prev, <NewVariationField />];
              });
            }}
          />
        </div>
      </InputsContainer>
      {newVariations}
      <ButtonsContainer>
        <Button>
          <BsCheck size={30} />
          <BtnText>Add Variation</BtnText>
        </Button>
        <Button red>
          <MdCancel size={30} />
          <BtnText>Cancel</BtnText>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default AddVariationModalBody;
const Container = styled.div`
  width: 700px;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
  display: inline-block;
`;
const Input = styled.input`
  padding: 0.5rem;
  border: ${props => props.theme.btnBorder};
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  font-size: 0.9rem;
  border-radius: 5px;
  background-color: ${props => props.theme.inputColorLight};
  color: ${props => props.theme.headingColor};
`;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button<{ red?: boolean }>`
  background-color: ${props =>
    props.red ? props.theme.dangerRed : props.theme.green};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 7px;
  position: relative;
  padding: 0.25rem 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
`;
const BtnText = styled.p`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
  margin: 0 0.5rem;
`;
