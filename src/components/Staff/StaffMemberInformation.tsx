import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import IconedInput from "../reusable/IconedInput";

interface IProps {
  register: any;
  errors: any;
}

const StaffMemberInformation = ({ register, errors }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h5>Staff Member Information</h5>
      </div>
      <div className="box">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors}
          register={register}
          required
          requiredMessage="Required"
          label="Full Name"
          name="name"
        />
        <IconedInput
          Icon={AiOutlinePhone}
          errors={errors}
          register={register}
          required
          requiredMessage="Required"
          label="Phone Number"
          name="phone"
        />
        <IconedInput
          Icon={AiOutlineMail}
          errors={errors}
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

export default StaffMemberInformation;

const Container = styled.div`
  margin: 1rem 0;
  .title-container {
    padding: 1rem 0;
    color: ${(props) => props.theme.mainColor};
  }
  .box {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;
