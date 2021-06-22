import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import HeaderContainer from "../../components/reusable/HeaderContainer";
import NewStaffMemberInformation from "../../components/Staff/NewStaffMemberInformation";
import StaffMemberPermissions from "../../components/Staff/StaffMemberPermissions";
import Flex from "../../components/StyledComponents/Flex";
import { userPermissions } from "../../data/userPermissions";
import useToast from "../../hooks/useToast";
import { NEW_STAFF_MEMBER } from "../../interfaces/staff/staff";
import { createStaffMember } from "../../utils/queries";

const CreateStaffMember = () => {
  const { mutateAsync: createStaff, reset } = useMutation(createStaffMember);
  const { handleCloseToast, setToastStatus } = useToast();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<NEW_STAFF_MEMBER>({
    defaultValues: {
      permissions: [
        "createCustomer",
        "deleteCustomer",
        "editCustomer",
        "visitCustomers",
        "createProduct",
        "deleteProduct",
        "editProduct",
        "hideProduct",
        "visitProducts",
        "createOrder",
        "deleteOrder",
        "editOrder",
        "visitOrders",
      ],
    },
  });
  const roles = watch("roles");
  const onSubmit: SubmitHandler<NEW_STAFF_MEMBER> = async (data) => {
    console.log(data);
    try {
      await createStaff({
        ...data,
        branch_id: data.branch_id,
      });
    } catch (error) {
      if (error.response) {
        const errors = JSON.parse(error.response.data.error);
        if (errors.email.includes("The email has already been taken.")) {
          setError("email", {
            message: "The email has already been taken.",
            shouldFocus: true,
          });
        }
      } else {
        console.log(error);
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something Went Wrong",
          type: "error",
        });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderContainer>
          <Breadcrumbs
            childLabel="Create Staff Member"
            parentLabel="Staff"
            parentTarget="/settings/staff"
          />

          <Flex justify="flex-end">
            <Button
              type="submit"
              text="Save Changes"
              padding="0.5rem"
              bg="green"
              withTransition
            />
          </Flex>
        </HeaderContainer>
        <NewStaffMemberInformation
          register={register}
          errors={errors}
          control={control}
        />
        {roles === "STAFF" && (
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

export default CreateStaffMember;
