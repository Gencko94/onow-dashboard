import { useContext } from "react";
import styled from "styled-components";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";

const CreateProductTabs = () => {
  const { activeTab } = useContext(NewProductContext);
  return (
    <Container>
      <TabItem type="button" active={activeTab === 0}>
        General Product Info
      </TabItem>

      <TabItem type="button" active={activeTab === 1}>
        Pricing & Product Options
      </TabItem>
      <TabItem type="button" active={activeTab === 2}>
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
  ({
    theme: { breakpoints, mainColor, subHeading, font, headingColor },
    active,
  }) => `
  padding: 0.75rem 0.5rem;
  transition: color 150ms ease;
  font-size: 0.8rem;
  white-space: nowrap;
  text-align: center;
  border-radius: 6px 6px 0 0;
  background-color: #fff;
  
  color: ${active ? mainColor : subHeading};
    
  font-weight: ${active && font.bold};
  &:hover {
    color: ${active && headingColor};
  }
  @media ${breakpoints.md}{
    font-size: 0.9rem;
    padding: 0.75rem;

  }
  `
);
