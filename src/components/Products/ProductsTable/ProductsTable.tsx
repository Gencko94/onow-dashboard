import React, { useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import Flex from "../../StyledComponents/Flex";
import { ApplicationProvider } from "../../../contexts/ApplicationContext";
import { useDebounce } from "use-debounce/lib";

import { useTable, useSortBy, Column, useRowSelect } from "react-table";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import ProductItemActions from "./ProductItemActions";
import { Table } from "../../reusable/Table/Table";
import { TableHead } from "../../reusable/Table/TableHead";
import { TableBodyRow } from "../../reusable/Table/TableBodyRow";
import { TableBodyData } from "../../reusable/Table/TableBodyData";
import { TableRowImage } from "../../reusable/Table/TableRowImage";
import Checkbox from "../../reusable/Inputs/Checkbox";
import { PRODUCT } from "../../../interfaces/products/products";
import Paragraph from "../../StyledComponents/Paragraph";
import { useDeleteMultipleProducts } from "../../../hooks/data-hooks/products/useDeleteMultipleProducts";
import Button from "../../reusable/Button";

interface IProps {
  data: any;
}

const ProductsTable = ({ data }: IProps) => {
  // const { search } = useQueryParams();
  const { i18n, t } = useTranslation();
  const {
    globalSearchBarValue,
    handleChangeGlobalSearchBar,
    globalSearchType,
    handleChangeGlobalSearchType,
  } = useContext(ApplicationProvider);
  const [debouncedSearchValue] = useDebounce(globalSearchBarValue, 500);
  const { handleDeleteMultipleProducts, multipleDeleteLoading } =
    useDeleteMultipleProducts({});
  const columns = useMemo<Column<PRODUCT>[]>(
    () => [
      {
        id: "product-id",
        Header: t`id` as string, // Column name.
        accessor: "id", // A way of linking the column to the related data field.
      },
      {
        Header: t`image` as string,

        accessor: "image",
        disableSortBy: true,
        Cell: ({ value }) => {
          return (
            <Flex justify="center">
              <TableRowImage src={value} />
            </Flex>
          );
        },
      },
      {
        Header: t`name` as string,
        accessor: "name",
        Cell: (instance) => {
          return (
            <Paragraph fontSize="0.9rem">
              {instance.value[i18n.language]}
            </Paragraph>
          );
        },
      },
      {
        Header: t`quantity` as string,
        accessor: "quantity",
      },
      {
        Header: t`price` as string,
        accessor: "price",
      },
      {
        Header: t`category` as string,
        accessor: "category",
        Cell: (instance) => {
          return (
            <Paragraph fontSize="0.9rem">
              {instance.value ? instance.value.name?.[i18n.language] : "-"}
            </Paragraph>
          );
        },
      },
      {
        Header: t`status` as string,
        accessor: "active",
        Cell: (instance) => {
          return (
            <Paragraph fontSize="0.9rem">
              {instance.value ? "Active" : "Disabled"}
            </Paragraph>
          );
        },
      },
      {
        Header: t`actions` as string,
        accessor: "id",
        Cell: (instance: any) => (
          <ProductItemActions id={instance.row.original.id} />
        ),
        disableSortBy: true,
      },
    ],
    [i18n.language, t]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { sortBy: [{ id: "product-id", desc: true }] },
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          disableSortBy: true,
          accessor: "id",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox
              data-testid="select-all-check"
              {...getToggleAllRowsSelectedProps()}
            />
          ),
          Cell: (instance: any) => {
            return (
              <Checkbox
                data-testid={`select-${instance.row.original.id}`}
                {...instance.row.getToggleRowSelectedProps()}
              />
            );
          },
        },
        ...columns,
      ]);
    }
  );
  // const { selectedRows, handleToggleRows, handleClearRows } = useToggleRows();

  // Multiple Delete Mutation
  // const { handleDeleteMultipleProducts, multipleDeleteLoading } =
  //   useDeleteMultipleProducts({
  //     successCallback: () => {
  //       handleClearRows();
  //     },
  //   });

  useEffect(() => {
    if (globalSearchType !== "product") {
      handleChangeGlobalSearchType?.("product");
    }
  }, [globalSearchType, handleChangeGlobalSearchType]);

  return (
    <>
      {data?.length !== 0 && (
        <Flex margin="1rem 0" justify="flex-end" items="center">
          <p>Selected Rows ({Object.keys(selectedFlatRows).length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              disabled={
                Object.keys(selectedFlatRows).length === 0 ||
                multipleDeleteLoading
              }
              color="danger"
              withTransition
              size="sm"
              isLoading={multipleDeleteLoading}
              onClick={() => {
                const ids = selectedFlatRows.map((row) => row.original.id);
                handleDeleteMultipleProducts(ids);
              }}
            >
              Delete{" "}
              {Object.keys(selectedFlatRows).length > 0
                ? Object.keys(selectedFlatRows).length
                : ""}
              Products
            </Button>
          </Flex>
        </Flex>
      )}
      {/* {debouncedSearchValue && (
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
      )} */}
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHead
                  sortable={column.canSort}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Flex items="center" justify="center">
                    {column.render("Header")}{" "}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BiChevronDown size={20} />
                      ) : (
                        <BiChevronUp size={20} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </TableHead>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableBodyRow isSelected={row.isSelected} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableBodyData
                    data-testid={cell.column.id}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </TableBodyData>
                ))}
              </TableBodyRow>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ProductsTable;

const SearchContainer = styled(Flex)`
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 6px;
  margin: 1rem 0;
  .search-text {
    font-size: 0.9rem;
  }
`;
