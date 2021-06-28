import React, { useMemo, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useToast from "../../../hooks/useToast";
import { PRODUCT } from "../../../interfaces/products/products";
import extractError from "../../../utils/extractError";
import {
  deleteMultipleProducts,
  deleteProduct,
  getProducts,
} from "../../../utils/queries";
import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead";
import Flex, { FlexWrapper } from "../../StyledComponents/Flex";
import ProductItem from "./ProductItem";
import Spinner from "react-loader-spinner";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { IoCloseCircleOutline } from "react-icons/io5";
const ProductsList = () => {
  const { search } = useQueryParams();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { handleCloseConfirmationModal } = useConfirmationModal();

  const history = useHistory();

  const { setToastStatus, handleCloseToast } = useToast();

  const queryClient = useQueryClient();

  const [sortBy, setSortBy] = useState<{
    field: string;
    order: "asc" | "desc";
  }>({
    field: "created_at",
    order: "desc",
  });

  const {
    data,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["products", sortBy, search],
    ({ pageParam = 1 }) => getProducts(sortBy, pageParam, search as string),
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

  // Delete Mutation
  const {
    mutateAsync,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteProduct, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("products");
    },
  });
  // Multiple Delete Mutation
  const {
    mutateAsync: deleteMultiple,
    reset: resetMultipleDelete,
    isLoading: multipleDeleteLoading,
  } = useMutation(deleteMultipleProducts, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("products");
    },
  });

  const handleDeleteProduct = async (id: number) => {
    try {
      await mutateAsync(id.toString());
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Deleted Successfully",
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
  const handleDeleteMultipleProducts = async (ids: number[]) => {
    try {
      await deleteMultiple(ids);
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Products Deleted Successfully",
        type: "success",
      });
      setSelectedRows([]);
    } catch (error) {
      handleCloseConfirmationModal?.();

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
      { title: " ", sortable: false },
      { title: "id", sortable: false },
      { title: "image", sortable: false },
      {
        title: "name",
        sortable: true,
        cb: () => {
          if (sortBy.field === "name") {
            if (sortBy.order === "asc") {
              setSortBy({ field: "name", order: "desc" });
            } else {
              setSortBy({ field: "name", order: "asc" });
            }
          } else {
            setSortBy({ field: "name", order: "desc" });
          }
        },
      },
      { title: "quantity", sortable: false },
      {
        title: "price",
        sortable: true,
        cb: () => {
          if (sortBy.field === "price") {
            if (sortBy.order === "asc") {
              setSortBy({ field: "price", order: "desc" });
            } else {
              setSortBy({ field: "price", order: "asc" });
            }
          } else {
            setSortBy({ field: "price", order: "desc" });
          }
        },
      },
      { title: "category", sortable: false },
      { title: "status", sortable: false },
      { title: "actions", sortable: false },
    ],
    [sortBy.field, sortBy.order]
  );
  const handleToggleRows = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prev) => prev.filter((i) => i !== rowId));
    } else {
      setSelectedRows((prev) => [...prev, rowId]);
    }
  };
  if (status === "loading") return <LoadingTable />;
  console.log(search);
  return (
    <>
      {data?.pages[0].data.length !== 0 && (
        <Flex margin="1rem 0" justify="flex-end">
          <p>Selected Rows ({selectedRows.length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              width="100%"
              disabled={selectedRows.length === 0 || multipleDeleteLoading}
              bg="danger"
              padding="0.25rem"
              textSize="0.8rem"
              text={`Delete ${
                selectedRows.length > 0 ? selectedRows.length : ""
              } Products`}
              withRipple
              withTransition
              isLoading={multipleDeleteLoading}
              onClick={() => {
                handleDeleteMultipleProducts(selectedRows);
              }}
            />
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
              text="Clear search"
              withRipple
              withTransition
              isLoading={multipleDeleteLoading}
              onClick={() => {
                history.replace("/products");
              }}
            />
          </Flex>
        </SearchContainer>
      )}
      <Container>
        {data?.pages[0].data.length !== 0 && (
          <TableHead
            activeSortBy={sortBy.field}
            activeOrder={sortBy.order}
            cols={cols}
            gridCols="50px 50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr "
          />
        )}
        <div className="table">
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
        </div>
        {data?.pages.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group.data.map((product: PRODUCT) => (
                <ProductItem
                  handleDeleteProduct={handleDeleteProduct}
                  key={product.id}
                  product={product}
                  selectedRows={selectedRows}
                  handleToggleRows={handleToggleRows}
                />
              ))}
            </React.Fragment>
          );
        })}
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

export default ProductsList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};

  position: relative;
  .table {
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
