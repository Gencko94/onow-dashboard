import { useContext } from "react";
import styled from "styled-components";
import { up } from "../../../constants";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";

interface IProps {
  activeTab: 0;
}

const PaymentMethodsTabs = ({ activeTab }: IProps) => {
  return (
    <Container>
      <TabItem
        type="button"
        // onClick={() => setActiveTab?.(0)}
        active={activeTab === 0}
      >
        Online Payments
      </TabItem>
    </Container>
  );
};

export default PaymentMethodsTabs;
const Container = styled.div`
  border-bottom: ${(props) => props.theme.border};
  display: flex;
  margin: 1rem 0;
  overflow-x: auto;
  gap: 1.5rem;
`;

const TabItem = styled.button<{ active?: boolean }>(
  ({ theme: { breakpoints, font, primary, border, text }, active }) => `
  padding: 0.75rem 0;
  transition: color 100ms ease;
  color:${text};
  white-space: nowrap;
  text-align: center;
  border-bottom:${active ? `2px solid ${primary}` : "none"};
  &:hover {
    color: ${primary};
  }
  ${up(breakpoints.md)}{
    font-size: 1rem;
    padding: 0.75rem 0;

  }
  `
);
