import { SubmitHandler, useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import SettingsBreadcrumbs from "../../components/SettingsPage/SettingsBreadcrumbs";
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
      <SettingsBreadcrumbs transId="Account" />
      <AccountInformationSection>
        <h5>Account Information</h5>
        <div className="container">
          <div>
            <label>Name</label>
            <div className="input-container">
              <span className="icon">
                <MdSubtitles size={20} />
              </span>
              <input {...register("name", { required: "Required" })} />
            </div>
            <p className="error">{errors?.name?.message}</p>
          </div>

          <div>
            <label>Phone Number</label>
            <div className="input-container">
              <span className="icon">
                <MdSubtitles size={20} />
              </span>
              <input {...register("phone", { required: "Required" })} />
            </div>
            <p className="error">{errors?.phone?.message}</p>
          </div>
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
    label {
      color: ${({ theme }) => theme.headingColor};
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
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
    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.9rem;
      width: 50px;
    }
  }
`;
const PasswordSection = styled.div`
  margin: 2rem 0;
  h5 {
    margin-bottom: 1rem;
  }
`;
