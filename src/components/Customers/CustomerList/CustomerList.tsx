import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useToast from "../../../hooks/useToast";
import { CUSTOMER } from "../../../interfaces/customers/customers";
import extractError from "../../../utils/extractError";
import {
  deleteCustomer,
  deleteMultipleCustomers,
  getCustomers,
} from "../../../utils/queries";
import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import TableHead from "../../reusable/TableHead";
import Flex, { FlexWrapper } from "../../StyledComponents/Flex";
import CustomerItem from "./CustomerItem/CustomerItem";
import Spinner from "react-loader-spinner";
import LoadingTable from "../../reusable/LoadingTable";
type GET_CUSTOMER_RES = {
  data: CUSTOMER[];
  currentPage: number;
  lastPage: number;
};
const CustomerList = ({
  setModalOpen,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { search } = useQueryParams();

  // const { data } = useQuery<CUSTOMER[]>("customers", getCustomers, {
  //   suspense: true,
  // });
  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GET_CUSTOMER_RES>(
    "customers",
    ({ pageParam = 1 }) => getCustomers(pageParam, search as string),
    {
      keepPreviousData: search !== "" ? false : true,

      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();

  const history = useHistory();

  const { setToastStatus, handleCloseToast } = useToast();

  const queryClient = useQueryClient();

  // Delete Mutation
  const {
    mutateAsync: deleteCustomerMutation,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteCustomer, {
    onSuccess: (data, customerId) => {
      queryClient.invalidateQueries("customers");
    },
  });
  // Multiple Delete Mutation
  const {
    mutateAsync: deleteMultiple,
    reset: resetMultipleDelete,
    isLoading: multipleDeleteLoading,
  } = useMutation(deleteMultipleCustomers, {
    onSuccess: (data, customerId) => {
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
  const handleDeleteMultipleCustomers = async (ids: number[]) => {
    try {
      handleCloseConfirmationModal?.();
      await deleteMultiple(ids);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Customers Deleted Successfully",
        type: "success",
      });
      setSelectedRows([]);
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
      } else {
        setToastStatus?.({
          fn: () => {
            resetMultipleDelete();
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
  if (status === "loading") return <LoadingTable />;
  return (
    <>
      {status === "success" && data?.pages[0].data.length !== 0 && (
        <Flex margin="1rem 0" justify="flex-end">
          <p>Selected Rows ({selectedRows.length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              width="100%"
              disabled={selectedRows.length === 0 || multipleDeleteLoading}
              bg="danger"
              padding="0.25rem"
              textSize="0.8rem"
              withRipple
              withTransition
              isLoading={multipleDeleteLoading}
              onClick={() => {
                setConfirmationModalStatus?.({
                  closeCb: handleCloseConfirmationModal!,
                  desc: `Are you sure you want to delete ${selectedRows.length} customers ?`,
                  open: true,
                  successCb: () => {
                    handleDeleteMultipleCustomers(selectedRows);
                  },
                  title: "Delete Customers",
                });
              }}
            >
              Delete {selectedRows.length > 0 ? selectedRows.length : ""}{" "}
              Customers
            </Button>
          </Flex>
        </Flex>
      )}
      {search && (
        <SearchContainer>
          <p className="search-text">
            Search Results for{" "}
            <strong>
              <i>{search}</i>
            </strong>
          </p>
          <Flex margin="0 0.5rem" items="center">
            <Button
              Icon={IoCloseCircleOutline}
              iconSize={20}
              width="100%"
              bg="danger"
              margin="0 2rem"
              padding="0.25rem"
              textSize="0.7rem"
              withRipple
              withTransition
              isLoading={multipleDeleteLoading}
              onClick={() => {
                history.replace("/customers");
              }}
            >
              Clear search
            </Button>
          </Flex>
        </SearchContainer>
      )}

      <Container>
        <div className="table">
          {data?.pages[0].data.length !== 0 && (
            <TableHead
              // activeSortBy={sortBy.field}
              // activeOrder={sortBy.order}
              cols={cols}
              gap="0.5rem"
              gridCols="repeat(1, minmax(35px, 50px)) repeat(
                4,
                minmax(100px, 1fr)
              );"
            />
          )}
          {isFetching && (
            <div className="loading">
              <Spinner type="TailSpin" width={30} color="#f78f21" />
            </div>
          )}
          {data?.pages[0].data.length === 0 && (
            <EmptyTable
              iconImage="/images/food.png"
              text="Oops, we didn't find any customers !"
              height="400px"
              withButton
              btnText="Create New Customer"
              cb={() => setModalOpen(true)}
            />
          )}
          {data?.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.data.map((customer) => (
                  <CustomerItem
                    selectedRows={selectedRows}
                    handleDeleteCustomer={handleDeleteCustomer}
                    key={customer.id}
                    customer={customer}
                    handleToggleRows={handleToggleRows}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
      {hasNextPage && (
        <Flex margin="2rem 0" justify="center">
          <Button
            isLoading={isFetchingNextPage}
            disabled={isFetchingNextPage}
            withRipple
            bg="green"
            padding="0.25rem 0.5rem"
            textSize="0.8rem"
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load more
          </Button>
        </Flex>
      )}
    </>
  );
};

export default CustomerList;

const Container = styled.div`
  border-radius: 6px;
  border: ${(props) => props.theme.border};

  position: relative;
  .table {
    overflow-x: auto;
    background-color: #fff;
  }
  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;
const SearchContainer = styled(FlexWrapper)`
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 6px;
  margin: 1rem 0;
  .search-text {
    font-size: 0.9rem;
  }
`;
