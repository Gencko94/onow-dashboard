import { useForm } from "react-hook-form";
import { FiCheck } from "react-icons/fi";
import styled from "styled-components";
import StaffMemberInformation from "../../components/Staff/StaffMemberInformation";
import StaffMemberPermissions from "../../components/Staff/StaffMemberPermissions";
import { userPermissions } from "../../data/userPermissions";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";

const CreateStaffMember = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<STAFF_MEMBER>();

  const onSubmit = (data: STAFF_MEMBER) => {
    console.log(data);
  };
  return (
    <Container>
      <div className="panel">
        <button onClick={handleSubmit(onSubmit)}>
          <span className="icon">
            <FiCheck size={20} />
          </span>
          <p>Save Changes</p>
        </button>
      </div>
      <StaffMemberInformation register={register} errors={errors} />
      <StaffMemberPermissions control={control} permissions={userPermissions} />
    </Container>
  );
};

export default CreateStaffMember;
const Container = styled.div`
  .panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      background-color: #418ce0;
      box-shadow: ${(props) => props.theme.shadow};
      display: flex;
      align-items: center;
      border-radius: 6px;
      padding: 0.5rem 0.5rem;
      position: relative;
      color: #fff;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p {
        font-size: 0.9rem;
        margin: 0 0.25rem;
      }
    }
  }
`;
