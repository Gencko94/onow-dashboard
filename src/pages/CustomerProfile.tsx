import { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
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
  const { data } = useQuery<CUSTOMER>(
    ["customer", id],
    () => getSingleCustomer(id),
    {
      suspense: true,
    }
  );
  const { mutateAsync: editMutation, isLoading: editLoading } = useMutation(
    editCustomer,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
      },
      onError: (error) => {
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
      },
    }
  );
  // Delete Mutation
  const {
    mutateAsync: deleteCustomerMutation,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries("customers");
      replace("/customers");
    },
    onError: (error) => {
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
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CUSTOMER>({ defaultValues: data });
  const handleDeleteCustomer = async () => {
    handleCloseConfirmationModal?.();
    await deleteCustomerMutation(data!.id);
    setToastStatus?.({
      fn: () => {
        handleCloseToast?.();
      },
      open: true,
      text: "Customer Deleted Successfully",
      type: "success",
    });
  };
  const onSubmit: SubmitHandler<CUSTOMER> = async (data) => {
    console.log(data);
    await editMutation(data);
    setToastStatus?.({
      fn: () => {
        handleCloseToast?.();
      },
      open: true,
      text: "Customer Updated Successfully",
      type: "success",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderContainer>
          <Breadcrumbs
            children={[
              {
                name: { ar: "المستخدمين", en: "Customers" },
                target: "/customers",
              },
              {
                name: { ar: "ملف المستخدم", en: "Customer" },
                target: "",
              },
            ]}
          />
          <Flex justify="flex-end">
            <Button
              withTransition
              color="danger"
              isLoading={deleteLoading}
              disabled={deleteLoading}
              onClick={() =>
                setConfirmationModalStatus?.({
                  closeCb: handleCloseConfirmationModal!,
                  desc: "Are you sure you want to delete this customer ?",
                  open: true,
                  successCb: () => handleDeleteCustomer(),
                  title: "Delete Customer",
                })
              }
            >
              Delete Customer
            </Button>
          </Flex>
        </HeaderContainer>

        <CustomerProfileInfo
          register={register}
          errors={errors}
          control={control}
          joinDate={data!.join_date}
        />
        <Flex justify="center">
          <Button
            withTransition
            type="submit"
            color="green"
            margin="0 1rem"
            isLoading={editLoading}
            disabled={editLoading}
          >
            Save Changes
          </Button>
        </Flex>
      </form>
      <Hr />
      <CustomerOrders customerId={data!.id} />
    </>
  );
};

export default CustomerProfile;
