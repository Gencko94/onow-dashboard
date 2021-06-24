import React, { useMemo, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useToast from "../../../hooks/useToast";
import { CATEGORY } from "../../../interfaces/categories/categories";
import extractError from "../../../utils/extractError";
import { deleteCategory, getCategories } from "../../../utils/queries";
import Button from "../../reusable/Button";
import ConfirmationModal from "../../reusable/ConfirmationModal";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead";
import Flex from "../../StyledComponents/Flex";
import CategoryItem from "./CategoryItem";
import Spinner from "react-loader-spinner";

interface GET_CATEGORIES_RES {
  data: CATEGORY[];
  currentPage: number;
  lastPage: number;
}

const CategoriesList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const history = useHistory();

  const { setToastStatus, handleCloseToast } = useToast();

  const [modalStatus, setModalStatus] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });

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
  // Delete Mutation
  const {
    mutateAsync,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteCategory, {
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
      { title: "name", sortable: false },
      { title: "image", sortable: false },
      { title: "numberOfProducts", sortable: false },
      { title: "status", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  const handleDeleteCategory = async (id: number) => {
    try {
      await mutateAsync(id.toString());
      setModalStatus({ id: null, open: false });
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      setModalStatus({ id: null, open: false });
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
      <Container>
        <Flex justify="flex-end" margin="1rem 0 ">
          <p>Selected Rows ({selectedRows.length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              disabled={selectedRows.length === 0}
              bg="danger"
              padding="0.25rem"
              textSize="0.8rem"
              text="Delete Categories"
              withRipple
              withTransition
            />
          </Flex>
        </Flex>
        {data?.pages[0].data.length !== 0 && (
          <TableHead cols={cols} gridCols="100px 1fr 1fr 1fr 1fr 1fr " />
        )}

        <div>
          {isFetching && (
            <div className="loading">
              <Spinner type="TailSpin" width={30} color="#f78f21" />
            </div>
          )}
          {data?.pages[0].data.length === 0 && (
            <EmptyTable
              iconImage="/images/food.png"
              text="Oops, we didn't find any products !"
              height="400px"
              withButton
              btnText="Create New Product"
              cb={() => history.push("/products/product/create")}
            />
          )}
          {data?.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.data.map((category: CATEGORY) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    setModalStatus={setModalStatus}
                    selectedRows={selectedRows}
                    handleToggleRows={handleToggleRows}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </div>
        <ConfirmationModal
          isOpen={modalStatus.open}
          closeFunction={() => setModalStatus({ id: null, open: false })}
          desc="Are you sure you want to delete this product ?"
          successButtonText="Delete"
          successFunction={() => handleDeleteCategory(modalStatus.id!)}
          title="Delete Product"
          isLoading={deleteLoading}
          styles={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        />
      </Container>
      {hasNextPage && (
        <Flex margin="2rem 0" justify="center">
          <Button
            isLoading={isFetchingNextPage}
            disabled={isFetchingNextPage}
            withRipple
            text="Load More"
            bg="green"
            padding="0.25rem 0.5rem"
            textSize="0.8rem"
            onClick={() => {
              fetchNextPage();
            }}
          />
        </Flex>
      )}
    </>
  );
};

export default CategoriesList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
  position: relative;
  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;
