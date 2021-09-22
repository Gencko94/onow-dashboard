import styled from "styled-components";

export const Table = styled.table<{ noBorder?: boolean }>`
  border: ${(props) => !props.noBorder && props.theme.border};
  th,
  td {
    vertical-align: middle;
  }
  font-size: 0.9rem;
  tr {
  }
`;
