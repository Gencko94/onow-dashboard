import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Column, useRowSelect, useSortBy, useTable } from "react-table";
import { CATEGORY } from "../../../interfaces/categories/categories";
import DefaultImage from "../../reusable/DefaultImage";
import Checkbox from "../../reusable/Inputs/Checkbox";
import { Table } from "../../reusable/Table/Table";
import { TableBodyData } from "../../reusable/Table/TableBodyData";
import { TableBodyRow } from "../../reusable/Table/TableBodyRow";
import { TableHead } from "../../reusable/Table/TableHead";
import { TableRowImage } from "../../reusable/Table/TableRowImage";
import Flex from "../../StyledComponents/Flex";
import Paragraph from "../../StyledComponents/Paragraph";

interface IProps {
  data: CATEGORY[];
  handleToggleCategories: (
    category: CATEGORY,
    onChange: (...event: any[]) => void
  ) => void;
  onChange: (...event: any[]) => void;
  selected: number[];
}

const ProductCategoriesTable = ({
  data,
  handleToggleCategories,
  onChange,
  selected,
}: IProps) => {
  const { t, i18n } = useTranslation();
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
    ],
    [data]
  );
  function getDefaultSelectedRows(): Record<string, boolean> {
    const obj: Record<string, boolean> = {};
    selected.forEach((value) => {
      const categoryIndex = data.findIndex((cat) => cat.id === value);

      obj[categoryIndex] = true;
    });
    return obj;
    // if (typeof categoryIndex !== "undefined") {
    //   return { [categoryIndex]: true };
    // }
    // return {};
  }
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
      data: data as CATEGORY[],
      initialState: {
        sortBy: [{ id: "category-id", desc: true }],
        selectedRowIds: getDefaultSelectedRows(),
      },
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
    <Table noBorder {...getTableProps()}>
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
            <TableBodyRow
              data-testid={`category-${row.original.id}-row`}
              onClick={() => {
                handleToggleCategories(row.original, onChange);
                row.toggleRowSelected();
              }}
              isSelected={row.isSelected}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => (
                <TableBodyData
                  style={{ cursor: "pointer" }}
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
  );
};

export default ProductCategoriesTable;
