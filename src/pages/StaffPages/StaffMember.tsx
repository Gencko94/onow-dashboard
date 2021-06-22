import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import ConfirmationModal from "../../components/reusable/ConfirmationModal";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import StaffMemberInformation from "../../components/Staff/StaffMemberInformation";
import StaffMemberPermissions from "../../components/Staff/StaffMemberPermissions";
import Flex from "../../components/StyledComponents/Flex";
import { userPermissions } from "../../data/userPermissions";
import useToast from "../../hooks/useToast";
import { STAFF_MEMBER } from "../../interfaces/staff/staff";
import extractError from "../../utils/extractError";
import {
  deleteStaffMember,
  editStaffMember,
  getStaffMember,
} from "../../utils/queries";

const StaffMember = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { setToastStatus, handleCloseToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { data } = useQuery<STAFF_MEMBER>(
    ["staff-member", id],
    () => getStaffMember(id),
    { suspense: true }
  );

  const { mutateAsync: deleteStaff, reset: resetDelete } = useMutation(
    deleteStaffMember,
    {
      onSuccess: () => {
        queryClient.setQueryData<STAFF_MEMBER[] | undefined>(
          "staff-members",
          (prev) => {
            return prev?.filter((i) => i.id !== parseInt(id));
          }
        );
        history.replace("/settings/staff");
      },
    }
  );
  const { mutateAsync: editStaff, reset: resetEdit } =
    useMutation(editStaffMember);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<STAFF_MEMBER>({
    defaultValues: {
      ...data,
      permissions: data?.permissions.map((i: any) => i.name),
    },
  });
  const role = watch("role");
  const permissions = watch("permissions");
  console.log(permissions, "Acual Data");
  const onSubmit: SubmitHandler<STAFF_MEMBER> = async (data) => {
    console.log(data);
    try {
      await editStaff(data);
      setToastStatus?.({
        open: true,
        text: "Changes saved successfully",
        fn: () => {
          handleCloseToast?.();
        },
        type: "success",
      });
    } catch (error) {
      const { responseError, unknownError } = extractError(error);
      if (responseError) {
        console.log(responseError);
        setToastStatus?.({
          open: true,
          text: JSON.stringify(responseError),
          fn: () => {
            resetEdit();
          },
          type: "error",
        });
      } else if (unknownError) {
        setToastStatus?.({
          open: true,
          text: "Something Went Wrong",
          fn: () => {
            resetEdit();
          },
          type: "error",
        });
      }
    }
  };

  const handleDeleteStaffMember = async () => {
    try {
      await deleteStaff(id);
    } catch (error) {
      const { responseError, unknownError } = extractError(error);
      if (responseError) {
        console.log(responseError);
      } else if (unknownError) {
        setToastStatus?.({
          open: true,
          text: "Something Went Wrong",
          fn: () => {
            resetDelete();
          },
          type: "error",
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
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
      </HeaderContainer>

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
