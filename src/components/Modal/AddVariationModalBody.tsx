import { BsCheck } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';
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
  const [variationType, setVariationType] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [newVariationsIndeces, setNewVariationsIndeces] = useState<number[]>([
    0,
  ]);

  const renderFields = () => {
    let arr = [];
    for (let i = 0; i < newVariationsIndeces.length; i++) {
      arr.push(
        <NewVariationField
          key={newVariationsIndeces[i]}
          index={newVariationsIndeces[i]}
          variationType={variationType}
          setNewVariationsIndeces={setNewVariationsIndeces}
          newVariationsIndeces={newVariationsIndeces}
        />
      );
    }
    return arr;
  };

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
              setVariationType(value!);
            }}
          />
        </div>
      </InputsContainer>

      <FieldsContainer>
        {/* <NewVariationField variationType={variationType} /> */}
        {renderFields()}
      </FieldsContainer>
      <AddButtonContainer>
        <Button
          type="button"
          onClick={() => {
            setNewVariationsIndeces(prev => {
              return [...prev, prev[prev.length - 1] + 1];
            });
          }}
        >
          <BiPlus size={30} />
          <BtnText>Add Field</BtnText>
        </Button>
      </AddButtonContainer>
      <ButtonsContainer>
        <Button type="button">
          <BsCheck size={30} />
          <BtnText>Add Variation</BtnText>
        </Button>
        <Button red type="button">
          <MdCancel size={30} />
          <BtnText>Cancel</BtnText>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default AddVariationModalBody;
const Container = styled.div`
  width: 900px;
  max-height: calc(100vh - 100px);
  overflow: auto;
  padding: 0 0.5rem;
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
  padding-top: 1rem;
  align-items: center;
  justify-content: space-between;
  border-top: ${props => props.theme.border};
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
const FieldsContainer = styled.div`
  padding: 0.5rem;
  background-color: ${props => props.theme.overlayColor};
  border: ${props => props.theme.border};
  border-radius: 5px;
`;
const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;
