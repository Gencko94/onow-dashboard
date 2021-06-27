import { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import CustomerProfileInfo from "../components/CustomerProfile/CustomerProfileInfo";
import CustomerOrders from "../components/CustomerProfile/CustomerOrders/CustomerOrders";
import Breadcrumbs from "../components/reusable/Breadcrumbs";
import Button from "../components/reusable/Button";
import HeaderContainer from "../components/reusable/HeaderContainer";
import Flex from "../components/StyledComponents/Flex";
import Hr from "../components/StyledComponents/Hr";
import useConfirmationModal from "../hooks/useConfirmationModal";
import useToast from "../hooks/useToast";
import { CUSTOMER } from "../interfaces/customers/customers";
import extractError from "../utils/extractError";
import {
  deleteCustomer,
  editCustomer,
  getSingleCustomer,
} from "../utils/queries";

const CustomerProfile = () => {
  const queryClient = useQueryClient();
  const { replace } = useHistory();
  const { id } = useParams<{ id: string }>();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const { data, isLoading } = useQuery<CUSTOMER>(
    ["customer", id],
    () => getSingleCustomer(id),
    {
      suspense: true,
    }
  );
  const { mutateAsync: editMutation, isLoading: editLoading } = useMutation(
    editCustomer,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["coupon", id], (prev) => {
          return data;
        });
        replace("/coupons");
      },
    }
  );
  // Delete Mutation
  const {
    mutateAsync: deleteCustomerMutation,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteCustomer, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("products");
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CUSTOMER>({ defaultValues: data });
  const handleDeleteCustomer = async () => {
    try {
      await deleteCustomerMutation(data!.id);
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Customer Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  const onSubmit: SubmitHandler<CUSTOMER> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderContainer>
        <Breadcrumbs
          childLabel="Customer Profile"
          parentLabel="Customers"
          parentTarget="/customers"
        />
        <Flex justify="flex-end">
          <Button
            withTransition
            text="Save Changes"
            type="submit"
            padding="0.5rem"
            bg="green"
            withRipple
            margin="0 1rem"
            textSize="0.9rem"
            isLoading={editLoading}
            disabled={editLoading}
          />
          <Button
            withTransition
            textSize="0.9rem"
            text="Delete Customer"
            padding="0.5rem"
            bg="danger"
            withRipple
            Icon={RiDeleteBinLine}
            iconSize={20}
            onClick={() =>
              setConfirmationModalStatus?.({
                closeCb: handleCloseConfirmationModal!,
                desc: "Are you sure you want to delete this customer ?",
                open: true,
                successCb: () => handleDeleteCustomer(),
                title: "Delete Customer",
              })
            }
          />
        </Flex>
      </HeaderContainer>

      <CustomerProfileInfo
        register={register}
        errors={errors}
        control={control}
        joinDate={data!.join_date}
      />
      <Hr />
      <CustomerOrders customerId={data!.id} />
    </form>
  );
};

export default CustomerProfile;
