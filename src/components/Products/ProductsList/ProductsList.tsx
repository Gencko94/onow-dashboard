import React, { useContext, useEffect, useMemo, useState } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { PRODUCT } from "../../../interfaces/products/products";

import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead/TableHead";
import Flex from "../../StyledComponents/Flex";
import ProductItem from "./ProductItem";
import Spinner from "react-loader-spinner";

import { ApplicationProvider } from "../../../contexts/ApplicationContext";
import { useDebounce } from "use-debounce/lib";
import { useGetProducts } from "../../../hooks/data-hooks/products/useGetProducts";

import { useDeleteMultipleProducts } from "../../../hooks/data-hooks/products/useDeleteMultipleProducts";
import { useToggleRows } from "../../../hooks/useToggleRows";
const ProductsList = () => {
  // const { search } = useQueryParams();
  const {
    globalSearchBarValue,
    handleChangeGlobalSearchBar,
    globalSearchType,
    handleChangeGlobalSearchType,
  } = useContext(ApplicationProvider);
  const [debouncedSearchValue] = useDebounce(globalSearchBarValue, 500);
  const { selectedRows, handleToggleRows, handleClearRows } = useToggleRows();
  const history = useHistory();

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
  } = useGetProducts({
    debouncedSearchValue,
    globalSearchBarValue,
    sortBy,
  });

  // Multiple Delete Mutation
  const { handleDeleteMultipleProducts, multipleDeleteLoading } =
    useDeleteMultipleProducts({
      successCallback: () => {
        handleClearRows();
      },
    });

  useEffect(() => {
    if (globalSearchType !== "product") {
      handleChangeGlobalSearchType?.("product");
    }
  }, [globalSearchType, handleChangeGlobalSearchType]);

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
              size="sm"
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
                    key={product.id}
                    product={product}
                    selectedRows={selectedRows}
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
  border-bottom: none;

  position: relative;
  .table {
    border-radius: 20px;
    border: ${(props) => props.theme.border};

    overflow-x: auto;
    overflow-y: hidden;
    border-radius: 20px;
    background-color: ${(props) => props.theme.subtleBackground};
  }
  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;
const SearchContainer = styled(Flex)`
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 6px;
  margin: 1rem 0;
  .search-text {
    font-size: 0.9rem;
  }
`;
