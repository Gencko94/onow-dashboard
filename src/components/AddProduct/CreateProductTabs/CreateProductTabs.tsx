import { useContext } from "react";
import styled from "styled-components";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import { up } from "../../../utils/themes";
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
