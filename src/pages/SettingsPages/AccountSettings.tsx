import { SubmitHandler, useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import IconedInput from "../../components/reusable/IconedInput";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";

const AccountSettings = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<STAFF_MEMBER>();
  const onSubmit: SubmitHandler<STAFF_MEMBER> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Account"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <AccountInformationSection>
        <h5>Account Information</h5>
        <div className="container">
          <IconedInput
            Icon={MdSubtitles}
            errors={errors}
            register={register}
            required
            requiredMessage="Required"
            label="Name"
            name="name"
          />
          {/* <div>
            <label>Name</label>
            <div className="input-container">
              <span className="icon">
                <MdSubtitles size={20} />
              </span>
              <input {...register("name", { required: "Required" })} />
            </div>
            <p className="error">{errors?.name?.message}</p>
          </div> */}
          <IconedInput
            Icon={MdSubtitles}
            errors={errors}
            register={register}
            required
            requiredMessage="Required"
            label="Phone number"
            name="phone"
          />
        </div>
      </AccountInformationSection>
      <PasswordSection>
        <h5>Password</h5>
        <div className="container"></div>
      </PasswordSection>
    </div>
  );
};

export default AccountSettings;

const AccountInformationSection = styled.div`
  margin: 2rem 0;
  h5 {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.mainColor};
  }
  .container {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    padding: 1rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;
const PasswordSection = styled.div`
  margin: 2rem 0;
  h5 {
    margin-bottom: 1rem;
  }
`;
