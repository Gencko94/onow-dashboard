import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsCheck } from "react-icons/bs";
import { MdCancel, MdSubtitles } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import styled from "styled-components";
import { CUSTOMER, NEW_CUSTOMER } from "../../interfaces/customers/customers";
import Select from "react-select";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createCustomer } from "../../utils/queries";
import IconedInput from "../reusable/IconedInput";
import { useTranslation } from "react-i18next";

const countryOptions = [
  {
    name: "Kuwait",
    key: "1",
  },
  {
    name: "Saudi Arabia",
    key: "1",
  },
];
interface IProps {
  closeFunction: () => void;
  storeId: number;
}
const AddCustomerModal = ({ closeFunction, storeId }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NEW_CUSTOMER>();
  const { mutateAsync: createNewCustomer } = useMutation(createCustomer, {
    onSuccess: (data) => {
      queryClient.setQueryData<CUSTOMER[] | undefined>(
        ["customers", storeId],
        (prev) => {
          if (prev) return [...prev, data];
        }
      );
    },
  });
  const onSubmit: SubmitHandler<NEW_CUSTOMER> = async (data) => {
    await createNewCustomer({
      storeId,
      data: {
        ...data,
        phone: `${phoneKey}${data.phone}`,
        country_id: data.country_id,
      },
    });
    console.log({
      ...data,
      phoneNumber: `${phoneKey}${data.phone}`,
    });
    closeFunction();
  };
  const [phoneKey, setPhoneKey] = useState<string>("+965");
  const selectStyles = useMemo(() => {
    return {
      control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: "#ececec",
        fontSize: "0.9rem",
        minHeight: "35px",
        border: state.isFocused ? "none" : "1px solid rgba(0,0,0,0.1)",
      }),
      indicatorContainer: (provided: any, state: any) => ({
        ...provided,
        padding: state.isFocused ? "0.4rem" : "0.4rem",
      }),
      option: (provided: any) => ({
        ...provided,
        fontSize: "0.9rem",
      }),
    };
  }, []);
  return (
    <Container rtl={language === "ar"}>
      <InputsContainer>
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.first_name}
          register={register}
          required
          label="Customer First Name"
          name="first_name"
          requiredMessage="Required"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.last_name}
          register={register}
          required
          requiredMessage="Required"
          label="Customer Last Name"
          name="last_name"
        />
      </InputsContainer>
      <InputsContainer>
        <div>
          <label>Country</label>
          <Controller
            name="country_id"
            control={control}
            rules={{ required: "Required" }}
            defaultValue={countryOptions[0]}
            render={({ field: { ref, onChange } }) => (
              <>
                <Select
                  ref={ref}
                  options={countryOptions}
                  styles={selectStyles}
                  onChange={(val) => {
                    setPhoneKey(val!.key);
                    onChange(parseInt(val!.key));
                  }}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.key}
                />
                <ErrorMessage>
                  {errors?.country_id! && "Required Field"}
                </ErrorMessage>
              </>
            )}
          />
        </div>
        <IconedInput
          Icon={AiOutlinePhone}
          errors={errors?.phone}
          register={register}
          required
          requiredMessage="Required"
          label="Customer Phone Number"
          name="phone"
        />
      </InputsContainer>
      <InputsContainer>
        <IconedInput
          Icon={HiOutlineMail}
          errors={errors?.email}
          register={register}
          required
          requiredMessage="Required"
          label="Customer Email Address"
          name="email"
        />
      </InputsContainer>
      <ButtonsContainer>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          <BsCheck size={30} />
          <BtnText>Add New Customer</BtnText>
        </Button>
        <Button onClick={() => closeFunction()} red type="button">
          <MdCancel size={30} />
          <BtnText>Cancel</BtnText>
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default AddCustomerModal;
const Container = styled.div<{ rtl: boolean }>`
  /* padding: 0.5rem; */
  /* width: 600px; */
  font-family: ${(props) => props.theme.fontFamily};
  direction: ${(props) => (props.rtl ? "rtl" : "ltr")};
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
    font-weight: ${(props) => props.theme.font.regular};
    display: inline-block;
  }
  .input-container {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.inputColorLight};
    color: ${(props) => props.theme.headingColor};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .icon {
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.subHeading};
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  border-top: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.overlayColor};
`;
const BtnText = styled.p`
  font-size: 0.9rem;
  font-weight: ${(props) => props.theme.font.regular};
  margin: 0 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.4rem;
  font-size: 0.9rem;
  width: 50px;
`;

const Button = styled.button<{ red?: boolean }>`
  background-color: ${(props) =>
    props.red ? props.theme.dangerRed : props.theme.green};
  box-shadow: ${(props) => props.theme.shadow};
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
  color: ${(props) => props.theme.dangerRed};
`;
