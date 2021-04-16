import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BsCheck } from 'react-icons/bs';
import { MdCancel, MdSubtitles } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlinePhone } from 'react-icons/ai';
import styled from 'styled-components';
import { NEW_CUSTOMER } from '../../interfaces/customers/customers';
import Select from 'react-select';
import { useMemo, useState } from 'react';

const countryOptions = [
  {
    name: 'Kuwait',
    key: '+965',
  },
  {
    name: 'Saudi Arabia',
    key: '+966',
  },
];
const AddCustomerModal = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NEW_CUSTOMER>();
  const onSubmit: SubmitHandler<NEW_CUSTOMER> = data => {
    console.log(data);
  };
  const [phoneKey, setPhoneKey] = useState<string>('+965');
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
      <InputsContainer>
        <div>
          <label>Customer First Name</label>
          <div className="input-container">
            <span className="icon">
              <MdSubtitles size={20} />
            </span>
            <Input {...register('firstName', { required: 'Required' })} />
          </div>
          <ErrorMessage>{errors?.firstName?.message}</ErrorMessage>
        </div>

        <div>
          <label>Customer Last Name</label>
          <div className="input-container">
            <span className="icon">
              <MdSubtitles size={20} />
            </span>
            <Input {...register('lastName', { required: 'Required' })} />
          </div>
          <ErrorMessage>{errors?.lastName?.message}</ErrorMessage>
        </div>
      </InputsContainer>
      <InputsContainer>
        <div>
          <label>Country</label>
          <Controller
            name="country"
            control={control}
            rules={{ required: 'Required' }}
            render={({ field: { ref, onChange } }) => (
              <>
                <Select
                  defaultValue={countryOptions.find(i => i.name === 'Kuwait')}
                  ref={ref}
                  options={countryOptions}
                  styles={selectStyles}
                  onChange={val => {
                    setPhoneKey(val!.key);
                    onChange(val?.name);
                  }}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.name}
                />
                <ErrorMessage>
                  {errors?.country! && 'Required Field'}
                </ErrorMessage>
              </>
            )}
          />
        </div>
        <div>
          <label>Customer Phone Number</label>
          <div className="input-container">
            <span className="icon">
              <AiOutlinePhone size={20} />
            </span>
            {phoneKey}
            <Input {...register('phoneNumber', { required: 'Required' })} />
          </div>
          <ErrorMessage>{errors?.phoneNumber?.message}</ErrorMessage>
        </div>
      </InputsContainer>
      <InputsContainer>
        <div>
          <label>Email Address</label>
          <div className="input-container">
            <span className="icon">
              <HiOutlineMail size={20} />
            </span>
            <Input
              placeholder="optional"
              {...register('email', { required: 'Required' })}
            />
          </div>
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        </div>
      </InputsContainer>
      <ButtonsContainer>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          <BsCheck size={30} />
          <BtnText>Add New Customer</BtnText>
        </Button>
        <Button red type="button">
          <MdCancel size={30} />
          <BtnText>Cancel</BtnText>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default AddCustomerModal;
const Container = styled.div`
  /* padding: 0.5rem; */
  width: 600px;
`;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0 1rem;
  margin: 1rem 0;
  label {
    color: ${({ theme }) => theme.headingColor};
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
    font-weight: ${props => props.theme.font.regular};
    display: inline-block;
  }
  .input-container {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.inputColorLight};
    color: ${props => props.theme.headingColor};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .icon {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.subHeading};
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  border-top: ${props => props.theme.border};
  background-color: ${props => props.theme.overlayColor};
`;
const BtnText = styled.p`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
  margin: 0 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.4rem;
  font-size: 0.9rem;
  width: 50px;
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
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  height: 22px;
  color: ${props => props.theme.dangerRed};
`;
