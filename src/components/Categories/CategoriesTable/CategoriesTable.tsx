import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Column, useRowSelect, useSortBy, useTable } from "react-table";
import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import { CATEGORY } from "../../../interfaces/categories/categories";
import Button from "../../reusable/Button";
import DefaultImage from "../../reusable/DefaultImage";
import { Table } from "../../reusable/Table/Table";
import { TableBodyData } from "../../reusable/Table/TableBodyData";
import { TableBodyRow } from "../../reusable/Table/TableBodyRow";
import { TableHead } from "../../reusable/Table/TableHead";
import { TableRowImage } from "../../reusable/Table/TableRowImage";
import Flex from "../../StyledComponents/Flex";
import Paragraph from "../../StyledComponents/Paragraph";
import CategoryItemActions from "./CategoryItemActions";
import { useDeleteMultipleCategories } from "../../../hooks/data-hooks/categories/useDeleteMultipleCategories";
import Checkbox from "../../reusable/Inputs/Checkbox";

interface IProps {
  data: any;
}

const CategoriesTable = ({ data }: IProps) => {
  const { i18n, t } = useTranslation();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { handleDeleteMultipleCategories, multipleDeleteLoading } =
    useDeleteMultipleCategories();
  const columns = useMemo<Column<CATEGORY>[]>(
    () => [
      {
        id: "category-id",
        Header: t`id` as string, // Column name.
        accessor: "id",
      },
      {
        Header: t`image` as string,
        accessor: "image",
        Cell: (instance) => (
          <Flex justify="center">
            {instance.value ? (
              <TableRowImage src={instance.value} />
            ) : (
              <DefaultImage />
            )}
          </Flex>
        ),
        disableSortBy: true,
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
        Cell: (instance: any) => (
          <CategoryItemActions id={instance.row.original.id} />
        ),
        disableSortBy: true,
      },
    ],
    [i18n.language, t]
  );
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { sortBy: [{ id: "category-id", desc: true }] },
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

  return (
    <div>
      <Flex justify="flex-start" margin="1rem 0 " items="center">
        <p>Selected Rows ({selectedFlatRows.length}) : </p>
        <Flex margin="0 0.5rem">
          <Button
            size="sm"
            disabled={selectedFlatRows.length === 0 || multipleDeleteLoading}
            color="danger"
            isLoading={multipleDeleteLoading}
            withTransition
            onClick={() => {
              setConfirmationModalStatus?.({
                closeCb: handleCloseConfirmationModal!,
                desc: "Are you sure you want to delete these categories ?",
                open: true,
                successCb: () => {
                  const ids = selectedFlatRows.map((row) => row.original.id);
                  handleDeleteMultipleCategories(ids);
                },
                title: "Delete Categories",
              });
            }}
          >
            Delete Categories
          </Button>
        </Flex>
      </Flex>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((hGroup) => (
            <tr {...hGroup.getHeaderGroupProps()}>
              {hGroup.headers.map((column) => (
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
    </div>
  );
};

export default CategoriesTable;
