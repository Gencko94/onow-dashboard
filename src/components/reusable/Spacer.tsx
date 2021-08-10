import styled from "styled-components";

export default styled.div<{ size: number }>`
  min-width: ${(props) => props.size}px;
  min-height: ${(props) => props.size}px;
`;
