import styled from "styled-components";

export const InputLabel = styled.label`
  color: ${(props) => props.theme.textAlt};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: block;
  font-weight: ${(props) => props.theme.font.semibold};
`;
