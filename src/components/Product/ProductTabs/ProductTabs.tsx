import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { up } from "../../../utils/themes";
import Paragraph from "../../StyledComponents/Paragraph";

interface IProps {
  setActiveTab: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4>>;
  activeTab: 0 | 1 | 2 | 3 | 4;
}
const tabOptions = [
  "General Product Info",
  "Product Details",
  "Product Variations & Pricing",
  "Ordering Options",
  "Additional Settings",
];
const ProductTabs = ({ setActiveTab, activeTab }: IProps) => {
  return (
    <Container>
      <TabItem
        type="button"
        onClick={() => setActiveTab(0)}
        active={activeTab === 0}
      >
        <Paragraph> Product Name & Description</Paragraph>
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(1)}
        active={activeTab === 1}
      >
        <Paragraph> Product Imaging</Paragraph>
      </TabItem>

      <TabItem
        type="button"
        onClick={() => setActiveTab(2)}
        active={activeTab === 2}
      >
        <Paragraph> Pricing & Options</Paragraph>
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(3)}
        active={activeTab === 3}
      >
        <Paragraph>Ordering Options & Branch Availability</Paragraph>
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(4)}
        active={activeTab === 4}
      >
        <Paragraph>Product Promotions</Paragraph>
      </TabItem>
    </Container>
  );
};

export default ProductTabs;
const Container = styled.div`
  border-bottom: ${(props) => props.theme.border};
  display: flex;
  margin: 1rem 0;
  overflow-x: auto;
  gap: 1.5rem;
`;

const TabItem = styled.button<{ active?: boolean }>(
  ({
    theme: { breakpoints, mainColor, textPrimary, font, headingColor, border },
    active,
  }) => `
  padding: 0.75rem 0;
  transition: color 100ms ease;
  white-space: nowrap;
  text-align: center;
  border-bottom:${active ? `2px solid ${mainColor}` : "none"};
  &:hover {
    color: ${mainColor};
  }
  ${up(breakpoints.md)}{
    font-size: 1rem;
    padding: 0.75rem 0;

  }
  `
);
