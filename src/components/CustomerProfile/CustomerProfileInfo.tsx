import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";
import { MdSubtitles } from "react-icons/md";
import { CUSTOMER } from "../../interfaces/customers/customers";

import IconedInput from "../reusable/Inputs/IconedInput";
import { Control, Controller, DeepMap } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";
import { FieldError } from "react-hook-form";
import PhoneInput from "../reusable/Inputs/PhoneInput";
import { format, parseISO } from "date-fns";
import Flex from "../StyledComponents/Flex";
import Button from "../reusable/Button";
interface IProps {
  errors: DeepMap<CUSTOMER, FieldError>;
  register: UseFormRegister<CUSTOMER>;
  control: Control<CUSTOMER>;
  joinDate: string;
}

const CustomerProfileInfo = ({
  errors,
  register,
  control,
  joinDate,
}: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h5 className="title">Customer Personal Info</h5>
        <p className="join-date">
          Join Date : {format(parseISO(joinDate), "dd/MM/yyyy")}{" "}
        </p>
      </div>
      <div className="box">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.first_name}
          register={register}
          required
          requiredMessage="Required"
          label="First Name"
          name="first_name"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.last_name}
          register={register}
          required
          requiredMessage="Required"
          label="Last Name"
          name="last_name"
        />
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <PhoneInput
                errors={errors?.phone}
                label="Phone Number"
                onChange={() => {}}
                value={value}
              />
            );
          }}
        />

        <IconedInput
          Icon={AiOutlineMail}
          errors={errors?.email}
          register={register}
          required
          requiredMessage="Required"
          label="Email Address"
          name="email"
        />
      </div>
    </Container>
  );
};

export default CustomerProfileInfo;

const Container = styled.div(
  ({ theme: { breakpoints, primary, shadow, green } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    display:flex;
    align-items:center;
    justify-content:space-between;
    .title {
      color: ${primary};
    }
  }
  .box {
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media ${breakpoints.md} {
    .box {
      grid-template-columns: 1fr 1fr ;

    }
  }
  
  `
);
