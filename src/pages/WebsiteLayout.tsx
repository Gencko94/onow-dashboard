import { useState } from 'react';
import styled from 'styled-components';
import AddNewBlock from '../components/WebsiteLayout/WebsiteLayoutOverview/AddNewBlock';
import LayoutBlock from '../components/WebsiteLayout/WebsiteLayoutOverview/LayoutBlock';

const BlockDetailsPage = () => {
  const [totalBlocks, setTotalBlocks] = useState(1);
  return (
    <Container>
      {[...Array.from({ length: totalBlocks })].map((_, index) => (
        <LayoutBlock key={index} type="Header" />
      ))}
      <AddNewBlock />
    </Container>
  );
};

export default BlockDetailsPage;
const Container = styled.div`
  padding: 0.75rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;
