import { useContext } from "react";
import styled from "styled-components";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import { up } from "../../../utils/themes";

const CreateProductTabs = () => {
  const { activeTab } = useContext(NewProductContext);
  return (
    <Container>
      <TabItem type="button" active={activeTab === 0}>
        General Product Info
      </TabItem>
      <TabItem type="button" active={activeTab === 1}>
        Product Images
      </TabItem>

      <TabItem type="button" active={activeTab === 2}>
        Pricing & Product Options
      </TabItem>
      <TabItem type="button" active={activeTab === 3}>
        Ordering Options & Branch Availability
      </TabItem>
    </Container>
  );
};

export default CreateProductTabs;
const Container = styled.div`
  padding-top: 0.5rem;
  border-radius: 5px;
  overflow-x: auto;

  display: flex;
  gap: 0.5rem;
`;

const TabItem = styled.button<{ active?: boolean }>(
  ({ theme: { breakpoints, mainColor, textSecondary, font }, active }) => `
  padding: 0.75rem 0.5rem;
  transition: color 150ms ease;
  font-size: 0.8rem;
  white-space: nowrap;
  text-align: center;
  border-radius: 6px 6px 0 0;
  background-color: #fff;
  
  color: ${active ? mainColor : textSecondary};
    
  font-weight: ${active && font.bold};
  
  ${up(breakpoints.md)}{
    font-size: 0.9rem;
    padding: 0.75rem;

  }
  `
);
