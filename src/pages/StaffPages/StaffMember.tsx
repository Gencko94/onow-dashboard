import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import ConfirmationModal from "../../components/reusable/ConfirmationModal";
import DeleteButton from "../../components/reusable/DeleteButton";
import ErrorToast from "../../components/reusable/ErrorToast";
import StaffMemberInformation from "../../components/Staff/StaffMemberInformation";
import StaffMemberPermissions from "../../components/Staff/StaffMemberPermissions";
import Flex from "../../components/StyledComponents/Flex";
import Grid, { GridWrapper } from "../../components/StyledComponents/Grid";
import { userPermissions } from "../../data/userPermissions";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import { deleteStaffMember, getStaffMember } from "../../utils/queries";

const StaffMember = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { data } = useQuery<STAFF_MEMBER>(
    ["staff-member", id],
    () => getStaffMember(id),
    { suspense: true }
  );

  const {
    mutateAsync: deleteStaff,
    isError: deleteError,
    reset,
  } = useMutation(deleteStaffMember, {
    onSuccess: () => {
      queryClient.setQueryData<STAFF_MEMBER[] | undefined>(
        "staff-members",
        (prev) => {
          return prev?.filter((i) => i.id !== parseInt(id));
        }
      );
      history.replace("/settings/staff");
    },
  });
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
  const handleDeleteStaffMember = async () => {
    try {
      await deleteStaff(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Grid cols="1fr 0.5fr" gap="1rem">
          <Breadcrumbs
            childLabel="Staff Member"
            parentLabel="Staff"
            parentTarget="/settings/staff"
          />
          <Flex margin="1rem" justify="flex-end">
            <Button
              type="submit"
              text="Save Changes"
              padding="0.5rem"
              bg="green"
              withTransition
              margin="0 1rem"
              withRipple
              textSize="0.9rem"
            />
            <Button
              text="Delete Staff Member"
              padding="0.5rem"
              Icon={RiDeleteBinLine}
              bg="danger"
              iconSize={20}
              textSize="0.9rem"
              withRipple
              onClick={() => {
                setModalOpen(true);
              }}
            />
          </Flex>
        </Grid>
      </Container>

      <StaffMemberInformation
        register={register}
        errors={errors}
        control={control}
      />
      {role === "STAFF" && (
        <StaffMemberPermissions
          setValue={setValue}
          control={control}
          permissions={userPermissions}
        />
      )}
      <CSSTransition
        in={deleteError}
        classNames="error-toast"
        unmountOnExit
        timeout={200}
      >
        <ErrorToast
          text="Something Went Wrong"
          btnText="Close"
          closeFunction={reset}
        />
      </CSSTransition>
      <ConfirmationModal
        isOpen={modalOpen}
        closeFunction={() => setModalOpen(false)}
        desc="Are you sure you want to delete this Staff Member ?"
        successButtonText="Delete"
        successFunction={() => handleDeleteStaffMember()}
        title="Delete Staff Member"
        styles={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      />
    </form>
  );
};

export default StaffMember;
const Container = styled.div`
  margin-bottom: 1rem;
  ${GridWrapper} {
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
  }
`;
