import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

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
        <Paragraph weight={activeTab === 0 ? "semibold" : "regular"}>
          {" "}
          Product Name & Description
        </Paragraph>
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(1)}
        active={activeTab === 1}
      >
        <Paragraph weight={activeTab === 1 ? "semibold" : "regular"}>
          {" "}
          Product Imaging
        </Paragraph>
      </TabItem>

      <TabItem
        type="button"
        onClick={() => setActiveTab(2)}
        active={activeTab === 2}
      >
        <Paragraph weight={activeTab === 2 ? "semibold" : "regular"}>
          {" "}
          Pricing & Options
        </Paragraph>
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(3)}
        active={activeTab === 3}
      >
        <Paragraph weight={activeTab === 3 ? "semibold" : "regular"}>
          Ordering Options & Branch Availability
        </Paragraph>
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(4)}
        active={activeTab === 4}
      >
        <Paragraph weight={activeTab === 4 ? "semibold" : "regular"}>
          Product Promotions
        </Paragraph>
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
