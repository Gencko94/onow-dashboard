import styled from "styled-components";

const HeaderContainer: React.FC = ({ children }) => {
  return <HeaderWrapper>{children}</HeaderWrapper>;
};

export default HeaderContainer;

export const HeaderWrapper = styled.div`
  background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 1rem;
`;
