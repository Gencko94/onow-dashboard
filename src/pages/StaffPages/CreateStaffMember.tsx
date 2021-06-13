import { SubmitHandler, useForm } from "react-hook-form";
import { FiCheck } from "react-icons/fi";
import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Button from "../../components/reusable/Button";
import NewStaffMemberInformation from "../../components/Staff/NewStaffMemberInformation";
import StaffMemberPermissions from "../../components/Staff/StaffMemberPermissions";
import Flex from "../../components/StyledComponents/Flex";
import { userPermissions } from "../../data/userPermissions";
import { NEW_STAFF_MEMBER } from "../../interfaces/staff/staff";

const CreateStaffMember = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NEW_STAFF_MEMBER>({
    defaultValues: {
      permissions: {
        customers: {
          createCustomer: true,
          deleteCustomer: true,
          editCustomer: true,
          visitCustomers: false,
        },
        orders: {
          createOrder: true,
          deleteOrder: true,
          editOrder: true,
          visitOrders: true,
        },
        products: {
          createProduct: true,
          deleteProduct: true,
          editProduct: true,
          hideProduct: true,
          visitProducts: true,
        },
      },
    },
  });
  const role = watch("role");
  const onSubmit: SubmitHandler<NEW_STAFF_MEMBER> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Breadcrumbs
        childLabel="Create Staff Member"
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
          />
        </Flex>
        <NewStaffMemberInformation
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

export default CreateStaffMember;
