import { BsCheck } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';
import Select from 'react-select';
import { useState } from 'react';
import NewVariationField from '../AddVariationModalBody/NewVariationField';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { NEW_VARIATION } from '../../interfaces/products/products';
const options = [
  { id: 1, name: 'Color (Single Select)' },
  { id: 2, name: 'Color (Multiple Select)' },
  { id: 3, name: 'Text (Single Select)' },
  { id: 4, name: 'Text (Multiple Select)' },
  { id: 5, name: 'Photo (Single Select)' },
  { id: 6, name: 'Photo (Multiple Select)' },
];
const AddVariationModalBody = () => {
  const methods = useForm<NEW_VARIATION>();
  const [variationType, setVariationType] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'values',
  });
  const renderFields = () => {
    return fields.map((field, index) => (
      <NewVariationField
        key={field.id}
        index={index}
        remove={remove}
        length={fields.length}
        variationType={variationType}
      />
    ));
  };
  const onSubmit: SubmitHandler<NEW_VARIATION> = data => {
    console.log(data);
  };
  return (
    <Container>
      <FormProvider {...methods}>
        <InputsContainer>
          <div>
            <Label>Variation Title English</Label>
            <Input
              placeholder="Size/Color..."
              {...methods.register('title', { required: 'Required' })}
            />
            <ErrorMessage>
              {methods.formState.errors?.title! && 'Required Field'}
            </ErrorMessage>
          </div>
          <div>
            <Label>Variation Title Arabic</Label>
            <Input
              placeholder="Size/Color..."
              {...methods.register('title_ar', { required: 'Required' })}
            />
            <ErrorMessage>
              {methods.formState.errors?.title_ar! && 'Required Field'}
            </ErrorMessage>
          </div>
          <div>
            <Label>Variation Type</Label>
            <Controller
              name="type_id"
              control={methods.control}
              rules={{ required: 'Required' }}
              render={({ field: { ref, onChange } }) => (
                <>
                  <Select
                    placeholder="Select Variation Type..."
                    options={options}
                    value={variationType}
                    isSearchable={false}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id.toString()}
                    onChange={value => {
                      if (fields.length === 0) {
                        append({});
                      }
                      onChange(value?.id);
                      setVariationType(value!);
                    }}
                  />
                  <ErrorMessage>
                    {methods.formState.errors?.type_id! && 'Required Field'}
                  </ErrorMessage>
                </>
              )}
            />
          </div>
        </InputsContainer>

        <FieldsContainer>{renderFields()}</FieldsContainer>
        <AddButtonContainer>
          <Button
            type="button"
            onClick={() => {
              append({});
            }}
          >
            <BiPlus size={30} />
            <BtnText>Add Field</BtnText>
          </Button>
        </AddButtonContainer>
        <ButtonsContainer>
          <Button type="button" onClick={methods.handleSubmit(onSubmit)}>
            <BsCheck size={30} />
            <BtnText>Add Variation</BtnText>
          </Button>
          <Button red type="button">
            <MdCancel size={30} />
            <BtnText>Cancel</BtnText>
          </Button>
        </ButtonsContainer>
      </FormProvider>
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
  padding: 1rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  border-top: ${props => props.theme.border};
  background-color: ${props => props.theme.overlayColor};
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
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
`;
