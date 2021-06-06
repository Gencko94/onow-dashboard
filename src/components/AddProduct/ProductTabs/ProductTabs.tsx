import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface IProps {
  setActiveTab: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
  activeTab: 0 | 1 | 2 | 3;
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
        Pricing & Variations
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(2)}
        active={activeTab === 2}
      >
        Ordering Options & Branch Availability
      </TabItem>
      <TabItem
        type="button"
        onClick={() => setActiveTab(3)}
        active={activeTab === 3}
      >
        Product Promotions
      </TabItem>
    </Container>
  );
};

export default ProductTabs;
const Container = styled.div`
  /* box-shadow: ${(props) => props.theme.shadow}; */
  padding-top: 0.5rem;
  /* min-height: calc(100vh - 100px); */
  border-radius: 5px;
  /* background-color: #fff; */
  display: flex;
  gap: 0.5rem;
`;

const TabItem = styled.button<{ active?: boolean }>`
  padding: 0.75rem;
  transition: color 150ms ease;
  font-size: 0.9rem;
  white-space: nowrap;
  text-align: center;
  border-radius: 6px 6px 0 0;
  background-color: #fff;

  color: ${(props) =>
    props.active ? props.theme.mainColor : props.theme.subHeading};

  font-weight: ${(props) => props.active && props.theme.font.bold};
  &:hover {
    color: ${(props) => !props.active && props.theme.headingColor};
  }
`;
