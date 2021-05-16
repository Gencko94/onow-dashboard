import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";

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
              <AiOutlinePhone size={20} />
            </span>
            <input {...register("phone", { required: "Required" })} />
          </div>
          <p className="error">{errors?.phone?.message}</p>
        </div>
        <div>
          <label>Email Address</label>
          <div className="input-container">
            <span className="icon">
              <AiOutlineMail size={20} />
            </span>
            <input {...register("email", { required: "Required" })} />
          </div>
          <p className="error">{errors?.email?.message}</p>
        </div>
      </div>
    </Container>
  );
};

export default StaffMemberInformation;

const Container = styled.div`
  margin: 2rem 0;
  .title-container {
    padding: 1rem 0;
  }
  .box {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    padding: 1rem;
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
      background-color: #fff;
    }
    .error {
      height: 20px;
      font-size: 0.7rem;
      padding-top: 0.25rem;
      color: ${(props) => props.theme.dangerRed};
    }
  }
`;
