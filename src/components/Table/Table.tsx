import { Column, useTable } from "react-table";
import styled from "styled-components";
interface IProps {
  data: any;
  columns: Column[];
}
export default function Table({ data, columns }: IProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable({ columns, data });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHead {...column.getHeaderProps()}>
                {column.render("Header")}
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
                <TableBodyData {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </TableBodyData>
              ))}
            </TableBodyRow>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <TableHead {...column.getFooterProps()}>
                {column.render("Footer")}
              </TableHead>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
const TableBodyRow = styled.tr`
  background-color: ${(props) => props.theme.subtleBackground};

  &:hover {
    background-color: ${(props) => props.theme.subtleFloating};
  }
`;
const TableHead = styled.th`
  text-align: center;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.primary};
`;
const TableBodyData = styled.td`
  border: ${(props) => props.theme.border};
  padding: 0.5rem;
  text-align: center;
`;
