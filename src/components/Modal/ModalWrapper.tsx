import styled from "styled-components";

export const ModalWrapper = styled.div`
  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadow};
  max-height: 90%;
  overflow-y: hidden;
`;
