import styled from "styled-components";

export const BaseInput = styled.input`
  width: 100%;

  font-size: 0.9rem;
  color: ${(props) => props.theme.text};
  flex: 1;
  outline: none;
  min-width: 0;
  &:disabled {
    cursor: not-allowed;
  }
  padding: 0.4rem;
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    padding: 0.5rem;
  }
`;
