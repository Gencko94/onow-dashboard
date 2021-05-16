import { useState } from "react";
import styled from "styled-components";
import AddNewBlock from "../components/WebsiteLayout/WebsiteLayoutOverview/AddNewBlock";
import FooterBlock from "../components/WebsiteLayout/WebsiteLayoutOverview/FooterBlock";
import HeaderBlock from "../components/WebsiteLayout/WebsiteLayoutOverview/HeaderBlock";
import LayoutBlock from "../components/WebsiteLayout/WebsiteLayoutOverview/LayoutBlock";

const BlockDetailsPage = () => {
  const [totalBlocks, setTotalBlocks] = useState(1);
  return (
    <Container>
      <HeaderBlock />
      {/* {[...Array.from({ length: totalBlocks })].map((_, index) => (
        <LayoutBlock key={index} type="Header" />
      ))} */}
      <AddNewBlock />
      <FooterBlock />
    </Container>
  );
};

export default BlockDetailsPage;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;
