import styled, { css } from "styled-components";

export const TableBodyRow = styled.tr<{ isSelected?: boolean }>`
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.subtleFloating
      : props.theme.subtleBackground};
  ${(props) =>
    !props.isSelected &&
    css`
      &:hover {
        background-color: ${(props) => props.theme.subtleFloating};
      }
    `}
`;
