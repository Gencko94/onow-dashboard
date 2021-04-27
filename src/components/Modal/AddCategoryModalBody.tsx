import { BsCheck } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';
import Toggle from 'react-toggle';
import Select from 'react-select';
import 'react-toggle/style.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { QUICK_ADD_CATEGORY } from '../../interfaces/categories/categories';
import { useEffect } from 'react';
const AddCategoryModalBody = () => {
  const options = [
    { id: 1, name: 'Clothing' },
    { id: 2, name: 'Food' },
  ];
  const {
    register,
    unregister,
    control,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<QUICK_ADD_CATEGORY>();
  const watchInput = watch('isChild', false);
  const onSubmit: SubmitHandler<QUICK_ADD_CATEGORY> = data => {
    console.log(data);
  };
  useEffect(() => {
    if (!watchInput) {
      unregister('parent_category');
    }
  }, [unregister, watchInput]);
  return (
    <Container>
      <InputsContainer>
        <div>
          <Label>Category Name English</Label>
          <Input {...register('name', { required: 'Required' })} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </div>
        <div>
          <Label>Category Name Arabic</Label>
          <Input {...register('name_ar', { required: 'Required' })} />
          <ErrorMessage>{errors?.name_ar?.message}</ErrorMessage>
        </div>
      </InputsContainer>
      <ToggleContainer>
        <Controller
          name="isChild"
          control={control}
          defaultValue={false}
          render={({ field: { ref, onChange } }) => (
            <Toggle onChange={e => onChange(e.target.checked)} />
          )}
        />

        <ToggleLabel htmlFor="cheese-status">Add as Category Child</ToggleLabel>
      </ToggleContainer>
      {watchInput && (
        <Controller
          name="parent_category"
          control={control}
          rules={{ required: 'Required' }}
          render={({ field: { ref, onChange } }) => (
            <>
              <Select
                isMulti
                ref={ref}
                options={options}
                onChange={val => onChange(val.map(i => i.id))}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id.toString()}
                placeholder="Select Parent Category..."
              />
              <ErrorMessage>{errors?.parent_category?.message}</ErrorMessage>
            </>
          )}
        />
      )}
      <ButtonsContainer>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          <BsCheck size={30} />
          <BtnText>Add New Category</BtnText>
        </Button>
        <Button red type="button">
          <MdCancel size={30} />
          <BtnText>Cancel</BtnText>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default AddCategoryModalBody;
const Container = styled.div`
  /* padding: 0.5rem; */
  width: 500px;
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
  border-radius: 6px;
  position: relative;
  padding: 0.25rem 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
`;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 1rem;
`;

const BtnText = styled.p`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
  margin: 0 0.5rem;
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
const ToggleContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  align-items: center;
`;
const ToggleLabel = styled.label`
  font-size: 0.9rem;
  margin: 0 0.5rem;
`;
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
`;
