import React, { useContext, useEffect, useMemo } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Flex from "../../StyledComponents/Flex";
import { ApplicationProvider } from "../../../contexts/ApplicationContext";
import { useDebounce } from "use-debounce/lib";

import { useDeleteMultipleProducts } from "../../../hooks/data-hooks/products/useDeleteMultipleProducts";
import { useToggleRows } from "../../../hooks/useToggleRows";
import { useTable, useSortBy, Column } from "react-table";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import ProductItemActions from "./ProductItemActions";

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

  const columns = useMemo<Column[]>(
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
              <Image src={value} />
            </Flex>
          );
        },
      },
      {
        Header: t`name` as string,
        accessor: `name[${i18n.language}]`,
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
        accessor: `category.name[${i18n.language}]`,
      },
      {
        Header: t`status` as string,
        accessor: "status",
      },
      {
        Header: t`actions` as string,
        disableSortBy: true,
        accessor: (row: any) => row.id,
        Cell: ({ value }) => {
          return <ProductItemActions id={value} />;
        },
      },
    ],
    [i18n.language, t]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { sortBy: [{ id: "id", desc: true }] },
      },
      useSortBy
    );
  const { selectedRows, handleToggleRows, handleClearRows } = useToggleRows();
  const history = useHistory();

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

  return (
    <>
      {/* {data?.length !== 0 && (
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
      )} */}
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
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  sortable={column.canSort}
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
              <TableBodyRow {...row.getRowProps()}>
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
const Table = styled.table`
  border: ${(props) => props.theme.border};
  th,
  td {
    vertical-align: middle;
  }
  font-size: 0.9rem;
  tr {
  }
`;
const TableBodyRow = styled.tr`
  background-color: ${(props) => props.theme.subtleBackground};

  &:hover {
    background-color: ${(props) => props.theme.subtleFloating};
  }
`;
const TableHead = styled.th<{ sortable: boolean }>`
  text-align: center;
  padding: 1rem;
  transition: all 75ms ease-in-out;

  &:hover {
    color: ${(props) => (props.sortable ? props.theme.primary : "inherit")};
    transform: ${(props) => props.sortable && "translateY(-1px)"};
  }
  /* background-color: ${(props) => props.theme.primary}; */
  border-bottom: ${(props) => props.theme.border};
`;
const TableBodyData = styled.td`
  border-bottom: ${(props) => props.theme.border};
  padding: 1rem;
  text-align: center;
`;
// const Container = styled.div`
//   border-bottom: none;

//   position: relative;
//   .table {
//     border-radius: 20px;
//     border: ${(props) => props.theme.border};

//     overflow-x: auto;
//     overflow-y: hidden;
//     border-radius: 20px;
//     background-color: ${(props) => props.theme.subtleBackground};
//   }
//   .loading {
//     position: absolute;
//     z-index: 2;
//     top: -14px;
//     left: 15px;
//   }
// `;
const SearchContainer = styled(Flex)`
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 6px;
  margin: 1rem 0;
  .search-text {
    font-size: 0.9rem;
  }
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  font-size: 0.6rem;
  object-fit: cover;
`;
