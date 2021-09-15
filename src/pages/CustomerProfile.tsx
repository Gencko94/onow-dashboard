import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import CustomerProfileInfo from "../components/CustomerProfile/CustomerProfileInfo";
import CustomerOrders from "../components/CustomerProfile/CustomerOrders/CustomerOrders";
import Breadcrumbs from "../components/reusable/Breadcrumbs";
import Button from "../components/reusable/Button";

import Flex from "../components/StyledComponents/Flex";
import useToast from "../hooks/useToast";
import { CUSTOMER } from "../interfaces/customers/customers";
import extractError from "../utils/extractError";
import { deleteCustomer, getSingleCustomer } from "../utils/queries";
import Heading from "../components/StyledComponents/Heading";
import Spacer from "../components/reusable/Spacer";
import styled from "styled-components";

import CustomerInsights from "../components/CustomerProfile/CustomerInsights";
import { useState } from "react";
import EditCustomerModal from "../components/CustomerProfile/EditCustomerModal";
import useConfirmationModal from "../hooks/useConfirmationModal/useConfirmationModal";

const CustomerProfile = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const { replace } = useHistory();
  const { id } = useParams<{ id: string }>();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const { data } = useQuery<CUSTOMER>(
    ["customer", parseInt(id)],
    () => getSingleCustomer(id),
    {
      suspense: true,
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

  return (
    <>
      <Heading tag="h5" type="large-title">
        Customer
      </Heading>
      <Breadcrumbs
        withoutTitle
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
          onClick={() => {
            setModalOpen(true);
          }}
          withTransition
          color="green"
        >
          Edit customer
        </Button>
        <Spacer size={10} />
        <Button
          type="button"
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
          Delete customer
        </Button>
      </Flex>
      <Spacer size={40} />

      <Grid>
        <CustomerProfileInfo data={data!} />

        <CustomerInsights data={data!} />
      </Grid>

      <Spacer size={40} />
      <CustomerOrders customerId={data!.id} />
      <EditCustomerModal
        data={data!}
        open={modalOpen}
        closeFunction={() => setModalOpen(false)}
      />
    </>
  );
};

export default CustomerProfile;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    grid-template-columns: 1fr 0.8fr;
  }
`;
