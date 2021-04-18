import { BsCheck } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';
import Select from 'react-select';
import { useContext, useMemo, useState } from 'react';
import NewVariationField from '../AddVariationModalBody/NewVariationField';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { NEW_VARIATION } from '../../interfaces/products/products';
import { AddProductProvider } from '../../pages/AddProduct';

const variationTypes = [
  { id: 1, name: 'Text' },
  { id: 2, name: 'Color' },
  { id: 3, name: 'Photo' },
];
const selectTypes = [
  { id: 1, name: 'Single Select' },
  { id: 2, name: 'Multiple Select' },
];
const AddVariationModalBody = ({
  priceFromVariationsEnabled,
}: {
  priceFromVariationsEnabled: boolean;
}) => {
  const methods = useForm<NEW_VARIATION>({
    defaultValues: {
      required: priceFromVariationsEnabled ? 1 : 0,
      select_type: 1,
      type_id: 1,

      values: [
        {
          name: '',
          name_ar: '',
          priceEnabled: priceFromVariationsEnabled ? true : false,
          saleEnabled: false,
          saleEndDateEnabled: false,
          color: '#555',
          infiniteQtyEnabled: true,
          qtyAlertThreshold: 0,
        },
      ],
    },
  });
  const { handleAddVariations } = useContext(AddProductProvider);
  // const [variationType, setVariationType] = useState<{
  //   id: number;
  //   name: string;
  // } | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'values',
  });
  const variationType = methods.watch('type_id');
  // Select Styles
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
  // Fields Render Method
  const renderFields = () => {
    return fields.map((field, index) => (
      <NewVariationField
        key={field.id}
        index={index}
        remove={remove}
        length={fields.length}
        variationType={variationType}
        field={field}
        priceFromVariationsEnabled={priceFromVariationsEnabled}
      />
    ));
  };
  const onSubmit: SubmitHandler<NEW_VARIATION> = data => {
    console.log(data);
    handleAddVariations?.(data);
  };
  const onError: SubmitErrorHandler<NEW_VARIATION> | undefined = errors => {
    console.log(errors);
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
                    ref={ref}
                    styles={selectStyles}
                    placeholder="Select Variation Type..."
                    options={variationTypes}
                    defaultValue={variationTypes[0]}
                    isSearchable={false}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id.toString()}
                    onChange={value => {
                      if (fields.length === 0) {
                        append({ name: 'test555' });
                      }
                      onChange(value?.id);
                    }}
                  />
                  <ErrorMessage>
                    {methods.formState.errors?.type_id! && 'Required Field'}
                  </ErrorMessage>
                </>
              )}
            />
          </div>
          <div>
            <Label>Select Type</Label>
            <Controller
              name="select_type"
              control={methods.control}
              rules={{ required: 'Required' }}
              render={({ field: { ref, onChange, value } }) => (
                <>
                  <Select
                    ref={ref}
                    styles={selectStyles}
                    placeholder="User Select Type"
                    options={selectTypes}
                    defaultValue={selectTypes[0]}
                    isSearchable={false}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id.toString()}
                    onChange={value => {
                      onChange(value?.id);
                    }}
                  />
                  <ErrorMessage>
                    {methods.formState.errors?.select_type! && 'Required Field'}
                  </ErrorMessage>
                </>
              )}
            />
          </div>
          <div>
            <Label>Required</Label>
            <Controller
              name="required"
              control={methods.control}
              // rules={{ required: 'Required' }}
              render={({ field: { ref, onChange, value } }) => (
                <>
                  <Select
                    ref={ref}
                    styles={selectStyles}
                    placeholder="User Select Type"
                    options={[
                      { id: 0, name: 'No' },
                      { id: 1, name: 'Yes' },
                    ]}
                    defaultValue={
                      priceFromVariationsEnabled
                        ? { id: 1, name: 'Yes' }
                        : { id: 0, name: 'No' }
                    }
                    isDisabled={priceFromVariationsEnabled}
                    isSearchable={false}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id.toString()}
                    onChange={value => {
                      onChange(value?.id);
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

        {/* {fields.length > 0 && ( */}
        <FieldsContainer>{renderFields()}</FieldsContainer>
        {/* )} */}
        <AddButtonContainer>
          <Button
            type="button"
            onClick={() => {
              append({
                priceEnabled: priceFromVariationsEnabled ? true : false,
              });
            }}
          >
            <BiPlus size={30} />
            <BtnText>Add Field</BtnText>
          </Button>
        </AddButtonContainer>
        <ButtonsContainer>
          <Button
            type="button"
            onClick={methods.handleSubmit(onSubmit, onError)}
          >
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
