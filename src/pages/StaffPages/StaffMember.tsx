import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import DeleteButton from "../../components/reusable/DeleteButton";
import StaffMemberInformation from "../../components/Staff/StaffMemberInformation";
import StaffMemberPermissions from "../../components/Staff/StaffMemberPermissions";
import Flex from "../../components/StyledComponents/Flex";
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<STAFF_MEMBER>({ defaultValues: data });
  const role = watch("role");
  const onSubmit: SubmitHandler<STAFF_MEMBER> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Staff Member"
        parentLabel="Staff"
        parentTarget="/settings/staff"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex margin="1rem" justify="flex-end">
          <Button
            type="submit"
            text="Save Changes"
            padding="0.5rem"
            bg="green"
            withTransition
            margin="0 1rem"
          />
          <Button
            text="Delete Staff Member"
            padding="0.5rem"
            Icon={RiDeleteBinLine}
            bg="danger"
            iconSize={20}
          />
        </Flex>

        <StaffMemberInformation
          register={register}
          errors={errors}
          control={control}
        />
        {role === "staff" && (
          <StaffMemberPermissions
            setValue={setValue}
            control={control}
            permissions={userPermissions}
          />
        )}
      </form>
    </div>
  );
};

export default StaffMember;
