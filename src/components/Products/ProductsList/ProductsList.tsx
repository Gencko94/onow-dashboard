import React, { useContext, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useToast from "../../../hooks/useToast";
import { PRODUCT } from "../../../interfaces/products/products";
import extractError from "../../../utils/extractError";
import {
  activateProduct,
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
import { IoCloseCircleOutline } from "react-icons/io5";
import { ApplicationProvider } from "../../../contexts/ApplicationContext";
import { useDebounce } from "use-debounce/lib";
const ProductsList = () => {
  // const { search } = useQueryParams();
  const {
    globalSearchBarValue,
    handleChangeGlobalSearchBar,
    globalSearchType,
    handleChangeGlobalSearchType,
  } = useContext(ApplicationProvider);
  const [debouncedSearchValue] = useDebounce(globalSearchBarValue, 500);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();

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
    ["products", sortBy, debouncedSearchValue],
    ({ pageParam = 1 }) =>
      getProducts(sortBy, pageParam, debouncedSearchValue as string),
    {
      keepPreviousData: globalSearchBarValue !== "" ? false : true,

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
  } = useMutation(activateProduct, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("products");
    },
  });
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
  useEffect(() => {
    if (globalSearchType !== "product") {
      handleChangeGlobalSearchType?.("product");
    }
  }, [globalSearchType, handleChangeGlobalSearchType]);
  const handleDeleteProduct = async (id: number) => {
    handleCloseConfirmationModal?.();
    try {
      await mutateAsync(id.toString());
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
  const handleActivateProduct = async (id: number, active: number) => {
    try {
      await activationMutation({ id, active });
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Status Changed",
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
  const handleDeleteMultipleProducts = async (ids: number[]) => {
    handleCloseConfirmationModal?.();
    try {
      await deleteMultiple(ids);
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

  return (
    <>
      {data?.pages[0].data.length !== 0 && (
        <Flex margin="1rem 0" justify="flex-end" items="center">
          <p>Selected Rows ({selectedRows.length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              disabled={selectedRows.length === 0 || multipleDeleteLoading}
              color="danger"
              withTransition
              isLoading={multipleDeleteLoading}
              onClick={() => {
                handleDeleteMultipleProducts(selectedRows);
              }}
            >
              Delete {selectedRows.length > 0 ? selectedRows.length : ""}{" "}
              Products
            </Button>
          </Flex>
        </Flex>
      )}
      {debouncedSearchValue && (
        <SearchContainer>
          <p className="search-text">
            Search Results for{" "}
            <strong>
              <i>{debouncedSearchValue}</i>
            </strong>
          </p>
          <Flex margin="0 0.5rem" items="center">
            <Button
              color="danger"
              margin="0 2rem"
              withTransition
              isLoading={multipleDeleteLoading}
              onClick={() => {
                handleChangeGlobalSearchBar?.("");
                history.replace("/products");
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
              activeSortBy={sortBy.field}
              activeOrder={sortBy.order}
              cols={cols}
              gap="0"
              gridCols="repeat(2, minmax(35px, 50px)) repeat(
                7,
                minmax(140px, 1fr)
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
                {group.data.map((product: PRODUCT) => (
                  <ProductItem
                    handleDeleteProduct={handleDeleteProduct}
                    key={product.id}
                    product={product}
                    selectedRows={selectedRows}
                    handleToggleRows={handleToggleRows}
                    handleActivateProduct={handleActivateProduct}
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

export default ProductsList;
const Container = styled.div`
  border-radius: 20px;
  border: ${(props) => props.theme.border};
  border-bottom: none;

  position: relative;
  .table {
    overflow-x: auto;
    overflow-y: hidden;
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
