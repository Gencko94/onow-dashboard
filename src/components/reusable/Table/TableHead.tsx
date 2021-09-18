import styled from "styled-components";

export const TableHead = styled.th<{ sortable: boolean }>`
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
