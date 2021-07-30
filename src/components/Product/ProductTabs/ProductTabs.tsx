import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { up } from "../../../utils/themes";

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
        General Product Info
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(1)}
        active={activeTab === 1}
      >
        Product Imaging
      </TabItem>

      <TabItem
        type="button"
        onClick={() => setActiveTab(2)}
        active={activeTab === 2}
      >
        Pricing & Variations
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(3)}
        active={activeTab === 3}
      >
        Ordering Options & Branch Availability
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(4)}
        active={activeTab === 4}
      >
        Product Promotions
      </TabItem>
    </Container>
  );
};

export default ProductTabs;
const Container = styled.div`
  padding-top: 0.5rem;
  border-radius: 5px;
  overflow-x: auto;

  display: flex;
  /* gap: 0.5rem; */
`;

const TabItem = styled.button<{ active?: boolean }>(
  ({
    theme: { breakpoints, mainColor, subHeading, font, headingColor, border },
    active,
  }) => `
  padding: 0.75rem 0.5rem;
  transition: color 100ms ease;
  font-size: 0.8rem;
  white-space: nowrap;
  text-align: center;
  // border-radius: 6px 0 0 0;
  background-color: #fff;
  border-bottom:${border};
  border-color:${active ? mainColor : border};
  border-width:2px;
  // background-color: ${active && mainColor};
  color: ${active ? mainColor : subHeading};
    
  font-weight: ${active && font.semibold};
  &:hover {
    color: ${mainColor};
  }
  ${up(breakpoints.md)}{
    font-size: 1rem;
    padding: 0.75rem;

  }
  `
);
