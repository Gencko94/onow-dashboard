import { SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
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
  const {
    mutateAsync: createStaff,
    reset,
    isLoading,
  } = useMutation(createStaffMember);
  const history = useHistory();
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
        // "deleteProduct",
        "editProduct",
        "hideProduct",
        "visitProduct",
        "createOrder",
        "deleteOrder",
        "editOrder",
        "visitOrders",
      ],
      roles: "ADMIN",
      branches: [],
    },
  });
  const roles = watch("roles");
  const onSubmit: SubmitHandler<NEW_STAFF_MEMBER> = async (data) => {
    console.log(data);
    try {
      await createStaff({
        ...data,
        branches: data.branches.map((branch: any) => branch.id),
        permissions: data.roles === "ADMIN" ? [] : data.permissions,
      });
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "User Created Successfully",
        type: "success",
      });
      history.replace("/settings/staff");
    } catch (error) {
      if (error.response) {
        const errors = JSON.parse(error.response.data.error);
        if (errors.email?.includes("The email has already been taken.")) {
          setError("email", {
            message: "The email has already been taken.",
          });
        } else if (errors.phone?.includes("phone belongs to another account")) {
          setError(
            "phone",
            {
              message: "The Phone Number has already been taken.",
            },
            { shouldFocus: true }
          );
          setToastStatus?.({
            fn: () => {
              reset();
              handleCloseToast?.();
            },
            open: true,
            text: "Phone Number has been taken",
            type: "error",
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
                name: { ar: "إضافة عضو جديد", en: "Create New Staff Member" },
                target: "",
              },
            ]}
          />

          <Flex justify="flex-end">
            <Button
              type="submit"
              padding="0.5rem"
              bg="green"
              withTransition
              Icon={BiPlus}
              isLoading={isLoading}
            >
              Create new Member
            </Button>
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
