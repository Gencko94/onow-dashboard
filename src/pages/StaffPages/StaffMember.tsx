import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import Spacer from "../../components/reusable/Spacer";

import StaffMemberInformation from "../../components/Staff/StaffMemberInformation";
import StaffMemberPermissions from "../../components/Staff/StaffMemberPermissions";
import Flex from "../../components/StyledComponents/Flex";
import Heading from "../../components/StyledComponents/Heading";
import { userPermissions } from "../../data/userPermissions";
import useConfirmationModal from "../../hooks/useConfirmationModal";
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
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const history = useHistory();
  const { data } = useQuery<STAFF_MEMBER>(
    ["staff-member", id],
    () => getStaffMember(parseInt(id)),
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
      await deleteStaff(data!.id);
    } catch (error) {
      const { responseError, unknownError } = extractError(error);
      if (responseError) {
        console.log(responseError);
        setToastStatus?.({
          open: true,
          text: "Something Went Wrong",
          fn: () => {
            resetDelete();
          },
          type: "error",
        });
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
      <Heading tag="h5" type="large-title">
        Staff Member
      </Heading>
      <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "الإعدادات", en: "Settings" },
            target: "/settings",
          },
          {
            name: { ar: "أعضاء المتجر", en: "Store Staff" },
            target: "/settings/staff",
          },
          {
            name: { ar: "بيانات العضو", en: "Staff Member Details" },
            target: "",
          },
        ]}
      />
      <Flex margin="1rem" justify="flex-end">
        <Button type="submit" color="green" withTransition margin="0 1rem">
          Save Changes
        </Button>
        <Spacer size={10} />
        <Button
          color="danger"
          onClick={() => {
            setConfirmationModalStatus?.({
              open: true,
              desc: "Are you sure you want to delete this Staff Member ?",
              title: "Delete Product",
              closeCb: handleCloseConfirmationModal!,
              successCb: () => handleDeleteStaffMember(),
            });
          }}
        >
          Delete Staff Member
        </Button>
      </Flex>
      <Spacer size={40} />

      <StaffMemberInformation
        register={register}
        errors={errors}
        control={control}
      />
      <Spacer size={40} />
      {role === "STAFF" && (
        <StaffMemberPermissions
          setValue={setValue}
          control={control}
          permissions={userPermissions}
        />
      )}
    </form>
  );
};

export default StaffMember;
