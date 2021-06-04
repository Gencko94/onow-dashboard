import styled from "styled-components";
import { BsCardHeading } from "react-icons/bs";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { MdDateRange, MdSubtitles } from "react-icons/md";
import { CUSTOMER } from "../../interfaces/customers/customers";
import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import IconedInput from "../reusable/Inputs/IconedInput";
import { useForm } from "react-hook-form";
import SuccessButton from "../reusable/SuccessButton";
interface IProps {
  data: CUSTOMER;
}

const CustomerProfileInfo = ({ data }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<CUSTOMER>();
  return (
    <Container>
      <div className="title-container">
        <h5>Customer Personal Info</h5>
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
        <IconedInput
          Icon={AiOutlinePhone}
          errors={errors?.phone}
          register={register}
          required
          requiredMessage="Required"
          label="Phone Number"
          name="phone"
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
      <div className="save-container">
        <SuccessButton title="Save Changes" cb={() => {}} />
      </div>
    </Container>
  );
};

export default CustomerProfileInfo;

const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow, green } }) => `
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
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
  .save-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    button {
      background-color: ${green};
      padding: 0.5rem;
      border-radius: 6px;
      color: #fff;
    }
  }
  `
);
