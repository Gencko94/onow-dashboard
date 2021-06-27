import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useToast from "../../../hooks/useToast";
import { CUSTOMER } from "../../../interfaces/customers/customers";
import extractError from "../../../utils/extractError";
import { deleteCustomer, getCustomers } from "../../../utils/queries";
import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import TableHead from "../../reusable/TableHead";
import Flex from "../../StyledComponents/Flex";
import CustomerItem from "./CustomerItem/CustomerItem";

const CustomerList = () => {
  const { data } = useQuery<CUSTOMER[]>(["customers"], () => getCustomers(), {
    suspense: true,
  });
  const { search } = useQueryParams();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { handleCloseConfirmationModal } = useConfirmationModal();

  const history = useHistory();

  const { setToastStatus, handleCloseToast } = useToast();

  const queryClient = useQueryClient();

  // Delete Mutation
  const {
    mutateAsync: deleteCustomerMutation,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteCustomer, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("customers");
    },
  });
  const handleDeleteCustomer = async (id: number) => {
    try {
      await deleteCustomerMutation(id);
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
  const cols = useMemo(
    () => [
      { title: "", sortable: false },
      { title: "customerName", sortable: true },
      { title: "customerPhone", sortable: true },
      { title: "customerEmail", sortable: true },
      { title: "actions", sortable: false },
    ],
    []
  );
  const handleToggleRows = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prev) => prev.filter((i) => i !== rowId));
    } else {
      setSelectedRows((prev) => [...prev, rowId]);
    }
  };
  return (
    <>
      {data?.length !== 0 && (
        <Flex margin="1rem 0" justify="flex-end">
          <p>Selected Rows ({selectedRows.length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              width="100%"
              // disabled={selectedRows.length === 0 || multipleDeleteLoading}
              bg="danger"
              padding="0.25rem"
              textSize="0.8rem"
              text={`Delete ${
                selectedRows.length > 0 ? selectedRows.length : ""
              } Customers`}
              withRipple
              withTransition
              // isLoading={multipleDeleteLoading}
              onClick={() => {
                // handleDeleteMultipleProducts(selectedRows);
              }}
            />
          </Flex>
        </Flex>
      )}
      <Container>
        <TableHead cols={cols} gridCols="100px 1fr 1fr 1fr 0.5fr" />
        {data!.length === 0 && (
          <EmptyTable height="300px" text="No Customers were Added " />
        )}
        {data!.map((customer) => (
          <CustomerItem
            selectedRows={selectedRows}
            handleDeleteCustomer={handleDeleteCustomer}
            key={customer.id}
            customer={customer}
            handleToggleRows={handleToggleRows}
          />
        ))}
      </Container>
    </>
  );
};

export default CustomerList;

const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;
