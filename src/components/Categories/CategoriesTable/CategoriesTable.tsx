import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Column, useSortBy, useTable } from "react-table";
import { CATEGORY } from "../../../interfaces/categories/categories";
import DefaultImage from "../../reusable/DefaultImage";
import { Table } from "../../reusable/Table/Table";
import { TableBodyData } from "../../reusable/Table/TableBodyData";
import { TableBodyRow } from "../../reusable/Table/TableBodyRow";
import { TableHead } from "../../reusable/Table/TableHead";
import { TableRowImage } from "../../reusable/Table/TableRowImage";
import Flex from "../../StyledComponents/Flex";
import Paragraph from "../../StyledComponents/Paragraph";
import CategoryItemActions from "./CategoryItemActions";
interface IProps {
  data: any;
}

const CategoriesTable = ({ data }: IProps) => {
  const { i18n, t } = useTranslation();
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
    []
  );
  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { sortBy: [{ id: "category-id", desc: true }] },
      },
      useSortBy
    );
  return (
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
  );
};

export default CategoriesTable;
