import styled from "styled-components";

export const InputAdornment = styled.span`
  padding: 0.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme: { primary } }) => primary};
  background-color: ${({ theme: { subtleBackground } }) => subtleBackground};
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    padding: 0.5rem;
  }
`;
export const TextAdornment = styled(InputAdornment)`
  background-color: gray;
`;
