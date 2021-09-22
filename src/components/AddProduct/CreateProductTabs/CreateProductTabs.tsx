import { useContext } from "react";
import styled from "styled-components";
import { NewProductContext } from "../../../contexts/Product/NewProductContext";

import Paragraph from "../../StyledComponents/Paragraph";

const CreateProductTabs = () => {
  const { activeTab } = useContext(NewProductContext);
  return (
    <Container>
      <TabItem type="button" active={activeTab === 0}>
        <Paragraph> Product Name & Description</Paragraph>
      </TabItem>
      <TabItem type="button" active={activeTab === 1}>
        <Paragraph> Product Imaging</Paragraph>
      </TabItem>

      <TabItem type="button" active={activeTab === 2}>
        <Paragraph> Pricing & Options</Paragraph>
      </TabItem>
      <TabItem type="button" active={activeTab === 3}>
        <Paragraph>Ordering Options & Branch Availability</Paragraph>
      </TabItem>
      {/* <TabItem type="button" active={activeTab === 4}>
        <Paragraph>Product Promotions</Paragraph>
      </TabItem> */}
    </Container>
  );
};

export default CreateProductTabs;
const Container = styled.div`
  border-bottom: ${(props) => props.theme.border};
  display: flex;
  margin: 1rem 0;
  overflow-x: auto;
  gap: 1.5rem;
`;

const TabItem = styled.button<{ active?: boolean }>`
  padding: 0.75rem 0;
  transition: color 100ms ease;
  color: ${(props) => props.theme.text};
  white-space: nowrap;
  text-align: center;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${props.theme.primary}` : "none"};
  &:hover {
    color: ${(props) => props.theme.primary};
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    font-size: 1rem;
    padding: 0.75rem 0;
  }
`;
