import styled from 'styled-components';
import StatPanel from './StatPanel/StatPanel';

const DashboardCenter = () => {
  return (
    <Container>
      <StatPanel />
    </Container>
  );
};

export default DashboardCenter;
const Container = styled.div`
  /* padding: 0.75rem; */
`;
