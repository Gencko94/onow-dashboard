import styled from "styled-components";

export const Table = styled.table`
  border: ${(props) => props.theme.border};
  th,
  td {
    vertical-align: middle;
  }
  font-size: 0.9rem;
  tr {
  }
`;
