import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import DeleteButton from "../../components/reusable/DeleteButton";
import StaffMemberInformation from "../../components/Staff/StaffMemberInformation";
import StaffMemberPermissions from "../../components/Staff/StaffMemberPermissions";
import { userPermissions } from "../../data/userPermissions";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import { getStaffMember } from "../../utils/test-queries";

const StaffMember = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<STAFF_MEMBER>(
    ["staff-member", id],
    () => getStaffMember(id),
    { suspense: true }
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<STAFF_MEMBER>({ defaultValues: data });
  return (
    <Container>
      <div className="panel">
        <DeleteButton cb={() => {}} title="Delete Staff Member" />
      </div>
      <StaffMemberInformation register={register} errors={errors} />
      <StaffMemberPermissions control={control} permissions={userPermissions} />
    </Container>
  );
};

export default StaffMember;
const Container = styled.div`
  .panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
