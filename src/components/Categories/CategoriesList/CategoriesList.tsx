import React, { useMemo, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useToast from "../../../hooks/useToast";
import { CATEGORY } from "../../../interfaces/categories/categories";
import extractError from "../../../utils/extractError";
import {
  activateCategory,
  deleteCategory,
  deleteMultipleCategories,
  getCategories,
} from "../../../utils/queries";
import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead";
import Flex from "../../StyledComponents/Flex";
import CategoryItem from "./CategoryItem";
import Spinner from "react-loader-spinner";
import useConfirmationModal from "../../../hooks/useConfirmationModal";

interface GET_CATEGORIES_RES {
  data: CATEGORY[];
  currentPage: number;
  lastPage: number;
}

const CategoriesList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const history = useHistory();

  const { setToastStatus, handleCloseToast } = useToast();

  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();

  const queryClient = useQueryClient();
  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GET_CATEGORIES_RES>(
    "categories",
    ({ pageParam = 1 }) => getCategories(pageParam),
    {
      keepPreviousData: true,

      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  // Activate Mutation
  const {
    mutateAsync: activationMutation,
    reset: resetActivation,
    isLoading: activationLoading,
  } = useMutation(activateCategory, {
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries("categories");
    },
  });
  // Delete Mutation
  const { mutateAsync, reset } = useMutation(deleteCategory, {
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries("categories");
      // queryClient.setQueryData<PRODUCT[] | undefined>("products", (prev) => {
      //   return prev?.filter((i) => i.id !== parseInt(productId));
      // });
    },
  });
  // Delete multiple Mutation
  const {
    mutateAsync: multipleMutation,
    reset: multipleReset,
    isLoading: multipleLoading,
  } = useMutation(deleteMultipleCategories, {
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries("categories");
      // queryClient.setQueryData<PRODUCT[] | undefined>("products", (prev) => {
      //   return prev?.filter((i) => i.id !== parseInt(productId));
      // });
    },
  });
  const cols = useMemo(
    () => [
      { title: "", sortable: false },
      { title: "ID", sortable: false },
      { title: "image", sortable: false },
      { title: "name", sortable: false },

      { title: "status", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  const handleActivateCategory = async (id: number, active: number) => {
    try {
      await activationMutation({ id, active });
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Category Status Changed",
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
            resetActivation();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  const handleDeleteCategory = async (id: number) => {
    try {
      await mutateAsync(id.toString());
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Category Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();
      const { responseError } = extractError(error);
      if (responseError) {
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
  const handleDeleteMultipleCategories = async (ids: number[]) => {
    try {
      handleCloseConfirmationModal?.();
      await multipleMutation(ids);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Categories Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();
      const { responseError } = extractError(error);
      if (responseError) {
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
      {data?.pages[0].data.length !== 0 && (
        <Flex justify="flex-start" margin="1rem 0 " items="center">
          <p>Selected Rows ({selectedRows.length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              size="sm"
              disabled={selectedRows.length === 0 || multipleLoading}
              color="danger"
              isLoading={multipleLoading}
              withTransition
              onClick={() => {
                setConfirmationModalStatus?.({
                  closeCb: handleCloseConfirmationModal!,
                  desc: "Are you sure you want to delete these categories ?",
                  open: true,
                  successCb: () => {
                    handleDeleteMultipleCategories(selectedRows);
                  },
                  title: "Delete Categories",
                });
              }}
            >
              Delete Categories
            </Button>
          </Flex>
        </Flex>
      )}
      <Container>
        <div className="table">
          {data?.pages[0].data.length !== 0 && (
            <TableHead
              cols={cols}
              gap="0"
              gridCols="repeat(2, 85px) repeat(4, minmax(100px, 1fr))"
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
              text="Oops, we didn't find any categories !"
              height="400px"
              withButton
              btnText="Create New Category"
              cb={() => history.push("/categories/category/create")}
            />
          )}
          {data?.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.data.map((category: CATEGORY) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    selectedRows={selectedRows}
                    handleToggleRows={handleToggleRows}
                    handleDeleteCategory={handleDeleteCategory}
                    handleActivateCategory={handleActivateCategory}
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
            color="green"
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

export default CategoriesList;
const Container = styled.div`
  position: relative;

  border-bottom: none;
  .table {
    border: ${(props) => props.theme.border};
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 20px;
    overflow-x: auto;
    background-color: ${(props) => props.theme.subtleBackground};
  }
  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;
